// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx
import React from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx
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
var rand = seed => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
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

// implementation/video-shotcraft/full/stage/source/demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx

var DASHBOARD_GLOW_HIGHLIGHT_PILL_DURATION = 60;
var OB_ROWS = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#OB_ROWS", "OB_ROWS", () => Array.from({
  length: 7
}, (_, i) => ({
  wRed: (30 + rand(i * 3 + 1) * 65).toFixed(0),
  wGreen: (30 + rand(i * 7 + 4) * 65).toFixed(0),
  priceRed: `1${(155.4 - i * 0.12).toFixed(2)}`,
  priceGreen: `1${(155 - i * 0.12).toFixed(2)}`,
  amtRed: (rand(i * 11) * 9 + 0.4).toFixed(3),
  amtGreen: (rand(i * 13 + 6) * 9 + 0.4).toFixed(3)
})));
var CANDLES = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#CANDLES", "CANDLES", () => (() => {
  const out = [];
  let px = 104;
  for (let i = 0; i < 36; i++) {
    const dv = (rand(i * 2.7 + 9) - 0.6) * 13;
    const o = px;
    const c = px + dv;
    px = c;
    const hi = Math.min(o, c) - rand(i * 5.1) * 5;
    const lo = Math.max(o, c) + rand(i * 3.3) * 5;
    const up = c < o;
    out.push({
      x: 6 + i * 7.6,
      hi: hi.toFixed(1),
      lo: lo.toFixed(1),
      yTop: Math.min(o, c).toFixed(1),
      h: Math.max(1.5, Math.abs(dv)).toFixed(1),
      col: up ? "#2bbf8a" : "#d6455a",
      volY: (128 - rand(i * 1.9 + 3) * 16).toFixed(1)
    });
  }
  return out;
})());
var MW = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#MW", "MW", () => 24.5);
var MH = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#MH", "MH", () => 40);
var MCX = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#MCX", "MCX", () => 48.4);
var MCY = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#MCY", "MCY", () => 47);
var MRAD = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#MRAD", "MRAD", () => 5);
var RW = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#RW", "RW", () => 480);
var RH = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#RH", "RH", () => 270);
var BW = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#BW", "BW", () => RW * MW / 100);
var BH = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#BH", "BH", () => RH * MH / 100);
var BO = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#BO", "BO", () => 0.5);
var SX = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#SX", "SX", () => (44.1 - (MCX - MW / 2)) / MW * BW);
var TRACE_D = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#TRACE_D", "TRACE_D", () => `M${SX.toFixed(1)} ${(BH - BO).toFixed(1)} L${(MRAD + BO).toFixed(1)} ${(BH - BO).toFixed(1)} A${MRAD} ${MRAD} 0 0 1 ${BO} ${(BH - MRAD - BO).toFixed(1)} L${BO} ${(MRAD + BO).toFixed(1)} A${MRAD} ${MRAD} 0 0 1 ${(MRAD + BO).toFixed(1)} ${BO} L${(BW - MRAD - BO).toFixed(1)} ${BO} A${MRAD} ${MRAD} 0 0 1 ${(BW - BO).toFixed(1)} ${(MRAD + BO).toFixed(1)} L${(BW - BO).toFixed(1)} ${(BH - MRAD - BO).toFixed(1)} A${MRAD} ${MRAD} 0 0 1 ${(BW - MRAD - BO).toFixed(1)} ${(BH - BO).toFixed(1)} L${SX.toFixed(1)} ${(BH - BO).toFixed(1)}`);
var P_L = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#P_L", "P_L", () => 100);
var KF = (rows, t) => {
  if (t <= rows[0][0]) return rows[0].slice(1);
  for (let i = 1; i < rows.length; i++) {
    if (t <= rows[i][0]) {
      const a = rows[i - 1],
        b = rows[i];
      const p = E.inOutQuad((t - a[0]) / (b[0] - a[0]));
      return a.slice(1).map((_, k) => lerp(p, a[k + 1], b[k + 1]));
    }
  }
  return rows[rows.length - 1].slice(1);
};
var POSE = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#POSE", "POSE", () => [[0.3, 34, -13, -7, 47, 1.62], [0.322, 24, -11, -5.5, 30, 1.44], [0.345, 13, -8, -3.5, 14, 1.22], [0.365, 5.5, -5, -1.6, 4, 1.055], [0.42, 2.6, -3, -0.6, 0.4, 1.005], [0.5, 2.2, -2, -0.3, 0, 0.966], [0.62, 1.8, -0.6, 0, -0.5, 0.943], [0.67, 1.6, 0.6, -0.4, -0.8, 0.852], [0.72, 1.4, 1.4, -0.8, -1.1, 0.707], [1, 1.2, 2.6, -0.9, -1.3, 0.7]]);
var BLOB = __scConfig("demos/effects/dashboard-glow-highlight-pill/DashboardGlowHighlightPill.tsx#BLOB", "BLOB", () => [[0.4, 80.5, 42, 22, 22], [0.44, 79.7, 46.5, 27, 30], [0.5, 77.7, 56.3, 29, 36], [0.56, 71.1, 63.9, 56, 25], [0.61, 57.6, 65.2, 82, 21], [0.65, 44.1, 67.4, 96, 16]]);
var FS = n => ({
  fontSize: n
});
var rowBetween = {
  display: "flex",
  justifyContent: "space-between"
};
var ObRow = ({
  w,
  price,
  amt,
  red
}) => /* @__PURE__ */jsxs("div", {
  style: {
    position: "relative",
    height: 8.5,
    margin: __scCopy("1px 0")
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: `${w}%`,
      background: red ? "linear-gradient(90deg,rgba(214,69,90,.08),rgba(214,69,90,.4))" : "linear-gradient(90deg,rgba(43,191,138,.08),rgba(43,191,138,.4))"
    }
  }), /* @__PURE__ */jsx2("span", {
    style: {
      position: "relative",
      fontSize: 5,
      color: red ? "#e05a70" : "#3ecf96",
      paddingLeft: 2
    },
    children: price
  }), /* @__PURE__ */jsx2("span", {
    style: {
      position: "relative",
      float: "right",
      fontSize: 5,
      color: "#7c828c",
      paddingRight: 2
    },
    children: amt
  })]
});
var DashboardGlowHighlightPill = () => {
  const t = useT();
  const yOut = seg(t, 0.3, 0.355, E.inQuad);
  const br = 0.85 + 0.15 * Math.sin(t * Math.PI * 9);
  const [prx, pry, ptx, pty, ps] = KF(POSE, t);
  const dashOp = t >= 0.298 ? seg(t, 0.298, 0.315) : 0;
  const blUp = seg(t, 0.58, 0.66, E.inOutQuad);
  const blDown = seg(t, 0.8, 0.93, E.inOutQuad);
  const bl = blUp * (1 - blDown * 0.52);
  const gOn = seg(t, 0.385, 0.425, E.outCubic);
  const gOff = seg(t, 0.655, 0.678, E.inQuad);
  const [bx, by, bw, bh] = KF(BLOB, t);
  const dr = seg(t, 0.655, 0.775, E.outQuad);
  const settle = seg(t, 0.79, 0.93, E.inOutQuad);
  const mBase = seg(t, 0.665, 0.75, E.outCubic);
  const mc = seg(t, 0.715, 0.84, E.outCubic);
  const mDrift = ` rotateX(${(prx * 0.45).toFixed(2)}deg) rotateY(${(pry * 0.45).toFixed(2)}deg) translate(${(ptx * 0.5).toFixed(2)}%,${(pty * 0.5).toFixed(2)}%)`;
  const modalTransform = `translate(-50%,-50%) scale(${(0.985 + mc * 0.015).toFixed(4)})` + mDrift;
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#050403",
    raster: "zoom",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#050403",
        overflow: "hidden",
        perspective: 800,
        fontFamily: "-apple-system,system-ui,sans-serif"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(130% 95% at 42% -8%,rgba(104,74,30,.32),rgba(44,32,14,.14) 42%,rgba(0,0,0,0) 74%)"
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "49%",
          transform: "translate(-50%,-50%)",
          fontSize: 27,
          fontWeight: 400,
          letterSpacing: 0.2,
          whiteSpace: "nowrap",
          background: "linear-gradient(178deg,#fff8e2 6%,#f6dfa4 44%,#e0bd72 70%,#c99a45 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          opacity: 1 - yOut,
          filter: `drop-shadow(0 0 7px rgba(255,232,168,${(0.8 * br).toFixed(2)})) drop-shadow(0 0 20px rgba(233,190,105,${(0.5 * br).toFixed(2)})) drop-shadow(0 0 44px rgba(200,158,78,.3))`
        },
        children: __scCopy("Ready.")
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "87%",
          height: "91%",
          opacity: dashOp,
          transform: `translate(-50%,-50%) translate(${ptx.toFixed(2)}%,${pty.toFixed(2)}%) rotateX(${prx.toFixed(2)}deg) rotateY(${pry.toFixed(2)}deg) scale(${ps.toFixed(4)})`
        },
        children: /* @__PURE__ */jsxs("div", {
          style: {
            position: "absolute",
            inset: 0,
            borderRadius: 6,
            background: "#101114",
            border: "1px solid #24272d",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,.6)",
            filter: `blur(${(bl * 4.5).toFixed(2)}px) brightness(${(1.5 + bl * 0.05).toFixed(3)}) saturate(1.06)`
          },
          children: [/* @__PURE__ */jsxs("div", {
            style: {
              height: "9%",
              borderBottom: "1px solid #1a1c20",
              display: "flex",
              alignItems: "center",
              padding: __scCopy("0 8px"),
              gap: 10
            },
            children: [/* @__PURE__ */jsx2("span", {
              style: {
                fontSize: 8,
                fontWeight: 800,
                color: "#e8e6df",
                letterSpacing: 1
              },
              children: __scCopy("\u25C6 ACME")
            }), /* @__PURE__ */jsx2("span", {
              style: {
                ...FS(6),
                color: "#9aa0aa"
              },
              children: __scCopy("Trade")
            }), /* @__PURE__ */jsx2("span", {
              style: {
                ...FS(6),
                color: "#565c66"
              },
              children: __scCopy("Earn")
            }), /* @__PURE__ */jsx2("span", {
              style: {
                ...FS(6),
                color: "#565c66"
              },
              children: __scCopy("Vault")
            }), /* @__PURE__ */jsxs("span", {
              style: {
                marginLeft: "auto",
                ...FS(6),
                color: "#565c66"
              },
              children: [__scCopy("Support "), "\xA0", __scCopy(" 0x8f...c2 "), "\xA0"]
            }), /* @__PURE__ */jsx2("span", {
              style: {
                ...FS(6),
                color: "#0b0c0e",
                background: "#e6c476",
                borderRadius: 3,
                padding: __scCopy("1px 5px"),
                fontWeight: 700
              },
              children: __scCopy("Connect")
            })]
          }), /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: 0,
              top: "9%",
              bottom: "16%",
              width: "24%",
              borderRight: "1px solid #1a1c20",
              padding: __scCopy("4px 5px"),
              boxSizing: "border-box"
            },
            children: [/* @__PURE__ */jsxs("div", {
              style: {
                display: "flex",
                gap: 8,
                marginBottom: 3
              },
              children: [/* @__PURE__ */jsx2("span", {
                style: {
                  ...FS(6),
                  color: "#d8dbe0",
                  borderBottom: "1px solid #e6c476",
                  paddingBottom: 1
                },
                children: __scCopy("Orderbook")
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  ...FS(6),
                  color: "#565c66"
                },
                children: __scCopy("Trades")
              })]
            }), OB_ROWS.map((r, i) => /* @__PURE__ */jsx2(ObRow, {
              w: r.wRed,
              price: r.priceRed,
              amt: r.amtRed,
              red: true
            }, `r${i}`)), /* @__PURE__ */jsx2("div", {
              style: {
                fontSize: 7,
                fontWeight: 800,
                color: "#e05a70",
                padding: 2
              },
              children: __scCopy("155.01 \u25BC")
            }), OB_ROWS.map((r, i) => /* @__PURE__ */jsx2(ObRow, {
              w: r.wGreen,
              price: r.priceGreen,
              amt: r.amtGreen
            }, `g${i}`))]
          }), /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: "24%",
              top: "9%",
              bottom: "16%",
              right: "22%",
              padding: __scCopy("4px 6px"),
              boxSizing: "border-box"
            },
            children: [/* @__PURE__ */jsxs("div", {
              style: {
                display: "flex",
                alignItems: "baseline",
                gap: 6
              },
              children: [/* @__PURE__ */jsxs("span", {
                style: {
                  fontSize: 7,
                  fontWeight: 700,
                  color: "#e8e6df"
                },
                children: [__scCopy("\u25CF TOKEN-USD "), /* @__PURE__ */jsx2("span", {
                  style: {
                    color: "#565c66",
                    fontSize: 5
                  },
                  children: __scCopy("PERP")
                })]
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  fontSize: 8,
                  fontWeight: 800,
                  color: "#3ecf96"
                },
                children: __scCopy("155.01")
              }), /* @__PURE__ */jsxs("span", {
                style: {
                  ...FS(5),
                  color: "#7c828c"
                },
                children: [__scCopy("24h Vol $1,891,145.10 "), "\xA0", __scCopy(" Funding 0.0042% "), "\xA0", __scCopy(" OI $9.4M")]
              })]
            }), /* @__PURE__ */jsx2("svg", {
              viewBox: "0 0 290 130",
              style: {
                width: "100%",
                height: "84%"
              },
              preserveAspectRatio: "none",
              children: CANDLES.map((c, i) => /* @__PURE__ */jsxs(React.Fragment, {
                children: [/* @__PURE__ */jsx2("line", {
                  x1: c.x + 2,
                  y1: c.hi,
                  x2: c.x + 2,
                  y2: c.lo,
                  stroke: c.col,
                  strokeWidth: 0.8
                }), /* @__PURE__ */jsx2("rect", {
                  x: c.x,
                  y: c.yTop,
                  width: 4,
                  height: c.h,
                  fill: c.col
                }), /* @__PURE__ */jsx2("rect", {
                  x: c.x,
                  y: c.volY,
                  width: 4,
                  height: 16,
                  fill: c.col,
                  opacity: 0.45
                })]
              }, i))
            })]
          }), /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              right: 0,
              top: "9%",
              bottom: "16%",
              width: "22%",
              borderLeft: "1px solid #1a1c20",
              padding: __scCopy("4px 6px"),
              boxSizing: "border-box"
            },
            children: [/* @__PURE__ */jsxs("div", {
              style: {
                display: "flex",
                gap: 3,
                marginBottom: 4
              },
              children: [/* @__PURE__ */jsx2("span", {
                style: {
                  flex: 1,
                  textAlign: "center",
                  fontSize: 5.5,
                  color: "#d8dbe0",
                  background: "#1d2026",
                  borderRadius: 3,
                  padding: __scCopy("2px 0")
                },
                children: __scCopy("Cross")
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  flex: 1,
                  textAlign: "center",
                  fontSize: 5.5,
                  color: "#7c828c",
                  background: "#14161a",
                  borderRadius: 3,
                  padding: __scCopy("2px 0")
                },
                children: __scCopy("10x")
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  flex: 1,
                  textAlign: "center",
                  fontSize: 5.5,
                  color: "#7c828c",
                  background: "#14161a",
                  borderRadius: 3,
                  padding: __scCopy("2px 0")
                },
                children: __scCopy("One-Way")
              })]
            }), /* @__PURE__ */jsxs("div", {
              style: {
                ...rowBetween,
                ...FS(5),
                color: "#7c828c",
                marginBottom: 2
              },
              children: [/* @__PURE__ */jsx2("span", {
                children: __scCopy("Market")
              }), /* @__PURE__ */jsx2("span", {
                children: __scCopy("Limit")
              }), /* @__PURE__ */jsx2("span", {
                children: __scCopy("Pro")
              })]
            }), /* @__PURE__ */jsx2("div", {
              style: {
                height: 5,
                margin: __scCopy("4px 0"),
                background: "linear-gradient(90deg,#e6c476,#e6c476 60%,#2a2d33 60%)",
                borderRadius: 2
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                ...FS(5),
                color: "#7c828c",
                marginBottom: 4
              },
              children: __scCopy("\u25A2 Reduce Only")
            }), /* @__PURE__ */jsxs("div", {
              style: {
                display: "flex",
                gap: 4,
                marginBottom: 5
              },
              children: [/* @__PURE__ */jsx2("div", {
                style: {
                  flex: 1,
                  height: 14,
                  borderRadius: 3,
                  background: "#19a374",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 6,
                  fontWeight: 700,
                  color: "#04120c"
                },
                children: __scCopy("Buy")
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  flex: 1,
                  height: 14,
                  borderRadius: 3,
                  background: "#d6455a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 6,
                  fontWeight: 700,
                  color: "#1c0508"
                },
                children: __scCopy("Sell")
              })]
            }), [__scCopy("Current Position|0.00 TOKEN"), __scCopy("Liq. Price|--"), __scCopy("Order Value|$0.00"), __scCopy("Margin Required|$0.00"), __scCopy("Fees|0.035% / 0.010%")].map(s => {
              const p = s.split("|");
              return /* @__PURE__ */jsxs("div", {
                style: {
                  ...rowBetween,
                  ...FS(5),
                  color: "#7c828c",
                  marginBottom: 2.5
                },
                children: [/* @__PURE__ */jsx2("span", {
                  children: p[0]
                }), /* @__PURE__ */jsx2("span", {
                  style: {
                    color: "#b9bec6"
                  },
                  children: p[1]
                })]
              }, p[0]);
            }), /* @__PURE__ */jsx2("div", {
              style: {
                borderTop: "1px solid #1a1c20",
                marginTop: 4,
                paddingTop: 3,
                fontSize: 5.5,
                color: "#d8dbe0"
              },
              children: __scCopy("Account")
            }), [__scCopy("Portfolio Margin|$20,182.49"), __scCopy("Unrealized PNL|+$142.11"), __scCopy("Available|$1,021.19")].map(s => {
              const p = s.split("|");
              return /* @__PURE__ */jsxs("div", {
                style: {
                  ...rowBetween,
                  ...FS(5),
                  color: "#7c828c",
                  marginTop: 2.5
                },
                children: [/* @__PURE__ */jsx2("span", {
                  children: p[0]
                }), /* @__PURE__ */jsx2("span", {
                  style: {
                    color: "#b9bec6"
                  },
                  children: p[1]
                })]
              }, p[0]);
            })]
          }), /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "16%",
              borderTop: "1px solid #1a1c20",
              padding: __scCopy("3px 8px"),
              boxSizing: "border-box"
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                display: "flex",
                gap: 9,
                marginBottom: 3
              },
              children: ["Positions (2)", "Open Orders (0)", __scCopy("Balances"), __scCopy("Order History"), __scCopy("Trade History"), __scCopy("Funding History"), __scCopy("Position History")].map((s, i) => /* @__PURE__ */jsx2("span", {
                style: {
                  ...FS(5),
                  color: i === 0 ? "#d8dbe0" : "#565c66"
                },
                children: s
              }, s))
            }), [0, 1].map(i => /* @__PURE__ */jsxs("div", {
              style: {
                display: "flex",
                gap: 12,
                ...FS(5),
                color: "#7c828c",
                marginBottom: 2
              },
              children: [/* @__PURE__ */jsxs("span", {
                style: {
                  color: "#d8dbe0"
                },
                children: [i === 0 ? __scCopy("TOKEN") : __scCopy("ALT"), __scCopy("-USD")]
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  color: i === 0 ? "#3ecf96" : "#e05a70"
                },
                children: i === 0 ? "+12.40" : "-3.61"
              }), /* @__PURE__ */jsx2("span", {
                children: __scCopy("152.30")
              }), /* @__PURE__ */jsx2("span", {
                children: __scCopy("$7,801.75")
              }), /* @__PURE__ */jsx2("span", {
                children: __scCopy("$1,775.00")
              }), /* @__PURE__ */jsx2("span", {
                children: __scCopy("74,212.07")
              }), /* @__PURE__ */jsx2("span", {
                children: __scCopy("$53,225.00")
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  color: "#e6c476"
                },
                children: __scCopy("Market | Limit")
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  color: "#7c828c"
                },
                children: __scCopy("Reverse")
              })]
            }, i))]
          })]
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 0,
          background: "rgba(6,5,4,.4)",
          opacity: blUp * 0.22,
          pointerEvents: "none"
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: `${bx.toFixed(2)}%`,
          top: `${by.toFixed(2)}%`,
          width: Number(bw.toFixed(1)),
          height: Number(bh.toFixed(1)),
          borderRadius: Number((bh / 2).toFixed(1)),
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(60% 60% at 50% 50%,#fffefa 0%,#fffdf2 40%,#ffeec2 66%,rgba(255,206,110,.5) 85%,rgba(212,165,70,0))",
          filter: "blur(2px)",
          opacity: gOn * (1 - gOff),
          pointerEvents: "none",
          boxShadow: "0 0 18px rgba(255,235,175,.95),0 0 44px rgba(240,200,120,.6),0 0 90px rgba(212,175,90,.35)"
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: `${MCX}%`,
          top: `${MCY}%`,
          width: `${MW}%`,
          height: `${MH}%`,
          transform: modalTransform,
          opacity: Math.max(mBase * 0.72, mc),
          borderRadius: MRAD,
          background: "linear-gradient(170deg,#141310,#0d0c0a)",
          border: "1px solid rgba(230,196,118,.3)",
          boxShadow: `0 0 ${(12 * mc).toFixed(1)}px rgba(212,175,90,${(0.3 * mc).toFixed(3)}),0 18px 44px rgba(0,0,0,.72)`,
          padding: __scCopy("6px 7px"),
          boxSizing: "border-box"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 5.5,
            fontWeight: 700,
            color: "#f2ead2",
            marginBottom: 4
          },
          children: __scCopy("Focus Mode")
        }), /* @__PURE__ */jsxs("div", {
          style: {
            fontSize: 3.4,
            lineHeight: 1.62,
            color: "#8b8f98",
            marginBottom: 3
          },
          children: [__scCopy("All panels share one unified workspace layout. Changes in one panel are reflected in the others,"), " ", /* @__PURE__ */jsx2("span", {
            style: {
              color: "#cbb26a"
            },
            children: __scCopy("keeping context in one place")
          }), __scCopy(".")]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 3.4,
            color: "#8b8f98",
            marginBottom: 4
          },
          children: __scCopy("Choose how panels are arranged:")
        }), /* @__PURE__ */jsxs("div", {
          style: {
            border: "1px solid rgba(230,196,118,.42)",
            borderRadius: 3,
            background: "rgba(230,196,118,.05)",
            padding: __scCopy("4px 5px"),
            marginBottom: 4
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              fontSize: 4,
              fontWeight: 700,
              color: "#eee6cc"
            },
            children: __scCopy("\u25CF Standard")
          }), /* @__PURE__ */jsx2("div", {
            style: {
              fontSize: 3.3,
              lineHeight: 1.55,
              color: "#8b8f98",
              marginTop: 1.5
            },
            children: __scCopy("Placeholder body copy for option one. The selected option directly determines the layout of each panel \u2014 simple and predictable.")
          })]
        }), /* @__PURE__ */jsxs("div", {
          style: {
            border: "1px solid #23252a",
            borderRadius: 3,
            padding: __scCopy("4px 5px")
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              fontSize: 4,
              fontWeight: 700,
              color: "#b9bec6"
            },
            children: __scCopy("\u25CB Pro")
          }), /* @__PURE__ */jsx2("div", {
            style: {
              fontSize: 3.3,
              lineHeight: 1.55,
              color: "#71757e",
              marginTop: 1.5
            },
            children: __scCopy("Placeholder body copy for option two, written a little longer so the block keeps its shape. Replace both with your own wording.")
          })]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 7,
            right: 7,
            bottom: 6,
            height: 9,
            borderRadius: 2.5,
            background: "linear-gradient(180deg,#e2bd63,#caa03e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 4,
            fontWeight: 700,
            color: "#241b06"
          },
          children: __scCopy("Confirm")
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: `${MCX}%`,
          top: `${MCY}%`,
          width: `${MW}%`,
          height: `${MH}%`,
          transform: modalTransform,
          pointerEvents: "none",
          opacity: dr > 1e-3 ? 1 - settle * 0.42 : 0,
          mixBlendMode: "screen"
        },
        children: /* @__PURE__ */jsx2("svg", {
          viewBox: `0 0 ${BW.toFixed(2)} ${BH.toFixed(2)}`,
          style: {
            width: "100%",
            height: "100%",
            overflow: "visible"
          },
          children: /* @__PURE__ */jsx2("path", {
            d: TRACE_D,
            pathLength: P_L,
            fill: "none",
            stroke: settle > 0.5 ? "#e6c887" : "#fff0c4",
            strokeWidth: Number((2.9 - settle * 1.9).toFixed(2)),
            strokeLinecap: "round",
            strokeDasharray: `${P_L} ${P_L}`,
            strokeDashoffset: Number((P_L * (1 - dr)).toFixed(1)),
            style: {
              filter: settle > 1e-3 ? `drop-shadow(0 0 ${(3 - settle * 2.3).toFixed(2)}px rgba(255,232,160,${(0.95 - settle * 0.5).toFixed(2)})) drop-shadow(0 0 ${(10 - settle * 8).toFixed(1)}px rgba(240,200,110,${(0.75 - settle * 0.62).toFixed(2)}))` : "drop-shadow(0 0 3px rgba(255,232,160,.95)) drop-shadow(0 0 10px rgba(240,200,110,.75)) drop-shadow(0 0 26px rgba(212,175,90,.4))"
            }
          })
        })
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = DashboardGlowHighlightPill;
 return {component:template_entry_default,duration:DASHBOARD_GLOW_HIGHLIGHT_PILL_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
