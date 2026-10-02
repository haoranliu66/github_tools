// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/fui-hud-moves/LineUnfoldPanel.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/fui-hud-moves/LineUnfoldPanel.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/effects/fui-hud-moves/LineUnfoldPanel.tsx

var PANEL_W = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#PANEL_W", "PANEL_W", () => 760);
var PANEL_H = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#PANEL_H", "PANEL_H", () => 460);
var CX = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#CX", "CX", () => 960);
var CY = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#CY", "CY", () => 540);
var T0 = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#T0", "T0", () => 12);
var LINE_END = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#LINE_END", "LINE_END", () => T0 + 5);
var UNFOLD_END = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#UNFOLD_END", "UNFOLD_END", () => LINE_END + 9);
var CONTENT_END = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#CONTENT_END", "CONTENT_END", () => UNFOLD_END + 8);
var OUT0 = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#OUT0", "OUT0", () => 78);
var COLLAPSE_END = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#COLLAPSE_END", "COLLAPSE_END", () => OUT0 + 7);
var SHRINK_END = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#SHRINK_END", "SHRINK_END", () => COLLAPSE_END + 6);
var OFF = __scConfig("demos/effects/fui-hud-moves/LineUnfoldPanel.tsx#OFF", "OFF", () => SHRINK_END + 4);
var clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
};
var LineUnfoldPanel = () => {
  const frame = useCurrentFrame();
  const inSX = interpolate(frame, [T0, LINE_END], [4e-3, 1], {
    easing: Easing.out(Easing.poly(4)),
    ...clamp
  });
  const inSY = interpolate(frame, [LINE_END, UNFOLD_END], [3 / PANEL_H, 1], {
    easing: Easing.out(Easing.cubic),
    ...clamp
  });
  const contentOp = interpolate(frame, [UNFOLD_END - 3, CONTENT_END], [0, 1], {
    easing: Easing.out(Easing.quad),
    ...clamp
  });
  const outSY = interpolate(frame, [OUT0, COLLAPSE_END], [1, 3 / PANEL_H], {
    easing: Easing.in(Easing.cubic),
    ...clamp
  });
  const outSX = interpolate(frame, [COLLAPSE_END, SHRINK_END], [1, 4e-3], {
    easing: Easing.in(Easing.poly(4)),
    ...clamp
  });
  const contentOutOp = interpolate(frame, [OUT0 - 4, OUT0 + 2], [1, 0], clamp);
  const sx = frame < OUT0 ? inSX : outSX;
  const sy = frame < OUT0 ? inSY : outSY;
  const dotOp = interpolate(frame, [SHRINK_END, OFF], [1, 0], {
    easing: Easing.in(Easing.quad),
    ...clamp
  });
  const alive = frame >= T0 && frame < OFF;
  const isPanel = sy > 0.15;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: "#1c1c1b",
      overflow: "hidden",
      position: "relative"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        top: 120,
        width: "100%",
        textAlign: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 52,
        color: G.mid,
        letterSpacing: 2
      },
      children: __scCopy("LINE UNFOLD PANEL")
    }), alive && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: CX - PANEL_W / 2,
        top: CY - PANEL_H / 2,
        width: PANEL_W,
        height: PANEL_H,
        transform: `scaleX(${sx}) scaleY(${sy})`,
        transformOrigin: "50% 50%",
        opacity: dotOp
      },
      children: isPanel ? /* @__PURE__ */jsxs2(Fragment, {
        children: [/* @__PURE__ */jsx2(Card, {
          w: PANEL_W,
          h: PANEL_H,
          seed: 3,
          style: {
            border: `2px solid ${G.mid}`,
            boxShadow: "0 0 40px rgba(255,255,255,0.18)"
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 2,
            borderRadius: 12,
            background: G.card,
            opacity: 1 - Math.min(contentOp, contentOutOp)
          }
        })]
      }) :
      // 线/点阶段：白色发光条填满整个盒（被 scale 压成线）
      /* @__PURE__ */
      jsx2("div", {
        style: {
          width: "100%",
          height: "100%",
          background: "#ffffff",
          boxShadow: "0 0 60px rgba(255,255,255,0.9)",
          borderRadius: 2
        }
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = LineUnfoldPanel;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
