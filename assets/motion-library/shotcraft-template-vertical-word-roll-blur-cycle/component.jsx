// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx

var VERTICAL_WORD_ROLL_BLUR_CYCLE_DURATION = 150;
var ROW = __scConfig("demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx#ROW", "ROW", () => 44);
var WORDS = __scConfig("demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx#WORDS", "WORDS", () => [__scCopy("Apps"), __scCopy("Teams"), __scCopy("Data"), __scCopy("Everyone")]);
var STEPS = __scConfig("demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx#STEPS", "STEPS", () => [0.16, 0.36, 0.56]);
var ACCENT = __scConfig("demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx#ACCENT", "ACCENT", () => "#4B4BF5");
var ACCENT_DIM = __scConfig("demos/typography/vertical-word-roll-blur-cycle/VerticalWordRollBlurCycle.tsx#ACCENT_DIM", "ACCENT_DIM", () => "#B9B9BE");
var clamp01 = v => Math.max(0, Math.min(1, v));
var mixHex = (a, b, k) => {
  k = clamp01(k);
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * k));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
};
var VerticalWordRollBlurCycle = () => {
  const t = useT();
  let p = 0;
  for (const s of STEPS) {
    const u = seg(t, s, s + 0.11);
    p += 0.7 * E.outQuint(u) + 0.3 * E.outBack(u);
  }
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#F7F7FA",
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system,system-ui,sans-serif"
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 14,
          // 结束整组淡出
          opacity: 1 - seg(t, 0.9, 0.985) * 0.999
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 30,
            fontWeight: 800,
            color: "#0B0B0C",
            letterSpacing: -0.5
          },
          children: __scCopy("Built for")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "relative",
            height: ROW * 3,
            width: 190,
            overflow: "hidden"
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translateY(${ROW - p * ROW}px)`
            },
            children: WORDS.map((w, i) => {
              const d = Math.abs(i - p);
              const blur = d < 1 ? 3 * d : 3 + 2 * Math.min(d - 1, 1);
              const op = d < 1 ? 1 - 0.65 * d : Math.max(0.1, 0.35 - 0.23 * (d - 1));
              return /* @__PURE__ */jsx2("div", {
                style: {
                  height: ROW,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 30,
                  fontWeight: 800,
                  letterSpacing: -0.5,
                  filter: `blur(${blur.toFixed(2)}px)`,
                  opacity: op,
                  // 落定染色：中心词灰→强调色（d 越小越彩）
                  color: mixHex(ACCENT_DIM, ACCENT, clamp01(1 - d * 2.4))
                },
                children: w
              }, w);
            })
          })
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = VerticalWordRollBlurCycle;
 return {component:template_entry_default,duration:VERTICAL_WORD_ROLL_BLUR_CYCLE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
