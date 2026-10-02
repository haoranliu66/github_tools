// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/flying-words/FlyingWords.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/flying-words/FlyingWords.tsx

var FLYING_WORDS_DURATION = 180;
var WORDS = __scConfig("demos/typography/flying-words/FlyingWords.tsx#WORDS", "WORDS", () => [__scCopy("Motion"), __scCopy("Layout"), __scCopy("Camera"), __scCopy("Stagger"), __scCopy("Easing"), __scCopy("Beat"), __scCopy("Keyframe"), __scCopy("Blur"), __scCopy("Scale"), __scCopy("Transform"), __scCopy("Rotate"), __scCopy("Parallax"), __scCopy("Opacity"), __scCopy("Depth"), __scCopy("Tween"), __scCopy("Loop"), __scCopy("Spring"), __scCopy("Delay"), __scCopy("Fade"), __scCopy("Composite"), __scCopy("Grid"), __scCopy("Pivot")]);
var N = __scConfig("demos/typography/flying-words/FlyingWords.tsx#N", "N", () => WORDS.length);
var ITEMS = __scConfig("demos/typography/flying-words/FlyingWords.tsx#ITEMS", "ITEMS", () => WORDS.map((w, i) => {
  const hue = 200 + rand(i * 11) * 130;
  const a = i * 2.39996 + rand(i * 7 + 1) * 0.8;
  const r = 82 + rand(i * 13 + 2) * 165;
  return {
    text: w,
    fontSize: 20 + rand(i + 3) * 16,
    color: `hsl(${hue},${58 + rand(i + 5) * 30}%,${70 + rand(i + 9) * 18}%)`,
    textShadow: `0 0 16px hsla(${hue},90%,66%,.45)`,
    x: Math.cos(a) * r,
    y: Math.sin(a) * r * 0.6,
    rz: (rand(i + 21) - 0.5) * 14,
    ph: i / N
  };
}));
var OP = __scConfig("demos/typography/flying-words/FlyingWords.tsx#OP", "OP", () => [0, 1, 0.5, 0.2, 0]);
var OT = __scConfig("demos/typography/flying-words/FlyingWords.tsx#OT", "OT", () => [0, 0.25, 0.6, 0.85, 1]);
var curve = u => {
  for (let k = 0; k < 4; k++) {
    if (u <= OT[k + 1]) {
      const p = (u - OT[k]) / (OT[k + 1] - OT[k]);
      return OP[k] + (OP[k + 1] - OP[k]) * p;
    }
  }
  return 0;
};
var CYCLES = __scConfig("demos/typography/flying-words/FlyingWords.tsx#CYCLES", "CYCLES", () => 2);
var FlyingWords = () => {
  const t = useT();
  return (
    // 渐变底全部用百分比 → 放到 DesignStage 外层 bg 上，在合成分辨率下原生栅格化
    // （与原渲染 DPR=4 的平滑度一致；缩放容器内画大渐变会产生 4px 宽的色带）
    /* @__PURE__ */
    jsx2(DesignStage, {
      bg: "radial-gradient(60% 60% at 50% 50%,#131a2c,#05060b 75%)",
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          inset: 0,
          perspective: 1100,
          overflow: "hidden"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0,
            transformStyle: "preserve-3d"
          },
          children: ITEMS.map((it, i) => {
            const u = (t * CYCLES + it.ph) % 1;
            const z = lerp(u, -1750, 800);
            const drift = 0.5 + u * 1.35;
            return /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 0,
                top: 0,
                transformOrigin: "50% 50%",
                whiteSpace: "nowrap",
                fontWeight: 800,
                fontSize: it.fontSize,
                lineHeight: 1,
                fontFamily: "-apple-system,'Segoe UI',sans-serif",
                letterSpacing: __scCopy("0.5px"),
                color: it.color,
                textShadow: it.textShadow,
                margin: __scCopy("-14px 0 0 -60px"),
                transform: `translate3d(${it.x * drift}px,${it.y * drift}px,${z}px) rotateZ(${it.rz}deg)`,
                opacity: curve(u),
                filter: u > 0.86 ? `blur(${(u - 0.86) * 26}px)` : "none"
              },
              children: it.text
            }, i);
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 220,
            height: 220,
            margin: -110,
            borderRadius: "50%",
            background: "radial-gradient(circle,rgba(120,150,255,.22),transparent 68%)",
            filter: "blur(6px)",
            opacity: 0.75 + Math.sin(t * Math.PI * 4) * 0.12
          }
        })]
      })
    })
  );
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = FlyingWords;
 return {component:template_entry_default,duration:FLYING_WORDS_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
