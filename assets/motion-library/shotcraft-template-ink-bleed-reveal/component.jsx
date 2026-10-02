// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/print-texture-transitions/InkBleedReveal.tsx
import { useId } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/print-texture-transitions/InkBleedReveal.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/print-texture-transitions/InkBleedReveal.tsx

var InkBleedReveal = () => {
  const frame = useCurrentFrame();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const bleedId = `inkBleed-${uid}`;
  const maskId = `inkMask-${uid}`;
  const cx = 800;
  const cy = 420;
  const baseR = interpolate(frame, [20, 98], [0, 1450], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const wobbleEnv = interpolate(frame, [78, 98], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const r = Math.max(0, baseR * (1 + 0.08 * Math.sin(frame * 0.32) * wobbleEnv));
  const dispScale = interpolate(frame, [20, 98], [60, 160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const settled = frame >= 100;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: G.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("BEFORE"),
        size: 120
      })
    }), settled ? /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0
      },
      children: /* @__PURE__ */jsx2(FakeDashboard, {
        variant: "A"
      })
    }) : /* @__PURE__ */jsxs2("svg", {
      width: 1920,
      height: 1080,
      viewBox: "0 0 1920 1080",
      style: {
        position: "absolute",
        inset: 0,
        display: "block"
      },
      children: [/* @__PURE__ */jsxs2("defs", {
        children: [/* @__PURE__ */jsxs2("filter", {
          id: bleedId,
          x: "-40%",
          y: "-40%",
          width: "180%",
          height: "180%",
          children: [/* @__PURE__ */jsx2("feTurbulence", {
            type: "fractalNoise",
            baseFrequency: "0.02",
            numOctaves: "3",
            seed: "7",
            result: "noise"
          }), /* @__PURE__ */jsx2("feDisplacementMap", {
            in: "SourceGraphic",
            in2: "noise",
            scale: dispScale,
            xChannelSelector: "R",
            yChannelSelector: "G"
          })]
        }), /* @__PURE__ */jsxs2("mask", {
          id: maskId,
          maskUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "1920",
          height: "1080",
          children: [/* @__PURE__ */jsx2("rect", {
            x: "0",
            y: "0",
            width: "1920",
            height: "1080",
            fill: "black"
          }), r > 0.5 && /* @__PURE__ */jsx2("circle", {
            cx,
            cy,
            r,
            fill: "white",
            filter: `url(#${bleedId})`
          })]
        })]
      }), /* @__PURE__ */jsx2("g", {
        mask: `url(#${maskId})`,
        children: /* @__PURE__ */jsx2("foreignObject", {
          x: "0",
          y: "0",
          width: "1920",
          height: "1080",
          children: /* @__PURE__ */jsx2(FakeDashboard, {
            variant: "A"
          })
        })
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = InkBleedReveal;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
