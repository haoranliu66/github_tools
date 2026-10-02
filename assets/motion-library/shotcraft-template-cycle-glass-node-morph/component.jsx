// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/cycle-glass-node-morph/CycleGlassNodeMorph.tsx
import { interpolate, useCurrentFrame as useCurrentFrame2 } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/cycle-glass-node-morph/CycleGlassNodeMorph.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/cycle-glass-node-morph/CycleGlassNodeMorph.tsx

var CYCLE_GLASS_NODE_MORPH_DURATION = 257;
var CLAMP = __scConfig("demos/data/cycle-glass-node-morph/CycleGlassNodeMorph.tsx#CLAMP", "CLAMP", () => ({
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
}));
var frameSeg = (frame, start, end, ease = E.linear) => ease(Math.min(1, Math.max(0, (frame - start) / Math.max(1, end - start))));
var smoothCamera = (frame, values) => {
  const frames = [176, 180, 190, 198];
  if (frame <= frames[0]) return values[0];
  if (frame >= frames[frames.length - 1]) return values[values.length - 1];
  const widths = frames.slice(1).map((value, index) => value - frames[index]);
  const secants = widths.map((width2, index) => (values[index + 1] - values[index]) / width2);
  const tangents = [secants[0]];
  for (let index = 1; index < values.length - 1; index++) {
    const before = secants[index - 1];
    const after = secants[index];
    if (before * after <= 0) {
      tangents.push(0);
      continue;
    }
    const beforeWidth = widths[index - 1];
    const afterWidth = widths[index];
    const w1 = 2 * afterWidth + beforeWidth;
    const w2 = afterWidth + 2 * beforeWidth;
    tangents.push((w1 + w2) / (w1 / before + w2 / after));
  }
  tangents.push(secants[secants.length - 1]);
  const segment = frame <= frames[1] ? 0 : frame <= frames[2] ? 1 : 2;
  const width = widths[segment];
  const t = (frame - frames[segment]) / width;
  const t2 = t * t;
  const t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1;
  const h10 = t3 - 2 * t2 + t;
  const h01 = -2 * t3 + 3 * t2;
  const h11 = t3 - t2;
  return h00 * values[segment] + h10 * width * tangents[segment] + h01 * values[segment + 1] + h11 * width * tangents[segment + 1];
};
var quadraticPoint = (from, control, to, t) => {
  const oneMinus = 1 - t;
  const x = oneMinus * oneMinus * from[0] + 2 * oneMinus * t * control[0] + t * t * to[0];
  const y = oneMinus * oneMinus * from[1] + 2 * oneMinus * t * control[1] + t * t * to[1];
  const dx = 2 * (oneMinus * (control[0] - from[0]) + t * (to[0] - control[0]));
  const dy = 2 * (oneMinus * (control[1] - from[1]) + t * (to[1] - control[1]));
  return {
    x,
    y,
    angle: Math.atan2(dy, dx) * 180 / Math.PI
  };
};
var cycleLabelOpacity = (frame, start) => {
  const local = frame - start;
  if (local < 0) return 0;
  if (local === 0 || local === 3) return 1;
  if (local === 1 || local === 2) return 0;
  if (local === 4 || local === 6) return 0.42;
  return 1;
};
var GlassNode = ({
  frame,
  start,
  end,
  left,
  top,
  label
}) => {
  const k = frameSeg(frame, start, end, E.outBack);
  const opacity = frameSeg(frame, start, start + 2, E.outQuad);
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left,
      top,
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: "rgba(64,64,68,.88)",
      border: "1px solid rgba(255,255,255,.48)",
      boxShadow: "0 10px 24px rgba(18,18,20,.18), inset 0 1px 6px rgba(255,255,255,.28)",
      backdropFilter: "blur(10px)",
      opacity,
      transform: `translate(-50%, ${lerp(k, 86, -32)}px) scale(${lerp(k, 0.82, 1)})`,
      display: "grid",
      placeItems: "center",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      fontSize: 8.5,
      fontWeight: 850,
      letterSpacing: 0.2
    },
    children: label
  });
};
var Marker = ({
  frame,
  start,
  end,
  left,
  top,
  rotate
}) => {
  const k = frameSeg(frame, start, end, E.outBack);
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left,
      top,
      width: 0,
      height: 0,
      borderLeft: __scCopy("4px solid transparent"),
      borderRight: __scCopy("4px solid transparent"),
      borderTop: "7px solid #5a5a5e",
      opacity: Math.min(1, k * 2),
      transform: `translateY(${lerp(k, -12, 0)}px) rotate(${lerp(k, rotate - 22, rotate)}deg) scale(${lerp(k, 0.72, 1)})`
    }
  });
};
var CycleGlassNodeMorph = () => {
  const frame = useCurrentFrame2();
  const wipe = frameSeg(frame, 66, 90, E.inOutCubic);
  const vehicle = frameSeg(frame, 62, 94, E.inOutCubic);
  const disk = frameSeg(frame, 66, 110, E.outCubic);
  const title = frameSeg(frame, 84, 90, E.outCubic);
  const arrows = frameSeg(frame, 127, 176, E.inOutCubic);
  const camScale = smoothCamera(frame, [0.61, 0.659, 0.935, 1]);
  const camX = smoothCamera(frame, [6, 5.5, 1, 0]);
  const camY = smoothCamera(frame, [-51, -44, -9, 0]);
  const topArrow = quadraticPoint([68, 98], [185, 4], [302, 98], arrows);
  const bottomArrow = quadraticPoint([302, 100], [185, 190], [68, 100], arrows);
  const wipeStop = interpolate(wipe, [0, 1], [-40, 140]);
  const labelData = [{
    label: __scCopy("SENSE"),
    left: 147,
    top: 92,
    start: 124
  }, {
    label: __scCopy("MODEL"),
    left: 240,
    top: 63,
    start: 129
  }, {
    label: __scCopy("ACT"),
    left: 333,
    top: 92,
    start: 134
  }];
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#f5f5f2",
    raster: "zoom",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        isolation: "isolate",
        background: `linear-gradient(135deg, #f5f5f2 0%, #f5f5f2 ${wipeStop}%, #c8c8c5 ${wipeStop + 0.2}%, #c8c8c5 100%)`,
        fontFamily: "Arial, sans-serif"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 36,
          right: 36,
          top: 13,
          height: 47,
          background: "#a4a4a1",
          display: "grid",
          placeItems: "center",
          color: "#f8f8f6",
          fontSize: 15,
          fontWeight: 850,
          letterSpacing: 1,
          opacity: 1 - wipe
        },
        children: __scCopy("CONTEXT")
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 240,
          top: 143,
          width: 218,
          height: 218,
          borderRadius: "50%",
          background: "#cececb",
          opacity: disk,
          transform: `translate(-50%,-50%) scale(${lerp(disk, 0.3, 1)})`,
          transformOrigin: "50% 50%",
          zIndex: 2
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 240,
          top: 112,
          width: 118,
          height: 14,
          background: "#999996",
          opacity: title * (1 - frameSeg(frame, 176, 192, E.outQuad)),
          transform: `translate(-50%, ${lerp(title, 8, 0)}px)`,
          display: "grid",
          placeItems: "center",
          color: "#f7f7f5",
          fontSize: 8.5,
          fontWeight: 850,
          letterSpacing: 0.8,
          zIndex: 4
        },
        children: __scCopy("SYSTEM LOOP")
      }), /* @__PURE__ */jsxs("svg", {
        viewBox: "0 0 332 134",
        style: {
          position: "absolute",
          left: 240,
          top: 154,
          width: interpolate(vehicle, [0, 1], [332, 154]),
          height: interpolate(vehicle, [0, 1], [134, 62]),
          transform: `translate(-50%, -50%) translateY(${interpolate(vehicle, [0, 1], [25, 15])}px)`,
          zIndex: 7,
          overflow: "visible"
        },
        children: [/* @__PURE__ */jsx2("polygon", {
          points: "56,27 96,0 236,0 276,27 332,47 332,134 0,134 0,47",
          fill: "#5a5a5d"
        }), /* @__PURE__ */jsx2("text", {
          x: "166",
          y: "82",
          textAnchor: "middle",
          dominantBaseline: "middle",
          fill: "#fff",
          fontFamily: "Arial, sans-serif",
          fontSize: "18",
          fontWeight: "850",
          children: __scCopy("SUBJECT")
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 240,
          top: 151,
          width: 370,
          height: 226,
          transform: `translate(-50%,-50%) translate(${camX}px,${camY}px) scale(${camScale})`,
          transformOrigin: "50% 50%",
          zIndex: 6
        },
        children: [/* @__PURE__ */jsxs("svg", {
          viewBox: "0 0 370 226",
          style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%"
          },
          children: [/* @__PURE__ */jsx2("path", {
            d: __scCopy("M68 98 Q185 4 302 98"),
            fill: "none",
            stroke: "#4d4d50",
            strokeWidth: "1.3",
            strokeDasharray: "300",
            strokeDashoffset: 300 * (1 - arrows)
          }), /* @__PURE__ */jsx2("path", {
            d: __scCopy("M302 100 Q185 190 68 100"),
            fill: "none",
            stroke: "#4d4d50",
            strokeWidth: "1.3",
            strokeDasharray: "300",
            strokeDashoffset: 300 * (1 - arrows)
          }), /* @__PURE__ */jsx2("path", {
            d: __scCopy("M-9 -5 L0 0 L-9 5"),
            fill: "none",
            stroke: "#4d4d50",
            strokeWidth: "1.3",
            opacity: frameSeg(arrows, 0.02, 0.08, E.outQuad),
            transform: `translate(${topArrow.x} ${topArrow.y}) rotate(${topArrow.angle})`
          }), /* @__PURE__ */jsx2("path", {
            d: __scCopy("M-9 -5 L0 0 L-9 5"),
            fill: "none",
            stroke: "#4d4d50",
            strokeWidth: "1.3",
            opacity: frameSeg(arrows, 0.02, 0.08, E.outQuad),
            transform: `translate(${bottomArrow.x} ${bottomArrow.y}) rotate(${bottomArrow.angle})`
          })]
        }), labelData.map((item, i) => {
          const opacity = cycleLabelOpacity(frame, item.start);
          const drift = frameSeg(frame, item.start, 160, E.outCubic);
          const nodeTarget = frameSeg(frame, 176, 198, E.inOutCubic);
          const nodeTakeover = frameSeg(frame, 184 + i * 8, 192 + i * 8, E.outCubic);
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: item.left - 55 + (i - 1) * lerp(drift, 8, 0),
              top: item.top,
              width: 110,
              textAlign: "center",
              color: "#353538",
              fontSize: 10,
              fontWeight: 850,
              opacity: opacity * (1 - nodeTakeover),
              transform: `translateY(${lerp(nodeTarget, 0, -4)}px)`
            },
            children: item.label
          }, item.label);
        }), /* @__PURE__ */jsx2(GlassNode, {
          frame,
          start: 184,
          end: 192,
          left: 92,
          top: 98,
          label: __scCopy("SENSE")
        }), /* @__PURE__ */jsx2(GlassNode, {
          frame,
          start: 192,
          end: 200,
          left: 185,
          top: 69,
          label: __scCopy("MODEL")
        }), /* @__PURE__ */jsx2(GlassNode, {
          frame,
          start: 200,
          end: 208,
          left: 278,
          top: 98,
          label: __scCopy("ACT")
        }), /* @__PURE__ */jsx2(Marker, {
          frame,
          start: 208,
          end: 214,
          left: 48,
          top: 119,
          rotate: -90
        }), /* @__PURE__ */jsx2(Marker, {
          frame,
          start: 213,
          end: 218,
          left: 181,
          top: 30,
          rotate: 0
        }), /* @__PURE__ */jsx2(Marker, {
          frame,
          start: 217,
          end: 222,
          left: 314,
          top: 119,
          rotate: 90
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CycleGlassNodeMorph;
 return {component:template_entry_default,duration:CYCLE_GLASS_NODE_MORPH_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
