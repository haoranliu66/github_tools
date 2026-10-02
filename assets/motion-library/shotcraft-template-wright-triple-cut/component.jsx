// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx

var HOLD_END = __scConfig("demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx#HOLD_END", "HOLD_END", () => 25);
var C1 = __scConfig("demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx#C1", "C1", () => 25);
var C2 = __scConfig("demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx#C2", "C2", () => 35);
var C3 = __scConfig("demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx#C3", "C3", () => 45);
var WHIP = __scConfig("demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx#WHIP", "WHIP", () => 55);
var CloseupStage = ({
  children
}) => /* @__PURE__ */jsx2("div", {
  style: {
    width: 1920,
    height: 1080,
    background: G.panel,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  children: /* @__PURE__ */jsx2("div", {
    style: {
      width: 1400,
      height: 800,
      background: G.card,
      border: `4px solid ${G.border}`,
      borderRadius: 28,
      boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    children
  })
});
var RESULT = __scConfig("demos/rhythm/montage-rhythm-moves/WrightTripleCut.tsx#RESULT", "RESULT", () => ({
  left: 808,
  top: 108,
  w: 524,
  h: 454
}));
var WrightTripleCut = () => {
  const f = useCurrentFrame();
  if (f < HOLD_END) {
    return /* @__PURE__ */jsx2(FakeDashboard, {
      variant: "A"
    });
  }
  if (f < C2) {
    const t2 = f - C1;
    const p = interpolate(t2, [4, 7], [0, 1], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    const cursorScale = 1 - 0.3 * p;
    const btnBg = p < 0.5 ? G.bar : "#5c5c5a";
    const btnY = 8 * p;
    return /* @__PURE__ */jsx2(CloseupStage, {
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            width: 620,
            height: 190,
            borderRadius: 40,
            background: btnBg,
            border: `5px solid ${G.mid}`,
            boxSizing: "border-box",
            transform: `translateY(${btnY}px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              width: 260,
              height: 30,
              borderRadius: 15,
              background: p < 0.5 ? G.card : G.line
            }
          })
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 96,
            height: 96,
            marginLeft: -48,
            marginTop: -48 + btnY,
            borderRadius: 48,
            background: G.ink,
            border: "8px solid #ffffff",
            boxSizing: "border-box",
            transform: `scale(${cursorScale})`,
            boxShadow: "0 4px 14px rgba(0,0,0,0.3)"
          }
        })]
      })
    });
  }
  if (f < C3) {
    const t2 = f - C2;
    const p = interpolate(t2, [4, 7], [0, 1], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    const trackW = 560;
    const trackH = 240;
    const knob = 192;
    const pad = 24;
    const knobX = pad + p * (trackW - knob - pad * 2);
    const trackBg = p < 0.5 ? G.mid : G.ink;
    return /* @__PURE__ */jsx2(CloseupStage, {
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "relative",
          width: trackW,
          height: trackH,
          borderRadius: trackH / 2,
          background: trackBg,
          boxSizing: "border-box"
        },
        children: /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            top: pad,
            left: knobX,
            width: knob,
            height: knob,
            borderRadius: knob / 2,
            background: G.card,
            boxShadow: "0 6px 18px rgba(0,0,0,0.35)"
          }
        })
      })
    });
  }
  if (f < WHIP) {
    const t2 = f - C3;
    const p = interpolate(t2, [4, 7], [0, 1], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    const showOne = p >= 0.5;
    const angle = showOne ? (1 - p) * 2 * 90 : -p * 2 * 90;
    const digit = showOne ? "1" : "0";
    return /* @__PURE__ */jsx2(CloseupStage, {
      children: /* @__PURE__ */jsx2("div", {
        style: {
          perspective: 1200
        },
        children: /* @__PURE__ */jsx2("div", {
          style: {
            width: 440,
            height: 560,
            borderRadius: 32,
            background: G.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotateX(${angle}deg)`,
            backfaceVisibility: "hidden",
            boxShadow: "0 8px 28px rgba(0,0,0,0.25)"
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 800,
              fontSize: 420,
              color: "#ffffff",
              lineHeight: 1
            },
            children: digit
          })
        })
      })
    });
  }
  const t = f - WHIP;
  const whipX = t >= 6 ? 0 : interpolate(t, [0, 6], [900, 0], {
    easing: Easing.out(Easing.poly(5)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const speeding = t < 4;
  const glow = interpolate(f, [57, 84], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const pop = f >= 64 ? 1 : interpolate(f, [57, 60, 64], [1, 1.07, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const dash = (x, opacity, key) => /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      transform: `translateX(${x}px)`,
      opacity
    },
    children: /* @__PURE__ */jsx2(FakeDashboard, {
      variant: "A"
    })
  }, key);
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      overflow: "hidden",
      position: "relative"
    },
    children: [speeding && dash(whipX + 220, 0.18, __scCopy("echo2")), speeding && dash(whipX + 110, 0.35, __scCopy("echo1")), dash(whipX, 1, __scCopy("main")), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: RESULT.left,
        top: RESULT.top,
        width: RESULT.w,
        height: RESULT.h,
        transform: `translateX(${whipX}px) scale(${pop})`,
        borderRadius: 14,
        boxSizing: "border-box",
        background: `rgba(255,255,255,${0.72 * glow})`,
        border: `5px solid rgba(47,47,47,${glow})`,
        boxShadow: `0 0 ${70 * glow}px rgba(255,255,255,${0.95 * glow}), 0 0 ${26 * glow}px rgba(47,47,47,${0.28 * glow})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: glow
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 260,
          color: G.ink,
          lineHeight: 1
        },
        children: __scCopy("1")
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = WrightTripleCut;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
