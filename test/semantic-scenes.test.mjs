import assert from 'node:assert/strict';
import test from 'node:test';
import {semanticBlockWindows,validateSemanticScenes} from '../apps/video-factory/src/semantic-scenes.mjs';
import {evaluateEditorialQuality} from '../apps/video-factory/src/editorial-quality.mjs';
import {buildNarratedStoryboardFromBlocks} from '../apps/video-factory/src/narration.mjs';

const scene=(startFrame,endFrame)=>({startFrame,endFrame});
test('technical audio fragments form one semantic window including inter-request gaps',()=>{
  const windows=semanticBlockWindows([
    {semanticBlockId:'one',startFrame:0,endFrame:80,timelineEndFrame:90},
    {semanticBlockId:'one',startFrame:90,endFrame:180,timelineEndFrame:190},
    {semanticBlockId:'two',startFrame:190,endFrame:290,timelineEndFrame:300},
  ],300);
  assert.deepEqual(windows,[{id:'one',startFrame:0,endFrame:190},{id:'two',startFrame:190,endFrame:300}]);
  validateSemanticScenes([scene(0,90),scene(90,190),scene(190,220),scene(220,260),scene(260,300)],windows);
  assert.doesNotThrow(()=>validateSemanticScenes([scene(0,190),scene(190,220),scene(220,300)],windows));
  assert.doesNotThrow(()=>validateSemanticScenes([scene(0,30),scene(30,60),scene(60,90),scene(90,190),scene(190,220),scene(220,300)],windows));
  assert.doesNotThrow(()=>validateSemanticScenes([scene(0,90),scene(90,200),scene(200,250),scene(250,300)],windows));
});
test('semantic windows reject gaps, reused IDs and absent current metadata',()=>{
  assert.throws(()=>semanticBlockWindows([{semanticBlockId:'one',startFrame:2,timelineEndFrame:10}],10),/contiguously/);
  assert.throws(()=>semanticBlockWindows([{startFrame:0,timelineEndFrame:10}],10),/regenerate narration/);
  assert.throws(()=>semanticBlockWindows([
    {semanticBlockId:'one',startFrame:0,timelineEndFrame:10},
    {semanticBlockId:'two',startFrame:10,timelineEndFrame:20},
    {semanticBlockId:'one',startFrame:20,timelineEndFrame:30},
  ],30),/remain adjacent/);
});

function finalStory(duration){
  const frames=duration*30;
  return {meta:{title:'语义场景',productionStage:'visual-ready',narrationSegmentation:'semantic',fps:30,width:1920,height:1080,directorVersion:1,totalFrames:frames,style:{},globalCaptions:[{text:'完整语义。'}]},voiceover:'narration.wav',
    narrationBlocks:[{semanticBlockId:'unit',startFrame:0,endFrame:frames,timelineEndFrame:frames,duration,characters:5}],
    scenes:[0,1].map(i=>({id:'scene-'+i,duration:duration/2,captions:[{startFrame:0,endFrame:frames/2,text:'完整语义。'}],visualBeats:[{id:'beat-'+i,startFrame:0,endFrame:frames/2,implementation:{key:'beat-'+i},purpose:'说明',claimIndexes:[0]}]}))};
}
test('quality accepts both short and long films and scenes without duration limits',()=>{
  for(const duration of [2,600]){
    const report=evaluateEditorialQuality(finalStory(duration),{narrationBlocks:{maxRequestCharacters:1000}});
    assert.deepEqual(report.errors,[]);
    assert.deepEqual(report.warnings,[]);
    assert.equal(report.metrics.totalDurationSeconds,duration);
  }
});
test('quality still rejects service character overflow and incomplete semantic coverage',()=>{
  const story=finalStory(600),config={narrationBlocks:{maxRequestCharacters:1000}};
  story.narrationBlocks[0].characters=1001;
  assert.ok(evaluateEditorialQuality(story,config).errors.some(e=>/character limit/.test(e)));
  story.narrationBlocks[0].characters=5;
  story.scenes[0].duration=600;
  story.scenes[0].captions[0].endFrame=18000;
  story.scenes[0].visualBeats[0].endFrame=18000;
  story.scenes.pop();
  assert.deepEqual(evaluateEditorialQuality(story,config).errors,[]);
  story.scenes[0].duration=599;assert.ok(evaluateEditorialQuality(story,config).errors.some(e=>/coverage|cover/.test(e)));
});
test('measured long narration maps to frames without minimum-duration padding',()=>{
  const draft={meta:{fps:30},scenes:[{id:'unit',sentences:[{text:'完整语义。'}]}]};
  for(const duration of [0.1,180]){
    const result=buildNarratedStoryboardFromBlocks(draft,[{id:'block-000',semanticBlockId:'unit',duration,text:'完整语义。',sceneIndexes:[0],topics:['unit'],segments:[{sceneIndex:0,sentenceIndex:0,text:'完整语义。'}]}],{gapSeconds:0});
    assert.equal(result.totalFrames,duration*30);
    assert.equal(result.storyboard.narrationBlocks[0].semanticBlockId,'unit');
    assert.equal(result.storyboard.narrationBlocks[0].timelineEndFrame,result.totalFrames);
  }
});
