// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/card-flock-tumble/CardFlockTumble.tsx
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
 var FONT = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#FONT", "FONT", () => '"Avenir Next", Futura, "Helvetica Neue", sans-serif');
var WALL_UP = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#WALL_UP", "WALL_UP", () => [6, 22]);
var FLIGHT = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#FLIGHT", "FLIGHT", () => [10, 54]);
var CARD_OUT = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#CARD_OUT", "CARD_OUT", () => [62, 72]);
var RING_T0 = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#RING_T0", "RING_T0", () => 70);
var TEXT_T0 = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#TEXT_T0", "TEXT_T0", () => 84);
var ROW_GRADS = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#ROW_GRADS", "ROW_GRADS", () => [["#ffe14d", "#5ad0ff"], ["#ff5ad0", "#7d8bff"], ["#ffb84d", "#b46bff"]]);
var NeonWall = ({
  frame
}) => {
  const up = interpolate(frame, [WALL_UP[0], WALL_UP[1]], [0.12, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const out = interpolate(frame, [CARD_OUT[0], CARD_OUT[1] + 4], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const blurOut = interpolate(frame, [CARD_OUT[0], CARD_OUT[1] + 4], [0, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  if (out <= 0.01) return null;
  const drift = frame * 2;
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      overflow: "hidden",
      opacity: up * out,
      filter: `blur(${blurOut}px)`
    },
    children: [Array.from({
      length: 3
    }).map((_, row) => {
      const [cL, cR] = ROW_GRADS[row];
      return /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          top: -140 + row * 380,
          left: 0,
          whiteSpace: "nowrap",
          fontFamily: FONT,
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: 330,
          letterSpacing: 6,
          transform: `translateX(${(row % 2 === 0 ? -1 : 1) * drift - 600}px)`
        },
        children: Array.from({
          length: 4
        }).map((_2, i) => /* @__PURE__ */jsx("span", {
          style: {
            marginRight: 70,
            color: "transparent",
            WebkitTextStroke: `4px ${i % 2 === 0 ? cL : cR}`,
            filter: `drop-shadow(0 0 18px ${i % 2 === 0 ? cL : cR})`,
            opacity: 0.6
          },
          children: __scCopy("FASTER")
        }, i))
      }, row);
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.72) 85%)"
      }
    })]
  });
};
var UiCard = ({
  seed,
  title
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: 560,
    height: 400,
    background: "#fbfbfc",
    borderRadius: 14,
    padding: 0,
    boxSizing: "border-box",
    boxShadow: "0 0 60px rgba(190,140,255,0.3), 0 22px 60px rgba(0,0,0,0.55)",
    display: "flex",
    overflow: "hidden"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      width: 128,
      background: "#f3f3f6",
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 10
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 14,
          height: 14,
          borderRadius: 4,
          background: "linear-gradient(135deg,#7b68ee,#ff5ad0)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 8,
          width: 52,
          background: "#c9c9d2",
          borderRadius: 4
        }
      })]
    }), Array.from({
      length: 8
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 7,
        width: `${52 + (i * 31 + seed * 17) % 42}%`,
        background: "#d9d9df",
        borderRadius: 4
      }
    }, i))]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      flex: 1,
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 10
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 26,
        color: "#3a3a44"
      },
      children: title
    }), /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: "58%",
        background: "#ececf1",
        borderRadius: 5
      }
    }), Array.from({
      length: 6
    }).map((_, i) => /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 11,
          height: 11,
          borderRadius: "50%",
          background: ["#7b68ee", "#ff5ad0", "#5ad0ff"][(i + seed) % 3],
          opacity: 0.7
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 8,
          width: `${78 - (i * 23 + seed * 29) % 40}%`,
          background: "#e8e8ee",
          borderRadius: 4
        }
      })]
    }, i)), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 8
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 74,
          height: 22,
          background: "#7b68ee",
          opacity: 0.75,
          borderRadius: 6
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: 46,
          height: 22,
          background: "#e4e4ea",
          borderRadius: 6
        }
      })]
    })]
  })]
});
var SmokeRing = ({
  frame
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const t = frame - RING_T0;
  if (t < 0) return null;
  const grow = Easing.out(Easing.cubic)(Math.min(1, t / 52));
  const R = 46 + 330 * grow + Math.max(0, t - 52) * 1.6;
  const op = interpolate(t, [0, 5, 30, 60], [0, 1, 0.92, 0.72], {
    extrapolateRight: "clamp"
  });
  const w = R * interpolate(t, [0, 52], [0.36, 0.27], {
    extrapolateRight: "clamp"
  });
  const disp = 60 + grow * 90;
  const rot = t * 0.35;
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      justifyContent: "center",
      alignItems: "center"
    },
    children: /* @__PURE__ */jsxs("svg", {
      width: 1920,
      height: 1080,
      viewBox: "0 0 1920 1080",
      style: {
        position: "absolute",
        inset: 0,
        overflow: "visible"
      },
      children: [/* @__PURE__ */jsxs("defs", {
        children: [/* @__PURE__ */jsxs("filter", {
          id: `smokeA-${uid}`,
          x: "-60%",
          y: "-60%",
          width: "220%",
          height: "220%",
          children: [/* @__PURE__ */jsx("feTurbulence", {
            type: "fractalNoise",
            baseFrequency: "0.013 0.016",
            numOctaves: 4,
            seed: 11,
            result: "n"
          }), /* @__PURE__ */jsx("feDisplacementMap", {
            in: "SourceGraphic",
            in2: "n",
            scale: disp,
            xChannelSelector: "R",
            yChannelSelector: "G"
          })]
        }), /* @__PURE__ */jsxs("filter", {
          id: `smokeB-${uid}`,
          x: "-60%",
          y: "-60%",
          width: "220%",
          height: "220%",
          children: [/* @__PURE__ */jsx("feTurbulence", {
            type: "fractalNoise",
            baseFrequency: "0.021 0.018",
            numOctaves: 4,
            seed: 37,
            result: "n"
          }), /* @__PURE__ */jsx("feDisplacementMap", {
            in: "SourceGraphic",
            in2: "n",
            scale: disp * 0.85,
            xChannelSelector: "R",
            yChannelSelector: "G"
          })]
        }), /* @__PURE__ */jsxs("filter", {
          id: `smokeC-${uid}`,
          x: "-60%",
          y: "-60%",
          width: "220%",
          height: "220%",
          children: [/* @__PURE__ */jsx("feTurbulence", {
            type: "fractalNoise",
            baseFrequency: "0.019 0.023",
            numOctaves: 3,
            seed: 73,
            result: "n"
          }), /* @__PURE__ */jsx("feDisplacementMap", {
            in: "SourceGraphic",
            in2: "n",
            scale: disp * 1.1,
            xChannelSelector: "R",
            yChannelSelector: "G"
          })]
        }), /* @__PURE__ */jsxs("linearGradient", {
          id: `ringGrad-${uid}`,
          x1: "0",
          y1: "0",
          x2: "0",
          y2: "1",
          children: [/* @__PURE__ */jsx("stop", {
            offset: "0%",
            stopColor: "hsla(28 45% 78% / 0.85)"
          }), /* @__PURE__ */jsx("stop", {
            offset: "35%",
            stopColor: "hsla(315 45% 74% / 0.85)"
          }), /* @__PURE__ */jsx("stop", {
            offset: "100%",
            stopColor: "hsla(276 42% 66% / 0.85)"
          })]
        })]
      }), /* @__PURE__ */jsxs("g", {
        transform: `rotate(${rot} 960 540)`,
        opacity: op,
        children: [/* @__PURE__ */jsx("g", {
          style: {
            filter: `url(#smokeA-${uid})`
          },
          children: /* @__PURE__ */jsx("circle", {
            cx: 960,
            cy: 540,
            r: R,
            fill: "none",
            stroke: "hsla(295 40% 68% / 0.26)",
            strokeWidth: w * 1.9,
            style: {
              filter: "blur(22px)"
            }
          })
        }), /* @__PURE__ */jsx("g", {
          style: {
            filter: `url(#smokeA-${uid})`
          },
          children: /* @__PURE__ */jsx("circle", {
            cx: 960,
            cy: 540,
            r: R,
            fill: "none",
            stroke: `url(#ringGrad-${uid})`,
            strokeWidth: w,
            style: {
              filter: "blur(9px)"
            },
            opacity: 0.85
          })
        }), /* @__PURE__ */jsx("g", {
          style: {
            filter: `url(#smokeB-${uid})`
          },
          children: /* @__PURE__ */jsx("circle", {
            cx: 960,
            cy: 540,
            r: R * 0.99,
            fill: "none",
            stroke: "hsla(310 60% 86% / 0.6)",
            strokeWidth: w * 0.45,
            style: {
              filter: "blur(6px)"
            }
          })
        }), /* @__PURE__ */jsx("g", {
          style: {
            filter: `url(#smokeC-${uid})`
          },
          children: /* @__PURE__ */jsx("circle", {
            cx: 960,
            cy: 540,
            r: R * 1.005,
            fill: "none",
            stroke: "hsla(262 40% 10% / 0.32)",
            strokeWidth: w * 0.4,
            style: {
              filter: "blur(7px)"
            }
          })
        })]
      })]
    })
  });
};
var POSE_KEYS = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#POSE_KEYS", "POSE_KEYS", () => ["x", "y", __scCopy("rx"), __scCopy("ry"), __scCopy("rz"), "s"]);
var catmull = (p0, p1, p2, p3, t) => {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
};
var splinePose = (keys, u) => {
  const seg = u < 0.55 ? 0 : 1;
  const lt = seg === 0 ? u / 0.55 : (u - 0.55) / 0.45;
  const out = {};
  for (const k of POSE_KEYS) {
    const v0 = keys[Math.max(0, seg - 1)][k];
    const v1 = keys[seg][k];
    const v2 = keys[seg + 1][k];
    const v3 = keys[Math.min(2, seg + 2)][k];
    out[k] = catmull(v0, v1, v2, v3, lt);
  }
  return out;
};
var CARDS = __scConfig("demos/transition/card-flock-tumble/CardFlockTumble.tsx#CARDS", "CARDS", () => [{
  title: __scCopy("Inbox"),
  k: [{
    x: -8,
    y: -16,
    rx: 9,
    ry: 88,
    rz: 12,
    s: 1.05
  }, {
    x: -135,
    y: -92,
    rx: 16,
    ry: 44,
    rz: -8,
    s: 1.38
  }, {
    x: -108,
    y: -76,
    rx: 4,
    ry: 13,
    rz: -2,
    s: 1.62
  }],
  conv: {
    x: -20,
    y: -12,
    rx: 0,
    ry: 55,
    rz: 4,
    s: 0.12
  }
}, {
  title: __scCopy("List view"),
  k: [{
    x: 0,
    y: 0,
    rx: 8,
    ry: 89,
    rz: 12,
    s: 1
  }, {
    x: -16,
    y: -7,
    rx: 13,
    ry: 38,
    rz: -7,
    s: 1.42
  }, {
    x: -5,
    y: -2,
    rx: 3,
    ry: 11,
    rz: -2,
    s: 1.68
  }],
  conv: {
    x: 0,
    y: 0,
    rx: 0,
    ry: 60,
    rz: 4,
    s: 0.12
  }
}, {
  title: __scCopy("Home"),
  k: [{
    x: 8,
    y: 16,
    rx: 7,
    ry: 90,
    rz: 12,
    s: 0.95
  }, {
    x: 112,
    y: 78,
    rx: 11,
    ry: 34,
    rz: -6,
    s: 1.46
  }, {
    x: 90,
    y: 70,
    rx: 2,
    ry: 9,
    rz: -1,
    s: 1.74
  }],
  conv: {
    x: 15,
    y: 10,
    rx: 0,
    ry: 65,
    rz: 4,
    s: 0.12
  }
}]);
var lerpPose = (a, b, t) => {
  const out = {};
  for (const k of POSE_KEYS) out[k] = a[k] + (b[k] - a[k]) * t;
  return out;
};
var CardFlockTumble = () => {
  const frame = useCurrentFrame();
  const gradId = `strokeGrad-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const st = frame - TEXT_T0;
  const textScale = interpolate(st, [0, 34], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const textOpacity = interpolate(st, [0, 12, 34], [0, 0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#060509"
    },
    children: [/* @__PURE__ */jsx(NeonWall, {
      frame
    }), frame < CARD_OUT[1] + 2 && /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        justifyContent: "center",
        alignItems: "center",
        perspective: 1400
      },
      children: CARDS.map((c, i) => {
        let pose;
        let op = 1;
        const idleAt = f => {
          const t = Math.min(f, CARD_OUT[0]) - FLIGHT[1] * 0.86;
          if (t <= 0) return {
            ry: 0,
            rx: 0,
            rz: 0
          };
          const ramp = Math.min(1, t / 14) ** 2;
          return {
            ry: t * 0.34 * ramp,
            rx: t * -0.1 * ramp,
            rz: t * 0.05 * ramp
          };
        };
        const drift = idleAt(frame);
        if (frame < FLIGHT[0]) {
          pose = c.k[0];
        } else if (frame < CARD_OUT[0]) {
          const raw = Math.min(1, (frame - FLIGHT[0]) / (FLIGHT[1] - FLIGHT[0]));
          const u = Easing.out(Easing.cubic)(raw);
          pose = splinePose(c.k, u);
          pose = {
            ...pose,
            ry: pose.ry + drift.ry,
            rx: pose.rx + drift.rx,
            rz: pose.rz + drift.rz
          };
        } else {
          const r = Math.min(1, (frame - CARD_OUT[0]) / (CARD_OUT[1] - CARD_OUT[0]));
          const e = Easing.in(Easing.quad)(r);
          const from = {
            ...c.k[2],
            ry: c.k[2].ry + drift.ry,
            rx: c.k[2].rx + drift.rx,
            rz: c.k[2].rz + drift.rz
          };
          pose = lerpPose(from, c.conv, e);
          op = 1 - Easing.in(Easing.cubic)(Math.max(0, (r - 0.55) / 0.45));
        }
        return /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            transform: `translate3d(${pose.x}px, ${pose.y}px, 0) rotateX(${pose.rx}deg) rotateY(${pose.ry}deg) rotateZ(${pose.rz}deg) scale(${pose.s})`,
            opacity: op,
            zIndex: 10 + i
          },
          children: /* @__PURE__ */jsx(UiCard, {
            seed: i,
            title: c.title
          })
        }, i);
      })
    }), /* @__PURE__ */jsx(SmokeRing, {
      frame
    }), st >= 0 && /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        justifyContent: "center",
        alignItems: "center"
      },
      children: /* @__PURE__ */jsxs("svg", {
        width: 1920,
        height: 560,
        viewBox: "0 0 1920 560",
        style: {
          transform: `scale(${textScale})`,
          opacity: textOpacity,
          filter: "drop-shadow(0 0 26px rgba(190,110,255,0.55))",
          overflow: "visible"
        },
        children: [/* @__PURE__ */jsx("defs", {
          children: /* @__PURE__ */jsxs("linearGradient", {
            id: gradId,
            x1: "0",
            y1: "0",
            x2: "1",
            y2: "0",
            children: [/* @__PURE__ */jsx("stop", {
              offset: "0%",
              stopColor: "#ffe14d"
            }), /* @__PURE__ */jsx("stop", {
              offset: "30%",
              stopColor: "#ff5ad0"
            }), /* @__PURE__ */jsx("stop", {
              offset: "60%",
              stopColor: "#b46bff"
            }), /* @__PURE__ */jsx("stop", {
              offset: "100%",
              stopColor: "#5ad0ff"
            })]
          })
        }), /* @__PURE__ */jsx("text", {
          x: "960",
          y: "360",
          textAnchor: "middle",
          fontFamily: FONT,
          fontWeight: 800,
          fontStyle: "italic",
          fontSize: 352,
          letterSpacing: 2,
          fill: "none",
          stroke: `url(#${gradId})`,
          strokeWidth: 4.5,
          children: __scCopy("STRONGER")
        })]
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CardFlockTumble;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
