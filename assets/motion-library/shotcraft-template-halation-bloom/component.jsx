// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/light-play-moves/HalationBloom.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";
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
 var BG = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#BG", "BG", () => "#2a2a28");
var WHITE = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#WHITE", "WHITE", () => "#f7f7f5");
var MID = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#MID", "MID", () => "#8f8f8d");
var ZOOM_START = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#ZOOM_START", "ZOOM_START", () => 8);
var IMPACT = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#IMPACT", "IMPACT", () => 15);
var REBOUND_END = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#REBOUND_END", "REBOUND_END", () => 17);
var POP_END = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#POP_END", "POP_END", () => IMPACT + 6);
var FALL_END = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#FALL_END", "FALL_END", () => POP_END + 20);
var SETTLE_END = __scConfig("demos/effects/light-play-moves/HalationBloom.tsx#SETTLE_END", "SETTLE_END", () => FALL_END + 15);
var TextBlock = ({
  color
}) => /* @__PURE__ */jsx("div", {
  style: {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 260,
    fontWeight: 800,
    color,
    letterSpacing: __scCopy("-0.02em"),
    lineHeight: 1,
    whiteSpace: "nowrap"
  },
  children: __scCopy("10x")
});
var HalationBloom = () => {
  const frame = useCurrentFrame();
  const zoomIn = interpolate(frame, [ZOOM_START, IMPACT], [2.4, 0.94], {
    easing: Easing.in(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rebound = interpolate(frame, [IMPACT, REBOUND_END], [0.94, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const textScale = frame < IMPACT ? zoomIn : rebound;
  const textOpacity = interpolate(frame, [ZOOM_START, ZOOM_START + 3], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const bloomScale = interpolate(frame, [IMPACT, POP_END], [1, 1.3], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const bloomFall = interpolate(frame, [POP_END, FALL_END], [1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const bloomSettle = interpolate(frame, [FALL_END, SETTLE_END], [0.35, 0.22], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const bloomOpacity = frame < FALL_END ? bloomFall : bloomSettle;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: 1920,
      height: 1080,
      background: BG,
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        top: 110,
        width: "100%",
        textAlign: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: __scCopy("0.35em"),
        color: MID
      },
      children: __scCopy("HALATION BLOOM")
    }), frame >= IMPACT && /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${bloomScale})`,
        opacity: bloomOpacity,
        filter: "blur(22px) brightness(1.8)"
      },
      children: /* @__PURE__ */jsx(TextBlock, {
        color: WHITE
      })
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${textScale})`,
        opacity: textOpacity
      },
      children: /* @__PURE__ */jsx(TextBlock, {
        color: WHITE
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = HalationBloom;
 return {component:template_entry_default,duration:159};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
