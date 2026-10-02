import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdirSync,mkdtempSync,readFileSync,rmSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {contentSchema,makeCreativePlan,makeAudioDraft,compileTimeline,loadLibraries,normalizeTiming,validateCreativeSource,hash} from '../apps/video-factory/src/creative-plan.mjs';
import {buildCreativeProgram,verifyCreativeProgram} from '../apps/video-factory/src/creative-program.mjs';
import {buildNarrationBlocks} from '../apps/video-factory/src/narration-blocks.mjs';
import {validateStoryboard,durationInFrames} from '../apps/video-factory/src/storyboard.mjs';
const root=resolve(import.meta.dirname,'..');const libraries=loadLibraries(root);
const research={project:{url:'https://github.com/a/b',versionOrCommit:'commit'},claims:[{claim:'输入保存'},{claim:'下次找回'}]};
const content={title:'先保存再找回',fullNarration:'输入保存。下次找回。',styleId:libraries.styles[0].id,visualIntent:'让内容移动并被找回',
  units:[{id:'input',heading:'输入',narration:'输入保存。',visualIntent:'保存的动作',claimIndexes:[0]},
    {id:'retrieve',heading:'找回',narration:'下次找回。',visualIntent:'查询的动作',claimIndexes:[1]}]};
const timing={totalFrames:120,measuredTotal:4,clips:[{startFrame:0,spokenFrames:60,text:'输入保存。'},{startFrame:60,spokenFrames:60,text:'下次找回。'}]};
const source="import React from 'react';import {FlowPacket} from './motion-library.jsx';export default function Shot(){return <FlowPacket from={{x:100,y:100}} to={{x:900,y:600}} label='偏好'/>;}";
const beat=(id,startFrame,endFrame,narrationCue)=>({id,startFrame,endFrame,narrationCue,purpose:'信息移动到保存位置',claimIndexes:[0],
  route:'library',libraryIds:['flow-packet'],candidates:[{id:'flow-packet',fit:'实际内容沿轨迹移动'}],reason:'信息移动符合这段含义',source});
const visual={styleId:libraries.styles[1].id,designSummary:'跨语义段落重划场景',scenes:[{id:'new',title:'连续演示',startFrame:0,endFrame:120,purpose:'连贯保存再找回',claimIndexes:[0,1],
  beats:[beat('save',0,60,'输入保存'),{...beat('find',60,120,'下次找回'),claimIndexes:[1],route:'custom',libraryIds:[],source:'export default function Shot({frame}) {return <svg><circle cx={frame*2} cy={200} r={80}/></svg>;}'}]}]};
const plan=makeCreativePlan({fullName:'a/b',researchText:JSON.stringify(research),contract:{digest:'contract'},editingSkill:{digest:'skill'},content,libraries});
const compile=v=>compileTimeline({audioStoryboard:{...makeAudioDraft(plan,research),voiceover:"narration.wav"},timing,visual:v,research,libraries,contentDigest:plan.contentDigest});

