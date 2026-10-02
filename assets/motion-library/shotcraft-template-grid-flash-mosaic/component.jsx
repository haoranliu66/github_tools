// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx
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
  h: h2,
  seed = 0,
  style
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: w,
      height: h2,
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
var FakeDashboard = ({
  variant = "A"
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: 1920,
    height: 1080,
    background: G.bg,
    display: "flex"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      width: 220,
      background: G.side,
      padding: __scCopy("28px 22px"),
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 18
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: "#777775"
      }
    }), Array.from({
      length: 7
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 12,
        width: `${60 + i * 29 % 35}%`,
        background: G.sideBar,
        borderRadius: 6
      }
    }, i))]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        height: 72,
        background: G.panel,
        borderBottom: `2px solid ${G.line}`,
        display: "flex",
        alignItems: "center",
        padding: __scCopy("0 32px"),
        gap: 20,
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          height: 18,
          width: 180,
          background: G.bar,
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          marginLeft: "auto",
          height: 36,
          width: 320,
          background: "#fff",
          border: `2px solid ${G.line}`,
          borderRadius: 18,
          boxSizing: "border-box"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 18,
          background: G.mid
        }
      })]
    }), variant === "A" ? /* @__PURE__ */jsx("div", {
      style: {
        flex: 1,
        padding: 36,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: __scCopy("1fr"),
        gap: 28,
        boxSizing: "border-box"
      },
      children: Array.from({
        length: 6
      }).map((_, i) => /* @__PURE__ */jsx(Card, {
        w: 0,
        h: 0,
        seed: i + 1,
        style: {
          width: "100%",
          height: "100%"
        }
      }, i))
    }) : /* @__PURE__ */jsx("div", {
      style: {
        flex: 1,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box"
      },
      children: Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */jsxs("div", {
        style: {
          flex: 1,
          background: G.card,
          border: `2px solid ${G.border}`,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: __scCopy("0 28px"),
          boxSizing: "border-box"
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 44,
            height: 44,
            borderRadius: 10,
            background: G.mid
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            height: 14,
            width: `${30 + i * 23 % 25}%`,
            background: G.bar,
            borderRadius: 7
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            marginLeft: "auto",
            height: 12,
            width: 120,
            background: G.line,
            borderRadius: 6
          }
        })]
      }, i))
    })]
  })]
});

// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx

var h = n => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var CELL_W = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#CELL_W", "CELL_W", () => 600);
var CELL_H = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#CELL_H", "CELL_H", () => 340);
var GAP = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#GAP", "GAP", () => 12);
var GRID_X = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#GRID_X", "GRID_X", () => (1920 - (CELL_W * 3 + GAP * 2)) / 2);
var GRID_Y = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#GRID_Y", "GRID_Y", () => (1080 - (CELL_H * 3 + GAP * 2)) / 2);
var FILL_START = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#FILL_START", "FILL_START", () => 25);
var STEP = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#STEP", "STEP", () => 2);
var ORDER = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#ORDER", "ORDER", () => Array.from({
  length: 9
}, (_, i) => i).sort((a, b) => h(a + 1) - h(b + 1)));
var RANK = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#RANK", "RANK", () => []);
ORDER.forEach((cell, k) => RANK[cell] = k);
var LAST_IN = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#LAST_IN", "LAST_IN", () => FILL_START + 8 * STEP + 3);
var HOLD_END = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#HOLD_END", "HOLD_END", () => LAST_IN + 14);
var ZOOM_DUR = 14;
var ZOOM_END = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#ZOOM_END", "ZOOM_END", () => HOLD_END + ZOOM_DUR);
var MINI_SCALE = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#MINI_SCALE", "MINI_SCALE", () => CELL_W / 1920);
var ZOOM_SCALE = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#ZOOM_SCALE", "ZOOM_SCALE", () => 3.28);
var CROPS = __scConfig("demos/rhythm/panel-grid-moves/GridFlashMosaic.tsx#CROPS", "CROPS", () => [{
  x: -120,
  y: -60,
  v: "A"
}, null,
// 灰卡
{
  x: -1260,
  y: -120,
  v: "B"
}, {
  x: -60,
  y: -520,
  v: "B"
}, null,
// 中心格(单独处理，占位)
{
  x: -1300,
  y: -640,
  v: "A"
}, {
  x: -420,
  y: -300,
  v: "B"
}, null,
// 灰卡
{
  x: -900,
  y: -680,
  v: "A"
}]);
var CellContent = ({
  i
}) => {
  if (i === 4) {
    return /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: (CELL_H - 1080 * MINI_SCALE) / 2,
        transform: `scale(${MINI_SCALE})`,
        transformOrigin: __scCopy("top left")
      },
      children: /* @__PURE__ */jsx2(FakeDashboard, {
        variant: "A"
      })
    });
  }
  const crop = CROPS[i];
  if (crop === null) {
    return /* @__PURE__ */jsx2("div", {
      style: {
        width: "100%",
        height: "100%",
        background: G.panel,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */jsx2(Card, {
        w: 430,
        h: 240,
        seed: i * 3 + 2
      })
    });
  }
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: crop.x,
      top: crop.y
    },
    children: /* @__PURE__ */jsx2(FakeDashboard, {
      variant: crop.v
    })
  });
};
var GridFlashMosaic = () => {
  const f = useCurrentFrame();
  const breath = f >= LAST_IN && f < HOLD_END ? 1 + 8e-3 * Math.sin(Math.PI * (f - LAST_IN) / 14) : 1;
  const zoom = interpolate(f, [HOLD_END, ZOOM_END], [1, ZOOM_SCALE], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `scale(${breath})`,
        transformOrigin: __scCopy("960px 540px")
      },
      children: Array.from({
        length: 9
      }).map((_, i) => {
        const start = FILL_START + RANK[i] * STEP;
        if (f < start) return null;
        const row = Math.floor(i / 3);
        const col = i % 3;
        const popScale = interpolate(f, [start, start + 3], [1.18, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        const darken = interpolate(f, [start, start + 2], [0.45, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        const isCenter = i === 4;
        const cellScale = isCenter ? popScale * zoom : popScale;
        return /* @__PURE__ */jsxs2("div", {
          style: {
            position: "absolute",
            left: GRID_X + col * (CELL_W + GAP),
            top: GRID_Y + row * (CELL_H + GAP),
            width: CELL_W,
            height: CELL_H,
            overflow: "hidden",
            background: G.card,
            border: `3px solid ${G.ink}`,
            boxSizing: "border-box",
            transform: `scale(${cellScale})`,
            transformOrigin: "center",
            zIndex: isCenter ? 10 : 1
          },
          children: [/* @__PURE__ */jsx2(CellContent, {
            i
          }), darken > 1e-3 && /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: darken
            }
          })]
        }, i);
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GridFlashMosaic;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
