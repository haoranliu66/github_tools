import {hash,validateCreativeSource} from './creative-plan.mjs';

export function directorContextPrompt({contractBody,plan,style,references,planPath='editorial-plan.json',statePath='director-state.json'}) {
  return contractBody+'\nNarration uses semantic blocks. Use semanticBlocks as narration context, not visual cut boundaries. Typically plan 2-3 scenes per semantic block as creative guidance, not a quota. Choose as few or as many scenes as the expression needs; scenes may cross semantic block boundaries. Multiple technical audio requests with the same semanticBlockId remain one semantic block. No total, scene or block duration limits apply.\nRead the complete unified plan from '+planPath+'. Read its selected style and material LOCAL LINKS as needed; source code, media and usage are not inlined in this prompt. Do not search the library again by default.\nDirector state: '+statePath+'\nRemotion reference index (lookup only for a concrete question): '+references;
}
export function shotTaskPrompt({shot,previous,next,join,captions,sourceFile,assignmentFile,previewCommand}) {
  return 'Implement only assigned segment '+shot.id+'. Read '+assignmentFile+' for its purpose, captions, measured frames, selected style, shared design and the local links of its used materials.\nWrite default-export React JSX to '+sourceFile+'. Props {frame,durationInFrames,fps,style,accent,assets,scene,beat}; frames are segment-relative. Import shared objects and functions from ./shared.jsx, selected library components from ./motion-library.jsx, prepared custom materials from ./prepared-materials.jsx. Do not edit those shared files, other shots, audio or timing.\nContinuity: '+JSON.stringify(join??{incoming:previous?.continuity??'Opening',outgoing:shot.continuity,nextPurpose:next?.purpose??'Ending'})+'. Preserve these states and the supplied style. Use free JSX; no object, motion or layout quota. No default rediscovery or repeated usage reads.\nOptional local actual preview: '+previewCommand+'. Return JSON {sourceFile,summary,libraryIds:[actual used IDs]}. No full-film research or history is needed.';
}
export function realizeVisualBeat(shot,result,source,libraries) {
  validateCreativeSource(source);const ids=result.libraryIds;
  if(!Array.isArray(ids)||new Set(ids).size!==ids.length||ids.some(id=>!libraries.motions.some(m=>m.id===id)))throw new Error('Actual component IDs must exist in this project library.');
  if(!result.summary?.trim())throw new Error('Actual realization needs a concise explanation.');
  return {sourceFile:result.sourceFile,source,sourceDigest:hash(source),libraryIds:ids,summary:result.summary};
}
export function realizationState(layout,implementations) {
  const segments=(layout?.scenes??[]).flatMap(scene=>scene.beats.map(beat=>({id:beat.id,sceneId:scene.id,startFrame:scene.startFrame+beat.startFrame,endFrame:scene.startFrame+beat.endFrame,purpose:beat.purpose,planShotIds:beat.planShotIds,status:implementations[beat.id]?'implemented':'pending'})));
  return {phase:segments.length&&segments.every(s=>s.status==='implemented')?'implemented':'implementing',layoutDigest:layout?hash(JSON.stringify(layout)):null,segments,shots:Object.entries(implementations).map(([id,r])=>({id,sourceFile:r.sourceFile,sourceDigest:r.sourceDigest,taskDigest:r.taskDigest,libraryIds:r.libraryIds,summary:r.summary,childSessionId:r.childSessionId}))};
}
