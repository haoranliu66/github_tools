import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,readdirSync,mkdtempSync,mkdirSync,writeFileSync,rmSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {readStyleCatalog,findStyle,styleMarkdown,styleRenderingTokens,validateTextStyle,searchStyles,STYLE_SECTIONS} from '../apps/video-factory/src/style-library.mjs';
import {loadLibraries,hash} from '../apps/video-factory/src/creative-plan.mjs';
import {createProductionPackage} from '../apps/video-factory/src/production-package.mjs';
const root=resolve(import.meta.dirname,'..'),json=p=>JSON.parse(readFileSync(p,'utf8'));
const styles=readStyleCatalog(root),migration=json(join(root,'integrations/style-sources/2026-10-03-style-library.json'));
const cli=(...args)=>spawnSync(process.execPath,[join(root,'apps/video-factory/src/library-cli.mjs'),...args],{cwd:root,encoding:'utf8',windowsHide:true});
test('All 21 styles use synchronized text cards and no active style image assets',()=>{
 assert.equal(styles.length,21);assert.equal(migration.oldStyleIds.length,13);assert.equal(migration.newStyleIds.length,8);assert.equal(migration.removedImages.length,9);
 for(const s of styles){validateTextStyle(s);const text=readFileSync(join(root,s.descriptionFile),'utf8');assert.equal(text,styleMarkdown(s));for(const label of Object.values(STYLE_SECTIONS))assert.ok(text.includes('## '+label),s.id);}
 const directory=join(root,'assets/style-library'),files=readdirSync(directory,{recursive:true,withFileTypes:true}).filter(e=>e.isFile());
 assert.equal(files.length,21);assert.ok(files.every(e=>e.name==='description.md'));
});
test('Text migration preserves every original rendering token and the full motion catalog',()=>{
 for(const original of migration.originalStyles)assert.deepEqual(styleRenderingTokens(findStyle(root,original.id)),styleRenderingTokens(original),original.id);
 assert.equal(hash(readFileSync(join(root,'config/motion-library.json'))),migration.motionCatalogSha256);
 const motion=json(join(root,'integrations/motion-sources/motion-usage-standardization.json'));assert.equal(migration.beforeLibraryDigest,motion.afterLibraryDigest);assert.equal(migration.afterLibraryDigest,loadLibraries(root).digest);
});
test('Search differentiates visual language and exposes only description-sized matches',()=>{
 for(const [query,id]of [['撕边剪纸 手写箭头 拼贴 知识故事','mixed-media-collage'],['早期桌面 像素 等宽字 开发者','retro-digital'],['半透明圆角 玻璃 高光 连续变形 软件','liquid-glass-product'],['雾蓝淡紫 悬浮 梦境 超现实','dreamcore-surreal']]){
  const matches=searchStyles(root,{query,limit:3});assert.ok(matches.some(s=>s.id===id),query);assert.ok(matches.every(s=>!('palette' in s)&&!('visualDescription' in s)&&!('descriptionFile' in s)));
 }
});
test('Style metadata search needs no motion files or reference images and later reads select one section',()=>{
 const dir=mkdtempSync(join(tmpdir(),'text-style-'));try{
  mkdirSync(join(dir,'config'));writeFileSync(join(dir,'config/style-library.json'),JSON.stringify({schemaVersion:1,styles:[findStyle(root,'mixed-media-collage')]}));
  assert.equal(searchStyles(dir,{query:'撕边剪纸'}).length,1);
  const text=styleMarkdown(findStyle(dir,'mixed-media-collage'),{section:'motion'});assert.ok(text.includes('停格'));assert.ok(!text.includes('## 字幕'));
  assert.throws(()=>styleMarkdown(styles[0],{section:'all'}),/section/);
 }finally{assert.ok(resolve(dir).startsWith(resolve(tmpdir())));rmSync(dir,{recursive:true,force:true});}
});
test('Style CLI returns selected text or rendering tokens without changing motion discovery',()=>{
 const found=cli('search','--type','style','--query','撕边剪纸 手写箭头','--limit','2');assert.equal(found.status,0);const matches=JSON.parse(found.stdout);assert.equal(matches.next,'style --id SELECTED_ID');assert.ok(matches.matches.length<=2);assert.ok(matches.matches.some(s=>s.id==='mixed-media-collage'));
 const selected=cli('style','--id','liquid-glass-product','--section','tokens');assert.equal(selected.status,0);assert.deepEqual(JSON.parse(selected.stdout),styleRenderingTokens(findStyle(root,'liquid-glass-product')));
 assert.notEqual(cli('style','--id','missing').status,0);assert.notEqual(cli('search','--type','image','--query','glass').status,0);
});
test('Incomplete or image-based additions are rejected before production library use',()=>{
 const incomplete=structuredClone(styles[0]);delete incomplete.visualDescription.motion;assert.throws(()=>validateTextStyle(incomplete),/text section/);
 const photo=structuredClone(styles[0]);photo.preview='preview.png';assert.throws(()=>validateTextStyle(photo),/images/);
 const embedded=structuredClone(styles[0]);embedded.visualDescription.materials='![风格](preview.png)';assert.throws(()=>validateTextStyle(embedded),/images/);
 const color=structuredClone(styles[0]);color.palette.ink='#12345';assert.throws(()=>validateTextStyle(color),/CSS palette/);
});
test('Human style choice keeps automatic discovery outside the research prompt',()=>{
 const research=readFileSync(join(root,'apps/repo-researcher/src/fact-cli.mjs'),'utf8');assert.ok(!research.includes('styleDiscoveryPrompt'));assert.ok(research.includes('Human style selection required'));assert.ok(research.includes('Planning changed the human-selected style'));assert.ok(!research.includes('Choose a style by reading config/style-library.json'));
 const index=json(join(root,'docs/production-reference-index.json'));assert.equal(index.styles.length,21);for(const s of index.styles){assert.ok(s.description);assert.equal(s.file,findStyle(root,s.id).descriptionFile);}
});
