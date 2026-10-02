// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/pill-chip-slot-cycle-handled/PillChipSlotCycleHandled.tsx
import { useLayoutEffect, useRef, useState } from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/pill-chip-slot-cycle-handled/PillChipSlotCycleHandled.tsx
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
var lerp = (t, a, b) => a + (b - a) * t;
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

// implementation/video-shotcraft/full/stage/source/demos/typography/pill-chip-slot-cycle-handled/PillChipSlotCycleHandled.tsx

var PILL_CHIP_SLOT_CYCLE_HANDLED_DURATION = 150;
var WORDS = __scConfig("demos/typography/pill-chip-slot-cycle-handled/PillChipSlotCycleHandled.tsx#WORDS", "WORDS", () => [{
  w: __scCopy("Sales"),
  e: "\u26A1"
}, {
  w: __scCopy("Workflow"),
  e: "\u{1F4C8}"
}, {
  w: __scCopy("Admin"),
  e: "\u2699\uFE0F"
}, {
  w: __scCopy("Reports"),
  e: "\u{1F4C4}"
}]);
var FONT = __scConfig("demos/typography/pill-chip-slot-cycle-handled/PillChipSlotCycleHandled.tsx#FONT", "FONT", () => "700 22px -apple-system,system-ui,sans-serif");
var FALLBACK_WIDTHS = __scConfig("demos/typography/pill-chip-slot-cycle-handled/PillChipSlotCycleHandled.tsx#FALLBACK_WIDTHS", "FALLBACK_WIDTHS", () => WORDS.map(o => o.w.length * 13 + 74));
var SIDE = __scConfig("demos/typography/pill-chip-slot-cycle-handled/PillChipSlotCycleHandled.tsx#SIDE", "SIDE", () => ({
  color: "#15171d",
  fontWeight: 800,
  fontSize: 30,
  letterSpacing: -0.5,
  flex: "none"
}));
var PillChipSlotCycleHandled = () => {
  const t = useT();
  const measRef = useRef(null);
  const [widths, setWidths] = useState(FALLBACK_WIDTHS);
  useLayoutEffect(() => {
    const spans = measRef.current?.children;
    if (!spans) return;
    setWidths(WORDS.map((o, i) => (spans[i].offsetWidth || o.w.length * 13) + 74));
  }, []);
  let pos = 0;
  for (const s0 of [0.25, 0.47, 0.69]) pos += seg(t, s0, s0 + 0.12, E.inOutCubic);
  const ci = Math.min(WORDS.length - 1, Math.floor(pos));
  const frac = pos - ci;
  const chipW = lerp(frac, widths[ci], widths[Math.min(ci + 1, WORDS.length - 1)]);
  const near = Math.round(pos);
  const roll = (pos - near) * 48 * 0.5;
  const settle = 1 - Math.min(1, Math.abs(pos - near) * 3);
  const ghost = top => ({
    position: "absolute",
    left: "50%",
    top,
    font: FONT,
    color: "#15171d",
    whiteSpace: "nowrap",
    transform: `translateX(-50%) translateY(${-roll}px)`,
    opacity: 0.13 * (0.4 + settle * 0.6)
  });
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#fbfbfd",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "-apple-system,system-ui,sans-serif"
      },
      children: [/* @__PURE__ */jsx2("div", {
        ref: measRef,
        style: {
          position: "absolute",
          visibility: "hidden"
        },
        children: WORDS.map(o => /* @__PURE__ */jsx2("span", {
          style: {
            whiteSpace: "nowrap",
            font: FONT
          },
          children: o.w
        }, o.w))
      }), /* @__PURE__ */jsx2("div", {
        style: SIDE,
        children: __scCopy("Your")
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "relative",
          flex: "none"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "relative",
            height: 48,
            width: chipW,
            margin: __scCopy("0 14px"),
            flex: "none",
            borderRadius: 99,
            background: "#1a1c24",
            boxShadow: "0 8px 24px rgba(20,22,40,.22)",
            overflow: "hidden"
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              transform: `translateY(${-pos * 48}px)`
            },
            children: WORDS.map(({
              w,
              e
            }) => /* @__PURE__ */jsxs("div", {
              style: {
                height: 48,
                display: "flex",
                alignItems: "center",
                gap: 9,
                paddingLeft: 18,
                whiteSpace: "nowrap"
              },
              children: [/* @__PURE__ */jsx2("span", {
                style: {
                  fontSize: 18
                },
                children: e
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  font: FONT,
                  color: "#fff"
                },
                children: w
              })]
            }, w))
          })
        }), /* @__PURE__ */jsx2("div", {
          style: ghost(-38),
          children: near > 0 ? WORDS[near - 1].w : ""
        }), /* @__PURE__ */jsx2("div", {
          style: ghost(58),
          children: near < WORDS.length - 1 ? WORDS[near + 1].w : ""
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: SIDE,
        children: __scCopy("Handled")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PillChipSlotCycleHandled;
 return {component:template_entry_default,duration:PILL_CHIP_SLOT_CYCLE_HANDLED_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
