// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/slam-entrance-moves/ScoreSlam.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/slam-entrance-moves/ScoreSlam.tsx
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
  h: h2,
  seed = 0,
  style
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: w,
      height: h2,
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

// implementation/video-shotcraft/full/stage/source/demos/effects/slam-entrance-moves/ScoreSlam.tsx

var h = n => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var IMPACT = __scConfig("demos/effects/slam-entrance-moves/ScoreSlam.tsx#IMPACT", "IMPACT", () => 14);
var CX = __scConfig("demos/effects/slam-entrance-moves/ScoreSlam.tsx#CX", "CX", () => 960);
var CY = __scConfig("demos/effects/slam-entrance-moves/ScoreSlam.tsx#CY", "CY", () => 540);
var CARD_W = __scConfig("demos/effects/slam-entrance-moves/ScoreSlam.tsx#CARD_W", "CARD_W", () => 460);
var CARD_H = __scConfig("demos/effects/slam-entrance-moves/ScoreSlam.tsx#CARD_H", "CARD_H", () => 260);
var ScoreSlam = () => {
  const frame = useCurrentFrame();
  const slamScale = frame < IMPACT ? interpolate(frame, [8, IMPACT], [2.5, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad)
  }) : interpolate(frame, [IMPACT, 22], [0.97, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const slamRot = interpolate(frame, [8, IMPACT], [5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad)
  });
  const slamY = interpolate(frame, [8, IMPACT], [-80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad)
  });
  const cardOp = interpolate(frame, [8, 11], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  let shakeX = 0;
  let shakeY = 0;
  if (frame >= IMPACT && frame < IMPACT + 5) {
    const t = frame - IMPACT;
    const amp = 18 * Math.exp(-t * 0.9);
    shakeX = amp * (h(frame * 7 + 1) * 2 - 1);
    shakeY = amp * (h(frame * 13 + 2) * 2 - 1);
  }
  const ringT = interpolate(frame, [IMPACT, IMPACT + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const ringD = interpolate(ringT, [0, 1], [60, 860]);
  const ringTLin = interpolate(frame, [IMPACT, IMPACT + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const ringOp = interpolate(ringTLin, [0, 0.65, 1], [0.75, 0.55, 0]);
  const ringOn = frame >= IMPACT && frame < IMPACT + 14;
  const dustT = interpolate(frame, [IMPACT, IMPACT + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const dustTLin = interpolate(frame, [IMPACT, IMPACT + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const dustOn = frame >= IMPACT && frame < IMPACT + 16;
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `translate(${shakeX}px, ${shakeY}px)`
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          filter: "blur(6px)",
          transform: "scale(1.05)",
          transformOrigin: "50% 50%"
        },
        children: /* @__PURE__ */jsx2(FakeDashboard, {
          variant: "B"
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 120,
          top: 96
        },
        children: /* @__PURE__ */jsx2(TitleBlock, {
          text: __scCopy("SCORE SLAM"),
          size: 54
        })
      }), dustOn && Array.from({
        length: 8
      }).map((_, i) => {
        const ang = i / 8 * Math.PI * 2 + (h(i + 3) - 0.5) * 0.7;
        const dist = 160 + h(i + 11) * 160;
        const size = 18 + h(i + 23) * 12;
        const dx = Math.cos(ang) * dist * dustT;
        const dy = Math.sin(ang) * dist * dustT + 90 * dustT * dustT;
        const s = size * (1 - 0.75 * dustTLin);
        const op = interpolate(dustTLin, [0, 0.75, 1], [0.9, 0.7, 0]);
        return /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: CX + dx - s / 2,
            top: CY + CARD_H / 2 - 20 + dy - s / 2,
            width: s,
            height: s,
            background: G.ink,
            opacity: op,
            borderRadius: 2
          }
        }, i);
      }), ringOn && /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: CX - ringD / 2,
          top: CY - ringD / 2,
          width: ringD,
          height: ringD,
          borderRadius: "50%",
          border: `6px solid ${G.ink}`,
          opacity: ringOp,
          boxSizing: "border-box"
        }
      }), frame >= 8 && /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: CX - CARD_W / 2,
          top: CY - CARD_H / 2,
          width: CARD_W,
          height: CARD_H,
          background: G.card,
          border: `3px solid ${G.border}`,
          borderRadius: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          opacity: cardOp,
          transform: `translateY(${slamY}px) rotate(${slamRot}deg) scale(${slamScale})`,
          transformOrigin: "50% 50%"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 110,
            color: G.ink,
            letterSpacing: -3,
            lineHeight: 1
          },
          children: __scCopy("+247%")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            fontSize: 26,
            color: G.mid,
            letterSpacing: 4
          },
          children: __scCopy("QUARTERLY GROWTH")
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ScoreSlam;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
