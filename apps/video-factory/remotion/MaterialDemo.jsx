import React from 'react';
import {AbsoluteFill,Composition,registerRoot} from 'remotion';
import * as M from './MotionLibrary.jsx';
const card=(label,color='#29415c')=><div style={{width:680,height:330,background:color,borderRadius:28,padding:60,fontSize:64,color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>{label}</div>;
export function MaterialDemo({id}) {
  let content;
  switch(id) {
    case 'gradient-text':content=<M.GradientText gradient="linear-gradient(90deg,#ff6c42,#6557e8)">信息连接起来</M.GradientText>;break;
    case 'kinetic-headline':content=<M.KineticHeadline text="问题 输入 过程 结果"/>;break;
    case 'draw-underline':content=<div>关键结论<M.DrawOnUnderline width={560}/></div>;break;
    case 'ghost-ahead':content=<M.GhostAhead tokens={['记录','检索','关联','回答']}/>;break;
    case 'defocus-reveal':content=<M.DefocusReveal>{card('从模糊到聚焦')}</M.DefocusReveal>;break;
    case 'dip-to-color':content=<>{card('章节交接')}<M.DipToColor cutFrame={45} durationFrames={24}/></>;break;
    case 'match-cut':content=<M.MatchCut before={<AbsoluteFill style={{alignItems:'center',justifyContent:'center'}}>{card('输入')}</AbsoluteFill>} after={<AbsoluteFill style={{alignItems:'center',justifyContent:'center'}}>{card('结果','#6557e8')}</AbsoluteFill>} anchor={<div style={{position:'absolute',top:70,left:80,fontSize:42}}>保持同一焦点</div>} cutFrame={45}/>;break;
    case 'perspective-panel':content=<M.PerspectivePanel>{card('界面进入空间')}</M.PerspectivePanel>;break;
    case 'cascade-grid':content=<M.CascadeGrid items={['结果 A','结果 B','结果 C','结果 D'].map(id=>({id}))} columns={2} renderItem={x=><div style={{background:'#29415c',padding:34,color:'white',fontSize:42}}>{x.id}</div>}/>;break;
    case 'count-up':content=<M.CountUp target={128} durationFrames={60}/>;break;
    case 'draw-path':content=<div style={{width:800}}><M.DrawPath d="M30 250 Q200 250 260 130 T760 30" color="#6557e8"/></div>;break;
    case 'camera-move':content=<M.CameraMove keys={[{frame:0,x:0,y:0,scale:1},{frame:80,x:-220,y:-60,scale:1.3}]}><div style={{position:'absolute',left:400,top:200}}>{card('跟随重点')}</div></M.CameraMove>;break;
    case 'flow-packet':content=<><div style={{position:'absolute',left:250,top:300}}>输入</div><div style={{position:'absolute',left:1000,top:300}}>存储</div><M.FlowPacket from={{x:340,y:500}} to={{x:1100,y:500}} label="用户偏好" durationFrames={70}/></>;break;
    case 'card-flip':content=<M.CardFlip before={<AbsoluteFill style={{alignItems:'center',justifyContent:'center'}}>{card('修改前')}</AbsoluteFill>} after={<AbsoluteFill style={{alignItems:'center',justifyContent:'center'}}>{card('修改后','#6557e8')}</AbsoluteFill>} startFrame={20} durationFrames={55}/>;break;
    case 'brush-reveal':content=<M.BrushReveal durationFrames={28}>{card('逐笔显现内容')}</M.BrushReveal>;break;
    case 'browser-frame':content=<M.BrowserFrame url="示意页面" width={1200} height={500}>{card('可放入任意界面')}</M.BrowserFrame>;break;
    case 'code-diff':content=<M.CodeDiff lines={[{type:'context',text:'const memory = createMemory();'},{type:'remove',text:'answer(question);'},{type:'add',text:'answer(question, memory);'}]} fontSize={38}/>;break;
    case 'accent-typewriter':content=<M.AccentTypewriter text="找回上一次对话的偏好" framesPerChar={4}/>;break;
    default:throw new Error('Unknown material demo '+id);
  }
  return <AbsoluteFill style={{background:'#f5f2eb',color:'#23252b',fontFamily:'Microsoft YaHei,sans-serif'}}><div style={{position:'absolute',top:55,left:70,fontSize:32}}>{id} · 表达示例</div><AbsoluteFill style={{alignItems:'center',justifyContent:'center',fontSize:76}}>{content}</AbsoluteFill></AbsoluteFill>;
}
registerRoot(()=> <Composition id="MaterialDemo" component={MaterialDemo} durationInFrames={100} fps={30} width={1600} height={900} defaultProps={{id:'flow-packet'}}/>);
