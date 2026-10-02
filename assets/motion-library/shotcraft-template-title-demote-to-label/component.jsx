// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/title-demote-to-label/TitleDemoteToLabel.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/title-demote-to-label/TitleDemoteToLabel.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/title-demote-to-label/TitleDemoteToLabel.tsx

var FONT = __scConfig("demos/typography/title-demote-to-label/TitleDemoteToLabel.tsx#FONT", "FONT", () => "Helvetica, Arial, sans-serif");
var SEL = __scConfig("demos/typography/title-demote-to-label/TitleDemoteToLabel.tsx#SEL", "SEL", () => "rgba(58, 128, 236, 0.35)");
var Skeleton = ({
  t
}) => {
  const blocks = [{
    w: 1500,
    h: 26
  }, {
    w: 1280,
    h: 26
  }, {
    w: 1420,
    h: 26
  }, {
    w: 760,
    h: 26
  }, {
    w: 1500,
    h: 300,
    card: true
  }];
  return /* @__PURE__ */jsx2("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 34
    },
    children: blocks.map((b, i) => {
      const bt = interpolate(t, [i * 0.16, i * 0.16 + 0.3], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic)
      });
      return /* @__PURE__ */jsx2("div", {
        style: {
          width: b.w * (0.35 + 0.65 * bt),
          height: b.h,
          background: b.card ? G.card : G.line,
          border: b.card ? `2px solid ${G.border}` : "none",
          borderRadius: b.card ? 16 : 13,
          opacity: bt,
          transform: `translateY(${(1 - bt) * 28}px)`,
          boxSizing: "border-box"
        }
      }, i);
    })
  });
};
var DemoteScene = ({
  frame,
  title,
  withSelection
}) => {
  const REVEAL = 0;
  const SEL_ON = 14;
  const SEL_OFF = 32;
  const DEMOTE = withSelection ? 44 : 32;
  const DEMOTE_END = DEMOTE + 20;
  const GROW = DEMOTE + 12;
  const rev = interpolate(frame, [REVEAL, REVEAL + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const dem = interpolate(frame, [DEMOTE, DEMOTE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const scale = interpolate(dem, [0, 1], [1, 0.3]);
  const x = interpolate(dem, [0, 1], [960, 150]);
  const y = interpolate(dem, [0, 1], [480, 110]);
  let selLeft = 0;
  let selWidth = 0;
  if (withSelection) {
    const on = interpolate(frame, [SEL_ON, SEL_ON + 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad)
    });
    const off = interpolate(frame, [SEL_OFF, SEL_OFF + 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.quad)
    });
    selLeft = off * 100;
    selWidth = Math.max(0, on * 100 - selLeft);
  }
  const growT = interpolate(frame, [GROW, GROW + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: G.bg
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 150,
        top: 210
      },
      children: /* @__PURE__ */jsx2(Skeleton, {
        t: growT
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(${-(1 - dem) * 50}%, -50%) scale(${scale})`,
        transformOrigin: __scCopy("left center"),
        opacity: rev,
        filter: `blur(${(1 - rev) * 12}px)`
      },
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          position: "relative",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 128,
          color: G.ink,
          letterSpacing: -2,
          whiteSpace: "nowrap",
          padding: __scCopy("10px 18px")
        },
        children: [withSelection && selWidth > 0 && /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: `${selLeft}%`,
            top: 8,
            width: `${selWidth}%`,
            height: "calc(100% - 16px)",
            background: SEL,
            borderRadius: 6
          }
        }), /* @__PURE__ */jsx2("span", {
          style: {
            position: "relative"
          },
          children: title
        })]
      })
    })]
  });
};
var TitleDemoteToLabel = () => {
  const frame = useCurrentFrame();
  const SPLIT = 92;
  if (frame < SPLIT) {
    return /* @__PURE__ */jsx2(DemoteScene, {
      frame,
      title: __scCopy("Running Subagents"),
      withSelection: false
    });
  }
  const f = frame - SPLIT;
  const flash = interpolate(f, [0, 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    children: [/* @__PURE__ */jsx2(DemoteScene, {
      frame: f,
      title: __scCopy("Select the Answer"),
      withSelection: true
    }), /* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        background: "#fff",
        opacity: flash,
        pointerEvents: "none"
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = TitleDemoteToLabel;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
