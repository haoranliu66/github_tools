// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var G = __scConfig("demos/_fixtures/Fixtures.tsx#G", "G", () => ({
  bg: "#ececea",
  panel: "#f7f7f6",
  line: "#dcdcda",
  bar: "#c2c2c0",
  ink: "#2f2f2f",
  mid: "#8f8f8d",
  card: "#ffffff",
  border: "#d8d8d6",
  side: "#3a3a3a",
  sideBar: "#5a5a58"
}));

// implementation/video-shotcraft/full/stage/source/demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx

var K = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#K", "K", () => 200);
var H = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#H", "H", () => 320);
var ADV = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#ADV", "ADV", () => K + 60);
var SEGS = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#SEGS", "SEGS", () => [
// S (x offset 0) —— 6 段
{
  x1: 30,
  y1: 22,
  x2: 185,
  y2: 22
},
// 0 上横
{
  x1: 22,
  y1: 44,
  x2: 22,
  y2: 130
},
// 1 左上竖
{
  x1: 30,
  y1: 152,
  x2: 175,
  y2: 152
},
// 2 中横
{
  x1: 178,
  y1: 174,
  x2: 178,
  y2: 276
},
// 3 右下竖
{
  x1: 15,
  y1: 298,
  x2: 170,
  y2: 298
},
// 4 下横
{
  x1: 22,
  y1: 240,
  x2: 22,
  y2: 276
},
// 5 左下小竖（S 尾钩）
// H (x offset ADV) —— 3 段
{
  x1: ADV + 22,
  y1: 22,
  x2: ADV + 22,
  y2: 298
},
// 6 左竖
{
  x1: ADV + 178,
  y1: 22,
  x2: ADV + 178,
  y2: 298
},
// 7 右竖
{
  x1: ADV + 44,
  y1: 160,
  x2: ADV + 156,
  y2: 160
},
// 8 中横
// I (x offset ADV*2) —— 3 段
{
  x1: ADV * 2 + 40,
  y1: 22,
  x2: ADV * 2 + 160,
  y2: 22
},
// 9 上横
{
  x1: ADV * 2 + 100,
  y1: 44,
  x2: ADV * 2 + 100,
  y2: 276
},
// 10 中竖
{
  x1: ADV * 2 + 40,
  y1: 298,
  x2: ADV * 2 + 160,
  y2: 298
},
// 11 下横
// P (x offset ADV*3) —— 4 段
{
  x1: ADV * 3 + 22,
  y1: 22,
  x2: ADV * 3 + 22,
  y2: 298
},
// 12 左竖
{
  x1: ADV * 3 + 44,
  y1: 22,
  x2: ADV * 3 + 165,
  y2: 22
},
// 13 上横
{
  x1: ADV * 3 + 178,
  y1: 44,
  x2: ADV * 3 + 178,
  y2: 140
},
// 14 右短竖
{
  x1: ADV * 3 + 44,
  y1: 162,
  x2: ADV * 3 + 165,
  y2: 162
}
// 15 中横
]);
var ORDER = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#ORDER", "ORDER", () => [3, 9, 6, 15, 1, 11, 14, 4, 0, 7, 13, 2, 5, 8, 10, 12]);
var FIRST = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#FIRST", "FIRST", () => 14);
var STEP = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#STEP", "STEP", () => 6);
var SEG_IN = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#SEG_IN", "SEG_IN", () => 6);
var LAST_LAND = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#LAST_LAND", "LAST_LAND", () => FIRST + 15 * STEP + SEG_IN);
var PULSE_END = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#PULSE_END", "PULSE_END", () => LAST_LAND + 8);
var WORD_W = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#WORD_W", "WORD_W", () => ADV * 3 + K);
var OX = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#OX", "OX", () => (1920 - WORD_W) / 2);
var OY = __scConfig("demos/opening/stroke-segment-build/StrokeSegmentBuild.tsx#OY", "OY", () => (1080 - H) / 2 + 20);
var StrokeSegmentBuild = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(frame, [LAST_LAND, LAST_LAND + 3, PULSE_END], [1, 1.06, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.ink,
      overflow: "hidden",
      position: "relative"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        top: 110,
        width: "100%",
        textAlign: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 44,
        color: G.mid,
        letterSpacing: 2
      },
      children: __scCopy("STROKE SEGMENT BUILD")
    }), /* @__PURE__ */jsx2("svg", {
      width: 1920,
      height: 1080,
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        transform: `scale(${pulse})`,
        transformOrigin: "50% 55%"
      },
      children: SEGS.map((seg, i) => {
        const rank = ORDER.indexOf(i);
        const start = FIRST + rank * STEP;
        if (frame < start) return null;
        const t = interpolate(frame, [start, start + SEG_IN], [0, 1], {
          easing: Easing.out(Easing.cubic),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        const dx = seg.x2 - seg.x1;
        const dy = seg.y2 - seg.y1;
        const len = Math.hypot(dx, dy) || 1;
        const slide = 12 * (1 - t);
        const ox = -dx / len * slide;
        const oy = -dy / len * slide;
        return /* @__PURE__ */jsx2("line", {
          x1: OX + seg.x1 + ox,
          y1: OY + seg.y1 + oy,
          x2: OX + seg.x2 + ox,
          y2: OY + seg.y2 + oy,
          stroke: G.panel,
          strokeWidth: 44,
          strokeLinecap: "butt",
          opacity: t
        }, i);
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = StrokeSegmentBuild;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
