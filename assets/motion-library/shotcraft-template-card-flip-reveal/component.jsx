// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/card-flip-reveal/CardFlipReveal.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/card-flip-reveal/CardFlipReveal.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var G = __scConfig("demos/_fixtures/Fixtures.tsx#G", "G", () => ({
  bg: "#ececea",
  panel: "#f7f7f6",
  line: "#dcdcda",
  bar: "#c2c2c0",
  ink: "#2f2f2f",
  mid: "#8f8f8d",
  card: "#ffffff",
  border: "#d8d8d6",
  side: "#3a3a3a",
  sideBar: "#5a5a58"
}));
var Card = ({
  w,
  h,
  seed = 0,
  style
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: w,
      height: h,
      background: G.card,
      border: `2px solid ${G.border}`,
      borderRadius: 14,
      padding: 18,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      ...style
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 16,
        width: `${titleW}%`,
        background: G.bar,
        borderRadius: 8
      }
    }), Array.from({
      length: lines
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: `${88 - i * 14 - seed % 5 * 3}%`,
        background: G.line,
        borderRadius: 5
      }
    }, i)), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 8,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 13,
          background: G.mid
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 10,
          width: 64,
          background: G.line,
          borderRadius: 5
        }
      })]
    })]
  });
};
var TitleBlock = ({
  text,
  size = 88
}) => /* @__PURE__ */jsx("div", {
  style: {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: 800,
    fontSize: size,
    color: G.ink,
    letterSpacing: -1
  },
  children: text
});

// implementation/video-shotcraft/full/stage/source/demos/transition/card-flip-reveal/CardFlipReveal.tsx

var CW = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#CW", "CW", () => 440);
var CH = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#CH", "CH", () => 300);
var GAP = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#GAP", "GAP", () => 60);
var X0 = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#X0", "X0", () => (1920 - (CW * 3 + GAP * 2)) / 2);
var Y = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#Y", "Y", () => (1080 - CH) / 2);
var FLIP_START = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#FLIP_START", "FLIP_START", () => 18);
var STAGGER = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#STAGGER", "STAGGER", () => 10);
var FLIP_DUR = 18;
var SETTLE = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#SETTLE", "SETTLE", () => 8);
var OVERSHOOT = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#OVERSHOOT", "OVERSHOOT", () => 12);
var RESULTS = __scConfig("demos/transition/card-flip-reveal/CardFlipReveal.tsx#RESULTS", "RESULTS", () => ["4.9\xD7", "\u221238%", "99.9%"]);
var angleAt = (f, i) => {
  const s = FLIP_START + i * STAGGER;
  if (f < s + FLIP_DUR) {
    return interpolate(f, [s, s + FLIP_DUR], [0, 180 + OVERSHOOT], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.55, 0, 0.3, 1)
    });
  }
  return interpolate(f, [s + FLIP_DUR, s + FLIP_DUR + SETTLE], [180 + OVERSHOOT, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.poly(5))
  });
};
var Sheen = ({
  angle
}) => {
  const pos = interpolate(angle, [35, 145], [-25, 115], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const op = Math.max(0, 1 - Math.abs(angle - 90) / 55);
  if (op <= 4e-3) return null;
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      inset: 0,
      borderRadius: 14,
      pointerEvents: "none",
      opacity: op,
      background: `linear-gradient(105deg, rgba(0,0,0,0) ${pos - 14}%, rgba(0,0,0,0.32) ${pos}%, rgba(0,0,0,0) ${pos + 14}%)`
    }
  });
};
var FlipCard = ({
  i,
  frame
}) => {
  const angle = angleAt(frame, i);
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: X0 + i * (CW + GAP),
      top: Y,
      width: CW,
      height: CH,
      perspective: 1200
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        transformStyle: "preserve-3d",
        transform: `rotateY(${angle}deg)`
      },
      children: [/* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden"
        },
        children: [/* @__PURE__ */jsx2(Card, {
          w: CW,
          h: CH,
          seed: i + 1
        }), /* @__PURE__ */jsx2(Sheen, {
          angle
        })]
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: G.card,
          border: `2px solid ${G.border}`,
          borderRadius: 14,
          boxSizing: "border-box",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: [/* @__PURE__ */jsx2("span", {
          style: {
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 96,
            color: G.ink,
            letterSpacing: -2
          },
          children: RESULTS[i]
        }), /* @__PURE__ */jsx2(Sheen, {
          angle
        })]
      })]
    })
  });
};
var CardFlipReveal = () => {
  const frame = useCurrentFrame();
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 120,
        top: 96
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("CARD FLIP REVEAL"),
        size: 54
      })
    }), [0, 1, 2].map(i => /* @__PURE__ */jsx2(FlipCard, {
      i,
      frame
    }, i))]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CardFlipReveal;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
