// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/segmented-thumb-hero/SegmentedThumbHero.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/segmented-thumb-hero/SegmentedThumbHero.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/segmented-thumb-hero/SegmentedThumbHero.tsx

var FONT = __scConfig("demos/interaction/segmented-thumb-hero/SegmentedThumbHero.tsx#FONT", "FONT", () => "Helvetica, Arial, sans-serif");
var ArrowCursor = ({
  x,
  y,
  press
}) => /* @__PURE__ */jsx2("svg", {
  width: 130,
  height: 150,
  viewBox: "0 0 26 30",
  style: {
    position: "absolute",
    left: x,
    top: y,
    transform: `scale(${1 - press * 0.14})`,
    transformOrigin: "15% 10%",
    filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.25))"
  },
  children: /* @__PURE__ */jsx2("path", {
    d: __scCopy("M4 2 L4 24 L9.5 18.5 L13 27 L16.8 25.4 L13.3 17 L21 17 Z"),
    fill: "#fff",
    stroke: G.ink,
    strokeWidth: 1.8,
    strokeLinejoin: "round"
  })
});
var SmileLaptop = ({
  size
}) => /* @__PURE__ */jsxs2("svg", {
  width: size,
  height: size,
  viewBox: "0 0 40 40",
  children: [/* @__PURE__ */jsx2("rect", {
    x: 7,
    y: 7,
    width: 26,
    height: 19,
    rx: 3,
    fill: "none",
    stroke: G.ink,
    strokeWidth: 3
  }), /* @__PURE__ */jsx2("circle", {
    cx: 15.5,
    cy: 14.5,
    r: 1.9,
    fill: G.ink
  }), /* @__PURE__ */jsx2("circle", {
    cx: 24.5,
    cy: 14.5,
    r: 1.9,
    fill: G.ink
  }), /* @__PURE__ */jsx2("path", {
    d: __scCopy("M14.5 19 Q20 23.5 25.5 19"),
    stroke: G.ink,
    strokeWidth: 2.6,
    fill: "none",
    strokeLinecap: "round"
  }), /* @__PURE__ */jsx2("path", {
    d: __scCopy("M4 31 L36 31"),
    stroke: G.ink,
    strokeWidth: 3.4,
    strokeLinecap: "round"
  })]
});
var AskIcon = ({
  size
}) => /* @__PURE__ */jsxs2("svg", {
  width: size,
  height: size,
  viewBox: "0 0 40 40",
  children: [/* @__PURE__ */jsx2("circle", {
    cx: 20,
    cy: 20,
    r: 13,
    fill: "none",
    stroke: G.ink,
    strokeWidth: 3
  }), /* @__PURE__ */jsx2("path", {
    d: __scCopy("M16 17 q0-5 4.5-5 q4.5 0 4.5 4.2 q0 3-3.4 4.4 q-1.6 0.7-1.6 2.6"),
    stroke: G.ink,
    strokeWidth: 2.8,
    fill: "none",
    strokeLinecap: "round"
  }), /* @__PURE__ */jsx2("circle", {
    cx: 20,
    cy: 28,
    r: 1.8,
    fill: G.ink
  })]
});
var SegmentedThumbHero = () => {
  const frame = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  const FLOAT_IN = 0;
  const CURSOR_IN = 20;
  const CLICK = 48;
  const SLIDE = 52;
  const SLIDE_END = 60;
  const floatT = spring({
    frame: frame - FLOAT_IN,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.9
    }
  });
  const ctrlY = interpolate(floatT, [0, 1], [200, 0]);
  const CW = 1080;
  const CH = 220;
  const PAD = 16;
  const SEGW = (CW - PAD * 2) / 2;
  const curT = interpolate(frame, [CURSOR_IN, CURSOR_IN + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const curX = interpolate(curT, [0, 1], [1780, 1210]);
  const curY = interpolate(curT, [0, 1], [1020, 620]);
  const press = interpolate(frame, [CLICK, CLICK + 3, CLICK + 7], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const thumbT = interpolate(frame, [SLIDE, SLIDE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const thumbX = PAD + thumbT * SEGW;
  const iconIn = spring({
    frame: frame - SLIDE_END,
    fps,
    config: {
      damping: 10,
      stiffness: 220,
      mass: 0.6
    }
  });
  const laptopScale = frame >= SLIDE_END ? iconIn : 0;
  const askScale = interpolate(frame, [SLIDE, SLIDE + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  });
  const rippleT = interpolate(frame, [CLICK, CLICK + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
  const labelStyle = active => ({
    fontFamily: FONT,
    fontWeight: 700,
    fontSize: 72,
    color: active ? G.ink : G.mid,
    transition: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    width: SEGW,
    height: CH - PAD * 2,
    position: "relative",
    zIndex: 2
  });
  const askActive = thumbT < 0.5;
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: G.bg,
      alignItems: "center",
      justifyContent: "center"
    },
    children: [/* @__PURE__ */jsxs2("div", {
      style: {
        width: CW,
        height: CH,
        borderRadius: CH / 2,
        background: "#e4e4e2",
        border: `3px solid ${G.border}`,
        boxShadow: `0 ${24 - floatT * 12}px ${70 - floatT * 20}px rgba(0,0,0,0.22)`,
        transform: `translateY(${ctrlY}px)`,
        opacity: Math.min(1, floatT * 1.5),
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: PAD,
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: thumbX,
          top: PAD,
          width: SEGW,
          height: CH - PAD * 2,
          borderRadius: (CH - PAD * 2) / 2,
          background: "#fff",
          boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
          zIndex: 1
        }
      }), rippleT > 0 && rippleT < 1 && /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: PAD + SEGW + SEGW / 2 - 130 * rippleT,
          top: CH / 2 - PAD - 130 * rippleT + (CH - PAD * 2) / 2 - (CH / 2 - PAD),
          width: 260 * rippleT,
          height: 260 * rippleT,
          borderRadius: "50%",
          border: `4px solid ${G.mid}`,
          opacity: 1 - rippleT,
          zIndex: 3
        }
      }), /* @__PURE__ */jsxs2("div", {
        style: labelStyle(askActive),
        children: [/* @__PURE__ */jsx2("span", {
          style: {
            display: "inline-flex",
            transform: `scale(${askScale})`,
            width: askScale < 0.05 ? 0 : 78,
            overflow: "visible"
          },
          children: /* @__PURE__ */jsx2(AskIcon, {
            size: 78
          })
        }), __scCopy("Ask")]
      }), /* @__PURE__ */jsxs2("div", {
        style: labelStyle(!askActive),
        children: [/* @__PURE__ */jsx2("span", {
          style: {
            display: "inline-flex",
            transform: `scale(${laptopScale})`,
            width: laptopScale < 0.05 ? 0 : 78,
            overflow: "visible"
          },
          children: /* @__PURE__ */jsx2(SmileLaptop, {
            size: 78
          })
        }), __scCopy("Computer")]
      })]
    }), /* @__PURE__ */jsx2(ArrowCursor, {
      x: curX,
      y: curY,
      press
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SegmentedThumbHero;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
