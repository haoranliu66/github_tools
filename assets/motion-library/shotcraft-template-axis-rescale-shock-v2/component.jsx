// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/AxisRescaleShockV2.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/AxisRescaleShockV2.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/AxisRescaleShockV2.tsx

var AMBER = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#AMBER", "AMBER", () => "#b45309");
var CARD_W = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#CARD_W", "CARD_W", () => 1060);
var CARD_H = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#CARD_H", "CARD_H", () => 600);
var CX = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#CX", "CX", () => (1920 - CARD_W) / 2);
var CY = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#CY", "CY", () => (1080 - CARD_H) / 2 + 40);
var PAD = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#PAD", "PAD", () => 52);
var AXIS_W = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#AXIS_W", "AXIS_W", () => 96);
var PLOT_W = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#PLOT_W", "PLOT_W", () => CARD_W - PAD * 2 - AXIS_W);
var PLOT_H = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#PLOT_H", "PLOT_H", () => 360);
var PLOT_X = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#PLOT_X", "PLOT_X", () => PAD + AXIS_W);
var PLOT_Y = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#PLOT_Y", "PLOT_Y", () => 130);
var DATA = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#DATA", "DATA", () => [22, 30, 26, 38, 35, 47, 44, 58, 55, 66, 72, 340]);
var N = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#N", "N", () => DATA.length);
var MONTHS = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#MONTHS", "MONTHS", () => [__scCopy("Jan"), __scCopy("Feb"), __scCopy("Mar"), __scCopy("Apr"), __scCopy("May"), __scCopy("Jun"), __scCopy("Jul"), __scCopy("Aug"), __scCopy("Sep"), __scCopy("Oct"), __scCopy("Nov"), __scCopy("Dec")]);
var HOLD = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#HOLD", "HOLD", () => 12);
var DRAW_END = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#DRAW_END", "DRAW_END", () => HOLD + 34);
var SHOCK_END = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#SHOCK_END", "SHOCK_END", () => DRAW_END + 16);
var BEAT = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#BEAT", "BEAT", () => SHOCK_END + 16);
var RESCALE_END = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#RESCALE_END", "RESCALE_END", () => BEAT + 12);
var MARK_END = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#MARK_END", "MARK_END", () => RESCALE_END + 8);
var VAL_END = __scConfig("demos/data/chart-live-moves/AxisRescaleShockV2.tsx#VAL_END", "VAL_END", () => MARK_END + 10);
var easeDraw = Easing.inOut(Easing.cubic);
var AxisRescaleShockV2 = () => {
  const frame = useCurrentFrame();
  const range = interpolate(frame, [BEAT, RESCALE_END], [100, 400], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const yOf = v => PLOT_H - v / range * PLOT_H;
  const drawT = interpolate(frame, [HOLD, DRAW_END], [0, N - 2], {
    easing: easeDraw,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const shockT = interpolate(frame, [DRAW_END + 2, SHOCK_END], [0, 1], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const SHOCK_Y = -(PLOT_Y + 220);
  const rescaleP = interpolate(frame, [BEAT, RESCALE_END], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const xOf = i => i / (N - 1) * PLOT_W;
  const basePts = [];
  const upto = Math.min(drawT, N - 2);
  for (let i = 0; i <= Math.floor(upto); i++) basePts.push(`${xOf(i).toFixed(2)},${yOf(DATA[i]).toFixed(2)}`);
  if (upto < N - 2 && upto > Math.floor(upto)) {
    const i = Math.floor(upto);
    const f = upto - i;
    const x = xOf(i) + (xOf(i + 1) - xOf(i)) * f;
    const y = yOf(DATA[i]) + (yOf(DATA[i + 1]) - yOf(DATA[i])) * f;
    basePts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  let headX = basePts.length ? Number(basePts[basePts.length - 1].split(",")[0]) : 0;
  let headY = basePts.length ? Number(basePts[basePts.length - 1].split(",")[1]) : 0;
  let shockSeg = [];
  if (shockT > 0) {
    const x0 = xOf(N - 2);
    const y0 = yOf(DATA[N - 2]);
    const x = x0 + (xOf(N - 1) - x0) * shockT;
    const yEnd = SHOCK_Y + (yOf(DATA[N - 1]) - SHOCK_Y) * rescaleP;
    const y = y0 + (yEnd - y0) * shockT;
    shockSeg = [`${x0.toFixed(2)},${y0.toFixed(2)}`, `${x.toFixed(2)},${y.toFixed(2)}`];
    headX = x;
    headY = y;
  }
  const swap = interpolate(frame, [BEAT, BEAT + 10], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const OLD_TICKS = [__scCopy("$25k"), __scCopy("$50k"), __scCopy("$75k"), __scCopy("$100k")];
  const NEW_TICKS = [__scCopy("$100k"), __scCopy("$200k"), __scCopy("$300k"), __scCopy("$400k")];
  const denseOp = swap;
  const markS = interpolate(frame, [RESCALE_END, MARK_END], [0, 1], {
    easing: Easing.out(Easing.back(2.2)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const valS = interpolate(frame, [MARK_END, VAL_END], [0, 1], {
    easing: Easing.out(Easing.back(1.8)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const kick = frame >= SHOCK_END && frame < SHOCK_END + 8 ? 8 * (1 - (frame - SHOCK_END) / 8) * Math.sin((frame - SHOCK_END) * 2.6) : 0;
  const shockOn = frame >= DRAW_END;
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
        top: 100,
        width: "100%",
        textAlign: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("AXIS RESCALE SHOCK V2"),
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
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transform: `translateY(${kick.toFixed(2)}px)`,
        overflow: "visible"
        // 让爆表段真的越出卡片
      },
      children: [/* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: PAD,
          top: 34,
          fontFamily: "Helvetica, Arial, sans-serif"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 30,
            fontWeight: 700,
            color: G.ink
          },
          children: __scCopy("Monthly revenue")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 19,
            fontWeight: 500,
            color: G.mid,
            marginTop: 6
          },
          children: __scCopy("FY2026 \xB7 all products \xB7 USD")
        })]
      }), /* @__PURE__ */jsxs2("div", {
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
            background: G.line
          }
        }, `g${i}`)), [1, 3, 5, 7].map(i => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: PLOT_H / 8 * i,
            height: 1.5,
            background: G.line,
            opacity: 0.8 * denseOp
          }
        }, `gd${i}`)), OLD_TICKS.map((v, i) => {
          const y = PLOT_H / 4 * (3 - i);
          return /* @__PURE__ */jsxs2("div", {
            style: {
              position: "absolute",
              left: -AXIS_W,
              top: y - 13,
              width: AXIS_W - 14,
              height: 26,
              textAlign: "right"
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                inset: 0,
                fontFamily: __scCopy("Helvetica"),
                fontWeight: 700,
                fontSize: 21,
                color: G.mid,
                textAlign: "right",
                opacity: 1 - swap,
                transform: `translateY(${(swap * 30).toFixed(2)}px)`
              },
              children: v
            }), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                inset: 0,
                fontFamily: __scCopy("Helvetica"),
                fontWeight: 700,
                fontSize: 21,
                color: G.ink,
                textAlign: "right",
                opacity: swap,
                transform: `translateY(${((swap - 1) * 30).toFixed(2)}px)`
              },
              children: NEW_TICKS[i]
            })]
          }, `t${i}`);
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: -AXIS_W,
            top: PLOT_H - 13,
            width: AXIS_W - 14,
            fontFamily: __scCopy("Helvetica"),
            fontWeight: 700,
            fontSize: 21,
            color: G.mid,
            textAlign: "right"
          },
          children: __scCopy("$0")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 3,
            background: G.bar
          }
        }), /* @__PURE__ */jsxs2("svg", {
          width: PLOT_W,
          height: PLOT_H,
          style: {
            position: "absolute",
            inset: 0,
            overflow: "visible"
          },
          children: [/* @__PURE__ */jsx2("polyline", {
            points: basePts.join(" "),
            fill: "none",
            stroke: G.ink,
            strokeWidth: 5,
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }), shockSeg.length > 0 && /* @__PURE__ */jsx2("polyline", {
            points: shockSeg.join(" "),
            fill: "none",
            stroke: AMBER,
            strokeWidth: shockOn && frame < RESCALE_END ? 10 : 6,
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }), markS > 0 && /* @__PURE__ */jsxs2(Fragment, {
            children: [/* @__PURE__ */jsx2("circle", {
              cx: headX,
              cy: headY,
              r: 13 * markS,
              fill: AMBER
            }), /* @__PURE__ */jsx2("circle", {
              cx: headX,
              cy: headY,
              r: 22 * markS,
              fill: "none",
              stroke: AMBER,
              strokeWidth: 3,
              opacity: 0.55
            })]
          })]
        }), valS > 0 && /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: headX - 178,
            top: headY - 27,
            width: 150,
            height: 54,
            background: AMBER,
            borderRadius: 10,
            color: "#fff",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${valS.toFixed(4)})`,
            transformOrigin: __scCopy("right center")
          },
          children: __scCopy("$340k")
        }), MONTHS.map((m, i) => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: xOf(i) - 30,
            top: PLOT_H + 16,
            width: 60,
            textAlign: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: i === N - 1 ? AMBER : G.mid
          },
          children: m
        }, `m${i}`))]
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AxisRescaleShockV2;
 return {component:template_entry_default,duration:180};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
