import {existsSync,readFileSync,realpathSync,statSync,mkdirSync,writeFileSync,copyFileSync} from 'node:fs';
import {dirname,extname,join,resolve,sep} from 'node:path';
import {createRequire} from 'node:module';
import {hash,safeResourcePath,validateCreativeSource} from './creative-plan.mjs';
import {renderShotPreview} from './shot-preview.mjs';
import {checkMaterial,findMaterial} from './material-usage.mjs';

// Static dependency inspection never executes researched or generated code.
export function localCodeDependencies(file,root) {
  const seen=new Set(),files=[],packages=new Set(),base=realpathSync(root);
  const require=createRequire(join(import.meta.dirname,'../../../package.json'));
  function visit(path) {
    path=realpathSync(path);
    if(!path.startsWith(base+sep))throw new Error('Prepared code dependency escapes its local root.');
    if(seen.has(path))return;seen.add(path);
    const bytes=readFileSync(path);files.push({path,sha256:hash(bytes)});
    if(!/\.(?:[cm]?[jt]sx?)$/u.test(path))return;
    const source=bytes.toString('utf8');
    if(/(?:from\s*|import\s*)['"](?:node:|[A-Za-z]:|\/)|\b(?:eval|fetch|XMLHttpRequest|WebSocket)\s*\(/u.test(source))throw new Error('Prepared material must render offline in the browser.');
    const parser=createRequire(realpathSync(join(import.meta.dirname,'../../../node_modules/@remotion/cli/package.json')))('@babel/parser');
    const ast=parser.parse(source,{sourceType:'module',plugins:['jsx',...(extname(path).includes('ts')?['typescript']:[])]});
    const imports=[];
    function walk(n){if(!n||typeof n!=='object')return;
      if(['ImportDeclaration','ExportNamedDeclaration','ExportAllDeclaration'].includes(n.type)&&n.source)imports.push(n.source.value);
      if(n.type==='ImportExpression'||(n.type==='CallExpression'&&n.callee?.type==='Import'))throw new Error('Prepared material needs statically inspectable imports.');
      for(const v of Object.values(n))if(Array.isArray(v))v.forEach(walk);else if(v&&typeof v==='object')walk(v);
    }walk(ast.program);
    for(const specifier of imports) {
      if(specifier.startsWith('.')) {
        const target=resolve(dirname(path),specifier),candidates=[target,...['.jsx','.tsx','.js','.ts','.mjs','/index.jsx','/index.tsx','/index.js'].map(e=>target+e)];
        const found=candidates.find(p=>existsSync(p)&&statSync(p).isFile());
        if(!found)throw new Error('Missing prepared code dependency: '+specifier);visit(found);
      } else {
        const packageName=specifier.startsWith('@')?specifier.split('/').slice(0,2).join('/'):specifier.split('/')[0];
        if(packageName==='node:'||/^(?:fs|path|child_process|net|http|https|os|worker_threads)$/u.test(packageName))throw new Error('Prepared material contains a host import.');
        require.resolve(specifier);packages.add(packageName);
      }
    }
  }visit(file);return {files,packages:[...packages].sort()};
}
const fileLink=path=>({path:resolve(path),sha256:hash(readFileSync(path))});
export function prepareProductionMaterials(plan,{root,resourcesDirectory}) {
  const style=JSON.parse(readFileSync(join(root,'config/style-library.json'),'utf8')).styles.find(s=>s.id===plan.content.styleId);
  if(!style)throw new Error('Missing selected style.');
  const styleDirectory=join(resourcesDirectory,'prepared-materials');mkdirSync(styleDirectory,{recursive:true});
  const styleFile=join(styleDirectory,'style.json');writeFileSync(styleFile,JSON.stringify(style,null,2)+'\n');plan.preproduction.style=fileLink(styleFile);
  const chosen=[...new Set(plan.preproduction.shots.flatMap(s=>s.libraryIds))];
  plan.preproduction.components=chosen.map(id=>{
    checkMaterial(root,id,{fullName:plan.fullName});const m=findMaterial(root,id,{fullName:plan.fullName});
    const code=safeResourcePath(root,m.module??m.codePath),dependency=localCodeDependencies(code,root);
    return {id,exportName:m.exportName,shotIds:plan.preproduction.shots.filter(s=>s.libraryIds.includes(id)).map(s=>s.id),
      code:fileLink(code),usage:fileLink(safeResourcePath(root,m.usage)),demo:fileLink(safeResourcePath(root,m.demo)),
      dependencies:dependency};
  });
  plan.preproduction.customMaterials=plan.preproduction.customMaterials.map(m=>{
    if(m.code&&m.usage&&m.demo)return m;
    const code=safeResourcePath(resourcesDirectory,m.codeFile),usage=safeResourcePath(resourcesDirectory,m.usageFile),demo=safeResourcePath(resourcesDirectory,m.demoFile);
    const dependency=localCodeDependencies(code,resourcesDirectory);
    const source=readFileSync(code,'utf8');
    validateCreativeSource(source,{allowedImports:[...source.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/gu)].map(m=>m[1])});
    if(!readFileSync(usage,'utf8').trim())throw new Error('Custom material needs its callable usage.');
    return {id:m.id,exportName:m.exportName,shotIds:m.shotIds,code:fileLink(code),usage:fileLink(usage),demo:fileLink(demo),dependencies:dependency};
  });
  for(const asset of plan.preproduction.assets)asset.link=resolve(resourcesDirectory,asset.file);
  plan.preproductionDigest=hash(JSON.stringify(plan.preproduction));
  validateProductionMaterials(plan,{root,resourcesDirectory});return plan;
}
export function validateProductionMaterials(plan,{root,resourcesDirectory}) {
  const p=plan.preproduction;
  if(!Array.isArray(p.components)||!Array.isArray(p.customMaterials))throw new Error('Current production plan needs prepared component and custom material links.');
  if(!p.style?.path||!realpathSync(p.style.path).startsWith(realpathSync(resourcesDirectory)+sep)||hash(readFileSync(p.style.path))!==p.style.sha256)throw new Error('Prepared style is missing or changed.');
  const expected=[...new Set(p.shots.flatMap(s=>s.libraryIds))].sort();
  if(JSON.stringify(p.components.map(c=>c.id).sort())!==JSON.stringify(expected))throw new Error('Prepared component links do not cover the selected materials.');
  const ids=new Set(),customExports=new Set();
  for(const m of p.customMaterials){if(customExports.has(m.exportName))throw new Error('Duplicate custom material export: '+m.exportName);customExports.add(m.exportName);}
  for(const m of [...p.components,...p.customMaterials]) {
    if(ids.has(m.id)||!m.exportName||!m.shotIds?.length||m.shotIds.some(id=>!p.shots.some(s=>s.id===id)))throw new Error('Prepared material needs unique identity and actual shot use.');ids.add(m.id);
    for(const link of [m.code,m.usage,m.demo,...(m.dependencies?.files??[])]) {
      if(!link?.path||!link.sha256)throw new Error('Prepared material needs hashed local links.');
      const actual=realpathSync(link.path),bases=[realpathSync(root),realpathSync(resourcesDirectory)];
      if(!bases.some(base=>actual.startsWith(base+sep))||hash(readFileSync(actual))!==link.sha256)throw new Error('Prepared material changed or escaped: '+m.id);
    }
    if(!m.dependencies?.files?.some(f=>f.path===m.code.path))throw new Error('Prepared code dependencies are incomplete.');
  }
  return [...p.components,...p.customMaterials];
}
export function preparedMaterialBridge(plan) {
  return plan.preproduction.customMaterials.map(m=>'export {default as '+m.exportName+'} from '+JSON.stringify(m.code.path.replaceAll('\\','/'))+';').join('\n')+'\n';
}
export function materialLinksForShots(plan,shotIds) {
  const ids=new Set(shotIds);return [...plan.preproduction.components,...plan.preproduction.customMaterials].filter(m=>m.shotIds.some(id=>ids.has(id)));
}

export const customMaterialVisualIdentity=value=>hash(JSON.stringify((value.customMaterials??[]).map(({id,exportName,source,demoSource})=>({id,exportName,source,demoSource}))));
export function syncCustomMaterialUsage(value,{resourcesDirectory}) {
  for(const material of value.customMaterials??[]){const directory=safeResourcePath(resourcesDirectory,'prepared-materials/'+material.id);
    if(readFileSync(join(directory,'component.jsx'),'utf8')!==material.source||readFileSync(join(directory,'demo.jsx'),'utf8')!==material.demoSource)throw new Error('Changed material code needs a fresh preview before usage delivery.');
    writeFileSync(join(directory,'usage.md'),material.usage);
  }
}
export function stageCustomMaterials(value,{resourcesDirectory,style,fullName,render=renderShotPreview}) {
  return (value.customMaterials??[]).map(m=>{
    validateCreativeSource(m.source);validateCreativeSource(m.demoSource,{allowedImports:['./component.jsx']});
    const directory=join(resourcesDirectory,'prepared-materials',m.id);mkdirSync(directory,{recursive:true});
    const code=join(directory,'component.jsx'),usage=join(directory,'usage.md'),demo=join(directory,'demo.jsx');
    const identity=hash(JSON.stringify({source:m.source,demoSource:m.demoSource,style}));
    const marker=join(directory,'material-identity.txt'),movie=join(directory,'demo.mp4');
    writeFileSync(code,m.source);writeFileSync(usage,m.usage);writeFileSync(demo,m.demoSource);
    if(!existsSync(marker)||readFileSync(marker,'utf8')!==identity||!existsSync(movie)) {
      const assignment=join(directory,'demo-assignment.json');
      writeFileSync(assignment,JSON.stringify({fullName,sourceFile:demo,durationInFrames:90,fps:30,style,publicDirectory:resourcesDirectory}));
      const rendered=render(assignment);copyFileSync(rendered.output,movie);writeFileSync(marker,identity);
    }
    const destination=join(resourcesDirectory,'visual-assets',m.id+'.mp4');mkdirSync(dirname(destination),{recursive:true});copyFileSync(movie,destination);
    return {id:m.id,kind:'file',source:m.id+'.mp4',purpose:'selected independent motion for '+m.shotIds.join(',')};
  });
}

export function readableMaterialLinks(plan) {
  const link=(title,path)=>'['+title+'](<'+path.replaceAll('\\','/')+'>)';
  return ['材料：',link('选定风格',plan.preproduction.style.path),
    ...[...plan.preproduction.components,...plan.preproduction.customMaterials].map(m=>'- '+m.id+'：'+link('源码',m.code.path)+' · '+link('用法',m.usage.path)+' · '+link('演示',m.demo.path)+'；用于 '+m.shotIds.join(', ')),
    ...plan.preproduction.assets.map(a=>'- '+link(a.id,a.link)+'：'+a.purpose)];
}

export function prepareDirectorMaterialChanges(plan,visual,options) {
  const beats=visual.scenes.flatMap(s=>s.beats),changes=[];
  for(const shot of plan.preproduction.shots) {
    const used=beats.filter(b=>b.planShotIds.includes(shot.id));
    const ids=[...new Set(used.flatMap(b=>b.libraryIds))];
    if(JSON.stringify(ids)!==JSON.stringify(shot.libraryIds)) {
      changes.push({shotId:shot.id,previousIds:shot.libraryIds,actualIds:ids,implementation:used.map(b=>b.reason).join('; ')});
      shot.libraryIds=ids;shot.route=ids.length>1?'compose':ids.length?'library':'custom';
    }
  }
  if(!changes.length)return false;
  prepareProductionMaterials(plan,options);plan.materialChanges=[...(plan.materialChanges??[]),...changes];return true;
}
