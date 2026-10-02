// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/wall-reveal-moves/WireframeDrawOn.tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/wall-reveal-moves/WireframeDrawOn.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/wall-reveal-moves/WireframeDrawOn.tsx

var CARD_W = __scConfig("demos/ui-entrance/wall-reveal-moves/WireframeDrawOn.tsx#CARD_W", "CARD_W", () => 524);
var CARD_H = __scConfig("demos/ui-entrance/wall-reveal-moves/WireframeDrawOn.tsx#CARD_H", "CARD_H", () => 454);
var CARD_X = __scConfig("demos/ui-entrance/wall-reveal-moves/WireframeDrawOn.tsx#CARD_X", "CARD_X", () => [256, 808, 1360]);
var CARD_Y = __scConfig("demos/ui-entrance/wall-reveal-moves/WireframeDrawOn.tsx#CARD_Y", "CARD_Y", () => [108, 590]);
var seedFrac = i => {
  const v = Math.sin(i * 127.3) * 43758.5453;
  return v - Math.floor(v);
};
var WireframeDrawOn = () => {
  const frame = useCurrentFrame();
  const draw = start => interpolate(frame, [start, start + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.3, 1)
  });
  const tSide = draw(20);
  const tTop = draw(30);
  const tCards = Array.from({
    length: 6
  }, (_, i) => draw(40 + i * 3));
  const tChart = draw(52);
  const scan = interpolate(frame, [88, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.55, 0, 0.25, 1)
  });
  const scanX = scan * 1920;
  const lineOpacity = interpolate(frame, [86, 92, 112, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const stroke = t => ({
    fill: "none",
    stroke: G.mid,
    strokeWidth: 2.5,
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1 - t,
    strokeLinecap: "round",
    opacity: t > 0 ? 1 : 0
  });
  const chartCardX = CARD_X[1];
  const chartCardY = CARD_Y[1];
  const chartPts = Array.from({
    length: 8
  }, (_, i) => {
    const px = chartCardX + 50 + i * (CARD_W - 100) / 7;
    const py = chartCardY + 130 + seedFrac(i + 3) * 230;
    return `${px},${py}`;
  }).join(" ");
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: G.bg,
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsxs2("svg", {
      width: 1920,
      height: 1080,
      viewBox: "0 0 1920 1080",
      style: {
        position: "absolute",
        inset: 0
      },
      children: [/* @__PURE__ */jsx2("rect", {
        x: 4,
        y: 4,
        width: 216,
        height: 1072,
        rx: 2,
        ...stroke(tSide)
      }), /* @__PURE__ */jsx2("rect", {
        x: 26,
        y: 30,
        width: 40,
        height: 40,
        rx: 10,
        ...stroke(draw(24))
      }), Array.from({
        length: 7
      }).map((_, i) => {
        const w = (216 - 44) * (0.6 + i * 29 % 35 / 100);
        return /* @__PURE__ */jsx2("line", {
          x1: 26,
          y1: 94 + i * 30,
          x2: 26 + w,
          y2: 94 + i * 30,
          ...stroke(draw(26 + i * 2))
        }, `s${i}`);
      }), /* @__PURE__ */jsx2("line", {
        x1: 220,
        y1: 72,
        x2: 1916,
        y2: 72,
        ...stroke(tTop)
      }), /* @__PURE__ */jsx2("rect", {
        x: 252,
        y: 27,
        width: 180,
        height: 18,
        rx: 9,
        ...stroke(draw(34))
      }), /* @__PURE__ */jsx2("rect", {
        x: 1476,
        y: 18,
        width: 320,
        height: 36,
        rx: 18,
        ...stroke(draw(36))
      }), /* @__PURE__ */jsx2("circle", {
        cx: 1834,
        cy: 36,
        r: 18,
        ...stroke(draw(38))
      }), tCards.map((t, i) => {
        const cx = CARD_X[i % 3];
        const cy = CARD_Y[Math.floor(i / 3)];
        const titleW = (CARD_W - 36) * (0.45 + (i + 1) * 37 % 40 / 100);
        return /* @__PURE__ */jsxs2("g", {
          children: [/* @__PURE__ */jsx2("rect", {
            x: cx,
            y: cy,
            width: CARD_W,
            height: CARD_H,
            rx: 14,
            ...stroke(t)
          }), /* @__PURE__ */jsx2("rect", {
            x: cx + 18,
            y: cy + 18,
            width: titleW,
            height: 16,
            rx: 8,
            ...stroke(draw(46 + i * 3))
          }), /* @__PURE__ */jsx2("line", {
            x1: cx + 18,
            y1: cy + 62,
            x2: cx + 18 + (CARD_W - 36) * 0.82,
            y2: cy + 62,
            ...stroke(draw(49 + i * 3))
          }), /* @__PURE__ */jsx2("line", {
            x1: cx + 18,
            y1: cy + 88,
            x2: cx + 18 + (CARD_W - 36) * 0.62,
            y2: cy + 88,
            ...stroke(draw(51 + i * 3))
          }), /* @__PURE__ */jsx2("circle", {
            cx: cx + 31,
            cy: cy + CARD_H - 31,
            r: 13,
            ...stroke(draw(53 + i * 3))
          })]
        }, `c${i}`);
      }), /* @__PURE__ */jsx2("polyline", {
        points: chartPts,
        ...stroke(tChart),
        strokeWidth: 3
      })]
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        clipPath: `inset(0 ${(1 - scan) * 100}% 0 0)`
      },
      children: /* @__PURE__ */jsx2(FakeDashboard, {
        variant: "A"
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: scanX - 2,
        top: 0,
        width: 4,
        height: 1080,
        background: "#ffc46b",
        opacity: lineOpacity,
        boxShadow: "0 0 18px 6px rgba(232, 163, 61, 0.65), 0 0 60px 18px rgba(232, 163, 61, 0.28)"
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = WireframeDrawOn;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
