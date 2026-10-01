import {createHash} from 'node:crypto';
import {existsSync,readFileSync} from 'node:fs';
import {isAbsolute,join,resolve,sep} from 'node:path';

export const hash=value=>createHash('sha256').update(value).digest('hex');
const string={type:'string',minLength:1};
const object=properties=>({type:'object',additionalProperties:false,required:Object.keys(properties),properties});
export const contentSchema=()=>object({title:string,fullNarration:string,styleId:string,
  visualIntent:string,units:{type:'array',minItems:1,items:object({id:string,heading:string,narration:string,
    visualIntent:string,claimIndexes:{type:'array',minItems:1,items:{type:'integer',minimum:0}}})}});

export function validateContent(content,research,libraries) {
  if(!content?.title||!content.units?.length||!libraries.styles.some(s=>s.id===content.styleId)) throw new Error('Content needs title, narration units and an available style.');
  if(content.fullNarration!==content.units.map(u=>u.narration).join('')) throw new Error('Narration units must exactly join fullNarration.');
  const ids=new Set();
  for(const u of content.units) {
    if(!u.id||ids.has(u.id)||!u.narration?.trim()||!u.visualIntent?.trim()) throw new Error('Narration unit IDs must be unique with spoken text and visual intent.');
    ids.add(u.id);
    if(!u.claimIndexes?.length||u.claimIndexes.some(i=>!Number.isInteger(i)||i<0||i>=research.claims.length)) throw new Error(`Unit ${u.id} references an unavailable claim.`);
  }
  return content;
}

export function makeCreativePlan({fullName,researchText,contract,editingSkill,feedbackText='',content,libraries}) {
  const research=JSON.parse(researchText);validateContent(content,research,libraries);
  if(research.project.url!==`https://github.com/${fullName}`) throw new Error('Content repository mismatch.');
  return {schemaVersion:3,fullName,createdAt:new Date().toISOString(),researchDigest:hash(researchText),
    editorialContractDigest:contract.digest,editingSkillDigest:editingSkill.digest,feedbackDigest:hash(feedbackText.trim()),
    contentDigest:hash(JSON.stringify(content)),content,visual:null,phase:'content-ready'};
}

export function loadCreativePlan(plan,researchText,libraries) {
  validateContent(plan.content,JSON.parse(researchText),libraries);
  if(plan.schemaVersion!==3||plan.workflow!=='scoped-production-package')throw new Error('Current complete scoped production package required.');
  if(!plan.preproduction||hash(JSON.stringify(plan.preproduction))!==plan.preproductionDigest)throw new Error('Preproduction design changed; explicitly refresh the unified plan.');
  if(plan.contentDigest!==hash(JSON.stringify(plan.content))) throw new Error('Content plan digest mismatch.');
  if(plan.visual&&plan.phase!=='visual-ready') throw new Error('Incomplete visual plan.');
  return {plan,research:JSON.parse(researchText),content:plan.content,contentDigest:plan.contentDigest,digest:hash(JSON.stringify(plan))};
}

export function makeAudioDraft(plan,research,materials=[]) {
  return {meta:{title:plan.content.title,repo:plan.fullName,template:'editorial',width:1920,height:1080,fps:30,
    accent:'#b8f76c',productionStage:'audio-ready',planner:'audio-first-director',editorialContractDigest:plan.editorialContractDigest,researchCommit:research.project.versionOrCommit,
    editorialPlanDigest:hash(JSON.stringify(plan)),contentDigest:plan.contentDigest,materials,
    narrationProfile:'concept-explainer',styleId:plan.content.styleId},
    // These containers are semantic narration units, never final shot boundaries.
    scenes:plan.content.units.map(u=>({id:u.id,title:u.heading,source:research.project.url,
      narrationTopic:u.id,sentences:subtitleSentences(u.narration)}))};
}
function subtitleSentences(text) {
  return (text.match(/[^。！？.!?]+[。！？.!?]?/gu)??[text]).flatMap((sentence,index)=> {
    const parts=sentence.match(/[^，；：,;:]+[，；：,;:]?/gu)??[sentence];
    return parts.map((part,i)=>({text:part,sentenceIndex:index,sentenceEnd:i===parts.length-1}));
  });
}

