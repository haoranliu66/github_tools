// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/icon-performance-moves/AttentionBounce.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/icon-performance-moves/AttentionBounce.tsx
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
var Card = ({
  w,
  h,
  seed = 0,
  style
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: w,
      height: h,
      background: G.card,
      border: `2px solid ${G.border}`,
      borderRadius: 14,
      padding: 18,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      ...style
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 16,
        width: `${titleW}%`,
        background: G.bar,
        borderRadius: 8
      }
    }), Array.from({
      length: lines
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: `${88 - i * 14 - seed % 5 * 3}%`,
        background: G.line,
        borderRadius: 5
      }
    }, i)), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 8,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 13,
          background: G.mid
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 10,
          width: 64,
          background: G.line,
          borderRadius: 5
        }
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/source/demos/effects/icon-performance-moves/AttentionBounce.tsx

var AMBER = __scConfig("demos/effects/icon-performance-moves/AttentionBounce.tsx#AMBER", "AMBER", () => "#b45309");
var ICON = __scConfig("demos/effects/icon-performance-moves/AttentionBounce.tsx#ICON", "ICON", () => 400);
var GROUND = __scConfig("demos/effects/icon-performance-moves/AttentionBounce.tsx#GROUND", "GROUND", () => 940);
var CX = __scConfig("demos/effects/icon-performance-moves/AttentionBounce.tsx#CX", "CX", () => 760);
var JUMPS = __scConfig("demos/effects/icon-performance-moves/AttentionBounce.tsx#JUMPS", "JUMPS", () => [{
  start: 12,
  dur: 16,
  peak: 0.5 * ICON
}, {
  start: 30,
  dur: 18,
  peak: 0.75 * ICON
}, {
  start: 50,
  dur: 20,
  peak: 0.95 * ICON
}, {
  start: 72,
  dur: 24,
  peak: 1.2 * ICON
}]);
var AttentionBounce = () => {
  const f = useCurrentFrame();
  let y = 0;
  let squash = 0;
  let stretch = 0;
  JUMPS.forEach(j => {
    const t = (f - j.start) / j.dur;
    if (t > 0 && t < 1) {
      y = j.peak * 4 * t * (1 - t);
      stretch = Math.abs(1 - 2 * t) * 0.14;
    }
    const land = j.start + j.dur;
    if (f >= land && f < land + 6) {
      squash = Math.max(squash, 1 - (f - land) / 6);
    }
  });
  if (f >= 9 && f < 12) squash = Math.max(squash, (f - 9) / 3 * 0.7);
  const sx = 1 + squash * 0.2 - stretch * 0.5;
  const sy = 1 - squash * 0.2 + stretch;
  const zoomT = interpolate(f, [72, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const zoom = 1 + 0.08 * zoomT;
  const dusts = [];
  JUMPS.forEach((j, ji) => {
    const land = j.start + j.dur;
    const life = (f - land) / 12;
    if (life <= 0 || life >= 1) return;
    for (let k = 0; k < 3; k++) {
      const seed = ji * 3 + k;
      const dir = k === 1 ? 0 : k === 0 ? -1 : 1;
      const spread = (60 + 40 * Math.abs(Math.sin(seed * 5.7))) * (ji + 2) * 0.45;
      const e = Easing.out(Easing.cubic)(life);
      dusts.push({
        x: CX + dir * (ICON * 0.42 + spread * e) + (dir === 0 ? 30 * Math.sin(seed * 3.1) * e : 0),
        y: GROUND - 14 - 46 * e * (0.6 + 0.5 * Math.abs(Math.sin(seed * 2.3))),
        r: 12 + 6 * Math.abs(Math.sin(seed * 4.9)) - 8 * life,
        op: (1 - life) * 0.8
      });
    }
  });
  const panelT = interpolate(f, [98, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8))
  });
  const iconTop = GROUND - ICON - y;
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        width: 1920,
        height: 1080,
        transform: `scale(${zoom})`,
        transformOrigin: `${CX}px ${GROUND - ICON / 2}px`,
        position: "relative"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 120,
          top: GROUND,
          width: 1680,
          height: 8,
          background: G.bar,
          borderRadius: 4
        }
      }), dusts.map((d, i) => /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: d.x - d.r,
          top: d.y - d.r,
          width: d.r * 2,
          height: d.r * 2,
          borderRadius: d.r,
          background: G.mid,
          opacity: d.op
        }
      }, i)), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: CX - ICON * 0.42 * (1 - y / (ICON * 2.4)),
          top: GROUND + 16,
          width: ICON * 0.84 * (1 - y / (ICON * 2.4)),
          height: 30,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.18)",
          filter: "blur(6px)",
          opacity: 1 - y / (ICON * 1.6) * 0.5
        }
      }), /* @__PURE__ */jsxs2("svg", {
        width: ICON,
        height: ICON,
        viewBox: "0 0 420 420",
        style: {
          position: "absolute",
          left: CX - ICON / 2,
          top: iconTop,
          transform: `scale(${sx}, ${sy})`,
          transformOrigin: "50% 100%"
        },
        children: [/* @__PURE__ */jsx2("rect", {
          x: 14,
          y: 14,
          width: 392,
          height: 392,
          rx: 88,
          fill: G.card,
          stroke: G.ink,
          strokeWidth: 18
        }), /* @__PURE__ */jsx2("path", {
          d: __scCopy("M 210 110 C 160 110 140 155 138 200 C 136 245 118 272 100 290 L 320 290 C 302 272 284 245 282 200 C 280 155 260 110 210 110 Z"),
          fill: "none",
          stroke: G.ink,
          strokeWidth: 22,
          strokeLinejoin: "round"
        }), /* @__PURE__ */jsx2("circle", {
          cx: 210,
          cy: 322,
          r: 22,
          fill: AMBER
        })]
      }), panelT > 0 && /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: CX + ICON / 2 + 60,
          top: GROUND - ICON - 40,
          transform: `scale(${panelT})`,
          transformOrigin: __scCopy("left bottom"),
          opacity: Math.min(1, panelT * 1.5)
        },
        children: [/* @__PURE__ */jsx2(Card, {
          w: 520,
          h: 330,
          seed: 4
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            top: -28,
            left: 24,
            padding: __scCopy("10px 24px"),
            borderRadius: 24,
            background: AMBER,
            color: "#fff",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 26
          },
          children: __scCopy("New")
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AttentionBounce;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
