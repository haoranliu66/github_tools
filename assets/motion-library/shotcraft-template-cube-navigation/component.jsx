// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/cube-navigation/CubeNavigation.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/cube-navigation/CubeNavigation.tsx

var CUBE_NAVIGATION_DURATION = 180;
var S = __scConfig("demos/transition/cube-navigation/CubeNavigation.tsx#S", "S", () => 190);
var H = __scConfig("demos/transition/cube-navigation/CubeNavigation.tsx#H", "H", () => S / 2);
var FACES = __scConfig("demos/transition/cube-navigation/CubeNavigation.tsx#FACES", "FACES", () => [{
  n: __scCopy("OVERVIEW"),
  tr: `translateZ(${H}px)`,
  nm: [0, 0, 1],
  hue: 224,
  glyph: "\u25E7"
}, {
  n: __scCopy("METRICS"),
  tr: `rotateY(90deg) translateZ(${H}px)`,
  nm: [1, 0, 0],
  hue: 268,
  glyph: "\u25C6"
}, {
  n: __scCopy("TIMELINE"),
  tr: `rotateY(180deg) translateZ(${H}px)`,
  nm: [0, 0, -1],
  hue: 330,
  glyph: "\u25D4"
}, {
  n: __scCopy("ASSETS"),
  tr: `rotateY(-90deg) translateZ(${H}px)`,
  nm: [-1, 0, 0],
  hue: 190,
  glyph: "\u25A4"
}, {
  n: __scCopy("SETTINGS"),
  tr: `rotateX(90deg) translateZ(${H}px)`,
  nm: [0, -1, 0],
  hue: 154,
  glyph: "\u2699"
}, {
  n: __scCopy("EXPORT"),
  tr: `rotateX(-90deg) translateZ(${H}px)`,
  nm: [0, 1, 0],
  hue: 34,
  glyph: "\u21A5"
}]);
var CAM = __scConfig("demos/transition/cube-navigation/CubeNavigation.tsx#CAM", "CAM", () => [{
  rx: 0,
  ry: 0,
  d: 235
}, {
  rx: -22,
  ry: -38,
  d: -130
}, {
  rx: 0,
  ry: -90,
  d: 235
}, {
  rx: -27,
  ry: -142,
  d: -130
}, {
  rx: 0,
  ry: -180,
  d: 235
}, {
  rx: -24,
  ry: -226,
  d: -95
}]);
var WIN = __scConfig("demos/transition/cube-navigation/CubeNavigation.tsx#WIN", "WIN", () => [[0.1, 0.24], [0.3, 0.44], [0.5, 0.62], [0.66, 0.78], [0.84, 0.97]]);
var CAM_KEYS = __scConfig("demos/transition/cube-navigation/CubeNavigation.tsx#CAM_KEYS", "CAM_KEYS", () => [__scCopy("rx"), __scCopy("ry"), "d"]);
var acc = (t, base, kfs, ease) => {
  const out = {
    ...base
  };
  let prev = base;
  for (const kf of kfs) {
    const u = seg(t, kf.at[0], kf.at[1], ease);
    for (const k of CAM_KEYS) out[k] += u * (kf.to[k] - prev[k]);
    prev = kf.to;
  }
  return out;
};
var RAD = __scConfig("demos/transition/cube-navigation/CubeNavigation.tsx#RAD", "RAD", () => Math.PI / 180);
var R_CRUSH = __scConfig("demos/transition/cube-navigation/CubeNavigation.tsx#R_CRUSH", "R_CRUSH", () => [[1, 0.23], [2, 0.12], [3, 0.033], [5, 0.025], [6, 5e-3], [8, 0]]);
var rCrushAt = f => {
  if (f <= R_CRUSH[0][0]) return R_CRUSH[0][1];
  for (let i = 0; i < R_CRUSH.length - 1; i++) {
    const [f0, v0] = R_CRUSH[i];
    const [f1, v1] = R_CRUSH[i + 1];
    if (f <= f1) return v0 + (f - f0) / (f1 - f0) * (v1 - v0);
  }
  return 0;
};
var CubeNavigation = () => {
  const t = useT();
  const rCrush = rCrushAt(t * (CUBE_NAVIGATION_DURATION - 1));
  const v = acc(t, CAM[0], WIN.map((w, i) => ({
    at: w,
    to: CAM[i + 1]
  })), E.inOutCubic);
  const cy = Math.cos(v.ry * RAD),
    sy = Math.sin(v.ry * RAD);
  const cx = Math.cos(v.rx * RAD),
    sx = Math.sin(v.rx * RAD);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#000",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(110% 100% at 50% 10%,#171b2a,#07080e 72%)",
        perspective: 760,
        overflow: "hidden",
        // 开场整体淡入。按对照帧实测校准：原样片采集起点晚约 0.1 帧 +
        // x264 暗部量化把淡入首帧压得更暗，整个 ramp 后移 0.1/179 对齐
        opacity: seg(t - 0.1 / 179, 0, 0.08, E.outCubic)
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: `translateZ(${v.d}px) rotateX(${v.rx}deg) rotateY(${v.ry}deg)`
        },
        children: FACES.map((f, i) => {
          const [nx, ny, nz] = f.nm;
          const z1 = -nx * sy + nz * cy,
            y1 = ny;
          const z2 = y1 * sx + z1 * cx;
          const lit = Math.max(0, z2);
          return /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: -H,
              top: -H,
              width: S,
              height: S,
              transform: f.tr,
              backfaceVisibility: "hidden",
              borderRadius: 6,
              overflow: "hidden",
              background: `linear-gradient(155deg,hsl(${f.hue},44%,26%),hsl(${f.hue},52%,12%))`,
              boxShadow: `inset 0 0 0 1px hsla(${f.hue},70%,70%,.4)`,
              filter: `brightness(${(0.5 + lit * 0.62).toFixed(3)}) saturate(${(0.8 + lit * 0.4).toFixed(2)})`
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 14,
                top: 13,
                font: "700 9px/1 -apple-system,sans-serif",
                letterSpacing: 2.4,
                color: `hsla(${f.hue},80%,82%,.95)`
              },
              children: f.n
            }), Array.from({
              length: 4
            }, (_, k) => /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 14,
                top: 42 + k * 20,
                height: 9,
                borderRadius: 5,
                width: `${34 + rand(i * 9 + k) * 46}%`,
                background: `hsla(${f.hue},70%,72%,${0.5 - k * 0.09})`
              }
            }, k)), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                right: 14,
                bottom: 12,
                fontSize: 30,
                lineHeight: 1,
                color: `hsla(${f.hue},85%,80%,.55)`
              },
              children: f.glyph
            })]
          }, i);
        })
      }), rCrush > 0 && /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 0,
          background: `rgb(${Math.round(255 * (1 - rCrush))},255,255)`,
          mixBlendMode: "multiply"
        }
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CubeNavigation;
 return {component:template_entry_default,duration:CUBE_NAVIGATION_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
