// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx
import React from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx

var BEZIER_SOURCE_CONVERGE_MERGE_DURATION = 168;
var SANS = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#SANS", "SANS", () => '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif');
var BG = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#BG", "BG", () => "#F1F1F3");
var TXT = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#TXT", "TXT", () => "#111111");
var DIM = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#DIM", "DIM", () => "#C9C9CE");
var LINE = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#LINE", "LINE", () => "#E6E6EA");
var ACCENT = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#ACCENT", "ACCENT", () => "#3B82F6");
var ACCENT_WASH = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#ACCENT_WASH", "ACCENT_WASH", () => "rgba(59,130,246,.12)");
var clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
var h2r = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
var mix = (p, a, b) => {
  const A = h2r(a),
    B = h2r(b),
    q = clamp01(p);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * q)},${Math.round(A[1] + (B[1] - A[1]) * q)},${Math.round(A[2] + (B[2] - A[2]) * q)})`;
};
var XC = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#XC", "XC", () => 332);
var YC = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#YC", "YC", () => 120);
var SRCS = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#SRCS", "SRCS", () => [{
  y: 36,
  tag: __scCopy("S1"),
  c: "#111111"
}, {
  y: 92,
  tag: __scCopy("S2"),
  c: "#4A4A50"
}, {
  y: 148,
  tag: __scCopy("S3"),
  c: "#7A7A82"
}, {
  y: 204,
  tag: __scCopy("S4"),
  c: "#A3A3AA"
}]);
var cubic = (y0, u) => {
  const v = 1 - u;
  return {
    x: v * v * v * 74 + 3 * v * v * u * 186 + 3 * v * u * u * 214 + u * u * u * XC,
    y: v * v * v * y0 + 3 * v * v * u * y0 + 3 * v * u * u * YC + u * u * u * YC
  };
};
var SAMPLES = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#SAMPLES", "SAMPLES", () => 1600);
var LINE_LEN = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#LINE_LEN", "LINE_LEN", () => 96);
var mkPathGeom = y0 => {
  const cum = [0];
  let px = 74,
    py = y0,
    acc = 0;
  for (let k = 1; k <= SAMPLES; k++) {
    const p = cubic(y0, k / SAMPLES);
    acc += Math.hypot(p.x - px, p.y - py);
    cum.push(acc);
    px = p.x;
    py = p.y;
  }
  const len = LINE_LEN + acc;
  const pointAt = s => {
    const sc = Math.max(0, Math.min(len, s));
    if (sc <= LINE_LEN) return {
      x: -22 + sc,
      y: y0
    };
    const target = sc - LINE_LEN;
    let lo = 0,
      hi = SAMPLES;
    while (lo < hi) {
      const mid = lo + hi >> 1;
      if (cum[mid] < target) lo = mid + 1;else hi = mid;
    }
    const i = Math.max(1, lo);
    const s0 = cum[i - 1],
      s1 = cum[i];
    const u = (i - 1 + (s1 > s0 ? (target - s0) / (s1 - s0) : 0)) / SAMPLES;
    return cubic(y0, u);
  };
  let f0 = 0.2;
  for (let k = 1; k <= 40; k++) {
    const q = k / 40;
    if (pointAt(len * q).x >= 74) {
      f0 = q;
      break;
    }
  }
  return {
    len,
    pointAt,
    f0
  };
};
var GEOMS = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#GEOMS", "GEOMS", () => SRCS.map(s => mkPathGeom(s.y)));
var CAP_WORDS = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#CAP_WORDS", "CAP_WORDS", () => __scCopy("Four sources unified").split(" "));
var CAP_ST = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#CAP_ST", "CAP_ST", () => 0.78 / CAP_WORDS.length);
var CAP_WIN = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#CAP_WIN", "CAP_WIN", () => CAP_ST * 1.5);
var BADGE_SIZE = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#BADGE_SIZE", "BADGE_SIZE", () => 34);
var BADGE_SVG = __scConfig("demos/ui-entrance/bezier-source-converge-merge/BezierSourceConvergeMerge.tsx#BADGE_SVG", "BADGE_SVG", () => Number((BADGE_SIZE * 0.52).toFixed(1)));
var BezierSourceConvergeMerge = () => {
  const t = useT();
  const conv = seg(t, 0.34, 0.74, E.inOutCubic);
  const erase = seg(t, 0.78, 0.9, E.outQuad);
  const pkCycle = seg(t, 0.1, 0.74, E.linear) * 2 % 1;
  const bp = seg(t, 0.16, 0.26, E.outCubic);
  const badgeScale = lerp(bp, 0.7, 1) * (1 + seg(t, 0.7, 0.78, E.outBack) * 0.12 - seg(t, 0.78, 0.86, E.outQuad) * 0.12);
  const capShow = seg(t, 0.84, 0.9);
  const capInn = seg(t, 0.84, 1);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: BG,
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: BG,
        overflow: "hidden",
        fontFamily: SANS,
        WebkitFontSmoothing: "antialiased"
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 440,
          height: 240,
          margin: __scCopy("-120px 0 0 -220px")
        },
        children: [/* @__PURE__ */jsx2("svg", {
          width: 440,
          height: 240,
          viewBox: "0 0 440 240",
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            overflow: "visible"
          },
          children: SRCS.map((s, i) => {
            const {
              len
            } = GEOMS[i];
            const draw = seg(t, 0.04 + i * 0.045, 0.04 + i * 0.045 + 0.17, E.outQuad);
            const off = erase > 0 ? -erase * len : len * (1 - draw);
            return /* @__PURE__ */jsx2("path", {
              d: `M -22,${s.y} L 74,${s.y} C 186,${s.y} 214,${YC} ${XC},${YC}`,
              fill: "none",
              stroke: TXT,
              strokeWidth: 1.2,
              strokeDasharray: len,
              strokeDashoffset: off.toFixed(1),
              opacity: (draw * (1 - clamp01((erase - 0.85) / 0.15))).toFixed(3)
            }, i);
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: 440,
            height: 240
          },
          children: SRCS.map((s, i) => {
            const {
              len,
              pointAt,
              f0
            } = GEOMS[i];
            const tt = conv;
            const frac = f0 + (1 - f0) * tt;
            const pt = pointAt(len * frac);
            const size = tt < 0.75 ? lerp(tt / 0.75, 44, 15) : lerp((tt - 0.75) / 0.25, 15, 0);
            const appear = seg(t, 0.02 + i * 0.04, 0.02 + i * 0.04 + 0.1, E.outCubic);
            const pf = f0 + (1 - f0) * ((pkCycle + i * 0.13) % 1);
            const q = pointAt(len * pf);
            const pkOn = seg(t, 0.1, 0.16) * (1 - seg(t, 0.7, 0.76));
            return /* @__PURE__ */jsxs(React.Fragment, {
              children: [/* @__PURE__ */jsx2("div", {
                style: {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  borderRadius: "50%",
                  background: "#fff",
                  border: `1px solid ${LINE}`,
                  boxSizing: "border-box",
                  boxShadow: "0 3px 12px rgba(0,0,0,.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  lineHeight: 1,
                  fontFamily: SANS,
                  color: s.c,
                  letterSpacing: 0.3,
                  willChange: "transform",
                  width: Math.max(0.1, size),
                  height: Math.max(0.1, size),
                  transform: `translate(${(pt.x - size / 2).toFixed(2)}px,${(pt.y - size / 2).toFixed(2)}px) scale(${appear.toFixed(3)})`,
                  fontSize: `${Math.max(4, size * 0.26).toFixed(1)}px`,
                  opacity: (appear * (tt > 0.92 ? clamp01((1 - tt) / 0.08) : 1)).toFixed(3)
                },
                children: s.tag
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  border: `1.5px solid ${ACCENT}`,
                  boxSizing: "border-box",
                  background: ACCENT_WASH,
                  transform: `translate(${(q.x - 3.5).toFixed(2)}px,${(q.y - 3.5).toFixed(2)}px)`,
                  opacity: (pkOn * (1 - Math.abs((pkCycle + i * 0.13) % 1 - 0.5) * 0.6)).toFixed(3)
                }
              })]
            }, i);
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            width: BADGE_SIZE,
            height: BADGE_SIZE,
            borderRadius: "50%",
            background: "#fff",
            border: `1px solid ${LINE}`,
            boxSizing: "border-box",
            boxShadow: "0 2px 10px rgba(0,0,0,.07)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            left: XC - 17,
            top: YC - 17,
            opacity: bp,
            transform: `scale(${badgeScale})`
          },
          children: /* @__PURE__ */jsx2("svg", {
            width: BADGE_SVG,
            height: BADGE_SVG,
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */jsx2("path", {
              d: __scCopy("M12 0.8 L14.3 9.7 L23.2 12 L14.3 14.3 L12 23.2 L9.7 14.3 L0.8 12 L9.7 9.7 Z"),
              fill: TXT
            })
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            display: "flex",
            alignItems: "baseline",
            whiteSpace: "nowrap",
            left: XC - 60,
            top: YC + 30,
            opacity: capShow
          },
          children: CAP_WORDS.map((w, i) => {
            const q = clamp01((capInn - i * CAP_ST) / CAP_WIN);
            return /* @__PURE__ */jsx2("span", {
              style: {
                font: `600 12px/1.25 ${SANS}`,
                color: mix(q, DIM, TXT),
                letterSpacing: (-0.03 * (1 - q)).toFixed(4) + __scCopy("em"),
                marginRight: i === CAP_WORDS.length - 1 ? 0 : 4.5
              },
              children: w
            }, i);
          })
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = BezierSourceConvergeMerge;
 return {component:template_entry_default,duration:BEZIER_SOURCE_CONVERGE_MERGE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
