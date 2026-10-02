// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/camera/tension-camera-moves/BulletTimeFreezeOrbit.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/camera/tension-camera-moves/BulletTimeFreezeOrbit.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/camera/tension-camera-moves/BulletTimeFreezeOrbit.tsx

var h = n => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var PANEL_W = __scConfig("demos/camera/tension-camera-moves/BulletTimeFreezeOrbit.tsx#PANEL_W", "PANEL_W", () => 900);
var PANEL_H = __scConfig("demos/camera/tension-camera-moves/BulletTimeFreezeOrbit.tsx#PANEL_H", "PANEL_H", () => 560);
var BAR_COUNT = __scConfig("demos/camera/tension-camera-moves/BulletTimeFreezeOrbit.tsx#BAR_COUNT", "BAR_COUNT", () => 5);
var BulletTimeFreezeOrbit = () => {
  const frame = useCurrentFrame();
  const effFrame = frame < 45 ? frame : frame < 105 ? 45 : 45 + (frame - 105);
  const rotY = frame < 72 ? interpolate(frame, [45, 72], [0, 55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  }) : frame < 82 ? 55 : interpolate(frame, [82, 105], [55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const orbitT = rotY / 55;
  const scale = 1 + 0.12 * orbitT;
  const tx = -170 * Math.sin(orbitT * Math.PI * 0.5) - 60 * orbitT;
  const ty = -24 * orbitT;
  const chartW = PANEL_W - 140;
  const chartH = PANEL_H - 190;
  const barW = 92;
  const gap = (chartW - BAR_COUNT * barW) / (BAR_COUNT - 1);
  const bars = Array.from({
    length: BAR_COUNT
  }).map((_, i) => {
    const full = chartH * (0.42 + h(i + 1) * 0.55);
    const start = 20 + i * 4;
    const end = 48 + i * 3;
    const p = interpolate(effFrame, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic)
    });
    const value = Math.round(full / chartH * 100);
    return {
      hNow: full * p,
      full,
      value,
      done: p >= 1
    };
  });
  const labelOp = interpolate(frame, [118, 128], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const freezeOp = interpolate(frame, [45, 52, 98, 105], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden",
      fontFamily: "Helvetica, Arial, sans-serif"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        top: 56,
        left: 72
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("BULLET TIME"),
        size: 44
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        top: 62,
        right: 84,
        opacity: freezeOp,
        background: G.ink,
        color: G.card,
        fontWeight: 800,
        fontSize: 30,
        letterSpacing: 4,
        padding: __scCopy("12px 26px"),
        borderRadius: 10
      },
      children: __scCopy("FREEZE")
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1600
      },
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          width: PANEL_W,
          height: PANEL_H,
          background: G.card,
          border: `2px solid ${G.border}`,
          borderRadius: 18,
          boxShadow: "0 16px 48px rgba(0,0,0,0.14)",
          boxSizing: "border-box",
          padding: __scCopy("44px 70px"),
          transform: `translateX(${tx}px) translateY(${ty}px) rotateY(${rotY}deg) scale(${scale})`,
          transformStyle: "preserve-3d"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            height: 20,
            width: 260,
            background: G.bar,
            borderRadius: 10,
            marginBottom: 14
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 12,
            width: 170,
            background: G.line,
            borderRadius: 6,
            marginBottom: 30
          }
        }), /* @__PURE__ */jsxs2("div", {
          style: {
            position: "relative",
            width: chartW,
            height: chartH
          },
          children: [[0, 1, 2, 3].map(i => /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              top: chartH / 4 * i,
              height: 2,
              background: G.line
            }
          }, i)), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 3,
              background: G.mid
            }
          }), bars.map((b, i) => /* @__PURE__ */jsxs2("div", {
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: i * (barW + gap),
                bottom: 3,
                width: barW,
                height: b.hNow,
                background: i % 2 === 0 ? G.bar : G.mid,
                borderRadius: __scCopy("8px 8px 0 0")
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: i * (barW + gap),
                bottom: 3 + b.full + 14 - 10 * (1 - labelOp),
                width: barW,
                textAlign: "center",
                fontWeight: 800,
                fontSize: 28,
                color: G.ink,
                opacity: labelOp
              },
              children: b.value
            })]
          }, i))]
        })]
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = BulletTimeFreezeOrbit;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
