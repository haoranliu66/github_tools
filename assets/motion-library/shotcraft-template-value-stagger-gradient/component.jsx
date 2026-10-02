// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/value-stagger-gradient/ValueStaggerGradient.tsx
import React from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/value-stagger-gradient/ValueStaggerGradient.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/value-stagger-gradient/ValueStaggerGradient.tsx

var VALUE_STAGGER_GRADIENT_DURATION = 150;
var staggerVal = (i, n, a, b, ease) => {
  let k = n <= 1 ? 0 : i / (n - 1);
  if (ease) k = ease(k);
  return lerp(k, a, b);
};
var N = __scConfig("demos/ui-entrance/value-stagger-gradient/ValueStaggerGradient.tsx#N", "N", () => 16);
var C = __scConfig("demos/ui-entrance/value-stagger-gradient/ValueStaggerGradient.tsx#C", "C", () => (N - 1) / 2);
var BARS = __scConfig("demos/ui-entrance/value-stagger-gradient/ValueStaggerGradient.tsx#BARS", "BARS", () => Array.from({
  length: N
}, (_, i) => ({
  i,
  hue: staggerVal(i, N, 200, 320),
  // 数值梯度：色相铺开
  hMax: staggerVal(i, N, 92, 32),
  // 数值梯度：高度 1→0.35
  distC: Math.abs(i - C) / C
})));
var ValueStaggerGradient = () => {
  const t = useT();
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0a0b10",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#0a0b10",
        overflow: "hidden",
        fontFamily: '"SF Mono",Menlo,monospace'
      },
      children: [BARS.map(({
        i,
        hue,
        hMax,
        distC
      }) => {
        const d = i * 0.02;
        const e = seg(t, 0.06 + d, 0.28 + d, E.outCubic);
        const y0 = staggerVal(i, N, 46, 14);
        const b0 = staggerVal(i, N, 8, 2);
        const w = seg(t, 0.56 + distC * 0.13, 0.74 + distC * 0.13);
        const pulse = Math.sin(w * Math.PI);
        const amp = lerp(1 - distC, 0.06, 0.42);
        return /* @__PURE__ */jsxs(React.Fragment, {
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              bottom: "22%",
              left: `${8 + i * 5.4}%`,
              width: "3.4%",
              height: hMax,
              borderRadius: 5,
              transformOrigin: "50% 100%",
              background: `linear-gradient(180deg,hsl(${hue},85%,66%),hsl(${hue},70%,42%))`,
              boxShadow: `0 0 12px hsla(${hue},85%,58%,.25)`,
              opacity: e,
              filter: `blur(${(1 - e) * b0}px) brightness(${1 + pulse * 0.55})`,
              transform: `translateY(${(1 - e) * y0}px) scaleY(${e * (1 + pulse * amp)})`
            }
          }), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              bottom: "17%",
              left: `${8 + i * 5.4 + 1.2}%`,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: `hsl(${hue},70%,55%)`,
              opacity: 0.35
            }
          })]
        }, i);
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "9%",
          transform: "translateX(-50%)",
          color: "#5b6480",
          fontSize: 10,
          letterSpacing: __scCopy("1.5px"),
          whiteSpace: "nowrap",
          opacity: 0.5 + 0.5 * seg(t, 0.04, 0.12)
        },
        children: t < 0.52 ? "scale: stagger([1, 0.35])  hue: stagger([200, 320])" : "pulse: stagger([.06, .42], { from: 'center' })"
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ValueStaggerGradient;
 return {component:template_entry_default,duration:VALUE_STAGGER_GRADIENT_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
