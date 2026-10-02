// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/collab-cursor-moves/CursorCastEnsemble.tsx
import { useCurrentFrame, spring, interpolate } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/collab-cursor-moves/CursorCastEnsemble.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/collab-cursor-moves/CursorCastEnsemble.tsx

var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var FPS = __scConfig("demos/interaction/collab-cursor-moves/CursorCastEnsemble.tsx#FPS", "FPS", () => 30);
var clamp01 = t => Math.min(1, Math.max(0, t));
var easeInOut = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
var ACTORS = __scConfig("demos/interaction/collab-cursor-moves/CursorCastEnsemble.tsx#ACTORS", "ACTORS", () => [{
  name: __scCopy("Lisa"),
  color: "#4C8DF6",
  from: [-160, 200],
  home: [430, 330],
  delay: 0,
  phase: 0
}, {
  name: __scCopy("Lucas"),
  color: "#2FBF71",
  from: [2080, 160],
  home: [1370, 290],
  delay: 5,
  phase: 1.7
}, {
  name: __scCopy("Marta"),
  color: "#F2994A",
  from: [-160, 900],
  home: [560, 760],
  delay: 9,
  phase: 3.1
}, {
  name: __scCopy("Niko"),
  color: "#4C8DF6",
  from: [2080, 950],
  home: [1420, 780],
  delay: 13,
  phase: 4.4
}, {
  name: __scCopy("Rita"),
  color: "#2FBF71",
  from: [900, -180],
  home: [960, 545],
  delay: 17,
  phase: 5.6
}]);
var TYPED = __scConfig("demos/interaction/collab-cursor-moves/CursorCastEnsemble.tsx#TYPED", "TYPED", () => __scCopy("Our customers love it"));
var CursorActor = ({
  x,
  y,
  a,
  badge,
  scale = 2.1
}) => /* @__PURE__ */jsxs2("div", {
  style: {
    position: "absolute",
    left: x,
    top: y,
    transform: `scale(${scale})`,
    transformOrigin: "0 0",
    zIndex: 10
  },
  children: [/* @__PURE__ */jsx2("svg", {
    width: 30,
    height: 44,
    viewBox: "0 0 13.5 20",
    style: {
      display: "block",
      overflow: "visible"
    },
    children: /* @__PURE__ */jsx2("path", {
      d: __scCopy("M0.5 0.5 L0.5 17.2 L4.7 13.4 L7.3 19.5 L10 18.3 L7.4 12.3 L13 12.3 Z"),
      fill: a.color,
      stroke: "#ffffff",
      strokeWidth: 1.1,
      strokeLinejoin: "round"
    })
  }), /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: 24,
      top: 40,
      whiteSpace: "nowrap",
      background: a.color,
      color: "#fff",
      borderRadius: 7,
      padding: __scCopy("4px 11px"),
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: 700,
      fontSize: 14,
      opacity: badge,
      transform: `translateY(${(1 - badge) * 10}px)`
    },
    children: a.name
  })]
});
var CursorCastEnsemble = () => {
  const f = useCurrentFrame();
  const rnd = mulberry32(88);
  const noteRots = Array.from({
    length: 4
  }).map(() => (rnd() - 0.5) * 8);
  const gatherT = easeInOut(clamp01((f - 92) / 26));
  const GATHER = [[770, 430], [1160, 420], [800, 640], [1130, 650], [960, 545]];
  const typedCount = Math.floor(interpolate(f, [58, 118], [0, TYPED.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }));
  const caretOn = Math.floor(f / 8) % 2 === 0;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(${G.line} 2.4px, transparent 2.4px)`,
        backgroundSize: __scCopy("46px 46px")
      }
    }), [{
      x: 250,
      y: 170,
      s: 1
    }, {
      x: 1490,
      y: 140,
      s: 2
    }, {
      x: 210,
      y: 700,
      s: 3
    }, {
      x: 1530,
      y: 690,
      s: 4
    }].map((n, i) => /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: n.x,
        top: n.y,
        width: 230,
        height: 210,
        background: "#e6e6e2",
        border: `2px solid ${G.border}`,
        borderRadius: 6,
        boxShadow: "0 4px 14px rgba(0,0,0,0.10)",
        transform: `rotate(${noteRots[i]}deg)`,
        padding: 18,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 12
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 12,
          width: "70%",
          background: G.bar,
          borderRadius: 6
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 10,
          width: "86%",
          background: G.line,
          borderRadius: 5
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 10,
          width: "58%",
          background: G.line,
          borderRadius: 5
        }
      })]
    }, i)), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 660,
        top: 420,
        width: 600,
        height: 240,
        background: "#ffffff",
        border: `2px solid ${G.border}`,
        borderRadius: 12,
        boxShadow: "0 6px 22px rgba(0,0,0,0.12)",
        padding: 30,
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 14,
          width: 180,
          background: G.bar,
          borderRadius: 7,
          marginBottom: 24
        }
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: 44,
          color: G.ink,
          letterSpacing: -0.5,
          minHeight: 56
        },
        children: [TYPED.slice(0, typedCount), /* @__PURE__ */jsx2("span", {
          style: {
            display: "inline-block",
            width: 4,
            height: 44,
            background: "#2FBF71",
            marginLeft: 3,
            verticalAlign: "middle",
            opacity: f > 50 && typedCount < TYPED.length ? caretOn ? 1 : 0.15 : 0
          }
        })]
      })]
    }), ACTORS.map((a, i) => {
      const s = spring({
        frame: f - a.delay,
        fps: FPS,
        config: {
          damping: 15,
          stiffness: 90,
          mass: 0.9
        }
      });
      let x = interpolate(s, [0, 1], [a.from[0], a.home[0]]);
      let y = interpolate(s, [0, 1], [a.from[1], a.home[1]]);
      const settled = clamp01((f - a.delay - 26) / 10);
      const driftX = Math.sin(f * 0.055 + a.phase) * 46 + Math.sin(f * 0.021 + a.phase * 2) * 30;
      const driftY = Math.cos(f * 0.047 + a.phase * 1.3) * 38 + Math.cos(f * 0.017 + a.phase) * 24;
      x += driftX * settled * (1 - gatherT * 0.55);
      y += driftY * settled * (1 - gatherT * 0.55);
      x = interpolate(gatherT, [0, 1], [x, GATHER[i][0] + driftX * 0.25]);
      y = interpolate(gatherT, [0, 1], [y, GATHER[i][1] + driftY * 0.25]);
      const badge = clamp01((f - a.delay - 12) / 12);
      return /* @__PURE__ */jsx2(CursorActor, {
        x,
        y,
        a,
        badge
      }, a.name);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CursorCastEnsemble;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
