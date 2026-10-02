// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/light-play-moves/SpotlightSweepReveal.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var BG = __scConfig("demos/effects/light-play-moves/SpotlightSweepReveal.tsx#BG", "BG", () => "#2a2a28");
var INKW = __scConfig("demos/effects/light-play-moves/SpotlightSweepReveal.tsx#INKW", "INKW", () => "#f5f5f3");
var CX = __scConfig("demos/effects/light-play-moves/SpotlightSweepReveal.tsx#CX", "CX", () => 960);
var CY = __scConfig("demos/effects/light-play-moves/SpotlightSweepReveal.tsx#CY", "CY", () => 540);
var AMP = __scConfig("demos/effects/light-play-moves/SpotlightSweepReveal.tsx#AMP", "AMP", () => 560);
var PERIOD = __scConfig("demos/effects/light-play-moves/SpotlightSweepReveal.tsx#PERIOD", "PERIOD", () => 55);
var SWEEP_END = __scConfig("demos/effects/light-play-moves/SpotlightSweepReveal.tsx#SWEEP_END", "SWEEP_END", () => 110);
var REVEAL_END = __scConfig("demos/effects/light-play-moves/SpotlightSweepReveal.tsx#REVEAL_END", "REVEAL_END", () => 125);
var textStyle = {
  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
  fontSize: 150,
  fontWeight: 800,
  lineHeight: 1.15,
  letterSpacing: __scCopy("0.04em"),
  color: INKW,
  textAlign: "center",
  whiteSpace: "pre"
};
var TitleText = () => /* @__PURE__ */jsx(AbsoluteFill, {
  style: {
    justifyContent: "center",
    alignItems: "center"
  },
  children: /* @__PURE__ */jsx("div", {
    style: textStyle,
    children: __scCopy("SPOTLIGHT\nON")
  })
});
var SpotlightSweepReveal = () => {
  const f = useCurrentFrame();
  const sweepF = Math.min(f, SWEEP_END);
  const x = CX + AMP * Math.sin(2 * Math.PI * sweepF / PERIOD);
  const brighten = interpolate(f, [SWEEP_END, REVEAL_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const fadeOut = interpolate(f, [SWEEP_END, REVEAL_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const sweepAlive = f < REVEAL_END;
  const maskGrad = `radial-gradient(circle 380px at ${x}px ${CY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0) 100%)`;
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      backgroundColor: BG
    },
    children: [/* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        opacity: 0.07
      },
      children: /* @__PURE__ */jsx(TitleText, {})
    }), sweepAlive && /* @__PURE__ */jsxs(Fragment, {
      children: [/* @__PURE__ */jsx(AbsoluteFill, {
        style: {
          opacity: fadeOut,
          clipPath: `polygon(${CX - 70}px -40px, ${CX + 70}px -40px, ${x + 420}px ${CY + 230}px, ${x - 420}px ${CY + 230}px)`,
          background: "linear-gradient(to bottom, rgba(245,245,243,0.16), rgba(245,245,243,0.03) 85%, rgba(245,245,243,0) 100%)"
        }
      }), /* @__PURE__ */jsx(AbsoluteFill, {
        style: {
          opacity: fadeOut,
          background: `radial-gradient(circle 460px at ${x}px ${CY}px, rgba(245,245,243,0.22) 0%, rgba(245,245,243,0.08) 55%, rgba(245,245,243,0) 100%)`
        }
      }), /* @__PURE__ */jsx(AbsoluteFill, {
        style: {
          opacity: fadeOut === 1 ? 1 : Math.max(fadeOut, 0),
          WebkitMaskImage: maskGrad,
          maskImage: maskGrad
        },
        children: /* @__PURE__ */jsx(TitleText, {})
      })]
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        opacity: brighten
      },
      children: /* @__PURE__ */jsx(TitleText, {})
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SpotlightSweepReveal;
 return {component:template_entry_default,duration:159};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
