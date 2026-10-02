// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx
import React from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var E = __scConfig("demos/_fixtures/Motion.tsx#E", "E", () => ({
  linear: t => t,
  inQuad: t => t * t,
  outQuad: t => t * (2 - t),
  inOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic: t => t * t * t,
  outCubic: t => 1 - Math.pow(1 - t, 3),
  inOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outQuart: t => 1 - Math.pow(1 - t, 4),
  outQuint: t => 1 - Math.pow(1 - t, 5),
  inQuart: t => t * t * t * t,
  outExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inExpo: t => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
  outBack: (t, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
  inBack: (t, s = 1.70158) => (s + 1) * t * t * t - s * t * t,
  outElastic: t => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1,
  spring: (t, bounce = 0.25) => {
    const w = 8 + 8 * (1 - bounce);
    return 1 - Math.exp(-6 * t) * Math.cos(w * t * bounce * 2.2);
  }
}));
var lerp = (t, a, b) => a + (b - a) * t;
var seg = (t, t0, t1, ease = E.linear) => ease(Math.min(1, Math.max(0, (t - t0) / (t1 - t0))));
var rand = seed => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
var useT = () => {
  const frame = useCurrentFrame();
  const {
    durationInFrames
  } = useVideoConfig();
  return Math.min(1, frame / Math.max(1, durationInFrames - 1));
};
var DesignStage = ({
  w = 480,
  h = 270,
  bg,
  raster = __scCopy("scale"),
  children
}) => {
  const {
    width
  } = useVideoConfig();
  const scale = width / w;
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: bg ?? "#000",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: w,
        height: h,
        overflow: "hidden",
        ...(raster === "zoom" ? {
          zoom: scale
        } : {
          transform: `scale(${scale})`,
          transformOrigin: __scCopy("top left")
        })
      },
      children
    })
  });
};

// implementation/video-shotcraft/full/stage/source/demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx

var SCAN_BRACKET_SWEEP_DURATION = 150;
var BG = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#BG", "BG", () => "#F1F1F3");
var INK = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#INK", "INK", () => "#0B0B0C");
var LINE = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#LINE", "LINE", () => "#E6E6EA");
var SKEL = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#SKEL", "SKEL", () => "#DEDEE3");
var clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
var inOutSin = x => 0.5 - Math.cos(Math.PI * clamp01(x)) / 2;
var DW = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#DW", "DW", () => 300);
var DH = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#DH", "DH", () => 178);
var DX = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#DX", "DX", () => (440 - DW) / 2);
var DY = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#DY", "DY", () => (240 - DH) / 2);
var COLS = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#COLS", "COLS", () => 4);
var COL_W = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#COL_W", "COL_W", () => (DW - 28 - (COLS - 1) * 10) / COLS);
var SKEL_COLS = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#SKEL_COLS", "SKEL_COLS", () => Array.from({
  length: COLS
}, (_, c) => ({
  x: 14 + c * (COL_W + 10),
  rows: Array.from({
    length: 7
  }, (_2, r) => ({
    top: 58 + r * 13,
    w: Number((COL_W * (0.55 + rand(c * 13 + r * 7) * 0.45)).toFixed(1))
  }))
})));
var CS = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#CS", "CS", () => 34);
var CB = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#CB", "CB", () => `2px solid ${INK}`);
var CORNERS = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#CORNERS", "CORNERS", () => [{
  pos: {
    left: -7,
    top: -7,
    borderLeft: CB,
    borderTop: CB
  },
  dx: 1,
  dy: 1
}, {
  pos: {
    right: -7,
    top: -7,
    borderRight: CB,
    borderTop: CB
  },
  dx: -1,
  dy: 1
}, {
  pos: {
    right: -7,
    bottom: -7,
    borderRight: CB,
    borderBottom: CB
  },
  dx: -1,
  dy: -1
}, {
  pos: {
    left: -7,
    bottom: -7,
    borderLeft: CB,
    borderBottom: CB
  },
  dx: 1,
  dy: -1
}]);
var PASSES = __scConfig("demos/effects/scan-bracket-sweep/ScanBracketSweep.tsx#PASSES", "PASSES", () => 5);
var ScanBracketSweep = () => {
  const t = useT();
  const dp = seg(t, 0, 0.11, E.outCubic);
  const sp = seg(t, 0.17, 0.95, E.linear);
  const raw = sp * PASSES;
  const pi = Math.min(PASSES - 1, Math.floor(raw));
  const local = clamp01((raw - pi) / 0.88);
  const dir = pi % 2 === 0 ? 1 : -1;
  const prog = inOutSin(local);
  const y = dir > 0 ? prog * DH : DH - prog * DH;
  const clipOp = Number((seg(t, 0.16, 0.2) * (1 - seg(t, 0.93, 0.99))).toFixed(3));
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: BG,
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 440,
        height: 240,
        margin: __scCopy("-120px 0 0 -220px")
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: DX,
          top: DY,
          width: DW,
          height: DH
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: DW,
            height: DH,
            boxSizing: "content-box",
            background: "#fff",
            border: `1px solid ${LINE}`,
            borderRadius: 10,
            boxShadow: "0 8px 26px rgba(0,0,0,.06)",
            overflow: "hidden",
            transformOrigin: "50% 50%",
            transform: `scale(${lerp(dp, 0.86, 1)})`,
            opacity: clamp01(dp * 3)
          },
          children: /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              right: 0
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 14,
                top: 12,
                width: Math.round(DW * 0.34),
                height: 7,
                borderRadius: 3,
                background: INK,
                opacity: 0.85
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 14,
                top: 25,
                width: Math.round(DW * 0.2),
                height: 5,
                borderRadius: 3,
                background: SKEL
              }
            }), SKEL_COLS.map((col, c) => /* @__PURE__ */jsxs(React.Fragment, {
              children: [/* @__PURE__ */jsx2("div", {
                style: {
                  position: "absolute",
                  left: col.x,
                  top: 44,
                  width: Number((COL_W * 0.72).toFixed(1)),
                  height: 6,
                  borderRadius: 3,
                  background: "#9A9AA2"
                }
              }), col.rows.map((row, r) => /* @__PURE__ */jsx2("div", {
                style: {
                  position: "absolute",
                  left: col.x,
                  top: row.top,
                  width: row.w,
                  height: 5,
                  borderRadius: 2.5,
                  background: SKEL
                }
              }, r))]
            }, c))]
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: DW,
            height: DH,
            borderRadius: 10,
            overflow: "hidden",
            pointerEvents: "none",
            opacity: clipOp
          },
          children: /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 0,
              transform: `translateY(${y.toFixed(2)}px)`
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 0,
                right: 0,
                height: 82,
                top: dir > 0 ? -82 : 2.5,
                background: dir > 0 ? "linear-gradient(180deg,rgba(20,20,22,0),rgba(20,20,22,.5))" : "linear-gradient(180deg,rgba(20,20,22,.5),rgba(20,20,22,0))"
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: 2.5,
                background: INK
              }
            })]
          })
        }), CORNERS.map((c, i) => {
          const p = seg(t, 0.08 + i * 0.022, 0.08 + i * 0.022 + 0.055, E.outCubic);
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              width: CS,
              height: CS,
              boxSizing: "content-box",
              opacity: p,
              transform: `translate(${(1 - p) * 8 * c.dx}px,${(1 - p) * 8 * c.dy}px)`,
              ...c.pos
            }
          }, i);
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ScanBracketSweep;
 return {component:template_entry_default,duration:SCAN_BRACKET_SWEEP_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
