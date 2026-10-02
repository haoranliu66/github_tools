// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx

var T = __scConfig("demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx#T", "T", () => ({
  cursorInEnd: 30,
  // 0–30f 光标贝塞尔滑入（f24 过冲峰值，f24–30 拐回落定）
  click: 40,
  // 30–40f 悬停响应 10f；f40 点击
  punchEnd: 52,
  // 40–52f 推近 1→1.4（out-cubic）
  holdEnd: 72,
  // 52–72f 停 20f
  backEnd: 90,
  // 72–90f 缓退回 1.0（inOut-cubic）
  total: 150
  // 90–150f 真静止 60f
}));
var BTN = __scConfig("demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx#BTN", "BTN", () => ({
  x: 1560,
  y: 130,
  w: 200,
  h: 64
}));
var CLICK = __scConfig("demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx#CLICK", "CLICK", () => ({
  x: 1665,
  y: 168
}));
var P0 = __scConfig("demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx#P0", "P0", () => ({
  x: 180,
  y: 1e3
}));
var P1 = __scConfig("demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx#P1", "P1", () => ({
  x: 820,
  y: 1075
}));
var P2 = __scConfig("demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx#P2", "P2", () => ({
  x: 1795,
  y: 560
}));
var P3 = __scConfig("demos/interaction/input-trigger-moves/CursorPerformancePunchIn.tsx#P3", "P3", () => ({
  x: CLICK.x,
  y: CLICK.y
}));
var bez = t => {
  const u = 1 - t;
  return {
    x: u * u * u * P0.x + 3 * u * u * t * P1.x + 3 * u * t * t * P2.x + t * t * t * P3.x,
    y: u * u * u * P0.y + 3 * u * u * t * P1.y + 3 * u * t * t * P2.y + t * t * t * P3.y
  };
};
var Cursor = ({
  x,
  y
}) => /* @__PURE__ */jsx2("svg", {
  width: 48,
  height: 48,
  viewBox: "0 0 28 28",
  style: {
    position: "absolute",
    left: x - 3.4,
    top: y - 1.7,
    filter: "drop-shadow(0 4px 7px rgba(0,0,0,0.4))"
  },
  children: /* @__PURE__ */jsx2("path", {
    d: __scCopy("M2 1 L2 23 L8 17.5 L11.5 25 L15.5 23.2 L12 15.8 L20 15 Z"),
    fill: "#ffffff",
    stroke: "#2f2f2f",
    strokeWidth: 1.6,
    strokeLinejoin: "round"
  })
});
var CursorPerformancePunchIn = () => {
  const frame = useCurrentFrame();
  const t = frame < 24 ? interpolate(frame, [0, 24], [0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  }) : interpolate(frame, [24, T.cursorInEnd], [1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const cur = bez(t);
  const dip = interpolate(frame, [T.click, T.click + 2, T.click + 6], [0, 3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const lift = interpolate(frame, [T.cursorInEnd, T.cursorInEnd + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const c = Math.round(47 + 38 * lift);
  const hoverScale = 1 + 0.05 * lift;
  const press = interpolate(frame, [T.click, T.click + 2, T.click + 6], [1, 0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const zoom = frame < T.holdEnd ? interpolate(frame, [T.click, T.punchEnd], [1, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  }) : interpolate(frame, [T.holdEnd, T.backEnd], [1.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const rippleAlive = frame >= T.click && frame < T.click + 26;
  const rippleD = interpolate(frame, [T.click, T.click + 22], [60, 380], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const rippleOp = interpolate(frame, [T.click, T.click + 26], [0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rippleBw = interpolate(frame, [T.click, T.click + 22], [9, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      overflow: "hidden",
      position: "relative"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `scale(${zoom})`,
        transformOrigin: `${CLICK.x}px ${CLICK.y}px`
      },
      children: [/* @__PURE__ */jsx2(FakeDashboard, {
        variant: "A"
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: BTN.x,
          top: BTN.y,
          width: BTN.w,
          height: BTN.h,
          borderRadius: 14,
          background: `rgb(${c},${c},${c - 2})`,
          boxShadow: "0 6px 18px rgba(0,0,0,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${hoverScale * press})`,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: 27,
          color: "#ffffff",
          letterSpacing: 0.5
        },
        children: __scCopy("Deploy")
      }), rippleAlive && /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: CLICK.x - rippleD / 2,
          top: CLICK.y - rippleD / 2,
          width: rippleD,
          height: rippleD,
          borderRadius: "50%",
          border: `${rippleBw}px solid ${G.ink}`,
          opacity: rippleOp
        }
      }), /* @__PURE__ */jsx2(Cursor, {
        x: cur.x,
        y: cur.y + dip
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CursorPerformancePunchIn;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
