// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/riso-print-hits/RisoMisregistrationHit.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/riso-print-hits/RisoMisregistrationHit.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/effects/riso-print-hits/RisoMisregistrationHit.tsx

var HIT = __scConfig("demos/effects/riso-print-hits/RisoMisregistrationHit.tsx#HIT", "HIT", () => 28);
var SNAP = __scConfig("demos/effects/riso-print-hits/RisoMisregistrationHit.tsx#SNAP", "SNAP", () => 72);
var AX = __scConfig("demos/effects/riso-print-hits/RisoMisregistrationHit.tsx#AX", "AX", () => 16);
var AY = __scConfig("demos/effects/riso-print-hits/RisoMisregistrationHit.tsx#AY", "AY", () => 7);
var OMEGA = __scConfig("demos/effects/riso-print-hits/RisoMisregistrationHit.tsx#OMEGA", "OMEGA", () => 2 * Math.PI / 18);
var TAU = __scConfig("demos/effects/riso-print-hits/RisoMisregistrationHit.tsx#TAU", "TAU", () => 60);
var Plate = ({
  color,
  dx,
  dy
}) => /* @__PURE__ */jsx2("div", {
  style: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: `translate(${dx}px, ${dy}px)`,
    mixBlendMode: "multiply"
  },
  children: /* @__PURE__ */jsx2("div", {
    style: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: 800,
      fontSize: 200,
      color,
      letterSpacing: -1,
      whiteSpace: "nowrap"
    },
    children: __scCopy("IMPACT")
  })
});
var RisoMisregistrationHit = () => {
  const frame = useCurrentFrame();
  const entering = frame >= 20 && frame < HIT;
  const split = frame >= HIT && frame < SNAP;
  const showSingle = frame < HIT || frame >= SNAP;
  const slideX = interpolate(frame, [20, HIT], [1400, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const t = frame - HIT;
  const m = split ? Math.cos(OMEGA * t) * Math.exp(-t / TAU) : 0;
  const dx = AX * m;
  const dy = AY * m;
  const pulse = frame >= SNAP && frame < SNAP + 4 ? 1 + 0.03 * (1 - (frame - SNAP) / 4) : 1;
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
        left: 510,
        top: 740,
        width: 900,
        height: 6,
        borderRadius: 3,
        background: G.bar
      }
    }), showSingle && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateX(${entering || frame < 20 ? slideX : 0}px) scale(${pulse})`,
        transformOrigin: __scCopy("center center")
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("IMPACT"),
        size: 200
      })
    }), split && /* @__PURE__ */jsxs2(Fragment, {
      children: [/* @__PURE__ */jsx2(Plate, {
        color: G.mid,
        dx: -dx,
        dy
      }), /* @__PURE__ */jsx2(Plate, {
        color: G.ink,
        dx,
        dy: -dy
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = RisoMisregistrationHit;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
