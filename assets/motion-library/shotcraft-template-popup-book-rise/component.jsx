// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx
import { useCurrentFrame, interpolate, spring, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx

var FPS = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#FPS", "FPS", () => 30);
var HOLD = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#HOLD", "HOLD", () => 14);
var STAGGER = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#STAGGER", "STAGGER", () => 7);
var RISE_DUR = 34;
var LAST_START = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#LAST_START", "LAST_START", () => HOLD + 5 * STAGGER);
var SETTLE = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#SETTLE", "SETTLE", () => LAST_START + RISE_DUR);
var REST = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#REST", "REST", () => SETTLE + 25);
var AREA_X = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#AREA_X", "AREA_X", () => 220 + 36);
var AREA_Y = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#AREA_Y", "AREA_Y", () => 72 + 36);
var AREA_W = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#AREA_W", "AREA_W", () => 1920 - 220 - 72);
var AREA_H = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#AREA_H", "AREA_H", () => 1080 - 72 - 72);
var GAP = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#GAP", "GAP", () => 28);
var CELL_W = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#CELL_W", "CELL_W", () => (AREA_W - 2 * GAP) / 3);
var CELL_H = __scConfig("demos/ui-entrance/paper-craft-moves/PopupBookRise.tsx#CELL_H", "CELL_H", () => (AREA_H - GAP) / 2);
var PageCard = ({
  i,
  frame
}) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const order = row === 0 ? col : 3 + col;
  const start = HOLD + order * STAGGER;
  const s = spring({
    frame: frame - start,
    fps: FPS,
    config: {
      damping: 11,
      stiffness: 130,
      mass: 0.9
    },
    durationInFrames: RISE_DUR,
    durationRestThreshold: 1e-4
  });
  const rx = interpolate(s, [0, 1], [0, -90]);
  const lie = 1 - Math.min(Math.abs(rx) / 90, 1);
  const shH = 14 + 90 * Math.max(lie, 0);
  const shAlpha = 0.1 + 0.16 * Math.max(lie, 0);
  return /* @__PURE__ */jsxs2("div", {
    style: {
      position: "absolute",
      left: AREA_X + col * (CELL_W + GAP),
      top: AREA_Y + row * (CELL_H + GAP),
      width: CELL_W,
      height: CELL_H,
      transformStyle: "preserve-3d"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 6,
        right: 6,
        bottom: -4,
        height: shH,
        background: `rgba(0,0,0,${shAlpha})`,
        borderRadius: 12,
        filter: "blur(10px)"
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `rotateX(${rx}deg)`,
        transformOrigin: "50% 100%",
        backfaceVisibility: "hidden"
      },
      children: /* @__PURE__ */jsx2(Card, {
        w: 0,
        h: 0,
        seed: i + 1,
        style: {
          width: "100%",
          height: "100%"
        }
      })
    })]
  });
};
var PopupBookRise = () => {
  const frame = useCurrentFrame();
  const sceneRx = interpolate(frame, [SETTLE, REST], [75, 68], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: "#dddddb",
      position: "relative",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        perspective: 2600,
        perspectiveOrigin: "50% 30%"
      },
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          inset: 0,
          transform: `translateY(-40px) rotateX(${sceneRx}deg)`,
          transformOrigin: "50% 62%",
          transformStyle: "preserve-3d"
        },
        children: [/* @__PURE__ */jsxs2("div", {
          style: {
            position: "absolute",
            inset: 0,
            background: G.bg,
            boxShadow: "0 40px 80px rgba(0,0,0,0.25)"
          },
          children: [/* @__PURE__ */jsxs2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 220,
              background: G.side,
              padding: __scCopy("28px 22px"),
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 18
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#777775"
              }
            }), Array.from({
              length: 7
            }).map((_, i) => /* @__PURE__ */jsx2("div", {
              style: {
                height: 12,
                width: `${60 + i * 29 % 35}%`,
                background: G.sideBar,
                borderRadius: 6
              }
            }, i))]
          }), /* @__PURE__ */jsxs2("div", {
            style: {
              position: "absolute",
              left: 220,
              right: 0,
              top: 0,
              height: 72,
              background: G.panel,
              borderBottom: `2px solid ${G.line}`,
              display: "flex",
              alignItems: "center",
              padding: __scCopy("0 32px"),
              gap: 20,
              boxSizing: "border-box"
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                height: 18,
                width: 180,
                background: G.bar,
                borderRadius: 9
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                marginLeft: "auto",
                height: 36,
                width: 320,
                background: "#fff",
                border: `2px solid ${G.line}`,
                borderRadius: 18,
                boxSizing: "border-box"
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                width: 36,
                height: 36,
                borderRadius: 18,
                background: G.mid
              }
            })]
          })]
        }), Array.from({
          length: 6
        }).map((_, i) => /* @__PURE__ */jsx2(PageCard, {
          i,
          frame
        }, i))]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PopupBookRise;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
