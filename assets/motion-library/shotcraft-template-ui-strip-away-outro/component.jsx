// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx

var CLICK = __scConfig("demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx#CLICK", "CLICK", () => 34);
var STRIP = __scConfig("demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx#STRIP", "STRIP", () => ({
  sidebar: CLICK + 4,
  leftPanel: CLICK + 8,
  canvasCards: CLICK + 12,
  topbarEnds: CLICK + 16,
  canvasBg: CLICK + 20,
  toolbarShell: CLICK + 24
}));
var STRIP_DUR = 14;
var BTN_FADE = __scConfig("demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx#BTN_FADE", "BTN_FADE", () => CLICK + 52);
var LOGO_IN = __scConfig("demos/outro/ui-strip-away-outro/UiStripAwayOutro.tsx#LOGO_IN", "LOGO_IN", () => CLICK + 62);
var useStrip = (frame, start, dx, dy) => {
  const p = interpolate(frame, [start, start + STRIP_DUR], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad)
    // 离场加速
  });
  return {
    opacity: 1 - p,
    transform: `translate(${dx * p}px, ${dy * p}px)`
  };
};
var UiStripAwayOutro = () => {
  const frame = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  const bgDark = interpolate(frame, [STRIP.canvasBg, STRIP.canvasBg + STRIP_DUR + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const sidebar = useStrip(frame, STRIP.sidebar, -140, 0);
  const leftPanel = useStrip(frame, STRIP.leftPanel, -90, 20);
  const topLeft = useStrip(frame, STRIP.topbarEnds, -80, -60);
  const topRight = useStrip(frame, STRIP.topbarEnds, 80, -60);
  const toolbarShell = useStrip(frame, STRIP.toolbarShell, 0, -50);
  const canvasFrame = useStrip(frame, STRIP.canvasBg, 0, 40);
  const cardStrip = i => useStripStatic(frame, STRIP.canvasCards + i * 3, i % 2 ? 70 : -70, 50 + i * 10);
  const press = spring({
    frame: frame - CLICK,
    fps,
    config: {
      damping: 12,
      stiffness: 220
    }
  });
  const pressScale = frame < CLICK ? 1 : 1 - 0.12 * Math.sin(Math.min(1, press) * Math.PI);
  const btnOp = interpolate(frame, [BTN_FADE, BTN_FADE + 12], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const btnCenter = interpolate(frame, [STRIP.toolbarShell, STRIP.toolbarShell + 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const btnX = 1560 + (960 - 88 - 1560) * btnCenter;
  const btnY = 30 + (540 - 30 - 30) * btnCenter;
  const btnScale = 1 + 0.5 * btnCenter;
  const logoP = spring({
    frame: frame - LOGO_IN,
    fps,
    config: {
      damping: 14,
      stiffness: 90
    }
  });
  const curX = interpolate(frame, [4, CLICK - 2], [820, 1636], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const curY = interpolate(frame, [4, CLICK - 2], [640, 64], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const curOp = interpolate(frame, [CLICK + 6, CLICK + 16], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: "#111110",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        background: G.bg,
        opacity: 1 - bgDark
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 240,
        background: G.side,
        padding: __scCopy("90px 24px"),
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        ...sidebar
      },
      children: Array.from({
        length: 9
      }).map((_, i) => /* @__PURE__ */jsx2("div", {
        style: {
          height: 13,
          width: `${55 + i * 31 % 40}%`,
          background: G.sideBar,
          borderRadius: 6
        }
      }, i))
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        right: 0,
        top: 60,
        bottom: 0,
        width: 300,
        background: G.panel,
        borderLeft: `2px solid ${G.line}`,
        padding: 28,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        ...leftPanel
      },
      children: Array.from({
        length: 4
      }).map((_, i) => /* @__PURE__ */jsxs2(React.Fragment, {
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            height: 12,
            width: "45%",
            background: G.bar,
            borderRadius: 6
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 34,
            background: "#fff",
            border: `2px solid ${G.line}`,
            borderRadius: 8,
            boxSizing: "border-box"
          }
        })]
      }, i))
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 760,
        height: 60,
        background: G.panel,
        borderBottom: `2px solid ${G.line}`,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: __scCopy("0 24px"),
        boxSizing: "border-box",
        ...topLeft
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 32,
          height: 32,
          borderRadius: 8,
          background: G.mid
        }
      }), Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */jsx2("div", {
        style: {
          width: 30,
          height: 30,
          borderRadius: 8,
          background: G.line
        }
      }, i))]
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 760,
        top: 0,
        right: 400,
        height: 60,
        background: G.panel,
        borderBottom: `2px solid ${G.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        ...toolbarShell
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          height: 14,
          width: 220,
          background: G.bar,
          borderRadius: 7
        }
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        right: 0,
        top: 0,
        width: 400,
        height: 60,
        background: G.panel,
        borderBottom: `2px solid ${G.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: __scCopy("flex-start"),
        gap: 14,
        padding: __scCopy("0 24px"),
        boxSizing: "border-box",
        ...topRight
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          height: 36,
          width: 100,
          borderRadius: 18,
          border: `2px solid ${G.bar}`,
          boxSizing: "border-box"
        }
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 320,
        top: 130,
        width: 1180,
        height: 850,
        ...canvasFrame
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 0,
          background: G.card,
          border: `2px solid ${G.border}`,
          borderRadius: 18,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)"
        },
        children: /* @__PURE__ */jsxs2("div", {
          style: {
            height: 46,
            borderBottom: `2px solid ${G.line}`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: __scCopy("0 18px")
          },
          children: [[0, 1, 2].map(i => /* @__PURE__ */jsx2("div", {
            style: {
              width: 14,
              height: 14,
              borderRadius: 7,
              background: G.line
            }
          }, i)), /* @__PURE__ */jsx2("div", {
            style: {
              marginLeft: 16,
              height: 20,
              width: 380,
              background: G.bg,
              borderRadius: 10
            }
          })]
        })
      }), [0, 1, 2, 3].map(i => {
        const s = cardStrip(i);
        return /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 70 + i % 2 * 560,
            top: 120 + Math.floor(i / 2) * 340,
            ...s
          },
          children: /* @__PURE__ */jsx2(Card, {
            w: 480,
            h: 280,
            seed: i + 2
          })
        }, i);
      })]
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: btnX,
        top: btnY,
        width: 176,
        height: 44,
        opacity: btnOp,
        transform: `scale(${pressScale})`,
        zIndex: 30
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          width: 176 * btnScale,
          height: 44 * btnScale,
          marginLeft: -((176 * btnScale - 176) / 2),
          marginTop: -((44 * btnScale - 44) / 2),
          borderRadius: 22 * btnScale,
          background: "#f2f2f0",
          boxShadow: `0 0 ${30 + 40 * btnCenter}px rgba(255,255,255,${0.25 + 0.3 * btnCenter * bgDark})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: 20 * btnScale,
          color: "#161615"
        },
        children: __scCopy("Publish")
      })
    }), frame >= LOGO_IN && /* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          opacity: logoP,
          transform: `scale(${0.86 + 0.14 * logoP})`,
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 110,
          letterSpacing: 6,
          color: "#f2f2f0"
        },
        children: __scCopy("WORDMARK")
      })
    }), /* @__PURE__ */jsx2("svg", {
      width: 40,
      height: 44,
      viewBox: "0 0 20 22",
      style: {
        position: "absolute",
        left: curX,
        top: curY,
        opacity: curOp,
        zIndex: 40
      },
      children: /* @__PURE__ */jsx2("path", {
        d: __scCopy("M2 1 L2 17 L6.5 13.2 L9.4 20 L12.4 18.7 L9.5 12 L15 11.6 Z"),
        fill: G.ink,
        stroke: "#fff",
        strokeWidth: "1.4"
      })
    })]
  });
};
var useStripStatic = (frame, start, dx, dy) => {
  const p = interpolate(frame, [start, start + STRIP_DUR], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad)
  });
  return {
    opacity: 1 - p,
    transform: `translate(${dx * p}px, ${dy * p}px)`
  };
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = UiStripAwayOutro;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
