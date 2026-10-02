// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx

var PANEL_X = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#PANEL_X", "PANEL_X", () => 1210);
var PANEL_Y = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#PANEL_Y", "PANEL_Y", () => 90);
var PANEL_W = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#PANEL_W", "PANEL_W", () => 620);
var ROW_H = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#ROW_H", "ROW_H", () => 92);
var ROWS_TOP = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#ROWS_TOP", "ROWS_TOP", () => 210);
var TARGETS = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#TARGETS", "TARGETS", () => [{
  x: 150,
  y: 150,
  rot: -2
}, {
  x: 480,
  y: 420,
  rot: 1.5
}, {
  x: 180,
  y: 660,
  rot: 2
}]);
var CARD_W = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#CARD_W", "CARD_W", () => 480);
var CARD_H = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#CARD_H", "CARD_H", () => 240);
var CHECK_FRAMES = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#CHECK_FRAMES", "CHECK_FRAMES", () => [12, 22, 32]);
var BUTTON_FRAME = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#BUTTON_FRAME", "BUTTON_FRAME", () => 46);
var FLY_START = __scConfig("demos/interaction/canvas-materialize-moves/PanelToCanvasMaterialize.tsx#FLY_START", "FLY_START", () => [54, 60, 66]);
var PanelToCanvasMaterialize = () => {
  const frame = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  const btnPress = interpolate(frame, [BUTTON_FRAME, BUTTON_FRAME + 3, BUTTON_FRAME + 9], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
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
        left: PANEL_X,
        top: PANEL_Y,
        width: PANEL_W,
        height: 900,
        background: G.panel,
        border: `2px solid ${G.border}`,
        borderRadius: 20,
        boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
        boxSizing: "border-box",
        padding: 28
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 20,
          width: 260,
          background: G.bar,
          borderRadius: 10,
          marginBottom: 14
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 12,
          width: 380,
          background: G.line,
          borderRadius: 6,
          marginBottom: 26
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 34,
          background: G.line,
          borderRadius: 8,
          marginBottom: 12,
          opacity: 0.6
        }
      }), [0, 1, 2].map(i => /* @__PURE__ */jsx2(RowSlot, {
        idx: i,
        frame,
        fps
      }, i)), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 28,
          bottom: 28,
          right: 28,
          height: 64,
          borderRadius: 14,
          background: btnPress > 0 ? G.ink : G.side,
          transform: `scale(${1 - btnPress * 0.06})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: /* @__PURE__ */jsx2("div", {
          style: {
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 700,
            fontSize: 22,
            color: "#f2f2f0",
            letterSpacing: 0.5
          },
          children: __scCopy("Add all to canvas")
        })
      })]
    }), [0, 1, 2].map(i => /* @__PURE__ */jsx2(FlyingCard, {
      idx: i,
      frame,
      fps
    }, i)), /* @__PURE__ */jsx2(Cursor, {
      frame
    })]
  });
};
var RowSlot = ({
  idx,
  frame,
  fps
}) => {
  const checkF = CHECK_FRAMES[idx];
  const flyF = FLY_START[idx];
  const checked = frame >= checkF;
  const checkPop = spring({
    frame: frame - checkF,
    fps,
    config: {
      damping: 10,
      stiffness: 260
    }
  });
  const flown = frame >= flyF;
  return /* @__PURE__ */jsx2("div", {
    style: {
      height: ROW_H - 12,
      marginBottom: 12,
      borderRadius: 10,
      border: flown ? `2px dashed ${G.line}` : `2px solid ${G.border}`,
      background: flown ? "transparent" : G.card,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: __scCopy("0 20px"),
      opacity: flown ? 0.7 : 1
    },
    children: !flown && /* @__PURE__ */jsxs2(Fragment, {
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 30,
          height: 30,
          borderRadius: 8,
          border: `3px solid ${checked ? G.ink : G.bar}`,
          background: checked ? G.ink : "transparent",
          boxSizing: "border-box",
          transform: checked ? `scale(${0.8 + 0.2 * checkPop})` : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: checked && /* @__PURE__ */jsx2("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          children: /* @__PURE__ */jsx2("path", {
            d: __scCopy("M3 9.5 L7.2 13.5 L15 4.5"),
            stroke: "#fff",
            strokeWidth: "3.2",
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 14,
          width: 180 + idx * 40,
          background: G.bar,
          borderRadius: 7
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          marginLeft: "auto",
          height: 12,
          width: 90,
          background: G.line,
          borderRadius: 6
        }
      })]
    })
  });
};
var FlyingCard = ({
  idx,
  frame,
  fps
}) => {
  const flyF = FLY_START[idx];
  if (frame < flyF) return null;
  const t = spring({
    frame: frame - flyF,
    fps,
    config: {
      damping: 16,
      stiffness: 60
    },
    durationInFrames: 34
  });
  const sx = PANEL_X + 30;
  const sy = ROWS_TOP + idx * ROW_H;
  const sw = PANEL_W - 60;
  const sh = ROW_H - 12;
  const tgt = TARGETS[idx];
  const mx = (sx + tgt.x) / 2;
  const my = Math.min(sy, tgt.y) - 170;
  const u = t;
  const x = (1 - u) * (1 - u) * sx + 2 * (1 - u) * u * mx + u * u * tgt.x;
  const y = (1 - u) * (1 - u) * sy + 2 * (1 - u) * u * my + u * u * tgt.y;
  const w = sw + (CARD_W - sw) * u;
  const h = sh + (CARD_H - sh) * u;
  const rot = tgt.rot * u;
  const radius = 10 + 8 * u;
  const shadow = interpolate(u, [0, 1], [0.08, 0.16]);
  const rowOp = Math.max(0, 1 - u * 2.2);
  const cardOp = Math.max(0, (u - 0.45) / 0.55);
  return /* @__PURE__ */jsxs2("div", {
    style: {
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      background: G.card,
      border: `2px solid ${G.border}`,
      borderRadius: radius,
      boxShadow: `0 ${10 + 14 * u}px ${24 + 20 * u}px rgba(0,0,0,${shadow})`,
      transform: `rotate(${rot}deg)`,
      boxSizing: "border-box",
      overflow: "hidden",
      zIndex: 10 + idx
    },
    children: [/* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: __scCopy("0 20px"),
        opacity: rowOp
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 30,
          height: 30,
          borderRadius: 8,
          background: G.ink
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 14,
          width: 180 + idx * 40,
          background: G.bar,
          borderRadius: 7
        }
      })]
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        opacity: cardOp,
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 18,
          width: `${52 + idx * 12}%`,
          background: G.bar,
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 11,
          width: "84%",
          background: G.line,
          borderRadius: 5
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 11,
          width: "66%",
          background: G.line,
          borderRadius: 5
        }
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          marginTop: "auto",
          display: "flex",
          gap: 10,
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            width: 28,
            height: 28,
            borderRadius: 14,
            background: G.mid
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 11,
            width: 70,
            background: G.line,
            borderRadius: 5
          }
        })]
      })]
    })]
  });
};
var Cursor = ({
  frame
}) => {
  const bx = PANEL_X + PANEL_W / 2;
  const by = PANEL_Y + 900 - 60;
  const x = interpolate(frame, [8, BUTTON_FRAME - 4], [900, bx], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const y = interpolate(frame, [8, BUTTON_FRAME - 4], [560, by], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const press = interpolate(frame, [BUTTON_FRAME, BUTTON_FRAME + 3, BUTTON_FRAME + 8], [1, 0.78, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsx2("svg", {
    width: 40,
    height: 44,
    viewBox: "0 0 20 22",
    style: {
      position: "absolute",
      left: x,
      top: y,
      transform: `scale(${press})`,
      zIndex: 40
    },
    children: /* @__PURE__ */jsx2("path", {
      d: __scCopy("M2 1 L2 17 L6.5 13.2 L9.4 20 L12.4 18.7 L9.5 12 L15 11.6 Z"),
      fill: G.ink,
      stroke: "#fff",
      strokeWidth: "1.4"
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PanelToCanvasMaterialize;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
