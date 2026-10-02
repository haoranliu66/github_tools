// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/gradient-transition/GradientTransition.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/gradient-transition/GradientTransition.tsx

var GRADIENT_TRANSITION_DURATION = 180;
var hsl = (h, s, l) => `hsl(${h},${s}%,${l}%)`;
var mixH = (a, b, k) => [lerp(k, a[0], b[0]), lerp(k, a[1], b[1]), lerp(k, a[2], b[2])];
var layerStyle = (background, opacity) => ({
  position: "absolute",
  inset: 0,
  background,
  opacity
});
var GradientTransition = () => {
  const t = useT();
  const p1 = seg(t, 0, 0.4, E.inOutQuad);
  const ang = lerp(p1, 40, 230);
  const l1c1 = mixH([340, 88, 60], [160, 78, 52], p1);
  const l1c2 = mixH([265, 80, 52], [205, 92, 58], p1);
  const bg1 = `linear-gradient(${ang}deg, ${hsl(...l1c1)}, ${hsl(...l1c2)})`;
  const p2 = seg(t, 0.33, 0.7, E.inOutQuad);
  const cx = lerp(p2, 28, 72),
    cy = lerp(p2, 66, 32),
    rr = lerp(p2, 45, 85);
  const l2c1 = mixH([45, 95, 62], [285, 85, 58], p2);
  const l2c2 = mixH([220, 60, 14], [230, 55, 10], p2);
  const bg2 = `radial-gradient(circle ${rr}% at ${cx}% ${cy}%, ${hsl(...l2c1)}, ${hsl(...l2c2)})`;
  const p3 = seg(t, 0.66, 1, E.inOutQuad);
  const from = p3 * 300;
  const bg3 = `conic-gradient(from ${from}deg at 50% 50%,
    hsl(0,85%,60%), hsl(60,85%,60%), hsl(120,75%,55%), hsl(180,80%,55%),
    hsl(240,85%,62%), hsl(300,85%,60%), hsl(0,85%,60%))`;
  return /* @__PURE__ */jsxs(DesignStage, {
    bg: "#0a0b10",
    children: [/* @__PURE__ */jsx2("div", {
      style: layerStyle(bg1, 1 - seg(t, 0.3, 0.38))
    }), /* @__PURE__ */jsx2("div", {
      style: layerStyle(bg2, seg(t, 0.3, 0.38) - seg(t, 0.63, 0.71))
    }), /* @__PURE__ */jsx2("div", {
      style: layerStyle(bg3, seg(t, 0.63, 0.71))
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        padding: __scCopy("6px 18px"),
        borderRadius: 999,
        background: "rgba(8,9,14,.55)",
        color: "#fff",
        fontFamily: "-apple-system,system-ui,sans-serif",
        fontSize: 13,
        letterSpacing: 4,
        fontWeight: 700,
        backdropFilter: "blur(4px)"
      },
      children: t < 0.34 ? __scCopy("LINEAR") : t < 0.67 ? __scCopy("RADIAL") : __scCopy("CONIC")
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GradientTransition;
 return {component:template_entry_default,duration:GRADIENT_TRANSITION_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
