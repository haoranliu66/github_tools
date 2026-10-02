// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx

var CW = __scConfig("demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx#CW", "CW", () => 560);
var CH = __scConfig("demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx#CH", "CH", () => 380);
var CX = __scConfig("demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx#CX", "CX", () => (1920 - CW) / 2);
var CY = __scConfig("demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx#CY", "CY", () => (1080 - CH) / 2);
var PEN = __scConfig("demos/ui-entrance/draw-svg-trace/DrawSvgTrace.tsx#PEN", "PEN", () => 0.045);
var DrawSvgTrace = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [8, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const flashUp = interpolate(frame, [48, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const flashDown = interpolate(frame, [50, 56], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
  const flash = frame < 50 ? flashUp : flashDown;
  const strokeW = 4 + flash * 4;
  const strokeColor = flash > 0.5 ? "#000000" : G.ink;
  const contentOp = interpolate(frame, [48, 56], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
  const traceOp = interpolate(frame, [54, 64], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const borderOp = 1 - traceOp;
  const penOp = p > 0.02 && p < 0.985 ? 1 : 0;
  const up = interpolate(frame, [68, 86], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const upenOp = up > 0.03 && up < 0.97 ? 1 : 0;
  const UW = 300;
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
        text: __scCopy("DRAW SVG TRACE"),
        size: 54
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: CX,
        top: CY,
        width: CW,
        height: CH,
        borderRadius: 14,
        background: G.card,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: 32,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        opacity: contentOp
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 24,
          width: 340,
          background: G.bar,
          borderRadius: 10
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 6
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 13,
          width: "86%",
          background: G.line,
          borderRadius: 6
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 13,
          width: "72%",
          background: G.line,
          borderRadius: 6
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 13,
          width: "60%",
          background: G.line,
          borderRadius: 6
        }
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          marginTop: "auto",
          display: "flex",
          gap: 12,
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            width: 34,
            height: 34,
            borderRadius: 17,
            background: G.mid
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 12,
            width: 96,
            background: G.line,
            borderRadius: 6
          }
        })]
      })]
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: CX,
        top: CY,
        width: CW,
        height: CH,
        borderRadius: 14,
        border: `2px solid ${G.border}`,
        boxSizing: "border-box",
        opacity: borderOp
      }
    }), traceOp > 1e-3 && /* @__PURE__ */jsxs2("svg", {
      width: CW,
      height: CH,
      style: {
        position: "absolute",
        left: CX,
        top: CY,
        overflow: "visible",
        opacity: traceOp
      },
      children: [/* @__PURE__ */jsx2("rect", {
        x: 1,
        y: 1,
        width: CW - 2,
        height: CH - 2,
        rx: 14,
        fill: "none",
        stroke: strokeColor,
        strokeWidth: strokeW,
        pathLength: 1,
        strokeDasharray: "1",
        strokeDashoffset: 1 - p,
        strokeLinecap: "round"
      }), penOp > 0 && /* @__PURE__ */jsx2("rect", {
        x: 1,
        y: 1,
        width: CW - 2,
        height: CH - 2,
        rx: 14,
        fill: "none",
        stroke: G.ink,
        strokeWidth: 7,
        pathLength: 1,
        strokeDasharray: `${PEN} ${1 - PEN}`,
        strokeDashoffset: PEN - p,
        strokeLinecap: "round"
      })]
    }), up > 1e-3 && /* @__PURE__ */jsxs2("svg", {
      width: UW,
      height: 8,
      style: {
        position: "absolute",
        left: CX + 32,
        top: CY + 32 + 24 + 10,
        overflow: "visible"
      },
      children: [/* @__PURE__ */jsx2("line", {
        x1: 0,
        y1: 4,
        x2: UW,
        y2: 4,
        stroke: G.ink,
        strokeWidth: 4,
        pathLength: 1,
        strokeDasharray: "1",
        strokeDashoffset: 1 - up,
        strokeLinecap: "round"
      }), upenOp > 0 && /* @__PURE__ */jsx2("line", {
        x1: 0,
        y1: 4,
        x2: UW,
        y2: 4,
        stroke: G.ink,
        strokeWidth: 7,
        pathLength: 1,
        strokeDasharray: `${PEN * 2} ${1 - PEN * 2}`,
        strokeDashoffset: PEN * 2 - up,
        strokeLinecap: "round"
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = DrawSvgTrace;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
