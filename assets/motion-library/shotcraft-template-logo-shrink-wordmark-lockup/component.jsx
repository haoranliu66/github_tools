// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/outro/logo-shrink-wordmark-lockup/LogoShrinkWordmarkLockup.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/outro/logo-shrink-wordmark-lockup/LogoShrinkWordmarkLockup.tsx

var LOGO_SHRINK_WORDMARK_LOCKUP_DURATION = 132;
var ACCENT = __scConfig("demos/outro/logo-shrink-wordmark-lockup/LogoShrinkWordmarkLockup.tsx#ACCENT", "ACCENT", () => "#e0342c");
var WORDMARK = __scConfig("demos/outro/logo-shrink-wordmark-lockup/LogoShrinkWordmarkLockup.tsx#WORDMARK", "WORDMARK", () => __scCopy("BRAND"));
var ICON = __scConfig("demos/outro/logo-shrink-wordmark-lockup/LogoShrinkWordmarkLockup.tsx#ICON", "ICON", () => 30);
var SHIFT = __scConfig("demos/outro/logo-shrink-wordmark-lockup/LogoShrinkWordmarkLockup.tsx#SHIFT", "SHIFT", () => -68);
var arcPath = (cx, cy, r, a0, a1) => {
  const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${x0.toFixed(2)},${y0.toFixed(2)} A${r},${r} 0 ${large} 1 ${x1.toFixed(2)},${y1.toFixed(2)}`;
};
var Arcs = ({
  a0,
  a1,
  col,
  w,
  blur,
  opacity,
  stroke
}) => /* @__PURE__ */jsx2("g", {
  opacity,
  children: [[a0, a1], [a0 + 180, a1 + 180]].map(([b0, b1], i) => /* @__PURE__ */jsx2("path", {
    d: arcPath(15, 15, 10.5, b0, b1),
    fill: "none",
    stroke: stroke ?? col,
    strokeWidth: w,
    strokeLinecap: "round",
    style: blur ? {
      filter: `blur(${blur}px)`
    } : void 0
  }, i))
});
var LogoShrinkWordmarkLockup = () => {
  const t = useT();
  const k = seg(t, 0.02, 0.28, E.inOutCubic);
  const brake = Math.sin(seg(t, 0.26, 0.37) * Math.PI) * 0.06;
  const s = lerp(k, 5.4, 1) * (1 + brake);
  const shift = seg(t, 0.34, 0.47, E.inOutCubic) * SHIFT;
  const heal = seg(t, 0.1, 0.28, E.inOutQuad);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#030509",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: ICON,
          height: ICON,
          margin: `${-ICON / 2}px 0 0 ${-ICON / 2}px`,
          transform: `translateX(${shift}px) scale(${s})`
        },
        children: /* @__PURE__ */jsxs("svg", {
          viewBox: "0 0 30 30",
          style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "visible"
          },
          children: [/* @__PURE__ */jsx2(Arcs, {
            a0: -32,
            a1: 122,
            col: "rgba(110,90,255,.6)",
            w: 6.5,
            blur: 2.5,
            opacity: 1 - heal
          }), /* @__PURE__ */jsx2(Arcs, {
            a0: -32,
            a1: 122,
            col: "#dfe9ff",
            w: 3.4,
            blur: 0,
            opacity: 1 - heal * 0.75,
            stroke: heal > 0.5 ? "#fff" : "#dfe9ff"
          }), /* @__PURE__ */jsx2("circle", {
            cx: 15,
            cy: 15,
            r: 10.5,
            fill: "none",
            stroke: "#fff",
            strokeWidth: 5.5,
            opacity: heal
          })]
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "calc(50% - 40px)",
          top: "50%",
          height: ICON,
          marginTop: -ICON / 2,
          display: "flex",
          alignItems: "center",
          gap: 2
        },
        children: [...WORDMARK].map((ch, i) => {
          const lk = seg(t, 0.46 + i * 0.035, 0.46 + i * 0.035 + 0.1, E.outCubic);
          return /* @__PURE__ */jsx2("span", {
            style: {
              color: "#f2f5fa",
              font: "800 27px/1 -apple-system,'Helvetica Neue',sans-serif",
              letterSpacing: 2,
              opacity: lk,
              transform: `translateX(${lerp(lk, 8, 0)}px)`
            },
            children: ch
          }, i);
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          top: "calc(50% + 34px)",
          textAlign: "center",
          color: ACCENT,
          font: "600 13px/1 -apple-system,sans-serif",
          letterSpacing: 5,
          opacity: seg(t, 0.72, 0.84, E.outQuad)
        },
        children: __scCopy("BUILD. SHIP. REPEAT.")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = LogoShrinkWordmarkLockup;
 return {component:template_entry_default,duration:LOGO_SHRINK_WORDMARK_LOCKUP_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
