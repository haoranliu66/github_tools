// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/neon-frame-forerun/NeonFrameForerun.tsx
import { useId } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { jsx, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var easeFall = Easing.bezier(0.5, 0.05, 0.6, 1);
var FloatWrap = ({
  h,
  children
}) => /* @__PURE__ */jsxs("div", {
  style: {
    position: "relative"
  },
  children: [h > 1 && /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      inset: 0,
      transform: `translate(${h * 0.26}px, ${h * 0.48}px) scale(${1 + h * 12e-4})`,
      filter: `blur(${2.5 + h * 0.09}px) brightness(0.32) saturate(0.4)`,
      opacity: Math.min(0.4, 0.16 + h * 5e-3),
      pointerEvents: "none"
    },
    children
  }), /* @__PURE__ */jsx("div", {
    style: {
      transform: `translate(${-h * 0.36}px, ${-h * 0.82}px)`
    },
    children
  })]
});
var liftOf = (t, land, H) => {
  const FALL = 0.3;
  const p = Math.min(1, Math.max(0, (t - (land - FALL)) / FALL));
  return (1 - easeFall(p)) * H;
};
var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var ink = "#3c3c3a";
var mid = "#9a9a98";
var line = "#e3e3e1";
var PW = __scConfig("demos/ui-entrance/neon-frame-forerun/NeonFrameForerun.tsx#PW", "PW", () => 1330);
var PH = __scConfig("demos/ui-entrance/neon-frame-forerun/NeonFrameForerun.tsx#PH", "PH", () => 900);
var PL = __scConfig("demos/ui-entrance/neon-frame-forerun/NeonFrameForerun.tsx#PL", "PL", () => 1e3);
var FRAME_D = __scConfig("demos/ui-entrance/neon-frame-forerun/NeonFrameForerun.tsx#FRAME_D", "FRAME_D", () => `M 0 ${PH / 2} L 0 0 L ${PW} 0 L ${PW} ${PH} L 0 ${PH} Z`);
var Chip = ({
  w
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: w,
    height: 74,
    background: "#fdfdfc",
    border: `2px solid ${line}`,
    borderRadius: 10,
    padding: __scCopy("12px 14px"),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 9
  },
  children: [/* @__PURE__ */jsx("div", {
    style: {
      height: 11,
      width: "70%",
      background: "#b5b5b3",
      borderRadius: 5
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 9,
      width: "48%",
      background: line,
      borderRadius: 5
    }
  })]
});
var GrayHome = ({
  t = 1
}) => {
  const L = (land, H = 72) => liftOf(t, land, H * 1.7);
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: PW,
      height: PH,
      background: "#f5f5f4",
      borderRadius: 6,
      display: "flex",
      overflow: "hidden",
      boxSizing: "border-box"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        width: 290,
        borderRight: `2px solid ${line}`,
        padding: __scCopy("26px 24px"),
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx(FloatWrap, {
        h: L(0.24, 84),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 28
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 28,
              height: 28,
              borderRadius: 8,
              background: ink
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              height: 15,
              width: 88,
              background: ink,
              borderRadius: 7
            }
          })]
        })
      }), [76, 56, 96, 110, 66, 60].map((w, i) => /* @__PURE__ */jsx(FloatWrap, {
        h: L(0.3 + i * 0.045, 66),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 11,
            height: 34
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 17,
              height: 17,
              borderRadius: 5,
              background: mid
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              height: 10,
              width: w,
              background: "#c7c7c5",
              borderRadius: 5
            }
          })]
        })
      }, i)), /* @__PURE__ */jsx(FloatWrap, {
        h: L(0.56, 62),
        children: /* @__PURE__ */jsx("div", {
          style: {
            height: 11,
            width: 70,
            background: "#b0b0ae",
            borderRadius: 5,
            margin: __scCopy("24px 0 12px")
          }
        })
      }), [104, 126, 96, 118, 88].map((w, i) => /* @__PURE__ */jsx(FloatWrap, {
        h: L(0.62 + i * 0.05, 66),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 11,
            height: 32
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 16,
              height: 16,
              borderRadius: 4,
              background: "#b8b8b6"
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              height: 10,
              width: w,
              background: "#cfcfcd",
              borderRadius: 5
            }
          })]
        })
      }, i))]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        flex: 1,
        padding: __scCopy("30px 40px"),
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx(FloatWrap, {
        h: L(0.26, 90),
        children: /* @__PURE__ */jsx("div", {
          style: {
            height: 24,
            width: 130,
            background: "#565654",
            borderRadius: 10,
            marginBottom: 22
          }
        })
      }), /* @__PURE__ */jsx(FloatWrap, {
        h: L(0.34, 80),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            height: 46,
            border: `2px solid ${line}`,
            borderRadius: 12,
            marginBottom: 26,
            display: "flex",
            alignItems: "center",
            padding: __scCopy("0 16px"),
            background: "#f5f5f4"
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 17,
              height: 17,
              borderRadius: 9,
              border: `2px solid ${mid}`
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              height: 10,
              width: 250,
              background: line,
              borderRadius: 5,
              marginLeft: 12
            }
          })]
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 30
        },
        children: [0, 1, 2, 3, 4, 5, 6].map(i => /* @__PURE__ */jsx(FloatWrap, {
          h: L(0.42 + i * 0.04, 76),
          children: /* @__PURE__ */jsx(Chip, {
            w: 222
          })
        }, i))
      }), /* @__PURE__ */jsx(FloatWrap, {
        h: L(0.72, 60),
        children: /* @__PURE__ */jsx("div", {
          style: {
            display: "flex",
            gap: 18,
            marginBottom: 18
          },
          children: [54, 84, 50, 82].map((w, i) => /* @__PURE__ */jsx("div", {
            style: {
              height: 11,
              width: w,
              background: i === 0 ? "#8a8a88" : line,
              borderRadius: 5
            }
          }, i))
        })
      }), [0, 1, 2, 3].map(i => /* @__PURE__ */jsx(FloatWrap, {
        h: L(0.78 + i * 0.055, 64),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 14,
            height: 46,
            borderBottom: `2px solid ${line}`
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 13,
              height: 13,
              borderRadius: 7,
              background: "#c26a6a"
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              height: 11,
              width: 160 + i * 37 % 70,
              background: "#b6b6b4",
              borderRadius: 5
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              marginLeft: "auto",
              display: "flex",
              gap: 7
            },
            children: [0, 1, 2].map(k => /* @__PURE__ */jsx("div", {
              style: {
                width: 20,
                height: 20,
                borderRadius: 10,
                background: "#d2d2d0"
              }
            }, k))
          })]
        })
      }, i))]
    })]
  });
};
var rng = mulberry32(20260718);
var HUES = __scConfig("demos/ui-entrance/neon-frame-forerun/NeonFrameForerun.tsx#HUES", "HUES", () => ["#b06af0", "#e879c9", "#f0a35c", "#6a7df0", "#e0679a", "#8a5cf0", "#c06af0"]);
var BG_FRAMES = __scConfig("demos/ui-entrance/neon-frame-forerun/NeonFrameForerun.tsx#BG_FRAMES", "BG_FRAMES", () => Array.from({
  length: 18
}).map(() => ({
  x: rng() * 2e3 - 120,
  y: rng() * 1100 - 60,
  w: 160 + rng() * 480,
  h: 70 + rng() * 220,
  hue: HUES[Math.floor(rng() * HUES.length)],
  phase: rng() * 90,
  period: 55 + rng() * 70,
  skew: -14 + rng() * 10
})));
var NeonFrameForerun = () => {
  const frame = useCurrentFrame();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const trace = interpolate(frame, [2, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0.1, 0.3, 1)
  });
  const lit = interpolate(frame, [24, 46, 78], [0, 0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.35, 0, 0.3, 1)
  });
  const frameLine = interpolate(frame, [50, 90], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rimGlow = interpolate(frame, [28, 60, 108, 132], [0.9, 1, 0.75, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const bgLit = interpolate(frame, [8, 44, 96, 128], [0.15, 1, 0.85, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const settle = interpolate(frame, [0, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const rotY = -26 + 15 * settle;
  const rotX = 7 - 3 * settle;
  const rotZ = -9 + 4.5 * settle;
  const scale = 0.94 + 0.1 * settle;
  const headP = trace * (PL / 2);
  const drop = interpolate(frame, [34, 98], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#060509",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsxs("svg", {
      width: 1920,
      height: 1080,
      style: {
        position: "absolute"
      },
      children: [/* @__PURE__ */jsx("defs", {
        children: /* @__PURE__ */jsx("filter", {
          id: `bgblur-${uid}`,
          x: "-60%",
          y: "-60%",
          width: "220%",
          height: "220%",
          children: /* @__PURE__ */jsx("feGaussianBlur", {
            stdDeviation: 7
          })
        })
      }), BG_FRAMES.map((b, i) => {
        const breath = 0.5 + 0.5 * Math.sin((frame + b.phase) / b.period * Math.PI * 2);
        const op = bgLit * (0.18 + 0.4 * breath);
        return /* @__PURE__ */jsxs("g", {
          transform: `translate(${b.x} ${b.y}) skewY(${b.skew * 0.4}) skewX(${b.skew})`,
          children: [/* @__PURE__ */jsx("rect", {
            width: b.w,
            height: b.h,
            rx: 4,
            fill: "none",
            stroke: b.hue,
            strokeWidth: 7,
            filter: `url(#bgblur-${uid})`,
            opacity: op * 0.8
          }), /* @__PURE__ */jsx("rect", {
            width: b.w,
            height: b.h,
            rx: 4,
            fill: "none",
            stroke: b.hue,
            strokeWidth: 2,
            opacity: op
          })]
        }, i);
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        inset: 0,
        perspective: 1600,
        perspectiveOrigin: "42% 40%"
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: (1920 - PW) / 2,
          top: (1080 - PH) / 2 - 10,
          transform: `scale(${scale}) rotateY(${rotY}deg) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`,
          transformStyle: "preserve-3d"
        },
        children: [/* @__PURE__ */jsxs("div", {
          style: {
            opacity: trace > 0.55 ? 1 : 0,
            filter: `brightness(${Math.max(0.05, lit)})`
          },
          children: [/* @__PURE__ */jsx(GrayHome, {
            t: drop
          }), /* @__PURE__ */jsx("div", {
            style: {
              position: "absolute",
              inset: 0,
              borderRadius: 6,
              background: "linear-gradient(150deg, rgba(30,20,60,0.5), rgba(0,0,0,0.78))",
              opacity: 1 - lit
            }
          })]
        }), /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: -10,
            top: -10,
            width: PW + 20,
            height: PH + 20,
            borderRadius: 12,
            opacity: rimGlow * Math.min(1, trace * 1.6),
            boxShadow: "-18px -8px 42px 6px rgba(185,95,240,0.42), 22px 24px 56px 12px rgba(240,150,90,0.30), 0 14px 80px 22px rgba(200,100,220,0.20)"
          }
        }), /* @__PURE__ */jsxs("svg", {
          width: PW + 80,
          height: PH + 80,
          viewBox: `-40 -40 ${PW + 80} ${PH + 80}`,
          style: {
            position: "absolute",
            left: -40,
            top: -40
          },
          children: [/* @__PURE__ */jsxs("defs", {
            children: [/* @__PURE__ */jsxs("linearGradient", {
              id: `mainfg-${uid}`,
              gradientUnits: "userSpaceOnUse",
              x1: 0,
              y1: 0,
              x2: PW,
              y2: PH,
              children: [/* @__PURE__ */jsx("stop", {
                offset: "0%",
                stopColor: "#c07af5"
              }), /* @__PURE__ */jsx("stop", {
                offset: "38%",
                stopColor: "#e58bd8"
              }), /* @__PURE__ */jsx("stop", {
                offset: "72%",
                stopColor: "#f0b06a"
              }), /* @__PURE__ */jsx("stop", {
                offset: "100%",
                stopColor: "#e8925c"
              })]
            }), /* @__PURE__ */jsx("filter", {
              id: `fblur-${uid}`,
              x: "-40%",
              y: "-40%",
              width: "180%",
              height: "180%",
              children: /* @__PURE__ */jsx("feGaussianBlur", {
                stdDeviation: 10
              })
            }), /* @__PURE__ */jsx("filter", {
              id: `fblur2-${uid}`,
              x: "-40%",
              y: "-40%",
              width: "180%",
              height: "180%",
              children: /* @__PURE__ */jsx("feGaussianBlur", {
                stdDeviation: 3
              })
            })]
          }), [1, -1].map(dir => /* @__PURE__ */jsxs("g", {
            children: [/* @__PURE__ */jsx("path", {
              d: FRAME_D,
              pathLength: PL,
              fill: "none",
              stroke: `url(#mainfg-${uid})`,
              strokeWidth: 14,
              strokeLinecap: "butt",
              filter: `url(#fblur-${uid})`,
              strokeDasharray: `${headP} ${PL}`,
              strokeDashoffset: dir === 1 ? 0 : -(PL - headP),
              opacity: 0.6 * rimGlow
            }), /* @__PURE__ */jsx("path", {
              d: FRAME_D,
              pathLength: PL,
              fill: "none",
              stroke: `url(#mainfg-${uid})`,
              strokeWidth: 3.5,
              strokeLinecap: "butt",
              strokeDasharray: `${headP} ${PL}`,
              strokeDashoffset: dir === 1 ? 0 : -(PL - headP),
              opacity: 0.95 * Math.max(frameLine, 0.25)
            }), trace < 1 && /* @__PURE__ */jsx("path", {
              d: FRAME_D,
              pathLength: PL,
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: 6,
              strokeLinecap: "round",
              filter: `url(#fblur2-${uid})`,
              strokeDasharray: `8 ${PL}`,
              strokeDashoffset: dir === 1 ? -Math.max(0, headP - 8) : -(PL - headP),
              opacity: 0.95
            })]
          }, dir))]
        })]
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = NeonFrameForerun;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
