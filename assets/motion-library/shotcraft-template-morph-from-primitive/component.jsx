// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx

var CX = __scConfig("demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx#CX", "CX", () => 960);
var CY = __scConfig("demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx#CY", "CY", () => 540);
var R = __scConfig("demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx#R", "R", () => 130);
var RECT_W = __scConfig("demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx#RECT_W", "RECT_W", () => 520);
var RECT_H = __scConfig("demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx#RECT_H", "RECT_H", () => 300);
var RECT_R = __scConfig("demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx#RECT_R", "RECT_R", () => 20);
var hw = RECT_W / 2;
var hh = RECT_H / 2;
var iw = hw - RECT_R;
var ihh = hh - RECT_R;
var KAPPA = __scConfig("demos/ui-entrance/morph-from-primitive/MorphFromPrimitive.tsx#KAPPA", "KAPPA", () => 0.5522847498);
var line = (from, to) => [from[0] + (to[0] - from[0]) / 3, from[1] + (to[1] - from[1]) / 3, from[0] + (to[0] - from[0]) * 2 / 3, from[1] + (to[1] - from[1]) * 2 / 3, to[0], to[1]];
var corner = (from, to, c) => [from[0] + KAPPA * (to[0] - c[0]), from[1] + KAPPA * (to[1] - c[1]), to[0] + KAPPA * (from[0] - c[0]), to[1] + KAPPA * (from[1] - c[1]), to[0], to[1]];
var rectAnchors = [[hw, -ihh], [hw, ihh], [iw, hh], [-iw, hh], [-hw, ihh], [-hw, -ihh], [-iw, -hh], [iw, -hh]];
var cornerCenters = [[iw, ihh],
// A1→A2 右下
[-iw, ihh],
// A3→A4 左下
[-iw, -ihh],
// A5→A6 左上
[iw, -ihh]
// A7→A0 右上
];
var rectShape = {
  start: rectAnchors[0],
  segs: [line(rectAnchors[0], rectAnchors[1]), corner(rectAnchors[1], rectAnchors[2], cornerCenters[0]), line(rectAnchors[2], rectAnchors[3]), corner(rectAnchors[3], rectAnchors[4], cornerCenters[1]), line(rectAnchors[4], rectAnchors[5]), corner(rectAnchors[5], rectAnchors[6], cornerCenters[2]), line(rectAnchors[6], rectAnchors[7]), corner(rectAnchors[7], rectAnchors[0], cornerCenters[3])]
};
var angles = rectAnchors.map(([x, y]) => Math.atan2(y, x));
var circAnchors = angles.map(a => [R * Math.cos(a), R * Math.sin(a)]);
var arcSeg = i => {
  const a1 = angles[i];
  let a2 = angles[(i + 1) % 8];
  if (a2 <= a1) a2 += Math.PI * 2;
  const k = 4 / 3 * Math.tan((a2 - a1) / 4);
  const p1 = circAnchors[i];
  const p2 = circAnchors[(i + 1) % 8];
  return [p1[0] - k * R * Math.sin(a1), p1[1] + k * R * Math.cos(a1), p2[0] + k * R * Math.sin(a2 % (Math.PI * 2)), p2[1] - k * R * Math.cos(a2 % (Math.PI * 2)), p2[0], p2[1]];
};
var circShape = {
  start: circAnchors[0],
  segs: [0, 1, 2, 3, 4, 5, 6, 7].map(arcSeg)
};
var lerp = (a, b, t) => a + (b - a) * t;
var f2 = n => n.toFixed(2);
var morphPath = t => {
  const sx = lerp(circShape.start[0], rectShape.start[0], t);
  const sy = lerp(circShape.start[1], rectShape.start[1], t);
  let d = `M ${f2(CX + sx)} ${f2(CY + sy)}`;
  for (let i = 0; i < 8; i++) {
    const a = circShape.segs[i];
    const b = rectShape.segs[i];
    const v = a.map((n, j) => lerp(n, b[j], t));
    d += ` C ${f2(CX + v[0])} ${f2(CY + v[1])} ${f2(CX + v[2])} ${f2(CY + v[3])} ${f2(CX + v[4])} ${f2(CY + v[5])}`;
  }
  return d + __scCopy(" Z");
};
var MorphFromPrimitive = () => {
  const frame = useCurrentFrame();
  const breath = interpolate(frame, [10, 20, 30], [1, 1.12, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const t = interpolate(frame, [30, 54], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const contentOpacity = interpolate(frame, [56, 68], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const d = morphPath(t);
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative"
    },
    children: [/* @__PURE__ */jsx2("svg", {
      width: 1920,
      height: 1080,
      viewBox: "0 0 1920 1080",
      style: {
        position: "absolute",
        inset: 0
      },
      children: /* @__PURE__ */jsx2("g", {
        transform: `translate(${CX} ${CY}) scale(${breath}) translate(${-CX} ${-CY})`,
        children: /* @__PURE__ */jsx2("path", {
          d,
          fill: "none",
          stroke: G.ink,
          strokeWidth: 3
        })
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: CX - RECT_W / 2,
        top: CY - RECT_H / 2,
        width: RECT_W,
        height: RECT_H,
        boxSizing: "border-box",
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 18,
        opacity: contentOpacity
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 26,
          width: "58%",
          background: G.bar,
          borderRadius: 13
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 16,
          width: "86%",
          background: G.line,
          borderRadius: 8
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 16,
          width: "72%",
          background: G.line,
          borderRadius: 8
        }
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          marginTop: "auto",
          display: "flex",
          gap: 14,
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            width: 40,
            height: 40,
            borderRadius: 20,
            background: G.mid
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 16,
            width: 120,
            background: G.line,
            borderRadius: 8
          }
        })]
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = MorphFromPrimitive;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