export function normalizeTiming(timing,fps) {
  if(!Number.isInteger(timing.totalFrames)||timing.totalFrames<1||!timing.clips?.length) throw new Error('Measured audio timing is required.');
  let previous=0;
  const clips=timing.clips.map((c,i)=> {
    const end=c.endFrame??c.startFrame+c.spokenFrames;
    if(!Number.isInteger(c.startFrame)||!Number.isInteger(end)||c.startFrame<previous||end<=c.startFrame||end>timing.totalFrames||!c.text?.trim()) throw new Error(`Invalid measured caption ${i}.`);
    previous=end;return {id:`cue-${i}`,startFrame:c.startFrame,endFrame:end,text:c.text};
  });
  return {fps,totalFrames:timing.totalFrames,measuredTotal:timing.measuredTotal,
    alignment:'measured-block-weighted-cues',precision:'Measured block duration; cue positions are weighted estimates, not word alignment.',clips,blocks:timing.blocks??[]};
}

export function visualSchema() {
  const frames={startFrame:{type:'integer',minimum:0},endFrame:{type:'integer',minimum:1}};
  const claims={type:'array',minItems:1,items:{type:'integer',minimum:0}};
  const beat=object({id:string,...frames,narrationCue:string,purpose:string,claimIndexes:claims,
    route:{type:'string',enum:['library','compose','custom']},libraryIds:{type:'array',items:string},
    candidates:{type:'array',items:object({id:string,fit:string})},reason:string,source:string});
  const scene=object({id:string,title:string,...frames,purpose:string,claimIndexes:claims,
    beats:{type:'array',minItems:1,items:beat}});
  return object({styleId:string,designSummary:string,scenes:{type:'array',minItems:1,items:scene}});
}

export function compileTimeline({audioStoryboard,timing,visual,research,libraries,contentDigest}) {
  const audio=normalizeTiming(timing,audioStoryboard.meta.fps);
  const style=libraries.styles.find(s=>s.id===visual.styleId);if(!style) throw new Error('Unknown full-frame style.');
  let end=0;const ids=new Set();const sources={};const decisions=[];
  const scenes=visual.scenes.map((s,sceneIndex)=> {
    if(!Number.isInteger(s.startFrame)||!Number.isInteger(s.endFrame)||s.startFrame!==end||s.endFrame<=end||s.endFrame>audio.totalFrames) throw new Error('Scenes must exactly cover measured audio without gaps or overlaps.');
    if(!s.claimIndexes?.length||s.claimIndexes.some(i=>!Number.isInteger(i)||i<0||i>=research.claims.length))throw new Error('Scene must map to verified claims.');
    end=s.endFrame;let beatEnd=0;const frames=s.endFrame-s.startFrame;
    const beats=s.beats.map((b,beatIndex)=> {
      if(ids.has(b.id)||!b.id) throw new Error('Beat IDs must be unique.');ids.add(b.id);
      if(!Number.isInteger(b.startFrame)||!Number.isInteger(b.endFrame)||b.startFrame!==beatEnd||b.endFrame<=beatEnd||b.endFrame>frames) throw new Error(`Beat ${b.id} must cover its scene contiguously using scene-relative frames.`);
      beatEnd=b.endFrame;
      if(!['library','compose','custom'].includes(b.route)||!b.purpose?.trim()||!b.reason?.trim()||!b.narrationCue?.trim()) throw new Error(`Beat ${b.id} needs an implementation decision and visual meaning.`);
      if(!b.claimIndexes?.length||b.claimIndexes.some(i=>!Number.isInteger(i)||i<0||i>=research.claims.length)) throw new Error(`Beat ${b.id} must map to verified claims.`);
      const cueText=audio.clips.filter(c=>c.startFrame<s.startFrame+b.endFrame&&c.endFrame>s.startFrame+b.startFrame).map(c=>c.text).join('');
      if(!cueText.includes(b.narrationCue)) throw new Error(`Beat ${b.id} narration cue is not in its measured audio interval.`);
      for(const id of b.libraryIds) if(!libraries.motions.some(m=>m.id===id)) throw new Error(`Unknown motion ${id}.`);
      for(const c of b.candidates) if(!libraries.motions.some(m=>m.id===c.id)) throw new Error(`Unknown candidate ${c.id}.`);
      if(b.route==='library'&&!b.libraryIds.length) throw new Error('Library route requires an actual selected asset.');
      const key=`s${sceneIndex}_b${beatIndex}`;
      validateCreativeSource(b.source);sources[`${key}.jsx`]=b.source;
      for(const id of b.libraryIds) {
        const motion=libraries.motions.find(m=>m.id===id);
        if(motion.exportName&&!b.source.includes(motion.exportName)) throw new Error(`Selected asset ${id} is not used in its source.`);
      }
      decisions.push({...b,source:undefined,key,beatId:b.id,sceneIndex,designReason:b.reason});
      return {id:b.id,narrationCue:b.narrationCue,purpose:b.purpose,claimIndexes:b.claimIndexes,
        startFrame:b.startFrame,endFrame:b.endFrame,
        implementation:{key,route:b.route}};
    });
    if(beatEnd!==frames) throw new Error(`Scene ${s.id} beats must cover the entire scene.`);
    const captions=audio.clips.filter(c=>c.startFrame<s.endFrame&&c.endFrame>s.startFrame).map(c=>({
      startFrame:Math.max(c.startFrame,s.startFrame)-s.startFrame,endFrame:Math.min(c.endFrame,s.endFrame)-s.startFrame,text:c.text}));
    return {id:s.id,type:'custom',title:s.title,source:research.project.url,purpose:s.purpose,duration:frames/audio.fps,
      claimIndexes:s.claimIndexes,captions,visualBeats:beats};
  });
  if(end!==audio.totalFrames) throw new Error('Visuals do not cover the complete measured narration.');
  const storyboard={...structuredClone(audioStoryboard),scenes,meta:{...audioStoryboard.meta,
    directorVersion:1,productionStage:'visual-ready',styleId:style.id,style,
    libraryDigest:libraries.digest,contentDigest,globalCaptions:audio.clips,totalFrames:audio.totalFrames}};
  delete storyboard.meta.visualProgram;
  return {storyboard,sources,decisions,audio};
}

