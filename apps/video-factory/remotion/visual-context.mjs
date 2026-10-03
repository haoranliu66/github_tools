// The same public scene/beat props are used in local previews and the final film.
export function visualContext(scene,beat,fps) {
  const beats=scene.visualBeats??scene.beats??[beat];
  const durationInFrames=(scene.durationInFrames??(scene.endFrame-scene.startFrame))||Math.round((scene.duration??0)*fps);
  return {scene:{id:scene.id,title:scene.title,purpose:scene.purpose,source:scene.source,
    startFrame:scene.startFrame??0,endFrame:scene.endFrame??durationInFrames,durationInFrames,
    claimIndexes:scene.claimIndexes??[...new Set(beats.flatMap(b=>b.claimIndexes??[]))].sort((a,b)=>a-b),
    assetIds:[...new Set(beats.flatMap(b=>b.assetIds??[]))],visualDesign:beats.map(b=>b.visualDesign??'').join('; '),continuity:beats.at(-1)?.continuity??''},
    beat:{id:beat.id,startFrame:beat.startFrame??0,endFrame:beat.endFrame??durationInFrames,
      durationInFrames:(beat.endFrame??durationInFrames)-(beat.startFrame??0),purpose:beat.purpose,narrationCue:beat.narrationCue,
      planShotIds:beat.planShotIds??[],claimIndexes:beat.claimIndexes??[],assetIds:beat.assetIds??[],visualDesign:beat.visualDesign??'',continuity:beat.continuity??''}};
}
