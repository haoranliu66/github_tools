// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/platform-hinge-rise/PlatformHingeRise.tsx
import { Easing, interpolate, useCurrentFrame as useCurrentFrame2 } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/platform-hinge-rise/PlatformHingeRise.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/platform-hinge-rise/PlatformHingeRise.tsx

var PLATFORM_HINGE_RISE_DURATION = 104;
var CLAMP = __scConfig("demos/ui-entrance/platform-hinge-rise/PlatformHingeRise.tsx#CLAMP", "CLAMP", () => ({
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
}));
var ease = (frame, start, end, from = 0, to = 1) => interpolate(frame, [start, Math.max(start + 1, end)], [from, to], {
  ...CLAMP,
  easing: Easing.bezier(0.16, 1, 0.3, 1)
});
var hingeEase = (frame, start, end) => interpolate(frame, [start, Math.max(start + 1, end)], [0, 1], {
  ...CLAMP,
  easing: Easing.bezier(0.4, 0, 0.2, 1)
});
var dampedWobble = (frame, start, duration, amplitude) => {
  if (frame <= start || frame >= start + duration) return 0;
  const p = (frame - start) / duration;
  return amplitude * Math.sin(p * Math.PI * 3) * Math.pow(1 - p, 2);
};
var SubjectPanel = ({
  side,
  progress,
  wobble
}) => {
  const isLeft = side === "left";
  const x = isLeft ? 165 : 249;
  const w = isLeft ? 92 : 78;
  const h = isLeft ? 72 : 59;
  const rise = isLeft ? 112 : 90;
  const startRotation = isLeft ? -18 : 18;
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: x,
      top: 108,
      width: w,
      height: h,
      clipPath: "polygon(8% 10%,92% 0,100% 100%,0 100%)",
      background: isLeft ? "#5f6064" : "#77787c",
      boxShadow: "0 10px 22px rgba(0,0,0,.12)",
      transformOrigin: isLeft ? "100% 100%" : "0% 100%",
      transform: `translateY(${interpolate(progress, [0, 1], [rise, 0])}px) rotate(${interpolate(progress, [0, 1], [startRotation, 0]) + wobble}deg)`,
      display: "grid",
      placeItems: "center",
      color: "#f7f7f5",
      fontFamily: "Arial, sans-serif",
      fontSize: 10,
      fontWeight: 800,
      letterSpacing: 1
    },
    children: __scCopy("SUBJECT")
  });
};
var PlatformHingeRise = () => {
  const frame = useCurrentFrame2();
  const platform = ease(frame, 0, 15, 0.012, 1);
  const context = ease(frame, 12, 32);
  const left = hingeEase(frame, 14, 30);
  const right = hingeEase(frame, 14, 30);
  const conclusion = ease(frame, 52, 74);
  const leftWobble = dampedWobble(frame, 30, 16, 1.5);
  const rightWobble = dampedWobble(frame, 31, 16, -1.2);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#f4f4f1",
    raster: "zoom",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        fontFamily: "Arial, sans-serif"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 190,
          top: 65,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "#d2d2cf",
          opacity: context,
          transform: `translateY(${interpolate(context, [0, 1], [18, 0])}px) scale(${interpolate(context, [0, 1], [0.88, 1])})`,
          display: "grid",
          placeItems: __scCopy("start center"),
          paddingTop: 17,
          boxSizing: "border-box",
          color: "#77787a",
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: 0.8
        },
        children: __scCopy("CONTEXT")
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 149,
          top: 174,
          width: 182,
          height: 16,
          clipPath: "polygon(5% 0,95% 0,100% 100%,0 100%)",
          background: "#92928f",
          transformOrigin: "50% 50%",
          transform: `scaleX(${platform})`
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          inset: 0,
          clipPath: "inset(0 0 79px 0)"
        },
        children: [/* @__PURE__ */jsx2(SubjectPanel, {
          side: "left",
          progress: left,
          wobble: leftWobble
        }), /* @__PURE__ */jsx2(SubjectPanel, {
          side: "right",
          progress: right,
          wobble: rightWobble
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 108,
          top: 205,
          width: 264,
          height: 74,
          clipPath: "polygon(18% 0,82% 0,100% 100%,0 100%)",
          background: "#d9d9d6",
          opacity: interpolate(conclusion, [0, 0.18, 1], [0, 0.45, 1], CLAMP),
          transform: `translateY(${interpolate(conclusion, [0, 1], [96, 0])}px)`,
          display: "grid",
          placeItems: __scCopy("start center"),
          paddingTop: 19,
          boxSizing: "border-box",
          color: "#4f5053",
          fontSize: 20,
          fontWeight: 850,
          letterSpacing: 1.8
        },
        children: __scCopy("OUTCOME")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PlatformHingeRise;
 return {component:template_entry_default,duration:PLATFORM_HINGE_RISE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
