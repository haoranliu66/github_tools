// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/gradient-word-sweep/GradientWordSweep.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
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
 var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var FONT = __scConfig("demos/typography/gradient-word-sweep/GradientWordSweep.tsx#FONT", "FONT", () => '"Avenir Next", Futura, "Helvetica Neue", sans-serif');
var GRAD = __scConfig("demos/typography/gradient-word-sweep/GradientWordSweep.tsx#GRAD", "GRAD", () => "linear-gradient(92deg, #59c2ff 0%, #9d6bff 32%, #ff6ed4 62%, #ffc46b 100%)");
var FILL_START = __scConfig("demos/typography/gradient-word-sweep/GradientWordSweep.tsx#FILL_START", "FILL_START", () => 12);
var FILL_END = __scConfig("demos/typography/gradient-word-sweep/GradientWordSweep.tsx#FILL_END", "FILL_END", () => 30);
var LIGHT_START = __scConfig("demos/typography/gradient-word-sweep/GradientWordSweep.tsx#LIGHT_START", "LIGHT_START", () => FILL_END + 3);
var rand = mulberry32(20260718);
var FLICKER = __scConfig("demos/typography/gradient-word-sweep/GradientWordSweep.tsx#FLICKER", "FLICKER", () => Array.from({
  length: 160
}, () => rand()));
var makeLongBolt = r => {
  const x0 = 30 + r() * 220;
  const x1 = x0 + 160 + r() * 320;
  const yBase = 38 + r() * 42;
  const n = 7 + Math.floor(r() * 4);
  let d = `M ${x0.toFixed(1)} ${(yBase + 26 + r() * 20).toFixed(1)}`;
  for (let i = 1; i <= n; i++) {
    const x = x0 + (x1 - x0) * i / n + (r() - 0.5) * 22;
    const arch = Math.sin(i / n * Math.PI) * -22;
    const y = yBase + arch + (r() - 0.5) * 30 + (i === n ? 30 + r() * 18 : 0);
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return {
    d,
    long: true
  };
};
var makeShortBolt = r => {
  const x = 60 + r() * 540;
  const y0 = 72 + r() * 24;
  const y1 = y0 + 55 + r() * 45;
  const n = 4 + Math.floor(r() * 3);
  let d = `M ${x.toFixed(1)} ${y0.toFixed(1)}`;
  for (let i = 1; i <= n; i++) {
    const y = y0 + (y1 - y0) * i / n;
    const xx = x + (r() - 0.5) * 30;
    d += ` L ${xx.toFixed(1)} ${y.toFixed(1)}`;
  }
  return {
    d,
    long: false
  };
};
var BOLTS = __scConfig("demos/typography/gradient-word-sweep/GradientWordSweep.tsx#BOLTS", "BOLTS", () => Array.from({
  length: 16
}, (_, i) => i % 3 === 0 ? makeShortBolt(rand) : makeLongBolt(rand)));
var FLASHES = __scConfig("demos/typography/gradient-word-sweep/GradientWordSweep.tsx#FLASHES", "FLASHES", () => Array.from({
  length: 36
}, () => ({
  at: LIGHT_START + Math.floor(rand() * 70),
  life: 2 + Math.floor(rand() * 4),
  bolt: Math.floor(rand() * BOLTS.length)
})));
var GradientWordSweep = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const p = interpolate(frame, [FILL_START, FILL_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
  const pPct = p * 100;
  const filling = frame >= FILL_START && frame <= FILL_END + 4;
  const headFade = interpolate(frame, [FILL_END, FILL_END + 6], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const trailFade = interpolate(frame, [FILL_END, FILL_END + 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const TRAIL = 34;
  const trailMask = `linear-gradient(90deg, transparent 0%, transparent ${Math.max(0, pPct - TRAIL)}%, rgba(0,0,0,0.9) ${Math.max(0, pPct - 3)}%, rgba(0,0,0,0.9) ${Math.min(100, pPct + 1)}%, transparent ${Math.min(100, pPct + 6)}%)`;
  const noise = FLICKER[Math.min(frame, FLICKER.length - 1)];
  const active = FLASHES.filter(f => frame >= f.at && frame < f.at + f.life);
  const boltBoost = active.length > 0 ? 0.35 : 0;
  const glowLvl = interpolate(frame, [FILL_START, FILL_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) * (0.82 + 0.18 * noise) + boltBoost;
  const softMask = soft => p >= 1 ? "none" : `linear-gradient(90deg, #000 0%, #000 ${Math.max(0, pPct - soft)}%, transparent ${Math.min(100, pPct + soft * 0.6)}%)`;
  const maskStyle = soft => p >= 1 ? {} : {
    WebkitMaskImage: softMask(soft),
    maskImage: softMask(soft)
  };
  const lineStyle = {
    fontFamily: FONT,
    fontWeight: 700,
    fontStyle: "italic",
    fontSize: 92,
    letterSpacing: -1,
    lineHeight: 1.28,
    color: "#ffffff",
    whiteSpace: "nowrap"
  };
  const gradText = {
    position: "absolute",
    inset: 0,
    backgroundImage: GRAD,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent"
  };
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#050505",
      justifyContent: "center",
      alignItems: "center"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 500,
        top: 340,
        width: 820,
        height: 320,
        borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(180,110,255,0.6), rgba(255,110,212,0.25) 55%, transparent 78%)",
        filter: "blur(38px)",
        opacity: 0.55 * glowLvl
      }
    }), /* @__PURE__ */jsxs("div", {
      style: {
        textAlign: "center",
        opacity: enter,
        transform: `translateY(${(1 - enter) * 36}px)`
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: lineStyle,
        children: [/* @__PURE__ */jsxs("span", {
          style: {
            position: "relative",
            display: "inline-block"
          },
          children: [/* @__PURE__ */jsx("span", {
            children: __scCopy("Supercharged")
          }), /* @__PURE__ */jsx("span", {
            "aria-hidden": true,
            style: {
              ...gradText,
              ...maskStyle(14),
              filter: "blur(46px) saturate(1.6)",
              opacity: 0.55 * glowLvl,
              transform: "scale(1.05)"
            },
            children: __scCopy("Supercharged")
          }), /* @__PURE__ */jsx("span", {
            "aria-hidden": true,
            style: {
              ...gradText,
              ...maskStyle(10),
              filter: "blur(18px) saturate(1.4) brightness(1.15)",
              opacity: 0.62 * glowLvl
            },
            children: __scCopy("Supercharged")
          }), /* @__PURE__ */jsx("span", {
            "aria-hidden": true,
            style: {
              ...gradText,
              ...maskStyle(7),
              filter: "blur(6px) brightness(1.25)",
              opacity: 0.72 * Math.min(1, glowLvl + 0.1)
            },
            children: __scCopy("Supercharged")
          }), /* @__PURE__ */jsx("span", {
            "aria-hidden": true,
            style: {
              ...gradText,
              clipPath: `inset(-25% ${100 - pPct}% -25% 0)`
            },
            children: __scCopy("Supercharged")
          }), trailFade > 0.01 && /* @__PURE__ */jsx("span", {
            "aria-hidden": true,
            style: {
              ...gradText,
              WebkitMaskImage: trailMask,
              maskImage: trailMask,
              filter: "blur(9px) saturate(1.7) brightness(1.7)",
              opacity: 0.95 * trailFade
            },
            children: __scCopy("Supercharged")
          }), filling && p < 1 && /* @__PURE__ */jsx("span", {
            "aria-hidden": true,
            style: {
              position: "absolute",
              inset: 0,
              color: "#fff",
              clipPath: `inset(-25% ${Math.max(0, 100 - pPct)}% -25% ${Math.max(0, pPct - 10)}%)`,
              filter: "blur(3px)",
              opacity: 0.9 * headFade,
              textShadow: "0 0 22px rgba(255,255,255,0.9), 0 0 55px rgba(216,150,255,0.8)"
            },
            children: __scCopy("Supercharged")
          }), /* @__PURE__ */jsx("svg", {
            "aria-hidden": true,
            viewBox: "0 0 700 240",
            style: {
              position: "absolute",
              left: -25,
              top: -62,
              width: 700,
              height: 240,
              overflow: "visible",
              pointerEvents: "none"
            },
            children: active.map((f, i) => {
              const b = BOLTS[f.bolt];
              const decay = 1 - (frame - f.at) / f.life;
              return /* @__PURE__ */jsxs("g", {
                opacity: Math.min(1, 1.1 * decay),
                children: [/* @__PURE__ */jsx("path", {
                  d: b.d,
                  fill: "none",
                  stroke: "rgba(216,60,190,0.65)",
                  strokeWidth: b.long ? 6 : 4.5,
                  strokeLinejoin: "miter",
                  style: {
                    filter: "blur(6px)"
                  }
                }), /* @__PURE__ */jsx("path", {
                  d: b.d,
                  fill: "none",
                  stroke: "rgba(235,110,215,0.9)",
                  strokeWidth: b.long ? 2.4 : 1.9,
                  strokeLinejoin: "miter",
                  style: {
                    filter: "blur(1.5px)"
                  }
                }), /* @__PURE__ */jsx("path", {
                  d: b.d,
                  fill: "none",
                  stroke: "#ffd8f2",
                  strokeWidth: b.long ? 1.4 : 1.1,
                  strokeLinejoin: "miter"
                })]
              }, `${f.at}-${i}`);
            })
          })]
        }), " ", /* @__PURE__ */jsx("span", {
          children: __scCopy("performance")
        })]
      }), /* @__PURE__ */jsx("div", {
        style: lineStyle,
        children: __scCopy("with rock-solid reliability")
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GradientWordSweep;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
