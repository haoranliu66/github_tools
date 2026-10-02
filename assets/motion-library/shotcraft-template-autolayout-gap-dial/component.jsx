// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx

var BLOCK_WIDTHS = __scConfig("demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx#BLOCK_WIDTHS", "BLOCK_WIDTHS", () => [230, 190, 265, 210, 245]);
var BLOCK_H = __scConfig("demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx#BLOCK_H", "BLOCK_H", () => 100);
var ROW_Y = __scConfig("demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx#ROW_Y", "ROW_Y", () => 540);
var G_MIN = __scConfig("demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx#G_MIN", "G_MIN", () => 12);
var G_MAX = __scConfig("demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx#G_MAX", "G_MAX", () => 110);
var GROW_START = __scConfig("demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx#GROW_START", "GROW_START", () => 14);
var GROW_END = __scConfig("demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx#GROW_END", "GROW_END", () => 52);
var HOLD_END = __scConfig("demos/interaction/autolayout-gap-dial/AutolayoutGapDial.tsx#HOLD_END", "HOLD_END", () => 66);
var AutolayoutGapDial = () => {
  const frame = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  let gap;
  if (frame < HOLD_END) {
    gap = interpolate(frame, [GROW_START, GROW_END], [G_MIN, G_MAX], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.cubic)
    });
  } else {
    const s = spring({
      frame: frame - HOLD_END,
      fps,
      config: {
        damping: 9,
        stiffness: 80,
        mass: 1.1
      }
    });
    gap = G_MAX + (G_MIN - G_MAX) * s;
  }
  const gapShown = Math.round(gap / 2) * 2;
  const total = BLOCK_WIDTHS.reduce((a, b) => a + b, 0) + gap * (BLOCK_WIDTHS.length - 1);
  const startX = (1920 - total) / 2;
  const xs = [];
  let acc = startX;
  for (const w of BLOCK_WIDTHS) {
    xs.push(acc);
    acc += w + gap;
  }
  const selIn = spring({
    frame: frame - 2,
    fps,
    config: {
      damping: 14,
      stiffness: 130
    }
  });
  const pad = 26;
  const selX = startX - pad;
  const selW = total + pad * 2;
  const selY = ROW_Y - BLOCK_H / 2 - pad;
  const selH = BLOCK_H + pad * 2;
  const ticking = Math.abs(gap - (frame < HOLD_END ? G_MIN : G_MIN)) > 0.5 && frame >= GROW_START && frame < HOLD_END + 40;
  const tickPulse = ticking ? 1 + 0.1 * Math.abs(Math.sin(frame * 0.9)) : 1;
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: G.bg,
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        backgroundImage: `radial-gradient(${G.line} 3px, transparent 3px)`,
        backgroundSize: __scCopy("52px 52px")
      }
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        top: 250,
        width: "100%",
        textAlign: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 44,
        color: G.mid,
        letterSpacing: 2
      },
      children: [__scCopy("GAP"), /* @__PURE__ */jsx2("span", {
        style: {
          display: "inline-block",
          minWidth: 130,
          marginLeft: 24,
          padding: __scCopy("4px 22px"),
          borderRadius: 12,
          background: G.ink,
          color: "#f2f2f0",
          fontVariantNumeric: "tabular-nums",
          transform: `scale(${tickPulse})`
        },
        children: gapShown
      })]
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: selX,
        top: selY,
        width: selW,
        height: selH,
        border: `3px solid ${G.ink}`,
        borderRadius: 6,
        opacity: selIn,
        boxSizing: "border-box"
      },
      children: [[0, 0], [0.5, 0], [1, 0], [0, 0.5], [1, 0.5], [0, 1], [0.5, 1], [1, 1]].map(([hx, hy], i) => /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: `${hx * 100}%`,
          top: `${hy * 100}%`,
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          background: "#fff",
          border: `3px solid ${G.ink}`,
          borderRadius: 3,
          boxSizing: "border-box"
        }
      }, i))
    }), BLOCK_WIDTHS.map((w, i) => /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: xs[i],
        top: ROW_Y - BLOCK_H / 2,
        width: w,
        height: BLOCK_H,
        background: G.card,
        border: `2px solid ${G.border}`,
        borderRadius: 14,
        boxShadow: "0 3px 12px rgba(0,0,0,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          height: 16,
          width: w - 76,
          background: G.bar,
          borderRadius: 8
        }
      })
    }, i)), xs.slice(0, -1).map((x, i) => {
      const gx = x + BLOCK_WIDTHS[i];
      const cy = ROW_Y + BLOCK_H / 2 + 56;
      const badgeOp = interpolate(frame, [8, 16], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      return /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          opacity: badgeOp
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: gx - 1.5,
            top: ROW_Y + BLOCK_H / 2 + 6,
            width: 3,
            height: 62,
            background: G.mid,
            opacity: 0.55
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: gx + gap - 1.5,
            top: ROW_Y + BLOCK_H / 2 + 6,
            width: 3,
            height: 62,
            background: G.mid,
            opacity: 0.55
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: gx,
            top: cy - 1.5,
            width: gap,
            height: 3,
            background: G.ink
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: gx + gap / 2,
            top: cy + 18,
            transform: `translateX(-50%) scale(${tickPulse})`,
            padding: __scCopy("5px 14px"),
            borderRadius: 10,
            background: G.ink,
            color: "#f2f2f0",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
            fontSize: 24,
            fontVariantNumeric: "tabular-nums"
          },
          children: gapShown
        })]
      }, i);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AutolayoutGapDial;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
