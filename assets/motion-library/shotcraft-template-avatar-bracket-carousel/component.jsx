// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/avatar-bracket-carousel/AvatarBracketCarousel.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/avatar-bracket-carousel/AvatarBracketCarousel.tsx

var AVATAR_BRACKET_CAROUSEL_DURATION = 156;
var ACCENT = __scConfig("demos/ui-entrance/avatar-bracket-carousel/AvatarBracketCarousel.tsx#ACCENT", "ACCENT", () => "#3b82f6");
var AV = __scConfig("demos/ui-entrance/avatar-bracket-carousel/AvatarBracketCarousel.tsx#AV", "AV", () => [{
  c: "#4a4d59",
  e: "\u{1F3A8}",
  role: __scCopy("Designer")
}, {
  c: "#5b6070",
  e: "\u{1F4AC}",
  role: __scCopy("Support")
}, {
  c: "#6d7383",
  e: "\u{1F4CA}",
  role: __scCopy("Analyst")
}, {
  c: "#828796",
  e: "\u270D\uFE0F",
  role: __scCopy("Writer")
}]);
var CORNERS = __scConfig("demos/ui-entrance/avatar-bracket-carousel/AvatarBracketCarousel.tsx#CORNERS", "CORNERS", () => [__scCopy("M4,26 L4,4 L26,4"), __scCopy("M66,4 L88,4 L88,26"), __scCopy("M88,66 L88,88 L66,88"), __scCopy("M26,88 L4,88 L4,66")]);
var STEP = __scConfig("demos/ui-entrance/avatar-bracket-carousel/AvatarBracketCarousel.tsx#STEP", "STEP", () => 76);
var SWITCHES = __scConfig("demos/ui-entrance/avatar-bracket-carousel/AvatarBracketCarousel.tsx#SWITCHES", "SWITCHES", () => [0.24, 0.46, 0.68]);
var AvatarBracketCarousel = () => {
  const t = useT();
  let pos = 0;
  SWITCHES.forEach(s0 => {
    pos += seg(t, s0, s0 + 0.14, k => E.spring(k, 0.25));
  });
  let breath = 0;
  SWITCHES.forEach(s0 => {
    breath += Math.sin(seg(t, s0, s0 + 0.1) * Math.PI);
  });
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0b0c12",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#0b0c12",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        fontFamily: "-apple-system,system-ui,sans-serif"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          color: "#eef1f8",
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: -0.5
        },
        children: __scCopy("Your")
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "relative",
          width: 92,
          height: 92,
          flex: "none"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 0,
            height: 0
          },
          children: AV.map((a, k) => {
            const d = Math.abs(k - pos);
            const sc = Math.max(0.5, 1 - d * 0.38);
            const op = Math.max(0, 1 - d * 0.62);
            return /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: -29,
                top: -29,
                width: 58,
                height: 58,
                borderRadius: "50%",
                background: a.c,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                boxShadow: "0 6px 18px rgba(0,0,0,.4)",
                transform: `translateY(${(k - pos) * STEP}px) scale(${sc})`,
                opacity: op * seg(t, 0.02 + k * 0.03, 0.12 + k * 0.03),
                filter: `blur(${Math.min(3, d * 2.4)}px)`
              },
              children: a.e
            }, k);
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 0,
            zIndex: 3,
            transform: `scale(${1 + Math.min(1, breath) * 0.07})`
          },
          children: /* @__PURE__ */jsx2("svg", {
            width: 92,
            height: 92,
            viewBox: "0 0 92 92",
            children: CORNERS.map((d, i) => /* @__PURE__ */jsx2("path", {
              d,
              fill: "none",
              stroke: ACCENT,
              strokeWidth: 4,
              strokeLinecap: "round"
            }, i))
          })
        }), AV.map((a, k) => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%,64px)",
            color: "#8f97b3",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 1,
            opacity: Math.max(0, 1 - Math.abs(k - pos) * 2.2)
          },
          children: a.role
        }, k))]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          color: "#eef1f8",
          fontWeight: 800,
          fontSize: 34,
          letterSpacing: -0.5
        },
        children: __scCopy("teammates")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AvatarBracketCarousel;
 return {component:template_entry_default,duration:AVATAR_BRACKET_CAROUSEL_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
