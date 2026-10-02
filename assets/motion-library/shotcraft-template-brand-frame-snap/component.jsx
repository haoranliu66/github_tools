// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/brand-frame-snap/BrandFrameSnap.tsx
import { useCurrentFrame, spring, interpolate } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/brand-frame-snap/BrandFrameSnap.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/effects/brand-frame-snap/BrandFrameSnap.tsx

var FPS = __scConfig("demos/effects/brand-frame-snap/BrandFrameSnap.tsx#FPS", "FPS", () => 30);
var FIGMA_BLUE = __scConfig("demos/effects/brand-frame-snap/BrandFrameSnap.tsx#FIGMA_BLUE", "FIGMA_BLUE", () => "#3E7BFA");
var DEV_GREEN = __scConfig("demos/effects/brand-frame-snap/BrandFrameSnap.tsx#DEV_GREEN", "DEV_GREEN", () => "#1BC47D");
var FLIP_FRAME = __scConfig("demos/effects/brand-frame-snap/BrandFrameSnap.tsx#FLIP_FRAME", "FLIP_FRAME", () => 78);
var clamp01 = t => Math.min(1, Math.max(0, t));
var easeOut = t => 1 - Math.pow(1 - t, 3);
var BrandFrameSnap = () => {
  const f = useCurrentFrame();
  const mode = f < FLIP_FRAME ? __scCopy("design") : __scCopy("dev");
  const frameColor = mode === __scCopy("design") ? FIGMA_BLUE : DEV_GREEN;
  const frameGrow = easeOut(clamp01(f / 18));
  const frameW = 44 * frameGrow;
  const drop = spring({
    frame: f - 14,
    fps: FPS,
    config: {
      damping: 16,
      stiffness: 110,
      mass: 1
    }
  });
  const winY = interpolate(drop, [0, 1], [560, 0]);
  const winS = interpolate(drop, [0, 1], [0.82, 1]);
  const winO = interpolate(drop, [0, 0.25], [0, 1], {
    extrapolateRight: "clamp"
  });
  const sinceFlip = f - FLIP_FRAME;
  const flash = sinceFlip >= 0 && sinceFlip < 3 ? 0.55 - sinceFlip * 0.18 : 0;
  const snapPulse = sinceFlip >= 0 ? Math.exp(-sinceFlip * 0.22) * Math.cos(sinceFlip * 0.9) * 10 : 0;
  const label = mode === __scCopy("design") ? __scCopy("DESIGN") : __scCopy("DEV MODE");
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: "#161618",
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: frameW + snapPulse,
        background: G.bg,
        overflow: "hidden",
        borderRadius: 8
      },
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1560,
          height: 830,
          transform: `translate(-50%, -50%) translateY(${winY}px) scale(${winS})`,
          opacity: winO,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
          border: `2px solid ${G.border}`,
          background: G.panel
        },
        children: [/* @__PURE__ */jsxs2("div", {
          style: {
            height: 52,
            background: "#e9e9e7",
            borderBottom: `2px solid ${G.line}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: __scCopy("0 22px"),
            boxSizing: "border-box"
          },
          children: [[0, 1, 2].map(i => /* @__PURE__ */jsx2("div", {
            style: {
              width: 16,
              height: 16,
              borderRadius: 8,
              background: G.bar
            }
          }, i)), /* @__PURE__ */jsx2("div", {
            style: {
              marginLeft: 18,
              height: 12,
              width: 260,
              background: G.line,
              borderRadius: 6
            }
          }), /* @__PURE__ */jsx2("div", {
            style: {
              marginLeft: "auto",
              background: frameColor,
              color: "#fff",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: 1.5,
              padding: __scCopy("6px 16px"),
              borderRadius: 8,
              opacity: winO
            },
            children: label
          })]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            transform: "scale(0.81)",
            transformOrigin: "0 0",
            width: 1920,
            height: 1080
          },
          children: /* @__PURE__ */jsx2(FakeDashboard, {
            variant: mode === __scCopy("design") ? "A" : "B"
          })
        })]
      })
    }), [{
      left: 0,
      top: 0,
      right: 0,
      height: frameW + snapPulse
    }, {
      left: 0,
      bottom: 0,
      right: 0,
      height: frameW + snapPulse
    }, {
      left: 0,
      top: 0,
      bottom: 0,
      width: frameW + snapPulse
    }, {
      right: 0,
      top: 0,
      bottom: 0,
      width: frameW + snapPulse
    }].map((pos, i) => /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        background: frameColor,
        ...pos
      }
    }, i)), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 70,
        top: 0,
        height: frameW + snapPulse,
        display: "flex",
        alignItems: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 22,
        letterSpacing: 3,
        color: "#ffffff",
        opacity: frameGrow
      },
      children: label
    }), flash > 0 && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "#ffffff",
        opacity: flash
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = BrandFrameSnap;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
