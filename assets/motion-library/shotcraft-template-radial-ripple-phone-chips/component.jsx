// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx

var RADIAL_RIPPLE_PHONE_CHIPS_DURATION = 168;
var ACCENT_RGB = __scConfig("demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx#ACCENT_RGB", "ACCENT_RGB", () => "122,134,153");
var SANS = __scConfig("demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx#SANS", "SANS", () => "-apple-system,BlinkMacSystemFont,sans-serif");
var RCOL = __scConfig("demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx#RCOL", "RCOL", () => ["#d7dbe1", "#e0e4e9", "#e8ebef", "#eef0f3"]);
var RSZ = __scConfig("demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx#RSZ", "RSZ", () => [560, 440, 320, 210]);
var RINGS = __scConfig("demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx#RINGS", "RINGS", () => RSZ.map((size, i) => ({
  size,
  color: RCOL[i],
  phase: i * 1.7
})));
var CARDS = __scConfig("demos/effects/radial-ripple-phone-chips/RadialRipplePhoneChips.tsx#CARDS", "CARDS", () => Array.from({
  length: 8
}, (_, i) => ({
  imgGrad: `linear-gradient(120deg,rgba(${ACCENT_RGB},${(0.5 - i * 0.04).toFixed(2)}),rgba(${ACCENT_RGB},${(0.8 - i * 0.05).toFixed(2)}))`,
  l1w: `${62 + rand(i) * 28}%`,
  l2w: `${34 + rand(i + 40) * 30}%`
})));
var RadialRipplePhoneChips = () => {
  const t = useT();
  const chipStyle = (t0, ph) => {
    const p = seg(t, t0, t0 + 0.12, E.outBack);
    const fl = Math.sin(t * Math.PI * 2 * 2 + ph) * 3 * seg(t, t0 + 0.12, t0 + 0.3);
    return {
      opacity: seg(t, t0, t0 + 0.08),
      transform: `scale(${lerp(p, 0.8, 1)}) translateY(${fl}px)`
    };
  };
  const chipBase = {
    position: "absolute",
    padding: __scCopy("10px 18px"),
    borderRadius: 999,
    background: "#fff",
    color: "#2c3038",
    font: `600 13px ${SANS}`,
    whiteSpace: "nowrap",
    boxShadow: "0 10px 26px rgba(58,64,74,.22)"
  };
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#f2f3f5",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#f2f3f5",
        overflow: "hidden"
      },
      children: [RINGS.map(({
        size,
        color,
        phase
      }, i) => /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size,
          height: size,
          margin: `${-size / 2}px 0 0 ${-size / 2}px`,
          borderRadius: "50%",
          background: color,
          transform: `scale(${1 + 0.06 * Math.sin(t * Math.PI * 2 * 1.5 + phase)})`
        }
      }, i)), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 132,
          height: 264,
          margin: __scCopy("-132px 0 0 -66px"),
          borderRadius: 22,
          background: "#1b1c22",
          padding: 7,
          // 原渲染无全局 border-box：132px 是内容宽，padding 外扩（Remotion 注入
          // 了 * { box-sizing:border-box }，这里显式还原 content-box 才对得上原片）
          boxSizing: "content-box",
          boxShadow: "0 24px 50px rgba(58,64,74,.35)"
        },
        children: /* @__PURE__ */jsx2("div", {
          style: {
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 16,
            background: "#fff",
            overflow: "hidden"
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              transform: `translateY(${-seg(t, 0.08, 0.98) * 150}px)`
            },
            children: CARDS.map(({
              imgGrad,
              l1w,
              l2w
            }, i) => /* @__PURE__ */jsxs("div", {
              style: {
                position: "relative",
                margin: __scCopy("8px 8px 0"),
                padding: 7,
                borderRadius: 8,
                background: "#f4f4f7"
              },
              children: [/* @__PURE__ */jsx2("div", {
                style: {
                  height: 34,
                  borderRadius: 5,
                  background: imgGrad
                }
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  marginTop: 6,
                  height: 5,
                  width: l1w,
                  borderRadius: 3,
                  background: "#c9cad3"
                }
              }), /* @__PURE__ */jsx2("div", {
                style: {
                  marginTop: 4,
                  height: 5,
                  width: l2w,
                  borderRadius: 3,
                  background: "#dedfe6"
                }
              })]
            }, i))
          })
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          ...chipBase,
          top: "38%",
          right: "calc(50% + 86px)",
          ...chipStyle(0.22, 0)
        },
        children: __scCopy("Feature one")
      }), /* @__PURE__ */jsx2("div", {
        style: {
          ...chipBase,
          top: "56%",
          left: "calc(50% + 86px)",
          ...chipStyle(0.4, 1.8)
        },
        children: __scCopy("Feature detail")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = RadialRipplePhoneChips;
 return {component:template_entry_default,duration:RADIAL_RIPPLE_PHONE_CHIPS_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
