// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/bottom-push-stack-wipe/BottomPushStackWipe.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/bottom-push-stack-wipe/BottomPushStackWipe.tsx
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
var Card = ({
  w,
  h,
  seed = 0,
  style
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: w,
      height: h,
      background: G.card,
      border: `2px solid ${G.border}`,
      borderRadius: 14,
      padding: 18,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      ...style
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 16,
        width: `${titleW}%`,
        background: G.bar,
        borderRadius: 8
      }
    }), Array.from({
      length: lines
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: `${88 - i * 14 - seed % 5 * 3}%`,
        background: G.line,
        borderRadius: 5
      }
    }, i)), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 8,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 13,
          background: G.mid
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 10,
          width: 64,
          background: G.line,
          borderRadius: 5
        }
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/source/demos/transition/bottom-push-stack-wipe/BottomPushStackWipe.tsx

var H = __scConfig("demos/transition/bottom-push-stack-wipe/BottomPushStackWipe.tsx#H", "H", () => 1080);
var CHAPTERS = __scConfig("demos/transition/bottom-push-stack-wipe/BottomPushStackWipe.tsx#CHAPTERS", "CHAPTERS", () => [{
  color: G.bg,
  label: 0
}, {
  color: "#2bac76",
  label: 1
},
// 绿
{
  color: "#36c5f0",
  label: 2
},
// 蓝
{
  color: "#e01e5a",
  label: 3
}
// 粉红
]);
var PUSH_STARTS = __scConfig("demos/transition/bottom-push-stack-wipe/BottomPushStackWipe.tsx#PUSH_STARTS", "PUSH_STARTS", () => [18, 55, 92]);
var PUSH_DUR = 30;
var heavyEaseOut = Easing.bezier(0.12, 0.9, 0.2, 1);
var ChapterScene = ({
  chapter
}) => {
  const c = CHAPTERS[chapter];
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: c.color,
      justifyContent: "center",
      alignItems: "center"
    },
    children: [chapter > 0 && /* @__PURE__ */jsxs2(Fragment, {
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          top: 90,
          left: 120,
          width: 500,
          height: 26,
          borderRadius: 13,
          background: "rgba(255,255,255,0.28)"
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          bottom: 110,
          right: 140,
          width: 340,
          height: 26,
          borderRadius: 13,
          background: "rgba(255,255,255,0.22)"
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          top: 160,
          right: 220,
          width: 90,
          height: 90,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)"
        }
      })]
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        boxShadow: "0 30px 80px rgba(0,0,0,0.28)",
        borderRadius: 18
      },
      children: [/* @__PURE__ */jsxs2("div", {
        style: {
          width: 860,
          background: "#f2f2f0",
          borderRadius: __scCopy("18px 18px 0 0"),
          height: 52,
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: __scCopy("0 22px"),
          boxSizing: "border-box",
          border: `2px solid ${G.border}`,
          borderBottom: "none"
        },
        children: [["#e0605a", "#e8b93e", "#67bb5a"].map((dot, i) => /* @__PURE__ */jsx2("div", {
          style: {
            width: 16,
            height: 16,
            borderRadius: 8,
            background: dot
          }
        }, i)), /* @__PURE__ */jsx2("div", {
          style: {
            marginLeft: 18,
            height: 14,
            width: 220,
            background: G.bar,
            borderRadius: 7
          }
        })]
      }), /* @__PURE__ */jsx2(Card, {
        w: 860,
        h: 430,
        seed: chapter + 2,
        style: {
          borderRadius: __scCopy("0 0 18px 18px"),
          padding: 34
        }
      })]
    })]
  });
};
var BottomPushStackWipe = () => {
  const frame = useCurrentFrame();
  const progress = PUSH_STARTS.map(s => interpolate(frame, [s, s + PUSH_DUR], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: heavyEaseOut
  }));
  return /* @__PURE__ */jsx2(AbsoluteFill, {
    style: {
      overflow: "hidden",
      background: G.bg
    },
    children: CHAPTERS.map((_, i) => {
      const pushedIn = i === 0 ? 1 : progress[i - 1];
      const pushedOut = i < CHAPTERS.length - 1 ? progress[i] : 0;
      const y = (1 - pushedIn) * H - pushedOut * H;
      if (y <= -H || y >= H) return null;
      return /* @__PURE__ */jsxs2(AbsoluteFill, {
        style: {
          transform: `translateY(${y}px)`
        },
        children: [/* @__PURE__ */jsx2(ChapterScene, {
          chapter: i
        }), i > 0 && /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            top: -40,
            left: 0,
            right: 0,
            height: 40,
            background: "linear-gradient(to top, rgba(0,0,0,0.30), rgba(0,0,0,0))",
            opacity: pushedIn < 1 ? 1 : 0
          }
        })]
      }, i);
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = BottomPushStackWipe;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
