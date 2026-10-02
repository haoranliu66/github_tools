// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/mosaic-reframe/MosaicReframe.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/mosaic-reframe/MosaicReframe.tsx

var MOSAIC_REFRAME_DURATION = 180;
var smooth = x => x * x * (3 - 2 * x);
var KEYS = __scConfig("demos/transition/mosaic-reframe/MosaicReframe.tsx#KEYS", "KEYS", () => ["x", "y", "w", "h", __scCopy("rot")]);
var acc = (t, base, kfs, ease) => {
  const out = {
    ...base
  };
  let prev = base;
  for (const kf of kfs) {
    const u = seg(t, kf.at[0], kf.at[1], ease);
    for (const k of KEYS) out[k] += u * (kf.to[k] - prev[k]);
    prev = kf.to;
  }
  return out;
};
var gw = (92 - 3 * 2) / 4;
var gh = (92 - 2 * 2) / 3;
var A = __scConfig("demos/transition/mosaic-reframe/MosaicReframe.tsx#A", "A", () => Array.from({
  length: 12
}, (_, i) => {
  const c = i % 4,
    r = i / 4 | 0;
  return {
    x: 4 + c * (gw + 2),
    y: 4 + r * (gh + 2),
    w: gw,
    h: gh,
    rot: 0
  };
}));
var uw = (92 - 5 * 1.2) / 6;
var uh = (92 - 3 * 1.2) / 4;
var SLOTS = __scConfig("demos/transition/mosaic-reframe/MosaicReframe.tsx#SLOTS", "SLOTS", () => [[0, 0, 3, 2], [3, 0, 1, 1], [4, 0, 1, 1], [5, 0, 1, 1], [3, 1, 2, 1], [5, 1, 1, 1], [0, 2, 1, 1], [1, 2, 2, 1], [3, 2, 1, 2], [4, 2, 2, 1], [0, 3, 3, 1], [4, 3, 2, 1]]);
var B = __scConfig("demos/transition/mosaic-reframe/MosaicReframe.tsx#B", "B", () => SLOTS.map(([c, r, cw, rh]) => ({
  x: 4 + c * (uw + 1.2),
  y: 4 + r * (uh + 1.2),
  w: cw * uw + (cw - 1) * 1.2,
  h: rh * uh + (rh - 1) * 1.2,
  rot: 0
})));
var C = __scConfig("demos/transition/mosaic-reframe/MosaicReframe.tsx#C", "C", () => Array.from({
  length: 12
}, (_, i) => ({
  x: 1 + i * 6.4,
  y: -7 + i * 7.6,
  w: 23,
  h: 27,
  rot: -15 + i * 3
})));
var MosaicReframe = () => {
  const t = useT();
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0a0b10",
    raster: "zoom",
    children: A.map((base, i) => {
      const hue = 198 + i * 13;
      const st = i * 7e-3;
      const v = acc(t, base, [{
        at: [0.26 + st, 0.42 + st],
        to: B[i]
      },
      // A → B
      {
        at: [0.62 + st, 0.8 + st],
        to: C[i]
      }
      // hold 后 B → C
      ], smooth);
      const pop = seg(t, i * 0.012, i * 0.012 + 0.14, E.outCubic);
      return /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          borderRadius: 7,
          overflow: "hidden",
          background: `linear-gradient(${140 + i * 9}deg,hsl(${hue},58%,42%),hsl(${hue + 26},64%,20%))`,
          boxShadow: `0 8px 22px rgba(0,0,0,.45),inset 0 0 0 1px hsla(${hue},70%,72%,.22)`,
          left: `${v.x}%`,
          top: `${v.y}%`,
          width: `${v.w}%`,
          height: `${v.h}%`,
          transform: `rotate(${v.rot}deg) scale(${lerp(pop, 0.82, 1)})`,
          opacity: pop,
          zIndex: 10 + (i === 0 ? 5 : 0)
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 9,
            top: 9,
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: `hsla(${hue + 40},90%,78%,.95)`,
            boxShadow: `0 0 10px hsla(${hue + 40},90%,70%,.7)`
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 9,
            bottom: 16,
            height: 5,
            width: `${34 + rand(i) * 30}%`,
            borderRadius: 3,
            background: "hsla(0,0%,100%,.6)"
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 9,
            bottom: 8,
            height: 4,
            width: `${20 + rand(i + 7) * 24}%`,
            borderRadius: 2,
            background: "hsla(0,0%,100%,.28)"
          }
        })]
      }, i);
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = MosaicReframe;
 return {component:template_entry_default,duration:MOSAIC_REFRAME_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
