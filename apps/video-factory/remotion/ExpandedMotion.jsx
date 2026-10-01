// Reviewed MIT ports; original source and full notices retained in integrations/motion-sources.
import React from 'react';
import {AbsoluteFill,Easing,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
const p=(f,start,dur)=>interpolate(f,[start,start+dur],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.out(Easing.cubic)});
// RenderComp CardFlipTransition: retain the actual front/back geometry, expose arbitrary scene content.
export function CardFlip({before,after,startFrame=30,durationFrames=45,backdrop='#14141f',style}) {
  const f=useCurrentFrame();const rotateY=interpolate(f,[startFrame,startFrame+durationFrames],[0,180],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.inOut(Easing.ease)});
  const faceOn=Math.abs(Math.cos(rotateY*Math.PI/180));
  return <AbsoluteFill style={{background:backdrop,perspective:2200,...style}}>
    <div style={{position:'absolute',left:'11%',top:'76%',width:'78%',height:'16%',borderRadius:'50%',background:'radial-gradient(ellipse, #0008,transparent 72%)',scale:`${.25+faceOn*.75} 1`,filter:'blur(18px)'}}/>
    <AbsoluteFill style={{transformStyle:'preserve-3d',transform:`rotateY(${rotateY}deg)`}}>
      <AbsoluteFill style={{backfaceVisibility:'hidden'}}>{before}</AbsoluteFill>
      <AbsoluteFill style={{backfaceVisibility:'hidden',transform:'rotateY(180deg)'}}>{after}</AbsoluteFill>
    </AbsoluteFill></AbsoluteFill>;
}
// RenderComp BrushStrokeReveal: preserve band clipping and staged brush passes for arbitrary children.
export function BrushReveal({children,startFrame=0,durationFrames=12,strokes=3,direction='left',style}) {
  const f=useCurrentFrame();return <div style={{position:'relative',...style}}>{Array.from({length:strokes},(_,i)=>
    <div key={i} style={{position:i===0?'relative':'absolute',inset:i===0?undefined:0,clipPath:`inset(${i*100/strokes}% 0 ${100-(i+1)*100/strokes}% 0)`}}>
      <div style={{scale:`${p(f,startFrame+i*3,durationFrames)} 1`,transformOrigin:`${direction} center`}}>{children}</div>
    </div>)}</div>;
}
// Onda BrowserFrame: preserve browser chrome/arbitrary children, replace internal dependency graph with frame APIs.
export function BrowserFrame({children,url='localhost',startFrame=0,width=1400,height=650,theme,style}) {
  const f=useCurrentFrame(),{fps}=useVideoConfig();const q=spring({frame:f-startFrame,fps,config:theme?.motion.spring??{damping:22,stiffness:140}});
  const palette=theme?.palette??{panel:'#171e32',line:'#344567',ink:'#f2f4ff',muted:'#929ab4'};
  return <div style={{width,background:palette.panel,borderRadius:theme?.geometry.radius??22,overflow:'hidden',border:`1px solid ${palette.line}`,opacity:p(f,startFrame,8),scale:.96+q*.04,...style}}>
    <div style={{height:64,display:'flex',alignItems:'center',gap:10,padding:'0 22px',borderBottom:`1px solid ${palette.line}`}}>
      {['#fa827c','#efc969','#81d49b'].map(c=><span key={c} style={{width:15,height:15,borderRadius:99,background:c}}/>)}
      <div style={{marginLeft:18,fontSize:24,color:palette.muted}}>{url}</div>
    </div><div style={{height,position:'relative',overflow:'hidden',color:palette.ink}}>{children}</div></div>;
}
// Onda CodeDiff: retain semantic add/remove gutter + tinted lines; adapt rise/stagger to core frames.
export function CodeDiff({lines,title='示例改动',startFrame=0,lineDelay=5,fontSize=34,theme,style}) {
  const f=useCurrentFrame();const colors=theme?.palette??{ink:'#f2f4ff',panel:'#171e32',line:'#344567'};
  return <div style={{background:colors.panel,borderRadius:theme?.geometry.radius??20,overflow:'hidden',fontFamily:theme?.typography.code??'Consolas,monospace',...style}}>
    <div style={{padding:'18px 24px',borderBottom:`1px solid ${colors.line}`,color:colors.ink,fontSize:24}}>{title}</div>
    <div style={{padding:'24px 0',fontSize,lineHeight:1.6}}>{lines.map((line,i)=> {
      const q=p(f,startFrame+i*lineDelay,12),c=line.type==='add'?'#37b97a':line.type==='remove'?'#e57a77':colors.ink;
      return <div key={i} style={{opacity:q,translate:`0px ${(1-q)*6}px`,display:'flex',whiteSpace:'pre-wrap',color:c,padding:'0 28px 0 18px',borderLeft:`4px solid ${line.type==='context'?'transparent':c}`,background:line.type==='context'?'transparent':`${c}14`}}>
        <span style={{width:'1.4em',flexShrink:0}}>{line.type==='add'?'+':line.type==='remove'?'−':' '}</span><span>{line.text}</span></div>;
    })}</div></div>;
}
// Curvable Typewriter: retain accent-at-birth -> resting-color and trailing caret; no loop or font dependency.
export function AccentTypewriter({text,startFrame=0,framesPerChar=3,fadeFrames=5,color='currentColor',accent='#f04e23',style}) {
  const f=useCurrentFrame()-startFrame;const count=Math.max(0,Math.min(text.length,Math.floor(f/framesPerChar)+1));
  return <div style={{whiteSpace:'pre-wrap',...style}}>{Array.from(text).map((letter,i)=> {
    const fade=p(f,i*framesPerChar,fadeFrames);return <span key={i} style={{position:'relative',display:i<count?'inline':'none',color,opacity:i<count?1:0}}>{letter}<span style={{position:'absolute',inset:0,color:accent,opacity:1-fade}}>{letter}</span></span>;
  })}<span style={{display:'inline-block',height:'1em',width:'.07em',marginLeft:'.08em',verticalAlign:'-.1em',background:accent,opacity:count<text.length?1:(Math.floor(Math.max(0,f)/8)%2?0:1)}}/></div>;
}
