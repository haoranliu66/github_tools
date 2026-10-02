// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx

var PROMPT = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#PROMPT", "PROMPT", () => __scCopy("Generate an entity-relationship diagram"));
var TYPE_START = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#TYPE_START", "TYPE_START", () => 6);
var TYPE_CPS = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#TYPE_CPS", "TYPE_CPS", () => 1.1);
var NODE_W = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#NODE_W", "NODE_W", () => 300);
var NODE_H = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#NODE_H", "NODE_H", () => 110);
var NODES = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#NODES", "NODES", () => [
// level 0
{
  id: 0,
  x: 960,
  y: 330,
  level: 0,
  parent: -1
},
// level 1
{
  id: 1,
  x: 620,
  y: 570,
  level: 1,
  parent: 0
}, {
  id: 2,
  x: 1300,
  y: 570,
  level: 1,
  parent: 0
},
// level 2
{
  id: 3,
  x: 400,
  y: 820,
  level: 2,
  parent: 1
}, {
  id: 4,
  x: 810,
  y: 820,
  level: 2,
  parent: 1
}, {
  id: 5,
  x: 1110,
  y: 820,
  level: 2,
  parent: 2
}, {
  id: 6,
  x: 1520,
  y: 820,
  level: 2,
  parent: 2
}]);
var CASCADE_START = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#CASCADE_START", "CASCADE_START", () => 52);
var LEVEL_GAP = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#LEVEL_GAP", "LEVEL_GAP", () => 20);
var SIBLING_STAGGER = __scConfig("demos/interaction/canvas-materialize-moves/DiagramCascadeBuild.tsx#SIBLING_STAGGER", "SIBLING_STAGGER", () => 6);
var nodeStart = n => {
  if (n.level === 0) return CASCADE_START;
  const siblingIdx = NODES.filter(m => m.level === n.level && m.id < n.id).length;
  return CASCADE_START + n.level * LEVEL_GAP + siblingIdx * SIBLING_STAGGER;
};
var edgePath = (p, c) => {
  const x1 = p.x;
  const y1 = p.y + NODE_H / 2;
  const x2 = c.x;
  const y2 = c.y - NODE_H / 2;
  const my = (y1 + y2) / 2;
  return `M ${x1} ${y1} L ${x1} ${my} L ${x2} ${my} L ${x2} ${y2}`;
};
var edgeLen = (p, c) => {
  const y1 = p.y + NODE_H / 2;
  const y2 = c.y - NODE_H / 2;
  return Math.abs(y2 - y1) + Math.abs(c.x - p.x);
};
var DiagramCascadeBuild = () => {
  const frame = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  const typed = Math.min(PROMPT.length, Math.max(0, Math.floor((frame - TYPE_START) * TYPE_CPS)));
  const caretOn = Math.floor(frame / 8) % 2 === 0;
  const promptDone = typed >= PROMPT.length;
  const lastStart = nodeStart(NODES[NODES.length - 1]);
  const breathe = interpolate(frame, [lastStart + 22, lastStart + 34, lastStart + 50], [1, 1.035, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin)
  });
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: G.bg,
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        backgroundImage: `radial-gradient(${G.line} 3px, transparent 3px)`,
        backgroundSize: __scCopy("52px 52px")
      }
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 460,
        top: 88,
        width: 1e3,
        height: 84,
        background: G.card,
        border: `3px solid ${promptDone ? G.ink : G.border}`,
        borderRadius: 42,
        display: "flex",
        alignItems: "center",
        padding: __scCopy("0 36px"),
        boxSizing: "border-box",
        boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: 30,
        fontWeight: 600,
        color: G.ink
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 30,
          height: 30,
          borderRadius: 15,
          background: G.mid,
          marginRight: 20,
          flexShrink: 0
        }
      }), /* @__PURE__ */jsxs2("span", {
        children: [PROMPT.slice(0, typed), /* @__PURE__ */jsx2("span", {
          style: {
            opacity: caretOn ? 1 : 0,
            fontWeight: 400
          },
          children: __scCopy("|")
        })]
      })]
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `scale(${breathe})`,
        transformOrigin: __scCopy("960px 620px")
      },
      children: [/* @__PURE__ */jsx2("svg", {
        width: 1920,
        height: 1080,
        style: {
          position: "absolute",
          inset: 0
        },
        children: NODES.filter(n => n.parent >= 0).map(n => {
          const p = NODES[n.parent];
          const start = nodeStart(n) - 8;
          const len = edgeLen(p, n);
          const grow = interpolate(frame, [start, start + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic)
          });
          if (grow <= 0) return null;
          return /* @__PURE__ */jsx2("path", {
            d: edgePath(p, n),
            stroke: G.mid,
            strokeWidth: 5,
            fill: "none",
            strokeLinejoin: "round",
            strokeDasharray: len,
            strokeDashoffset: len * (1 - grow)
          }, n.id);
        })
      }), NODES.map(n => {
        const start = nodeStart(n);
        const pop = spring({
          frame: frame - start,
          fps,
          config: {
            damping: 11,
            stiffness: 170
          }
        });
        if (frame < start) return null;
        return /* @__PURE__ */jsxs2("div", {
          style: {
            position: "absolute",
            left: n.x - NODE_W / 2,
            top: n.y - NODE_H / 2,
            width: NODE_W,
            height: NODE_H,
            background: n.level === 0 ? G.side : G.card,
            border: `3px solid ${n.level === 0 ? G.side : G.border}`,
            borderRadius: 16,
            boxSizing: "border-box",
            boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
            transform: `scale(${pop})`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
            padding: __scCopy("0 24px")
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              height: 16,
              width: `${44 + n.id * 17 % 34}%`,
              background: n.level === 0 ? "#9a9a98" : G.bar,
              borderRadius: 8
            }
          }), /* @__PURE__ */jsx2("div", {
            style: {
              height: 10,
              width: `${70 - n.id * 13 % 26}%`,
              background: n.level === 0 ? G.sideBar : G.line,
              borderRadius: 5
            }
          })]
        }, n.id);
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = DiagramCascadeBuild;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
