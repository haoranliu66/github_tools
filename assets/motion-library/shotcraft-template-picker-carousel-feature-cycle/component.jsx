// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx

var PICKER_CAROUSEL_FEATURE_CYCLE_DURATION = 108;
var PAPER = __scConfig("demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx#PAPER", "PAPER", () => "#F3F3F1");
var INK = __scConfig("demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx#INK", "INK", () => "#111113");
var MID = __scConfig("demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx#MID", "MID", () => "#8A8A8F");
var ROW_H = __scConfig("demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx#ROW_H", "ROW_H", () => 34);
var ITEMS = __scConfig("demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx#ITEMS", "ITEMS", () => [__scCopy("Data Cleanup"), __scCopy("Direct Message"), __scCopy("Smart Segments"), __scCopy("Batch Actions"), __scCopy("Reward Program"), __scCopy("Automated Flows"), __scCopy("Variant Testing")]);
var ICONS = __scConfig("demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx#ICONS", "ICONS", () => ["\u25CE", "\u2709", "\u25E7", "\u25C8", "\u2605", "\u21BA", "\u2691"]);
var STEPS = __scConfig("demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx#STEPS", "STEPS", () => 5);
var HOLD = __scConfig("demos/interaction/picker-carousel-feature-cycle/PickerCarouselFeatureCycle.tsx#HOLD", "HOLD", () => 5 / 14);
var PickerCarouselFeatureCycle = () => {
  const t = useT();
  const g = seg(t, 0.05, 0.95) * STEPS;
  const step = Math.min(STEPS - 1, Math.floor(g));
  const local = Math.min(1, g - step);
  const mv = E.outQuint(Math.min(1, local / (1 - HOLD)));
  const pos = step + mv;
  const land = Math.max(0, (local - (1 - HOLD)) / HOLD);
  const breath = land > 0 ? Math.sin(Math.min(1, land / 0.6) * Math.PI) * 0.06 : 0;
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: PAPER,
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: PAPER,
        fontFamily: "-apple-system,'Helvetica Neue',Helvetica,Arial,sans-serif"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 300,
          height: ROW_H * 5,
          transform: "translate(-50%,-50%)",
          overflow: "hidden",
          opacity: seg(t, 0, 0.05)
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: ROW_H * 2,
            height: ROW_H,
            boxSizing: "content-box",
            borderRadius: 999,
            background: "#fff",
            border: "1px solid #E3E3E6",
            boxShadow: "0 2px 8px rgba(0,0,0,.06)",
            transform: `scaleY(${1 + breath})`
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            transform: `translateY(${ROW_H * 2 - pos * ROW_H}px)`
          },
          children: ITEMS.map((txt, i) => {
            const d = Math.abs(i - pos);
            const k2 = Math.min(2, d);
            const o = k2 <= 1 ? lerp(k2, 1, 0.55) : lerp(k2 - 1, 0.55, 0.18);
            return /* @__PURE__ */jsxs("div", {
              style: {
                height: ROW_H,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontWeight: 600,
                fontSize: lerp(Math.min(1, d / 2), 17, 14),
                lineHeight: 1,
                fontFamily: "-apple-system,'Helvetica Neue',sans-serif",
                color: d < 0.5 ? INK : d < 1.5 ? MID : "#B9B9BE",
                opacity: o
              },
              children: [/* @__PURE__ */jsx2("span", {
                style: {
                  fontSize: 14,
                  opacity: Math.max(0, 1 - d * 1.6)
                },
                children: ICONS[i]
              }), /* @__PURE__ */jsx2("span", {
                children: txt
              })]
            }, i);
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `linear-gradient(180deg,${PAPER} 0%,rgba(243,243,241,0) 26%,rgba(243,243,241,0) 74%,${PAPER} 100%)`
          }
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          margin: __scCopy("-11px 0 0 -186px"),
          width: 26,
          height: 22,
          borderRadius: 6,
          background: INK,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 10,
          lineHeight: 1,
          fontFamily: "-apple-system,sans-serif",
          letterSpacing: 0.5,
          opacity: seg(t, 0.02, 0.09)
        },
        children: __scCopy("AI")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PickerCarouselFeatureCycle;
 return {component:template_entry_default,duration:PICKER_CAROUSEL_FEATURE_CYCLE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
