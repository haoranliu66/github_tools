// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx
import { useLayoutEffect, useRef, useState } from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx

var CHIP_GRID_SINGLE_SELECT_BLACKOUT_DURATION = 150;
var SANS = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#SANS", "SANS", () => '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif');
var BG = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#BG", "BG", () => "#F1F1F3");
var INK = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#INK", "INK", () => "#0B0B0C");
var TXT = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#TXT", "TXT", () => "#111111");
var DIM = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#DIM", "DIM", () => "#C9C9CE");
var LINE = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#LINE", "LINE", () => "#E6E6EA");
var clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
var h2r = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
var mix = (p, a, b) => {
  const A = h2r(a),
    B = h2r(b),
    q = clamp01(p);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * q)},${Math.round(A[1] + (B[1] - A[1]) * q)},${Math.round(A[2] + (B[2] - A[2]) * q)})`;
};
var NAMES = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#NAMES", "NAMES", () => [__scCopy("Option one plan"), __scCopy("Option two plan"), __scCopy("Option three long name"), __scCopy("Option four"), __scCopy("Option five variant")]);
var TI = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#TI", "TI", () => 0);
var FS = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#FS", "FS", () => 0.44);
var CAP_TEXT = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#CAP_TEXT", "CAP_TEXT", () => __scCopy("18% off  \xB7  42.00  \u2192  34.44"));
var CAP_WORDS = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#CAP_WORDS", "CAP_WORDS", () => CAP_TEXT.split(" "));
var CAP_N = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#CAP_N", "CAP_N", () => CAP_WORDS.length);
var CAP_ST = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#CAP_ST", "CAP_ST", () => 0.78 / CAP_N);
var CAP_WIN = __scConfig("demos/interaction/chip-grid-single-select-blackout/ChipGridSingleSelectBlackout.tsx#CAP_WIN", "CAP_WIN", () => CAP_ST * 1.5);
var ChipGridSingleSelectBlackout = () => {
  const t = useT();
  const targetRef = useRef(null);
  const [cx, setCx] = useState(149);
  useLayoutEffect(() => {
    const el = targetRef.current;
    if (el && el.offsetWidth) setCx(220 - (el.offsetLeft + el.offsetWidth / 2));
  }, []);
  const capShow = seg(t, FS + 0.36, FS + 0.42);
  const capInn = seg(t, FS + 0.37, 0.98);
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
            left: 0,
            right: 0,
            top: 26,
            textAlign: "center",
            font: `600 11px/1 ${SANS}`,
            letterSpacing: 2.4,
            color: "#9A9AA2",
            opacity: seg(t, 0.02, 0.1, E.outQuad)
          },
          children: __scCopy("OPTION GROUP")
        }), [0, 1].map(row => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            top: row === 0 ? 96 : 136,
            display: "flex",
            justifyContent: "center",
            gap: 10
          },
          children: NAMES.map((n, i) => {
            if ((i < 3 ? 0 : 1) !== row) return null;
            const d = 0.05 + i * 0.028;
            const inP = seg(t, d, d + 0.04, E.outQuad);
            let bg = "#fff";
            let borderColor = LINE;
            let labelColor = TXT;
            let flashO = "0";
            let opacity;
            let transform;
            if (i === TI) {
              flashO = (seg(t, FS, FS + 6e-3) * (1 - seg(t, FS + 6e-3, FS + 0.014))).toFixed(3);
              const bk = seg(t, FS + 8e-3, FS + 0.04, E.linear);
              bg = mix(bk, "#ffffff", INK);
              borderColor = mix(bk, LINE, INK);
              labelColor = mix(bk, TXT, "#ffffff");
              const pr = seg(t, FS + 8e-3, FS + 0.075, E.linear);
              const sc = 1 + Math.sin(pr * Math.PI) * 0.04 * (pr > 0 ? 1 : 0);
              const lift = seg(t, FS + 0.3, FS + 0.42, E.inOutCubic);
              opacity = inP;
              transform = `translate(${(cx * lift).toFixed(2)}px,${(-46 * lift).toFixed(2)}px) scale(${(sc * lerp(lift, 1, 0.82)).toFixed(4)})`;
            } else {
              const fade = seg(t, FS + 8e-3, FS + 0.075, E.outQuad);
              const gone = seg(t, FS + 0.3, FS + 0.35, E.outQuad);
              opacity = (inP * lerp(fade, 1, 0.18) * (1 - gone)).toFixed(3);
              transform = "none";
            }
            return /* @__PURE__ */jsxs("div", {
              ref: i === TI ? targetRef : void 0,
              style: {
                position: "relative",
                height: 30,
                borderRadius: 15,
                background: bg,
                border: `1px solid ${borderColor}`,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                padding: __scCopy("0 15px"),
                boxShadow: "0 1px 4px rgba(0,0,0,.04)",
                overflow: "hidden",
                opacity,
                transform
              },
              children: [/* @__PURE__ */jsx2("div", {
                style: {
                  font: `600 12px/1 ${SANS}`,
                  color: labelColor,
                  letterSpacing: __scCopy("-.01em"),
                  whiteSpace: "nowrap"
                },
                children: n
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  position: "absolute",
                  inset: 0,
                  background: "rgba(120,120,120,.5)",
                  opacity: flashO
                }
              })]
            }, i);
          })
        }, row)), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: "50%",
            top: 150,
            display: "flex",
            alignItems: "baseline",
            whiteSpace: "nowrap",
            transform: "translateX(-50%)",
            opacity: capShow
          },
          children: CAP_WORDS.map((w, i) => {
            const q = clamp01((capInn - i * CAP_ST) / CAP_WIN);
            return /* @__PURE__ */jsx2("span", {
              style: {
                font: `600 14px/1.25 ${SANS}`,
                color: mix(q, DIM, TXT),
                letterSpacing: (-0.03 * (1 - q)).toFixed(4) + __scCopy("em"),
                marginRight: i === CAP_N - 1 ? 0 : 4.5
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
var template_entry_default = ChipGridSingleSelectBlackout;
 return {component:template_entry_default,duration:CHIP_GRID_SINGLE_SELECT_BLACKOUT_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
