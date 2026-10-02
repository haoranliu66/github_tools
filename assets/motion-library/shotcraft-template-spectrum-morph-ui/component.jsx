// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx

var h = n => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var LINE_W = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#LINE_W", "LINE_W", () => 720);
var LINE_H = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#LINE_H", "LINE_H", () => 8);
var LINE_X = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#LINE_X", "LINE_X", () => (1920 - LINE_W) / 2);
var LINE_BOTTOM = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#LINE_BOTTOM", "LINE_BOTTOM", () => 620);
var N_BARS = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#N_BARS", "N_BARS", () => 28);
var GAP_MAX = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#GAP_MAX", "GAP_MAX", () => 6);
var SPLIT = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#SPLIT", "SPLIT", () => 25);
var SPLIT_DUR = 8;
var DANCE = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#DANCE", "DANCE", () => 64);
var COLLAPSE_START = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#COLLAPSE_START", "COLLAPSE_START", () => SPLIT + DANCE);
var COLLAPSE_DUR = 12;
var COLLAPSE_END = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#COLLAPSE_END", "COLLAPSE_END", () => COLLAPSE_START + COLLAPSE_DUR);
var AMP = __scConfig("demos/rhythm/spectrum-morph-ui/SpectrumMorphUi.tsx#AMP", "AMP", () => 92);
var env = i => 0.4 + 0.6 * Math.pow(1 - i / (N_BARS - 1), 1.1);
var SpectrumMorphUi = () => {
  const frame = useCurrentFrame();
  const titleOp = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rampIn = interpolate(frame, [SPLIT, SPLIT + SPLIT_DUR], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rampOut = interpolate(frame, [COLLAPSE_START, COLLAPSE_END], [1, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const amp = rampIn * rampOut;
  const gapIn = interpolate(frame, [SPLIT, SPLIT + SPLIT_DUR], [0, GAP_MAX], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const gapOut = interpolate(frame, [COLLAPSE_START, COLLAPSE_END], [GAP_MAX, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const gap = Math.min(gapIn, gapOut);
  const barW = (LINE_W - (N_BARS - 1) * gap) / N_BARS;
  const barsActive = frame >= SPLIT && frame < COLLAPSE_END;
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
        top: 330,
        width: "100%",
        textAlign: "center",
        opacity: titleOp,
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 120,
        color: G.ink,
        letterSpacing: -1
      },
      children: __scCopy("LAUNCH WEEK")
    }), !barsActive && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: LINE_X,
        top: LINE_BOTTOM - LINE_H,
        width: LINE_W,
        height: LINE_H,
        background: G.ink,
        borderRadius: 4
      }
    }), barsActive && Array.from({
      length: N_BARS
    }).map((_, i) => {
      const wobble = Math.abs(Math.sin(i * 0.7 + frame * 0.31));
      const jitter = 0.4 + 0.6 * h(i * 13 + Math.floor(frame / 4));
      const barH = LINE_H + AMP * wobble * jitter * env(i) * amp;
      return /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: LINE_X + i * (barW + gap),
          top: LINE_BOTTOM - barH,
          // 底边对齐原线，向上长
          width: barW + (gap < 1 ? 0.5 : 0),
          // gap 收到 0 时补 0.5px 防细缝
          height: barH,
          background: G.ink,
          borderRadius: 3
        }
      }, i);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SpectrumMorphUi;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
