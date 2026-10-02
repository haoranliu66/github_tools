// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/element-body-moves/AxialStretch.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/element-body-moves/AxialStretch.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/element-body-moves/AxialStretch.tsx

var W = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#W", "W", () => 1920);
var CARD_W = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#CARD_W", "CARD_W", () => 380);
var CARD_H = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#CARD_H", "CARD_H", () => 230);
var GAP = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#GAP", "GAP", () => 60);
var ROW_W = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#ROW_W", "ROW_W", () => 3 * CARD_W + 2 * GAP);
var ROW_X0 = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#ROW_X0", "ROW_X0", () => (W - ROW_W) / 2);
var ROW_Y = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#ROW_Y", "ROW_Y", () => (1080 - CARD_H) / 2);
var START_X = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#START_X", "START_X", () => 1980);
var FLIGHT = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#FLIGHT", "FLIGHT", () => 36);
var STAGGER = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#STAGGER", "STAGGER", () => 12);
var FIRST = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#FIRST", "FIRST", () => 10);
var SQUASH = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#SQUASH", "SQUASH", () => 8);
var VEL_MIN = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#VEL_MIN", "VEL_MIN", () => 2);
var VEL_REF = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#VEL_REF", "VEL_REF", () => 140);
var STRETCH_X = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#STRETCH_X", "STRETCH_X", () => 1.2);
var SQUISH_Y = __scConfig("demos/ui-entrance/element-body-moves/AxialStretch.tsx#SQUISH_Y", "SQUISH_Y", () => 0.28);
var flightEase = Easing.inOut(Easing.poly(4));
var posAt = (f, start, targetX) => interpolate(f, [start, start + FLIGHT], [START_X, targetX], {
  easing: flightEase,
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
});
var FlyCard = ({
  i,
  frame
}) => {
  const start = FIRST + i * STAGGER;
  const targetX = ROW_X0 + i * (CARD_W + GAP);
  const land = start + FLIGHT;
  const x = posAt(frame, start, targetX);
  const v = Math.abs(posAt(frame, start, targetX) - posAt(frame - 1, start, targetX));
  const s = Math.min(Math.max((v - VEL_MIN) / (VEL_REF - VEL_MIN), 0), 1);
  const stretchX = 1 + STRETCH_X * s;
  const stretchY = 1 - SQUISH_Y * s;
  const sqX = interpolate(frame, [land, land + SQUASH / 2, land + SQUASH], [1, 0.85, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const sqY = interpolate(frame, [land, land + SQUASH / 2, land + SQUASH], [1, 1.1, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: 0,
      top: ROW_Y,
      // 顺序：先 translate 再 scale；transformOrigin 设运动后缘（向左飞 → 右缘）
      transform: `translateX(${x}px) scaleX(${stretchX * sqX}) scaleY(${stretchY * sqY})`,
      transformOrigin: "100% 50%"
    },
    children: /* @__PURE__ */jsx2(Card, {
      w: CARD_W,
      h: CARD_H,
      seed: i + 1
    })
  });
};
var AxialStretch = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
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
        top: 120,
        width: "100%",
        textAlign: "center",
        opacity: titleOp
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("AXIAL STRETCH"),
        size: 72
      })
    }), [0, 1, 2].map(i => /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: ROW_X0 + i * (CARD_W + GAP),
        top: ROW_Y,
        width: CARD_W,
        height: CARD_H,
        border: `2px dashed ${G.bar}`,
        borderRadius: 14,
        boxSizing: "border-box"
      }
    }, `slot-${i}`)), [0, 1, 2].map(i => /* @__PURE__ */jsx2(FlyCard, {
      i,
      frame
    }, i))]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AxialStretch;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
