import {createHash} from 'node:crypto';
import {existsSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import {assertEditorialContractMetadata} from './editorial-contract.mjs';
const hash=value=>createHash('sha256').update(value).digest('hex');
const normalized=text=>text.replace(/\s+/gu,' ').trim();
export function validateFactResearch(result,{contract=null,readmeText=null}={}) {
  if(result?.schemaVersion!==3||result.workflow!=='scoped-production-package'||result.status!=='completed'||result.blockedReason)throw new Error('A completed current scoped production package is required.');
  if(!/^https:\/\/github\.com\/[^/]+\/[^/]+$/u.test(result.project?.url??'')||!result.project.name||!/^(?:[a-f0-9]{40}|[a-f0-9]{64})$/u.test(result.project.versionOrCommit??''))throw new Error('Research requires its project identity and full pinned commit.');
  assertEditorialContractMetadata(result.editorialContract,contract);
  if(!Array.isArray(result.claims)||!result.claims.length)throw new Error('Scoped production needs used claims.');
  for(const claim of result.claims){
    if(!claim.claim?.trim()||!claim.evidence?.length||!['high','medium','low'].includes(claim.confidence))throw new Error('Used claim is incomplete.');
    for(const evidence of claim.evidence)if(evidence.source!=='official-readme'||!evidence.detail?.trim()||!evidence.quote?.trim()||(readmeText&&!normalized(readmeText).includes(normalized(evidence.quote))))throw new Error('Used claims require exact official README excerpts.');
  }
  if(result.sourceAudit?.commit!==result.project.versionOrCommit||!/^[a-f0-9]{64}$/u.test(result.sourceAudit?.readmeSha256??'')||(readmeText&&result.sourceAudit.readmeSha256!==hash(readmeText)))throw new Error('Retained README identity is stale or changed.');
  return result;
}
export function loadFactReadme(resourcesDirectory) {
  const path=join(resourcesDirectory,'_provenance/official-readme.md');
  if(!existsSync(path))throw new Error('The scoped package requires its provenance README snapshot.');
  return readFileSync(path,'utf8');
}
