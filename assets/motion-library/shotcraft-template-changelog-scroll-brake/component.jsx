// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx

var CL = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#CL", "CL", () => ({
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
}));
var SCROLL0 = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#SCROLL0", "SCROLL0", () => 14);
var SCROLL1 = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#SCROLL1", "SCROLL1", () => 64);
var LIFT0 = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#LIFT0", "LIFT0", () => 68);
var LIFT1 = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#LIFT1", "LIFT1", () => 82);
var COL_W = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#COL_W", "COL_W", () => 1e3);
var COL_X = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#COL_X", "COL_X", () => (1920 - COL_W) / 2);
var GAP = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#GAP", "GAP", () => 20);
var N = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#N", "N", () => 34);
var TARGET = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#TARGET", "TARGET", () => 28);
var rowH = i => 72 + i * 29 % 3 * 22;
var rowY = [];
{
  let y = 0;
  for (let i = 0; i < N; i++) {
    rowY.push(y);
    y += rowH(i) + GAP;
  }
}
var TARGET_CY = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#TARGET_CY", "TARGET_CY", () => rowY[TARGET] + rowH(TARGET) / 2);
var END_T = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#END_T", "END_T", () => 540 - TARGET_CY);
var START_T = __scConfig("demos/data/scroll-brake-moves/ChangelogScrollBrake.tsx#START_T", "START_T", () => 80);
var scrollAt = f => interpolate(f, [SCROLL0, SCROLL1], [START_T, END_T], {
  easing: Easing.out(Easing.exp),
  ...CL
});
var Row = ({
  i,
  frame
}) => {
  const isTarget = i === TARGET;
  const h = rowH(i);
  const titleW = 30 + i * 37 % 45;
  const t = interpolate(frame, [LIFT0, LIFT1], [0, 1], {
    easing: Easing.out(Easing.cubic),
    ...CL
  });
  const lift = isTarget ? t : 0;
  const dim = isTarget ? 0 : t;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      position: "absolute",
      left: 0,
      top: rowY[i],
      width: COL_W,
      height: h,
      background: G.card,
      border: isTarget && lift > 0 ? `3px solid rgba(47,47,47,${lift})` : `2px solid ${G.border}`,
      borderRadius: 14,
      display: "flex",
      alignItems: "center",
      gap: 24,
      padding: __scCopy("0 30px"),
      boxSizing: "border-box",
      transform: `scale(${1 + 0.03 * lift})`,
      boxShadow: lift > 0 ? `0 ${6 + 22 * lift}px ${16 + 44 * lift}px rgba(0,0,0,${0.08 + 0.28 * lift})` : "0 2px 8px rgba(0,0,0,0.06)",
      opacity: 1 - 0.62 * dim,
      zIndex: isTarget ? 2 : 1
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        width: 88,
        height: 26,
        borderRadius: 13,
        background: isTarget ? "#4a4a48" : G.mid,
        flexShrink: 0
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        height: 16,
        width: `${titleW}%`,
        background: G.bar,
        borderRadius: 8
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        marginLeft: "auto",
        height: 12,
        width: 110,
        background: G.line,
        borderRadius: 6,
        flexShrink: 0
      }
    })]
  });
};
var ChangelogScrollBrake = () => {
  const frame = useCurrentFrame();
  const T = scrollAt(frame);
  const v = Math.abs(scrollAt(frame) - scrollAt(frame - 1));
  const blur = Math.min(v / 60, 1) * 6;
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: COL_X,
        top: 0,
        width: COL_W,
        height: 1080,
        transform: `translateY(${T}px)`,
        filter: blur > 0.15 ? `blur(${blur}px)` : void 0
      },
      children: Array.from({
        length: N
      }).map((_, i) => /* @__PURE__ */jsx2(Row, {
        i,
        frame
      }, i))
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ChangelogScrollBrake;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
