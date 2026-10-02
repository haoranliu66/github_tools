import {materialDiscoveryPrompt} from './material-usage.mjs';
import {hash,validateCreativeSource} from './creative-plan.mjs';

export function directorContextPrompt({contractBody,plan,style,references,planPath='editorial-plan.json',statePath='director-state.json',searchCommand='pnpm video:library search --query "画面需要"',fullName=null}) {
  const {version,transitions,captions,...visualStyle}=style;
  if(!visualStyle.motion?.transitions&&transitions)visualStyle.transitions=transitions;
  const overview={title:plan.content.title,story:plan.content.visualIntent,designContext:plan.preproduction.designContext,
    shots:plan.preproduction.shots.map(s=>({id:s.id,purpose:s.purpose}))};
  return `${contractBody}\nStyle: ${JSON.stringify(visualStyle)}\nStory and shared design: ${JSON.stringify(overview)}\nComplete plan: ${planPath}\nDirector state: ${statePath}\nReference index (lookup only; do not preload): ${references}\n${materialDiscoveryPrompt({command:searchCommand.replace(/ search\b[\s\S]*$/u,''),fullName})}`;
}

export function shotTaskPrompt({shot,previous,next,captions,sourceFile,assignmentFile,previewCommand,statePath}) {
  const task={id:shot.id,purpose:shot.purpose,designSuggestion:shot.visualDesign,preferredComponents:shot.libraryIds,
    assetIds:shot.assetIds,startFrame:shot.startFrame,endFrame:shot.endFrame,
    captions:captions.map(({text,startFrame,endFrame})=>({text,startFrame,endFrame})),
    continuity:{incoming:previous?.continuity??'Opening',outgoing:shot.continuity,nextPurpose:next?.purpose??'Ending'}};
  return `Implement ${JSON.stringify(task)}\nCaption cue positions are weighted estimates within measured audio blocks.\nWrite default-export React JSX to ${sourceFile}. Props {frame,durationInFrames,fps,style,accent,assets,scene,beat}; frame/useCurrentFrame are shot-relative. Preview props and staged assets: ${assignmentFile}. Local imports: './motion-library.jsx' or './shot-runtime.jsx'.\nComposition, motion and preferred components are implementation suggestions. Preserve meaning, narration, style and continuity. Read ${statePath} for completed shot state, and read usage --id for each selected material before reuse; inspect code/demos only for specific unresolved questions.\nTry ${previewCommand}; inspect actual preview frames and repair. Return JSON {sourceFile,summary,libraryIds:[actual used IDs]}.`;
}

export function realizeShot(shot,result,source,libraries) {
  validateCreativeSource(source);
  const ids=result.libraryIds;
  if(!Array.isArray(ids)||new Set(ids).size!==ids.length||ids.some(id=>!libraries.motions.some(m=>m.id===id)))throw new Error('Actual component IDs must exist in this project library.');
  if(!result.summary?.trim())throw new Error('Actual realization needs a concise explanation.');
  return {id:shot.id,title:shot.title,startFrame:shot.startFrame,endFrame:shot.endFrame,purpose:shot.purpose,claimIndexes:shot.claimIndexes,
    beats:[{id:shot.id,startFrame:0,endFrame:shot.durationInFrames,narrationCue:shot.narrationCue,purpose:shot.purpose,claimIndexes:shot.claimIndexes,
      route:ids.length?(ids.length>1?'compose':'library'):'custom',libraryIds:ids,candidates:[],reason:result.summary,sourceFile:result.sourceFile,source}]};
}

export function realizationState(scenes) {
  return {shots:scenes.map(s=>({id:s.id,purpose:s.purpose,sourceFile:s.beats[0].sourceFile,
    sourceDigest:hash(s.beats[0].source),libraryIds:s.beats[0].libraryIds,summary:s.beats[0].reason}))};
}
