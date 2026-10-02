// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx

var AVATAR_GRID_RADIAL_BUILD_COLORIZE_DURATION = 168;
var PAPER = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#PAPER", "PAPER", () => "#F3F3F1");
var INK = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#INK", "INK", () => "#111113");
var MID = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#MID", "MID", () => "#8A8A8F");
var CARD_WHITE = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#CARD_WHITE", "CARD_WHITE", () => "#ffffff");
var FLAG_BG = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#FLAG_BG", "FLAG_BG", () => "#FDECEC");
var hex2rgb = hex => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
var mix = (a, b, t) => {
  const A = hex2rgb(a);
  const B = hex2rgb(b);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)},${Math.round(A[1] + (B[1] - A[1]) * t)},${Math.round(A[2] + (B[2] - A[2]) * t)})`;
};
var COLS = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#COLS", "COLS", () => 8);
var ROWS = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#ROWS", "ROWS", () => 7);
var TOTAL = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#TOTAL", "TOTAL", () => 5.6 * 30);
var GAP = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#GAP", "GAP", () => 10);
var CELL_W = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#CELL_W", "CELL_W", () => (480 - 32 - (COLS - 1) * GAP) / COLS);
var CELL_H = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#CELL_H", "CELL_H", () => (270 - 32 - (ROWS - 1) * GAP) / ROWS);
var INI = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#INI", "INI", () => [__scCopy("VS"), __scCopy("KJ"), __scCopy("EM"), __scCopy("AL"), __scCopy("TR"), __scCopy("MN"), __scCopy("BQ"), __scCopy("DW"), __scCopy("RC"), __scCopy("SF"), __scCopy("PL"), __scCopy("GH")]);
var ICONS = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#ICONS", "ICONS", () => ["\u25C6", "\u25B2", "\u25CF", "\u25A0", "\u2726", "\u25D0", "\u2756", "\u25A3"]);
var CELLS = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#CELLS", "CELLS", () => Array.from({
  length: ROWS * COLS
}, (_, i) => {
  const r = Math.floor(i / COLS);
  const c = i % COLS;
  const hidden = r >= 2 && r <= 4 && c >= 1 && c <= 6;
  const kind = Math.floor(rand(i * 9.1) * 3);
  const ini = INI[Math.floor(rand(i * 3.7) * INI.length)];
  const icon = ICONS[Math.floor(rand(i * 5.3) * ICONS.length)];
  const h = Math.floor(rand(i * 7.7) * 360);
  const ring = Math.round(Math.hypot((c - 3.5) / 1, (r - 3) / 0.85));
  const delay = (ring * 4 + rand(i + 40) * 3) / TOTAL;
  const flagged = rand(i + 900) < 0.15;
  const at = 0.3 + rand(i + 1600) * 0.3;
  return {
    hidden,
    kind,
    ini,
    icon,
    h,
    delay,
    flagged,
    at
  };
}));
var LEGEND = __scConfig("demos/data/avatar-grid-radial-build-colorize/AvatarGridRadialBuildColorize.tsx#LEGEND", "LEGEND", () => [[__scCopy("Active"), "#37C46B"], [__scCopy("Pending"), "#F5A524"], [__scCopy("Inactive"), "#F0453A"]]);
var AvatarGridRadialBuildColorize = () => {
  const t = useT();
  const tIn = seg(t, 0.02, 0.1, E.outQuad);
  const legendIn = seg(t, 0.26, 0.36, E.outQuad);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: PAPER,
    raster: "zoom",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        fontFamily: "-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 16
        },
        children: CELLS.map((cl, i) => {
          const r = Math.floor(i / COLS);
          const c = i % COLS;
          const f = 0.09 + cl.delay;
          const o = seg(t, f, f + 0.018, E.linear);
          const sc = seg(t, f, f + 0.03, E.outQuad);
          const cT = cl.flagged ? seg(t, cl.at, cl.at + 0.036, E.outQuad) : 0;
          return /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: c * (CELL_W + GAP),
              top: r * (CELL_H + GAP),
              width: CELL_W,
              height: CELL_H,
              boxSizing: "border-box",
              // 等价 grid stretch：边框计入轨道尺寸
              borderRadius: 8,
              background: cl.flagged ? mix(CARD_WHITE, FLAG_BG, cT) : CARD_WHITE,
              border: `1px solid ${cl.flagged ? mix("#E7E7E4", "#F6CFCF", cT) : "#E7E7E4"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              fontWeight: 700,
              fontSize: cl.kind === 1 ? 13 : 11,
              lineHeight: 1,
              fontFamily: "-apple-system,Helvetica,sans-serif",
              // Remotion 无头浏览器缺 -apple-system，补 Helvetica 对齐原片 SF 字形
              color: cl.kind === 1 ? "#6a6f7c" : "#3A3A3E",
              opacity: o,
              boxShadow: "0 1px 2px rgba(0,0,0,.04)",
              visibility: cl.hidden ? "hidden" : "visible",
              transform: `scale(${lerp(sc, 0.8, 1)})`
            },
            children: [cl.kind === 0 ? cl.ini : cl.kind === 1 ? cl.icon : null, cl.kind === 2 && /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                inset: 0,
                borderRadius: 7,
                background: `linear-gradient(${45 + cl.h % 90}deg, hsl(${cl.h},18%,78%), hsl(${(cl.h + 40) % 360},22%,62%))`
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                right: 4,
                top: 4,
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: cl.flagged ? mix("#37C46B", "#F0453A", cT) : "#37C46B"
              }
            })]
          }, i);
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "45%",
          transform: `translate(-50%,-50%) scale(${lerp(tIn, 0.98, 1)})`,
          fontWeight: 800,
          fontSize: 30,
          lineHeight: 1.2,
          fontFamily: "-apple-system,'Helvetica Neue',sans-serif",
          letterSpacing: -1.2,
          color: INK,
          textAlign: "center",
          zIndex: 5,
          whiteSpace: "nowrap",
          opacity: tIn
        },
        children: __scCopy("Let's bring them back in")
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "56%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 14,
          alignItems: "center",
          zIndex: 5,
          padding: __scCopy("4px 10px"),
          opacity: legendIn,
          whiteSpace: "nowrap"
        },
        children: LEGEND.map(([txt, col]) => /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontWeight: 600,
            fontSize: 11,
            lineHeight: 1,
            fontFamily: "-apple-system,Helvetica,sans-serif",
            // Remotion 无头浏览器缺 -apple-system，补 Helvetica 对齐原片 SF 字形
            color: MID
          },
          children: [/* @__PURE__ */jsx2("span", {
            style: {
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: col,
              display: "inline-block"
            }
          }), /* @__PURE__ */jsx2("span", {
            children: txt
          })]
        }, txt))
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AvatarGridRadialBuildColorize;
 return {component:template_entry_default,duration:AVATAR_GRID_RADIAL_BUILD_COLORIZE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
