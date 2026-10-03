import {readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {loadLibraries} from './creative-plan.mjs';
export function refreshProductionReferenceIndex(root) {
  const libraries=loadLibraries(root),manifest=JSON.parse(readFileSync(join(root,'integrations/remotion/manifest.json'),'utf8'));
  const index={schemaVersion:1,loading:'on-demand',styles:libraries.styles.map(s=>({id:s.id,name:s.name,description:s.description,file:s.descriptionFile})),
    motions:libraries.motions.map(m=>({id:m.id,description:m.description,code:m.codePath??m.module,usage:m.usage,demo:m.demo,example:m.demoEntry??m.usage})),
    remotion:manifest.files.map(f=>({id:f.path,file:'integrations/remotion/skills/'+f.path,digest:f.digest})),previewCommand:'node apps/video-factory/src/shot-preview.mjs <assignment.json>'};
  writeFileSync(join(root,'docs/production-reference-index.json'),JSON.stringify(index,null,2)+'\n');return index;
}
