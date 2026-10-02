// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/OscilloscopeStreamV2.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/OscilloscopeStreamV2.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/OscilloscopeStreamV2.tsx

var AMBER = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#AMBER", "AMBER", () => "#b45309");
var CARD_W = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#CARD_W", "CARD_W", () => 1080);
var CARD_H = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#CARD_H", "CARD_H", () => 560);
var CX = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#CX", "CX", () => (1920 - CARD_W) / 2);
var CY = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#CY", "CY", () => (1080 - CARD_H) / 2 + 40);
var PAD = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#PAD", "PAD", () => 46);
var AXIS_W = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#AXIS_W", "AXIS_W", () => 64);
var PLOT_X = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#PLOT_X", "PLOT_X", () => PAD + AXIS_W);
var PLOT_W = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#PLOT_W", "PLOT_W", () => CARD_W - PAD * 2 - AXIS_W);
var PLOT_H = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#PLOT_H", "PLOT_H", () => 300);
var PLOT_Y = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#PLOT_Y", "PLOT_Y", () => 158);
var HOLD = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#HOLD", "HOLD", () => 12);
var FREEZE_START = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#FREEZE_START", "FREEZE_START", () => 100);
var FREEZE_END = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#FREEZE_END", "FREEZE_END", () => 112);
var SPEED = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#SPEED", "SPEED", () => 8);
var AMP = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#AMP", "AMP", () => 0.72);
var SPIKE_X0 = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#SPIKE_X0", "SPIKE_X0", () => 288);
var SPIKE_W = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#SPIKE_W", "SPIKE_W", () => 160);
var SPIKE_GAIN = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#SPIKE_GAIN", "SPIKE_GAIN", () => 1.2);
var env = x => {
  if (x <= SPIKE_X0 || x >= SPIKE_X0 + SPIKE_W) return 1;
  const p = (x - SPIKE_X0) / SPIKE_W;
  return 1 + SPIKE_GAIN * (0.5 - 0.5 * Math.cos(p * Math.PI * 2));
};
var effTime = frame => {
  const t = f => Math.max(f - HOLD, 0) * SPEED;
  if (frame <= FREEZE_START) return t(frame);
  const brakeDist = (t(FREEZE_END) - t(FREEZE_START)) * 0.45;
  return t(FREEZE_START) + interpolate(frame, [FREEZE_START, FREEZE_END], [0, brakeDist], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp"
  });
};
var wave = x => 0.34 * Math.sin(x * 0.021) + 0.27 * Math.sin(x * 0.052 + 1.7) + 0.18 * Math.sin(x * 0.013 + 4.2) + 0.12 * Math.sin(x * 0.087 + 2.3);
var signal = x => wave(x) * env(x) * AMP;
var yOf = x => PLOT_H / 2 - signal(x) * (PLOT_H / 2);
var valueOf = x => Math.round(1e3 + signal(x) * 1e3);
var fmt = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
var Y_TICKS = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#Y_TICKS", "Y_TICKS", () => [__scCopy("2.0k"), __scCopy("1.5k"), __scCopy("1.0k"), __scCopy("0.5k"), "0"]);
var X_TICKS = __scConfig("demos/data/chart-live-moves/OscilloscopeStreamV2.tsx#X_TICKS", "X_TICKS", () => [__scCopy("-60s"), __scCopy("-50s"), __scCopy("-40s"), __scCopy("-30s"), __scCopy("-20s"), __scCopy("-10s"), __scCopy("now")]);
var OscilloscopeStreamV2 = () => {
  const frame = useCurrentFrame();
  const T = effTime(frame);
  const N = 270;
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const px = i / N * PLOT_W;
    const worldX = T - (PLOT_W - px);
    pts.push(`${px.toFixed(2)},${yOf(worldX).toFixed(2)}`);
  }
  const headY = yOf(T);
  const frozen = frame >= FREEZE_END;
  const glowOp = interpolate(frame, [FREEZE_START, FREEZE_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const TAIL = 160;
  const tailPts = [];
  if (!frozen) {
    for (let i = 0; i <= 40; i++) {
      const px = PLOT_W - TAIL + i / 40 * TAIL;
      const worldX = T - (PLOT_W - px);
      tailPts.push(`${px.toFixed(2)},${yOf(worldX).toFixed(2)}`);
    }
  }
  const spikeK = Math.min(Math.max((env(T) - 1) / SPIKE_GAIN, 0), 1);
  const hot = spikeK > 0.22;
  const readout = fmt(valueOf(T));
  const readScale = 1 + 0.32 * spikeK;
  const dotColor = spikeK > 0.15 ? AMBER : G.ink;
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
        text: __scCopy("OSCILLOSCOPE STREAM V2"),
        size: 72
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: CX,
        top: CY,
        width: CARD_W,
        height: CARD_H,
        background: G.card,
        border: `2px solid ${G.border}`,
        borderRadius: 14,
        boxSizing: "border-box",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
      },
      children: [/* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: PAD,
          top: 38,
          fontFamily: "Helvetica, Arial, sans-serif"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 30,
            fontWeight: 700,
            color: G.ink
          },
          children: __scCopy("Requests per second")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 20,
            fontWeight: 500,
            color: G.mid,
            marginTop: 8
          },
          children: __scCopy("api-gateway \xB7 production \xB7 last 60 s")
        })]
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          right: PAD,
          top: 36,
          textAlign: "right",
          fontFamily: "Helvetica, Arial, sans-serif",
          transform: `scale(${readScale.toFixed(4)})`,
          transformOrigin: __scCopy("right top")
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 46,
            fontWeight: 800,
            color: hot ? AMBER : G.ink,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: -1
          },
          children: readout
        }), /* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 18,
            fontWeight: 600,
            color: hot ? AMBER : G.mid,
            marginTop: 2
          },
          children: __scCopy("req/s \xB7 live")
        })]
      }), Y_TICKS.map((t, i) => /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: PAD - 6,
          top: PLOT_Y + PLOT_H / 4 * i - 11,
          width: AXIS_W - 8,
          textAlign: "right",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: 20,
          fontWeight: 600,
          color: G.mid
        },
        children: t
      }, `yt${i}`)), /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: PLOT_X,
          top: PLOT_Y,
          width: PLOT_W,
          height: PLOT_H
        },
        children: [[0, 1, 2, 3, 4].map(i => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: PLOT_H / 4 * i,
            height: 2,
            background: G.line,
            opacity: 0.7
          }
        }, `h${i}`)), [0, 1, 2, 3, 4, 5, 6].map(i => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: PLOT_W / 6 * i,
            width: 2,
            background: G.line,
            opacity: 0.45
          }
        }, `v${i}`)), /* @__PURE__ */jsxs2("svg", {
          width: PLOT_W,
          height: PLOT_H,
          style: {
            position: "absolute",
            inset: 0,
            overflow: "visible"
          },
          children: [/* @__PURE__ */jsx2("polyline", {
            points: pts.join(" "),
            fill: "none",
            stroke: G.ink,
            strokeWidth: 5,
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }), !frozen && glowOp > 0 && /* @__PURE__ */jsx2("polyline", {
            points: tailPts.join(" "),
            fill: "none",
            stroke: "#6a6a68",
            strokeWidth: 9,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            opacity: 0.55 * glowOp,
            style: {
              filter: "blur(2px)"
            }
          }), !frozen && glowOp > 0 && /* @__PURE__ */jsxs2(Fragment, {
            children: [/* @__PURE__ */jsx2("circle", {
              cx: PLOT_W,
              cy: headY,
              r: 24,
              fill: spikeK > 0.15 ? AMBER : "#8f8f8d",
              opacity: 0.35 * glowOp,
              style: {
                filter: "blur(5px)"
              }
            }), /* @__PURE__ */jsx2("circle", {
              cx: PLOT_W,
              cy: headY,
              r: 10.5,
              fill: dotColor,
              opacity: glowOp
            })]
          })]
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: PLOT_X,
          top: PLOT_Y + PLOT_H + 14,
          width: PLOT_W
        },
        children: X_TICKS.map((t, i) => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: PLOT_W / 6 * i - 40,
            width: 80,
            textAlign: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 19,
            fontWeight: 600,
            color: G.mid
          },
          children: t
        }, `xt${i}`))
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = OscilloscopeStreamV2;
 return {component:template_entry_default,duration:180};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
