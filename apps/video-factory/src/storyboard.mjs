import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
export function durationInFrames(storyboard){return storyboard.scenes.reduce((n,s)=>n+Math.round(s.duration*storyboard.meta.fps),0);}
export function validateStoryboard(storyboard) {
  if(!storyboard||typeof storyboard!=='object')return ['Storyboard must be a JSON object.'];
  const errors=[],meta=storyboard.meta;
  if(!meta?.title)errors.push('meta.title is required.');
  if(!['audio-ready','visual-ready'].includes(meta?.productionStage))errors.push('Current productionStage is required.');
  if(!Number.isFinite(meta?.fps)||meta.fps<=0)errors.push('meta.fps must be positive.');
  if(!Number.isInteger(meta?.width)||meta.width<240||!Number.isInteger(meta?.height)||meta.height<240)errors.push('Frame dimensions must be integers >= 240.');
  if(!Array.isArray(storyboard.scenes)||!storyboard.scenes.length)return [...errors,'scenes must contain the current narration/visual timeline.'];
  const ids=new Set();
  for(const [i,scene] of storyboard.scenes.entries()){
    if(!scene.id||ids.has(scene.id))errors.push(`scenes[${i}] needs a unique ID.`);ids.add(scene.id);
    if(!Number.isFinite(scene.duration)||scene.duration<=0)errors.push(`scenes[${i}].duration must be positive.`);
    const frames=Math.round(scene.duration*meta.fps);let captionEnd=0;
    if(!Array.isArray(scene.captions)||!scene.captions.length)errors.push(`scenes[${i}] requires measured captions.`);
    for(const cue of scene.captions??[]){if(!Number.isInteger(cue.startFrame)||!Number.isInteger(cue.endFrame)||cue.startFrame<captionEnd||cue.endFrame<=cue.startFrame||cue.endFrame>frames||!cue.text?.trim())errors.push(`scenes[${i}] has invalid caption text/timing.`);captionEnd=cue.endFrame;}
    if(meta.productionStage==='visual-ready'){
      if(!Array.isArray(scene.visualBeats)||!scene.visualBeats.length)errors.push(`scenes[${i}] requires compiled director shots.`);
      let end=0;for(const beat of scene.visualBeats??[]){if(!beat.id||!Number.isInteger(beat.startFrame)||!Number.isInteger(beat.endFrame)||beat.startFrame!==end||beat.endFrame<=end||beat.endFrame>frames||!beat.implementation?.key||!beat.purpose?.trim()||!beat.claimIndexes?.length)errors.push(`scenes[${i}] has invalid compiled shot/timing.`);end=beat.endFrame;}
      if(end!==frames)errors.push(`scenes[${i}] shots must cover the full measured scene.`);
    }else if(scene.visualBeats)errors.push('Visual shots must be realized after audio timing.');
  }
  if(meta.productionStage==='visual-ready'){
    if(meta.directorVersion!==1||(meta.visualProgram&&meta.visualProgram.schemaVersion!==3))errors.push('Current director program is required.');
    if(durationInFrames(storyboard)!==meta.totalFrames||!meta.style||!meta.globalCaptions?.length||!storyboard.voiceover)errors.push('Director visuals must preserve measured audio, style and global captions.');
  }
  return errors;
}
export function loadStoryboard(filePath){const absolutePath=resolve(filePath),storyboard=JSON.parse(readFileSync(absolutePath,'utf8')),errors=validateStoryboard(storyboard);if(errors.length)throw new Error('Invalid current storyboard:\n- '+errors.join('\n- '));return {storyboard,absolutePath};}
