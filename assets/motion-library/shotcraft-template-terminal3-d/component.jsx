// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/camera/terminal-3d/Terminal3D.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/camera/terminal-3d/Terminal3D.tsx

var TERMINAL_3D_DURATION = 180;
var K = __scConfig("demos/camera/terminal-3d/Terminal3D.tsx#K", "K", () => 4);
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
var DATA = __scConfig("demos/camera/terminal-3d/Terminal3D.tsx#DATA", "DATA", () => [{
  pose: {
    x: -300,
    y: -34,
    z: -110,
    ry: 24
  },
  title: __scCopy("~/workspace \u2014 zsh"),
  cmd: __scCopy("$ git status -sb"),
  out: ["## main...origin/main", " M src/timeline.ts", " M src/camera.ts", "?? fx/b01.js"]
}, {
  pose: {
    x: 96,
    y: 62,
    z: 90,
    ry: -16
  },
  title: __scCopy("dev server"),
  cmd: __scCopy("$ npm run dev"),
  out: [__scCopy("vite v5.2.0  ready in 312 ms"), "\u279C  local:   http://localhost:3000", "\u279C  network: 192.0.2.10:3000", __scCopy("watching 148 modules")]
}, {
  pose: {
    x: 402,
    y: -74,
    z: -60,
    ry: -32
  },
  title: __scCopy("logs"),
  cmd: __scCopy("$ tail -f server.log"),
  out: ["12:04:11 GET /api/render 200 41ms", "12:04:12 POST /api/queue 201 88ms", "12:04:14 worker#3 frame 240/270", "12:04:15 done \u2192 out/final.mp4"]
}]);
var STEP = __scConfig("demos/camera/terminal-3d/Terminal3D.tsx#STEP", "STEP", () => [[0, 0.02], [0.3, 0.44], [0.64, 0.78]]);
var TYPE = __scConfig("demos/camera/terminal-3d/Terminal3D.tsx#TYPE", "TYPE", () => [0.05, 0.47, 0.81]);
var PK = __scConfig("demos/camera/terminal-3d/Terminal3D.tsx#PK", "PK", () => ["x", "y", "z", __scCopy("ry")]);
var Terminal3D = () => {
  const t = useT();
  const v = acc(t, DATA[0].pose, [{
    at: STEP[1],
    to: DATA[1].pose
  }, {
    at: STEP[2],
    to: DATA[2].pose
  }], PK, E.inOutCubic);
  let pull = 0;
  for (let i = 1; i < 3; i++) {
    const u = seg(t, STEP[i][0], STEP[i][1]);
    pull += Math.sin(u * Math.PI) * 210;
  }
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#07080e",
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 480 * K,
        height: 270 * K,
        transform: `scale(${1 / K})`,
        transformOrigin: __scCopy("top left")
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 0,
          background: "radial-gradient(120% 90% at 50% 0%,#141826,#07080e 70%)",
          perspective: `${900 * K}px`,
          overflow: "hidden",
          WebkitFontSmoothing: "antialiased"
          // 原样片截帧为灰度平滑，避免笔画偏粗
        },
        children: /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            transform: `translateZ(${(300 - pull) * K}px) rotateY(${-v.ry}deg) translate3d(${-v.x * K}px,${-v.y * K}px,${-v.z * K}px)`
          },
          children: DATA.map((d, i) => {
            const p = d.pose;
            const focus = 1 - Math.min(1, Math.abs(v.x - p.x) / 420);
            const ty = seg(t, TYPE[i], TYPE[i] + 0.09);
            const n = Math.floor(ty * d.cmd.length + 1e-4);
            const caretOp = ty >= 1 ? Math.floor(t * 26) % 2 ? 0.15 : 0.9 : Math.floor(t * 40) % 2 ? 0.35 : 1;
            return /* @__PURE__ */jsxs("div", {
              style: {
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 300 * K,
                height: 176 * K,
                margin: `${-88 * K}px 0 0 ${-150 * K}px`,
                borderRadius: 9 * K,
                background: "#0e1017",
                overflow: "hidden",
                boxShadow: `0 ${24 * K}px ${60 * K}px rgba(0,0,0,.7),inset 0 0 0 ${K}px #2a3040`,
                transform: `translate3d(${p.x * K}px,${p.y * K}px,${p.z * K}px) rotateY(${p.ry}deg)`,
                opacity: 0.34 + focus * 0.66,
                filter: `blur(${(1 - focus) * 2.2 * K}px) brightness(${0.7 + focus * 0.3})`
              },
              children: [/* @__PURE__ */jsxs("div", {
                style: {
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: 22 * K,
                  background: "linear-gradient(180deg,#242a38,#1b202b)",
                  borderBottom: `${K}px solid #2c3242`
                },
                children: [["#ff6058", "#ffbd2e", "#28ca42"].map((c, k) => /* @__PURE__ */jsx2("div", {
                  style: {
                    position: "absolute",
                    left: (9 + k * 13) * K,
                    top: 8 * K,
                    width: 7 * K,
                    height: 7 * K,
                    borderRadius: "50%",
                    background: c
                  }
                }, c)), /* @__PURE__ */jsx2("div", {
                  style: {
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: 22 * K,
                    textAlign: "center",
                    font: `600 ${8 * K}px/${22 * K}px Courier,monospace`,
                    color: "#77809b"
                  },
                  children: d.title
                })]
              }), /* @__PURE__ */jsxs("div", {
                style: {
                  position: "absolute",
                  left: 12 * K,
                  top: 32 * K,
                  font: `600 ${9.5 * K}px/1 Courier,monospace`,
                  color: "#9dffcf",
                  whiteSpace: "pre"
                },
                children: [Array.from(d.cmd, (ch, c) =>
                // 空格换成 nbsp，对齐 effect.js 的 textContent 处理
                /* @__PURE__ */
                jsx2("span", {
                  style: {
                    opacity: c < n ? 1 : 0
                  },
                  children: ch === " " ? " " : ch
                }, c)), /* @__PURE__ */jsx2("span", {
                  style: {
                    color: "#9dffcf",
                    opacity: caretOp,
                    display: "inline-block",
                    transform: `translateX(${(d.cmd.length - n) * -0.1 * K}px)`
                  },
                  children: __scCopy("\u258C")
                })]
              }), d.out.map((o, k) => {
                const ou = seg(t, TYPE[i] + 0.1 + k * 0.022, TYPE[i] + 0.145 + k * 0.022, E.outCubic);
                return /* @__PURE__ */jsx2("div", {
                  style: {
                    position: "absolute",
                    left: 12 * K,
                    top: (52 + k * 16) * K,
                    font: `500 ${9 * K}px/1 Courier,monospace`,
                    color: k === 0 ? "#c9d3ea" : "#7f8aa6",
                    whiteSpace: "pre",
                    opacity: ou,
                    transform: `translateX(${lerp(ou, -7, 0) * K}px)`
                  },
                  children: o
                }, k);
              })]
            }, i);
          })
        })
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = Terminal3D;
 return {component:template_entry_default,duration:TERMINAL_3D_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
