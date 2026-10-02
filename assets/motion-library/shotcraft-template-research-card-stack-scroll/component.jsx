// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx

var RESEARCH_CARD_STACK_SCROLL_DURATION = 144;
var ORANGE = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#ORANGE", "ORANGE", () => "#FF6A1F");
var ORANGE_SOFT = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#ORANGE_SOFT", "ORANGE_SOFT", () => "#FF8A44");
var INK = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#INK", "INK", () => "#1A1A1A");
var FONT = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#FONT", "FONT", () => '-apple-system,system-ui,"SF Pro Text","PingFang SC",sans-serif');
var W = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#W", "W", () => 480);
var H = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#H", "H", () => 270);
var F = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#F", "F", () => 144);
var PER = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#PER", "PER", () => 12);
var GAP = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#GAP", "GAP", () => 30);
var XOFF = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#XOFF", "XOFF", () => 9);
var LW = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#LW", "LW", () => 420);
var LH = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#LH", "LH", () => 250);
var S = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#S", "S", () => Math.min(W / LW, H / LH));
var TITLES = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#TITLES", "TITLES", () => [__scCopy("Sparse Attention Mechanisms for Long-Context Reasoning"), __scCopy("Retrieval Drift in Multi-Hop Agent Pipelines"), __scCopy("Latent Caching Reduces Tool-Call Latency by 41%"), __scCopy("On the Calibration of Preference Reward Models"), __scCopy("Grid-Aligned Motion Priors for UI Animation"), __scCopy("Cheap Verifiers Beat Expensive Samplers"), __scCopy("Structured Decoding Without Grammar Loss"), __scCopy("Depth-Ordered Compositing for Live Interfaces"), __scCopy("Token-Budget Routing in Agent Fleets"), __scCopy("Contrastive Layouts for Document Understanding"), __scCopy("Fast Approximate Re-Ranking at Query Time"), __scCopy("Signal Propagation in Deep Residual Agents"), __scCopy("A Note on Deterministic Replay of Motion")]);
var CW = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#CW", "CW", () => 296);
var CH = __scConfig("demos/ui-entrance/research-card-stack-scroll/ResearchCardStackScroll.tsx#CH", "CH", () => 96);
var ResearchCardStackScroll = () => {
  const t = useT();
  const f = t * F;
  const focus = Math.floor(f / PER);
  return /* @__PURE__ */jsxs(DesignStage, {
    bg: "#FAFAFA",
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: -40,
        backgroundImage: "linear-gradient(rgba(0,0,0,.055) 1px,transparent 1px)",
        backgroundSize: __scCopy("100% 24px"),
        transform: `translateY(${f / PER * GAP * S % 24}px)`
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        transformOrigin: "0 0",
        transform: `scale(${S})`
      },
      children: TITLES.map((tt, i) => {
        const e = f - i * PER;
        const p = seg(Math.max(0, Math.min(1, (e + 6) / 6)), 0, 1, E.outCubic);
        const drift = Math.max(0, e) / PER * GAP;
        const squash = e >= 0 && e < 1.6 ? 0.97 : 1;
        const y = lerp(p, -40, 0) + drift;
        const x = Math.max(0, e) / PER * XOFF;
        const depth = Math.min(1, drift / (GAP * 3));
        const opacity = e < -6 ? 0 : Math.min(1, (e + 6) / 2) * (1 - Math.max(0, (drift - GAP * 3.2) / (GAP * 1.6)));
        return /* @__PURE__ */jsxs("div", {
          style: {
            position: "absolute",
            left: -CW / 2,
            top: -CH / 2 - 14,
            width: CW,
            height: CH,
            background: INK,
            borderRadius: 11,
            overflow: "hidden",
            fontFamily: FONT,
            zIndex: i,
            opacity,
            boxShadow: "0 14px 34px rgba(0,0,0,.22)",
            border: "1px solid #2A2A2A",
            boxSizing: "border-box",
            transform: `translate(${x}px,${y}px) scale(${lerp(p, 0.94, 1)},${lerp(p, 0.94, 1) * squash})`,
            filter: `blur(${(depth * 4).toFixed(2)}px) brightness(${(1 - depth * 0.25).toFixed(3)})`
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: 3,
              height: "100%",
              background: i % 4 === 1 ? ORANGE : "#2E2E2E"
            }
          }), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 14,
              top: 11,
              width: 264,
              font: `650 9.5px/1.35 ${FONT}`,
              color: "#F0F0F0"
            },
            children: tt
          }), /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: 14,
              top: 40,
              width: 266,
              opacity: i === focus ? 1 : 0
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                font: `500 8px/1 ${FONT}`,
                color: ORANGE_SOFT,
                letterSpacing: ".3px"
              },
              children: `A. Author, B. Writer, C. Reader \xB7 preprint:24${10 + i}.0${i % 9}${i % 7}`
            }), [0, 1, 2, 3].map(k => /* @__PURE__ */jsx2("div", {
              style: {
                marginTop: k ? 5 : 9,
                width: `${100 - k * 11 - rand(i * 5 + k) * 12}%`,
                height: 4,
                borderRadius: 2,
                background: "#3A3A3A"
              }
            }, k))]
          })]
        }, i);
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ResearchCardStackScroll;
 return {component:template_entry_default,duration:RESEARCH_CARD_STACK_SCROLL_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
