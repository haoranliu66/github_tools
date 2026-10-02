// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/line-carry-transition/LineCarryTransition.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/line-carry-transition/LineCarryTransition.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/line-carry-transition/LineCarryTransition.tsx

var PATH = __scConfig("demos/transition/line-carry-transition/LineCarryTransition.tsx#PATH", "PATH", () => __scCopy("M 400 705 L 2600 705 L 2600 375 L 3160 375 L 3160 705 L 2600 705"));
var SEGS = __scConfig("demos/transition/line-carry-transition/LineCarryTransition.tsx#SEGS", "SEGS", () => [[400, 705, 2600, 705, 2200], [2600, 705, 2600, 375, 330], [2600, 375, 3160, 375, 560], [3160, 375, 3160, 705, 330], [3160, 705, 2600, 705, 560]]);
var TOTAL = __scConfig("demos/transition/line-carry-transition/LineCarryTransition.tsx#TOTAL", "TOTAL", () => 3980);
var tipAt = drawn => {
  let d = Math.max(0, Math.min(drawn, TOTAL));
  for (const [x1, y1, x2, y2, len] of SEGS) {
    if (d <= len) {
      const t = d / len;
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
    }
    d -= len;
  }
  return [2600, 705];
};
var LineCarryTransition = () => {
  const frame = useCurrentFrame();
  const cam = interpolate(frame, [34, 94], [0, 1920], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  let drawn;
  if (frame < 24) {
    drawn = interpolate(frame, [0, 24], [0, 560], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  } else if (frame < 34) {
    drawn = interpolate(frame, [24, 34], [560, 1100], {
      extrapolateRight: "clamp"
    });
  } else if (frame < 94) {
    drawn = 1100 + cam;
  } else {
    drawn = interpolate(frame, [94, 112], [3020, TOTAL], {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  }
  const contentOpacity = interpolate(frame, [112, 124], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const tipMounted = frame < 118;
  const tipOpacity = interpolate(frame, [112, 118], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const [tx, ty] = tipAt(drawn);
  return /* @__PURE__ */jsx2(AbsoluteFill, {
    style: {
      background: G.bg,
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        width: 3840,
        height: 1080,
        transform: `translateX(${-cam}px)`
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 1920,
          top: 0,
          width: 1920,
          height: 1080,
          background: G.panel
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 400,
          top: 250
        },
        children: /* @__PURE__ */jsx2(TitleBlock, {
          text: __scCopy("Scene A"),
          size: 56
        })
      }), /* @__PURE__ */jsx2(Card, {
        w: 560,
        h: 330,
        seed: 2,
        style: {
          position: "absolute",
          left: 400,
          top: 350
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 400,
          top: 702,
          width: 560,
          height: 6,
          borderRadius: 3,
          background: G.line
        }
      }), /* @__PURE__ */jsxs2("svg", {
        width: 3840,
        height: 1080,
        style: {
          position: "absolute",
          inset: 0,
          pointerEvents: "none"
        },
        children: [/* @__PURE__ */jsx2("path", {
          d: PATH,
          fill: "none",
          stroke: G.ink,
          strokeWidth: 6,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeDasharray: TOTAL,
          strokeDashoffset: TOTAL - drawn
        }), tipMounted && /* @__PURE__ */jsx2("circle", {
          cx: tx,
          cy: ty,
          r: 11,
          fill: G.ink,
          opacity: tipOpacity
        })]
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: 2600,
          top: 375,
          width: 560,
          height: 330,
          boxSizing: "border-box",
          padding: 26,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          opacity: contentOpacity
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            height: 18,
            width: "58%",
            background: G.bar,
            borderRadius: 9
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 11,
            width: "86%",
            background: G.line,
            borderRadius: 5
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 11,
            width: "72%",
            background: G.line,
            borderRadius: 5
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 11,
            width: "64%",
            background: G.line,
            borderRadius: 5
          }
        }), /* @__PURE__ */jsxs2("div", {
          style: {
            marginTop: "auto",
            display: "flex",
            gap: 10,
            alignItems: "center"
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              width: 30,
              height: 30,
              borderRadius: 15,
              background: G.mid
            }
          }), /* @__PURE__ */jsx2("div", {
            style: {
              height: 11,
              width: 90,
              background: G.line,
              borderRadius: 5
            }
          })]
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 2600,
          top: 275,
          opacity: contentOpacity
        },
        children: /* @__PURE__ */jsx2(TitleBlock, {
          text: __scCopy("Scene B"),
          size: 56
        })
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = LineCarryTransition;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
