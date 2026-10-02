// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx

var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var AX = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#AX", "AX", () => 520);
var AY = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#AY", "AY", () => 560);
var BX = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#BX", "BX", () => 3200);
var BY = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#BY", "BY", () => 600);
var WIN_W = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#WIN_W", "WIN_W", () => 760);
var WIN_H = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#WIN_H", "WIN_H", () => 500);
var P0 = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#P0", "P0", () => ({
  x: AX + 300,
  y: AY + 150
}));
var P1 = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#P1", "P1", () => ({
  x: 1250,
  y: -80
}));
var P2 = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#P2", "P2", () => ({
  x: 2500,
  y: 300
}));
var P3 = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#P3", "P3", () => ({
  x: BX - 470,
  y: BY + 20
}));
var bez = t => {
  const u = 1 - t;
  return {
    x: u * u * u * P0.x + 3 * u * u * t * P1.x + 3 * u * t * t * P2.x + t * t * t * P3.x,
    y: u * u * u * P0.y + 3 * u * u * t * P1.y + 3 * u * t * t * P2.y + t * t * t * P3.y
  };
};
var CLICK = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#CLICK", "CLICK", () => 12);
var ZOOM_OUT = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#ZOOM_OUT", "ZOOM_OUT", () => [16, 42]);
var FLY = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#FLY", "FLY", () => [34, 104]);
var TAKEOVER = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#TAKEOVER", "TAKEOVER", () => [112, 146]);
var PROPS = __scConfig("demos/transition/paper-plane-messenger/PaperPlaneMessenger.tsx#PROPS", "PROPS", () => (() => {
  const rng = mulberry32(42);
  const out = [];
  const depths = [0.45, 0.75, 1.3];
  for (let i = 0; i < 16; i++) {
    const depth = depths[i % 3];
    out.push({
      x: 500 + rng() * 2800,
      y: -150 + rng() * 1350,
      size: depth < 0.6 ? 60 + rng() * 70 : depth < 1 ? 110 + rng() * 100 : 220 + rng() * 160,
      ring: rng() > 0.45,
      depth,
      drift: rng() * Math.PI * 2
    });
  }
  return out;
})());
var Window = ({
  cx,
  cy,
  seed,
  sendBtn,
  btnPulse = 0
}) => /* @__PURE__ */jsxs2("div", {
  style: {
    position: "absolute",
    left: cx - WIN_W / 2,
    top: cy - WIN_H / 2,
    width: WIN_W,
    height: WIN_H,
    borderRadius: 18,
    background: "#fff",
    border: `2px solid ${G.border}`,
    boxShadow: "0 40px 100px rgba(0,0,0,0.30)",
    boxSizing: "border-box",
    overflow: "hidden"
  },
  children: [/* @__PURE__ */jsxs2("div", {
    style: {
      height: 54,
      background: "#f2f2f0",
      borderBottom: `2px solid ${G.line}`,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: __scCopy("0 20px"),
      boxSizing: "border-box"
    },
    children: [[0, 1, 2].map(i => /* @__PURE__ */jsx2("div", {
      style: {
        width: 15,
        height: 15,
        borderRadius: 8,
        background: G.bar
      }
    }, i)), /* @__PURE__ */jsx2("div", {
      style: {
        marginLeft: 14,
        height: 13,
        width: 200,
        background: G.bar,
        borderRadius: 7
      }
    })]
  }), /* @__PURE__ */jsxs2("div", {
    style: {
      padding: 26,
      display: "flex",
      flexDirection: "column",
      gap: 16
    },
    children: [/* @__PURE__ */jsx2(Card, {
      w: WIN_W - 56,
      h: 250,
      seed,
      style: {
        boxShadow: "none"
      }
    }), sendBtn && /* @__PURE__ */jsx2("div", {
      style: {
        alignSelf: __scCopy("flex-end"),
        transform: `scale(${1 + btnPulse * 0.22})`,
        padding: __scCopy("16px 46px"),
        borderRadius: 12,
        background: G.ink,
        color: "#fff",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 30,
        boxShadow: btnPulse > 0 ? `0 0 0 ${btnPulse * 22}px rgba(47,47,47,0.18)` : "none"
      },
      children: __scCopy("Send \u27A4")
    })]
  })]
});
var Plane = ({
  x,
  y,
  angle,
  scale,
  opacity
}) => /* @__PURE__ */jsxs2("svg", {
  width: 180,
  height: 110,
  viewBox: "0 0 180 110",
  style: {
    position: "absolute",
    left: x - 90,
    top: y - 55,
    transform: `rotate(${angle}deg) scale(${scale})`,
    overflow: "visible",
    opacity
  },
  children: [/* @__PURE__ */jsx2("polygon", {
    points: "176,30 6,4 62,66",
    fill: "#ffffff",
    stroke: "#b8b8b6",
    strokeWidth: 3
  }), /* @__PURE__ */jsx2("polygon", {
    points: "176,30 62,66 78,102",
    fill: "#d4d4d2",
    stroke: "#b8b8b6",
    strokeWidth: 3
  }), /* @__PURE__ */jsx2("polygon", {
    points: "176,30 6,4 50,44",
    fill: "#efefed",
    stroke: "#c6c6c4",
    strokeWidth: 2
  })]
});
var PaperPlaneMessenger = () => {
  const frame = useCurrentFrame();
  const tFly = interpolate(frame, [FLY[0], FLY[1]], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0.05, 0.25, 1)
  });
  const pos = bez(tFly);
  const posNext = bez(Math.min(tFly + 0.012, 1));
  const angle = Math.atan2(posNext.y - pos.y, posNext.x - pos.x) * (180 / Math.PI);
  const zoomOutP = interpolate(frame, [ZOOM_OUT[0], ZOOM_OUT[1]], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const takeP = interpolate(frame, [TAKEOVER[0], TAKEOVER[1]], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const followW = interpolate(frame, [ZOOM_OUT[0], ZOOM_OUT[1]], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  let cx = AX + (pos.x - AX) * followW;
  let cy = (AY + (pos.y - AY) * followW) * (1 - takeP) + 0;
  cy = AY + (Math.max(pos.y, 150) - AY) * followW;
  cx = cx * (1 - takeP) + BX * takeP;
  cy = cy * (1 - takeP) + BY * takeP;
  const zBase = 1.55 + (0.62 - 1.55) * zoomOutP;
  const zTake = 0.62 + (3.1 - 0.62) * takeP;
  const z = frame < TAKEOVER[0] ? zBase : zTake;
  const camX = (wx, d) => 960 + (wx - cx) * z * d;
  const camY = (wy, d) => 540 + (wy - cy) * z * d;
  const btnPulse = interpolate(frame, [CLICK, CLICK + 3, CLICK + 12], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
  const planeVisible = frame >= FLY[0] - 2;
  const flightBoost = interpolate(tFly, [0, 0.25, 0.75, 1], [1, 1.7, 1.7, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const planeScale = interpolate(frame, [FLY[0] - 2, FLY[0] + 8], [0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.6))
  }) * flightBoost;
  const planeOpacity = interpolate(takeP, [0, 0.35], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: "linear-gradient(160deg, #e9e9e7 0%, #dcdcda 100%)",
      overflow: "hidden"
    },
    children: [PROPS.filter(p => p.depth < 1).map((p, i) => {
      const wob = Math.sin(frame * 0.035 + p.drift) * 14;
      const x = camX(p.x, p.depth) + wob;
      const y = camY(p.y, p.depth) + Math.cos(frame * 0.03 + p.drift) * 10;
      const s = p.size * z * p.depth;
      const fade = interpolate(takeP, [0.3, 0.9], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      return /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: x - s / 2,
          top: y - s / 2,
          width: s,
          height: s,
          opacity: (p.depth < 0.6 ? 0.5 : 0.75) * fade,
          borderRadius: p.ring ? "50%" : 14,
          background: p.ring ? "transparent" : "#c9c9c7",
          border: p.ring ? `${Math.max(s * 0.13, 4)}px solid #bfbfbd` : "none",
          filter: p.depth < 0.6 ? "blur(3px)" : "none",
          boxSizing: "border-box"
        }
      }, i);
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        transformOrigin: "0 0",
        transform: `translate(${960 - cx * z}px, ${540 - cy * z}px) scale(${z})`
      },
      children: [/* @__PURE__ */jsx2(Window, {
        cx: AX,
        cy: AY,
        seed: 3,
        sendBtn: true,
        btnPulse
      }), /* @__PURE__ */jsx2(Window, {
        cx: BX,
        cy: BY,
        seed: 6
      }), planeVisible && planeOpacity > 0.01 && /* @__PURE__ */jsx2(Plane, {
        x: pos.x,
        y: pos.y,
        angle,
        scale: planeScale,
        opacity: planeOpacity
      })]
    }), PROPS.filter(p => p.depth >= 1).map((p, i) => {
      const wob = Math.sin(frame * 0.04 + p.drift) * 20;
      const x = camX(p.x, p.depth) + wob;
      const y = camY(p.y, p.depth) + Math.cos(frame * 0.033 + p.drift) * 16;
      const s = p.size * z * p.depth;
      const fade = interpolate(takeP, [0.2, 0.7], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      return /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: x - s / 2,
          top: y - s / 2,
          width: s,
          height: s,
          opacity: 0.55 * fade,
          borderRadius: p.ring ? "50%" : 22,
          background: p.ring ? "transparent" : "#b5b5b3",
          border: p.ring ? `${Math.max(s * 0.12, 6)}px solid #adadab` : "none",
          filter: "blur(8px)",
          boxSizing: "border-box"
        }
      }, i);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PaperPlaneMessenger;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
