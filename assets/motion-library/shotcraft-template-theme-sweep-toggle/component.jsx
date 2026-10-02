// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx
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
 var CL = __scConfig("demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx#CL", "CL", () => ({
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
}));
var LIGHT = __scConfig("demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx#LIGHT", "LIGHT", () => ({
  bg: "#ececea",
  panel: "#f7f7f6",
  line: "#dcdcda",
  bar: "#c2c2c0",
  mid: "#8f8f8d",
  card: "#ffffff",
  border: "#d8d8d6",
  side: "#3a3a3a",
  sideBar: "#5a5a58"
}));
var DARK = __scConfig("demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx#DARK", "DARK", () => ({
  bg: "#1c1c1b",
  panel: "#242423",
  line: "#3a3a38",
  bar: "#6e6e6c",
  mid: "#8f8f8d",
  card: "#2c2c2b",
  border: "#454543",
  side: "#0f0f0e",
  sideBar: "#6a6a68"
}));
var Dash = ({
  p
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: 1920,
    height: 1080,
    background: p.bg,
    display: "flex"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      width: 220,
      background: p.side,
      padding: __scCopy("28px 22px"),
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 18
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: p.sideBar
      }
    }), Array.from({
      length: 7
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 12,
        width: `${60 + i * 29 % 35}%`,
        background: p.sideBar,
        borderRadius: 6
      }
    }, i))]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        height: 72,
        background: p.panel,
        borderBottom: `2px solid ${p.line}`,
        display: "flex",
        alignItems: "center",
        padding: __scCopy("0 32px"),
        gap: 20,
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          height: 18,
          width: 180,
          background: p.bar,
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          marginLeft: "auto",
          height: 36,
          width: 320,
          background: p.card,
          border: `2px solid ${p.line}`,
          borderRadius: 18,
          boxSizing: "border-box"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 18,
          background: p.mid
        }
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        flex: 1,
        padding: 36,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: __scCopy("1fr"),
        gap: 28,
        boxSizing: "border-box"
      },
      children: Array.from({
        length: 6
      }).map((_, i) => {
        const titleW = 45 + (i + 1) * 37 % 40;
        const lines = 2 + (i + 1) % 3;
        return /* @__PURE__ */jsxs("div", {
          style: {
            background: p.card,
            border: `2px solid ${p.border}`,
            borderRadius: 14,
            padding: 18,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 10
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              height: 16,
              width: `${titleW}%`,
              background: p.bar,
              borderRadius: 8
            }
          }), Array.from({
            length: lines
          }).map((_2, j) => /* @__PURE__ */jsx("div", {
            style: {
              height: 10,
              width: `${88 - j * 14 - (i + 1) % 5 * 3}%`,
              background: p.line,
              borderRadius: 5
            }
          }, j)), /* @__PURE__ */jsxs("div", {
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
                background: p.mid
              }
            }), /* @__PURE__ */jsx("div", {
              style: {
                height: 10,
                width: 64,
                background: p.line,
                borderRadius: 5
              }
            })]
          })]
        }, i);
      })
    })]
  })]
});
var SWEEP0 = __scConfig("demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx#SWEEP0", "SWEEP0", () => 14);
var SWEEP1 = __scConfig("demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx#SWEEP1", "SWEEP1", () => 52);
var SETTLE0 = __scConfig("demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx#SETTLE0", "SETTLE0", () => 52);
var SETTLE1 = __scConfig("demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx#SETTLE1", "SETTLE1", () => 64);
var SLANT = __scConfig("demos/interaction/theme-switch-moves/ThemeSweepToggle.tsx#SLANT", "SLANT", () => 1080 * Math.tan(15 * Math.PI / 180));
var ThemeSweepToggle = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [SWEEP0, SWEEP1], [-20, 1920 + SLANT + 40], {
    easing: Easing.out(Easing.poly(3)),
    ...CL
  });
  const settle = interpolate(frame, [SETTLE0, SETTLE0 + 1, SETTLE1], [1, 0.995, 1], {
    easing: Easing.out(Easing.cubic),
    ...CL
  });
  const lineOp = interpolate(frame, [SWEEP0, SWEEP0 + 4, SWEEP1 - 4, SWEEP1 + 2], [0, 1, 1, 0], CL);
  const sweeping = frame >= SWEEP0 && frame < SWEEP1 + 2;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: 1920,
      height: 1080,
      position: "relative",
      overflow: "hidden",
      background: LIGHT.bg
    },
    children: [/* @__PURE__ */jsx(Dash, {
      p: LIGHT
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        inset: 0,
        clipPath: `polygon(0 0, ${p}px 0, ${p - SLANT}px 1080px, 0 1080px)`,
        transform: `scale(${settle})`,
        transformOrigin: "50% 50%"
      },
      children: /* @__PURE__ */jsx(Dash, {
        p: DARK
      })
    }), sweeping && /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: p - SLANT / 2 - 2,
        top: 540 - 620,
        width: 4,
        height: 1240,
        background: "#ffffff",
        boxShadow: "0 0 18px 4px rgba(255,255,255,0.75)",
        transform: "rotate(15deg)",
        transformOrigin: "50% 50%",
        opacity: lineOp
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ThemeSweepToggle;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
