// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/typewriter-moves/TypewriterErrorRetype.tsx
import { useCurrentFrame } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/typewriter-moves/TypewriterErrorRetype.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/typewriter-moves/TypewriterErrorRetype.tsx

var TEXT1 = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#TEXT1", "TEXT1", () => __scCopy("just a dashboard"));
var KEEP = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#KEEP", "KEEP", () => 5);
var DEL = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#DEL", "DEL", () => TEXT1.length - KEEP);
var TEXT2 = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#TEXT2", "TEXT2", () => __scCopy("your command center"));
var T1 = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#T1", "T1", () => 2);
var PAUSE_START = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#PAUSE_START", "PAUSE_START", () => T1 + (TEXT1.length - 1) * 2);
var DS = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#DS", "DS", () => PAUSE_START + 16);
var RS = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#RS", "RS", () => 68);
var TYPE2_END = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#TYPE2_END", "TYPE2_END", () => RS + (TEXT2.length - 1) * 1.5);
var CURSOR_OFF = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#CURSOR_OFF", "CURSOR_OFF", () => 115);
var CHAR_W = __scConfig("demos/typography/typewriter-moves/TypewriterErrorRetype.tsx#CHAR_W", "CHAR_W", () => 58);
var cursorOn = f => {
  if (f >= CURSOR_OFF) return false;
  if (f >= TYPE2_END) {
    return Math.floor((f - TYPE2_END) / 5) % 2 === 0;
  }
  if (f >= DS) return true;
  if (f >= PAUSE_START) {
    return Math.floor((f - PAUSE_START) / 4) % 2 === 0;
  }
  return true;
};
var TypewriterErrorRetype = () => {
  const f = useCurrentFrame();
  const n1 = f < T1 ? 0 : Math.min(TEXT1.length, Math.floor((f - T1) / 2) + 1);
  const removed = f < DS ? 0 : Math.min(DEL, Math.floor((f - DS) / 1.5) + 1);
  const n2 = f < RS ? 0 : Math.min(TEXT2.length, Math.floor((f - RS) / 1.5) + 1);
  const shown = TEXT1.slice(0, Math.max(KEEP, n1 - removed)).slice(0, n1) + TEXT2.slice(0, n2);
  const chars = shown.split("");
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 264,
        top: 490,
        display: "flex",
        alignItems: "center"
      },
      children: [chars.map((c, i) => /* @__PURE__ */jsx2("span", {
        style: {
          display: "inline-block",
          width: CHAR_W,
          textAlign: "center",
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: 96,
          fontWeight: 700,
          color: G.ink,
          lineHeight: 1.1
        },
        children: c === " " ? "\xA0" : c
      }, i)), cursorOn(f) && /* @__PURE__ */jsx2("span", {
        style: {
          display: "inline-block",
          width: 7,
          height: 100,
          marginLeft: 4,
          background: G.ink
        }
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = TypewriterErrorRetype;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
