// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx

var CHIP_LIFT_TO_USER_PILL_DURATION = 150;
var SANS = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#SANS", "SANS", () => '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif');
var BG = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#BG", "BG", () => "#F1F1F3");
var INK = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#INK", "INK", () => "#0B0B0C");
var TXT = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#TXT", "TXT", () => "#111111");
var DIM = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#DIM", "DIM", () => "#C9C9CE");
var LINE = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#LINE", "LINE", () => "#E6E6EA");
var clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;
var h2r = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
var mix = (p, a, b) => {
  const A = h2r(a),
    B = h2r(b),
    q = clamp01(p);
  return `rgb(${Math.round(A[0] + (B[0] - A[0]) * q)},${Math.round(A[1] + (B[1] - A[1]) * q)},${Math.round(A[2] + (B[2] - A[2]) * q)})`;
};
var COLS = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#COLS", "COLS", () => 4);
var ROWS = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#ROWS", "ROWS", () => 3);
var CW = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#CW", "CW", () => 40);
var CH = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#CH", "CH", () => 24);
var GX = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#GX", "GX", () => 10);
var GY = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#GY", "GY", () => 9);
var GX0 = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#GX0", "GX0", () => 8);
var GY0 = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#GY0", "GY0", () => 70);
var TC = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#TC", "TC", () => 1);
var TR = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#TR", "TR", () => 1);
var LABELS = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#LABELS", "LABELS", () => [__scCopy("JD"), __scCopy("MK"), __scCopy("CD"), __scCopy("RL"), __scCopy("AV"), __scCopy("TP"), __scCopy("KN"), __scCopy("BW"), __scCopy("CE"), __scCopy("HR"), __scCopy("LM"), __scCopy("DQ")]);
var TX = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#TX", "TX", () => GX0 + TC * (CW + GX));
var TY = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#TY", "TY", () => GY0 + TR * (CH + GY));
var OTHERS = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#OTHERS", "OTHERS", () => Array.from({
  length: ROWS * COLS
}, (_, i) => {
  const r = Math.floor(i / COLS),
    c = i % COLS;
  return {
    x: GX0 + c * (CW + GX),
    y: GY0 + r * (CH + GY),
    label: LABELS[i],
    dist: Math.abs(c - TC) + Math.abs(r - TR),
    isT: c === TC && r === TR
  };
}).filter(o => !o.isT));
var PW0 = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#PW0", "PW0", () => CW);
var PW1 = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#PW1", "PW1", () => 190);
var NAME_CHARS = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#NAME_CHARS", "NAME_CHARS", () => __scCopy("Casey Doe").split(""));
var CAP_WORDS = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#CAP_WORDS", "CAP_WORDS", () => __scCopy("Starting with Casey").split(" "));
var CAP_ST = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#CAP_ST", "CAP_ST", () => 0.78 / CAP_WORDS.length);
var CAP_WIN = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#CAP_WIN", "CAP_WIN", () => CAP_ST * 1.5);
var BADGE_SIZE = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#BADGE_SIZE", "BADGE_SIZE", () => 26);
var BADGE_SVG = __scConfig("demos/interaction/chip-lift-to-user-pill/ChipLiftToUserPill.tsx#BADGE_SVG", "BADGE_SVG", () => Number((BADGE_SIZE * 0.52).toFixed(1)));
var ChipLiftToUserPill = () => {
  const t = useT();
  const a = seg(t, 0.04, 0.085, E.linear);
  const aq = a < 0.34 ? 0 : a < 0.67 ? 0.5 : 1;
  const g = seg(t, 0.26, 0.44, E.outCubic);
  const w = lerp(g, PW0, PW1);
  const dq = seg(g, 0.85, 1, E.outBack);
  const cw = seg(t, 0.47, 0.57, E.outQuad);
  const bp = seg(t, 0.56, 0.63, E.outCubic);
  const capShow = seg(t, 0.6, 0.66);
  const capInn = seg(t, 0.6, 0.92);
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
        children: [OTHERS.map((o, i) => {
          const d0 = 0.1 + o.dist * 0.022;
          const p = seg(t, d0, d0 + 0.075, E.outQuad);
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: o.x,
              top: o.y,
              width: CW,
              height: CH,
              borderRadius: CH / 2,
              background: "#fff",
              border: `1px solid ${LINE}`,
              display: "flex",
              alignItems: "center",
              boxSizing: "border-box",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,.04)",
              opacity: 1 - p,
              transform: `scale(${lerp(p, 1, 0.9)})`
            },
            children: /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 0,
                top: 0,
                width: CW,
                height: CH,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                font: `600 10.5px/1 ${SANS}`,
                letterSpacing: ".6px",
                color: TXT
              },
              children: o.label
            })
          }, i);
        }), /* @__PURE__ */jsxs("div", {
          style: {
            position: "absolute",
            left: TX,
            top: TY,
            width: w,
            height: CH,
            borderRadius: CH / 2,
            background: mix(aq, "#ffffff", INK),
            border: `1px solid ${mix(aq, LINE, INK)}`,
            display: "flex",
            alignItems: "center",
            boxSizing: "border-box",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0,0,0,.04)"
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: CW,
              height: CH,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              font: `600 10.5px/1 ${SANS}`,
              letterSpacing: ".6px",
              color: mix(aq, TXT, "#ffffff"),
              opacity: 1 - clamp01(g * 5)
            },
            children: __scCopy("CD")
          }), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 13,
              top: 0,
              height: CH,
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap"
            },
            children: NAME_CHARS.map((ch, i) => {
              const p = seg(g, 0.18 + i * 0.062, 0.18 + i * 0.062 + 0.05, E.outQuad);
              return /* @__PURE__ */jsx2("span", {
                style: {
                  font: `600 11px/1 ${SANS}`,
                  color: "#fff",
                  opacity: p,
                  whiteSpace: "pre",
                  letterSpacing: ".2px",
                  transform: `translateY(${lerp(p, 2, 0)}px)`,
                  display: "inline-block"
                },
                children: ch
              }, i);
            })
          }), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              top: (CH - 7) / 2,
              left: w - 15,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#35D07F",
              boxShadow: "0 0 8px rgba(53,208,127,.6)",
              opacity: clamp01(dq * 2),
              transform: `scale(${dq})`
            }
          })]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: TX + PW1,
            top: TY + CH / 2,
            height: 1,
            width: `${(cw * 90).toFixed(1)}px`,
            background: TXT
          }
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
            left: TX + PW1 + 90 - 2,
            top: TY + CH / 2 - 13,
            opacity: bp,
            transform: `scale(${lerp(bp, 0.8, 1)})`
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
            left: TX + PW1 - 18,
            top: TY + CH + 34,
            opacity: capShow
          },
          children: CAP_WORDS.map((wd, i) => {
            const q = clamp01((capInn - i * CAP_ST) / CAP_WIN);
            return /* @__PURE__ */jsx2("span", {
              style: {
                font: `600 13px/1.25 ${SANS}`,
                color: mix(q, DIM, TXT),
                letterSpacing: (-0.03 * (1 - q)).toFixed(4) + __scCopy("em"),
                marginRight: i === CAP_WORDS.length - 1 ? 0 : 4.5
              },
              children: wd
            }, i);
          })
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ChipLiftToUserPill;
 return {component:template_entry_default,duration:CHIP_LIFT_TO_USER_PILL_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
