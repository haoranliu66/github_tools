// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/beat-cut-moves/PaparazziFlash.tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/beat-cut-moves/PaparazziFlash.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/rhythm/beat-cut-moves/PaparazziFlash.tsx

var F1 = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#F1", "F1", () => 30);
var F2 = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#F2", "F2", () => 52);
var F3 = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#F3", "F3", () => 70);
var SETTLE = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#SETTLE", "SETTLE", () => 6);
var DECAY = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#DECAY", "DECAY", () => 4);
var FLASHES = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#FLASHES", "FLASHES", () => [F1, F2, F3]);
var hash = i => {
  const s = Math.sin(i * 127.3) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
};
var Footage = () => /* @__PURE__ */jsxs2("div", {
  style: {
    position: "absolute",
    width: 1920,
    height: 1080
  },
  children: [/* @__PURE__ */jsx2(FakeDashboard, {
    variant: "A"
  }), /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: 1070,
      top: 350,
      transform: "translate(-50%, -50%)"
    },
    children: /* @__PURE__ */jsx2(TitleBlock, {
      text: "84,213",
      size: 104
    })
  })]
});
var VIEW_WIDE = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#VIEW_WIDE", "VIEW_WIDE", () => ({
  scale: 1,
  origin: __scCopy("960px 540px")
}));
var VIEW_CARD = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#VIEW_CARD", "VIEW_CARD", () => ({
  scale: 2.3,
  origin: __scCopy("1070px 335px")
}));
var VIEW_DIGIT = __scConfig("demos/rhythm/beat-cut-moves/PaparazziFlash.tsx#VIEW_DIGIT", "VIEW_DIGIT", () => ({
  scale: 4,
  origin: __scCopy("1070px 350px")
}));
var PaparazziFlash = () => {
  const frame = useCurrentFrame();
  let seg = -1;
  for (let i = 0; i < FLASHES.length; i++) {
    if (frame >= FLASHES[i]) seg = i;
  }
  let scale;
  let origin;
  let settleScale = 1;
  let settleY = 0;
  if (seg === -1) {
    origin = __scCopy("900px 480px");
    scale = interpolate(frame, [0, F1], [1.16, 1.2], {
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad)
    });
  } else {
    const view = [VIEW_WIDE, VIEW_CARD, VIEW_DIGIT][seg];
    scale = view.scale;
    origin = view.origin;
    const t = interpolate(frame, [FLASHES[seg], FLASHES[seg] + SETTLE], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic)
    });
    settleScale = 1 + 0.03 * t;
    settleY = -16 * t;
  }
  let flash = 0;
  for (const f of FLASHES) {
    const o = interpolate(frame, [f, f + DECAY], [0.95, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad)
    });
    if (frame >= f && frame < f + DECAY + 1) flash = Math.max(flash, o);
  }
  const inFlash = FLASHES.some(f => frame >= f && frame < f + DECAY);
  const jx = inFlash ? 2 * hash(frame * 7 + 1) : 0;
  const jy = inFlash ? 2 * hash(frame * 13 + 5) : 0;
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: G.ink,
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `translate(${jx}px, ${jy + settleY}px)`
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          width: 1920,
          height: 1080,
          transform: `scale(${scale * settleScale})`,
          transformOrigin: origin
        },
        children: /* @__PURE__ */jsx2(Footage, {})
      })
    }), flash > 0 && /* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        background: "#ffffff",
        opacity: flash
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PaparazziFlash;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
