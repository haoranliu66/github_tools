import {writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {verifyCreativeProgram} from './creative-program.mjs';
const ROOT=resolve(import.meta.dirname,'../../..');
export function writeRenderEntry(storyboard,resourcesDirectory,entryPath) {
  const verified=verifyCreativeProgram(storyboard,resourcesDirectory);
  const modules=Object.keys(verified.program.sourceHashes),remotion=join(ROOT,'apps/video-factory/remotion');
  const absolute=p=>JSON.stringify(p.replaceAll('\\','/'));
  const entry=`import React from 'react';\nimport {Composition,registerRoot} from 'remotion';\n`+
    `import {DirectorVideo} from ${absolute(join(remotion,'DirectorVideo.jsx'))};\n`+
    `import {ShotRegistryContext} from ${absolute(join(remotion,'ShotRegistry.jsx'))};\n`+
    modules.map((file,i)=>`import Shot${i} from ${absolute(join(verified.directory,file))};`).join('\n')+'\n'+
    `const registry={${modules.map((file,i)=>`${JSON.stringify(file.slice(0,-4))}:Shot${i}`).join(',')}};\n`+
    `const Video=props=><ShotRegistryContext.Provider value={registry}><DirectorVideo {...props}/></ShotRegistryContext.Provider>;\n`+
    `const Root=()=> <Composition id="KnowledgeShare" component={Video} width={1920} height={1080} fps={30} durationInFrames={90} `+
    `calculateMetadata={({props})=>({width:props.meta.width,height:props.meta.height,fps:props.meta.fps,durationInFrames:props.meta.totalFrames})}/>;\nregisterRoot(Root);\n`;
  writeFileSync(entryPath,entry);return entryPath;
}
