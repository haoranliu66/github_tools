// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx

var AMBER = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#AMBER", "AMBER", () => "#b45309");
var RED = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#RED", "RED", () => "#7c2d12");
var CARD_W = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#CARD_W", "CARD_W", () => 1500);
var CARD_H = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#CARD_H", "CARD_H", () => 640);
var CARD_X = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#CARD_X", "CARD_X", () => (1920 - CARD_W) / 2);
var CARD_Y = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#CARD_Y", "CARD_Y", () => 300);
var GA_W = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#GA_W", "GA_W", () => CARD_W / 3);
var R = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#R", "R", () => 148);
var CX = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#CX", "CX", () => GA_W / 2);
var CY = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#CY", "CY", () => 240);
var polar = (a, r) => [CX + r * Math.cos(a * Math.PI / 180), CY + r * Math.sin(a * Math.PI / 180)];
var arcPath = (d0, d1, r) => {
  const [x0, y0] = polar(135 + d0, r);
  const [x1, y1] = polar(135 + d1, r);
  const large = d1 - d0 > 180 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
};
var GAUGES = __scConfig("demos/data/gauge-readout-moves/NeedleSweepSelftest.tsx#GAUGES", "GAUGES", () => [{
  start: 12,
  target: 190
}, {
  start: 16,
  target: 120
}, {
  start: 20,
  target: 235
}]);
var needleAngle = (frame, s, target) => {
  if (frame <= s) return 0;
  if (frame <= s + 12) {
    return interpolate(frame, [s, s + 12], [0, 270], {
      easing: Easing.out(Easing.cubic)
    });
  }
  if (frame <= s + 25) {
    return interpolate(frame, [s + 12, s + 25], [270, target - 8], {
      easing: Easing.inOut(Easing.cubic)
    });
  }
  return interpolate(frame, [s + 25, s + 32], [target - 8, target], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp"
  });
};
var Gauge = ({
  start,
  target
}) => {
  const frame = useCurrentFrame();
  const d = needleAngle(frame, start, target);
  const settle = start + 32;
  const value = Math.round(target / 270 * 100);
  const popScale = interpolate(frame, [settle, settle + 4, settle + 8], [0.3, 1.18, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const popOp = interpolate(frame, [settle, settle + 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const [tipX, tipY] = polar(135, R - 26);
  const [tailX, tailY] = polar(315, 36);
  const ticks = [];
  for (let k = 0; k <= 30; k++) {
    const dd = k * 9;
    const major = k % 3 === 0;
    const a = 135 + dd;
    const [x0, y0] = polar(a, R - 8);
    const [x1, y1] = polar(a, major ? R - 30 : R - 19);
    ticks.push(/* @__PURE__ */jsx2("line", {
      x1: x0,
      y1: y0,
      x2: x1,
      y2: y1,
      stroke: dd >= 225 ? RED : G.mid,
      strokeWidth: major ? 4 : 2
    }, k));
  }
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: GA_W,
      height: 480,
      position: "relative"
    },
    children: [/* @__PURE__ */jsxs2("svg", {
      width: GA_W,
      height: 430,
      children: [/* @__PURE__ */jsx2("path", {
        d: arcPath(0, 270, R),
        fill: "none",
        stroke: G.line,
        strokeWidth: 10,
        strokeLinecap: "round"
      }), /* @__PURE__ */jsx2("path", {
        d: arcPath(225, 270, R),
        fill: "none",
        stroke: RED,
        strokeWidth: 10,
        strokeLinecap: "round",
        opacity: 0.85
      }), ticks, /* @__PURE__ */jsx2("g", {
        transform: `rotate(${d.toFixed(3)} ${CX} ${CY})`,
        children: /* @__PURE__ */jsx2("line", {
          x1: tailX,
          y1: tailY,
          x2: tipX,
          y2: tipY,
          stroke: AMBER,
          strokeWidth: 9,
          strokeLinecap: "round"
        })
      }), /* @__PURE__ */jsx2("circle", {
        cx: CX,
        cy: CY,
        r: 15,
        fill: G.ink
      }), /* @__PURE__ */jsx2("circle", {
        cx: CX,
        cy: CY,
        r: 6,
        fill: AMBER
      })]
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 396,
        textAlign: "center",
        opacity: popOp,
        transform: `scale(${popScale.toFixed(4)})`
      },
      children: [/* @__PURE__ */jsx2("span", {
        style: {
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 62,
          color: G.ink
        },
        children: value
      }), /* @__PURE__ */jsx2("span", {
        style: {
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: 30,
          color: G.mid,
          marginLeft: 8
        },
        children: __scCopy("%")
      })]
    })]
  });
};
var NeedleSweepSelftest = () => {
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
        top: 110,
        width: "100%",
        textAlign: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("NEEDLE SWEEP SELF-TEST"),
        size: 72
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: CARD_X,
        top: CARD_Y,
        width: CARD_W,
        height: CARD_H,
        background: G.card,
        border: `2px solid ${G.border}`,
        borderRadius: 14,
        boxSizing: "border-box",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: 32
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 16,
          width: 320,
          background: G.bar,
          borderRadius: 8
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 96,
          display: "flex"
        },
        children: GAUGES.map((g, i) => /* @__PURE__ */jsx2(Gauge, {
          start: g.start,
          target: g.target
        }, i))
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = NeedleSweepSelftest;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
