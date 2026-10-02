// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/outro/neon-triple-marquee/NeonTripleMarquee.tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { jsx, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var FONT = __scConfig("demos/outro/neon-triple-marquee/NeonTripleMarquee.tsx#FONT", "FONT", () => '"Arial Black", "Helvetica Neue", Arial, sans-serif');
var MarqueeRow = ({
  word,
  color,
  dir,
  speed,
  frame,
  y,
  fontSize,
  brightness
}) => {
  const est = word.length * fontSize * 0.92;
  const unitW = est + fontSize * 1.3;
  const copies = Math.ceil(1920 / unitW) + 3;
  const offsetRaw = frame * speed % unitW;
  const offset = dir === 1 ? -unitW * 1.5 + offsetRaw : -unitW * 0.5 - offsetRaw;
  const strokeW = 5 + brightness * 3;
  return /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      top: y,
      left: 0,
      width: "100%",
      height: fontSize * 1.1,
      overflow: "visible",
      transform: `translateX(${offset}px)`,
      fontFamily: FONT,
      fontWeight: 900,
      fontSize,
      letterSpacing: 4,
      lineHeight: 1,
      color: "transparent",
      WebkitTextStroke: `${strokeW}px ${color}`,
      opacity: 0.35 + brightness * 0.65,
      filter: `drop-shadow(0 0 ${8 + brightness * 22}px ${color}) drop-shadow(0 0 ${20 + brightness * 50}px ${color})`
    },
    children: Array.from({
      length: copies
    }).map((_, i) => /* @__PURE__ */jsxs("span", {
      style: {
        position: "absolute",
        left: i * unitW,
        top: 0,
        whiteSpace: "nowrap"
      },
      children: [word, /* @__PURE__ */jsx("span", {
        style: {
          display: "inline-block",
          transform: `translateX(${fontSize * 0.4}px)`
        },
        children: "\u2022"
      })]
    }, i))
  });
};
var NeonTripleMarquee = () => {
  const f = useCurrentFrame();
  const pulse = idx => {
    const period = 45;
    const phase = ((f - idx * (period / 3)) % period + period) % period;
    const t = phase / period;
    if (t < 1 / 3) return 0.5 - 0.5 * Math.cos(t * 3 * Math.PI * 2);
    return 0;
  };
  const groupOpacity = interpolate(f, [0, 10, 128, 148], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rows = [{
    word: __scCopy("BETTER"),
    color: "#4d9fff",
    dir: 1,
    speed: 14
  }, {
    word: __scCopy("FASTER"),
    color: "#ff4dd2",
    dir: -1,
    speed: 17
  }, {
    word: __scCopy("STRONGER"),
    color: "#ffb347",
    dir: 1,
    speed: 14
  }];
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: "#050308",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx("div", {
      style: {
        opacity: groupOpacity,
        position: "absolute",
        inset: 0
      },
      children: rows.map((r, i) => /* @__PURE__ */jsx(MarqueeRow, {
        word: r.word,
        color: r.color,
        dir: r.dir,
        speed: r.speed,
        frame: f,
        y: 40 + i * 350,
        fontSize: 300,
        brightness: pulse(i)
      }, r.word))
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = NeonTripleMarquee;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
