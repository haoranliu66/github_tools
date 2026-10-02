// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/type-rhythm-sync/FontWeightPump.tsx
import { useCurrentFrame } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/type-rhythm-sync/FontWeightPump.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/type-rhythm-sync/FontWeightPump.tsx

var BEATS = __scConfig("demos/typography/type-rhythm-sync/FontWeightPump.tsx#BEATS", "BEATS", () => [30, 50, 70, 90, 110]);
var ACCENTS = __scConfig("demos/typography/type-rhythm-sync/FontWeightPump.tsx#ACCENTS", "ACCENTS", () => /* @__PURE__ */new Set([2, 4]));
var DECAY = __scConfig("demos/typography/type-rhythm-sync/FontWeightPump.tsx#DECAY", "DECAY", () => 10);
var envAt = (frame, beat) => {
  const t = frame - beat;
  if (t < 0 || t >= DECAY) return 0;
  return Math.pow(1 - t / DECAY, 0.8);
};
var FontWeightPump = () => {
  const frame = useCurrentFrame();
  let env = 0;
  let activeBeat = -1;
  BEATS.forEach((b, i) => {
    const e = envAt(frame, b);
    if (e > env) {
      env = e;
      activeBeat = i;
    }
  });
  const strokeW = 10 * env;
  const weight = env > 0.15 ? 900 : 400;
  const accent = activeBeat >= 0 && ACCENTS.has(activeBeat);
  const scaleX = accent ? 1 + 0.08 * env : 1;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden",
      fontFamily: "Helvetica, Arial, sans-serif"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          fontSize: 150,
          fontWeight: weight,
          color: G.ink,
          letterSpacing: 6,
          whiteSpace: "nowrap",
          WebkitTextStroke: `${strokeW}px ${G.ink}`,
          transform: `scaleX(${scaleX})`,
          transformOrigin: __scCopy("center center")
        },
        children: __scCopy("PUMP IT UP")
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        bottom: 130,
        width: 1920,
        display: "flex",
        justifyContent: "center",
        gap: 56
      },
      children: BEATS.map((b, i) => {
        const e = envAt(frame, b);
        const dotOpacity = e > 0.02 ? Math.min(1, 0.3 + e * 1.2) : 0;
        const dotScale = 1 + 0.8 * e;
        return /* @__PURE__ */jsx2("div", {
          style: {
            width: 26,
            height: 26,
            borderRadius: 13,
            background: G.line,
            position: "relative",
            transform: `scale(${dotScale})`
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              inset: 0,
              borderRadius: 13,
              background: G.ink,
              opacity: dotOpacity
            }
          })
        }, i);
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = FontWeightPump;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
