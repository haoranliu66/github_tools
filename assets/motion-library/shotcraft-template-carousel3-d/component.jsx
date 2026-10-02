// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/carousel-3d/Carousel3D.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/carousel-3d/Carousel3D.tsx

var CAROUSEL_3D_DURATION = 168;
var N = __scConfig("demos/ui-entrance/carousel-3d/Carousel3D.tsx#N", "N", () => 8);
var RADIUS = __scConfig("demos/ui-entrance/carousel-3d/Carousel3D.tsx#RADIUS", "RADIUS", () => 190);
var ICONS = __scConfig("demos/ui-entrance/carousel-3d/Carousel3D.tsx#ICONS", "ICONS", () => ["\u25C6", "\u25CF", "\u25B2", "\u25A0", "\u2726", "\u25D7", "\u2B22", "\u25C9"]);
var Carousel3D = () => {
  const t = useT();
  const spin = t * 360;
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0a0b10",
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        perspective: __scCopy("950px"),
        background: "radial-gradient(ellipse at 50% 55%,#131120 0%,#0a0b10 75%)"
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: "translateZ(-90px) rotateX(-8deg) translateY(-10px)"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            transformStyle: "preserve-3d",
            willChange: "transform",
            transform: `rotateY(${spin}deg)`
          },
          children: Array.from({
            length: N
          }, (_, i) => {
            const hue = 200 + i * 22;
            const faceStyle = {
              position: "absolute",
              inset: 0,
              borderRadius: 9,
              boxSizing: "border-box",
              padding: 10,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: `linear-gradient(160deg,hsl(${hue},60%,42%),hsl(${hue + 28},70%,20%))`,
              border: `1px solid hsla(${hue},80%,75%,.5)`,
              boxShadow: `0 12px 34px rgba(0,0,0,.5), inset 0 1px 0 hsla(${hue},80%,85%,.35)`,
              fontFamily: "-apple-system,system-ui,sans-serif",
              color: "#f2f5fb"
            };
            const face = /* @__PURE__ */jsxs(Fragment, {
              children: [/* @__PURE__ */jsx2("div", {
                style: {
                  fontSize: 24
                },
                children: ICONS[i]
              }), /* @__PURE__ */jsxs("div", {
                style: {
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  marginTop: 34
                },
                children: [__scCopy("CARD 0"), i + 1]
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  marginTop: 6,
                  height: 4,
                  width: "70%",
                  borderRadius: 2,
                  background: "rgba(255,255,255,.4)"
                }
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  marginTop: 4,
                  height: 4,
                  width: "45%",
                  borderRadius: 2,
                  background: "rgba(255,255,255,.22)"
                }
              })]
            });
            return (
              // 卡片容器只做环上定位（绕 Y 公转 + billboard 朝外），
              // 永不绕 X/Z，卡永远正立
              /* @__PURE__ */
              jsxs("div", {
                style: {
                  position: "absolute",
                  left: -46,
                  top: -62,
                  width: 92,
                  height: 124,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${i * 360 / N}deg) translateZ(${RADIUS}px)`
                },
                children: [/* @__PURE__ */jsx2("div", {
                  style: faceStyle,
                  children: face
                }), /* @__PURE__ */jsx2("div", {
                  style: {
                    ...faceStyle,
                    transform: "rotateY(180deg)"
                  },
                  children: face
                })]
              }, i)
            );
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: -230,
            top: 70,
            width: 460,
            height: 460,
            borderRadius: "50%",
            transform: "rotateX(90deg)",
            background: "radial-gradient(circle,rgba(110,140,255,.14) 0%,transparent 62%)"
          }
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = Carousel3D;
 return {component:template_entry_default,duration:CAROUSEL_3D_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
