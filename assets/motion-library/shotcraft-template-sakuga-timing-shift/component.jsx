// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx

var W = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#W", "W", () => 1920);
var CARD_W = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#CARD_W", "CARD_W", () => 420);
var CARD_H = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#CARD_H", "CARD_H", () => 260);
var CARD_Y = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#CARD_Y", "CARD_Y", () => (1080 - CARD_H) / 2);
var X_LEFT = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#X_LEFT", "X_LEFT", () => 120);
var X_RIGHT = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#X_RIGHT", "X_RIGHT", () => 1380);
var X_CENTER = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#X_CENTER", "X_CENTER", () => (W - CARD_W) / 2);
var OVERSHOOT = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#OVERSHOOT", "OVERSHOOT", () => 36);
var SWITCH = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#SWITCH", "SWITCH", () => 48);
var ARRIVE = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#ARRIVE", "ARRIVE", () => 70);
var SETTLE = __scConfig("demos/rhythm/sakuga-timing-shift/SakugaTimingShift.tsx#SETTLE", "SETTLE", () => 75);
var pos1 = t => interpolate(t, [0, SWITCH], [X_LEFT, X_RIGHT], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
});
var pos2 = t => interpolate(t, [SWITCH, ARRIVE, SETTLE], [X_RIGHT, X_CENTER - OVERSHOOT, X_CENTER], {
  easing: Easing.out(Easing.poly(4)),
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
});
var SakugaTimingShift = () => {
  const f = useCurrentFrame();
  const onThrees = f < SWITCH;
  const q = Math.floor(f / 3) * 3;
  const x = onThrees ? pos1(q) : pos2(f);
  const rot = onThrees ? Math.sin(q * 0.7) * 5 : interpolate(f, [SWITCH, SWITCH + 8], [Math.sin(SWITCH * 0.7) * 5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const v = onThrees ? 0 : Math.abs(pos2(f) - pos2(f - 1));
  const sFac = Math.min(v / 55, 1);
  const stretchX = 1 + 0.35 * sFac;
  const stretchY = 1 - 0.12 * sFac;
  const sqX = interpolate(f, [SETTLE - 3, SETTLE, SETTLE + 3], [1, 0.9, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const sqY = interpolate(f, [SETTLE - 3, SETTLE, SETTLE + 3], [1, 1.07, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const ghosts = !onThrees && f > SWITCH + 1 && f < ARRIVE + 2 && sFac > 0.15 ? [{
    xg: pos2(f - 2),
    op: 0.28 * sFac
  }, {
    xg: pos2(f - 4),
    op: 0.13 * sFac
  }] : [];
  const h = n => {
    const s = Math.sin(n * 127.3) * 43758.5453;
    return s - Math.floor(s);
  };
  const qb = Math.min(Math.floor(f / 4) * 4, 108);
  const bx = (h(qb + 1) - 0.5) * 7;
  const by = (h(qb + 2) - 0.5) * 7;
  const brot = (h(qb + 3) - 0.5) * 3;
  const pop = interpolate(f, [SWITCH, SWITCH + 3, SWITCH + 9], [1, 1.35, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const titleOp = interpolate(f, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
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
        top: 90,
        width: "100%",
        textAlign: "center",
        opacity: titleOp
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("SAKUGA TIMING SHIFT"),
        size: 64
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 100,
        right: 100,
        top: CARD_Y + CARD_H + 24,
        height: 3,
        background: G.line,
        borderRadius: 2
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: X_CENTER,
        top: CARD_Y,
        width: CARD_W,
        height: CARD_H,
        border: `3px dashed ${G.bar}`,
        borderRadius: 14,
        boxSizing: "border-box"
      }
    }), ghosts.map((g, i) => /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: CARD_Y,
        opacity: g.op,
        transform: `translateX(${g.xg}px)`
      },
      children: /* @__PURE__ */jsx2(Card, {
        w: CARD_W,
        h: CARD_H,
        seed: 4
      })
    }, `ghost-${i}`)), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: CARD_Y,
        transform: `translateX(${x}px) rotate(${rot}deg) scaleX(${stretchX * sqX}) scaleY(${stretchY * sqY})`,
        transformOrigin: "50% 50%"
      },
      children: /* @__PURE__ */jsx2(Card, {
        w: CARD_W,
        h: CARD_H,
        seed: 4
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 120,
        top: 160,
        transform: `translate(${bx}px, ${by}px) rotate(${brot}deg) scale(${pop})`,
        transformOrigin: "0% 50%",
        fontFamily: "Courier New, monospace",
        fontWeight: 700,
        fontSize: 84,
        color: G.ink,
        borderBottom: `6px solid ${G.ink}`,
        paddingBottom: 6
      },
      children: onThrees ? __scCopy("on 3s") : __scCopy("on 1s")
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SakugaTimingShift;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