test('pre-audio content schema has no frozen scenes, frames, beat or action vocabulary',()=> {
  assert.equal(contentSchema().properties.scenes,undefined);
  const draft=makeAudioDraft(plan,research);assert.equal(draft.meta.productionStage,'audio-ready');
  assert.equal(draft.scenes[0].duration,undefined);assert.equal(draft.scenes[0].visualBeats,undefined);
  assert.equal(plan.visual,null);
  const config=JSON.parse(readFileSync(join(root,'config/video-editorial.json'),'utf8'));
  const blocks=buildNarrationBlocks(draft,config);assert.ok(blocks.length);assert.equal(blocks.map(b=>b.text).join(''),content.fullNarration);
});
test('post-audio direction reorganizes scenes while preserving every audio frame and caption',()=> {
  const result=compile(visual);assert.equal(result.storyboard.scenes.length,1);
  assert.equal(durationInFrames(result.storyboard),120);assert.deepEqual(validateStoryboard(result.storyboard),[]);
  assert.equal(result.storyboard.meta.globalCaptions.map(c=>c.text).join(''),content.fullNarration);
  assert.equal(result.storyboard.meta.style.id,libraries.styles[1].id);
  assert.equal(result.decisions[1].route,'custom');
});
test('visual gaps, overlaps, nonexistent cues and unused selected exports fail before publishing',()=> {
  let v=structuredClone(visual);v.scenes[0].startFrame=1;assert.throws(()=>compile(v),/cover measured/);
  v=structuredClone(visual);v.scenes[0].beats[1].startFrame=61;assert.throws(()=>compile(v),/contiguously/);
  v=structuredClone(visual);v.scenes[0].beats[1].narrationCue='输入保存';assert.throws(()=>compile(v),/measured audio interval/);
  v=structuredClone(visual);v.scenes[0].beats[0].source='export default ()=>null';assert.throws(()=>compile(v),/not used/);
});
test('split visual scenes keep global captions continuous without duplicating narration',()=> {
  const v={...visual,scenes:[{...visual.scenes[0],endFrame:30,beats:[beat('a',0,30,'输入保存')]},
    {...visual.scenes[0],id:'next',startFrame:30,beats:[beat('b',0,30,'输入保存'),{...visual.scenes[0].beats[1],startFrame:30,endFrame:90}]}]};
  const result=compile(v);assert.equal(result.storyboard.scenes[0].captions[0].endFrame,30);
  assert.equal(result.storyboard.scenes[1].captions[0].endFrame,30);
  assert.equal(result.storyboard.meta.globalCaptions.length,2);assert.equal(durationInFrames(result.storyboard),120);
});
test('free JSX permits installed browser package imports and arbitrary visual semantics',()=> {
  assert.doesNotThrow(()=>validateCreativeSource("import {createPortal} from 'react-dom'; export default function OrbitalMesh(){return <svg/>}"));
  assert.throws(()=>validateCreativeSource("export default function Shot(){fetch('x');return null;}"),/offline/);
  assert.throws(()=>validateCreativeSource("import fs from 'node:fs';export default ()=>null"),/offline/);
});
test('GitHub adaptations retain exact pinned source digests and MIT notices; styles vary beyond colors',()=> {
  const provenance=JSON.parse(readFileSync(join(root,'integrations/motion-sources/catalog-provenance.json'),'utf8'));
  assert.equal(provenance.filter(m=>m.origin==='github-adapted').length,17);
  for(const m of provenance.filter(m=>m.source)) {
    const base=join(root,'integrations/motion-sources',m.source.repository);
    assert.equal(hash(readFileSync(join(base,m.source.file))),m.source.sha256);
    assert.match(readFileSync(join(root,m.source.licenseFile),'utf8'),/MIT License/);
  }
  assert.ok(new Set(libraries.styles.map(s=>s.layout.composition)).size>=4, 'Library extensions must preserve composition diversity.');
  assert.ok(new Set(libraries.styles.map(s=>s.background)).size>=4, 'Library extensions must preserve background diversity.');
  assert.ok(libraries.styles.some(s=>s.typography.heading!==libraries.styles[0].typography.heading));
});
test('compiled creative program detects edits to audio, timing, code and shot mapping',t=> {
  const resources=mkdtempSync(join(tmpdir(),'zimeiti-creative-program-'));t.after(()=>rmSync(resources,{recursive:true,force:true}));
  mkdirSync(join(resources,'production'));writeFileSync(join(resources,'production/narration.wav'),'fixture-audio');
  writeFileSync(join(resources,'production/timing.json'),JSON.stringify(timing));
  const compiled=compile(visual);mkdirSync(join(resources,'production/assets'));writeFileSync(join(resources,'production/assets/demo.png'),'asset');compiled.storyboard.meta.materials=[{id:'demo',src:'assets/demo.png'}];
  const built=buildCreativeProgram(compiled,{resourcesDirectory:resources});
  assert.equal(verifyCreativeProgram(built.storyboard,resources).program.humanReview,'pending');
  writeFileSync(join(resources,'production/assets/demo.png'),'changed');assert.throws(()=>verifyCreativeProgram(built.storyboard,resources),/material changed/);writeFileSync(join(resources,'production/assets/demo.png'),'asset');
  writeFileSync(join(resources,'production/timing.json'),'changed');assert.throws(()=>verifyCreativeProgram(built.storyboard,resources),/timing changed/);
});

test('Shotcraft retained source, adapters, licenses and playable demos agree with the admission archive',()=> {
  const base=join(root,'integrations/motion-sources/Vincentwei1021/video-shotcraft');
  const review=JSON.parse(readFileSync(join(base,'source-review.json'),'utf8'));
  const technical=JSON.parse(readFileSync(join(base,'technical-validation.json'),'utf8'));
  assert.match(review.commit,/^[a-f0-9]{40}$/);
  assert.equal(review.executedUpstream,false);
  assert.match(readFileSync(join(base,'LICENSE'),'utf8'),/Apache License/);
  for(const file of review.inspectedFiles)assert.equal(hash(readFileSync(join(base,file.path))),file.sha256);
  for(const adopted of review.adoptedMotions) {
    const material=libraries.motions.find(m=>m.id===adopted.id);
    assert.ok(material?.module&&material.usage&&material.demo&&material.description);
    const source=readFileSync(join(root,material.module),'utf8');
    assert.equal(hash(source),adopted.sha256);
    assert.match(source,/Copyright 2026 Wei Yihao/);
    assert.match(source,/Modified 2026-10-02/);
    assert.equal(hash(readFileSync(join(root,material.demo))),technical.results.find(r=>r.id===material.id).sha256);
    assert.ok(readFileSync(join(root,material.usage),'utf8').includes(material.exportName));
  }
  for(const adopted of review.adoptedStyles) {
    const style=libraries.styles.find(s=>s.id===adopted.id);assert.ok(style);
    for(const field of ['palette','background','typography','geometry','layout','illustration','motion','transitions','captions'])assert.ok(style[field]);
  }
});
