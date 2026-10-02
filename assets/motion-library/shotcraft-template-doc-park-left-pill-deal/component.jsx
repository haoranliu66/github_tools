// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx
import React from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx

var DOC_PARK_LEFT_PILL_DEAL_DURATION = 174;
var SANS = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#SANS", "SANS", () => '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif');
var BG = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#BG", "BG", () => "#F1F1F3");
var INK = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#INK", "INK", () => "#0B0B0C");
var TXT = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#TXT", "TXT", () => "#111111");
var DIM = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#DIM", "DIM", () => "#C9C9CE");
var LINE = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#LINE", "LINE", () => "#E6E6EA");
var SKEL = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#SKEL", "SKEL", () => "#DEDEE3");
var clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
var h2r = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
var mix = (p, a, b) => {
  const A = h2r(a),
    B = h2r(b),
    q = clamp01(p);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * q)},${Math.round(A[1] + (B[1] - A[1]) * q)},${Math.round(A[2] + (B[2] - A[2]) * q)})`;
};
var Icon = ({
  k,
  size
}) => /* @__PURE__ */jsx2("div", {
  style: {
    width: size,
    height: size,
    flex: __scCopy("0 0 auto"),
    color: TXT
  },
  children: /* @__PURE__ */jsxs("svg", {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    children: [k === __scCopy("leaf") && /* @__PURE__ */jsxs(Fragment, {
      children: [/* @__PURE__ */jsx2("path", {
        d: __scCopy("M3 13c0-6 5-10 10-10 0 6-4 10-10 10Z"),
        fill: "none",
        stroke: "#111",
        strokeWidth: 1.3
      }), /* @__PURE__ */jsx2("path", {
        d: __scCopy("M3 13 13 3"),
        stroke: "#111",
        strokeWidth: 1.3
      })]
    }), k === __scCopy("bowl") && /* @__PURE__ */jsxs(Fragment, {
      children: [/* @__PURE__ */jsx2("path", {
        d: __scCopy("M2 7h12c0 4-2.6 6-6 6S2 11 2 7Z"),
        fill: "none",
        stroke: "#111",
        strokeWidth: 1.3
      }), /* @__PURE__ */jsx2("path", {
        d: __scCopy("M6 4.5V2M9.5 4.5V2"),
        stroke: "#111",
        strokeWidth: 1.3
      })]
    }), k === "wrap" && /* @__PURE__ */jsxs(Fragment, {
      children: [/* @__PURE__ */jsx2("circle", {
        cx: 8,
        cy: 8,
        r: 5.6,
        fill: "none",
        stroke: "#111",
        strokeWidth: 1.3
      }), /* @__PURE__ */jsx2("path", {
        d: __scCopy("M4.4 6.2h7.2M4.4 9.8h7.2"),
        stroke: "#111",
        strokeWidth: 1.3
      })]
    })]
  })
});
var Caption = ({
  text,
  left,
  top,
  size,
  showV,
  innP,
  outP
}) => {
  const words = text.split(" ");
  const n = words.length;
  const st = 0.78 / n,
    win = st * 1.5;
  const stw = 0.55 / n;
  const rowOpacity = outP > 0 ? clamp01(1 - (outP - 0.7) / 0.3) : showV;
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      display: "flex",
      alignItems: "baseline",
      whiteSpace: "nowrap",
      left,
      top,
      opacity: rowOpacity
    },
    children: words.map((w, i) => {
      const q = clamp01((innP - i * st) / win);
      let color = mix(q, DIM, TXT);
      if (outP > 0) {
        const p = clamp01((outP - i * stw) / (stw * 1.4));
        color = mix(1 - p, DIM, TXT);
      }
      return /* @__PURE__ */jsx2("span", {
        style: {
          font: `600 ${size}px/1.25 ${SANS}`,
          color,
          letterSpacing: (-0.03 * (1 - q)).toFixed(4) + __scCopy("em"),
          marginRight: i === n - 1 ? 0 : 4.5
        },
        children: w
      }, i);
    })
  });
};
var DW = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#DW", "DW", () => 250);
var DH = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#DH", "DH", () => 190);
var COLS = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#COLS", "COLS", () => 3);
var COL_W = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#COL_W", "COL_W", () => (DW - 28 - (COLS - 1) * 10) / COLS);
var DOC_COLS = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#DOC_COLS", "DOC_COLS", () => Array.from({
  length: COLS
}, (_, c) => {
  const x = 14 + c * (COL_W + 10);
  return {
    x,
    headW: (COL_W * 0.72).toFixed(1),
    rows: Array.from({
      length: 7
    }, (_2, r) => (COL_W * (0.55 + rand(c * 13 + r * 7) * 0.45)).toFixed(1))
  };
}));
var ITEMS = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#ITEMS", "ITEMS", () => [{
  n: __scCopy("Quick Start"),
  ic: __scCopy("leaf"),
  cap: __scCopy("Start matches their preference")
}, {
  n: __scCopy("Bundle Plan"),
  ic: __scCopy("bowl"),
  cap: __scCopy("Plan fits their weekday usage")
}, {
  n: __scCopy("Starter Kit"),
  ic: "wrap",
  cap: __scCopy("Kit is their top repeat item")
}]);
var PX = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#PX", "PX", () => 214);
var PY = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#PY", "PY", () => 54);
var PH = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#PH", "PH", () => 34);
var PG = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#PG", "PG", () => 14);
var T0 = __scConfig("demos/ui-entrance/doc-park-left-pill-deal/DocParkLeftPillDeal.tsx#T0", "T0", () => [0.26, 0.48, 0.7]);
var DocParkLeftPillDeal = () => {
  const t = useT();
  const park = seg(t, 0.06, 0.24, E.inOutCubic);
  const scrollY = (-(t * 3 % 1) * 40).toFixed(2);
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
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 34,
            top: (240 - DH) / 2,
            width: DW,
            height: DH,
            transformOrigin: "0% 50%",
            transform: `translateX(${lerp(park, 0, -55)}%) scale(${lerp(park, 1, 0.92)})`
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: DW,
              height: DH,
              background: "#fff",
              border: `1px solid ${LINE}`,
              borderRadius: 10,
              boxShadow: "0 8px 26px rgba(0,0,0,.06)",
              overflow: "hidden"
            },
            children: /* @__PURE__ */jsxs("div", {
              style: {
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                height: DH + 60,
                transform: `translateY(${scrollY}px)`
              },
              children: [/* @__PURE__ */jsx2("div", {
                style: {
                  position: "absolute",
                  left: 14,
                  top: 12,
                  width: Math.round(DW * 0.34),
                  height: 7,
                  borderRadius: 3,
                  background: INK,
                  opacity: 0.85
                }
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  position: "absolute",
                  left: 14,
                  top: 25,
                  width: Math.round(DW * 0.2),
                  height: 5,
                  borderRadius: 3,
                  background: SKEL
                }
              }), DOC_COLS.map(({
                x,
                headW,
                rows
              }, c) => /* @__PURE__ */jsxs(React.Fragment, {
                children: [/* @__PURE__ */jsx2("div", {
                  style: {
                    position: "absolute",
                    left: x,
                    top: 44,
                    width: `${headW}px`,
                    height: 6,
                    borderRadius: 3,
                    background: "#9A9AA2"
                  }
                }), rows.map((ww, r) => /* @__PURE__ */jsx2("div", {
                  style: {
                    position: "absolute",
                    left: x,
                    top: 58 + r * 13,
                    width: `${ww}px`,
                    height: 5,
                    borderRadius: 2.5,
                    background: SKEL
                  }
                }, r))]
              }, c))]
            })
          })
        }), ITEMS.map((it, k) => {
          const f = T0[k];
          const o = seg(t, f, f + 0.035, E.outQuad);
          const b = seg(t, f, f + 0.062, E.outBack);
          const cs = f + 0.05,
            ce = k < 2 ? T0[k + 1] - 0.03 : 0.98;
          const showV = seg(t, cs, cs + 0.02);
          const innP = seg(t, cs, cs + (ce - cs) * 0.7);
          const outP = seg(t, ce - 0.05, ce, E.outQuad);
          return /* @__PURE__ */jsxs(React.Fragment, {
            children: [/* @__PURE__ */jsxs("div", {
              style: {
                position: "absolute",
                left: PX,
                top: PY + k * (PH + PG),
                width: 172,
                height: PH,
                borderRadius: PH / 2,
                background: "#fff",
                border: `1px solid ${LINE}`,
                boxSizing: "border-box",
                boxShadow: "0 4px 14px rgba(0,0,0,.06)",
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: __scCopy("0 14px"),
                opacity: o,
                transform: `translateY(${lerp(b, 14, 0).toFixed(2)}px) scale(${lerp(b, 0.94, 1).toFixed(4)})`
              },
              children: [/* @__PURE__ */jsx2(Icon, {
                k: it.ic,
                size: 16
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  font: `600 12.5px/1 ${SANS}`,
                  color: TXT,
                  letterSpacing: __scCopy("-.01em")
                },
                children: it.n
              })]
            }), /* @__PURE__ */jsx2(Caption, {
              text: it.cap,
              left: PX + 4,
              top: PY + k * (PH + PG) + PH + 7,
              size: 11,
              showV,
              innP,
              outP
            })]
          }, k);
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = DocParkLeftPillDeal;
 return {component:template_entry_default,duration:DOC_PARK_LEFT_PILL_DEAL_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
