// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx

var AURORA_BLOOM_BG_FLIP_DURATION = 156;
var mix = (a, b, k) => `rgb(${Math.round(a[0] + (b[0] - a[0]) * k)},${Math.round(a[1] + (b[1] - a[1]) * k)},${Math.round(a[2] + (b[2] - a[2]) * k)})`;
var DEEPP = __scConfig("demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx#DEEPP", "DEEPP", () => [124, 92, 255]);
var WHITE = __scConfig("demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx#WHITE", "WHITE", () => [245, 245, 250]);
var LIGHT = __scConfig("demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx#LIGHT", "LIGHT", () => [236, 236, 236]);
var DARK = __scConfig("demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx#DARK", "DARK", () => [10, 10, 18]);
var WA = __scConfig("demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx#WA", "WA", () => __scCopy("For many years").split(" "));
var WB = __scConfig("demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx#WB", "WB", () => __scCopy("everything changed").split(" "));
var FONT = __scConfig("demos/effects/aurora-bloom-bg-flip/AuroraBloomBgFlip.tsx#FONT", "FONT", () => "600 26px -apple-system,system-ui,sans-serif");
var AuroraBloomBgFlip = () => {
  const t = useT();
  const rise = seg(t, 0.04, 0.62, E.outCubic);
  const flip = seg(t, 0.63, 0.7, E.inOutQuad);
  return /* @__PURE__ */jsxs(DesignStage, {
    bg: mix(LIGHT, DARK, flip),
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: "-10%",
        transform: `translateY(${lerp(rise, 32, -6)}%) scale(${lerp(rise, 1, 1.25)})`,
        opacity: lerp(flip, 1, 0.4)
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(60px)",
          left: "8%",
          bottom: "-45%",
          width: "90%",
          height: "85%",
          background: "radial-gradient(circle,rgba(107,79,224,.85) 0%,rgba(107,79,224,0) 68%)"
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(60px)",
          left: "32%",
          bottom: "-32%",
          width: "44%",
          height: "46%",
          background: "radial-gradient(circle,rgba(217,122,74,.9) 0%,rgba(217,122,74,0) 66%)",
          transform: `translateX(${Math.sin(t * Math.PI * 2.2) * 8}%)`
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          borderRadius: "50%",
          filter: "blur(60px)",
          left: "-12%",
          bottom: "-40%",
          width: "64%",
          height: "60%",
          background: "radial-gradient(circle,rgba(255,255,255,.8) 0%,rgba(255,255,255,0) 62%)",
          opacity: 1 - flip
        }
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        font: FONT
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute"
        },
        children: WA.map((w, i) => {
          const out = seg(t, 0.46 + i * 0.04, 0.56 + i * 0.04, E.inQuad);
          return /* @__PURE__ */jsx2("span", {
            style: {
              display: "inline-block",
              margin: __scCopy("0 .18em"),
              color: "#1a1a1a",
              opacity: 1 - out,
              filter: `blur(${out * 8}px)`
            },
            children: w
          }, i);
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute"
        },
        children: WB.map((w, i) => {
          const d0 = 0.76 + i * 0.06;
          const a = seg(t, d0, d0 + 0.11, E.outQuint);
          const c = seg(t, d0 + 0.1, d0 + 0.26, E.outQuad);
          return /* @__PURE__ */jsx2("span", {
            style: {
              display: "inline-block",
              margin: __scCopy("0 .18em"),
              opacity: a,
              filter: `blur(${(1 - a) * 8}px)`,
              color: mix(DEEPP, WHITE, c)
            },
            children: w
          }, i);
        })
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AuroraBloomBgFlip;
 return {component:template_entry_default,duration:AURORA_BLOOM_BG_FLIP_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
