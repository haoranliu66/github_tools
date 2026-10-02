// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/camera/cursor-flyover/CursorFlyover.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/camera/cursor-flyover/CursorFlyover.tsx

var CURSOR_FLYOVER_DURATION = 180;
var acc = (t, base, kfs, keys, ease) => {
  const out = {};
  for (const k of keys) out[k] = base[k];
  let prev = base;
  for (const kf of kfs) {
    const u = seg(t, kf.at[0], kf.at[1], ease);
    for (const k of keys) out[k] += u * (kf.to[k] - prev[k]);
    prev = kf.to;
  }
  return out;
};
var CAM = __scConfig("demos/camera/cursor-flyover/CursorFlyover.tsx#CAM", "CAM", () => [{
  tx: 50,
  ty: 50,
  s: 0.8,
  cx: 50,
  cy: 52
}, {
  tx: 37,
  ty: 32,
  s: 1.72,
  cx: 41,
  cy: 38
}, {
  tx: 77,
  ty: 32,
  s: 1.72,
  cx: 82,
  cy: 36
}, {
  tx: 77,
  ty: 72,
  s: 1.72,
  cx: 71,
  cy: 76
}, {
  tx: 37,
  ty: 72,
  s: 1.72,
  cx: 33,
  cy: 78
}]);
var WIN = __scConfig("demos/camera/cursor-flyover/CursorFlyover.tsx#WIN", "WIN", () => [[0.2, 0.32], [0.4, 0.52], [0.6, 0.72], [0.79, 0.91]]);
var KEY = __scConfig("demos/camera/cursor-flyover/CursorFlyover.tsx#KEY", "KEY", () => [__scCopy("tx"), __scCopy("ty"), "s", __scCopy("cx"), __scCopy("cy")]);
var LINE_D = __scConfig("demos/camera/cursor-flyover/CursorFlyover.tsx#LINE_D", "LINE_D", () => (() => {
  let dd = "";
  for (let i = 0; i <= 14; i++) dd += `${i === 0 ? "M" : "L"}${i * 7.14},${40 - (6 + rand(i * 5) * 22 + i * 0.7)} `;
  return dd;
})());
var Quad = ({
  x,
  y,
  w,
  h,
  children
}) => /* @__PURE__ */jsx2("div", {
  style: {
    position: "absolute",
    left: `${x}%`,
    top: `${y}%`,
    width: `${w}%`,
    height: `${h}%`,
    borderRadius: 8,
    background: "#191d29",
    boxShadow: "inset 0 0 0 1px #262c3b"
  },
  children
});
var CursorFlyover = () => {
  const t = useT();
  const v = acc(t, CAM[0], WIN.map((w, i) => ({
    at: w,
    to: CAM[i + 1]
  })), KEY, E.inOutCubic);
  const fade = seg(t, 0, 0.14, E.outCubic);
  let click = 0;
  let hold = 0;
  for (let i = 0; i < WIN.length; i++) {
    const c = seg(t, WIN[i][1], WIN[i][1] + 0.055, E.outCubic);
    if (c > 0 && c < 1) {
      click = c;
      hold = 1;
    } else if (c >= 1 && t < (WIN[i + 1] ? WIN[i + 1][0] : 1.01)) {
      click = 1;
      hold = 1;
    }
  }
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#080910",
    raster: "zoom",
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#080910",
        overflow: "hidden"
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          inset: 0,
          transformOrigin: "0 0",
          transform: `translate(${50 - v.tx * v.s}%,${50 - v.ty * v.s}%) scale(${v.s})`,
          opacity: fade
        },
        children: [/* @__PURE__ */jsxs("div", {
          style: {
            position: "absolute",
            left: "4%",
            top: "5%",
            width: "92%",
            height: "90%",
            borderRadius: 10,
            background: "#12141d",
            boxShadow: "0 24px 60px rgba(0,0,0,.6),inset 0 0 0 1px #262c3b",
            overflow: "hidden",
            filter: `blur(${(1 - fade) * 5}px)`
          },
          children: [/* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "9%",
              background: "#1a1d28",
              borderBottom: "1px solid #262c3b",
              boxSizing: "content-box"
            },
            children: [["#ff6058", "#ffbd2e", "#28ca42"].map((c, i) => /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 8 + i * 12,
                top: "50%",
                width: 6,
                height: 6,
                marginTop: -3,
                borderRadius: "50%",
                background: c
              }
            }, c)), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 56,
                top: "50%",
                transform: "translateY(-50%)",
                height: 13,
                lineHeight: __scCopy("13px"),
                padding: __scCopy("0 10px"),
                borderRadius: 7,
                background: "#0f1119",
                color: "#5d6580",
                font: "500 8px/13px ui-monospace,monospace",
                letterSpacing: 0.4
              },
              children: __scCopy("app.example.com/overview")
            })]
          }), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: "9%",
              width: "15%",
              height: "91%",
              background: "#161923",
              borderRight: "1px solid #232937",
              boxSizing: "content-box"
            },
            children: [__scCopy("Overview"), __scCopy("Traffic"), __scCopy("Revenue"), __scCopy("Cohorts"), __scCopy("Alerts")].map((s, i) => /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: "8%",
                top: `${8 + i * 15}%`,
                width: "84%",
                height: "11%",
                borderRadius: 5,
                font: "600 7px/1 -apple-system,sans-serif",
                color: i === 0 ? "#cfd6ea" : "#5a6280",
                display: "flex",
                alignItems: "center",
                paddingLeft: 6,
                boxSizing: "content-box",
                // 原采集页 content-box：paddingLeft 加在 84% 之外，激活项底色更宽
                background: i === 0 ? "#222839" : "transparent"
              },
              children: s
            }, s))
          }), /* @__PURE__ */jsx2(Quad, {
            x: 18,
            y: 14,
            w: 38,
            h: 36,
            children: [__scCopy("12.4k"), "+38%", __scCopy("4.1s")].map((s, i) => /* @__PURE__ */jsxs("div", {
              style: {
                position: "absolute",
                left: `${5 + i * 31.5}%`,
                top: "16%",
                width: "28%",
                height: "44%",
                borderRadius: 6,
                background: "#202634",
                padding: __scCopy("8px 0 0 8px"),
                boxSizing: "border-box"
              },
              children: [/* @__PURE__ */jsx2("div", {
                style: {
                  font: "700 13px/1 -apple-system,sans-serif",
                  color: "#e7ecfb"
                },
                children: s
              }), /* @__PURE__ */jsxs("div", {
                style: {
                  marginTop: 4,
                  font: "600 6px/1 -apple-system,sans-serif",
                  letterSpacing: 1,
                  color: "#5d6580"
                },
                children: [__scCopy("METRIC "), i + 1]
              })]
            }, s))
          }), /* @__PURE__ */jsx2(Quad, {
            x: 59,
            y: 14,
            w: 37,
            h: 36,
            children: /* @__PURE__ */jsx2("svg", {
              viewBox: "0 0 100 46",
              style: {
                position: "absolute",
                left: "6%",
                top: "16%",
                width: "88%",
                height: "70%"
              },
              children: /* @__PURE__ */jsx2("path", {
                d: LINE_D,
                fill: "none",
                stroke: "#6c8cff",
                strokeWidth: 1.6,
                strokeLinejoin: "round"
              })
            })
          }), /* @__PURE__ */jsx2(Quad, {
            x: 59,
            y: 55,
            w: 37,
            h: 34,
            children: Array.from({
              length: 9
            }, (_, i) => /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: `${7 + i * 9.8}%`,
                bottom: "14%",
                width: "6.4%",
                height: `${22 + rand(i * 3 + 1) * 55}%`,
                borderRadius: 2,
                background: "linear-gradient(180deg,#c86cff,#5c4bd6)"
              }
            }, i))
          }), /* @__PURE__ */jsx2(Quad, {
            x: 18,
            y: 55,
            w: 38,
            h: 34,
            children: Array.from({
              length: 5
            }, (_, i) => /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: "6%",
                top: `${12 + i * 17}%`,
                width: "88%",
                height: "11%",
                borderRadius: 3,
                background: "#202634",
                boxShadow: `inset ${30 + rand(i + 2) * 45}% 0 0 rgba(108,140,255,.35)`
              }
            }, i))
          })]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: `${v.cx}%`,
            top: `${v.cy}%`,
            width: 26,
            height: 26,
            boxSizing: "content-box",
            borderRadius: "50%",
            border: "2px solid #8fa7ff",
            zIndex: 39,
            transformOrigin: "50% 50%",
            opacity: hold ? (1 - click) * 0.85 : 0,
            transform: `translate(-50%,-50%) scale(${(0.3 + click * 1.6) / v.s})`
          }
        }), /* @__PURE__ */jsx2("svg", {
          viewBox: "0 0 24 24",
          style: {
            position: "absolute",
            left: `${v.cx}%`,
            top: `${v.cy}%`,
            width: 22,
            height: 22,
            transformOrigin: "0 0",
            filter: "drop-shadow(0 3px 5px rgba(0,0,0,.75))",
            pointerEvents: "none",
            zIndex: 40,
            transform: `scale(${1 / v.s})`
          },
          children: /* @__PURE__ */jsx2("path", {
            d: __scCopy("M4 2 L4 19 L9 14.4 L12.2 21.5 L15.4 20 L12.2 13 L19 12.6 Z"),
            fill: click > 0 && click < 0.4 ? "#dfe6ff" : "#fff",
            stroke: "#101320",
            strokeWidth: 1.1
          })
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CursorFlyover;
 return {component:template_entry_default,duration:CURSOR_FLYOVER_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
