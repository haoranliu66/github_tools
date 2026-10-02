// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/glow-flyline-moves/GlowOrbAmbient.tsx
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { jsx, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var h = n => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var W = __scConfig("demos/effects/glow-flyline-moves/GlowOrbAmbient.tsx#W", "W", () => 1920);
var H = __scConfig("demos/effects/glow-flyline-moves/GlowOrbAmbient.tsx#H", "H", () => 1080);
var CX = __scConfig("demos/effects/glow-flyline-moves/GlowOrbAmbient.tsx#CX", "CX", () => W / 2);
var CY = __scConfig("demos/effects/glow-flyline-moves/GlowOrbAmbient.tsx#CY", "CY", () => H / 2);
var ORBS = __scConfig("demos/effects/glow-flyline-moves/GlowOrbAmbient.tsx#ORBS", "ORBS", () => [{
  size: 680,
  peak: 0.32,
  bx: 600,
  by: 400,
  p1: 96,
  p2: 134,
  ax1: 170,
  ax2: 115,
  ay1: 160,
  ay2: 120,
  seed: 1
}, {
  size: 580,
  peak: 0.22,
  bx: 1360,
  by: 560,
  p1: 110,
  p2: 92,
  ax1: 160,
  ax2: 120,
  ay1: 175,
  ay2: 105,
  seed: 2
}, {
  size: 500,
  peak: 0.18,
  bx: 940,
  by: 860,
  p1: 128,
  p2: 98,
  ax1: 150,
  ax2: 125,
  ay1: 145,
  ay2: 118,
  seed: 3
}]);
var TAU = __scConfig("demos/effects/glow-flyline-moves/GlowOrbAmbient.tsx#TAU", "TAU", () => Math.PI * 2);
var orbPos = (o, t) => {
  const f1 = h(o.seed * 7 + 1) * TAU;
  const f2 = h(o.seed * 7 + 2) * TAU;
  const f3 = h(o.seed * 7 + 3) * TAU;
  const f4 = h(o.seed * 7 + 4) * TAU;
  const x = o.bx + o.ax1 * Math.sin(TAU * t / o.p1 + f1) + o.ax2 * Math.sin(TAU * t / o.p2 + f2);
  const y = o.by + o.ay1 * Math.sin(TAU * t / o.p2 + f3) + o.ay2 * Math.sin(TAU * t / o.p1 + f4);
  return {
    x,
    y
  };
};
var GlowOrbAmbient = () => {
  const f = useCurrentFrame();
  const t = f <= 90 ? f : 90 + interpolate(f, [90, 120], [0, 18], {
    easing: Easing.out(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const fadeIn = interpolate(f, [0, 20], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const positions = ORBS.map(o => orbPos(o, t));
  let glow = 0;
  ORBS.forEach((o, i) => {
    const d = Math.hypot(positions[i].x - CX, positions[i].y - CY);
    const p = interpolate(d, [180, 720], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    glow = Math.max(glow, p * (o.peak / 0.32));
  });
  const shadowBlur = 28 * glow;
  const shadowSpread = 10 * glow;
  const shadowAlpha = 0.25 * glow;
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#1d1d1b",
      overflow: "hidden"
    },
    children: [ORBS.map((o, i) => /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: positions[i].x - o.size / 2,
        top: positions[i].y - o.size / 2,
        width: o.size,
        height: o.size,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(232,232,228,${o.peak}) 0%, rgba(232,232,228,${o.peak * 0.5}) 42%, rgba(232,232,228,0) 70%)`,
        filter: "blur(100px)",
        opacity: fadeIn
      }
    }, i)), /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: CX - 280,
        top: CY - 165,
        width: 560,
        height: 330,
        boxSizing: "border-box",
        background: "#262624",
        border: "1.5px solid #6a6a68",
        borderRadius: 16,
        boxShadow: `0 0 ${shadowBlur}px ${shadowSpread}px rgba(255,255,255,${shadowAlpha})`,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 16
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          height: 18,
          width: "55%",
          background: "#4a4a48",
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 11,
          width: "82%",
          background: "#3a3a38",
          borderRadius: 6
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 11,
          width: "68%",
          background: "#3a3a38",
          borderRadius: 6
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          marginTop: "auto",
          display: "flex",
          gap: 10,
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 28,
            height: 28,
            borderRadius: 14,
            background: "#4a4a48"
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            height: 11,
            width: 90,
            background: "#3a3a38",
            borderRadius: 6
          }
        })]
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GlowOrbAmbient;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
