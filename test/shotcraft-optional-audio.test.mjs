import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {hash,loadLibraries} from '../apps/video-factory/src/creative-plan.mjs';
const root=resolve(import.meta.dirname,'..'),archive=join(root,'integrations/motion-sources/Vincentwei1021/video-shotcraft/full-adaptation'),json=p=>JSON.parse(readFileSync(p,'utf8')),validation=json(join(archive,'optional-audio-validation.json')),libraries=loadLibraries(root);
test('Optional original sound effects remain byte-identical, self-contained and restore every pinned sound cue',()=>{
  const original=readFileSync(join(archive,'originals/template/src/aifl/Main.tsx'),'utf8');
  const expected=[...original.matchAll(/\{\s*from:\s*(\d+),\s*src:\s*'([^']+)',\s*volume:\s*([\d.]+)\s*\}/gu)].map(m=>({from:Number(m[1]),src:m[2],volume:Number(m[3])}));
  assert.equal(expected.length,32);assert.equal(validation.files.length,11);
  for(const file of validation.files){const bytes=readFileSync(join(root,file.path));assert.equal(hash(bytes),file.sha256,file.key);assert.equal(bytes.length,file.bytes);}
  const films=libraries.motions.filter(m=>m.optionalAudio);assert.equal(films.length,9);
  for(const film of films){assert.equal(film.optionalAudio.enabledByDefault,false);const bytes=readFileSync(join(root,film.optionalAudio.manifest)),manifest=JSON.parse(bytes);assert.equal(hash(bytes),film.optionalAudio.sha256);assert.equal(manifest.enabledByDefault,false);assert.equal(manifest.fps,30);assert.equal(manifest.durationInFrames,1085);assert.deepEqual(manifest.config.SFX,expected);
    assert.deepEqual(manifest.cues.map(({durationInFrames,...cue})=>cue),expected);
    for(const cue of manifest.cues)assert.equal(cue.durationInFrames,cue.src==='keyboard.mp3'?(cue.from>700?44:24):90);
    assert.deepEqual(Object.keys(manifest.audio).sort(),validation.files.map(f=>f.key).sort());
    for(const file of manifest.files){assert.match(manifest.audio[file.key],/^data:audio\/mpeg;base64,/u);assert.equal(hash(Buffer.from(manifest.audio[file.key].split(',')[1],'base64')),file.sha256);}
    assert.ok(readFileSync(join(root,film.usage),'utf8').includes('config={originalAudio.config}'));
  }
});
test('Optional sound demos have native renderer evidence while original visual evidence and silent defaults stay valid',()=>{
  assert.equal(validation.passed,true);assert.equal(validation.defaultAudio,'disabled and verified silent');const migration=json(join(root,'integrations/motion-sources/motion-usage-standardization.json'));assert.equal(validation.afterLibraryDigest,migration.beforeLibraryDigest);assert.equal(migration.afterLibraryDigest,libraries.digest);assert.equal(validation.templates.length,9);
  assert.equal(validation.productionContractDigest,migration.beforeProductionContractFileDigest);assert.equal(migration.afterProductionContractFileDigest,hash(readFileSync(join(root,'.agents/skills/video-production-quality/SKILL.md'))));
  for(const result of validation.templates){const film=libraries.motions.find(m=>m.id===result.id);assert.equal(hash(readFileSync(join(root,film.module))),result.sourceSha256);assert.equal(result.manifestSha256,film.optionalAudio.sha256);assert.equal(hash(readFileSync(join(root,film.optionalAudio.demo))),result.demoSha256);assert.equal(result.fullDecode,'passed');assert.equal(result.audioRendering,'passed using actual project bridge');assert.equal(result.cues,32);assert.ok(result.meanVolumeDb>-70);}
  const gallery=readFileSync(join(root,'assets/motion-library/shotcraft-gallery.html'),'utf8');assert.equal((gallery.match(/class="audio-mode"/gu)??[]).length,9);
  for(const obsolete of ['motion-library-api.md','video-shotcraft-integration.md','video-shotcraft-full-adaptation.md'])assert.equal(existsSync(join(root,'docs',obsolete)),false);
});
