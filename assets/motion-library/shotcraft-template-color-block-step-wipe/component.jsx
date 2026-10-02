// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/color-block-step-wipe/ColorBlockStepWipe.tsx
import { AbsoluteFill, useCurrentFrame } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/color-block-step-wipe/ColorBlockStepWipe.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/color-block-step-wipe/ColorBlockStepWipe.tsx

var BLUE = __scConfig("demos/transition/color-block-step-wipe/ColorBlockStepWipe.tsx#BLUE", "BLUE", () => "#2383e2");
var RED = __scConfig("demos/transition/color-block-step-wipe/ColorBlockStepWipe.tsx#RED", "RED", () => "#e8503a");
var stepVal = (frame, steps) => {
  let v = steps[0][1];
  for (const [f, val] of steps) {
    if (frame >= f) v = val;
  }
  return v;
};
var AiBadge = ({
  scale,
  opacity
}) => /* @__PURE__ */jsx2("div", {
  style: {
    width: 170,
    height: 170,
    borderRadius: "50%",
    background: "#fdf6ec",
    opacity,
    transform: `scale(${scale})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 24px rgba(0,0,0,0.18)"
  },
  children: /* @__PURE__ */jsxs2("svg", {
    width: 110,
    height: 110,
    viewBox: "0 0 110 110",
    children: [/* @__PURE__ */jsx2("circle", {
      cx: 36,
      cy: 44,
      r: 8,
      fill: G.ink
    }), /* @__PURE__ */jsx2("circle", {
      cx: 74,
      cy: 44,
      r: 8,
      fill: G.ink
    }), /* @__PURE__ */jsx2("path", {
      d: __scCopy("M32 70 Q55 88 78 70"),
      stroke: G.ink,
      strokeWidth: 7,
      fill: "none",
      strokeLinecap: "round"
    }), /* @__PURE__ */jsx2("path", {
      d: __scCopy("M24 28 Q34 20 44 26"),
      stroke: G.ink,
      strokeWidth: 6,
      fill: "none",
      strokeLinecap: "round"
    }), /* @__PURE__ */jsx2("path", {
      d: __scCopy("M66 26 Q76 20 86 28"),
      stroke: G.ink,
      strokeWidth: 6,
      fill: "none",
      strokeLinecap: "round"
    })]
  })
});
var GrayPage = () => /* @__PURE__ */jsxs2(AbsoluteFill, {
  style: {
    background: G.panel,
    padding: __scCopy("90px 160px"),
    boxSizing: "border-box"
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      height: 40,
      width: 560,
      background: G.bar,
      borderRadius: 12,
      marginBottom: 40
    }
  }), [92, 78, 86, 60].map((w, i) => /* @__PURE__ */jsx2("div", {
    style: {
      height: 18,
      width: `${w}%`,
      background: G.line,
      borderRadius: 9,
      marginBottom: 24
    }
  }, i)), /* @__PURE__ */jsxs2("div", {
    style: {
      display: "flex",
      gap: 32,
      marginTop: 30
    },
    children: [/* @__PURE__ */jsx2(Card, {
      w: 420,
      h: 280,
      seed: 2
    }), /* @__PURE__ */jsx2(Card, {
      w: 420,
      h: 280,
      seed: 5
    })]
  })]
});
var ColorBlockStepWipe = () => {
  const frame = useCurrentFrame();
  if (frame < 78) {
    const w = stepVal(frame, [[0, 0], [8, 280], [16, 820], [24, 1340], [32, 1920], [44, 1920]]);
    const h = stepVal(frame, [[0, 0], [8, 96], [16, 96], [24, 320], [32, 580], [44, 1080]]);
    const badgeScale = stepVal(frame, [[0, 0], [52, 0.55], [58, 1.12], [63, 1]]);
    const badgeOpacity = frame >= 52 ? 1 : 0;
    return /* @__PURE__ */jsxs2(AbsoluteFill, {
      style: {
        background: G.bg,
        alignItems: "center",
        justifyContent: "center"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 960 - w / 2,
          top: 540 - h / 2,
          width: w,
          height: h,
          background: BLUE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }
      }), /* @__PURE__ */jsx2(AiBadge, {
        scale: badgeScale,
        opacity: badgeOpacity
      })]
    });
  }
  const p = stepVal(frame, [[78, 0], [84, 42], [96, 106], [108, 200]]);
  const cardPos = stepVal(frame, [[78, 0], [84, 1], [96, 2], [108, 3]]);
  const cardXY = [[2100, 1180],
  // 画外
  [1480, 800], [980, 560], [560, 350]];
  const [cx, cy] = cardXY[cardPos];
  const clip = p <= 0 ? "polygon(100% 100%, 100% 100%, 100% 100%)" : `polygon(${100 - p}% 100%, 100% ${100 - p}%, 100% 100%)`;
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    children: [/* @__PURE__ */jsx2(GrayPage, {}), /* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        background: RED,
        clipPath: clip
      }
    }), p > 0 && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: cx - 210,
        top: cy - 145,
        transform: "rotate(-4deg)",
        boxShadow: "0 18px 50px rgba(0,0,0,0.3)",
        borderRadius: 14
      },
      children: /* @__PURE__ */jsx2(Card, {
        w: 420,
        h: 290,
        seed: 7
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ColorBlockStepWipe;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
