// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/svg-shape-morph/SvgShapeMorph.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/svg-shape-morph/SvgShapeMorph.tsx

var SVG_SHAPE_MORPH_DURATION = 156;
var CX = __scConfig("demos/ui-entrance/svg-shape-morph/SvgShapeMorph.tsx#CX", "CX", () => 240);
var CY = __scConfig("demos/ui-entrance/svg-shape-morph/SvgShapeMorph.tsx#CY", "CY", () => 138);
var N = __scConfig("demos/ui-entrance/svg-shape-morph/SvgShapeMorph.tsx#N", "N", () => 140);
var BASE = __scConfig("demos/ui-entrance/svg-shape-morph/SvgShapeMorph.tsx#BASE", "BASE", () => 76);
var rA = th => BASE * (1 + 0.3 * Math.cos(th * 3) + 0.05 * Math.sin(th * 7 + 0.8));
var rB = th => BASE * (1 + 0.26 * Math.sin(th * 5 + 1.2) + 0.06 * Math.cos(th * 2));
var RAD_A = __scConfig("demos/ui-entrance/svg-shape-morph/SvgShapeMorph.tsx#RAD_A", "RAD_A", () => []);
var RAD_B = __scConfig("demos/ui-entrance/svg-shape-morph/SvgShapeMorph.tsx#RAD_B", "RAD_B", () => []);
for (let i = 0; i < N; i++) {
  const th = i / N * Math.PI * 2;
  RAD_A.push(rA(th));
  RAD_B.push(rB(th));
}
var build = m => {
  let d = "";
  for (let i = 0; i < N; i++) {
    const th = i / N * Math.PI * 2;
    const r = lerp(m, RAD_A[i], RAD_B[i]);
    const x = (CX + Math.cos(th) * r).toFixed(1);
    const y = (CY + Math.sin(th) * r).toFixed(1);
    d += (i ? "L" : "M") + x + "," + y;
  }
  return d + "Z";
};
var SvgShapeMorph = () => {
  const t = useT();
  const m1 = seg(t, 0.08, 0.42, E.inOutCubic);
  const m2 = seg(t, 0.58, 0.92, E.inOutCubic);
  const m = m1 - m2;
  const d = build(m);
  const hue = lerp(m, 185, 305);
  const breath = 1 + 0.045 * (Math.sin(m1 * Math.PI) + Math.sin(m2 * Math.PI));
  const rot = Math.sin(t * Math.PI * 2) * 4;
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0a0b10",
    children: /* @__PURE__ */jsxs("svg", {
      viewBox: "0 0 480 270",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#0a0b10"
      },
      children: [/* @__PURE__ */jsxs("g", {
        transform: `translate(${CX},${CY}) scale(${breath}) rotate(${rot}) translate(${-CX},${-CY})`,
        children: [/* @__PURE__ */jsx2("path", {
          d,
          fill: `hsla(${hue},80%,58%,.14)`
        }), /* @__PURE__ */jsx2("path", {
          d,
          fill: "none",
          strokeWidth: 2,
          strokeLinejoin: "round",
          stroke: `hsl(${hue},90%,66%)`,
          style: {
            filter: `drop-shadow(0 0 8px hsla(${hue},90%,60%,.4))`
          }
        })]
      }), /* @__PURE__ */jsx2("text", {
        x: CX,
        y: 252,
        textAnchor: "middle",
        fill: "#5b6480",
        opacity: 0.4 + 0.6 * Math.abs(m - 0.5) * 2,
        style: {
          font: '10px "SF Mono",Menlo,monospace',
          letterSpacing: __scCopy("2px")
        },
        children: m > 0.5 ? "morphTo(shapeB)" : "morphTo(shapeA)"
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SvgShapeMorph;
 return {component:template_entry_default,duration:SVG_SHAPE_MORPH_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
