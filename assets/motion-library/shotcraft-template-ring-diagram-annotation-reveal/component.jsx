// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/ring-diagram-annotation-reveal/RingDiagramAnnotationReveal.tsx
import { Easing, interpolate, useCurrentFrame as useCurrentFrame2 } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/ring-diagram-annotation-reveal/RingDiagramAnnotationReveal.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/ring-diagram-annotation-reveal/RingDiagramAnnotationReveal.tsx

var RING_DIAGRAM_ANNOTATION_REVEAL_DURATION = 190;
var CLAMP = __scConfig("demos/data/ring-diagram-annotation-reveal/RingDiagramAnnotationReveal.tsx#CLAMP", "CLAMP", () => ({
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
}));
var p = (frame, start, end) => interpolate(frame, [start, Math.max(start + 1, end)], [0, 1], {
  ...CLAMP,
  easing: Easing.bezier(0.16, 1, 0.3, 1)
});
var TitleBlock = ({
  frame,
  start,
  shade,
  index
}) => {
  const k = p(frame, start, start + 8);
  const echo = interpolate(frame, [start - 1, start, start + 2, start + 8], [0, 0.32, 0.32, 0], CLAMP);
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "relative",
      width: 26,
      height: 34
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#a7a7a4",
        opacity: echo,
        transform: `translateY(${interpolate(k, [0, 1], [8, -4])}px)`
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: shade,
        opacity: k,
        clipPath: `inset(${interpolate(k, [0, 1], [100, 0])}% 0 0 0)`,
        transform: `translateY(${interpolate(k, [0, 1], [9, 0])}px)`,
        display: "grid",
        placeItems: "center",
        color: "#f7f7f5",
        fontFamily: "Arial, sans-serif",
        fontSize: 8,
        fontWeight: 800
      },
      children: index + 1
    })]
  });
};
var RingDiagramAnnotationReveal = () => {
  const frame = useCurrentFrame2();
  const aperture = p(frame, 11, 50);
  const ringIn = p(frame, 18, 60);
  const coilsIn = p(frame, 30, 50);
  const arrowsIn = p(frame, 35, 50);
  const layout = p(frame, 90, 134);
  const label = p(frame, 114, 160);
  const definition = p(frame, 137, 143);
  const centerX = interpolate(layout, [0, 1], [240, 154]);
  const scale = interpolate(layout, [0, 1], [1, 0.84]);
  const rotate = interpolate(frame, [29, 187], [0, 44.2], CLAMP);
  const apertureRadius = interpolate(aperture, [0, 1], [540, 61]);
  const arrows = Array.from({
    length: 12
  }, (_, i) => {
    const a = (-90 + i * 30) * Math.PI / 180;
    const outer = 97;
    const inner = 72;
    return {
      x1: 240 + Math.cos(a) * outer,
      y1: 123 + Math.sin(a) * outer,
      x2: 240 + Math.cos(a) * inner,
      y2: 123 + Math.sin(a) * inner
    };
  });
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#f7f7f5",
    raster: "zoom",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        fontFamily: "Arial, sans-serif"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 0,
          background: "#c7c7c4",
          clipPath: `circle(${apertureRadius * scale}px at ${centerX}px 123px)`
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: centerX,
          top: 123,
          width: 220,
          height: 220,
          transform: `translate(-50%,-50%) scale(${scale})`,
          transformOrigin: "50% 50%"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 36,
            top: 36,
            width: 148,
            height: 148,
            borderRadius: "50%",
            border: "1px solid #8a8a87",
            opacity: ringIn,
            transform: `scale(${interpolate(ringIn, [0, 1], [3.8, 1])})`
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 8,
            top: 8,
            width: 204,
            height: 204,
            borderRadius: "50%",
            border: "7px dashed #999995",
            boxSizing: "border-box",
            opacity: coilsIn,
            transform: `rotate(${rotate}deg) scale(${interpolate(coilsIn, [0, 1], [1.08, 1])})`
          }
        }), /* @__PURE__ */jsxs("svg", {
          viewBox: "0 0 480 270",
          style: {
            position: "absolute",
            left: -130,
            top: -12,
            width: 480,
            height: 270
          },
          children: [/* @__PURE__ */jsx2("defs", {
            children: /* @__PURE__ */jsx2("marker", {
              id: __scCopy("ring-arrow-head"),
              markerWidth: "5",
              markerHeight: "5",
              refX: "4.5",
              refY: "2.5",
              orient: "auto",
              children: /* @__PURE__ */jsx2("path", {
                d: __scCopy("M0,0 L5,2.5 L0,5 Z"),
                fill: "#303032"
              })
            })
          }), /* @__PURE__ */jsx2("g", {
            stroke: "#454548",
            strokeWidth: "0.75",
            markerEnd: "url(#ring-arrow-head)",
            opacity: arrowsIn,
            children: arrows.map(({
              x1,
              y1,
              x2,
              y2
            }) => /* @__PURE__ */jsx2("line", {
              x1,
              y1,
              x2: interpolate(arrowsIn, [0, 1], [x1, x2]),
              y2: interpolate(arrowsIn, [0, 1], [y1, y2])
            }, `${x1}-${y1}`))
          })]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 57,
            top: 57,
            width: 106,
            height: 106,
            borderRadius: "50%",
            background: "#c7c7c4",
            display: "grid",
            placeItems: __scCopy("start center"),
            paddingTop: 28,
            boxSizing: "border-box",
            color: "#57575a",
            fontSize: 8,
            fontWeight: 800,
            letterSpacing: 0.5
          },
          children: __scCopy("CONTENT")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 79,
            top: 79,
            width: 62,
            height: 62,
            borderRadius: "50%",
            background: "#5b5b5e",
            display: "grid",
            placeItems: "center",
            color: "#fff",
            fontSize: 8,
            fontWeight: 800
          },
          children: __scCopy("SUBJECT")
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 321,
          top: 93,
          display: "flex",
          gap: 1.5
        },
        children: ["#59595c", "#69696c", "#858588", "#a7a7aa"].map((shade, i) => /* @__PURE__ */jsx2(TitleBlock, {
          frame,
          start: 112 + i * 3,
          shade,
          index: i
        }, shade))
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 310,
          top: 132,
          width: 122,
          height: 16,
          background: "#929295",
          transformOrigin: __scCopy("left center"),
          transform: `scaleX(${label})`,
          opacity: label,
          display: "grid",
          placeItems: "center",
          color: "#f9f9f7",
          fontSize: 8,
          fontWeight: 800,
          letterSpacing: 0.8
        },
        children: __scCopy("EXPLANATION")
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 325,
          top: 154,
          width: 92,
          height: 15,
          background: "#d0d0cd",
          opacity: definition,
          transform: `translateY(${interpolate(definition, [0, 1], [5, 0])}px)`,
          display: "grid",
          placeItems: "center",
          color: "#626265",
          fontSize: 8,
          fontWeight: 700
        },
        children: __scCopy("SUPPORTING DETAIL")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = RingDiagramAnnotationReveal;
 return {component:template_entry_default,duration:RING_DIAGRAM_ANNOTATION_REVEAL_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
