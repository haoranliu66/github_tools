// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/type-entrance-moves/LetterDropPhysics.tsx
import { useCurrentFrame, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/type-entrance-moves/LetterDropPhysics.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/type-entrance-moves/LetterDropPhysics.tsx

var h = n => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var WORD = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#WORD", "WORD", () => __scCopy("GRAVITY"));
var SLOT_W = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#SLOT_W", "SLOT_W", () => 150);
var FONT = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#FONT", "FONT", () => 140);
var WORD_W = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#WORD_W", "WORD_W", () => WORD.length * SLOT_W);
var LEFT = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#LEFT", "LEFT", () => (1920 - WORD_W) / 2);
var REST_TOP = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#REST_TOP", "REST_TOP", () => 452);
var FLOOR_Y = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#FLOOR_Y", "FLOOR_Y", () => REST_TOP + 152);
var DROP = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#DROP", "DROP", () => 720);
var T_FALL = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#T_FALL", "T_FALL", () => 24);
var T_B1 = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#T_B1", "T_B1", () => 16);
var T_B2 = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#T_B2", "T_B2", () => 8);
var SNAP = __scConfig("demos/typography/type-entrance-moves/LetterDropPhysics.tsx#SNAP", "SNAP", () => 110);
var SNAP_DUR = 6;
var easeOutCubic = Easing.out(Easing.cubic);
var clamp01 = x => Math.min(1, Math.max(0, x));
var dropY = t => {
  if (t <= 0) return -DROP;
  if (t < T_FALL) return -DROP + DROP * (t / T_FALL) ** 2;
  if (t < T_FALL + T_B1) {
    const u = (t - T_FALL) / T_B1;
    return -DROP * 0.3 * 4 * u * (1 - u);
  }
  if (t < T_FALL + T_B1 + T_B2) {
    const u = (t - T_FALL - T_B1) / T_B2;
    return -DROP * 0.09 * 4 * u * (1 - u);
  }
  return 0;
};
var LetterDropPhysics = () => {
  const frame = useCurrentFrame();
  const snap = easeOutCubic(clamp01((frame - SNAP) / SNAP_DUR));
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      overflow: "hidden",
      position: "relative"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: LEFT - 60,
        top: FLOOR_Y,
        width: WORD_W + 120,
        height: 6,
        background: G.bar,
        borderRadius: 3
      }
    }), WORD.split("").map((ch, i) => {
      const start = 10 + i * 5;
      const t = frame - start;
      const y = dropY(t);
      const tiltTarget = (h(i + 1) - 0.5) * 12;
      const landP = clamp01((t - T_FALL) / 6);
      const restJitter = (h(i + 11) - 0.5) * 10;
      const rot = tiltTarget * landP * (1 - snap);
      const jitter = restJitter * landP * (1 - snap);
      const scale = frame < SNAP ? 1 : 1 + 0.06 * (1 - snap);
      return /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: LEFT + i * SLOT_W,
          top: REST_TOP,
          width: SLOT_W,
          height: FONT,
          display: "flex",
          alignItems: __scCopy("flex-end"),
          justifyContent: "center",
          transform: `translateY(${y + jitter}px) rotate(${rot}deg) scale(${scale})`,
          transformOrigin: "50% 100%",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: FONT,
          lineHeight: 1,
          color: G.ink
        },
        children: ch
      }, i);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = LetterDropPhysics;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
