// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/icon-performance-moves/PopBurstConfirm.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/icon-performance-moves/PopBurstConfirm.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/effects/icon-performance-moves/PopBurstConfirm.tsx

var AMBER = __scConfig("demos/effects/icon-performance-moves/PopBurstConfirm.tsx#AMBER", "AMBER", () => "#b45309");
var POP = __scConfig("demos/effects/icon-performance-moves/PopBurstConfirm.tsx#POP", "POP", () => 27);
var DUR = __scConfig("demos/effects/icon-performance-moves/PopBurstConfirm.tsx#DUR", "DUR", () => 120);
var PopBurstConfirm = () => {
  const f = useCurrentFrame();
  const scale = (() => {
    if (f <= 20) return 1;
    if (f <= 23) return interpolate(f, [20, 23], [1, 0.6], {
      easing: Easing.in(Easing.quad)
    });
    if (f <= POP) return 0.6;
    if (f <= 33) return interpolate(f, [POP, 33], [0.6, 1.35], {
      easing: Easing.out(Easing.cubic)
    });
    return interpolate(f, [33, 44], [1.35, 1], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(2))
    });
  })();
  const checkT = interpolate(f, [POP, POP + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const pt = interpolate(f, [POP, POP + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const pDist = 210 + 190 * Easing.out(Easing.cubic)(pt);
  const pLen = 46 * (1 - pt);
  const rt = interpolate(f, [POP, POP + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const ringR = 200 + 300 * Easing.out(Easing.cubic)(rt);
  const ringO = 0.85 * (1 - rt);
  const ringW = 16 - 12 * rt;
  const tagT = interpolate(f, [40, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.6))
  });
  const CX = 960;
  const CY = 470;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [rt > 0 && rt < 1 && /* @__PURE__ */jsx2("svg", {
      width: 1400,
      height: 1400,
      style: {
        position: "absolute",
        left: CX - 700,
        top: CY - 700
      },
      children: /* @__PURE__ */jsx2("circle", {
        cx: 700,
        cy: 700,
        r: ringR,
        fill: "none",
        stroke: AMBER,
        strokeWidth: ringW,
        opacity: ringO
      })
    }), pt > 0 && pt < 1 && /* @__PURE__ */jsx2("svg", {
      width: 1400,
      height: 1400,
      style: {
        position: "absolute",
        left: CX - 700,
        top: CY - 700
      },
      children: Array.from({
        length: 10
      }).map((_, i) => {
        const ang = (i * 36 + 9 * Math.sin(i * 7.31)) * Math.PI / 180;
        const x1 = 700 + Math.cos(ang) * pDist;
        const y1 = 700 + Math.sin(ang) * pDist;
        const x2 = 700 + Math.cos(ang) * (pDist + pLen);
        const y2 = 700 + Math.sin(ang) * (pDist + pLen);
        return /* @__PURE__ */jsx2("line", {
          x1,
          y1,
          x2,
          y2,
          stroke: i % 5 < 2 ? AMBER : G.ink,
          strokeWidth: 12,
          strokeLinecap: "round",
          opacity: 1 - pt
        }, i);
      })
    }), /* @__PURE__ */jsxs2("svg", {
      width: 480,
      height: 480,
      viewBox: "0 0 480 480",
      style: {
        position: "absolute",
        left: CX - 240,
        top: CY - 240,
        transform: `scale(${scale})`,
        transformOrigin: "50% 50%"
      },
      children: [/* @__PURE__ */jsx2("circle", {
        cx: 240,
        cy: 240,
        r: 190,
        fill: G.card,
        stroke: G.ink,
        strokeWidth: 22
      }), checkT > 0 && /* @__PURE__ */jsx2("path", {
        d: __scCopy("M 150 245 L 215 310 L 340 175"),
        fill: "none",
        stroke: AMBER,
        strokeWidth: 34,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        pathLength: 1,
        strokeDasharray: 1,
        strokeDashoffset: 1 - checkT
      })]
    }), tagT > 0 && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: CX - 130,
        top: CY + 300,
        width: 260,
        transform: `scale(${tagT})`,
        transformOrigin: "50% 0%",
        padding: __scCopy("16px 0"),
        borderRadius: 40,
        background: G.ink,
        color: "#ffffff",
        textAlign: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 40,
        letterSpacing: 1
      },
      children: __scCopy("Deployed")
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PopBurstConfirm;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
