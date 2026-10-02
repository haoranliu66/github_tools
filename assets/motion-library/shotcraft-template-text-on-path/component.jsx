// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/type-assembly-moves/TextOnPath.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/type-assembly-moves/TextOnPath.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/type-assembly-moves/TextOnPath.tsx

var P0 = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#P0", "P0", () => ({
  x: 200,
  y: 820
}));
var P1 = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#P1", "P1", () => ({
  x: 760,
  y: 810
}));
var P2 = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#P2", "P2", () => ({
  x: 1240,
  y: 660
}));
var P3 = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#P3", "P3", () => ({
  x: 1500,
  y: 320
}));
var bez = t => {
  const u = 1 - t;
  return {
    x: u * u * u * P0.x + 3 * u * u * t * P1.x + 3 * u * t * t * P2.x + t * t * t * P3.x,
    y: u * u * u * P0.y + 3 * u * u * t * P1.y + 3 * u * t * t * P2.y + t * t * t * P3.y
  };
};
var tangent = t => {
  const u = 1 - t;
  const dx = 3 * u * u * (P1.x - P0.x) + 6 * u * t * (P2.x - P1.x) + 3 * t * t * (P3.x - P2.x);
  const dy = 3 * u * u * (P1.y - P0.y) + 6 * u * t * (P2.y - P1.y) + 3 * t * t * (P3.y - P2.y);
  return Math.atan2(dy, dx) * 180 / Math.PI;
};
var TEXT = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#TEXT", "TEXT", () => __scCopy("GROWTH ALL THE WAY"));
var N = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#N", "N", () => TEXT.length);
var CHAR_W = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#CHAR_W", "CHAR_W", () => 46);
var FINAL_Y = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#FINAL_Y", "FINAL_Y", () => 300);
var FINAL_X0 = __scConfig("demos/typography/type-assembly-moves/TextOnPath.tsx#FINAL_X0", "FINAL_X0", () => 960 - N * CHAR_W / 2);
var TextOnPath = () => {
  const frame = useCurrentFrame();
  const evolve = interpolate(frame, [0, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
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
        left: 120,
        top: 96
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("TEXT ON PATH"),
        size: 54
      })
    }), /* @__PURE__ */jsx2("svg", {
      width: 1920,
      height: 1080,
      style: {
        position: "absolute",
        inset: 0
      },
      children: /* @__PURE__ */jsx2("path", {
        d: `M ${P0.x} ${P0.y} C ${P1.x} ${P1.y}, ${P2.x} ${P2.y}, ${P3.x} ${P3.y}`,
        fill: "none",
        stroke: G.bar,
        strokeWidth: 3,
        pathLength: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1 - evolve
      })
    }), TEXT.split("").map((ch, i) => {
      if (ch === " ") return null;
      const tEnd = 0.12 + 0.82 * (i / (N - 1));
      const start = i * 2;
      const t = interpolate(frame, [start, start + 45], [0, tEnd], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic)
      });
      const pOnCurve = bez(t);
      const angOnCurve = tangent(t);
      const settle = interpolate(frame, [start + 53, start + 65], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.cubic)
      });
      const x = pOnCurve.x + (FINAL_X0 + i * CHAR_W - pOnCurve.x) * settle;
      const y = pOnCurve.y + (FINAL_Y - pOnCurve.y) * settle;
      const ang = angOnCurve * (1 - settle);
      const op = interpolate(frame, [start, start + 8], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      return /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: x,
          top: y,
          opacity: op,
          transform: `translate(-50%, -50%) rotate(${ang}deg)`,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 64,
          color: G.ink
        },
        children: ch
      }, i);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = TextOnPath;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
