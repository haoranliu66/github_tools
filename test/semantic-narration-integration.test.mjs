import assert from 'node:assert/strict';
import test from 'node:test';
import {makeAudioDraft,normalizeTiming,compileTimeline} from '../apps/video-factory/src/creative-plan.mjs';
import {buildNarrationBlocks,fitNarrationBlocks} from '../apps/video-factory/src/narration-blocks.mjs';
import {buildNarratedStoryboardFromBlocks} from '../apps/video-factory/src/narration.mjs';
import {validateVisualLayout} from '../apps/video-factory/src/director-layout.mjs';
import {evaluateEditorialQuality} from '../apps/video-factory/src/editorial-quality.mjs';

test('planned semantics survive synthesis, measured timing, director layout and final quality',async()=>{
  const libraries={styles:[{id:'paper'}],motions:[],digest:'library'};
  const research={project:{url:'https://github.com/fixture/project',versionOrCommit:'a'.repeat(40)},claims:[{claim:'输入'},{claim:'结果'}]};
  const content={title:'语义分块',styleId:'paper',fullNarration:'先解释输入。再展示结果。',units:[
    {id:'input',heading:'输入',narration:'先解释输入。',visualIntent:'输入',claimIndexes:[0]},
    {id:'result',heading:'结果',narration:'再展示结果。',visualIntent:'结果',claimIndexes:[1]},
  ]};
  const plan={content,fullName:'fixture/project',contentDigest:'content',preproduction:{assets:[],shots:content.units.map(u=>({id:u.id+'-shot',unitId:u.id,narrationCue:u.narration,purpose:u.heading}))}};
  const config={narrationBlocks:{segmentation:'semantic',maxRequestCharacters:1000}};
  const draft=makeAudioDraft(plan,research);
  const planned=buildNarrationBlocks(draft,config);
  assert.deepEqual(planned.map(b=>b.semanticBlockId),['input','result']);
  const fitted=await fitNarrationBlocks(planned,async b=>({wave:Buffer.from('wave'),duration:b.semanticBlockId==='input'?180:1}));
  const measured=buildNarratedStoryboardFromBlocks(draft,fitted.blocks,{gapSeconds:0});
  const timing={narrationSegmentation:'semantic',totalFrames:measured.totalFrames,measuredTotal:181,clips:measured.clips,blocks:measured.storyboard.narrationBlocks};
  const audio=normalizeTiming(timing,30);
  assert.equal(audio.semanticBlocks.length,2);
  const scenes=audio.semanticBlocks.flatMap((window,index)=>{
    const middle=(window.startFrame+window.endFrame)/2;
    return [[window.startFrame,middle],[middle,window.endFrame]].map(([startFrame,endFrame],part)=>({
      id:window.id+'-'+part,title:content.units[index].heading,purpose:'解释完整语义',startFrame,endFrame,claimIndexes:[index],
      beats:[{id:window.id+'-beat-'+part,startFrame:0,endFrame:endFrame-startFrame,planShotIds:[window.id+'-shot'],narrationCue:content.units[index].narration,purpose:'解释',visualDesign:'连贯对象',continuity:'保持对象',libraryIds:[],assetIds:[],claimIndexes:[index],route:'custom',candidates:[],reason:'展示语义',source:'export default ()=> <div>语义内容</div>;'}],
    }));
  });
  const visual={styleId:'paper',designSummary:'完整输入到结果',scenes};
  assert.equal(validateVisualLayout(plan,timing,30,visual,libraries),visual);
  const compiled=compileTimeline({audioStoryboard:{...measured.storyboard,voiceover:'narration.wav'},timing,visual,research,libraries,contentDigest:'content'});
  assert.deepEqual(evaluateEditorialQuality(compiled.storyboard,config).errors,[]);
  assert.equal(compiled.storyboard.scenes.length,4);
  assert.equal(compiled.audio.totalFrames,181*30);
  const invalid={...visual,scenes:[{...scenes[0],endFrame:audio.semanticBlocks[0].endFrame,beats:[{...scenes[0].beats[0],endFrame:audio.semanticBlocks[0].endFrame}]} ,...scenes.slice(2)]};
  assert.doesNotThrow(()=>validateVisualLayout(plan,timing,30,invalid,libraries));
  assert.doesNotThrow(()=>compileTimeline({audioStoryboard:measured.storyboard,timing,visual:invalid,research,libraries}));
});