export function validateCreativeSource(source) {
  if(typeof source!=='string'||!source.includes('export default')) throw new Error('Generated shot must export a React component.');
  // No object/action/layout/import enum: installed browser packages are available to creativity.
  // Host access and wall-clock driven animation are execution concerns, not visual restrictions.
  if(/(?:from\s*|import\s*)['"](?:node:|[A-Za-z]:|\/)|\b(?:eval|fetch|XMLHttpRequest|WebSocket|setTimeout|setInterval)\s*\(|Math\.random\s*\(|Date\.now\s*\(/u.test(source)) throw new Error('Generated source needs frame-driven, offline browser rendering.');
  if(/(?:\b(?:src|href|poster)\s*[:=]\s*[\{"']*\s*https?:\/\/|url\(\s*["']?https?:\/\/|staticFile\(\s*["']https?:\/\/)/iu.test(source))throw new Error('Network media must be staged and hashed before offline rendering.');
  for(const m of source.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/gu)) {
    if(m[1].startsWith('.')&&!['./shot-runtime.jsx','./motion-library.jsx'].includes(m[1])) throw new Error(`Local import is not a staged library bridge: ${m[1]}`);
  }
  return source;
}

export function loadLibraries(root,{fullName=null}={}) {
  const styleCatalog=JSON.parse(readFileSync(join(root,'config/style-library.json'),'utf8')),catalog=JSON.parse(readFileSync(join(root,'config/motion-library.json'),'utf8'));
  if(catalog.schemaVersion!==3||styleCatalog.schemaVersion!==1)throw new Error('Current material and style catalogs are required.');
  const styles=styleCatalog.styles;
  const motions=catalog.motions.filter(m=>!fullName||m.reuseScope!=='project'||m.sourceProject===fullName);
  for(const m of motions.filter(m=>m.module)) if(hash(readFileSync(safeResourcePath(root,m.module)))!==m.sha256) throw new Error(`Approved library source changed: ${m.id}`);
  if(motions.some(m=>!m.description?.trim()))throw new Error('Every material needs a visual retrieval description.');
  const forbidden=['origin','quality','review','reviewer'];
  if([...styles,...motions].some(value=>forbidden.some(key=>key in value)))throw new Error('Production catalogs cannot contain archived reviews.');
  const snapshot={styles,motions};return {...snapshot,digest:hash(JSON.stringify(snapshot))};
}
export function safeResourcePath(root,path) {
  if(isAbsolute(path)) throw new Error('Library paths must be resource relative.');
  const target=resolve(root,path);if(!target.startsWith(resolve(root)+sep)) throw new Error('Library path escapes resources.');return target;
}

