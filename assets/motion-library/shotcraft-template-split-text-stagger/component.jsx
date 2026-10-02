// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/type-assembly-moves/SplitTextStagger.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/type-assembly-moves/SplitTextStagger.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/type-assembly-moves/SplitTextStagger.tsx

var TEXT = __scConfig("demos/typography/type-assembly-moves/SplitTextStagger.tsx#TEXT", "TEXT", () => __scCopy("MOTION SYSTEM"));
var START = __scConfig("demos/typography/type-assembly-moves/SplitTextStagger.tsx#START", "START", () => 12);
var RISE = __scConfig("demos/typography/type-assembly-moves/SplitTextStagger.tsx#RISE", "RISE", () => 14);
var SETTLE = __scConfig("demos/typography/type-assembly-moves/SplitTextStagger.tsx#SETTLE", "SETTLE", () => 6);
var OVERSHOOT = __scConfig("demos/typography/type-assembly-moves/SplitTextStagger.tsx#OVERSHOOT", "OVERSHOOT", () => -10);
var FONT = __scConfig("demos/typography/type-assembly-moves/SplitTextStagger.tsx#FONT", "FONT", () => 120);
var charY = (f, idx) => {
  const t0 = START + idx * 2;
  if (f < t0 + RISE) {
    return interpolate(f, [t0, t0 + RISE], [115, OVERSHOOT], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic)
    });
  }
  return interpolate(f, [t0 + RISE, t0 + RISE + SETTLE], [OVERSHOOT, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
};
var SplitTextStagger = () => {
  const frame = useCurrentFrame();
  const chars = TEXT.split("");
  const lineW = interpolate(frame, [START, START + 26], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
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
        left: 120,
        top: 96
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("SPLIT TEXT STAGGER"),
        size: 54
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          display: "flex"
        },
        children: chars.map((c, i) => /* @__PURE__ */jsx2("div", {
          style: {
            // 遮罩盒：上方留 0.3em 头部空间容纳过冲，底边即裁切线
            overflow: "hidden",
            height: FONT * 1.35,
            display: "flex",
            alignItems: __scCopy("flex-end")
          },
          children: /* @__PURE__ */jsx2("span", {
            style: {
              display: "inline-block",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 800,
              fontSize: FONT,
              lineHeight: 1.05,
              color: G.ink,
              letterSpacing: 2,
              transform: `translateY(${charY(frame, i)}%)`
            },
            children: c === " " ? "\xA0" : c
          })
        }, i))
      }), /* @__PURE__ */jsx2("div", {
        style: {
          width: 920,
          marginTop: 10,
          display: "flex",
          justifyContent: __scCopy("flex-start")
        },
        children: /* @__PURE__ */jsx2("div", {
          style: {
            height: 2,
            width: `${lineW}%`,
            background: G.bar
          }
        })
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SplitTextStagger;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
