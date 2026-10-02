// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/impact-feedback/AnimeImpact.tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/impact-feedback/AnimeImpact.tsx
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
var TitleBlock = ({
  text,
  size = 88
}) => /* @__PURE__ */jsx("div", {
  style: {
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: 800,
    fontSize: size,
    color: G.ink,
    letterSpacing: -1
  },
  children: text
});

// implementation/video-shotcraft/full/stage/source/demos/effects/impact-feedback/AnimeImpact.tsx

var ZOOM_START = __scConfig("demos/effects/impact-feedback/AnimeImpact.tsx#ZOOM_START", "ZOOM_START", () => 24);
var ZOOM_END = __scConfig("demos/effects/impact-feedback/AnimeImpact.tsx#ZOOM_END", "ZOOM_END", () => 30);
var IMPACT_LEN = __scConfig("demos/effects/impact-feedback/AnimeImpact.tsx#IMPACT_LEN", "IMPACT_LEN", () => 3);
var RECOVER = __scConfig("demos/effects/impact-feedback/AnimeImpact.tsx#RECOVER", "RECOVER", () => ZOOM_END + IMPACT_LEN);
var CARD = __scConfig("demos/effects/impact-feedback/AnimeImpact.tsx#CARD", "CARD", () => ({
  x: 808,
  y: 108,
  w: 524,
  h: 454
}));
var CX = __scConfig("demos/effects/impact-feedback/AnimeImpact.tsx#CX", "CX", () => CARD.x + CARD.w / 2);
var CY = __scConfig("demos/effects/impact-feedback/AnimeImpact.tsx#CY", "CY", () => CARD.y + CARD.h / 2);
var SCALE_END = __scConfig("demos/effects/impact-feedback/AnimeImpact.tsx#SCALE_END", "SCALE_END", () => 2.4);
var rnd = i => {
  const s = Math.sin(i * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var SpeedLines = ({
  phase
}) => {
  const cx = 960;
  const cy = 540;
  const R_OUT = 1300;
  const polys = Array.from({
    length: 30
  }).map((_, i) => {
    const k = i * 13 + phase * 101;
    const ang = (i + 0.5) / 30 * Math.PI * 2 + (rnd(k) - 0.5) * 0.22;
    const r0 = 300 + rnd(k + 1) * 220;
    const halfW = (7 + rnd(k + 2) * 16) / R_OUT;
    const ax = cx + Math.cos(ang) * r0;
    const ay = cy + Math.sin(ang) * r0;
    const b1x = cx + Math.cos(ang - halfW) * R_OUT;
    const b1y = cy + Math.sin(ang - halfW) * R_OUT;
    const b2x = cx + Math.cos(ang + halfW) * R_OUT;
    const b2y = cy + Math.sin(ang + halfW) * R_OUT;
    return `${ax},${ay} ${b1x},${b1y} ${b2x},${b2y}`;
  });
  return /* @__PURE__ */jsx2("svg", {
    viewBox: "0 0 1920 1080",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%"
    },
    children: polys.map((pts, i) => /* @__PURE__ */jsx2("polygon", {
      points: pts,
      fill: i % 4 === 0 ? "#111111" : "#f5f5f5"
    }, i))
  });
};
var Scene = () => /* @__PURE__ */jsxs2(Fragment, {
  children: [/* @__PURE__ */jsx2(FakeDashboard, {
    variant: "A"
  }), /* @__PURE__ */jsxs2("div", {
    style: {
      position: "absolute",
      left: CARD.x,
      top: CARD.y
    },
    children: [/* @__PURE__ */jsx2(Card, {
      w: CARD.w,
      h: CARD.h,
      seed: 9,
      style: {
        boxShadow: "0 10px 36px rgba(0,0,0,0.18)",
        border: `3px solid ${G.ink}`
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 24,
        bottom: 96
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("IMPACT"),
        size: 92
      })
    })]
  })]
});
var AnimeImpact = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [ZOOM_START, ZOOM_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  });
  const scale = 1 + p * (SCALE_END - 1);
  const tx = (960 - CX) * p;
  const ty = (540 - CY) * p;
  const impact = frame >= ZOOM_END && frame < RECOVER;
  const phase = impact ? frame - ZOOM_END : 0;
  const since = frame - RECOVER;
  const env = since >= 0 ? 6 * Math.exp(-since / 2.2) : 0;
  const shakeX = env * Math.sin(since * 3.7);
  const shakeY = env * 0.7 * Math.sin(since * 5.1 + 0.9);
  const zoomStyle = {
    position: "absolute",
    inset: 0,
    transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
    transformOrigin: `${CX}px ${CY}px`
  };
  return /* @__PURE__ */jsx2(AbsoluteFill, {
    style: {
      background: impact ? "#131315" : G.bg,
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `translate(${shakeX}px, ${shakeY}px)`
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          ...zoomStyle,
          filter: impact ? "invert(1) grayscale(1)" : "none"
        },
        children: /* @__PURE__ */jsx2(Scene, {})
      }), impact && /* @__PURE__ */jsxs2(Fragment, {
        children: [/* @__PURE__ */jsxs2("div", {
          style: {
            position: "absolute",
            inset: 0,
            mixBlendMode: "screen",
            transform: `translate(-8px, ${phase % 2 === 0 ? 4 : -4}px)`
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              ...zoomStyle,
              filter: "invert(1) grayscale(1)"
            },
            children: /* @__PURE__ */jsx2(Scene, {})
          }), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              inset: 0,
              background: "#ff0033",
              mixBlendMode: "multiply"
            }
          })]
        }), /* @__PURE__ */jsxs2("div", {
          style: {
            position: "absolute",
            inset: 0,
            mixBlendMode: "screen",
            transform: `translate(8px, ${phase % 2 === 0 ? -4 : 4}px)`
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              ...zoomStyle,
              filter: "invert(1) grayscale(1)"
            },
            children: /* @__PURE__ */jsx2(Scene, {})
          }), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              inset: 0,
              background: "#00e5ff",
              mixBlendMode: "multiply"
            }
          })]
        }), /* @__PURE__ */jsx2(SpeedLines, {
          phase
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AnimeImpact;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
