import {loadVideoEditingSkill} from './editorial-agent.mjs';
export function directorSkillBody(root,mode) {
  const source=loadVideoEditingSkill(root).content.replaceAll('\r\n','\n');
  const blocks=new Map([...source.matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gmu)].map(m=>[m[1],m[2].trim()]));
  const names=mode==='child'?['共通职责','镜头子代理']:['共通职责',mode==='short'?'短片采用整体生成':'长片采用统筹镜头子代理实现','修复与连续性'];
  return names.map(n=>{if(!blocks.has(n))throw new Error('Missing director Skill section: '+n);return '## '+n+'\n'+blocks.get(n);}).join('\n\n');
}
