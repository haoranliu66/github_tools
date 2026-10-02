// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/glow-flyline-moves/OrbFlylineRelay.tsx
import { useId } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
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
 var h = n => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var TAU = __scConfig("demos/effects/glow-flyline-moves/OrbFlylineRelay.tsx#TAU", "TAU", () => Math.PI * 2);
var bez = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y
  };
};
var N = __scConfig("demos/effects/glow-flyline-moves/OrbFlylineRelay.tsx#N", "N", () => 100);
var CARD_W = __scConfig("demos/effects/glow-flyline-moves/OrbFlylineRelay.tsx#CARD_W", "CARD_W", () => 420);
var CARD_H = __scConfig("demos/effects/glow-flyline-moves/OrbFlylineRelay.tsx#CARD_H", "CARD_H", () => 250);
var CARDS = __scConfig("demos/effects/glow-flyline-moves/OrbFlylineRelay.tsx#CARDS", "CARDS", () => ({
  A: {
    x: 230,
    y: 170
  },
  // 左上（center 440, 295）
  B: {
    x: 1270,
    y: 300
  },
  // 右中（center 1480, 425）
  C: {
    x: 700,
    y: 740
  }
  // 下中（center 910, 865）
}));
var center = c => ({
  x: c.x + CARD_W / 2,
  y: c.y + CARD_H / 2
});
var ORBS = __scConfig("demos/effects/glow-flyline-moves/OrbFlylineRelay.tsx#ORBS", "ORBS", () => [
// 邻近卡 B —— 线1落点(f42)同帧涨亮
{
  size: 720,
  peak: 0.26,
  bx: 1500,
  by: 330,
  p1: 104,
  p2: 138,
  ax1: 130,
  ax2: 95,
  ay1: 120,
  ay2: 92,
  seed: 1,
  surgeAt: 42
},
// 邻近卡 C —— 线2落点(f76)同帧涨亮
{
  size: 640,
  peak: 0.2,
  bx: 900,
  by: 830,
  p1: 122,
  p2: 94,
  ax1: 125,
  ax2: 88,
  ay1: 128,
  ay2: 90,
  seed: 2,
  surgeAt: 76
}]);
var orbPos = (o, t) => {
  const f1 = h(o.seed * 7 + 1) * TAU;
  const f2 = h(o.seed * 7 + 2) * TAU;
  const f3 = h(o.seed * 7 + 3) * TAU;
  const f4 = h(o.seed * 7 + 4) * TAU;
  const x = o.bx + o.ax1 * Math.sin(TAU * t / o.p1 + f1) + o.ax2 * Math.sin(TAU * t / o.p2 + f2);
  const y = o.by + o.ay1 * Math.sin(TAU * t / o.p2 + f3) + o.ay2 * Math.sin(TAU * t / o.p1 + f4);
  return {
    x,
    y
  };
};
var surge = (frame, at) => {
  if (frame < at || frame > at + 20) return 0;
  return frame <= at + 5 ? interpolate(frame, [at, at + 5], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) : interpolate(frame, [at + 5, at + 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
};
var Flyline = ({
  frame,
  start,
  haloId,
  p0,
  p1,
  p2,
  p3
}) => {
  const DUR = 24;
  const HOLD = 4;
  const FADE = 14;
  if (frame < start || frame >= start + DUR + HOLD + FADE) return null;
  const e = interpolate(frame, [start, start + DUR], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const growing = frame < start + DUR;
  const fade = interpolate(frame, [start + DUR + HOLD, start + DUR + HOLD + FADE], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const pts = [];
  const nDrawn = Math.max(2, Math.ceil(e * N) + 1);
  for (let i = 0; i < nDrawn; i++) {
    const t = Math.min(i / N, e);
    pts.push(bez(p0, p1, p2, p3, t));
  }
  const head = bez(p0, p1, p2, p3, e);
  pts[pts.length - 1] = head;
  const poly = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const segs = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const tSeg = Math.min(i / N, e) / Math.max(e, 1e-3);
    const grad = 0.12 + 0.88 * tSeg * tSeg;
    segs.push(/* @__PURE__ */jsx("line", {
      x1: pts[i].x,
      y1: pts[i].y,
      x2: pts[i + 1].x,
      y2: pts[i + 1].y,
      stroke: "#f4f4f0",
      strokeWidth: 5,
      strokeLinecap: "round",
      strokeOpacity: grad * fade
    }, i));
  }
  return /* @__PURE__ */jsxs("g", {
    children: [/* @__PURE__ */jsx("polyline", {
      points: poly,
      fill: "none",
      stroke: "#e8e8e4",
      strokeWidth: 14,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeOpacity: 0.18 * fade
    }), segs, growing && /* @__PURE__ */jsxs("g", {
      children: [/* @__PURE__ */jsx("circle", {
        cx: head.x,
        cy: head.y,
        r: 34,
        fill: `url(#${haloId})`
      }), /* @__PURE__ */jsx("circle", {
        cx: head.x,
        cy: head.y,
        r: 8,
        fill: "#ffffff"
      })]
    })]
  });
};
var DarkCard = ({
  frame,
  litAt,
  x,
  y,
  seed
}) => {
  const lit = interpolate(frame, [litAt, litAt + 8], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const op = 0.55 + 0.45 * lit;
  const pulse = frame < litAt ? 0 : frame <= litAt + 6 ? interpolate(frame, [litAt, litAt + 6], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) : interpolate(frame, [litAt + 6, litAt + 22], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const borderCol = `rgba(${Math.round(90 + 165 * pulse)},${Math.round(90 + 165 * pulse)},${Math.round(88 + 164 * pulse)},1)`;
  const glow = pulse > 0 ? `0 0 ${24 * pulse}px ${6 * pulse}px rgba(255,255,255,${(0.3 * pulse).toFixed(3)})` : "none";
  const titleW = 45 + seed * 37 % 40;
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      left: x,
      top: y,
      width: CARD_W,
      height: CARD_H,
      boxSizing: "border-box",
      background: "#262624",
      border: `1.5px solid ${borderCol}`,
      borderRadius: 14,
      boxShadow: glow,
      opacity: op,
      padding: 24,
      display: "flex",
      flexDirection: "column",
      gap: 12
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 15,
        width: `${titleW}%`,
        background: "#4a4a48",
        borderRadius: 8
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: "80%",
        background: "#383836",
        borderRadius: 5
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: "62%",
        background: "#383836",
        borderRadius: 5
      }
    }), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 9,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 24,
          height: 24,
          borderRadius: 12,
          background: "#4a4a48"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 10,
          width: 78,
          background: "#383836",
          borderRadius: 5
        }
      })]
    })]
  });
};
var OrbFlylineRelay = () => {
  const frame = useCurrentFrame();
  const haloId = `orbHeadHalo-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const t = frame <= 95 ? frame : 95 + interpolate(frame, [95, 120], [0, 15], {
    easing: Easing.out(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const cA = center(CARDS.A);
  const cB = center(CARDS.B);
  const cC = center(CARDS.C);
  const L1 = {
    p0: cA,
    p1: {
      x: 820,
      y: 90
    },
    p2: {
      x: 1300,
      y: 180
    },
    p3: cB
  };
  const L2 = {
    p0: cB,
    p1: {
      x: 1620,
      y: 820
    },
    p2: {
      x: 1240,
      y: 1e3
    },
    p3: cC
  };
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#1d1d1b",
      overflow: "hidden"
    },
    children: [ORBS.map((o, i) => {
      const pos = orbPos(o, t);
      const s = surge(frame, o.surgeAt);
      const a = Math.min(0.85, o.peak * (1 + 1.6 * s));
      return /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: pos.x - o.size / 2,
          top: pos.y - o.size / 2,
          width: o.size,
          height: o.size,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(234,234,230,${a.toFixed(3)}) 0%, rgba(234,234,230,${(a * 0.5).toFixed(3)}) 42%, rgba(234,234,230,0) 70%)`,
          filter: "blur(100px)",
          opacity: fadeIn
        }
      }, i);
    }), /* @__PURE__ */jsx(DarkCard, {
      frame,
      litAt: 8,
      x: CARDS.A.x,
      y: CARDS.A.y,
      seed: 1
    }), /* @__PURE__ */jsx(DarkCard, {
      frame,
      litAt: 42,
      x: CARDS.B.x,
      y: CARDS.B.y,
      seed: 2
    }), /* @__PURE__ */jsx(DarkCard, {
      frame,
      litAt: 76,
      x: CARDS.C.x,
      y: CARDS.C.y,
      seed: 3
    }), /* @__PURE__ */jsxs("svg", {
      width: 1920,
      height: 1080,
      viewBox: "0 0 1920 1080",
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none"
      },
      children: [/* @__PURE__ */jsx("defs", {
        children: /* @__PURE__ */jsxs("radialGradient", {
          id: haloId,
          children: [/* @__PURE__ */jsx("stop", {
            offset: "0%",
            stopColor: "rgba(255,255,255,0.55)"
          }), /* @__PURE__ */jsx("stop", {
            offset: "55%",
            stopColor: "rgba(255,255,255,0.22)"
          }), /* @__PURE__ */jsx("stop", {
            offset: "100%",
            stopColor: "rgba(255,255,255,0)"
          })]
        })
      }), /* @__PURE__ */jsx(Flyline, {
        frame,
        start: 18,
        haloId,
        ...L1
      }), /* @__PURE__ */jsx(Flyline, {
        frame,
        start: 52,
        haloId,
        ...L2
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = OrbFlylineRelay;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
