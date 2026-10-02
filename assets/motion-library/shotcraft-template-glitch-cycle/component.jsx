// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/glitch-cycle/GlitchCycle.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/glitch-cycle/GlitchCycle.tsx

var GLITCH_CYCLE_DURATION = 168;
var PHRASES = __scConfig("demos/typography/glitch-cycle/GlitchCycle.tsx#PHRASES", "PHRASES", () => [__scCopy("INITIALIZING"), __scCopy("LOADING ASSETS"), __scCopy("COMPILING SHADERS"), __scCopy("READY TO SHIP")]);
var POOL = __scConfig("demos/typography/glitch-cycle/GlitchCycle.tsx#POOL", "POOL", () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>/\\");
var KF = __scConfig("demos/typography/glitch-cycle/GlitchCycle.tsx#KF", "KF", () => [1, 0, 0, 0.1, 0, 0, 1]);
var KF_LAST = __scConfig("demos/typography/glitch-cycle/GlitchCycle.tsx#KF_LAST", "KF_LAST", () => [1, 0, 0, 0.1, 0, 0, 0]);
var MAXCH = __scConfig("demos/typography/glitch-cycle/GlitchCycle.tsx#MAXCH", "MAXCH", () => Math.max(...PHRASES.map(p => p.length)));
var glitchAt = (kf, p) => {
  const segs = kf.length - 1;
  const x = Math.min(segs - 1e-6, Math.max(0, p * segs));
  const i = Math.floor(x);
  return lerp(x - i, kf[i], kf[i + 1]);
};
var GlitchCycle = () => {
  const t = useT();
  const N = PHRASES.length;
  const slot = Math.min(N - 1, Math.floor(t * N));
  const p = t * N - slot;
  const text = PHRASES[slot];
  const g = glitchAt(slot === N - 1 ? KF_LAST : KF, p);
  const frame = Math.floor(t * 168);
  const bucket = Math.floor(frame / 2);
  const jx = (rand(bucket * 5 + slot) - 0.5) * g * 10;
  const jy = (rand(bucket * 9 + slot + 40) - 0.5) * g * 4;
  return /* @__PURE__ */jsxs(DesignStage, {
    bg: "#0a0b10",
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0b10"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          display: "flex",
          fontFamily: '"SF Mono",Menlo,monospace',
          fontSize: 26,
          letterSpacing: 3,
          color: "#dfe6f5",
          transform: `translate(${jx}px,${jy}px)`,
          textShadow: g > 0.04 ? `${g * 3}px 0 rgba(255,60,90,${g * 0.8}), ${-g * 3}px 0 rgba(60,220,255,${g * 0.8})` : "none"
        },
        children: Array.from({
          length: MAXCH
        }, (_, i) => {
          const ch = i < text.length ? text[i] : " ";
          let content = ch;
          let color;
          if (ch !== " ") {
            const hit = rand(i * 31 + bucket * 17 + slot * 97) < g;
            if (hit) {
              content = POOL[Math.floor(rand(i * 131 + bucket * 7 + slot * 13) * POOL.length)];
              color = rand(i + bucket) > 0.5 ? "#6c8cff" : "#4a5270";
            } else {
              color = "#dfe6f5";
            }
          }
          return /* @__PURE__ */jsx2("span", {
            style: {
              minWidth: __scCopy("0.66em"),
              textAlign: "center",
              color
            },
            children: content
          }, i);
        })
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "63%",
        width: 120,
        height: 2,
        marginLeft: -60,
        background: "#232840",
        borderRadius: 1,
        overflow: "hidden"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          height: "100%",
          width: `${t * 100}%`,
          background: "#6c8cff"
        }
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GlitchCycle;
 return {component:template_entry_default,duration:GLITCH_CYCLE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
