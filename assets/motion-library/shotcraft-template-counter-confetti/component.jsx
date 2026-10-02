// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/counter-confetti/CounterConfetti.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/counter-confetti/CounterConfetti.tsx

var COUNTER_CONFETTI_DURATION = 138;
var PAL = __scConfig("demos/data/counter-confetti/CounterConfetti.tsx#PAL", "PAL", () => ["#ff6b8b", "#ffb347", "#ffe86b", "#7bff9e", "#5fd8ff", "#6c8cff", "#c86cff", "#ff6cf0"]);
var BURST = __scConfig("demos/data/counter-confetti/CounterConfetti.tsx#BURST", "BURST", () => 0.52);
var BITS = __scConfig("demos/data/counter-confetti/CounterConfetti.tsx#BITS", "BITS", () => Array.from({
  length: 52
}, (_, i) => {
  const isRect = rand(i * 3) > 0.4;
  const w = 5 + rand(i + 2) * 6;
  const h = isRect ? 8 + rand(i + 5) * 7 : w;
  const side = i % 2 ? 1 : -1;
  return {
    w,
    h,
    isRect,
    color: PAL[i % 8],
    x0: side * 250,
    // 从画面两侧出发（px，相对中心）
    y0: (rand(i + 30) - 0.5) * 60,
    vx: -side * (150 + rand(i * 5 + 1) * 300),
    // 向画面中间冲
    vy: -(230 + rand(i * 7 + 3) * 220),
    g: 900 + rand(i + 60) * 520,
    spin: (rand(i + 90) - 0.5) * 1500,
    d: rand(i + 120) * 0.06
    // 每片略微错峰
  };
}));
var CounterConfetti = () => {
  const t = useT();
  const p = seg(t, 0.06, 0.56, E.outQuart);
  const val = Math.round(p * 1e3);
  const s1 = seg(t, 0.06, 0.3, E.outCubic);
  const s2 = seg(t, 0.56, 0.72, E.outBack);
  const sc = lerp(s1, 0.2, 1.3) + s2 * (1 - 1.3);
  const rp = seg(t, 0.545, 0.75, E.outQuart);
  return /* @__PURE__ */jsxs(DesignStage, {
    bg: "radial-gradient(80% 80% at 50% 45%,#161a2b,#07080e 75%)",
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "47%",
        width: 340,
        height: 340,
        margin: -170,
        borderRadius: "50%",
        background: "radial-gradient(circle,rgba(120,160,255,.28),transparent 66%)",
        opacity: 0.35 + seg(t, 0.5, 0.62, E.outCubic) * 0.65 - seg(t, 0.72, 1) * 0.5
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "47%",
        transformOrigin: "50% 50%",
        transform: `scale(${sc})`
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          transform: "translate(-50%,-50%)",
          whiteSpace: "nowrap",
          fontWeight: 800,
          fontSize: 74,
          lineHeight: 1,
          // 原栈 -apple-system 在 Remotion 无头浏览器解析不到（落到 Arial），
          // 补 Helvetica 兜底——度量与原片的 SF Pro 逐字形吻合
          fontFamily: "-apple-system,Helvetica,'Segoe UI',sans-serif",
          letterSpacing: -2,
          background: "linear-gradient(180deg,#ffffff,#a9bcff)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 34px rgba(130,160,255,.28)",
          opacity: Math.min(1, seg(t, 0.02, 0.12) * 1.2)
        },
        children: val.toLocaleString(__scCopy("en-US"))
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "70%",
        transform: "translate(-50%,0)",
        fontWeight: 700,
        fontSize: 10,
        lineHeight: 1,
        fontFamily: "-apple-system,Helvetica,sans-serif",
        // 同上：Helvetica 兜底对齐原片
        color: "#7d88a8",
        opacity: seg(t, 0.62, 0.78, E.outCubic),
        letterSpacing: lerp(seg(t, 0.62, 0.82, E.outCubic), 11, 5)
      },
      children: __scCopy("METRIC THIS WEEK")
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "47%",
        width: 120,
        height: 120,
        margin: -60,
        borderRadius: "50%",
        border: "2px solid rgba(160,190,255,.8)",
        // 原渲染无全局 border-box：120px 是内容宽，2px 边框外扩到 124px
        // （Remotion 注入了 * { box-sizing:border-box }，显式还原才对得上原片）
        boxSizing: "content-box",
        opacity: rp > 0 ? (1 - rp) * 0.9 : 0,
        transform: `scale(${0.35 + rp * 2.6})`
      }
    }), BITS.map((b, i) => {
      const u = seg(t, BURST + b.d, 1);
      const life = u * 1.1;
      const x = b.x0 + b.vx * life;
      const y = b.y0 + b.vy * life + 0.5 * b.g * life * life;
      return /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: b.w,
          height: b.h,
          background: b.color,
          borderRadius: b.isRect ? 2 : "50%",
          willChange: "transform",
          opacity: u <= 0 ? 0 : Math.min(1, u * 8) * (1 - seg(u, 0.74, 1) * 0.95),
          transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) rotate(${b.spin * life}deg) scale(${0.8 + (1 - u) * 0.35})`
        }
      }, i);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CounterConfetti;
 return {component:template_entry_default,duration:COUNTER_CONFETTI_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
