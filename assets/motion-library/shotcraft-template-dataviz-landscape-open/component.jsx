// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
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
 var W = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#W", "W", () => 1920);
var H = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#H", "H", () => 1080);
var DUR = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#DUR", "DUR", () => 165);
var WORLD_W = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#WORLD_W", "WORLD_W", () => 4200);
var outCubic = t => 1 - Math.pow(1 - t, 3);
var growth = (frame, start, dur) => {
  const t = Math.min(1, Math.max(0, (frame - start) / dur));
  return outCubic(t);
};
var trunkY = x => 480 + 55 * Math.sin((x - 300) / 1050);
var trunkSlope = x => 55 / 1050 * Math.cos((x - 300) / 1050);
var trunkPath = () => {
  const pts = [];
  for (let x = -300; x <= WORLD_W + 100; x += 50) {
    pts.push(`${x === -300 ? "M" : "L"} ${x} ${trunkY(x).toFixed(1)}`);
  }
  return pts.join(" ");
};
var cubicAt = (p0, p1, p2, p3, t) => {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y
  };
};
var makeTrib = (start, mergeX, opacity, growStart, growDur) => {
  const end = {
    x: mergeX,
    y: trunkY(mergeX)
  };
  const slope = trunkSlope(mergeX);
  const len = Math.hypot(1, slope);
  const p2 = {
    x: end.x - 330 * 1 / len,
    y: end.y - 330 * slope / len
  };
  const p1 = {
    x: start.x + (end.x - start.x) * 0.35,
    y: start.y + (end.y - start.y) * 0.12
  };
  return {
    p0: start,
    p1,
    p2,
    p3: end,
    opacity,
    growStart,
    growDur
  };
};
var MID_TRIBS = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#MID_TRIBS", "MID_TRIBS", () => [makeTrib({
  x: -380,
  y: 130
}, 1020, 0.62, 6, 32), makeTrib({
  x: -260,
  y: 880
}, 1180, 0.55, 10, 32), makeTrib({
  x: -60,
  y: 40
}, 1330, 0.7, 15, 32), makeTrib({
  x: 60,
  y: 960
}, 1500, 0.5, 19, 32), makeTrib({
  x: 320,
  y: 210
}, 1680, 0.6, 24, 32), makeTrib({
  x: 420,
  y: 790
}, 1840, 0.55, 30, 32)]);
var tribPath = t => `M ${t.p0.x} ${t.p0.y} C ${t.p1.x} ${t.p1.y}, ${t.p2.x} ${t.p2.y}, ${t.p3.x} ${t.p3.y}`;
var FAR_LINES = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#FAR_LINES", "FAR_LINES", () => [{
  p0: {
    x: -300,
    y: 260
  },
  p1: {
    x: 700,
    y: 250
  },
  p2: {
    x: 2400,
    y: 330
  },
  p3: {
    x: 3400,
    y: 490
  },
  growStart: 12,
  growDur: 36,
  op: 0.3
}, {
  p0: {
    x: -200,
    y: 700
  },
  p1: {
    x: 800,
    y: 690
  },
  p2: {
    x: 2500,
    y: 610
  },
  p3: {
    x: 3450,
    y: 492
  },
  growStart: 16,
  growDur: 36,
  op: 0.26
}, {
  p0: {
    x: -350,
    y: 400
  },
  p1: {
    x: 900,
    y: 390
  },
  p2: {
    x: 2600,
    y: 420
  },
  p3: {
    x: 3500,
    y: 493
  },
  growStart: 22,
  growDur: 36,
  op: 0.33
}, {
  p0: {
    x: -250,
    y: 590
  },
  p1: {
    x: 850,
    y: 600
  },
  p2: {
    x: 2650,
    y: 560
  },
  p3: {
    x: 3520,
    y: 494
  },
  growStart: 27,
  growDur: 36,
  op: 0.24
}]);
var farPath = l => `M ${l.p0.x} ${l.p0.y} C ${l.p1.x} ${l.p1.y}, ${l.p2.x} ${l.p2.y}, ${l.p3.x} ${l.p3.y}`;
var FAR_NODE_TS = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#FAR_NODE_TS", "FAR_NODE_TS", () => [0.28, 0.55, 0.82]);
var NEAR_LINES = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#NEAR_LINES", "NEAR_LINES", () => [{
  d: __scCopy("M 130 1270 C 480 830, 880 360, 1290 -130"),
  growStart: 2,
  growDur: 40,
  op: 0.22,
  w: 9
}, {
  d: __scCopy("M 1480 1240 C 1830 800, 2180 330, 2540 -110"),
  growStart: 10,
  growDur: 40,
  op: 0.18,
  w: 7
}]);
var LABELS = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#LABELS", "LABELS", () => [{
  trib: 0,
  t: 0.62,
  id: __scCopy("OKR-1024"),
  appear: 48,
  above: true
}, {
  trib: 1,
  t: 0.58,
  id: __scCopy("TEAM-4417"),
  appear: 56,
  above: false
}, {
  trib: 2,
  t: 0.66,
  id: __scCopy("KR-2093"),
  appear: 66,
  above: true
}, {
  trib: 3,
  t: 0.6,
  id: __scCopy("SYNC-3308"),
  appear: 74,
  above: false
}, {
  trib: 4,
  t: 0.68,
  id: __scCopy("OBJ-2471"),
  appear: 84,
  above: true
}, {
  trib: 5,
  t: 0.64,
  id: __scCopy("PLAN-9124"),
  appear: 93,
  above: false
}, {
  trib: 4,
  t: 0.86,
  id: __scCopy("GOAL-7752"),
  appear: 103,
  above: true
}]);
var CONV = __scConfig("demos/opening/dataviz-landscape-open/DatavizLandscapeOpen.tsx#CONV", "CONV", () => ({
  x: 1850,
  y: trunkY(1850)
}));
var DatavizLandscapeOpen = () => {
  const frame = useCurrentFrame();
  const camX = frame * 3.2;
  const zoom = interpolate(frame, [0, DUR - 1], [1, 1.06]);
  const farX = -camX * 0.6;
  const midX = -camX * 1;
  const nearX = -camX * 1.4;
  const trunkGrow = growth(frame, 0, 38);
  const flowOffset = -frame * 1.5;
  const flowDash = "14 56";
  const flowIn = gEnd => interpolate(frame, [gEnd, gEnd + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const handoffGlow = interpolate(frame, [118, 160], [0, 0.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const layerStyle = tx => ({
    position: "absolute",
    left: 0,
    top: 0,
    width: WORLD_W,
    height: H,
    transform: `translateX(${tx}px)`
  });
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      backgroundColor: "#050505",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsxs(AbsoluteFill, {
      style: {
        transform: `scale(${zoom})`,
        transformOrigin: "50% 50%"
      },
      children: [/* @__PURE__ */jsx(AbsoluteFill, {
        style: {
          background: "radial-gradient(120% 90% at 62% 45%, #0b0b0d 0%, #060607 55%, #040404 100%)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: layerStyle(farX),
        children: /* @__PURE__ */jsx("svg", {
          width: WORLD_W,
          height: H,
          style: {
            position: "absolute"
          },
          children: FAR_LINES.map((l, i) => {
            const g = growth(frame, l.growStart, l.growDur);
            return /* @__PURE__ */jsxs("g", {
              children: [/* @__PURE__ */jsx("path", {
                d: farPath(l),
                fill: "none",
                stroke: "#ffffff",
                strokeWidth: 1.3,
                strokeLinecap: "round",
                opacity: l.op,
                pathLength: 1,
                strokeDasharray: 1,
                strokeDashoffset: 1 - g
              }), FAR_NODE_TS.map((t, j) => {
                const p = cubicAt(l.p0, l.p1, l.p2, l.p3, t);
                return /* @__PURE__ */jsx("circle", {
                  cx: p.x,
                  cy: p.y,
                  r: 3,
                  fill: "#ffffff",
                  opacity: t <= g ? l.op + 0.08 : 0
                }, j);
              })]
            }, i);
          })
        })
      }), /* @__PURE__ */jsxs("div", {
        style: layerStyle(midX),
        children: [/* @__PURE__ */jsxs("svg", {
          width: WORLD_W,
          height: H,
          style: {
            position: "absolute"
          },
          children: [/* @__PURE__ */jsxs("g", {
            style: {
              filter: "blur(3px)"
            },
            children: [/* @__PURE__ */jsx("path", {
              d: trunkPath(),
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: 7,
              strokeLinecap: "round",
              opacity: 0.16,
              pathLength: 1,
              strokeDasharray: 1,
              strokeDashoffset: 1 - trunkGrow
            }), MID_TRIBS.map((t, i) => /* @__PURE__ */jsx("path", {
              d: tribPath(t),
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: 5.5,
              strokeLinecap: "round",
              opacity: t.opacity * 0.18,
              pathLength: 1,
              strokeDasharray: 1,
              strokeDashoffset: 1 - growth(frame, t.growStart, t.growDur)
            }, i))]
          }), /* @__PURE__ */jsx("path", {
            d: trunkPath(),
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2.8,
            strokeLinecap: "round",
            opacity: 0.8,
            pathLength: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1 - trunkGrow
          }), MID_TRIBS.map((t, i) => /* @__PURE__ */jsx("path", {
            d: tribPath(t),
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2.2,
            strokeLinecap: "round",
            opacity: t.opacity,
            pathLength: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1 - growth(frame, t.growStart, t.growDur)
          }, i)), /* @__PURE__ */jsx("path", {
            d: trunkPath(),
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2.8,
            strokeLinecap: "round",
            opacity: 0.3 * flowIn(38),
            strokeDasharray: flowDash,
            strokeDashoffset: flowOffset
          }), MID_TRIBS.map((t, i) => /* @__PURE__ */jsx("path", {
            d: tribPath(t),
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2.2,
            strokeLinecap: "round",
            opacity: 0.26 * flowIn(t.growStart + t.growDur),
            strokeDasharray: flowDash,
            strokeDashoffset: flowOffset
          }, `flow-${i}`))]
        }), LABELS.map(l => {
          const trib = MID_TRIBS[l.trib];
          const base = cubicAt(trib.p0, trib.p1, trib.p2, trib.p3, l.t);
          const fadeIn = interpolate(frame, [l.appear, l.appear + 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp"
          });
          const drift = interpolate(frame, [l.appear, DUR - 1], [0, 6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp"
          });
          const ahead = cubicAt(trib.p0, trib.p1, trib.p2, trib.p3, Math.min(1, l.t + 0.02));
          const dx = ahead.x - base.x;
          const dy = ahead.y - base.y;
          const dl = Math.hypot(dx, dy) || 1;
          const px = base.x + dx / dl * drift;
          const py = base.y + dy / dl * drift;
          const textOff = l.above ? -38 : 20;
          return /* @__PURE__ */jsxs(React.Fragment, {
            children: [/* @__PURE__ */jsx("div", {
              style: {
                position: "absolute",
                left: px - 8,
                top: py - 8,
                width: 16,
                height: 16,
                backgroundColor: "#ffffff",
                opacity: fadeIn * 0.9
              }
            }), /* @__PURE__ */jsx("span", {
              style: {
                position: "absolute",
                left: px + 14,
                top: py + textOff,
                fontFamily: 'Menlo, "SF Mono", Consolas, monospace',
                fontSize: 22,
                letterSpacing: 3,
                color: "#e8e8e8",
                whiteSpace: "nowrap",
                opacity: fadeIn * 0.92
              },
              children: l.id
            })]
          }, l.id);
        }), /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: CONV.x - 420,
            top: CONV.y - 260,
            width: 840,
            height: 520,
            background: "radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0) 72%)",
            opacity: handoffGlow,
            filter: "blur(18px)",
            pointerEvents: "none"
          }
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          ...layerStyle(nearX),
          filter: "blur(13px)"
        },
        children: /* @__PURE__ */jsx("svg", {
          width: WORLD_W,
          height: H,
          style: {
            position: "absolute"
          },
          children: NEAR_LINES.map((l, i) => /* @__PURE__ */jsx("path", {
            d: l.d,
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: l.w,
            strokeLinecap: "round",
            opacity: l.op,
            pathLength: 1,
            strokeDasharray: 1,
            strokeDashoffset: 1 - growth(frame, l.growStart, l.growDur)
          }, i))
        })
      }), /* @__PURE__ */jsx(AbsoluteFill, {
        style: {
          background: "radial-gradient(115% 95% at 50% 50%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.5) 100%)",
          pointerEvents: "none"
        }
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = DatavizLandscapeOpen;
 return {component:template_entry_default,duration:240};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
