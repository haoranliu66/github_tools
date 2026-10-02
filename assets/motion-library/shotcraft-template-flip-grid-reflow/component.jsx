// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/FlipGridReflow.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/FlipGridReflow.tsx
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
var Card = ({
  w,
  h,
  seed = 0,
  style
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: w,
      height: h,
      background: G.card,
      border: `2px solid ${G.border}`,
      borderRadius: 14,
      padding: 18,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      ...style
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 16,
        width: `${titleW}%`,
        background: G.bar,
        borderRadius: 8
      }
    }), Array.from({
      length: lines
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: `${88 - i * 14 - seed % 5 * 3}%`,
        background: G.line,
        borderRadius: 5
      }
    }, i)), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 8,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 13,
          background: G.mid
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 10,
          width: 64,
          background: G.line,
          borderRadius: 5
        }
      })]
    })]
  });
};
var TitleBlock = ({
  text,
  size = 88
}) => /* @__PURE__ */jsx("div", {
  style: {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: 800,
    fontSize: size,
    color: G.ink,
    letterSpacing: -1
  },
  children: text
});

// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/FlipGridReflow.tsx

var CARD_W = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#CARD_W", "CARD_W", () => 280);
var CARD_H = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#CARD_H", "CARD_H", () => 170);
var N = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#N", "N", () => 6);
var ROW_Y = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#ROW_Y", "ROW_Y", () => 330);
var ROW_CENTERS = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#ROW_CENTERS", "ROW_CENTERS", () => Array.from({
  length: N
}, (_, i) => [60 + CARD_W / 2 + i * (CARD_W + 24), ROW_Y]));
var GC = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#GC", "GC", () => [571.6, 960, 1348.4]);
var GR = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#GR", "GR", () => [416.2, 663.8]);
var GRID_CENTERS = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#GRID_CENTERS", "GRID_CENTERS", () => [[GC[0], GR[0]],
// card0 → 上左
[GC[0], GR[1]],
// card1 → 下左
[GC[1], GR[0]],
// card2 → 上中
[GC[1], GR[1]],
// card3 → 下中
[GC[2], GR[0]],
// card4 → 上右
[GC[2], GR[1]]
// card5 → 下右
]);
var BEAT = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#BEAT", "BEAT", () => 30);
var STAGGER = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#STAGGER", "STAGGER", () => 1.5);
var MOVE = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#MOVE", "MOVE", () => 16);
var SETTLE = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#SETTLE", "SETTLE", () => 3);
var SCALE_END = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#SCALE_END", "SCALE_END", () => 1.28);
var OVERSHOOT = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#OVERSHOOT", "OVERSHOOT", () => 1.02);
var ALL_SETTLED = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#ALL_SETTLED", "ALL_SETTLED", () => BEAT + (N - 1) * STAGGER + MOVE + SETTLE);
var PULSE_IN = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#PULSE_IN", "PULSE_IN", () => 58);
var PULSE_MID = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#PULSE_MID", "PULSE_MID", () => 61);
var PULSE_OUT = __scConfig("demos/rhythm/panel-grid-moves/FlipGridReflow.tsx#PULSE_OUT", "PULSE_OUT", () => 64);
var moveEase = Easing.inOut(Easing.cubic);
var FlipCard = ({
  i,
  frame
}) => {
  const t0 = BEAT + i * STAGGER;
  const [x0, y0] = ROW_CENTERS[i];
  const [x1, y1] = GRID_CENTERS[i];
  const x = interpolate(frame, [t0, t0 + MOVE], [x0, x1], {
    easing: moveEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const y = interpolate(frame, [t0, t0 + MOVE], [y0, y1], {
    easing: moveEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const sUp = interpolate(frame, [t0, t0 + MOVE], [1, SCALE_END * OVERSHOOT], {
    easing: moveEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const sBack = interpolate(frame, [t0 + MOVE, t0 + MOVE + SETTLE], [SCALE_END * OVERSHOOT, SCALE_END], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const s = frame < t0 + MOVE ? sUp : sBack;
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: x - CARD_W / 2,
      top: y - CARD_H / 2,
      width: CARD_W,
      height: CARD_H,
      transform: `scale(${s})`,
      transformOrigin: "50% 50%",
      zIndex: i
    },
    children: /* @__PURE__ */jsx2(Card, {
      w: CARD_W,
      h: CARD_H,
      seed: i + 1
    })
  });
};
var FlipGridReflow = () => {
  const frame = useCurrentFrame();
  const pulsing = frame >= PULSE_IN && frame <= PULSE_OUT;
  const bright = pulsing ? interpolate(frame, [PULSE_IN, PULSE_MID, PULSE_OUT], [1, 0.78, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) : 1;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden",
      ...(pulsing ? {
        filter: `brightness(${bright})`
      } : {})
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 70,
        top: 56
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("FLIP GRID REFLOW"),
        size: 44
      })
    }), Array.from({
      length: N
    }).map((_, i) => /* @__PURE__ */jsx2(FlipCard, {
      i,
      frame
    }, i))]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = FlipGridReflow;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
