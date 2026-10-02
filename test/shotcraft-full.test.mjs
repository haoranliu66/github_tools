import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync,existsSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {hash,loadLibraries,validateCreativeSource} from '../apps/video-factory/src/creative-plan.mjs';
const root=resolve(import.meta.dirname,'..'),archive=join(root,'integrations/motion-sources/Vincentwei1021/video-shotcraft/full-adaptation');
const json=p=>JSON.parse(readFileSync(p,'utf8'));
const definitions=json(join(archive,'definitions.json')),coverage=json(join(archive,'coverage.json')),technical=json(join(archive,'technical-validation.json')),libraries=loadLibraries(root);
test('Every pinned Shotcraft gallery variant resolves to an admitted executable full template and retained demo',()=>{
  assert.equal(new Set(coverage.styles.map(c=>c.card)).size,157);
  assert.equal(coverage.styles.length,214);
  assert.deepEqual(coverage.unmapped,[]);
  assert.deepEqual(technical.errors,[]);
  const inspected=json(join(archive,'visual-inspection.json'));
  for(const variant of coverage.styles)assert.ok(definitions.some(d=>d.id===variant.id),variant.key);
  for(const d of definitions){const material=libraries.motions.find(m=>m.id===d.id),record=technical.results.find(r=>r.id===d.id);
    assert.ok(material?.module&&material.demo&&material.usage&&material.description,d.id);
    assert.equal(hash(readFileSync(join(root,material.module))),d.sha256);
    assert.equal(record.sourceSha256,d.sha256);assert.equal(record.durationInFrames,d.duration);assert.equal(record.decode,'passed');
    assert.equal(hash(readFileSync(join(root,material.demo))),record.sha256);
    assert.equal(inspected.templates.find(r=>r.id===d.id).sourceSha256,d.sha256);
    assert.ok(readFileSync(join(root,material.usage),'utf8').includes(material.exportName));
    validateCreativeSource(readFileSync(join(root,material.module),'utf8'));
    for(const field of ['source','origin','quality','review'])assert.equal(Object.hasOwn(material,field),false);
  }
});
test('Full Shotcraft source archive retains pinned digests and screenshot dimensions match the local asset manifest',()=>{
  const inventory=json(join(archive,'source-inventory.json'));
  for(const file of inventory.files)assert.equal(hash(readFileSync(join(archive,'originals',file.path))),file.sha256,file.path);
  assert.match(readFileSync(join(archive,'../LICENSE'),'utf8'),/Apache License/);
  const assets=json(join(archive,'asset-validation.json'));assert.equal(assets.screenshots.length,243);
  for(const asset of assets.screenshots){const png=readFileSync(join(root,'assets/motion-library/shotcraft-screenshots',asset.theme,asset.file));assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(png.readUInt32BE(16),asset.width);assert.equal(png.readUInt32BE(20),asset.height);}
  assert.ok(existsSync(join(archive,'originals/template/src/aifl/live-layout.json')));
});
test('Shotcraft dependencies align with the installed renderer and native project import bridge uses custom screenshot and video inputs',()=>{
  const manifest=json(join(root,'package.json'));
  const remotionVersion=json(join(root,'node_modules/remotion/package.json')).version;
  for(const name of ['@remotion/three','@remotion/motion-blur']){assert.equal(manifest.dependencies[name],remotionVersion);assert.equal(json(join(root,'node_modules',name,'package.json')).version,remotionVersion);}
  for(const name of ['@react-three/fiber','three'])assert.equal(json(join(root,'node_modules',name,'package.json')).version,manifest.dependencies[name]);
  const integration=json(join(archive,'integration-validation.json'));assert.equal(integration.passed,true);assert.equal(integration.libraryDigest,libraries.digest);assert.equal(integration.visualReview,'sampled frames inspected');
  assert.ok(integration.checks.some(s=>s.includes('Confidence')));
  assert.ok(integration.checks.some(s=>s.includes('Three')));
  assert.ok(integration.checks.some(s=>s.includes('video')));
});
