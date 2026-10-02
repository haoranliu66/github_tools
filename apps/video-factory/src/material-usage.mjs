import {readFileSync,existsSync,realpathSync} from 'node:fs';
import {join} from 'node:path';
import {createRequire} from 'node:module';
import {safeResourcePath} from './creative-plan.mjs';

export const USAGE_SECTIONS={purpose:'画面与用途',example:'最小调用',parameters:'参数',assets:'输入资源',timing:'时间与组合',references:'按需深入'};
export function validateRetrievalDescription(text) {
  if(typeof text!=='string'||!text.trim()||!/(?:适合|适用|用于)/u.test(text))throw new Error('Describe the visible motion and a suitable scenario (适合/适用/用于).');
  if(/```|\/\/|评审结论|许可评审|完整接口|originalProps|Easing\.|stiffness\s*\d/u.test(text))throw new Error('Retrieval descriptions must describe visible characteristics and scenarios; keep implementation and reviews in separate records.');
}
export function readMotionCatalog(root,{fullName=null}={}) {
  const catalog=JSON.parse(readFileSync(join(root,'config/motion-library.json'),'utf8'));
  if(catalog.schemaVersion!==3||!Array.isArray(catalog.motions))throw new Error('Current motion catalog required.');
  return catalog.motions.filter(m=>m.reuseScope!=='project'||m.sourceProject===fullName);
}
export function findMaterial(root,id,options={}) {
  const material=readMotionCatalog(root,options).find(m=>m.id===id);
  if(!material)throw new Error('Unknown material in this project scope.');
  return material;
}
export function usageSections(text) {
  // Fenced code may contain Markdown headings; only document headings split sections.
  const blocks=new Map();let heading=null,fenced=false;
  for(const line of text.replaceAll('\r\n','\n').split('\n')) {
    if(/^```/u.test(line))fenced=!fenced;
    const match=!fenced&&/^## (.+)$/u.exec(line);
    if(match){heading=match[1];if(blocks.has(heading))throw new Error('Duplicate usage section: '+heading);blocks.set(heading,[]);}
    else if(heading)blocks.get(heading).push(line);
  }
  return new Map([...blocks].map(([name,lines])=>[name,lines.join('\n').trim()]));
}
export function validateMaterialUsage(text,{exportName}={}) {
  if(typeof text!=='string'||!/^# .+/mu.test(text))throw new Error('Usage needs a material title.');
  const blocks=usageSections(text);
  for(const name of Object.values(USAGE_SECTIONS))if(!blocks.get(name))throw new Error('Usage needs section: '+name);
  if(JSON.stringify([...blocks.keys()])!==JSON.stringify(Object.values(USAGE_SECTIONS)))throw new Error('Use exactly the six standard sections in their defined order.');
  const example=blocks.get(USAGE_SECTIONS.example);
  if(!/```jsx\n[\s\S]+?```/u.test(example)||!example.includes("'./motion-library.jsx'")||!example.includes('export default')||!example.includes(exportName??'__missing_export__'))throw new Error('Usage needs a complete JSX shot example importing its export from the local motion-library bridge.');
  const source=/```jsx\n([\s\S]+?)```/u.exec(example)[1];
  const runtime=createRequire(realpathSync(join(import.meta.dirname,'../../../node_modules/@remotion/cli/package.json')));
  const ast=runtime('@babel/parser').parse(source,{sourceType:'module',plugins:['jsx']});
  const named=ast.program.body.filter(n=>n.type==='ImportDeclaration'&&n.source.value==='./motion-library.jsx').flatMap(n=>n.specifiers).find(n=>n.type==='ImportSpecifier'&&n.imported.name===exportName);
  const visit=n=>n&&typeof n==='object'&&(n.type==='JSXOpeningElement'&&n.name.type==='JSXIdentifier'&&n.name.name===named?.local.name||Object.values(n).some(v=>Array.isArray(v)?v.some(visit):visit(v)));
  if(!named||!ast.program.body.some(n=>n.type==='ExportDefaultDeclaration')||!visit(ast.program))throw new Error('The example must import and call this material in a default-export shot.');
  if(/integrations\/motion-sources|评审结论|许可评审/u.test(text))throw new Error('Source/review archives belong outside production usage.');
  return blocks;
}
export function readMaterialUsage(root,id,{section=null,...options}={}) {
  const material=findMaterial(root,id,options),text=readFileSync(safeResourcePath(root,material.usage),'utf8');
  if(!section)return text;
  if(!Object.hasOwn(USAGE_SECTIONS,section))throw new Error('Usage section must be '+Object.keys(USAGE_SECTIONS).join('|'));
  const body=usageSections(text).get(USAGE_SECTIONS[section]);if(!body)throw new Error('Missing usage section.');
  return '# '+material.id+'\n\n## '+USAGE_SECTIONS[section]+'\n\n'+body+'\n';
}
export function materialDetails(material) {
  return {id:material.id,description:material.description,exportName:material.exportName,usage:material.usage,code:material.codePath??material.module,demo:material.demo,
    ...(material.optionalAudio?{optionalAudio:{manifest:material.optionalAudio.manifest,demo:material.optionalAudio.demo,enabledByDefault:false}}:{})};
}
export function checkMaterial(root,id,options={}) {
  const material=findMaterial(root,id,options);validateRetrievalDescription(material.description);validateMaterialUsage(readFileSync(safeResourcePath(root,material.usage),'utf8'),material);
  for(const path of [material.module??material.codePath,material.demo,...(material.optionalAudio?[material.optionalAudio.manifest,material.optionalAudio.demo]:[])])if(!path||!existsSync(safeResourcePath(root,path)))throw new Error('Missing material resource: '+path);
  return {id:material.id,usage:'standard sections present',resources:'present'};
}
export function materialDiscoveryPrompt({command='pnpm video:library',fullName=null}={}) {
  const scope=fullName?' --repo '+fullName:'';
  return `Motion discovery: first describe the current shot's visible action/result and run ${command} search${scope} --query "visual need" --limit 5. Select from descriptions, then read ${command} usage${scope} --id ID before implementing a selected motion. Read one selected material at a time; --section example|parameters|assets|timing|references narrows follow-up reads. Use ${command} show${scope} --id ID for resource paths. Inspect source/demo or ${command} references --query TOPIC only for a specific unresolved question. Do not preload the full catalog, motion manual, reference index, all usages, source archives or optional audio JSON. Reuse previously read unchanged instructions. Pass actual used libraryIds to the shot implementation; free JSX remains available.`;
}
