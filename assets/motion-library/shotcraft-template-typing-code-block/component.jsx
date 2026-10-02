// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/typing-code-block/TypingCodeBlock.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var E = __scConfig("demos/_fixtures/Motion.tsx#E", "E", () => ({
  linear: t => t,
  inQuad: t => t * t,
  outQuad: t => t * (2 - t),
  inOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic: t => t * t * t,
  outCubic: t => 1 - Math.pow(1 - t, 3),
  inOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outQuart: t => 1 - Math.pow(1 - t, 4),
  outQuint: t => 1 - Math.pow(1 - t, 5),
  inQuart: t => t * t * t * t,
  outExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inExpo: t => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
  outBack: (t, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
  inBack: (t, s = 1.70158) => (s + 1) * t * t * t - s * t * t,
  outElastic: t => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1,
  spring: (t, bounce = 0.25) => {
    const w = 8 + 8 * (1 - bounce);
    return 1 - Math.exp(-6 * t) * Math.cos(w * t * bounce * 2.2);
  }
}));
var seg = (t, t0, t1, ease = E.linear) => ease(Math.min(1, Math.max(0, (t - t0) / (t1 - t0))));
var useT = () => {
  const frame = useCurrentFrame();
  const {
    durationInFrames
  } = useVideoConfig();
  return Math.min(1, frame / Math.max(1, durationInFrames - 1));
};
var DesignStage = ({
  w = 480,
  h = 270,
  bg,
  raster = __scCopy("scale"),
  children
}) => {
  const {
    width
  } = useVideoConfig();
  const scale = width / w;
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: bg ?? "#000",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: w,
        height: h,
        overflow: "hidden",
        ...(raster === "zoom" ? {
          zoom: scale
        } : {
          transform: `scale(${scale})`,
          transformOrigin: __scCopy("top left")
        })
      },
      children
    })
  });
};

// implementation/video-shotcraft/full/stage/source/demos/typography/typing-code-block/TypingCodeBlock.tsx

var TYPING_CODE_BLOCK_DURATION = 138;
var K = __scConfig("demos/typography/typing-code-block/TypingCodeBlock.tsx#K", "K", () => "#c792ea");
var ID = __scConfig("demos/typography/typing-code-block/TypingCodeBlock.tsx#ID", "ID", () => "#e8eaf0");
var FN = __scConfig("demos/typography/typing-code-block/TypingCodeBlock.tsx#FN", "FN", () => "#82aaff");
var ST = __scConfig("demos/typography/typing-code-block/TypingCodeBlock.tsx#ST", "ST", () => "#c3e88d");
var PU = __scConfig("demos/typography/typing-code-block/TypingCodeBlock.tsx#PU", "PU", () => "#89ddff");
var CM = __scConfig("demos/typography/typing-code-block/TypingCodeBlock.tsx#CM", "CM", () => "#546e7a");
var LINES = __scConfig("demos/typography/typing-code-block/TypingCodeBlock.tsx#LINES", "LINES", () => [[[__scCopy("const "), K], [__scCopy("app"), ID], [" = ", PU], [__scCopy("createApp"), FN], ["();", ID]], [[__scCopy("app"), ID], [".", PU], [__scCopy("use"), FN], ["(", ID], [__scCopy("router"), ID], [");", ID]], [[__scCopy("app"), ID], [".", PU], [__scCopy("mount"), FN], ["(", ID], ["'#root'", ST], [");", ID]], [["// ready", CM]]]);
var FLAT = __scConfig("demos/typography/typing-code-block/TypingCodeBlock.tsx#FLAT", "FLAT", () => []);
LINES.forEach((line, row) => {
  for (const [txt, color] of line) for (const ch of txt) FLAT.push({
    ch,
    color,
    row
  });
});
var Panel = ({
  x,
  label,
  children
}) => /* @__PURE__ */jsxs("div", {
  style: {
    position: "absolute",
    left: `${x}%`,
    top: "14%",
    width: "45%",
    height: "72%",
    background: "#10121a",
    border: "1px solid #1c2030",
    borderRadius: 8,
    padding: __scCopy("10px 12px"),
    boxSizing: "border-box",
    fontFamily: '"SF Mono",Menlo,monospace',
    fontSize: 12,
    lineHeight: 1.9
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      fontSize: 8,
      letterSpacing: 2,
      color: "#4a5270",
      marginBottom: 6
    },
    children: label
  }), children]
});
var TypingCodeBlock = () => {
  const t = useT();
  const typed = Math.floor(seg(t, 0.08, 0.9) * FLAT.length);
  return /* @__PURE__ */jsxs(DesignStage, {
    bg: "#0a0b10",
    children: [/* @__PURE__ */jsx2(Panel, {
      x: 3.5,
      label: __scCopy("LINE FADE-IN"),
      children: LINES.map((line, i) => {
        const k = seg(t, 0.08 + i * 0.14, 0.08 + i * 0.14 + 0.3, E.outCubic);
        return /* @__PURE__ */jsx2("div", {
          style: {
            opacity: k,
            transform: `translateY(${(1 - k) * 8}px)`
          },
          children: line.map(([txt, color], j) => /* @__PURE__ */jsx2("span", {
            style: {
              color
            },
            children: txt
          }, j))
        }, i);
      })
    }), /* @__PURE__ */jsx2(Panel, {
      x: 51.5,
      label: __scCopy("CHAR TYPING"),
      children: LINES.map((_, row) => /* @__PURE__ */jsx2("div", {
        style: {
          minHeight: __scCopy("1.9em")
        },
        children: FLAT.map((c, i) => c.row === row ? /* @__PURE__ */jsx2("span", {
          style: {
            color: c.color,
            // 光标位字符以底色块形式提示（保持可见）
            opacity: i < typed || i === typed ? 1 : 0,
            background: i === typed && typed < FLAT.length ? "#3a4468" : "transparent"
          },
          children: c.ch
        }, i) : null)
      }, row))
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = TypingCodeBlock;
 return {component:template_entry_default,duration:TYPING_CODE_BLOCK_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
