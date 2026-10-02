// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/gauge-readout-moves/TapeScrollFixedPointer.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/gauge-readout-moves/TapeScrollFixedPointer.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/gauge-readout-moves/TapeScrollFixedPointer.tsx

var AMBER = __scConfig("demos/data/gauge-readout-moves/TapeScrollFixedPointer.tsx#AMBER", "AMBER", () => "#b45309");
var PXU = __scConfig("demos/data/gauge-readout-moves/TapeScrollFixedPointer.tsx#PXU", "PXU", () => 3);
var CENTER_Y = __scConfig("demos/data/gauge-readout-moves/TapeScrollFixedPointer.tsx#CENTER_Y", "CENTER_Y", () => 590);
var TAPE_X = __scConfig("demos/data/gauge-readout-moves/TapeScrollFixedPointer.tsx#TAPE_X", "TAPE_X", () => 830);
var TAPE_W = __scConfig("demos/data/gauge-readout-moves/TapeScrollFixedPointer.tsx#TAPE_W", "TAPE_W", () => 260);
var valueAt = frame => {
  if (frame <= 12) return 60;
  if (frame <= 55) {
    return interpolate(frame, [12, 55], [60, 140]);
  }
  if (frame <= 78) {
    return interpolate(frame, [55, 78], [140, 442], {
      easing: Easing.inOut(Easing.cubic)
      // 冲刺段，峰值 ~50px/f
    });
  }
  if (frame <= 88) {
    return interpolate(frame, [78, 88], [442, 415], {
      easing: Easing.out(Easing.cubic)
      // 刹车回摆：甩过头再拉回
    });
  }
  return interpolate(frame, [88, 96], [415, 420], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp"
  });
};
var TapeScrollFixedPointer = () => {
  const frame = useCurrentFrame();
  const v = valueAt(frame);
  const yOf = u => CENTER_Y + (v - u) * PXU;
  const ticks = [];
  for (let u = 0; u <= 500; u += 10) {
    const y = yOf(u);
    if (y < 180 || y > 1010) continue;
    const major = u % 50 === 0;
    ticks.push(/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        top: y - 2,
        right: 0,
        width: major ? 92 : 46,
        height: major ? 5 : 3,
        background: major ? G.ink : G.mid,
        borderRadius: 2
      }
    }, u));
    if (major) {
      ticks.push(/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          top: y - 22,
          right: 110,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: 38,
          color: G.mid,
          textAlign: "right",
          width: 90
        },
        children: u
      }, `n${u}`));
    }
  }
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
        top: 90,
        width: "100%",
        textAlign: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("TAPE SCROLL \xB7 FIXED POINTER"),
        size: 68
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: TAPE_X,
        top: 180,
        width: TAPE_W,
        height: 830,
        background: G.panel,
        border: `2px solid ${G.border}`,
        borderRadius: 12,
        overflow: "hidden",
        boxSizing: "border-box"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 0
        },
        // 内层坐标 = 屏幕 y - 180
        children: /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            right: 14,
            top: -180,
            height: 1080 + 400
          },
          children: ticks
        })
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: TAPE_X - 10,
        top: CENTER_Y - 46,
        width: TAPE_W + 20,
        height: 92,
        border: `5px solid ${AMBER}`,
        borderRadius: 10,
        boxShadow: "0 4px 14px rgba(0,0,0,0.14)",
        boxSizing: "border-box",
        background: "rgba(255,255,255,0.14)"
      }
    }), /* @__PURE__ */jsx2("svg", {
      width: 60,
      height: 64,
      style: {
        position: "absolute",
        left: TAPE_X - 66,
        top: CENTER_Y - 32
      },
      children: /* @__PURE__ */jsx2("polygon", {
        points: "4,4 56,32 4,60",
        fill: AMBER
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: TAPE_X + TAPE_W + 70,
        top: CENTER_Y - 84,
        width: 380,
        height: 168,
        background: G.card,
        border: `2px solid ${G.border}`,
        borderRadius: 14,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: __scCopy("0 36px"),
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 12,
          width: 150,
          background: G.line,
          borderRadius: 6,
          marginBottom: 12
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 96,
          color: AMBER,
          letterSpacing: -2,
          lineHeight: 1
        },
        children: Math.round(v)
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = TapeScrollFixedPointer;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
