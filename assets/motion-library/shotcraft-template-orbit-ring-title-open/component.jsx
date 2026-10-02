// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx
import { AbsoluteFill, Easing, Freeze, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
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
 var ORBIT_RING_TITLE_OPEN_DURATION = 130;
var RX = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#RX", "RX", () => 700);
var RY = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#RY", "RY", () => 375);
var CW = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#CW", "CW", () => 380);
var CH = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#CH", "CH", () => 214);
var N = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#N", "N", () => 8);
var ROT_SPEED = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#ROT_SPEED", "ROT_SPEED", () => 0.3);
var RING_IN = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#RING_IN", "RING_IN", () => 0.7);
var RING_SCALE_FROM = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#RING_SCALE_FROM", "RING_SCALE_FROM", () => 0.62);
var PLAY_START = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#PLAY_START", "PLAY_START", () => 24);
var DEPTH_SCALE = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#DEPTH_SCALE", "DEPTH_SCALE", () => 0.09);
var HEADLINE = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#HEADLINE", "HEADLINE", () => __scCopy("\u8BA9\u955C\u5934\u5361\u66FF\u4F60\u60F3\u597D\u6BCF\u4E00\u4E2A\u52A8\u6548"));
var H_SIZE = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#H_SIZE", "H_SIZE", () => 64);
var H_LEAD = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#H_LEAD", "H_LEAD", () => 0.35);
var H_DUR = 0.9;
var H_TRAVEL = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#H_TRAVEL", "H_TRAVEL", () => 0.3);
var H_STAGGER = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#H_STAGGER", "H_STAGGER", () => 0.0333);
var H_EASE = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#H_EASE", "H_EASE", () => Easing.bezier(0.22, 1, 0.36, 1));
var HL_START = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#HL_START", "HL_START", () => 8);
var MARKER_AT_F = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#MARKER_AT_F", "MARKER_AT_F", () => 40);
var MARKER_COLOR = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#MARKER_COLOR", "MARKER_COLOR", () => "#facc15");
var KICKER = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#KICKER", "KICKER", () => __scCopy("VIDEO-SHOTCRAFT"));
var KICKER_IN = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#KICKER_IN", "KICKER_IN", () => [1, 1.5]);
var EXIT_AT = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#EXIT_AT", "EXIT_AT", () => 3.6);
var EXIT_DUR = 0.34;
var EXIT_BLUR = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#EXIT_BLUR", "EXIT_BLUR", () => 6.5);
var INK = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#INK", "INK", () => "#1d1d1f");
var INK_DIM = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#INK_DIM", "INK_DIM", () => "#7a7a7a");
var SANS = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#SANS", "SANS", () => '-apple-system, "PingFang SC", BlinkMacSystemFont, sans-serif');
var MONO = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#MONO", "MONO", () => 'Menlo, "SF Mono", monospace');
var MESH_BG = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#MESH_BG", "MESH_BG", () => "radial-gradient(52% 44% at 18% 22%, rgba(122,90,248,0.20) 0%, rgba(122,90,248,0) 70%),radial-gradient(46% 42% at 84% 18%, rgba(255,138,178,0.20) 0%, rgba(255,138,178,0) 70%),radial-gradient(58% 50% at 78% 84%, rgba(96,190,255,0.20) 0%, rgba(96,190,255,0) 70%),radial-gradient(50% 46% at 24% 88%, rgba(255,196,112,0.20) 0%, rgba(255,196,112,0) 70%),linear-gradient(180deg, #f7f6f9 0%, #f2f1f5 100%)");
var F = (frame, a, b, ease = Easing.out(Easing.cubic)) => interpolate(frame, [a, b], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: ease
});
var Pad = ({
  children,
  bg = "#ffffff"
}) => /* @__PURE__ */jsx("div", {
  style: {
    position: "absolute",
    inset: 0,
    background: bg,
    padding: 56,
    fontFamily: SANS
  },
  children
});
var Bar = ({
  w,
  h = 16,
  color = "#e3e3e8",
  radius = 8
}) => /* @__PURE__ */jsx("div", {
  style: {
    width: w,
    height: h,
    borderRadius: radius,
    background: color
  }
});
var TileSweep = () => {
  const f = useCurrentFrame();
  const s = F(f, 14, 34);
  return /* @__PURE__ */jsx(Pad, {
    children: /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 26
      },
      children: [/* @__PURE__ */jsx(Bar, {
        w: 300,
        h: 14
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "relative",
          width: 640,
          height: 40
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: -8,
            top: 2,
            width: 636 * s,
            height: 36,
            background: MARKER_COLOR,
            borderRadius: 6
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center"
          },
          children: /* @__PURE__ */jsx(Bar, {
            w: 620,
            h: 22,
            color: "#2a2a30",
            radius: 4
          })
        })]
      }), /* @__PURE__ */jsx(Bar, {
        w: 480,
        h: 14
      })]
    })
  });
};
var SPARK = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#SPARK", "SPARK", () => __scCopy("M8 118 L118 92 L228 104 L338 56 L448 68 L558 20 L632 34"));
var TileMetric = () => {
  const f = useCurrentFrame();
  const draw = F(f, 10, 46);
  const val = 128 + Math.round(F(f, 8, 40, Easing.out(Easing.quad)) * 84);
  return /* @__PURE__ */jsxs(Pad, {
    children: [/* @__PURE__ */jsx("div", {
      style: {
        fontSize: 30,
        color: INK_DIM,
        letterSpacing: __scCopy("0.06em")
      },
      children: __scCopy("SESSIONS")
    }), /* @__PURE__ */jsx("div", {
      style: {
        fontSize: 132,
        fontWeight: 700,
        color: INK,
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1.1
      },
      children: val
    }), /* @__PURE__ */jsxs("svg", {
      width: 640,
      height: 140,
      viewBox: "0 0 640 140",
      style: {
        marginTop: 12
      },
      children: [/* @__PURE__ */jsx("path", {
        d: SPARK,
        fill: "none",
        stroke: "#e3e3e8",
        strokeWidth: 8,
        strokeLinecap: "round"
      }), /* @__PURE__ */jsx("path", {
        d: SPARK,
        fill: "none",
        stroke: "#7A5AF8",
        strokeWidth: 8,
        strokeLinecap: "round",
        strokeDasharray: 900,
        strokeDashoffset: 900 * (1 - draw)
      })]
    })]
  });
};
var TileSteps = () => {
  const f = useCurrentFrame();
  return /* @__PURE__ */jsx(Pad, {
    children: /* @__PURE__ */jsx("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 34
      },
      children: [0, 1, 2, 3].map(i => {
        const on = F(f, 8 + i * 9, 22 + i * 9);
        return /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 26,
            opacity: 0.35 + on * 0.65
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 44,
              height: 44,
              borderRadius: 22,
              background: on > 0.6 ? "#7A5AF8" : "#e3e3e8"
            }
          }), /* @__PURE__ */jsx(Bar, {
            w: 200 + i * 110,
            h: 22,
            color: "#2a2a30",
            radius: 6
          })]
        }, i);
      })
    })
  });
};
var TileRoute = () => {
  const f = useCurrentFrame();
  const draw = F(f, 6, 42);
  const pin = spring({
    frame: f - 36,
    fps: 30,
    config: {
      damping: 12
    }
  });
  return /* @__PURE__ */jsx(Pad, {
    bg: "#f4f4f7",
    children: /* @__PURE__ */jsxs("svg", {
      width: 848,
      height: 428,
      viewBox: "0 0 848 428",
      children: [/* @__PURE__ */jsx("path", {
        d: __scCopy("M40 380 C 200 380 190 210 340 200 C 500 190 500 90 700 70"),
        fill: "none",
        stroke: "#c9c9d2",
        strokeWidth: 10,
        strokeLinecap: "round"
      }), /* @__PURE__ */jsx("path", {
        d: __scCopy("M40 380 C 200 380 190 210 340 200 C 500 190 500 90 700 70"),
        fill: "none",
        stroke: "#7A5AF8",
        strokeWidth: 10,
        strokeLinecap: "round",
        strokeDasharray: 1100,
        strokeDashoffset: 1100 * (1 - draw)
      }), /* @__PURE__ */jsxs("g", {
        transform: `translate(700 70) scale(${pin})`,
        children: [/* @__PURE__ */jsx("circle", {
          r: 26,
          fill: "#7A5AF8"
        }), /* @__PURE__ */jsx("circle", {
          r: 10,
          fill: "#ffffff"
        })]
      })]
    })
  });
};
var TileTerminal = () => {
  const f = useCurrentFrame();
  const rows = [520, 400, 610, 300];
  return /* @__PURE__ */jsxs(Pad, {
    bg: "#1d1d1f",
    children: [/* @__PURE__ */jsx("div", {
      style: {
        display: "flex",
        gap: 14,
        marginBottom: 34
      },
      children: ["#ff5f57", "#febc2e", "#28c840"].map(c => /* @__PURE__ */jsx("div", {
        style: {
          width: 20,
          height: 20,
          borderRadius: 10,
          background: c
        }
      }, c))
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 24
      },
      children: [/* @__PURE__ */jsx(Bar, {
        w: 120,
        h: 18,
        color: "#7A5AF8",
        radius: 4
      }), rows.map((w, i) => {
        const p = F(f, 8 + i * 11, 20 + i * 11, Easing.linear);
        return /* @__PURE__ */jsx(Bar, {
          w: w * p,
          h: 18,
          color: "#4a4a52",
          radius: 4
        }, i);
      })]
    })]
  });
};
var TileSketch = () => {
  const f = useCurrentFrame();
  const strokes = [__scCopy("M80 380 L768 380"), __scCopy("M140 380 L200 90 L648 90 L708 380"), __scCopy("M280 90 L280 380"), __scCopy("M500 90 L500 380")];
  return /* @__PURE__ */jsx(Pad, {
    children: /* @__PURE__ */jsxs("svg", {
      width: 848,
      height: 428,
      viewBox: "0 0 848 428",
      children: [strokes.map((d, i) => /* @__PURE__ */jsx("path", {
        d,
        fill: "none",
        stroke: "#e7e7ec",
        strokeWidth: 7,
        strokeLinecap: "round"
      }, `g${i}`)), strokes.map((d, i) => {
        const p = F(f, 6 + i * 10, 24 + i * 10);
        return /* @__PURE__ */jsx("path", {
          d,
          fill: "none",
          stroke: INK,
          strokeWidth: 7,
          strokeLinecap: "round",
          strokeDasharray: 900,
          strokeDashoffset: 900 * (1 - p)
        }, i);
      })]
    })
  });
};
var TileShrink = () => {
  const f = useCurrentFrame();
  const p = F(f, 16, 44);
  return /* @__PURE__ */jsxs(Pad, {
    bg: "#f4f4f7",
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 56,
        top: 56,
        width: 848 - 700 * p,
        height: 428 - 350 * p,
        borderRadius: 16 + 30 * p,
        background: "#ffffff",
        boxShadow: "0 0 0 1px rgba(29,29,31,0.08)"
      }
    }), /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: 220,
        top: 130,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        opacity: p
      },
      children: [/* @__PURE__ */jsx(Bar, {
        w: 420,
        h: 20,
        color: "#2a2a30",
        radius: 6
      }), /* @__PURE__ */jsx(Bar, {
        w: 330,
        h: 20
      }), /* @__PURE__ */jsx(Bar, {
        w: 380,
        h: 20
      })]
    })]
  });
};
var TileImpact = () => {
  const f = useCurrentFrame();
  const p = spring({
    frame: f - 8,
    fps: 30,
    config: {
      damping: 13,
      mass: 0.7
    }
  });
  return /* @__PURE__ */jsx(Pad, {
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 26
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          fontSize: 30,
          color: INK_DIM,
          letterSpacing: __scCopy("0.4em")
        },
        children: __scCopy("2026 \xB7 Q3")
      }), /* @__PURE__ */jsx("div", {
        style: {
          fontSize: 128,
          fontWeight: 800,
          letterSpacing: __scCopy("-0.04em"),
          color: INK,
          transform: `scale(${0.72 + p * 0.28})`,
          opacity: p
        },
        children: __scCopy("GO LIVE")
      })]
    })
  });
};
var TILES = __scConfig("demos/opening/orbit-ring-title-open/OrbitRingTitleOpen.tsx#TILES", "TILES", () => [{
  Comp: TileSweep,
  bg: "#ffffff"
}, {
  Comp: TileShrink,
  bg: "#f4f4f7"
}, {
  Comp: TileMetric,
  bg: "#ffffff"
}, {
  Comp: TileRoute,
  bg: "#f4f4f7"
}, {
  Comp: TileSteps,
  bg: "#ffffff"
}, {
  Comp: TileTerminal,
  bg: "#1d1d1f"
}, {
  Comp: TileSketch,
  bg: "#ffffff"
}, {
  Comp: TileImpact,
  bg: "#ffffff"
}]);
var OrbitRingTitleOpen = () => {
  const frame = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  const t = frame / fps;
  const ringIn = interpolate(t, [0, RING_IN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const ringScale = RING_SCALE_FROM + (1 - RING_SCALE_FROM) * ringIn;
  const rot = t * ROT_SPEED;
  const markerScale = spring({
    frame: frame - MARKER_AT_F,
    fps,
    config: {
      damping: 14
    }
  });
  const kickerIn = interpolate(t, KICKER_IN, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const exitQ = interpolate(t, [EXIT_AT, EXIT_AT + EXIT_DUR], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const chars = Array.from(HEADLINE);
  const charStyle = i => {
    const at = H_LEAD + i * H_STAGGER;
    const pMain = interpolate(t, [at, at + H_DUR], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: H_EASE
    });
    const pTravel = interpolate(t, [at, at + H_TRAVEL], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: H_EASE
    });
    return {
      display: "inline-block",
      whiteSpace: "pre",
      position: "relative",
      zIndex: 1,
      transformOrigin: "50% 55%",
      opacity: pMain,
      filter: `blur(${(1 - pMain) * (H_SIZE / 6)}px)`,
      transform: `translateY(${(1 - pTravel) * H_SIZE * 0.22}px)`
    };
  };
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: MESH_BG,
      fontFamily: SANS
    },
    children: [TILES.map((tile, i) => {
      const theta = -Math.PI / 2 + i * Math.PI * 2 / N + rot;
      const x = 960 + Math.cos(theta) * RX * ringScale;
      const y = 540 + Math.sin(theta) * RY * ringScale;
      const depth = Math.sin(theta);
      const s = 1 + DEPTH_SCALE * depth;
      const op = interpolate(t, [0.06 + i * 0.05, 0.42 + i * 0.05], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      return /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: x - CW * s / 2,
          top: y - CH * s / 2,
          width: CW * s,
          height: CH * s,
          borderRadius: 10,
          overflow: "hidden",
          background: tile.bg,
          opacity: op,
          zIndex: 10 + Math.round(depth * 5),
          boxShadow: "0 0 0 1px rgba(29,29,31,0.08), 0 14px 34px rgba(16,24,40,0.12)"
        },
        children: /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            width: 960,
            height: 540,
            transform: `scale(${CW * s / 960})`,
            transformOrigin: __scCopy("top left")
          },
          children: /* @__PURE__ */jsx(Freeze, {
            frame: Math.max(0, frame - PLAY_START),
            children: /* @__PURE__ */jsx(tile.Comp, {})
          })
        })
      }, i);
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        alignItems: "center",
        justifyContent: "center",
        zIndex: 30
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          fontSize: H_SIZE,
          fontWeight: 600,
          letterSpacing: __scCopy("-0.05em"),
          color: INK,
          whiteSpace: "nowrap",
          opacity: 1 - exitQ,
          filter: exitQ > 0.01 ? `blur(${exitQ * EXIT_BLUR}px)` : void 0
        },
        children: [chars.slice(0, HL_START).map((ch, i) => /* @__PURE__ */jsx("span", {
          style: charStyle(i),
          children: ch
        }, i)), /* @__PURE__ */jsxs("span", {
          style: {
            position: "relative",
            display: "inline-block"
          },
          children: [/* @__PURE__ */jsx("span", {
            "aria-hidden": true,
            style: {
              position: "absolute",
              inset: __scCopy("0.06em -0.08em"),
              background: MARKER_COLOR,
              transformOrigin: __scCopy("left center"),
              transform: `scaleX(${markerScale})`,
              borderRadius: 6,
              zIndex: 0
            }
          }), chars.slice(HL_START).map((ch, j) => /* @__PURE__ */jsx("span", {
            style: charStyle(HL_START + j),
            children: ch
          }, j))]
        })]
      })
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        top: "50%",
        marginTop: 88,
        textAlign: "center",
        fontFamily: MONO,
        fontSize: 28,
        fontWeight: 600,
        letterSpacing: __scCopy("0.35em"),
        color: INK_DIM,
        opacity: kickerIn * (1 - exitQ),
        filter: exitQ > 0.01 ? `blur(${exitQ * EXIT_BLUR}px)` : void 0,
        zIndex: 30
      },
      children: KICKER
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = OrbitRingTitleOpen;
 return {component:template_entry_default,duration:ORBIT_RING_TITLE_OPEN_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
