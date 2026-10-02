// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/circle-match-iris/CircleMatchIris.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/circle-match-iris/CircleMatchIris.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/circle-match-iris/CircleMatchIris.tsx

var CX = __scConfig("demos/transition/circle-match-iris/CircleMatchIris.tsx#CX", "CX", () => 308);
var CY = __scConfig("demos/transition/circle-match-iris/CircleMatchIris.tsx#CY", "CY", () => 384.8);
var CircleMatchIris = () => {
  const f = useCurrentFrame();
  const pulseT = Math.min(f, 30) / 30;
  const scale = f < 30 ? 1 + 0.45 * Math.abs(Math.sin(pulseT * Math.PI * 2)) : 1;
  const waves = [0, 14].map(start => {
    const p = interpolate(f, [start, start + 16], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    return {
      r: 22 + p * 40,
      o: f < start + 16 ? 0.85 * (1 - p) : 0
    };
  });
  const irisR = interpolate(f, [30, 75], [22, 2100], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const ringR = interpolate(f, [30, 70], [22, 170], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const ringW = interpolate(f, [30, 70], [12, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const sweep = interpolate(f, [45, 100], [0, 0.78], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const circ = 2 * Math.PI * ringR;
  const num = Math.round(sweep * 100);
  const numOpacity = interpolate(f, [68, 88], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const furnitureOpacity = interpolate(f, [60, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      position: "relative",
      overflow: "hidden",
      background: G.bg
    },
    children: [/* @__PURE__ */jsx2(FakeDashboard, {
      variant: "B"
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: CX - 23,
        top: CY - 23,
        width: 46,
        height: 46,
        background: G.card
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: CX - 22,
        top: CY - 22,
        width: 44,
        height: 44,
        borderRadius: 22,
        background: G.mid,
        border: `3px solid ${G.ink}`,
        boxSizing: "border-box",
        transform: `scale(${scale})`
      }
    }), /* @__PURE__ */jsx2("svg", {
      width: 1920,
      height: 1080,
      style: {
        position: "absolute",
        left: 0,
        top: 0
      },
      children: waves.map((w, i) => /* @__PURE__ */jsx2("circle", {
        cx: CX,
        cy: CY,
        r: w.r,
        fill: "none",
        stroke: G.ink,
        strokeWidth: 4,
        opacity: w.o
      }, i))
    }), f >= 30 && /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: 1080,
        background: G.ink,
        clipPath: `circle(${irisR}px at ${CX}px ${CY}px)`
      },
      children: [/* @__PURE__ */jsxs2("svg", {
        width: 1920,
        height: 1080,
        style: {
          position: "absolute",
          left: 0,
          top: 0
        },
        children: [/* @__PURE__ */jsx2("circle", {
          cx: CX,
          cy: CY,
          r: ringR,
          fill: "none",
          stroke: "#5a5a58",
          strokeWidth: ringW
        }), /* @__PURE__ */jsx2("circle", {
          cx: CX,
          cy: CY,
          r: ringR,
          fill: "none",
          stroke: "#ececea",
          strokeWidth: ringW,
          strokeLinecap: "round",
          strokeDasharray: `${sweep * circ} ${circ}`,
          transform: `rotate(-90 ${CX} ${CY})`
        })]
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: CX - 150,
          top: CY - 80,
          width: 300,
          height: 160,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: numOpacity
        },
        children: [/* @__PURE__ */jsxs2("div", {
          style: {
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 96,
            color: "#f2f2f0",
            letterSpacing: -2
          },
          children: [num, __scCopy("%")]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            marginTop: 6,
            height: 12,
            width: 130,
            background: "#6a6a68",
            borderRadius: 6
          }
        })]
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: 680,
          top: 260,
          opacity: furnitureOpacity,
          display: "flex",
          flexDirection: "column",
          gap: 30
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            height: 34,
            width: 520,
            background: "#c2c2c0",
            borderRadius: 10
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 16,
            width: 780,
            background: "#5a5a58",
            borderRadius: 8
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 16,
            width: 640,
            background: "#5a5a58",
            borderRadius: 8
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 16,
            width: 700,
            background: "#5a5a58",
            borderRadius: 8
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            display: "flex",
            gap: 28,
            marginTop: 24
          },
          children: [0, 1, 2].map(i => /* @__PURE__ */jsxs2("div", {
            style: {
              width: 240,
              height: 150,
              background: "#454543",
              border: "2px solid #5a5a58",
              borderRadius: 14,
              padding: 20,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 12
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                height: 12,
                width: `${55 + i * 12}%`,
                background: "#8f8f8d",
                borderRadius: 6
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                height: 30,
                width: "45%",
                background: "#c2c2c0",
                borderRadius: 8,
                marginTop: "auto"
              }
            })]
          }, i))
        })]
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CircleMatchIris;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
