// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx
import { useLayoutEffect, useRef, useState } from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx

var GLASS_PILL_DICTATION_TYPING_DURATION = 50;
var ACCENT_RGB = __scConfig("demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx#ACCENT_RGB", "ACCENT_RGB", () => "146,126,212");
var UI = __scConfig("demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx#UI", "UI", () => '-apple-system,system-ui,"Segoe UI",sans-serif');
var PH = __scConfig("demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx#PH", "PH", () => 46);
var ICON = __scConfig("demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx#ICON", "ICON", () => 30);
var BASE = __scConfig("demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx#BASE", "BASE", () => [13, 7, 10, 6, 9]);
var TEXT = __scConfig("demos/interaction/glass-pill-dictation-typing/GlassPillDictationTyping.tsx#TEXT", "TEXT", () => __scCopy("Speak or type here"));
var GlassPillDictationTyping = () => {
  const t = useT();
  const measRef = useRef(null);
  const [textW, setTextW] = useState(180);
  useLayoutEffect(() => {
    if (measRef.current) setTextW(measRef.current.offsetWidth);
  }, []);
  const PW = Math.round(textW + 168);
  const s = lerp(seg(t, 0, 0.22, E.outCubic), 1.25, 1);
  const n = Math.floor(seg(t, 0.06, 0.73) * TEXT.length + 1e-6);
  const caretO = seg(t, 0.025, 0.045) * (1 - seg(t, 0.75, 0.8));
  const g = 1 - seg(t, 0.08, 0.76, E.inOutQuad);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#000",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#000",
        overflow: "hidden",
        // 暗部校色：原样片 x264 把外泛光的暗尾（1~2 级灰）压成纯 0，本渲染的
        // 泛光尾巴因此比样片亮一档、拖得更远。contrast(1.008) 等价于黑端减 ~1 级
        // （255*0.008/2≈1）、中间调不动，按对照帧实测校准（f1 0.9205→0.9844）。
        filter: "contrast(1.008)"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 0,
          top: (270 - PH) / 2,
          height: PH,
          width: PW,
          borderRadius: PH / 2,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          padding: __scCopy("0 8px 0 16px"),
          overflow: "hidden",
          background: "#0d0d13",
          willChange: "transform,opacity",
          opacity: seg(t, 0, 0.025),
          transform: `translateX(${(480 - PW) / 2}px) scale(${s})`,
          boxShadow: `inset 0 0 0 1px rgba(255,255,255,${0.16 + 0.1 * g}), inset 0 14px 22px rgba(255,255,255,${0.03 + 0.04 * g}), 0 0 ${26 * g}px rgba(${ACCENT_RGB},${0.28 * g})`
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: g,
            background: `linear-gradient(90deg,rgba(${ACCENT_RGB},0) 0%,rgba(${ACCENT_RGB},.35) 42%,rgba(${ACCENT_RGB},.95) 100%)`
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "relative",
            font: `400 21px ${UI}`,
            color: "#f4f4f5",
            whiteSpace: "pre",
            letterSpacing: 0.3,
            flex: "none"
          },
          children: TEXT.slice(0, n)
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "relative",
            width: 2,
            height: 23,
            borderRadius: 1,
            background: "#eaeaec",
            marginLeft: 2,
            flex: "none",
            opacity: caretO
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "relative",
            marginLeft: "auto",
            width: ICON,
            height: ICON,
            borderRadius: 9,
            boxSizing: "border-box",
            border: "1.5px solid rgba(255,255,255,.5)",
            background: "rgba(255,255,255,.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none"
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 2.2,
              height: "100%"
            },
            children: BASE.map((h, i) => /* @__PURE__ */jsx2("div", {
              style: {
                width: 1.5,
                borderRadius: 1.5,
                background: "#ececee",
                height: h + 1.6 * Math.sin(t * 18 + i * 1.7)
              }
            }, i))
          })
        })]
      }), /* @__PURE__ */jsx2("div", {
        ref: measRef,
        style: {
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          font: `400 21px ${UI}`,
          letterSpacing: 0.3,
          top: -999
        },
        children: TEXT
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GlassPillDictationTyping;
 return {component:template_entry_default,duration:GLASS_PILL_DICTATION_TYPING_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
