// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx

var COLS = __scConfig("demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx#COLS", "COLS", () => 3);
var ROWS = __scConfig("demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx#ROWS", "ROWS", () => 3);
var CELL_W = __scConfig("demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx#CELL_W", "CELL_W", () => 520);
var CELL_H = __scConfig("demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx#CELL_H", "CELL_H", () => 280);
var GAP = __scConfig("demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx#GAP", "GAP", () => 36);
var HOLD = __scConfig("demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx#HOLD", "HOLD", () => 20);
var STAGGER = __scConfig("demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx#STAGGER", "STAGGER", () => 6);
var FLIP = __scConfig("demos/ui-entrance/wall-reveal-moves/GridWaveFlip.tsx#FLIP", "FLIP", () => 14);
var flipEase = Easing.bezier(0.35, 0, 0.25, 1);
var angleAt = (frame, row, col) => {
  const delay = HOLD + (row + col) * STAGGER;
  const isLast = row === ROWS - 1 && col === COLS - 1;
  if (!isLast) {
    return interpolate(frame, [delay, delay + FLIP], [0, 180], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: flipEase
    });
  }
  const main = interpolate(frame, [delay, delay + FLIP], [0, 190], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: flipEase
  });
  const settle = interpolate(frame, [delay + FLIP, delay + FLIP + 8], [0, -10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  return main + settle;
};
var GridWaveFlip = () => {
  const frame = useCurrentFrame();
  const wallW = COLS * CELL_W + (COLS - 1) * GAP;
  const wallH = ROWS * CELL_H + (ROWS - 1) * GAP;
  return /* @__PURE__ */jsx2(AbsoluteFill, {
    style: {
      background: G.bg,
      justifyContent: "center",
      alignItems: "center"
    },
    children: /* @__PURE__ */jsx2("div", {
      style: {
        width: wallW,
        height: wallH,
        perspective: 1200,
        perspectiveOrigin: "50% 50%",
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${CELL_W}px)`,
        gridTemplateRows: `repeat(${ROWS}, ${CELL_H}px)`,
        gap: GAP
      },
      children: Array.from({
        length: ROWS * COLS
      }).map((_, i) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        const angle = angleAt(frame, row, col);
        const glow = Math.max(0, 1 - Math.abs(angle - 90) / 45);
        const glowTop = interpolate(angle, [45, 135], [8, 92], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        const lift = Math.sin(Math.min(Math.max(angle, 0), 180) * (Math.PI / 180));
        return /* @__PURE__ */jsxs2("div", {
          style: {
            width: CELL_W,
            height: CELL_H,
            position: "relative"
          },
          children: [/* @__PURE__ */jsxs2("div", {
            style: {
              position: "absolute",
              inset: 0,
              transformStyle: "preserve-3d",
              transform: `rotateX(${angle}deg)`,
              boxShadow: `0 ${4 + lift * 22}px ${10 + lift * 40}px rgba(0,0,0,${0.08 + lift * 0.16})`,
              borderRadius: 14
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: "#c7c7c5",
                border: `2px solid ${G.bar}`,
                borderRadius: 14,
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              },
              children: /* @__PURE__ */jsx2("div", {
                style: {
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  background: G.mid,
                  opacity: 0.55
                }
              })
            }), /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
                borderRadius: 14
              },
              children: /* @__PURE__ */jsx2(Card, {
                w: CELL_W,
                h: CELL_H,
                seed: i + 1,
                style: {
                  width: "100%",
                  height: "100%"
                }
              })
            })]
          }), glow > 0.01 && /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: "4%",
              width: "92%",
              top: `${glowTop}%`,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0) 100%)",
              boxShadow: "0 0 14px rgba(255,255,255,0.8)",
              opacity: glow,
              pointerEvents: "none"
            }
          })]
        }, i);
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GridWaveFlip;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
