// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/brand-ink-open/BrandInkOpen.tsx
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
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
 var BRAND_INK_OPEN_DURATION = 104;
var SERIF = __scConfig("demos/typography/brand-ink-open/BrandInkOpen.tsx#SERIF", "SERIF", () => 'ui-serif, Georgia, "Times New Roman", serif');
var MONO = __scConfig("demos/typography/brand-ink-open/BrandInkOpen.tsx#MONO", "MONO", () => "ui-monospace, SFMono-Regular, Menlo, monospace");
var INK = __scConfig("demos/typography/brand-ink-open/BrandInkOpen.tsx#INK", "INK", () => "oklch(18% 0.006 82)");
var AMBER = __scConfig("demos/typography/brand-ink-open/BrandInkOpen.tsx#AMBER", "AMBER", () => "oklch(52% 0.115 65)");
var INK2 = __scConfig("demos/typography/brand-ink-open/BrandInkOpen.tsx#INK2", "INK2", () => "oklch(50% 0.006 82)");
var WORDMARK = __scConfig("demos/typography/brand-ink-open/BrandInkOpen.tsx#WORDMARK", "WORDMARK", () => __scCopy("AI Foundation Lab"));
var KICKER = __scConfig("demos/typography/brand-ink-open/BrandInkOpen.tsx#KICKER", "KICKER", () => __scCopy("TEAM RESEARCH CONSOLE"));
var BrandInkOpen = () => {
  const frame = useCurrentFrame();
  const vDraw = interpolate(frame, [0, 9], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0, 0.2, 1)
  });
  const hDraw = interpolate(frame, [8, 18], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear
  });
  const crossFade = interpolate(frame, [24, 34], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const perChar = 0.7;
  const kickStart = 28;
  const kickChars = Math.floor(Math.max(0, frame - kickStart) / perChar);
  const kickDone = kickStart + KICKER.length * perChar;
  const cursorOn = (() => {
    if (frame < kickStart) return false;
    if (frame < kickDone) return true;
    if (frame > 95) return false;
    const b = frame - kickDone;
    return Math.floor(b / 2) % 2 === 0;
  })();
  const brandOut = interpolate(frame, [97, 104], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.5, 1)
  });
  const brandOpacity = 1 - brandOut;
  const groupY = -brandOut * 40;
  const groupScale = 1 - brandOut * 0.12;
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      backgroundColor: "#faf7f2",
      justifyContent: "center",
      alignItems: "center"
    },
    children: /* @__PURE__ */jsxs("div", {
      style: {
        textAlign: "center",
        opacity: brandOpacity,
        transform: `translateY(${groupY}px) scale(${groupScale})`
      },
      children: [/* @__PURE__ */jsxs("svg", {
        width: 64,
        height: 64,
        viewBox: "0 0 64 64",
        style: {
          display: "block",
          margin: __scCopy("0 auto 34px"),
          opacity: crossFade
        },
        children: [/* @__PURE__ */jsx("line", {
          x1: 32,
          y1: 2,
          x2: 32,
          y2: 62,
          stroke: AMBER,
          strokeWidth: 5,
          strokeLinecap: "round",
          pathLength: 100,
          strokeDasharray: 100,
          strokeDashoffset: vDraw
        }), /* @__PURE__ */jsx("line", {
          x1: 2,
          y1: 32,
          x2: 62,
          y2: 32,
          stroke: AMBER,
          strokeWidth: 5,
          strokeLinecap: "round",
          pathLength: 100,
          strokeDasharray: 100,
          strokeDashoffset: hDraw
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          fontFamily: SERIF,
          fontSize: 132,
          fontWeight: 600,
          color: INK,
          letterSpacing: __scCopy("-0.01em"),
          lineHeight: 1,
          whiteSpace: "pre",
          display: "inline-flex",
          alignItems: __scCopy("flex-end")
        },
        children: WORDMARK.split("").map((ch, i) => {
          const delay = 10 + i * 3;
          const t = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.2, 0.7, 0.25, 1)
          });
          const glintCenter = delay + 12;
          const glint = interpolate(frame, [glintCenter - 4, glintCenter, glintCenter + 4], [0, 1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp"
          });
          return /* @__PURE__ */jsxs("span", {
            style: {
              position: "relative",
              display: "inline-block",
              opacity: t,
              transform: `scale(${1.6 - 0.6 * t})`,
              transformOrigin: __scCopy("center bottom"),
              filter: `blur(${(1 - t) * 6}px)`
            },
            children: [ch === " " ? " " : ch, /* @__PURE__ */jsx("span", {
              style: {
                position: "absolute",
                left: "50%",
                bottom: -6,
                transform: "translateX(-50%)",
                width: `${glint * 100}%`,
                height: 2,
                background: AMBER,
                opacity: glint,
                borderRadius: 2
              }
            })]
          }, i);
        })
      }), /* @__PURE__ */jsxs("div", {
        style: {
          fontFamily: MONO,
          fontSize: 26,
          letterSpacing: __scCopy("0.14em"),
          color: INK2,
          marginTop: 30,
          textTransform: "uppercase",
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx("span", {
          style: {
            whiteSpace: "pre"
          },
          children: KICKER.slice(0, kickChars)
        }), /* @__PURE__ */jsx("span", {
          style: {
            display: "inline-block",
            width: 14,
            height: 24,
            marginLeft: 4,
            background: AMBER,
            opacity: cursorOn ? 0.85 : 0
          }
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = BrandInkOpen;
 return {component:template_entry_default,duration:BRAND_INK_OPEN_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
