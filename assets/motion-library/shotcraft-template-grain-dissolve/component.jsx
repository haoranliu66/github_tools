// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/outro/grain-dissolve/GrainDissolve.tsx
import { useId } from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/outro/grain-dissolve/GrainDissolve.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/outro/grain-dissolve/GrainDissolve.tsx

var GRAIN_DISSOLVE_DURATION = 60;
var BX = __scConfig("demos/outro/grain-dissolve/GrainDissolve.tsx#BX", "BX", () => 128);
var BY = __scConfig("demos/outro/grain-dissolve/GrainDissolve.tsx#BY", "BY", () => 148);
var BW = __scConfig("demos/outro/grain-dissolve/GrainDissolve.tsx#BW", "BW", () => 384);
var BH = __scConfig("demos/outro/grain-dissolve/GrainDissolve.tsx#BH", "BH", () => 62);
var HATCH_XS = __scConfig("demos/outro/grain-dissolve/GrainDissolve.tsx#HATCH_XS", "HATCH_XS", () => []);
for (let x = BX - BH; x < BX + BW; x += 34) HATCH_XS.push(x);
var Handle = ({
  x,
  y
}) => /* @__PURE__ */jsxs("g", {
  transform: `translate(${x - 5},${y - 5})`,
  fill: "#cfd2d8",
  children: [/* @__PURE__ */jsx2("rect", {
    width: 5,
    height: 5
  }), /* @__PURE__ */jsx2("rect", {
    x: 5,
    y: 5,
    width: 5,
    height: 5
  })]
});
var Corner = ({
  x,
  y,
  sx,
  sy
}) => /* @__PURE__ */jsxs(Fragment, {
  children: [/* @__PURE__ */jsx2("path", {
    d: `M${x + 14 * sx} ${y}H${x}V${y + 14 * sy}`,
    fill: "none",
    stroke: "#3a3a40",
    strokeWidth: 1.5
  }), /* @__PURE__ */jsx2("circle", {
    cx: x + 34 * sx,
    cy: y + 28 * sy,
    r: 1.6,
    fill: "#8b8d94"
  })]
});
var GrainDissolve = () => {
  const t = useT();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const fid = `gd-${uid}`;
  const cid = `gd-${uid}-clip`;
  const burst = seg(t, 0.13, 0.28, E.outCubic);
  const cond = seg(t, 0.6, 0.71, E.inOutCubic);
  const lock = seg(t, 0.68, 0.9, E.outCubic);
  const settle = seg(t, 0.88, 1, E.outCubic);
  const glow = burst * 0.3 + cond * 0.7 - settle * 0.45;
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0a0a0c",
    children: /* @__PURE__ */jsxs("svg", {
      viewBox: "0 0 640 360",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "#0a0a0c"
      },
      children: [/* @__PURE__ */jsx2("defs", {
        children: /* @__PURE__ */jsxs("filter", {
          id: fid,
          x: "-40%",
          y: "-150%",
          width: "180%",
          height: "400%",
          children: [/* @__PURE__ */jsx2("feTurbulence", {
            type: "fractalNoise",
            baseFrequency: 0.9 + burst * 0.4,
            numOctaves: 2,
            seed: Math.floor(t * 46),
            result: "n"
          }), /* @__PURE__ */jsx2("feDisplacementMap", {
            in: "SourceGraphic",
            in2: "n",
            scale: burst * 52 * (1 - lock),
            xChannelSelector: "R",
            yChannelSelector: "G",
            result: "d"
          }), /* @__PURE__ */jsx2("feGaussianBlur", {
            in: "d",
            stdDeviation: burst * 1.1 * (1 - lock)
          })]
        })
      }), /* @__PURE__ */jsxs("g", {
        children: [/* @__PURE__ */jsx2(Corner, {
          x: 88,
          y: 96,
          sx: 1,
          sy: 1
        }), /* @__PURE__ */jsx2(Corner, {
          x: 552,
          y: 96,
          sx: -1,
          sy: 1
        }), /* @__PURE__ */jsx2(Corner, {
          x: 88,
          y: 264,
          sx: 1,
          sy: -1
        }), /* @__PURE__ */jsx2(Corner, {
          x: 552,
          y: 264,
          sx: -1,
          sy: -1
        }), /* @__PURE__ */jsx2("line", {
          x1: 52,
          y1: 180,
          x2: 76,
          y2: 180,
          stroke: "#4a4a50",
          strokeWidth: 1.5,
          strokeDasharray: "4 3"
        }), /* @__PURE__ */jsx2("line", {
          x1: 564,
          y1: 180,
          x2: 588,
          y2: 180,
          stroke: "#4a4a50",
          strokeWidth: 1.5,
          strokeDasharray: "4 3"
        })]
      }), /* @__PURE__ */jsxs("g", {
        opacity: burst * (1 - seg(t, 0.55, 0.64)),
        children: [/* @__PURE__ */jsx2("clipPath", {
          id: cid,
          children: /* @__PURE__ */jsx2("rect", {
            x: BX,
            y: BY,
            width: BW,
            height: BH
          })
        }), /* @__PURE__ */jsx2("g", {
          clipPath: `url(#${cid})`,
          children: HATCH_XS.map(x => /* @__PURE__ */jsx2("line", {
            x1: x,
            y1: BY + BH,
            x2: x + BH,
            y2: BY,
            stroke: "#2c2c31",
            strokeWidth: 1
          }, x))
        }), /* @__PURE__ */jsx2("rect", {
          x: BX,
          y: BY,
          width: BW,
          height: BH,
          fill: "none",
          stroke: "#55565c",
          strokeWidth: 1
        }), /* @__PURE__ */jsx2(Handle, {
          x: BX,
          y: BY
        }), /* @__PURE__ */jsx2(Handle, {
          x: BX + BW,
          y: BY
        }), /* @__PURE__ */jsx2(Handle, {
          x: BX,
          y: BY + BH
        }), /* @__PURE__ */jsx2(Handle, {
          x: BX + BW,
          y: BY + BH
        })]
      }), /* @__PURE__ */jsxs("g", {
        style: {
          filter: `url(#${fid}) drop-shadow(0 0 ${4 + glow * 20}px rgba(255,255,255,${Math.max(0, glow) * 0.9}))`
        },
        children: [/* @__PURE__ */jsx2("text", {
          x: 320,
          y: 191,
          textAnchor: "middle",
          opacity: 1 - cond,
          style: {
            fill: "#eceef2",
            font: "500 33px Inter,'Helvetica Neue',system-ui,sans-serif",
            letterSpacing: __scCopy("2.5px")
          },
          children: "{ ACME. Now Live }"
        }), /* @__PURE__ */jsx2("text", {
          x: 320,
          y: 198,
          textAnchor: "middle",
          opacity: cond,
          style: {
            fill: "#fff",
            font: "800 54px Inter,'Helvetica Neue',system-ui,sans-serif",
            letterSpacing: __scCopy("4px")
          },
          children: __scCopy("ACME")
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GrainDissolve;
 return {component:template_entry_default,duration:GRAIN_DISSOLVE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
