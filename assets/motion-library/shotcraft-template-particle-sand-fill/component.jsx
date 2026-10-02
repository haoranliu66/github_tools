// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/particle-sand-fill/ParticleSandFill.tsx
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/particle-sand-fill/ParticleSandFill.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/particle-sand-fill/ParticleSandFill.tsx

var AMBER = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#AMBER", "AMBER", () => "#b45309");
var frac = x => x - Math.floor(x);
var rnd = (i, salt) => frac(Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453);
var CARD = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#CARD", "CARD", () => ({
  x: 460,
  y: 300,
  w: 1e3,
  h: 560
}));
var PLOT_BOTTOM = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#PLOT_BOTTOM", "PLOT_BOTTOM", () => CARD.y + CARD.h - 70);
var GRAIN = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#GRAIN", "GRAIN", () => 14);
var PER_LAYER = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#PER_LAYER", "PER_LAYER", () => 9);
var BAR_W = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#BAR_W", "BAR_W", () => GRAIN * PER_LAYER);
var DROP_FROM = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#DROP_FROM", "DROP_FROM", () => 230);
var GRAV = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#GRAV", "GRAV", () => 1.6);
var STAGGER = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#STAGGER", "STAGGER", () => 6);
var RATE = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#RATE", "RATE", () => 0.28);
var BARS = __scConfig("demos/data/particle-sand-fill/ParticleSandFill.tsx#BARS", "BARS", () => [{
  cx: CARD.x + 175,
  h: 238,
  label: "238"
}, {
  cx: CARD.x + 395,
  h: 336,
  label: "336"
}, {
  cx: CARD.x + 615,
  h: 182,
  label: "182"
}, {
  cx: CARD.x + 835,
  h: 294,
  label: "294"
}].map(b => ({
  ...b,
  layers: Math.round(b.h / GRAIN),
  n: Math.round(b.h / GRAIN) * PER_LAYER
})));
var fallTime = dist => Math.sqrt(2 * dist / GRAV);
var departOf = (bar, i) => 8 + bar * STAGGER + i * RATE + rnd(i, bar * 7 + 1) * 1.5;
var ParticleSandFill = () => {
  const frame = useCurrentFrame();
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
        top: 110,
        width: "100%",
        textAlign: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("PARTICLE SAND FILL"),
        size: 72
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: CARD.x,
        top: CARD.y,
        width: CARD.w,
        height: CARD.h,
        background: G.card,
        border: `2px solid ${G.border}`,
        borderRadius: 14,
        boxSizing: "border-box",
        padding: 28,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 14,
          width: 260,
          background: G.bar,
          borderRadius: 7
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 10,
          width: 160,
          background: G.line,
          borderRadius: 5,
          marginTop: 10
        }
      })]
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: CARD.x + 40,
        top: PLOT_BOTTOM,
        width: CARD.w - 80,
        height: 3,
        background: G.line
      }
    }), BARS.map((bar, b) => {
      const left = bar.cx - BAR_W / 2;
      const lastLand = departOf(b, bar.n - 1) + fallTime(DROP_FROM);
      const doneAt = lastLand + 7;
      const solidOp = interpolate(frame, [doneAt, doneAt + 10], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      const labelScale = interpolate(frame, [doneAt + 6, doneAt + 18], [0, 1], {
        easing: Easing.out(Easing.back(2.2)),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      return /* @__PURE__ */jsxs2(React.Fragment, {
        children: [solidOp > 0 && /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left,
            top: PLOT_BOTTOM - bar.h,
            width: BAR_W,
            height: bar.h,
            background: b === 1 ? AMBER : G.bar,
            borderRadius: __scCopy("6px 6px 0 0"),
            opacity: solidOp
          }
        }), labelScale > 0 && /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: bar.cx - 70,
            top: PLOT_BOTTOM - bar.h - 62,
            width: 140,
            textAlign: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 46,
            color: b === 1 ? AMBER : G.ink,
            transform: `scale(${labelScale})`
          },
          children: bar.label
        }), solidOp < 1 && Array.from({
          length: bar.n
        }).map((_, i) => {
          const depart = departOf(b, i);
          const age = frame - depart;
          if (age <= 0) return null;
          const layer = Math.floor(i / PER_LAYER);
          const col = i % PER_LAYER;
          const targetTop = PLOT_BOTTOM - (layer + 1) * GRAIN;
          const startTop = targetTop - DROP_FROM - rnd(i, b * 13 + 3) * 70;
          const dist = targetTop - startTop;
          const tLand = fallTime(dist);
          let top;
          if (age < tLand) {
            top = startTop + 0.5 * GRAV * age * age;
          } else {
            const ba = age - tLand;
            const bounce = ba < 6 ? Math.sin(ba / 6 * Math.PI) * GRAIN * 2 * 0.15 * (1 + rnd(i, b * 13 + 9)) : 0;
            top = targetTop - bounce;
          }
          const amber = b === 1 || rnd(i, b * 13 + 7) < 0.18;
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: left + col * GRAIN + 1,
              top,
              width: GRAIN - 2,
              height: GRAIN - 2,
              background: amber ? AMBER : G.mid,
              opacity: 1 - solidOp,
              borderRadius: 2
            }
          }, i);
        })]
      }, b);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ParticleSandFill;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
