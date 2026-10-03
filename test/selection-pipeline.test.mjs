import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {createSelectionTemplate,validateSelection} from '../apps/trend-scout/src/selection.mjs';
import {runResearchBatch,researchArgs} from '../apps/repo-researcher/src/batch.mjs';
import {writeFinalRanking} from '../apps/trend-scout/src/final-report.mjs';
import {writeCurrentProductionFixture,installCurrentSkill} from './helpers/current-production-fixture.mjs';
test('weekly selection preserves explicit human approval and unique project identities',()=>{
  const selection={schemaVersion:1,weekId:'2026-W38',status:'draft',sourceReport:'apps/trend-scout/trend_reports/2026-W38/2026-09-14.json',selectedRepositories:Array.from({length:7},(_,i)=>`fixture/repo-${i+1}`),videoProjects:[]};
  assert.deepEqual(validateSelection(selection),[]);assert.ok(validateSelection({...selection,selectedRepositories:selection.selectedRepositories.slice(0,6)}).length);assert.ok(validateSelection({...selection,selectedRepositories:Array(7).fill('fixture/repo-1')}).length);
});
test('batch and final ranking use complete current packages without repository-run branches or demo scores',t=>{
  const root=mkdtempSync(join(tmpdir(),'current-ranking-'));t.after(()=>rmSync(root,{recursive:true,force:true}));const contract=installCurrentSkill(root),folder=join(root,'apps/trend-scout/trend_reports/2026-W38');mkdirSync(folder,{recursive:true});
  const report=join(folder,'2026-09-14.json'),rows=Array.from({length:7},(_,i)=>({rank:i+1,fullName:`fixture/repo-${i+1}`,trendScore:20-i,eligibleForResearch:true,rankingStatus:'current-discovery'}));writeFileSync(report,JSON.stringify(rows));
  const path=join(folder,'selection.json'),draft=createSelectionTemplate({projectRoot:root,reportPath:report,outputPath:path,count:7});assert.throws(()=>runResearchBatch({selectionPath:path,projectRoot:root,runner:()=>({status:0})}),/approved/);
  writeFileSync(path,JSON.stringify({...draft.selection,status:'approved',videoProjects:['fixture/repo-1']}));let calls=0;const batch=runResearchBatch({selectionPath:path,projectRoot:root,styleId:'editorial-paper',runner:()=>({status:calls++===1?1:0,stdout:JSON.stringify({status:'awaiting-main-agent',taskPath:'test-pending.json'})})});assert.equal(calls,7);assert.equal(batch.failed,1);assert.equal(batch.manifest.results.filter(r=>r.status==='awaiting-main-agent').length,6);
  const first=writeCurrentProductionFixture(root,{fullName:'fixture/repo-1',contract});writeCurrentProductionFixture(root,{fullName:'fixture/repo-2',contract,visual:false});
  const result=writeFinalRanking({projectRoot:root,selectionPath:path,editorialContract:contract,editingSkill:first.editingSkill});assert.equal(result.result.rows[0].fullName,'fixture/repo-1');assert.equal(result.result.rows[0].finalScore,20);assert.equal(result.result.rows[0].videoApproved,true);assert.equal(result.result.rows[1].videoApproved,false);assert.equal(result.result.rows[0].demoabilityScore,undefined);assert.deepEqual(researchArgs('fixture/repo-1',{selectionPath:path,styleId:'editorial-paper'}).slice(1),['--repo','fixture/repo-1','--selection',path,'--style','editorial-paper']);
  const storyboard=first.storyboard;storyboard.meta.editorialPlanDigest='f'.repeat(64);writeFileSync(first.layout.storyboardPath,JSON.stringify(storyboard));assert.throws(()=>writeFinalRanking({projectRoot:root,selectionPath:path,editorialContract:contract,editingSkill:first.editingSkill}),/stale editorial plan/);
  storyboard.meta.editorialPlanDigest=result.result.rows[0].editorialPlanDigest;writeFileSync(first.layout.storyboardPath,JSON.stringify(storyboard));const research=JSON.parse(readFileSync(join(first.layout.resourcesDirectory,'research.json'),'utf8'));research.editorialContract.digest='f'.repeat(64);writeFileSync(join(first.layout.resourcesDirectory,'research.json'),JSON.stringify(research));const stale=writeFinalRanking({projectRoot:root,selectionPath:path,editorialContract:contract,editingSkill:first.editingSkill});assert.equal(stale.result.rows[0].fullName,'fixture/repo-2');assert.equal(stale.result.rows.find(r=>r.fullName==='fixture/repo-1').videoApproved,false);
});
