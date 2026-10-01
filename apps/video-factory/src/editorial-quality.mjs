import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {validateStoryboard,durationInFrames} from './storyboard.mjs';
export function loadEditorialConfig(path){const config=JSON.parse(readFileSync(path instanceof URL?path:resolve(path),'utf8'));if(config.schemaVersion!==1)throw new Error('Current video config schemaVersion must be 1.');return config;}
export function evaluateEditorialQuality(storyboard,config){
  const errors=validateStoryboard(storyboard),warnings=[];
  if(storyboard.meta?.productionStage!=='visual-ready')errors.push('Final quality checks require current director visuals.');
  const totalFrames=durationInFrames(storyboard),duration=totalFrames/storyboard.meta.fps;
  if(duration<config.durationSeconds.min||duration>config.durationSeconds.max)warnings.push('Audio duration is outside the usual range; visual pacing and human listening determine suitability.');
  for(const block of storyboard.narrationBlocks??[])if(block.duration>config.narrationBlocks.maxAudioSeconds||block.characters>config.narrationBlocks.maxRequestCharacters)errors.push('Narration block exceeds technical TTS limits.');
  return {errors,warnings,visualPreflight:'pending',metrics:{totalFrames,totalDurationSeconds:duration,narrationBlockCount:storyboard.narrationBlocks?.length??0}};
}
export function assertEditorialQuality(storyboard,config){const report=evaluateEditorialQuality(storyboard,config);if(report.errors.length)throw new Error('Current production technical checks failed:\n- '+report.errors.join('\n- '));return report;}
