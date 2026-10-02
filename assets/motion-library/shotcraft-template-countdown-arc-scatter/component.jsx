// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx

var COUNTDOWN_ARC_SCATTER_DURATION = 33;
var INK = __scConfig("demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx#INK", "INK", () => "#17181c");
var ACCENT_RGB = __scConfig("demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx#ACCENT_RGB", "ACCENT_RGB", () => [59, 130, 246]);
var R0 = __scConfig("demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx#R0", "R0", () => 150);
var SP = __scConfig("demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx#SP", "SP", () => 24);
var NUMS = __scConfig("demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx#NUMS", "NUMS", () => [45, 35, 28, 22, 17, 10, 5, 4, 3]);
var TARGET = __scConfig("demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx#TARGET", "TARGET", () => ({
  x: -148,
  y: -30
}));
var NUM_FONT = __scConfig("demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx#NUM_FONT", "NUM_FONT", () => ({
  color: INK,
  fontWeight: 600,
  fontSize: 40,
  letterSpacing: __scCopy("-0.5px"),
  whiteSpace: "nowrap"
}));
var WORDS = __scConfig("demos/typography/countdown-arc-scatter/CountdownArcScatter.tsx#WORDS", "WORDS", () => [{
  text: __scCopy("min"),
  mr: 11,
  win: [0.54, 0.68]
}, {
  text: __scCopy("to"),
  mr: 11,
  win: [0.62, 0.78]
}, {
  text: __scCopy("install"),
  mr: 0,
  win: [0.7, 0.9]
}]);
var mix = (k, a, b) => Math.round(lerp(k, a, b));
var CountdownArcScatter = () => {
  const t = useT();
  const rot = lerp(seg(t, 0, 0.52, E.outCubic), 96, 0);
  const hand = seg(t, 0.52, 0.7, E.inOutCubic);
  const out = seg(t, 0.5, 0.7, E.inQuad);
  const bl = seg(t, 0.84, 0.98);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#fff",
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#fff",
        overflow: "hidden",
        fontFamily: "-apple-system,system-ui,sans-serif"
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "58%",
          width: 0,
          height: 0
        },
        children: [NUMS.map((n, i) => {
          const is5 = n === 5;
          const pa = (i - 6) * SP + rot;
          const rad = pa * Math.PI / 180;
          let x = Math.sin(rad) * R0;
          let y = -Math.cos(rad) * R0;
          let rSelf = pa;
          let op = Math.max(0, Math.min(1, (70 - Math.abs(pa)) / 22));
          if (is5) {
            x = lerp(hand, x, TARGET.x);
            y = lerp(hand, y, TARGET.y);
            rSelf *= 1 - hand;
          } else {
            op *= 1 - out;
          }
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              ...NUM_FONT,
              opacity: op,
              transform: `translate(-50%,-50%) translate(${x}px,${y}px) rotate(${rSelf}deg)`,
              // "5" 不模糊；其余数字随淡出同步糊化
              filter: is5 ? void 0 : `blur(${out * 3}px)`
            },
            children: n
          }, i);
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            transform: `rotate(${rot * 0.35}deg)`
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: -1.5,
              top: -101,
              width: 3,
              height: 26,
              borderRadius: 2,
              background: INK,
              opacity: 1 - out
            }
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: -124,
            top: -30,
            transform: "translateY(-50%)",
            ...NUM_FONT
          },
          children: WORDS.map(({
            text,
            mr,
            win
          }, k) => {
            const p = seg(t, win[0], win[1], E.outCubic);
            const isLast = k === WORDS.length - 1;
            return /* @__PURE__ */jsx2("span", {
              style: {
                display: "inline-block",
                marginRight: mr || void 0,
                opacity: p,
                filter: `blur(${(1 - p) * 6}px)`,
                color: isLast ? `rgb(${mix(bl, 23, ACCENT_RGB[0])},${mix(bl, 24, ACCENT_RGB[1])},${mix(bl, 28, ACCENT_RGB[2])})` : void 0
              },
              children: text
            }, k);
          })
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CountdownArcScatter;
 return {component:template_entry_default,duration:COUNTDOWN_ARC_SCATTER_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
