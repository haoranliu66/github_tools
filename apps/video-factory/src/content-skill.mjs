import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';

export const SHARING_TYPE='github-project-sharing';
export const SHARING_FORMS=['single-short','single-deep'];
const string={type:'string',minLength:1};
const slug=value=>typeof value==='string'&&/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/u.test(value);

export function selectContentRoute({skill=null,form=null}={}) {
  if(skill===null){if(form!==null)throw new Error('A content form requires a selected content Skill.');return {skill:null,form:null};}
  if(!slug(skill))throw new Error('Invalid content Skill name.');
  if(skill===SHARING_TYPE){form??='single-short';if(!SHARING_FORMS.includes(form))throw new Error('Unsupported GitHub sharing form: '+form);}
  else if(form!==null&&!slug(form))throw new Error('Invalid content form.');
  return {skill,form};
}
export function validateContentRoute(route) {
  if(!route||!Object.hasOwn(route,'skill')||!Object.hasOwn(route,'form')||Object.keys(route).some(key=>!['skill','form'].includes(key)))throw new Error('Current plan requires an explicit content Skill route.');
  const selected=selectContentRoute(route);
  if(selected.form!==route.form)throw new Error('Selected content form must be explicit in the plan.');
  return selected;
}
export function contentRouteSchema(route) {
  validateContentRoute(route);
  const properties=Object.fromEntries(['skill','form'].map(key=>[key,{type:route[key]===null?'null':'string',enum:[route[key]]}]));
  return {type:'object',additionalProperties:false,required:Object.keys(properties),properties};
}
export function sharingSchema() {
  const properties={viewerPromise:string,story:string,example:string,resultShotIds:{type:'array',minItems:1,items:string}};
  return {type:'object',additionalProperties:false,required:Object.keys(properties),properties};
}
export function validateSharing(sharing,shots) {
  if(!sharing||['viewerPromise','story','example'].some(key=>typeof sharing[key]!=='string'||!sharing[key].trim()))throw new Error('Sharing plan needs a viewer promise, connected story and concrete example.');
  if(Object.keys(sharing).some(key=>!['viewerPromise','story','example','resultShotIds'].includes(key)))throw new Error('Unexpected GitHub sharing field.');
  if(!Array.isArray(sharing.resultShotIds)||!sharing.resultShotIds.length||new Set(sharing.resultShotIds).size!==sharing.resultShotIds.length||sharing.resultShotIds.some(id=>!shots.some(shot=>shot.id===id)))throw new Error('Promise payoff must reference actual planned shots.');
  return sharing;
}
export function validateContentProfile(profile,shots,{expectedRoute}={}) {
  const route=validateContentRoute(profile.contentRoute);
  if(expectedRoute&&JSON.stringify(route)!==JSON.stringify(validateContentRoute(expectedRoute)))throw new Error('Planning content Skill route differs from the selected route.');
  if(route.skill===SHARING_TYPE)validateSharing(profile.sharing,shots);
  else if(Object.hasOwn(profile,'sharing'))throw new Error('GitHub sharing fields require the github-project-sharing Skill; omit them for other content.');
  return route;
}
export function contentSkillPath(root,route) {
  validateContentRoute(route);if(route.skill===null)return null;
  const path=join(root,'.agents/skills/content-choose',route.skill,'SKILL.md');
  if(!existsSync(path))throw new Error('Selected content Skill is missing: '+path);
  return path;
}
export function contentSkillBody(root,route) {
  const path=contentSkillPath(root,route);if(!path)return '';
  const source=readFileSync(path,'utf8').replaceAll('\r\n','\n'),frontmatter=source.match(/^---\n([\s\S]*?)\n---(?:\n|$)/u);
  if(!frontmatter||!frontmatter[1].split('\n').includes('name: '+route.skill))throw new Error('Invalid selected content Skill frontmatter.');
  let selectedForm=false;
  const body=source.slice(frontmatter[0].length).replace(/^## 形式：([^\n]+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gmu,(block,form)=>{
    if(form.trim()===route.form){selectedForm=true;return block;}return '';
  });
  if(route.form!==null&&!selectedForm)throw new Error('Missing selected content form: '+route.form);
  return '# Content Skill: '+route.skill+(route.form?' / '+route.form:'')+'\nRead this selected content guidance once for the whole main Agent workflow. Reuse it during planning, direction and visual preflight; no stage-specific reloads. Reference path: '+path+'\n'+body.trim();
}
export function contentSkillReference(root,route) {
  const path=contentSkillPath(root,route);if(!path)return '';
  return 'Selected content Skill '+route.skill+' / '+(route.form??'default')+' is already available to the main Agent from its initial read. Reuse the same unified content requirements; do not reload or inject the body for this stage. Local reference: '+path+'. Independent shot agents may consult this linked guidance for their assigned expression.';
}
export function contentPlanningPrompt(root,route) {
  const body=contentSkillBody(root,route);
  return body+'\nSelected content route: '+JSON.stringify(route)+'. Return contentRoute exactly as selected.'+
    (route.skill===SHARING_TYPE?' Return sharing with viewerPromise, story, example and actual resultShotIds. Self-check and revise promise, story, example, spoken text and prepared material coverage BEFORE handing off for narration; do not produce a separate review report.':'');
}
export function sharingHandoffInstruction(route) {
  return route.skill===SHARING_TYPE?' Recheck the viewer promise, connected example, payoff shots and final material coverage before this pre-audio handoff; revise the visual plan where needed without outputting a self-review report.':'';
}
export function sharingSummary(profile) {
  return profile.contentRoute?.skill===SHARING_TYPE?['观看承诺：'+profile.sharing.viewerPromise,'故事：'+profile.sharing.story,'贯穿例子：'+profile.sharing.example,'']:[];
}
export function sharingReviewContext(route,sharing,beats) {
  if(route?.skill!==SHARING_TYPE)return null;
  validateContentRoute(route);
  if(!sharing)throw new Error('Selected GitHub sharing review needs its story intent.');
  return {...sharing,resultWindows:beats.filter(beat=>(beat.planShotIds??[]).some(id=>sharing.resultShotIds.includes(id)))
    .map(({id,startSeconds,endSeconds,purpose})=>({id,startSeconds,endSeconds,purpose}))};
}
