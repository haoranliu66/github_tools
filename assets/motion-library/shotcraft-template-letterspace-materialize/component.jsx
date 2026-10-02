// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/opening/letterspace-materialize/LetterspaceMaterialize.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { jsx, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var GLYPHS = __scConfig("demos/opening/letterspace-materialize/LetterspaceMaterialize.tsx#GLYPHS", "GLYPHS", () => ({
  W: "M 7 5 L 17 59 L 39 28 L 61 59 L 71 5",
  O: "M 39 5 C 4 5, 4 59, 39 59 C 74 59, 74 5, 39 5",
  K: "M 12 5 L 12 59 M 66 5 L 12 32 L 66 59",
  C: "M 66 13 C 51 0, 12 1, 12 32 C 12 63, 51 64, 66 51",
  S: __scCopy("M 62 13 C 51 4, 18 3, 15 15 C 12 26, 29 29, 39 31 C 50 33, 66 37, 63 48 C 60 59, 21 61, 11 50"),
  U: __scCopy("M 12 5 L 12 40 C 12 59, 66 59, 66 40 L 66 5"),
  P: __scCopy("M 12 59 L 12 5 L 44 5 C 64 5, 64 32, 44 32 L 12 32"),
  E: __scCopy("M 62 5 L 12 5 L 12 59 L 62 59 M 12 31 L 56 31"),
  R: __scCopy("M 12 59 L 12 5 L 44 5 C 64 5, 64 31, 44 31 L 12 31 M 42 31 L 64 59"),
  H: __scCopy("M 12 5 L 12 59 M 66 5 L 66 59 M 12 31 L 66 31"),
  M: __scCopy("M 8 59 L 8 6 L 39 38 L 70 6 L 70 59"),
  A: __scCopy("M 7 59 L 39 5 L 71 59 M 17 41 L 61 41"),
  N: __scCopy("M 12 59 L 12 5 L 66 59 L 66 5")
}));
var WORD = __scConfig("demos/opening/letterspace-materialize/LetterspaceMaterialize.tsx#WORD", "WORD", () => __scCopy("SUPERHUMAN"));
var START = __scConfig("demos/opening/letterspace-materialize/LetterspaceMaterialize.tsx#START", "START", () => 16);
var DUR = __scConfig("demos/opening/letterspace-materialize/LetterspaceMaterialize.tsx#DUR", "DUR", () => 52);
var LetterspaceMaterialize = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [START, START + DUR], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  const doneGlow = interpolate(frame, [START + DUR, START + DUR + 8], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const glowAmt = p >= 1 ? doneGlow : p > 0.7 ? (p - 0.7) / 0.3 : 0;
  const letters = WORD.split("").map((ch, li) => /* @__PURE__ */jsx("svg", {
    width: 78,
    height: 64,
    viewBox: "0 0 78 64",
    style: {
      overflow: "visible",
      display: "block"
    },
    children: p > 0 && /* @__PURE__ */jsx("path", {
      d: GLYPHS[ch],
      fill: "none",
      stroke: "#f4f2f8",
      strokeWidth: 5.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      pathLength: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1 - e,
      style: {
        filter: `drop-shadow(0 0 ${6 + glowAmt * 10}px rgba(240,235,255,${0.35 + glowAmt * 0.35}))`
      }
    })
  }, li));
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "linear-gradient(178deg, #2c2a55 0%, #3d3465 30%, #241f40 58%, #0e0c1e 100%)",
      alignItems: "center",
      justifyContent: "center"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 470,
        height: 170,
        background: "linear-gradient(180deg, rgba(232,150,170,0) 0%, rgba(226,140,165,0.20) 45%, rgba(120,100,170,0.12) 75%, rgba(0,0,0,0) 100%)",
        filter: "blur(20px)"
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        right: 130,
        top: 330,
        width: 560,
        height: 200,
        background: "radial-gradient(ellipse at center, rgba(216,120,160,0.16) 0%, rgba(0,0,0,0) 70%)",
        filter: "blur(26px)"
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        display: "flex",
        gap: 34,
        alignItems: "center"
      },
      children: letters
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = LetterspaceMaterialize;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
