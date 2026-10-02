// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/skeleton-reveal/SkeletonReveal.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
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
 var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var INK = __scConfig("demos/ui-entrance/skeleton-reveal/SkeletonReveal.tsx#INK", "INK", () => "#2f2f2f");
var PAPER = __scConfig("demos/ui-entrance/skeleton-reveal/SkeletonReveal.tsx#PAPER", "PAPER", () => "#f2f0ea");
var wobbleLine = (x1, y1, x2, y2, seed, amp = 7, segs = 8) => {
  const rnd = mulberry32(seed);
  const pts = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const jx = (rnd() - 0.5) * amp * 2;
    const jy = (rnd() - 0.5) * amp * 2;
    pts.push(`${i === 0 ? "M" : "L"} ${x1 + (x2 - x1) * t + jx} ${y1 + (y2 - y1) * t + jy}`);
  }
  return pts.join(" ");
};
var wobbleBlobRect = (x, y, w, h, seed, amp = 10, r = 70) => {
  const rnd = mulberry32(seed);
  const j = () => (rnd() - 0.5) * amp * 2;
  return [`M ${x + r + j()} ${y + j()}`, `L ${x + w / 2 + j()} ${y + j()}`, `L ${x + w - r + j()} ${y + j()}`, `Q ${x + w + j()} ${y + j()} ${x + w + j()} ${y + r + j()}`, `L ${x + w + j()} ${y + h / 2 + j()}`, `L ${x + w + j()} ${y + h - r + j()}`, `Q ${x + w + j()} ${y + h + j()} ${x + w - r + j()} ${y + h + j()}`, `L ${x + w / 2 + j()} ${y + h + j()}`, `L ${x + r + j()} ${y + h + j()}`, `Q ${x + j()} ${y + h + j()} ${x + j()} ${y + h - r + j()}`, `L ${x + j()} ${y + h / 2 + j()}`, `L ${x + j()} ${y + r + j()}`, `Q ${x + j()} ${y + j()} ${x + r + j()} ${y + j()}`].join(" ");
};
var wobbleCircle = (cx, cy, r, seed, amp = 6) => {
  const rnd = mulberry32(seed);
  const n = 14;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = i / n * Math.PI * 2;
    const rr = r + (rnd() - 0.5) * amp * 2;
    pts.push(`${i === 0 ? "M" : "L"} ${cx + Math.cos(a) * rr} ${cy + Math.sin(a) * rr}`);
  }
  return pts.join(" ") + __scCopy(" Z");
};
var Doodle = ({
  boil
}) => {
  const S = boil * 977;
  const stroke = {
    fill: "none",
    stroke: INK,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */jsxs("svg", {
    width: 1920,
    height: 1080,
    style: {
      position: "absolute",
      inset: 0
    },
    children: [/* @__PURE__ */jsx("path", {
      d: wobbleBlobRect(250, 140, 1420, 800, S + 1),
      ...stroke,
      strokeWidth: 14
    }), /* @__PURE__ */jsx("path", {
      d: wobbleLine(600, 160, 600, 920, S + 2),
      ...stroke,
      strokeWidth: 12
    }), /* @__PURE__ */jsx("path", {
      d: wobbleCircle(420, 260, 52, S + 3),
      ...stroke,
      strokeWidth: 12
    }), Array.from({
      length: 6
    }).map((_, i) => /* @__PURE__ */jsx("path", {
      d: wobbleLine(330, 400 + i * 82, 470 + i * 53 % 70, 400 + i * 82, S + 10 + i),
      ...stroke,
      strokeWidth: 11
    }, `sb${i}`)), Array.from({
      length: 4
    }).map((_, i) => {
      const y = 320 + i * 160;
      return /* @__PURE__ */jsxs("g", {
        children: [/* @__PURE__ */jsx("path", {
          d: wobbleCircle(720, y, 44, S + 30 + i),
          ...stroke,
          strokeWidth: 12
        }), /* @__PURE__ */jsx("path", {
          d: wobbleLine(810, y - 28, 1180 + i * 97 % 220, y - 28, S + 40 + i),
          ...stroke,
          strokeWidth: 11
        }), /* @__PURE__ */jsx("path", {
          d: wobbleLine(810, y + 24, 1420 - i * 71 % 260, y + 24, S + 50 + i),
          ...stroke,
          strokeWidth: 11
        })]
      }, `row${i}`);
    })]
  });
};
var NAMES = __scConfig("demos/ui-entrance/skeleton-reveal/SkeletonReveal.tsx#NAMES", "NAMES", () => [__scCopy("Ana"), __scCopy("Ben"), __scCopy("Kai"), __scCopy("Mia")]);
var AVA = __scConfig("demos/ui-entrance/skeleton-reveal/SkeletonReveal.tsx#AVA", "AVA", () => ["#5a5a58", "#7a7a78", "#4a4a48", "#8f8f8d"]);
var MSGS = __scConfig("demos/ui-entrance/skeleton-reveal/SkeletonReveal.tsx#MSGS", "MSGS", () => [__scCopy("Morning! Kicking off the rebrand today"), __scCopy("Logo drafts are ready for review"), __scCopy("Nice \u2014 shipping the deck this afternoon"), __scCopy("Love it. Can we make it pink?")]);
var Row = ({
  i,
  dev,
  wordAt
}) => {
  const words = MSGS[i].split(" ");
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "relative",
      height: 96
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        gap: 22,
        opacity: 1 - dev
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 72,
          height: 72,
          borderRadius: 16,
          background: "#d5d5d3"
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          paddingTop: 6
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            height: 18,
            width: 180 + i * 67 % 90,
            background: "#d5d5d3",
            borderRadius: 9
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            height: 16,
            width: `${58 + i * 31 % 30}%`,
            background: "#e2e2e0",
            borderRadius: 8
          }
        })]
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        gap: 22,
        opacity: dev > 0.02 ? 1 : 0
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 72,
          height: 72,
          borderRadius: 16,
          background: AVA[i],
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 800,
          opacity: dev,
          transform: `scale(${0.7 + 0.3 * dev})`
        },
        children: NAMES[i][0]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          flex: 1,
          paddingTop: 2
        },
        children: [/* @__PURE__ */jsxs("div", {
          style: {
            fontSize: 26,
            fontWeight: 800,
            color: INK,
            opacity: dev
          },
          children: [NAMES[i], /* @__PURE__ */jsxs("span", {
            style: {
              fontWeight: 400,
              fontSize: 19,
              color: "#9a9a98",
              marginLeft: 12
            },
            children: [__scCopy("9:0"), i + 1, __scCopy(" AM")]
          })]
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 27,
            color: "#3c3c3a",
            marginTop: 8
          },
          children: words.map((w, wi) => {
            const p = wordAt(wi, words.length);
            return /* @__PURE__ */jsx("span", {
              style: {
                display: "inline-block",
                marginRight: 9,
                opacity: p,
                transform: `translateY(${(1 - p) * 14}px)`
              },
              children: w
            }, wi);
          })
        })]
      })]
    })]
  });
};
var SkeletonReveal = () => {
  const f = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  const SWAP = 32;
  const boil = Math.floor(f / 5);
  const doodleOut = interpolate(f, [SWAP, SWAP + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  });
  const doodleVisible = f < SWAP + 9;
  const winIn = spring({
    frame: f - SWAP,
    fps,
    config: {
      damping: 16,
      stiffness: 160,
      mass: 0.7
    }
  });
  const rowSlide = i => interpolate(f, [SWAP + 12 + i * 6, SWAP + 34 + i * 6], [520, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const zoom = interpolate(f, [66, 142], [1, 1.34], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const devAt = i => interpolate(f, [80 + i * 13, 92 + i * 13], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
  const wordAt = row => (w, n) => {
    const isLastWordOfLastRow = row === 3 && w === n - 1;
    const start = 82 + row * 13 + w * 2.5 + (isLastWordOfLastRow ? 14 : 0);
    return interpolate(f, [start, start + 9], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic)
    });
  };
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: PAPER,
      fontFamily: "Helvetica, Arial, sans-serif",
      overflow: "hidden"
    },
    children: [f >= SWAP && /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        transform: `scale(${zoom})`,
        transformOrigin: "58% 46%"
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 250,
          top: 140,
          width: 1420,
          height: 800,
          background: "#ffffff",
          border: "2px solid #d8d8d6",
          borderRadius: 22,
          overflow: "hidden",
          display: "flex",
          boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
          opacity: Math.min(1, winIn * 2),
          transform: `scale(${interpolate(winIn, [0, 1], [1.08, 1])})`
        },
        children: [/* @__PURE__ */jsxs("div", {
          style: {
            width: 300,
            background: "#3a3a3a",
            padding: __scCopy("30px 26px"),
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 22
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 46,
              height: 46,
              borderRadius: 12,
              background: "#777775"
            }
          }), Array.from({
            length: 7
          }).map((_, i) => /* @__PURE__ */jsx("div", {
            style: {
              height: 13,
              width: `${55 + i * 37 % 40}%`,
              background: "#5a5a58",
              borderRadius: 7
            }
          }, i))]
        }), /* @__PURE__ */jsxs("div", {
          style: {
            flex: 1,
            display: "flex",
            flexDirection: "column"
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              height: 72,
              borderBottom: "2px solid #e4e4e2",
              display: "flex",
              alignItems: "center",
              padding: __scCopy("0 34px")
            },
            children: /* @__PURE__ */jsx("div", {
              style: {
                height: 18,
                width: 230,
                background: "#d5d5d3",
                borderRadius: 9
              }
            })
          }), /* @__PURE__ */jsx("div", {
            style: {
              flex: 1,
              padding: __scCopy("30px 40px"),
              display: "flex",
              flexDirection: "column",
              gap: 32,
              overflow: "hidden"
            },
            children: Array.from({
              length: 4
            }).map((_, i) => /* @__PURE__ */jsx("div", {
              style: {
                transform: `translateY(${rowSlide(i)}px)`,
                opacity: rowSlide(i) > 500 ? 0 : 1
              },
              children: /* @__PURE__ */jsx(Row, {
                i,
                dev: devAt(i),
                wordAt: wordAt(i)
              })
            }, i))
          })]
        })]
      })
    }), doodleVisible && /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        background: PAPER,
        opacity: 1 - doodleOut,
        transform: `scale(${1 - doodleOut * 0.14})`,
        transformOrigin: "50% 50%"
      },
      children: /* @__PURE__ */jsx(Doodle, {
        boil
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SkeletonReveal;
 return {component:template_entry_default,duration:172};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
