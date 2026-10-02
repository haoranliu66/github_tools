import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,writeFileSync,mkdirSync,mkdtempSync,existsSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {readMotionCatalog,readMaterialUsage,validateMaterialUsage,validateRetrievalDescription,USAGE_SECTIONS,usageSections,materialDiscoveryPrompt,checkMaterial} from '../apps/video-factory/src/material-usage.mjs';
import {searchMaterials} from '../apps/video-factory/src/material-search.mjs';
import {loadLibraries,hash,validateCreativeSource} from '../apps/video-factory/src/creative-plan.mjs';
const root=resolve(import.meta.dirname,'..'),json=p=>JSON.parse(readFileSync(p,'utf8'));
const cli=(...args)=>spawnSync(process.execPath,[join(root,'apps/video-factory/src/library-cli.mjs'),...args],{cwd:root,encoding:'utf8',windowsHide:true});
function scratch(t){const dir=mkdtempSync(join(tmpdir(),'motion-usage-'));t.after(()=>{assert.ok(resolve(dir).startsWith(resolve(tmpdir())));rmSync(dir,{recursive:true,force:true});});return dir;}
test('Every admitted material has a complete, isolated callable usage and distinctive scene description',()=>{
 const motions=readMotionCatalog(root);assert.equal(motions.length,272);
 for(const m of motions){const text=readMaterialUsage(root,m.id);validateRetrievalDescription(m.description);validateMaterialUsage(text,m);checkMaterial(root,m.id);
  const example=usageSections(text).get(USAGE_SECTIONS.example),source=/```jsx\n([\s\S]+?)```/u.exec(example)[1];validateCreativeSource(source);
  assert.equal(text.includes('data:audio'),false,m.id);assert.equal(text.includes('可选原音效'),!!m.optionalAudio,m.id);
  assert.equal(/YourPage|YourHero|YourLayout|YourRow|<Result /u.test(source),false,m.id);
  assert.equal(/用 A|用 B|A 式|B 式|（A）|（B）/u.test(m.description),false,m.id);
 }
});
test('Metadata search and selected-section reading do not require styles, sources or unrelated usages',t=>{
 const dir=scratch(t);mkdirSync(join(dir,'config'));mkdirSync(join(dir,'selected'));
 const catalog={schemaVersion:3,motions:[{id:'selected',description:'灰背网格沿对角波前翻面。适合功能墙。',usage:'selected/usage.md',module:'missing.jsx'},
 {id:'unreadable',description:'文字逐字输入。适合命令演示。',usage:'never-created.md'},
 {id:'private',description:'私有页面飞入。适合内部演示。',reuseScope:'project',sourceProject:'owner/private',usage:'private.md'}]};
 writeFileSync(join(dir,'config/motion-library.json'),JSON.stringify(catalog));
 writeFileSync(join(dir,'selected/usage.md'),'# selected\n\n## 参数\n\nCURRENT_INPUT\n\n## 输入资源\n\nIRRELEVANT_CANARY\n');
 const matches=searchMaterials(readMotionCatalog(dir),{query:'对角波前翻面',limit:2});assert.ok(matches.some(m=>m.id==='selected'));assert.ok(matches.every(m=>!('module' in m)&&!('usage' in m)));
 assert.equal(existsSync(join(dir,'config/style-library.json')),false);
 const text=readMaterialUsage(dir,'selected',{section:'parameters'});assert.ok(text.includes('CURRENT_INPUT'));assert.ok(!text.includes('IRRELEVANT_CANARY'));
 assert.throws(()=>readMaterialUsage(dir,'private'),/scope/);assert.equal(readMotionCatalog(dir,{fullName:'owner/private'}).length,3);
 assert.throws(()=>readMaterialUsage(dir,'selected',{section:'all'}),/section/);
});
test('Descriptions retrieve distinguishable effects rather than only a common family',()=>{
 const motions=readMotionCatalog(root),results=q=>searchMaterials(motions,{query:q,limit:5});
 assert.ok(results('琥珀流光逐格描亮边框 内容点亮 功能墙').some(m=>m.id==='shotcraft-template-bento-light-up'));
 assert.ok(results('对角线 灰背 翻面 网格 功能墙').some(m=>m.id==='shotcraft-template-grid-wave-flip'||m.id==='shotcraft-grid-wave-flip'));
 assert.ok(results('长列表急刹回弹 四角瞄准框锁住目标行').some(m=>m.id==='shotcraft-template-brake-reticle-lock'));
 const a=motions.find(m=>m.id==='shotcraft-template-crash-zoom-real'),b=motions.find(m=>m.id==='shotcraft-template-crash-impact-real');assert.notEqual(a.description,b.description);assert.match(a.description,/弹回/);assert.match(b.description,/震屏/);
});
test('Registration rejects missing structure, wrong imports, broken JSX and source-comment descriptions',()=>{
 const m=readMotionCatalog(root)[0],valid=readMaterialUsage(root,m.id);assert.doesNotThrow(()=>validateMaterialUsage(valid,m));
 assert.throws(()=>validateMaterialUsage(valid.replace('## 输入资源','## 安装回顾'),m),/section/);
 assert.throws(()=>validateMaterialUsage(valid.replace('## 参数','## 最小调用'),m),/Duplicate/);
 assert.throws(()=>validateMaterialUsage(valid.replace(`import {${m.exportName}}`,`// ${m.exportName}\nimport {Other}`),m),/import and call/);
 assert.throws(()=>validateMaterialUsage(valid.replace('return (','return ( <broken>'),m));
 assert.throws(()=>validateRetrievalDescription('// review 点名；适合展示'),/descriptions/);
 assert.throws(()=>validateRetrievalDescription('完整模板，炫酷好用'),/scenario/);
 const sections=usageSections('# Demo\n## 最小调用\n```jsx\n// heading\n## 参数\n```\n## 参数\nreal parameter');assert.ok(sections.get('最小调用').includes('## 参数'));assert.equal(sections.get('参数'),'real parameter');
});
test('Invalid add requests fail before any library directory or catalog mutation',t=>{
 const dir=scratch(t),request=join(dir,'material.json'),id='invalid-standardization-canary';
 writeFileSync(join(dir,'usage.md'),'# Invalid\n\n## 画面与用途\nMissing all remaining sections.');
 writeFileSync(request,JSON.stringify({id,description:'文字从模糊变清晰。适合结果揭晓。',module:'missing.jsx',demo:'missing.mp4',usageFile:'usage.md',supports:['结果揭晓']}));
 const before=hash(readFileSync(join(root,'config/motion-library.json'))),result=cli('add','--request',request);assert.notEqual(result.status,0);assert.match(result.stderr,/section/);assert.equal(existsSync(join(root,'assets/motion-library',id)),false);assert.equal(hash(readFileSync(join(root,'config/motion-library.json'))),before);
});
test('CLI defaults and search expose only compact discovery; usage is selected explicitly',()=>{
 const help=cli();assert.equal(help.status,0);assert.ok(help.stdout.length<2000);assert.ok(!help.stdout.includes('gradient-text'));
 const result=cli('search','--query','逐格点亮边框','--limit','3');assert.equal(result.status,0);const data=JSON.parse(result.stdout);assert.ok(data.matches.length<=3);assert.equal(data.next,'usage --id SELECTED_ID');
 for(const match of data.matches)assert.deepEqual(Object.keys(match).sort(),['description','id','routes','score']);
 const usage=cli('usage','--id','gradient-text','--section','example');assert.equal(usage.status,0);assert.ok(usage.stdout.includes('export default'));assert.ok(!usage.stdout.includes('## 输入资源'));
 const demo=cli('demo');assert.notEqual(demo.status,0);assert.match(demo.stderr,/Choose a material/);
});
test('Optional audio queries retain files and original cue timing without emitting embedded bytes',()=>{
 const result=cli('audio','--id','shotcraft-template-film-ink-press');assert.equal(result.status,0);assert.ok(!result.stdout.includes('data:audio'));assert.ok(!result.stdout.includes('base64,'));
 const data=JSON.parse(result.stdout);assert.equal(data.enabledByDefault,false);assert.equal(data.files.length,11);assert.equal(data.config.SFX.length,32);assert.equal(data.fps,30);assert.equal(data.durationInFrames,1085);assert.ok(!Object.hasOwn(data,'audio'));
 assert.notEqual(cli('audio','--id','gradient-text').status,0);
});
test('One discovery protocol scopes later reads to selected materials and the current question',()=>{
 const prompt=materialDiscoveryPrompt({fullName:'owner/repo'});assert.ok(prompt.includes('usage --repo owner/repo --id ID'));assert.ok(prompt.includes('--section'));assert.ok(prompt.includes('specific unresolved question'));assert.ok(prompt.includes('Do not preload'));assert.ok(prompt.includes('unchanged'));assert.ok(!prompt.includes('GridWaveFlip'));
});
test('Documentation migration preserves every source fingerprint and historical digest chain',()=>{
 const report=json(join(root,'integrations/motion-sources/motion-usage-standardization.json'));assert.equal(report.totalMotions,272);assert.equal(report.sourceDigests.length,272);assert.equal(report.sourceCodeUnchanged,true);assert.equal(report.afterLibraryDigest,loadLibraries(root).digest);
 for(const source of report.sourceDigests)assert.equal(hash(readFileSync(join(root,source.path))),source.sha256,source.id);
 assert.equal(report.afterProductionContractFileDigest,hash(readFileSync(join(root,'.agents/skills/video-production-quality/SKILL.md'))));assert.notEqual(report.beforeProductionContractFileDigest,report.afterProductionContractFileDigest);
});
