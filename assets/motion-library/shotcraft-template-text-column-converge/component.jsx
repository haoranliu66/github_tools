// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/text-column-converge/TextColumnConverge.tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
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
 var STEPS = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#STEPS", "STEPS", () => [{
  word: __scCopy("LAUNCHER DESIGN"),
  dur: 16
}, {
  word: __scCopy("COMPACT MODE"),
  dur: 12
}, {
  word: __scCopy("HOTKEY RECORDER"),
  dur: 9
}, {
  word: __scCopy("HOTKEY TYPES"),
  dur: 8
}, {
  word: __scCopy("VOICE FEATURES"),
  dur: 7
}, {
  word: __scCopy("SETTINGS DESIGN"),
  dur: 8
}, {
  word: __scCopy("AI CHAT"),
  dur: 10
}, {
  word: __scCopy("FILE SEARCH"),
  dur: 12
}, {
  word: __scCopy("RAYCAST"),
  dur: 999
}
// 最后一词：停稳后触发唯一一次合拢
]);
var START = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#START", "START", () => 8);
var NEW_LEFT_EDGE = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#NEW_LEFT_EDGE", "NEW_LEFT_EDGE", () => 618);
var WORD_RIGHT_EDGE = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#WORD_RIGHT_EDGE", "WORD_RIGHT_EDGE", () => 1302);
var FS = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#FS", "FS", () => 42);
var LSP = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#LSP", "LSP", () => 3);
var ADV = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#ADV", "ADV", () => 0.6 * FS + LSP);
var LINE_W = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#LINE_W", "LINE_W", () => (__scCopy("NEW").length + 1 + STEPS[STEPS.length - 1].word.length) * ADV);
var MERGED_LEFT = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#MERGED_LEFT", "MERGED_LEFT", () => 960 - LINE_W / 2);
var MERGED_RIGHT = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#MERGED_RIGHT", "MERGED_RIGHT", () => 960 + LINE_W / 2);
var CONVERGE_DUR = 36;
var CONVERGE_DELAY = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#CONVERGE_DELAY", "CONVERGE_DELAY", () => 10);
var SUB_DELAY = __scConfig("demos/typography/text-column-converge/TextColumnConverge.tsx#SUB_DELAY", "SUB_DELAY", () => 18);
var TextColumnConverge = () => {
  const f = useCurrentFrame();
  const t = f - START;
  let acc = 0;
  let idx = 0;
  let stepStart = 0;
  for (let i = 0; i < STEPS.length; i++) {
    if (t >= acc) {
      idx = i;
      stepStart = acc;
    }
    acc += STEPS[i].dur;
  }
  const cur = STEPS[idx];
  const isLast = idx === STEPS.length - 1;
  const local = t - stepStart;
  const cvT = isLast ? local - CONVERGE_DELAY : -1;
  const cv = interpolate(cvT, [0, CONVERGE_DUR], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const newLeft = interpolate(cv, [0, 1], [NEW_LEFT_EDGE, MERGED_LEFT]);
  const wordRight = interpolate(cv, [0, 1], [WORD_RIGHT_EDGE, MERGED_RIGHT]);
  const converged = cv >= 1;
  const subT = converged ? cvT - CONVERGE_DUR - SUB_DELAY : -1;
  const subOp = interpolate(subT, [0, 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const visible = t >= 0;
  const font = {
    fontFamily: '"SF Mono", Menlo, monospace',
    fontWeight: 500,
    fontSize: FS,
    letterSpacing: 3,
    color: "#f2f2f4",
    whiteSpace: "nowrap",
    lineHeight: 1
  };
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: "#050506",
      overflow: "hidden"
    },
    children: visible && /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          ...font,
          position: "absolute",
          left: newLeft,
          top: 519
        },
        children: __scCopy("NEW")
      }), /* @__PURE__ */jsx("div", {
        style: {
          ...font,
          position: "absolute",
          right: 1920 - wordRight,
          top: 519
        },
        children: cur.word
      }), /* @__PURE__ */jsx("div", {
        style: {
          ...font,
          fontStyle: "italic",
          color: "#d8d8dc",
          position: "absolute",
          left: MERGED_LEFT,
          top: 519 + FS + 14,
          opacity: subOp
        },
        children: __scCopy("COMING 2026")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = TextColumnConverge;
 return {component:template_entry_default,duration:180};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
