// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/command-palette-summon/CommandPaletteSummon.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/command-palette-summon/CommandPaletteSummon.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/command-palette-summon/CommandPaletteSummon.tsx

var CL = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#CL", "CL", () => ({
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
}));
var DIM0 = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#DIM0", "DIM0", () => 12);
var DIM1 = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#DIM1", "DIM1", () => 22);
var PANEL_IN = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#PANEL_IN", "PANEL_IN", () => 18);
var ROWS_START = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#ROWS_START", "ROWS_START", () => 32);
var KEY1 = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#KEY1", "KEY1", () => 62);
var KEY2 = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#KEY2", "KEY2", () => 78);
var HL = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#HL", "HL", () => 94);
var BLINK_END = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#BLINK_END", "BLINK_END", () => 104);
var PANEL_W = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#PANEL_W", "PANEL_W", () => 780);
var PANEL_X = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#PANEL_X", "PANEL_X", () => (1920 - PANEL_W) / 2);
var PANEL_Y = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#PANEL_Y", "PANEL_Y", () => 290);
var ROW_H = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#ROW_H", "ROW_H", () => 72);
var ROW_GAP = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#ROW_GAP", "ROW_GAP", () => 8);
var EXIT_DUR = 10;
var ROWS = __scConfig("demos/interaction/command-palette-summon/CommandPaletteSummon.tsx#ROWS", "ROWS", () => [{
  titleW: 52,
  exitAt: 0
}, {
  titleW: 38,
  exitAt: 0
}, {
  titleW: 61,
  exitAt: 2
}, {
  titleW: 45,
  exitAt: 1
}, {
  titleW: 56,
  exitAt: 1
}]);
var PaletteRow = ({
  i,
  frame
}) => {
  const {
    titleW,
    exitAt
  } = ROWS[i];
  const inStart = ROWS_START + i * 4;
  const exitStart = exitAt === 1 ? KEY1 + 3 : exitAt === 2 ? KEY2 + 3 : null;
  if (exitStart !== null && frame >= exitStart + EXIT_DUR) return null;
  const inOp = interpolate(frame, [inStart, inStart + 8], [0, 1], CL);
  const inY = interpolate(frame, [inStart, inStart + 8], [12, 0], {
    easing: Easing.out(Easing.cubic),
    ...CL
  });
  const exitT = exitStart === null ? 1 : interpolate(frame, [exitStart, exitStart + EXIT_DUR], [1, 0], {
    easing: Easing.inOut(Easing.cubic),
    ...CL
  });
  const hl = i === 0 ? interpolate(frame, [HL, HL + 10], [0, 1], CL) : 0;
  return /* @__PURE__ */jsx2("div", {
    style: {
      height: (ROW_H + ROW_GAP) * exitT,
      opacity: inOp * exitT,
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        height: ROW_H,
        borderRadius: 12,
        background: hl > 0 ? `rgba(228,228,226,${hl})` : "transparent",
        boxShadow: hl > 0 ? `inset 4px 0 0 rgba(47,47,47,${hl})` : "none",
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: __scCopy("0 22px"),
        boxSizing: "border-box",
        transform: `translateY(${inY}px)`
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 9,
          background: G.mid
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 14,
          width: `${titleW}%`,
          background: G.bar,
          borderRadius: 7
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          marginLeft: "auto",
          width: 58,
          height: 24,
          borderRadius: 6,
          background: G.line
        }
      })]
    })
  });
};
var CommandPaletteSummon = () => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [DIM0, DIM1], [0, 0.45], CL);
  const blur = interpolate(frame, [DIM0, DIM1], [0, 10], CL);
  const panelY = frame < PANEL_IN + 9 ? interpolate(frame, [PANEL_IN, PANEL_IN + 9], [-20, 8], {
    easing: Easing.out(Easing.cubic),
    ...CL
  }) : interpolate(frame, [PANEL_IN + 9, PANEL_IN + 15], [8, 0], {
    easing: Easing.inOut(Easing.cubic),
    ...CL
  });
  const panelOp = interpolate(frame, [PANEL_IN, PANEL_IN + 7], [0, 1], CL);
  const typed = (frame >= KEY1 ? 1 : 0) + (frame >= KEY2 ? 1 : 0);
  const cursorOn = frame >= BLINK_END ? true : (frame - PANEL_IN) % 16 < 8;
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
        filter: frame < DIM0 ? void 0 : `blur(${blur}px)`
      },
      children: /* @__PURE__ */jsx2(FakeDashboard, {
        variant: "A"
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: `rgba(20,20,20,${dim})`
      }
    }), frame >= PANEL_IN && /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: PANEL_X,
        top: PANEL_Y,
        width: PANEL_W,
        transform: `translateY(${panelY}px)`,
        opacity: panelOp,
        background: G.card,
        borderRadius: 18,
        border: `2px solid ${G.border}`,
        boxShadow: "0 28px 90px rgba(0,0,0,0.4)",
        padding: 20,
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsxs2("div", {
        style: {
          height: 76,
          borderBottom: `2px solid ${G.line}`,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: __scCopy("0 10px 14px 10px"),
          boxSizing: "border-box"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            width: 32,
            height: 32,
            borderRadius: 8,
            background: G.bar
          }
        }), Array.from({
          length: typed
        }).map((_, c) => /* @__PURE__ */jsx2("div", {
          style: {
            width: 28,
            height: 38,
            borderRadius: 6,
            background: "#4a4a48"
          }
        }, c)), cursorOn && /* @__PURE__ */jsx2("div", {
          style: {
            width: 4,
            height: 42,
            background: G.ink,
            borderRadius: 2
          }
        }), typed === 0 && /* @__PURE__ */jsx2("div", {
          style: {
            width: 260,
            height: 14,
            borderRadius: 7,
            background: G.line,
            opacity: 0.8
          }
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          paddingTop: 14
        },
        children: ROWS.map((_, i) => /* @__PURE__ */jsx2(PaletteRow, {
          i,
          frame
        }, i))
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CommandPaletteSummon;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
