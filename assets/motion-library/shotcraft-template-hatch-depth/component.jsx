// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/hatch-depth/HatchDepth.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/hatch-depth/HatchDepth.tsx

var HATCH_DEPTH_DURATION = 132;
var ACCENT = __scConfig("demos/data/hatch-depth/HatchDepth.tsx#ACCENT", "ACCENT", () => "#5B8DEF");
var ACCENT_HI = __scConfig("demos/data/hatch-depth/HatchDepth.tsx#ACCENT_HI", "ACCENT_HI", () => "#8FB2F7");
var ROWS = __scConfig("demos/data/hatch-depth/HatchDepth.tsx#ROWS", "ROWS", () => [{
  label: __scCopy("SERIES_A"),
  w: 0.85
}, {
  label: __scCopy("SERIES_B"),
  w: 0.55
}, {
  label: __scCopy("GROUP_C"),
  w: 0.95
}, {
  label: __scCopy("GROUP_D"),
  w: 0.4
}, {
  label: __scCopy("OTHER_E"),
  w: 0.7
}]);
var NBSP2 = __scConfig("demos/data/hatch-depth/HatchDepth.tsx#NBSP2", "NBSP2", () => "\xA0\xA0");
var HatchDepth = () => {
  const t = useT();
  const headIn = seg(t, 0.62, 0.78, E.outCubic);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0a0a0c",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#0a0a0c",
        padding: __scCopy("36px 60px"),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 13,
        // 原栈 SF Mono 对无头 Chrome 不可见，真实 Chrome 落到 macOS 默认
        // 等宽字体 Courier（衬线打字机形）；显式补 Courier 兜底对齐原片
        fontFamily: '"SF Mono",Courier,monospace'
      },
      children: [ROWS.map(({
        label,
        w
      }, i) => {
        const grow = seg(t, 0.06 + i * 0.05, 0.06 + i * 0.05 + 0.22, E.outCubic);
        const morph = seg(t, 0.5 + i * 0.03, 0.5 + i * 0.03 + 0.14);
        const wiggle = 1 + Math.sin(t * 30 + i * 2.1) * 0.02 * seg(t, 0.7, 0.85);
        const wPct = grow * w * 100 * wiggle;
        return /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 14,
            height: 26
          },
          children: [/* @__PURE__ */jsx2("span", {
            style: {
              color: morph > 0.5 ? "#5c626f" : "#8b91a3",
              fontSize: 11,
              width: 70,
              flex: "none",
              textAlign: "right"
            },
            children: label
          }), /* @__PURE__ */jsxs("div", {
            style: {
              position: "relative",
              height: "100%",
              flex: 1
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${wPct}%`,
                borderRadius: 3,
                background: "repeating-linear-gradient(45deg,#565860 0 4px,transparent 4px 9px)",
                border: "1px solid #565860",
                // 原渲染无全局 border-box：宽高为内容尺寸，1px 边框外扩
                // （斜纹相位随元素尺寸变化，box-sizing 不还原相位就对不上）
                boxSizing: "content-box",
                opacity: 1 - morph
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${wPct}%`,
                borderRadius: 3,
                background: `linear-gradient(90deg,${ACCENT},${ACCENT_HI})`,
                opacity: morph
              }
            }), /* @__PURE__ */jsxs("span", {
              style: {
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                color: ACCENT_HI,
                fontSize: 10,
                left: `calc(${wPct}% + 8px)`,
                opacity: morph
              },
              children: [Math.round(w * 420 * grow), __scCopy("K")]
            })]
          })]
        }, i);
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          top: 20,
          left: 60,
          fontWeight: 600,
          fontSize: 12,
          fontFamily: '"SF Mono",Courier,monospace',
          // 同上：Courier 兜底
          letterSpacing: 1,
          transform: `translateY(${-30 + headIn * 30}px)`,
          opacity: headIn
        },
        children: [/* @__PURE__ */jsx2("span", {
          style: {
            color: "#e8eaf0",
            fontWeight: 700
          },
          children: __scCopy("METRICS")
        }), NBSP2, /* @__PURE__ */jsx2("span", {
          style: {
            color: "#67d17c"
          },
          children: __scCopy("\u25CF LIVE")
        }), NBSP2, /* @__PURE__ */jsxs("span", {
          style: {
            color: "#8b91a3"
          },
          children: [__scCopy("TOTAL 875K"), NBSP2, __scCopy("AVG 1.02M")]
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = HatchDepth;
 return {component:template_entry_default,duration:HATCH_DEPTH_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
