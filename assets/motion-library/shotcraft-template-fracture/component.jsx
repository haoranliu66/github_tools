// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/opening/fracture/Fracture.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/opening/fracture/Fracture.tsx

var FRACTURE_DURATION = 156;
var N = __scConfig("demos/opening/fracture/Fracture.tsx#N", "N", () => 5);
var ACCENT_HUE = __scConfig("demos/opening/fracture/Fracture.tsx#ACCENT_HUE", "ACCENT_HUE", () => 218);
var HUES = __scConfig("demos/opening/fracture/Fracture.tsx#HUES", "HUES", () => [ACCENT_HUE, ACCENT_HUE + 8, ACCENT_HUE - 8, ACCENT_HUE + 4, ACCENT_HUE - 4]);
var TILES = __scConfig("demos/opening/fracture/Fracture.tsx#TILES", "TILES", () => Array.from({
  length: N * N
}, (_, seed) => {
  const r = Math.floor(seed / N);
  const c = seed % N;
  const hue = HUES[(r * 3 + c * 5) % HUES.length];
  const ang = r === 2 && c === 2 ? rand(seed + 300) * Math.PI * 2 : Math.atan2(r - 2 + (rand(seed + 310) - 0.5) * 0.8, c - 2 + (rand(seed + 320) - 0.5) * 0.8);
  return {
    left: `${c * 20}%`,
    top: `${r * 20}%`,
    background: `linear-gradient(${135 + r * 20}deg, hsl(${hue},14%,${38 + (r + c) % 3 * 14}%), hsl(${hue},20%,${22 + r * c % 4 * 10}%))`,
    dx: (rand(seed) - 0.5) * 900,
    dy: (rand(seed + 50) - 0.5) * 600,
    dz: (rand(seed + 100) - 0.3) * 700,
    rx: (rand(seed + 150) - 0.5) * 360,
    ry: (rand(seed + 200) - 0.5) * 360,
    rz: (rand(seed + 250) - 0.5) * 360,
    exX: Math.cos(ang) * (620 + rand(seed + 330) * 260),
    exY: Math.sin(ang) * (470 + rand(seed + 340) * 220),
    exR: (rand(seed + 350) - 0.5) * 300,
    delay: (Math.abs(r - 2) + Math.abs(c - 2)) * 0.045
  };
}));
var Fracture = () => {
  const t = useT();
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0b0b10",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        perspective: 900,
        overflow: "hidden"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 380,
          height: 230,
          margin: __scCopy("-115px 0 0 -190px"),
          transformStyle: "preserve-3d"
        },
        children: TILES.map((tl, i) => {
          const tin = seg(t, tl.delay, tl.delay + 0.34, E.inOutCubic);
          const tout = seg(t, 0.7 + tl.delay * 0.5, 0.7 + tl.delay * 0.5 + 0.18, E.inCubic);
          const inv = 1 - tin;
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: tl.left,
              top: tl.top,
              width: "19.2%",
              height: "19%",
              borderRadius: 3,
              background: tl.background,
              transform: `translate3d(${tl.dx * inv + tl.exX * tout}px,${tl.dy * inv + tl.exY * tout}px,${tl.dz * inv}px)
          rotateX(${tl.rx * inv}deg) rotateY(${tl.ry * inv}deg) rotateZ(${tl.rz * inv + tl.exR * tout}deg)`,
              opacity: Math.min(1, tin * 2.5)
              // 退场不淡出，实体飞出画面
            }
          }, i);
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          color: "#fff",
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 8,
          opacity: seg(t, 0.42, 0.52) - seg(t, 0.7, 0.78),
          textShadow: "0 2px 30px rgba(0,0,0,.8)"
        },
        children: __scCopy("REASSEMBLE")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = Fracture;
 return {component:template_entry_default,duration:FRACTURE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
