// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/ComicPanelSplit.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/ComicPanelSplit.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/rhythm/panel-grid-moves/ComicPanelSplit.tsx

var SPLIT = __scConfig("demos/rhythm/panel-grid-moves/ComicPanelSplit.tsx#SPLIT", "SPLIT", () => 20);
var POP = __scConfig("demos/rhythm/panel-grid-moves/ComicPanelSplit.tsx#POP", "POP", () => 3);
var STAGGER = __scConfig("demos/rhythm/panel-grid-moves/ComicPanelSplit.tsx#STAGGER", "STAGGER", () => 2);
var HOLD_END = __scConfig("demos/rhythm/panel-grid-moves/ComicPanelSplit.tsx#HOLD_END", "HOLD_END", () => 45);
var EXPAND_END = __scConfig("demos/rhythm/panel-grid-moves/ComicPanelSplit.tsx#EXPAND_END", "EXPAND_END", () => 57);
var outCubic = Easing.out(Easing.cubic);
var PageA = () => /* @__PURE__ */jsxs2("div", {
  style: {
    width: 1920,
    height: 1080,
    position: "relative"
  },
  children: [/* @__PURE__ */jsx2(FakeDashboard, {
    variant: "A"
  }), /* @__PURE__ */jsxs2("div", {
    style: {
      position: "absolute",
      left: 328,
      top: 320,
      width: 380,
      height: 160,
      background: G.card,
      borderRadius: 12,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 96,
        color: G.ink,
        letterSpacing: -2,
        lineHeight: 1
      },
      children: __scCopy("1,284")
    }), /* @__PURE__ */jsx2("div", {
      style: {
        height: 10,
        width: 150,
        background: G.mid,
        borderRadius: 5
      }
    })]
  })]
});
var ComicPanelSplit = () => {
  const frame = useCurrentFrame();
  if (frame >= EXPAND_END) {
    return /* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        background: G.bg,
        overflow: "hidden"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          width: 1920,
          height: 1080,
          transform: "translate(442px, 140px) scale(2.6)",
          transformOrigin: __scCopy("518px 400px")
        },
        children: /* @__PURE__ */jsx2(PageA, {})
      })
    });
  }
  if (frame < SPLIT) {
    return /* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        background: G.bg
      },
      children: /* @__PURE__ */jsx2(PageA, {})
    });
  }
  const push = interpolate(frame, [SPLIT + 2 * STAGGER + POP, HOLD_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const ex = interpolate(frame, [HOLD_END, EXPAND_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: outCubic
  });
  const e3Top = 1410 + ex * (-60 - 1410);
  const e3Bot = 1180 + ex * (-290 - 1180);
  const panels = [{
    // 全景 1x
    clip: () => "polygon(0px 0px, 745px 0px, 515px 1080px, 0px 1080px)",
    centroidX: 315,
    originX: 960,
    originY: 540,
    baseScale: 1 + push * 0.03,
    tx: 0,
    ty: 0,
    z: 1
  }, {
    // 卡片特写 1.9x（中上卡片）
    clip: () => "polygon(755px 0px, 1400px 0px, 1170px 1080px, 525px 1080px)",
    centroidX: 962,
    originX: 1070,
    originY: 371,
    baseScale: 1.9 + push * 0.055,
    tx: -108,
    ty: 169,
    z: 1
  }, {
    // 数字区特写 2.6x（KPI 块），扩张时焦点从格中心搬到屏中心
    clip: () => `polygon(${e3Top}px 0px, 1920px 0px, 1920px 1080px, ${e3Bot}px 1080px)`,
    centroidX: 1607,
    originX: 518,
    originY: 400,
    // 扩张时 push 增量退掉，scale 收敛回 2.6（与摘罩帧完全一致）
    baseScale: 2.6 + push * 0.08 * (1 - ex),
    tx: 1089 + ex * (442 - 1089),
    ty: 140,
    z: 3
  }];
  const seam1O = Math.min(interpolate(frame, [SPLIT + STAGGER, SPLIT + STAGGER + 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }), interpolate(frame, [HOLD_END, HOLD_END + 3], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }));
  const seam2O = Math.min(interpolate(frame, [SPLIT + 2 * STAGGER, SPLIT + 2 * STAGGER + 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }), interpolate(frame, [EXPAND_END - 4, EXPAND_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }));
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: "#ffffff"
    },
    children: [panels.map((p, i) => {
      const start = SPLIT + i * STAGGER;
      if (frame < start) return null;
      const pop = interpolate(frame, [start, start + POP], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: outCubic
      });
      const popScale = 1.06 - 0.06 * pop;
      const pulse = 0.3 * (1 - pop);
      return /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          inset: 0,
          zIndex: p.z,
          clipPath: p.clip(frame),
          transform: `scale(${popScale})`,
          transformOrigin: `${p.centroidX}px 540px`
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            width: 1920,
            height: 1080,
            transform: `translate(${p.tx}px, ${p.ty}px) scale(${p.baseScale})`,
            transformOrigin: `${p.originX}px ${p.originY}px`
          },
          children: /* @__PURE__ */jsx2(PageA, {})
        }), pulse > 5e-3 && /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 0,
            background: `rgba(0,0,0,${pulse})`
          }
        })]
      }, i);
    }), (seam1O > 5e-3 || seam2O > 5e-3) && /* @__PURE__ */jsxs2("svg", {
      width: 1920,
      height: 1080,
      style: {
        position: "absolute",
        inset: 0,
        zIndex: 5,
        pointerEvents: "none"
      },
      children: [seam1O > 5e-3 && /* @__PURE__ */jsxs2("g", {
        opacity: seam1O,
        children: [/* @__PURE__ */jsx2("line", {
          x1: 750,
          y1: -10,
          x2: 520,
          y2: 1090,
          stroke: "#2f2f2f",
          strokeWidth: 16
        }), /* @__PURE__ */jsx2("line", {
          x1: 750,
          y1: -10,
          x2: 520,
          y2: 1090,
          stroke: "#ffffff",
          strokeWidth: 10
        })]
      }), seam2O > 5e-3 && /* @__PURE__ */jsxs2("g", {
        opacity: seam2O,
        children: [/* @__PURE__ */jsx2("line", {
          x1: e3Top - 5,
          y1: -10,
          x2: e3Bot - 5,
          y2: 1090,
          stroke: "#2f2f2f",
          strokeWidth: 16
        }), /* @__PURE__ */jsx2("line", {
          x1: e3Top - 5,
          y1: -10,
          x2: e3Bot - 5,
          y2: 1090,
          stroke: "#ffffff",
          strokeWidth: 10
        })]
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ComicPanelSplit;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
