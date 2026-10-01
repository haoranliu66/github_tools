import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join,relative,resolve,sep} from 'node:path';
import {hash,loadLibraries,safeResourcePath} from './creative-plan.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
const runtimeFiles=['MaterialRuntime.jsx','ShotRegistry.jsx','DirectorVideo.jsx','MotionLibrary.jsx','ExpandedMotion.jsx','vendor/animation-techniques-kit/text.tsx','vendor/animation-techniques-kit/theme.ts'];
export function creativeIdentity(storyboard) {
  const copy=structuredClone(storyboard);delete copy.meta.visualProgram;delete copy.meta.visualPreflight;return hash(JSON.stringify(copy));
}
export function buildCreativeProgram(compiled,{resourcesDirectory,remotionGuidance}) {
  const storyboard=compiled.storyboard;const audioPath=join(resourcesDirectory,'production/narration.wav');
  const program={schemaVersion:3,rendererVersion:'3.0.0',createdAt:new Date().toISOString(),status:'compiled-pending-render',humanReview:'pending',
    inputDigest:creativeIdentity(storyboard),libraryDigest:storyboard.meta.libraryDigest,decisions:compiled.decisions,
    sourceHashes:Object.fromEntries(Object.entries(compiled.sources).map(([name,source])=>[name,hash(source)])),
    runtimeSourceHashes:Object.fromEntries(runtimeFiles.map(name=>[name,hash(readFileSync(join(ROOT,'apps/video-factory/remotion',name)))])),
    materialHashes:Object.fromEntries((storyboard.meta.materials??[]).map(a=>[a.src,hash(readFileSync(safeResourcePath(join(resourcesDirectory,'production'),a.src)))])),
    audioSha256:hash(readFileSync(audioPath)),timingSha256:hash(readFileSync(join(resourcesDirectory,'production/timing.json'))),remotionGuidance};
  program.programDigest=hash(JSON.stringify({...program,createdAt:undefined}));
  const directory=join(resourcesDirectory,'shots',program.programDigest);mkdirSync(directory,{recursive:true});
  for(const [name,source] of Object.entries(compiled.sources)) writeFileSync(join(directory,name),source);
  const abs=path=>JSON.stringify(join(ROOT,'apps/video-factory/remotion',path).replaceAll('\\','/'));
  const additional=loadLibraries(ROOT,{fullName:storyboard.meta.repo}).motions.filter(m=>m.module);
  const bridge=`export * from ${abs('MotionLibrary.jsx')};\nexport {FrameReveal,FrameAnnotation} from ${abs('RemotionEffects.jsx')};\n`+
    additional.map(m=>`export {default as ${m.exportName}} from ${JSON.stringify(safeResourcePath(ROOT,m.module).replaceAll('\\','/'))};`).join('\n')+'\n';
  program.librarySourceHashes=Object.fromEntries(additional.map(m=>[m.module,m.sha256]));
  writeFileSync(join(directory,'motion-library.jsx'),bridge);writeFileSync(join(directory,'shot-runtime.jsx'),bridge);
  program.bridgeSha256=hash(bridge);
  for(const name of ['RemotionEffects.jsx']) program.runtimeSourceHashes[name]=hash(readFileSync(join(ROOT,'apps/video-factory/remotion',name)));
  const text=JSON.stringify(program,null,2)+'\n';writeFileSync(join(directory,'program.json'),text);
  storyboard.meta.visualProgram={schemaVersion:3,directory:relative(resourcesDirectory,directory).replaceAll('\\','/'),digest:hash(text),inputDigest:program.inputDigest};
  return {storyboard,program,directory};
}
export function verifyCreativeProgram(storyboard,resourcesDirectory) {
  const ref=storyboard.meta.visualProgram;if(ref?.schemaVersion!==3)throw new Error('Current compiled director program is required.');const directory=resolve(resourcesDirectory,ref.directory);
  if(!directory.startsWith(resolve(resourcesDirectory)+sep)) throw new Error('Creative program escapes resources.');
  const text=readFileSync(join(directory,'program.json'),'utf8');const program=JSON.parse(text);
  if(program.schemaVersion!==3||hash(text)!==ref.digest||creativeIdentity(storyboard)!==program.inputDigest||ref.inputDigest!==program.inputDigest) throw new Error('Creative plan changed; regenerate visuals.');
  for(const [file,sha] of Object.entries(program.sourceHashes)) {
    if(!/^[\w-]+\.jsx$/.test(file)||hash(readFileSync(join(directory,file)))!==sha) throw new Error(`Generated source changed: ${file}`);
  }
  for(const [file,sha] of Object.entries(program.runtimeSourceHashes)) {
    if(![...runtimeFiles,'RemotionEffects.jsx'].includes(file)||hash(readFileSync(join(ROOT,'apps/video-factory/remotion',file)))!==sha) throw new Error(`Director runtime changed: ${file}`);
  }
  for(const [file,sha] of Object.entries(program.librarySourceHashes??{})) if(hash(readFileSync(safeResourcePath(ROOT,file)))!==sha) throw new Error(`Approved asset changed: ${file}`);
  for(const file of ['shot-runtime.jsx','motion-library.jsx']) if(hash(readFileSync(join(directory,file)))!==program.bridgeSha256) throw new Error('Motion library bridge changed.');
  if(hash(readFileSync(join(resourcesDirectory,'production/narration.wav')))!==program.audioSha256||hash(readFileSync(join(resourcesDirectory,'production/timing.json')))!==program.timingSha256) throw new Error('Narration or measured timing changed after visual direction.');
  for(const [file,sha] of Object.entries(program.materialHashes??{}))if(hash(readFileSync(safeResourcePath(join(resourcesDirectory,'production'),file)))!==sha)throw new Error('Production material changed after direction: '+file);
  const actual=storyboard.scenes.flatMap((s,i)=>s.visualBeats.map(b=>`${i}:${b.id}:${b.implementation.key}`));
  const expected=program.decisions.map(d=>`${d.sceneIndex}:${d.beatId}:${d.key}`);
  if(JSON.stringify(actual)!==JSON.stringify(expected)) throw new Error('Creative shot mapping is incomplete.');
  return {program,directory};
}
