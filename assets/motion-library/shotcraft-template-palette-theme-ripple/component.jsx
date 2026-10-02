// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx

var DIM_START = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#DIM_START", "DIM_START", () => 15);
var PANEL_IN = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#PANEL_IN", "PANEL_IN", () => 22);
var TYPE_FRAMES = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#TYPE_FRAMES", "TYPE_FRAMES", () => [38, 46, 54, 62]);
var ENTER = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#ENTER", "ENTER", () => 68);
var RIPPLE = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#RIPPLE", "RIPPLE", () => 73);
var RIPPLE_END = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#RIPPLE_END", "RIPPLE_END", () => 95);
var ORIGIN = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#ORIGIN", "ORIGIN", () => ({
  x: 960,
  y: 470
}));
var MAX_R = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#MAX_R", "MAX_R", () => 1250);
var D = __scConfig("demos/interaction/theme-switch-moves/PaletteThemeRipple.tsx#D", "D", () => ({
  bg: "#1a1a1c",
  panel: "#232325",
  line: "#3a3a38",
  bar: "#6f6f6d",
  ink: "#e8e8e6",
  mid: "#7a7a78",
  card: "#262628",
  border: "#454543",
  side: "#0e0e10",
  sideBar: "#555553"
}));
var DarkCard = ({
  seed
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: "100%",
      height: "100%",
      background: D.card,
      border: `2px solid ${D.border}`,
      borderRadius: 14,
      padding: 18,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 10
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        height: 16,
        width: `${titleW}%`,
        background: D.bar,
        borderRadius: 8
      }
    }), Array.from({
      length: lines
    }).map((_, i) => /* @__PURE__ */jsx2("div", {
      style: {
        height: 10,
        width: `${88 - i * 14 - seed % 5 * 3}%`,
        background: D.line,
        borderRadius: 5
      }
    }, i)), /* @__PURE__ */jsxs2("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 8,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 13,
          background: D.mid
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 10,
          width: 64,
          background: D.line,
          borderRadius: 5
        }
      })]
    })]
  });
};
var DarkDashboard = () => /* @__PURE__ */jsxs2("div", {
  style: {
    width: 1920,
    height: 1080,
    background: D.bg,
    display: "flex"
  },
  children: [/* @__PURE__ */jsxs2("div", {
    style: {
      width: 220,
      background: D.side,
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
        background: "#8a8a88"
      }
    }), Array.from({
      length: 7
    }).map((_, i) => /* @__PURE__ */jsx2("div", {
      style: {
        height: 12,
        width: `${60 + i * 29 % 35}%`,
        background: D.sideBar,
        borderRadius: 6
      }
    }, i))]
  }), /* @__PURE__ */jsxs2("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    children: [/* @__PURE__ */jsxs2("div", {
      style: {
        height: 72,
        background: D.panel,
        borderBottom: `2px solid ${D.line}`,
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
          background: D.bar,
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          marginLeft: "auto",
          height: 36,
          width: 320,
          background: D.card,
          border: `2px solid ${D.line}`,
          borderRadius: 18,
          boxSizing: "border-box"
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 18,
          background: D.mid
        }
      })]
    }), /* @__PURE__ */jsx2("div", {
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
      }).map((_, i) => /* @__PURE__ */jsx2(DarkCard, {
        seed: i + 1
      }, i))
    })]
  })]
});
var PaletteThemeRipple = () => {
  const f = useCurrentFrame();
  const dim = interpolate(f, [DIM_START, DIM_START + 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const panelT = interpolate(f, [PANEL_IN, PANEL_IN + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.9))
  });
  const shrink = interpolate(f, [ENTER, RIPPLE], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  });
  const panelMounted = f >= PANEL_IN && f < RIPPLE;
  const panelScale = f < ENTER ? panelT : shrink;
  const panelDropY = f < ENTER ? interpolate(panelT, [0, 1], [-120, 0]) : 0;
  const charScale = i => interpolate(f, [TYPE_FRAMES[i], TYPE_FRAMES[i] + 4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.2))
  });
  const typedCount = TYPE_FRAMES.filter(t => f >= t).length;
  const r = interpolate(f, [RIPPLE, RIPPLE_END], [12, MAX_R], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const rippling = f >= RIPPLE && f < RIPPLE_END;
  const done = f >= RIPPLE_END;
  const ringOpacity = interpolate(f, [RIPPLE, RIPPLE_END], [0.95, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const dotOn = f >= ENTER + 2 && f < RIPPLE + 3;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: D.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [!done && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        filter: dim > 0 ? `brightness(${1 - dim * 0.45}) blur(${dim * 6}px)` : "none"
      },
      children: /* @__PURE__ */jsx2(FakeDashboard, {
        variant: "A"
      })
    }), (rippling || done) && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        clipPath: done ? "none" : `circle(${r}px at ${ORIGIN.x}px ${ORIGIN.y}px)`
      },
      children: /* @__PURE__ */jsx2(DarkDashboard, {})
    }), rippling && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: ORIGIN.x - r,
        top: ORIGIN.y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: "50%",
        border: "5px solid rgba(255,255,255,0.9)",
        opacity: ringOpacity,
        boxShadow: "0 0 40px rgba(255,255,255,0.5), inset 0 0 30px rgba(255,255,255,0.35)"
      }
    }), dotOn && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: ORIGIN.x - 11,
        top: ORIGIN.y - 11,
        width: 22,
        height: 22,
        borderRadius: 11,
        background: "#ffffff",
        boxShadow: "0 0 46px 14px rgba(255,255,255,0.85)"
      }
    }), panelMounted && /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: ORIGIN.x - 340,
        top: ORIGIN.y - 130 + panelDropY,
        width: 680,
        height: 260,
        transform: `scale(${Math.max(panelScale, 1e-3)})`,
        transformOrigin: __scCopy("center center"),
        background: G.card,
        border: `2px solid ${G.border}`,
        borderRadius: 18,
        boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
        padding: 24,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: 16
      },
      children: [/* @__PURE__ */jsxs2("div", {
        style: {
          height: 62,
          border: `2px solid ${G.line}`,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: __scCopy("0 18px"),
          boxSizing: "border-box"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            padding: __scCopy("6px 12px"),
            borderRadius: 8,
            background: G.side,
            color: "#fff",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 22
          },
          children: __scCopy("\u2318K")
        }), TYPE_FRAMES.map((_, i) => /* @__PURE__ */jsx2("div", {
          style: {
            width: 30,
            height: 30,
            borderRadius: 6,
            background: G.ink,
            transform: `scale(${charScale(i)})`
          }
        }, i)), /* @__PURE__ */jsx2("div", {
          style: {
            width: 4,
            height: 34,
            background: G.ink,
            opacity: Math.floor(f / 8) % 2 === 0 ? 1 : 0
          }
        })]
      }), Array.from({
        length: 3
      }).map((_, i) => /* @__PURE__ */jsxs2("div", {
        style: {
          height: 44,
          borderRadius: 10,
          background: i === 0 && typedCount === 4 ? G.line : G.panel,
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: __scCopy("0 16px"),
          boxSizing: "border-box"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            width: 24,
            height: 24,
            borderRadius: 6,
            background: G.mid
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 12,
            width: `${34 + i * 16}%`,
            background: G.bar,
            borderRadius: 6
          }
        })]
      }, i))]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PaletteThemeRipple;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
