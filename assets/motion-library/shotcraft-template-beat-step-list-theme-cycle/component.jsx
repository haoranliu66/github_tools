// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/beat-step-list-theme-cycle/BeatStepListThemeCycle.tsx
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
 var FONT = __scConfig("demos/rhythm/beat-step-list-theme-cycle/BeatStepListThemeCycle.tsx#FONT", "FONT", () => "Helvetica, Arial, sans-serif");
var ROW_H = __scConfig("demos/rhythm/beat-step-list-theme-cycle/BeatStepListThemeCycle.tsx#ROW_H", "ROW_H", () => 150);
var WORDS = __scConfig("demos/rhythm/beat-step-list-theme-cycle/BeatStepListThemeCycle.tsx#WORDS", "WORDS", () => [__scCopy("modern"), __scCopy("playful"), __scCopy("expressive"), __scCopy("seamless"), __scCopy("intuitive")]);
var BEAT_LEN = __scConfig("demos/rhythm/beat-step-list-theme-cycle/BeatStepListThemeCycle.tsx#BEAT_LEN", "BEAT_LEN", () => 18);
var FIRST_BEAT = __scConfig("demos/rhythm/beat-step-list-theme-cycle/BeatStepListThemeCycle.tsx#FIRST_BEAT", "FIRST_BEAT", () => 30);
var N_BEATS = __scConfig("demos/rhythm/beat-step-list-theme-cycle/BeatStepListThemeCycle.tsx#N_BEATS", "N_BEATS", () => 3);
var THEMES = __scConfig("demos/rhythm/beat-step-list-theme-cycle/BeatStepListThemeCycle.tsx#THEMES", "THEMES", () => [{
  pill: "#d8d8d4",
  bg: "#241a12",
  ink: "#2a2018"
},
// modern：灰白胶囊 / 深棕场
{
  pill: "#4fae62",
  bg: "#1e2416",
  ink: "#173015"
},
// playful：绿
{
  pill: "#8e6fd8",
  bg: "#221a33",
  ink: "#2a2144"
},
// expressive：紫
{
  pill: "#d64d55",
  bg: "#141c2e",
  ink: "#1a2440"
}
// seamless：红 / 深藏青
]);
var snap = t => interpolate(t, [0, 1], [0, 1], {
  easing: x => 1 - Math.pow(1 - x, 3.2),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
});
var BeatStepListThemeCycle = () => {
  const frame = useCurrentFrame();
  const raw = (frame - FIRST_BEAT) / BEAT_LEN;
  const beat = Math.min(N_BEATS, Math.max(0, Math.floor(raw) + 1));
  const beatStartFrame = FIRST_BEAT + (beat - 1) * BEAT_LEN;
  const tInBeat = beat === 0 ? 1 : snap((frame - beatStartFrame) / 6);
  const step = beat === 0 ? 0 : beat - 1 + tInBeat;
  const listY = -step * ROW_H;
  const themePrev = THEMES[Math.max(0, beat - 1)];
  const themeNow = THEMES[beat];
  const mixT = beat === 0 ? 1 : tInBeat;
  const mix = (a, b, t) => {
    const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16));
    const pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
    return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(",")})`;
  };
  const pillColor = mix(themePrev.pill, themeNow.pill, mixT);
  const bgColor = mix(themePrev.bg, themeNow.bg, mixT);
  const pop = beat === 0 ? 1 : interpolate(tInBeat, [0, 0.6, 1], [1.12, 0.97, 1]);
  const selectedIdx = beat;
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: bgColor,
      fontFamily: FONT,
      justifyContent: "center"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: 540 - ROW_H / 2 + 10,
        width: 900,
        height: ROW_H - 20,
        transform: `translateX(-50%) scale(${pop})`,
        background: pillColor,
        borderRadius: 999,
        boxShadow: "0 14px 40px rgba(0,0,0,0.35)"
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 540 - ROW_H / 2,
        transform: `translateY(${listY}px)`
      },
      children: WORDS.map((w, i) => {
        const isSel = i === selectedIdx;
        return /* @__PURE__ */jsx("div", {
          style: {
            height: ROW_H,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: /* @__PURE__ */jsx("span", {
            style: {
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -1.5,
              color: isSel ? beat === 0 ? "#2a2018" : "#ffffff" : "rgba(255,255,255,0.34)",
              position: "relative",
              zIndex: 2
            },
            children: w
          })
        }, w);
      })
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 300,
        background: `linear-gradient(${bgColor}, transparent)`,
        zIndex: 3
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 300,
        background: `linear-gradient(transparent, ${bgColor})`,
        zIndex: 3
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = BeatStepListThemeCycle;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
