// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/cloner-depth-echo/ClonerDepthEcho.tsx
import { useCurrentFrame, interpolate, spring, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/cloner-depth-echo/ClonerDepthEcho.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/cloner-depth-echo/ClonerDepthEcho.tsx

var FPS = __scConfig("demos/ui-entrance/cloner-depth-echo/ClonerDepthEcho.tsx#FPS", "FPS", () => 30);
var N = __scConfig("demos/ui-entrance/cloner-depth-echo/ClonerDepthEcho.tsx#N", "N", () => 7);
var GAP_Z = __scConfig("demos/ui-entrance/cloner-depth-echo/ClonerDepthEcho.tsx#GAP_Z", "GAP_Z", () => 120);
var SPREAD_START = __scConfig("demos/ui-entrance/cloner-depth-echo/ClonerDepthEcho.tsx#SPREAD_START", "SPREAD_START", () => 18);
var HOLD_END = __scConfig("demos/ui-entrance/cloner-depth-echo/ClonerDepthEcho.tsx#HOLD_END", "HOLD_END", () => 18 + 12 + 25);
var MERGE_DUR = 10;
var ClonerDepthEcho = () => {
  const frame = useCurrentFrame();
  const merge = interpolate(frame, [HOLD_END, HOLD_END + MERGE_DUR], [0, 1], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const popS = spring({
    frame: frame - (HOLD_END + MERGE_DUR),
    fps: FPS,
    config: {
      damping: 11,
      stiffness: 200,
      mass: 0.7
    },
    durationInFrames: 18
  });
  const heroScale = frame >= HOLD_END + MERGE_DUR ? 1 + 0.08 * Math.sin(popS * Math.PI) : 1;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      overflow: "hidden",
      position: "relative"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        top: 100,
        width: "100%",
        textAlign: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("CLONER DEPTH ECHO"),
        size: 72
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        perspective: 1600,
        perspectiveOrigin: "58% 46%"
      },
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: 960 - 260,
          top: 540 - 170 + 40,
          transformStyle: "preserve-3d",
          transform: "rotateY(16deg)"
        },
        children: [Array.from({
          length: N
        }, (_, k) => N - k).map(idx => {
          const spread = spring({
            frame: frame - SPREAD_START - (idx - 1) * 1.6,
            fps: FPS,
            config: {
              damping: 14,
              stiffness: 160,
              mass: 0.8
            },
            durationInFrames: 16
          });
          const p = spread * (1 - merge);
          const z = -GAP_Z * idx * p;
          const dx = 64 * idx * p;
          const dy = -34 * idx * p;
          const op = (1 - idx / N * 0.8) * spread * (1 - merge);
          if (op <= 5e-3) return null;
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              transform: `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, ${z.toFixed(2)}px)`,
              opacity: op
            },
            children: /* @__PURE__ */jsx2(Card, {
              w: 520,
              h: 340,
              seed: 3
            })
          }, idx);
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            transform: `translateZ(0px) scale(${heroScale.toFixed(4)})`
          },
          children: /* @__PURE__ */jsx2(Card, {
            w: 520,
            h: 340,
            seed: 3,
            style: {
              boxShadow: "0 10px 36px rgba(31,28,23,0.22)"
            }
          })
        })]
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ClonerDepthEcho;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
