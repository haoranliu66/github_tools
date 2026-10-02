// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/integration-hub-map/IntegrationHubMap.tsx
import { useId } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var rand = mulberry32(20260718);
var NOISE = __scConfig("demos/ui-entrance/integration-hub-map/IntegrationHubMap.tsx#NOISE", "NOISE", () => Array.from({
  length: 200
}, () => rand()));
var FONT = __scConfig("demos/ui-entrance/integration-hub-map/IntegrationHubMap.tsx#FONT", "FONT", () => '"Avenir Next", "Helvetica Neue", Helvetica, sans-serif');
var LIST = __scConfig("demos/ui-entrance/integration-hub-map/IntegrationHubMap.tsx#LIST", "LIST", () => [{
  icon: "#4a9fd8",
  title: __scCopy("Q3 Enterprise Deal"),
  sub: __scCopy("Revenue \xB7 Pipeline \xB7 Q3 Quota")
}, {
  icon: "#4a9fd8",
  title: __scCopy("Major Enterprise Account - UK"),
  sub: __scCopy("Revenue \xB7 MQL \xB7 International")
}, {
  icon: "#34a853",
  title: __scCopy("Enterprise Pitch Deck"),
  sub: __scCopy("Open in GDrive")
}, {
  icon: "#a259ff",
  title: __scCopy("MQL Lead Form Design"),
  sub: __scCopy("Figma File \xB7 Last Edited")
}, {
  icon: "#f2c744",
  title: __scCopy("Enterprise Sales"),
  sub: __scCopy("ClickUp Space")
}, {
  icon: "#9a9a98",
  title: __scCopy("Enterprise Closed Archive"),
  sub: __scCopy("Archived \xB7 In Enterprise Sales")
}, {
  icon: "#c8c8c6",
  title: __scCopy("Open Enterprise Lead - Follow up"),
  sub: __scCopy("In Progress \xB7 In Enterprise Sales \xB7 Yesterday")
}]);
var HubPanel = ({
  glow
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: 820,
    height: 520,
    background: "#fbfbfa",
    borderRadius: 14,
    padding: __scCopy("26px 30px"),
    boxSizing: "border-box",
    fontFamily: FONT,
    boxShadow: `0 0 ${40 + glow * 110}px rgba(255,255,255,${0.3 + glow * 0.55}), 0 0 ${130 + glow * 140}px rgba(215,150,255,${0.22 + glow * 0.35})`,
    display: "flex",
    gap: 26,
    overflow: "hidden"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      flex: 2
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        fontSize: 27,
        fontWeight: 600,
        color: "#2f2f38"
      },
      children: __scCopy("Enterprise MQLs")
    }), /* @__PURE__ */jsx("div", {
      style: {
        display: "flex",
        gap: 16,
        marginTop: 12
      },
      children: [__scCopy("All"), __scCopy("Tasks"), __scCopy("Docs"), __scCopy("Whiteboards"), __scCopy("Dashboards"), __scCopy("Files"), __scCopy("Chat"), __scCopy("People")].map((t, i) => /* @__PURE__ */jsx("div", {
        style: {
          fontSize: 12,
          color: i === 0 ? "#5b55c8" : "#98989f",
          fontWeight: i === 0 ? 700 : 400
        },
        children: t
      }, t))
    }), /* @__PURE__ */jsx("div", {
      style: {
        fontSize: 12,
        color: "#8b8b92",
        marginTop: 14
      },
      children: __scCopy("Recent")
    }), LIST.map((it, i) => /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: 11,
        alignItems: "center",
        marginTop: 13.5
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 22,
          height: 22,
          borderRadius: 6,
          background: it.icon,
          opacity: 0.85
        }
      }), /* @__PURE__ */jsxs("div", {
        children: [/* @__PURE__ */jsx("div", {
          style: {
            fontSize: 13.5,
            fontWeight: 600,
            color: "#3c3c44"
          },
          children: it.title
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 11,
            color: "#a2a2a8",
            marginTop: 1
          },
          children: it.sub
        })]
      })]
    }, i))]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      flex: 1,
      borderLeft: "1px solid #e7e7e5",
      paddingLeft: 22
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 30,
        width: 168,
        border: "1.5px solid #cacac8",
        borderRadius: 8,
        marginTop: 4,
        fontSize: 12,
        color: "#6a6a70",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: __scCopy("+ Add Location Filter")
    }), /* @__PURE__ */jsx("div", {
      style: {
        fontSize: 10.5,
        color: "#adadb2",
        marginTop: 24,
        letterSpacing: 1
      },
      children: __scCopy("QUICK FILTERS")
    }), [__scCopy("Assigned to Me"), __scCopy("Created by Me")].map(t => /* @__PURE__ */jsx("div", {
      style: {
        fontSize: 13.5,
        color: "#55555c",
        marginTop: 11
      },
      children: t
    }, t)), /* @__PURE__ */jsx("div", {
      style: {
        fontSize: 10.5,
        color: "#adadb2",
        marginTop: 24,
        letterSpacing: 1
      },
      children: __scCopy("TASK FILTERS")
    }), [__scCopy("Open"), __scCopy("Closed"), __scCopy("Archived")].map(t => /* @__PURE__ */jsx("div", {
      style: {
        fontSize: 13.5,
        color: "#55555c",
        marginTop: 11
      },
      children: t
    }, t))]
  })]
});
var FrontPanel = ({
  glow
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: 820,
    height: 520,
    background: "#fbfbfa",
    borderRadius: 14,
    padding: __scCopy("30px 34px"),
    boxSizing: "border-box",
    fontFamily: FONT,
    boxShadow: `0 0 ${40 + glow * 110}px rgba(255,255,255,${0.3 + glow * 0.55})`,
    overflow: "hidden"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 7,
        background: "#4a9fd8",
        opacity: 0.9
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        fontSize: 26,
        fontWeight: 600,
        color: "#2f2f38"
      },
      children: __scCopy("Q3 Enterprise Deal")
    })]
  }), /* @__PURE__ */jsx("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 10
    },
    children: [__scCopy("Revenue"), __scCopy("Pipeline"), __scCopy("Q3 Quota")].map(t => /* @__PURE__ */jsx("div", {
      style: {
        fontSize: 11.5,
        color: "#6a6a70",
        background: "#efeff0",
        borderRadius: 6,
        padding: __scCopy("3px 10px")
      },
      children: t
    }, t))
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 1,
      background: "#e8e8e6",
      marginTop: 18
    }
  }), [420, 700, 660, 540, 0, 690, 630, 380, 0, 580, 640, 460].map((w, i) => w === 0 ? /* @__PURE__ */jsx("div", {
    style: {
      height: 14
    }
  }, i) : /* @__PURE__ */jsx("div", {
    style: {
      width: w,
      height: 13,
      borderRadius: 6,
      background: i % 5 === 0 ? "#d7d7db" : "#e6e6e9",
      marginTop: 13
    }
  }, i))]
});
var Tile = ({
  kind,
  on
}) => {
  const glyph = (() => {
    switch (kind) {
      case __scCopy("figma"):
        return /* @__PURE__ */jsxs("svg", {
          width: 46,
          height: 46,
          viewBox: "0 0 46 46",
          children: [/* @__PURE__ */jsx("circle", {
            cx: 16,
            cy: 9,
            r: 7,
            fill: "#f24e1e"
          }), /* @__PURE__ */jsx("circle", {
            cx: 30,
            cy: 9,
            r: 7,
            fill: "#ff7262"
          }), /* @__PURE__ */jsx("circle", {
            cx: 16,
            cy: 23,
            r: 7,
            fill: "#a259ff"
          }), /* @__PURE__ */jsx("circle", {
            cx: 30,
            cy: 23,
            r: 7,
            fill: "#1abcfe"
          }), /* @__PURE__ */jsx("circle", {
            cx: 16,
            cy: 37,
            r: 7,
            fill: "#0acf83"
          })]
        });
      case __scCopy("github"):
        return /* @__PURE__ */jsx("div", {
          style: {
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "#24292f"
          }
        });
      case __scCopy("salesforce"):
        return /* @__PURE__ */jsxs("svg", {
          width: 56,
          height: 40,
          viewBox: "0 0 56 40",
          children: [/* @__PURE__ */jsx("ellipse", {
            cx: 22,
            cy: 22,
            rx: 14,
            ry: 11,
            fill: "#00a1e0"
          }), /* @__PURE__ */jsx("ellipse", {
            cx: 36,
            cy: 18,
            rx: 13,
            ry: 10,
            fill: "#00a1e0"
          }), /* @__PURE__ */jsx("ellipse", {
            cx: 30,
            cy: 26,
            rx: 16,
            ry: 10,
            fill: "#00a1e0"
          })]
        });
      case __scCopy("gdrive"):
        return /* @__PURE__ */jsxs("svg", {
          width: 48,
          height: 42,
          viewBox: "0 0 48 42",
          children: [/* @__PURE__ */jsx("path", {
            d: __scCopy("M16 2 L32 2 L48 30 L40 42 L8 42 L0 30 Z"),
            fill: "none"
          }), /* @__PURE__ */jsx("path", {
            d: __scCopy("M16 2 L32 2 L20 24 L4 24 Z"),
            fill: "#34a853",
            transform: "translate(2,2)"
          }), /* @__PURE__ */jsx("path", {
            d: __scCopy("M32 2 L46 28 L30 28 L18 6 Z"),
            fill: "#fbbc04",
            transform: "translate(0,2)"
          }), /* @__PURE__ */jsx("path", {
            d: __scCopy("M6 28 L42 28 L36 38 L12 38 Z"),
            fill: "#4285f4"
          })]
        });
      default:
        return /* @__PURE__ */jsxs("svg", {
          width: 48,
          height: 42,
          viewBox: "0 0 48 42",
          children: [/* @__PURE__ */jsx("path", {
            d: __scCopy("M12 0 L24 8 L12 16 L0 8 Z"),
            fill: "#0061ff"
          }), /* @__PURE__ */jsx("path", {
            d: __scCopy("M36 0 L48 8 L36 16 L24 8 Z"),
            fill: "#0061ff"
          }), /* @__PURE__ */jsx("path", {
            d: __scCopy("M12 18 L24 26 L12 34 L0 26 Z"),
            fill: "#0061ff"
          }), /* @__PURE__ */jsx("path", {
            d: __scCopy("M36 18 L48 26 L36 34 L24 26 Z"),
            fill: "#0061ff"
          })]
        });
    }
  })();
  return /* @__PURE__ */jsx("div", {
    style: {
      width: 112,
      height: 112,
      borderRadius: 26,
      background: "#fdfdfd",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: `0 0 ${16 + on * 46}px rgba(255,255,255,${0.2 + on * 0.55})`,
      transform: `scale(${0.9 + on * 0.1})`
    },
    children: glyph
  });
};
var PIPES = __scConfig("demos/ui-entrance/integration-hub-map/IntegrationHubMap.tsx#PIPES", "PIPES", () => [{
  kind: __scCopy("figma"),
  icon: [452, 262],
  path: __scCopy("M 452 322 L 452 440 Q 452 480 492 480 L 552 480"),
  len: 300,
  tIcon: 52,
  tPipe: 62
}, {
  kind: __scCopy("github"),
  icon: [252, 612],
  path: __scCopy("M 316 612 L 552 612"),
  len: 240,
  tIcon: 52,
  tPipe: 62
}, {
  kind: __scCopy("salesforce"),
  icon: [992, 178],
  path: __scCopy("M 992 240 L 992 332"),
  len: 92,
  tIcon: 52,
  tPipe: 62
}, {
  kind: __scCopy("gdrive"),
  icon: [1512, 272],
  path: __scCopy("M 1512 332 L 1512 440 Q 1512 480 1472 480 L 1372 480"),
  len: 290,
  tIcon: 52,
  tPipe: 62
}, {
  kind: __scCopy("dropbox"),
  icon: [1702, 618],
  path: __scCopy("M 1640 618 L 1372 618"),
  len: 270,
  tIcon: 52,
  tPipe: 62
}]);
var GROW = __scConfig("demos/ui-entrance/integration-hub-map/IntegrationHubMap.tsx#GROW", "GROW", () => 9);
var RECTS = __scConfig("demos/ui-entrance/integration-hub-map/IntegrationHubMap.tsx#RECTS", "RECTS", () => Array.from({
  length: 9
}, (_, i) => ({
  x: [150, 660, 1740, 250, 1150, 700, 1660, 90, 1330][i],
  y: [255, 355, 545, 850, 935, 985, 830, 555, 760][i],
  w: 90 + NOISE[i * 3] * 160,
  h: 60 + NOISE[i * 3 + 1] * 70,
  hue: [265, 285, 300, 255, 275, 210, 320, 240, 40][i],
  ph: NOISE[i * 3 + 2] * Math.PI * 2
})));
var IntegrationHubMap = () => {
  const frame = useCurrentFrame();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const zoom = interpolate(frame, [0, 14, 58, 96], [2.05, 1.95, 1.1, 1], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const rotY = interpolate(frame, [14, 49], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const panX = interpolate(frame, [0, 18, 55, 96], [130, 120, 30, 0], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const panY = interpolate(frame, [0, 18, 55, 96], [120, 110, 30, 25], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const bloom = interpolate(frame, [19, 21, 23, 27], [0, 1, 0.25, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const noise = NOISE[Math.min(frame, NOISE.length - 1)];
  const allOn = Math.max(...PIPES.map(p => p.tPipe)) + GROW;
  const breathe = frame > allOn ? 0.5 + 0.5 * Math.sin((frame - allOn) * 0.16) : 0;
  const panelGlow = bloom * 1.1 + breathe * 0.2;
  const mapIn = interpolate(frame, [34, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#08070c"
    },
    children: [/* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        background: "radial-gradient(ellipse at 50% 50%, rgba(90,50,140,0.25), transparent 62%), radial-gradient(ellipse at 18% 78%, rgba(140,50,120,0.12), transparent 50%)"
      }
    }), RECTS.map((r, i) => {
      const on = interpolate(frame, [36 + i * 4, 52 + i * 4], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      const settle = frame > 100 ? 0.55 : 1;
      const flick = 0.65 + 0.35 * Math.sin(frame * 0.11 + r.ph);
      return /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: r.x,
          top: r.y,
          width: r.w,
          height: r.h,
          borderRadius: 12,
          border: `2.5px solid hsla(${r.hue} 90% 70% / ${0.75 * on * flick * settle})`,
          boxShadow: `0 0 18px hsla(${r.hue} 90% 65% / ${0.55 * on * flick * settle}), inset 0 0 14px hsla(${r.hue} 90% 65% / ${0.3 * on * flick * settle})`
        }
      }, i);
    }), /* @__PURE__ */jsxs("svg", {
      width: 1920,
      height: 1080,
      style: {
        position: "absolute",
        inset: 0,
        opacity: mapIn
      },
      children: [/* @__PURE__ */jsxs("defs", {
        children: [PIPES.map((p, i) => {
          const nums = p.path.match(/-?[\d.]+/g).map(Number);
          const [x1, y1] = [nums[0], nums[1]];
          const [x2, y2] = [nums[nums.length - 2], nums[nums.length - 1]];
          return /* @__PURE__ */jsxs("linearGradient", {
            id: `rainbow-${uid}-${i}`,
            gradientUnits: "userSpaceOnUse",
            x1,
            y1,
            x2,
            y2,
            children: [/* @__PURE__ */jsx("stop", {
              offset: "0%",
              stopColor: "#ffe14d"
            }), /* @__PURE__ */jsx("stop", {
              offset: "28%",
              stopColor: "#ff8a5a"
            }), /* @__PURE__ */jsx("stop", {
              offset: "52%",
              stopColor: "#ff5ad0"
            }), /* @__PURE__ */jsx("stop", {
              offset: "76%",
              stopColor: "#b46bff"
            }), /* @__PURE__ */jsx("stop", {
              offset: "100%",
              stopColor: "#5ad0ff"
            })]
          }, i);
        }), /* @__PURE__ */jsxs("filter", {
          id: `pipeGlow-${uid}`,
          filterUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "1920",
          height: "1080",
          children: [/* @__PURE__ */jsx("feGaussianBlur", {
            stdDeviation: "8",
            result: "b"
          }), /* @__PURE__ */jsxs("feMerge", {
            children: [/* @__PURE__ */jsx("feMergeNode", {
              in: "b"
            }), /* @__PURE__ */jsx("feMergeNode", {
              in: "SourceGraphic"
            })]
          })]
        })]
      }), PIPES.map((p, i) => {
        const grow = interpolate(frame, [p.tPipe, p.tPipe + GROW], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.quad)
        });
        if (grow <= 0) return null;
        const dashOn = p.len * grow;
        const pulse = frame > allOn ? 0.78 + 0.22 * Math.sin((frame - allOn) * 0.16 + i) : 1;
        const flowOffset = -((frame - p.tPipe) * 4.6 + i * 37);
        const flowIn = interpolate(frame, [p.tPipe + GROW, p.tPipe + GROW + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        return /* @__PURE__ */jsxs("g", {
          filter: `url(#pipeGlow-${uid})`,
          children: [/* @__PURE__ */jsx("path", {
            d: p.path,
            fill: "none",
            stroke: `url(#rainbow-${uid}-${i})`,
            strokeWidth: 17,
            strokeLinecap: "round",
            strokeDasharray: `${dashOn} ${p.len + 60}`,
            opacity: 0.92 * pulse
          }), /* @__PURE__ */jsx("path", {
            d: p.path,
            fill: "none",
            stroke: "rgba(255,255,255,0.9)",
            strokeWidth: 5,
            strokeLinecap: "round",
            strokeDasharray: `${dashOn} ${p.len + 60}`,
            opacity: 0.85 * pulse
          }), grow >= 1 && flowIn > 0 && /* @__PURE__ */jsxs(Fragment, {
            children: [/* @__PURE__ */jsx("path", {
              d: p.path,
              fill: "none",
              stroke: "#ffffff",
              strokeWidth: 11,
              strokeLinecap: "round",
              strokeDasharray: "18 56",
              strokeDashoffset: flowOffset,
              opacity: 0.95 * flowIn
            }), /* @__PURE__ */jsx("path", {
              d: p.path,
              fill: "none",
              stroke: "rgba(255,255,255,0.6)",
              strokeWidth: 24,
              strokeLinecap: "round",
              strokeDasharray: "18 56",
              strokeDashoffset: flowOffset,
              opacity: 0.55 * flowIn
            })]
          })]
        }, i);
      })]
    }), PIPES.map((p, i) => {
      const appear = interpolate(frame, [p.tIcon, p.tIcon + 12], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic)
      });
      const on = interpolate(frame, [p.tPipe, p.tPipe + 10], [0.15, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      if (appear <= 0) return null;
      return /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: p.icon[0] - 56,
          top: p.icon[1] - 56,
          opacity: appear,
          transform: `translateY(${(1 - appear) * 24}px)`
        },
        children: /* @__PURE__ */jsx(Tile, {
          kind: p.kind,
          on: on * (frame > allOn ? 0.8 + 0.2 * breathe : 1)
        })
      }, i);
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        justifyContent: "center",
        alignItems: "center",
        perspective: 1500
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          transform: `translate(${panX}px, ${panY}px) rotateY(${rotY}deg) scale(${zoom})`,
          position: "relative",
          transformStyle: "preserve-3d",
          width: 820,
          height: 520
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden"
          },
          children: /* @__PURE__ */jsx(FrontPanel, {
            glow: panelGlow
          })
        }), /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          },
          children: /* @__PURE__ */jsx(HubPanel, {
            glow: panelGlow
          })
        }), /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            inset: -6,
            borderRadius: 18,
            background: "#ffffff",
            opacity: Math.min(0.96, bloom * 1.05),
            filter: "blur(5px)",
            pointerEvents: "none",
            transform: rotY > 90 ? "rotateY(180deg) translateZ(1px)" : "translateZ(1px)",
            backfaceVisibility: "hidden"
          }
        })]
      })
    }), bloom > 0.02 && /* @__PURE__ */jsxs(AbsoluteFill, {
      style: {
        pointerEvents: "none"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: 300,
          top: 60,
          width: 1100,
          height: 900,
          background: "radial-gradient(closest-side, rgba(255,255,255,0.98), rgba(255,235,255,0.75) 42%, rgba(255,120,230,0.4) 68%, transparent 88%)",
          filter: "blur(26px)",
          opacity: Math.min(1, bloom * (0.94 + 0.06 * noise))
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: 1150,
          top: 150,
          width: 700,
          height: 620,
          background: "radial-gradient(closest-side, rgba(255,90,208,0.85), rgba(200,70,255,0.4) 60%, transparent 85%)",
          filter: "blur(34px)",
          opacity: bloom * 0.9
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: 40,
          top: 480,
          width: 620,
          height: 520,
          background: "radial-gradient(closest-side, rgba(140,210,255,0.8), rgba(90,120,255,0.35) 60%, transparent 85%)",
          filter: "blur(30px)",
          opacity: bloom * 0.85
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: 30,
          top: 700,
          width: 420,
          height: 46,
          borderRadius: 23,
          background: "linear-gradient(90deg, rgba(255,255,255,0.95), rgba(170,90,255,0.8), transparent)",
          filter: "blur(14px)",
          opacity: interpolate(frame, [20, 34, 70, 92], [0, 0.9, 0.5, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp"
          })
        }
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = IntegrationHubMap;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
