// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/word-relay-geometry/WordRelayGeometry.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/word-relay-geometry/WordRelayGeometry.tsx

var WORD_RELAY_GEOMETRY_DURATION = 180;
var CIRC_R = __scConfig("demos/typography/word-relay-geometry/WordRelayGeometry.tsx#CIRC_R", "CIRC_R", () => 78);
var PARTS = __scConfig("demos/typography/word-relay-geometry/WordRelayGeometry.tsx#PARTS", "PARTS", () => Array.from({
  length: 20
}, (_, i) => ({
  size: 1 + rand(i * 3) * 1.4,
  x: rand(i) * 100,
  ph: rand(i + 40),
  sp: 0.5 + rand(i + 80) * 0.8
})));
var SLOTS = __scConfig("demos/typography/word-relay-geometry/WordRelayGeometry.tsx#SLOTS", "SLOTS", () => [{
  label: __scCopy("Faster"),
  geom: [{
    x: 0,
    r: CIRC_R + 22,
    dash: true
  }],
  t0: 0,
  t1: 0.36
}, {
  label: __scCopy("Better"),
  geom: [{
    x: -110,
    r: 62,
    d: 0
  }, {
    x: 0,
    r: 62,
    d: 0.06
  }, {
    x: 110,
    r: 62,
    d: 0.12
  }],
  t0: 0.32,
  t1: 0.68
}, {
  label: __scCopy("Stronger"),
  geom: [],
  t0: 0.64,
  t1: 1
}]);
var WordRelayGeometry = () => {
  const t = useT();
  return /* @__PURE__ */jsxs(DesignStage, {
    bg: "#07080c",
    children: [PARTS.map((p, i) => {
      const y = (1 - (t * p.sp + p.ph) % 1) * 110 - 5;
      return /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          width: p.size,
          height: p.size,
          borderRadius: "50%",
          background: "#fff",
          left: `${p.x}%`,
          top: `${y}%`,
          opacity: 0.12 + 0.18 * Math.sin((t * 3 + p.ph) * Math.PI * 2) ** 2
        }
      }, i);
    }), SLOTS.map(({
      label,
      geom,
      t0,
      t1
    }, i) => {
      const isLast = i === SLOTS.length - 1;
      const tin = seg(t, t0, t0 + 0.07, E.outCubic);
      const tout = isLast ? 0 : seg(t, t1 - 0.05, t1, E.inQuad);
      const alive = tin > 0 && tout < 1;
      const fillp = seg(t, t0 + 0.06, t0 + 0.18, E.inOutCubic);
      const sh = seg(t, t0 + 0.05, t0 + 0.2, E.outQuad);
      const sweep = seg(t, t0 + 0.08, t0 + 0.26, E.inOutCubic);
      const white = seg(t, t0 + 0.27, t0 + 0.34, E.outQuad);
      return /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          inset: 0,
          opacity: alive ? tin * (1 - tout) : 0
        },
        children: [/* @__PURE__ */jsx2("svg", {
          viewBox: "-240 -135 480 270",
          style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%"
          },
          children: geom.map((g, k) => {
            if (g.dash) {
              const grow = seg(t, t0 + 0.01, t0 + 0.14, E.outCubic);
              return /* @__PURE__ */jsx2("circle", {
                cx: g.x,
                cy: 0,
                r: g.r,
                fill: "none",
                stroke: "#565e78",
                strokeWidth: 1.1,
                strokeDasharray: "5 7",
                opacity: grow * (1 - tout),
                transform: `rotate(${-90 + t * 30}) scale(${lerp(grow, 0.4, 1)})`
              }, k);
            }
            const trim = seg(t, t0 + 0.02 + (g.d || 0), t0 + 0.14 + (g.d || 0), E.outCubic) - seg(t, t1 - 0.06, t1, E.inQuad) * (isLast ? 0 : 1);
            return /* @__PURE__ */jsx2("circle", {
              cx: g.x,
              cy: 0,
              r: g.r,
              fill: "none",
              stroke: "#565e78",
              strokeWidth: 1.1,
              pathLength: 1,
              strokeDasharray: "1",
              strokeDashoffset: 1 - Math.max(0, trim),
              transform: "rotate(-90)"
            }, k);
          })
        }), /* @__PURE__ */jsxs("div", {
          style: {
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%,-52%) scale(${lerp(tout, 1, 0.86)})`,
            fontFamily: '-apple-system,"Helvetica Neue",sans-serif',
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              color: "transparent",
              WebkitTextStroke: "1px #6a7186",
              opacity: isLast ? 1 - sh : 1 - fillp * 0.75
            },
            children: label
          }), isLast ? /* @__PURE__ */jsxs(Fragment, {
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                inset: 0,
                color: "#fff",
                opacity: white,
                textShadow: `0 0 ${white * 18}px rgba(255,255,255,.3)`
              },
              children: label
            }), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                inset: 0,
                color: "transparent",
                backgroundImage: "linear-gradient(100deg,#585f72 0%,#8d95aa 38%,#ffffff 50%,#8d95aa 62%,#585f72 100%)",
                backgroundSize: "280% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                opacity: sh * (1 - white),
                backgroundPosition: `${lerp(sweep, 100, 0)}% 0`
              },
              children: label
            })]
          }) : /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              inset: 0,
              color: "#fff",
              clipPath: `inset(-20% ${(1 - fillp) * 100}% -20% 0)`
            },
            children: label
          })]
        })]
      }, label);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = WordRelayGeometry;
 return {component:template_entry_default,duration:WORD_RELAY_GEOMETRY_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
