import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {join,relative} from 'node:path';
import {tmpdir} from 'node:os';
import {resolveApprovedStoryboard} from '../apps/video-factory/src/approval.mjs';
import {hash} from '../apps/video-factory/src/creative-plan.mjs';
import {writeCurrentProductionFixture} from './helpers/current-production-fixture.mjs';
test('current approval binds project paths, actual current plan, code, audio and visual evidence',t=>{
  const root=mkdtempSync(join(tmpdir(),'current-approval-'));t.after(()=>rmSync(root,{recursive:true,force:true}));const f=writeCurrentProductionFixture(root),path=join(root,'final.json'),p=x=>relative(root,x).replaceAll('\\','/');
  const row={fullName:'fixture/approved',researchStatus:'completed',finalScore:20,videoApproved:true,projectPath:p(f.layout.projectDirectory),researchPath:p(f.layout.resourcesDirectory),storyboardPath:p(f.layout.storyboardPath),videoPath:p(f.layout.videoPath),editorialContractDigest:f.contract.digest,researchCommit:f.research.project.versionOrCommit,editorialPlanDigest:hash(JSON.stringify(f.plan)),storyboardDigest:hash(readFileSync(f.layout.storyboardPath))};
  const save=r=>writeFileSync(path,JSON.stringify({schemaVersion:1,rows:[r]}));save(row);const options={projectRoot:root,finalRankingPath:path,fullName:row.fullName,editingSkill:f.editingSkill};assert.equal(resolveApprovedStoryboard(options).videoPath,f.layout.videoPath);
  save({...row,videoApproved:false});assert.throws(()=>resolveApprovedStoryboard(options),/not approved/);save(row);assert.throws(()=>resolveApprovedStoryboard({...options,fullName:'fixture/missing'}),/absent/);
  save({...row,storyboardPath:'../outside.json'});assert.throws(()=>resolveApprovedStoryboard(options),/escapes/);save(row);
  writeFileSync(f.layout.storyboardPath,JSON.stringify(f.storyboard)+'\n');assert.throws(()=>resolveApprovedStoryboard(options),/changed after final ranking/);writeFileSync(f.layout.storyboardPath,JSON.stringify(f.storyboard));
  const reviewPath=f.storyboard.meta.visualPreflight.reportPath,review=JSON.parse(readFileSync(reviewPath,'utf8'));review.status='pending';writeFileSync(reviewPath,JSON.stringify(review));assert.throws(()=>resolveApprovedStoryboard(options),/Visual preflight is pending/);
});
