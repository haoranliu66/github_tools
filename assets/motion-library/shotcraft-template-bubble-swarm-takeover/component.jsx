// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx

var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var PEAK = __scConfig("demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx#PEAK", "PEAK", () => 75);
var W = __scConfig("demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx#W", "W", () => 1920);
var H = __scConfig("demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx#H", "H", () => 1080);
var CX = __scConfig("demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx#CX", "CX", () => W / 2);
var CY = __scConfig("demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx#CY", "CY", () => H / 2);
var TINTS = __scConfig("demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx#TINTS", "TINTS", () => [["rgba(226,208,255,0.55)", "rgba(255,200,235,0.45)"], ["rgba(190,225,255,0.55)", "rgba(215,200,255,0.45)"], ["rgba(255,215,235,0.5)", "rgba(200,235,255,0.45)"], ["rgba(205,240,250,0.5)", "rgba(235,210,255,0.45)"]]);
var makeBubbles = () => {
  const specs = [];
  for (let i = 0; i < 34; i++) {
    const rng = mulberry32(1e3 + i * 97);
    const edge = Math.floor(rng() * 4);
    const along = rng();
    let startX = 0,
      startY = 0;
    if (edge === 0) {
      startX = along * W;
      startY = -320;
    }
    if (edge === 1) {
      startX = W + 320;
      startY = along * H;
    }
    if (edge === 2) {
      startX = along * W;
      startY = H + 320;
    }
    if (edge === 3) {
      startX = -320;
      startY = along * H;
    }
    const layer = i % 3;
    const r = layer === 0 ? 45 + rng() * 55 : layer === 1 ? 100 + rng() * 90 : 210 + rng() * 150;
    specs.push({
      startX,
      startY,
      targetX: 140 + rng() * (W - 280),
      targetY: 100 + rng() * (H - 200),
      r,
      t0: 8 + rng() * 42,
      blur: layer === 0 ? 7 : layer === 1 ? 0.5 : 9,
      tint: Math.floor(rng() * TINTS.length),
      wobblePhase: rng() * Math.PI * 2,
      wobbleAmp: 10 + rng() * 22,
      z: layer
    });
  }
  const grid = [[340, 300], [960, 240], [1580, 330], [320, 800], [980, 860], [1600, 780]];
  grid.forEach(([gx, gy], i) => {
    const rng = mulberry32(7e3 + i * 131);
    const edge = i % 4;
    let startX = 0,
      startY = 0;
    if (edge === 0) {
      startX = gx;
      startY = -600;
    }
    if (edge === 1) {
      startX = W + 600;
      startY = gy;
    }
    if (edge === 2) {
      startX = gx;
      startY = H + 600;
    }
    if (edge === 3) {
      startX = -600;
      startY = gy;
    }
    specs.push({
      startX,
      startY,
      targetX: gx,
      targetY: gy,
      r: 430 + rng() * 140,
      t0: 22 + rng() * 14,
      blur: 3,
      tint: i % TINTS.length,
      wobblePhase: rng() * Math.PI * 2,
      wobbleAmp: 8,
      z: 2
    });
  });
  return specs;
};
var BUBBLES = __scConfig("demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx#BUBBLES", "BUBBLES", () => makeBubbles());
var CAPSULES = __scConfig("demos/transition/bubble-swarm-takeover/BubbleSwarmTakeover.tsx#CAPSULES", "CAPSULES", () => [{
  text: __scCopy("Hallo!"),
  idx: 5
}, {
  text: __scCopy("\xA1Hola!"),
  idx: 14
}, {
  text: __scCopy("Ciao!"),
  idx: 23
}]);
var Bubble = ({
  spec,
  frame
}) => {
  const pIn = interpolate(frame, [spec.t0, PEAK], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const disperse = interpolate(frame, [PEAK + 2, 118], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad)
  });
  const wob = Math.sin(frame * 0.09 + spec.wobblePhase) * spec.wobbleAmp * pIn;
  let x = spec.startX + (spec.targetX - spec.startX) * pIn + wob;
  let y = spec.startY + (spec.targetY - spec.startY) * pIn + wob * 0.6;
  const dx = spec.targetX - CX,
    dy = spec.targetY - CY;
  const dl = Math.max(Math.hypot(dx, dy), 60);
  x += dx / dl * disperse * 1700;
  y += dy / dl * disperse * 1700;
  const scale = interpolate(frame, [spec.t0, PEAK], [0.22, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  }) * (1 - disperse * 0.35);
  const opacity = interpolate(frame, [spec.t0, spec.t0 + 7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) * interpolate(disperse, [0.55, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  if (opacity <= 0.01) return null;
  const [c1, c2] = TINTS[spec.tint];
  const d = spec.r * 2 * scale;
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: x - spec.r * scale,
      top: y - spec.r * scale,
      width: d,
      height: d,
      borderRadius: "50%",
      opacity,
      filter: `blur(${spec.blur}px)`,
      background: `radial-gradient(circle at 34% 28%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.45) 22%, ${c1} 52%, ${c2} 76%, rgba(255,255,255,0.65) 96%)`,
      boxShadow: "inset 0 0 40px rgba(255,255,255,0.55), 0 0 30px rgba(255,255,255,0.25)"
    }
  });
};
var BubbleSwarmTakeover = () => {
  const frame = useCurrentFrame();
  const whiteout = interpolate(frame, [42, 68, 82, 104], [0, 0.92, 0.92, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const breathe = 1 + 0.02 * Math.sin(frame * 0.045);
  return /* @__PURE__ */jsxs2(AbsoluteFill, {
    style: {
      background: "#ececea",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        transform: `scale(${breathe})`
      },
      children: frame < PEAK ? /* @__PURE__ */jsx2(FakeDashboard, {
        variant: "A"
      }) : /* @__PURE__ */jsx2(FakeDashboard, {
        variant: "B"
      })
    }), /* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        background: "#ffffff",
        opacity: whiteout
      }
    }), BUBBLES.filter(b => b.z < 2).map((b, i) => /* @__PURE__ */jsx2(Bubble, {
      spec: b,
      frame
    }, i)), CAPSULES.map((c, i) => {
      const host = BUBBLES[c.idx];
      const pIn = interpolate(frame, [host.t0 + 4, PEAK], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.out(Easing.cubic)
      });
      const disperse = interpolate(frame, [PEAK + 2, 116], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.in(Easing.quad)
      });
      const wob = Math.sin(frame * 0.08 + host.wobblePhase + 1.3) * 18;
      let x = host.startX + (host.targetX - host.startX) * pIn + 60 + wob;
      let y = host.startY + (host.targetY - host.startY) * pIn - host.r * 0.9;
      const dx = host.targetX - CX,
        dy = host.targetY - CY;
      const dl = Math.max(Math.hypot(dx, dy), 60);
      x += dx / dl * disperse * 1700;
      y += dy / dl * disperse * 1700;
      const op = pIn * interpolate(disperse, [0.5, 1], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      const sc = 0.5 + 0.5 * pIn;
      return /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: x,
          top: y,
          opacity: op,
          transform: `scale(${sc}) rotate(${wob * 0.25}deg)`,
          padding: __scCopy("18px 40px"),
          borderRadius: 60,
          background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(235,220,255,0.9))",
          border: "2px solid rgba(255,255,255,0.9)",
          boxShadow: "0 8px 32px rgba(150,120,220,0.25)",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 46,
          color: "#5b4a86",
          whiteSpace: "nowrap"
        },
        children: c.text
      }, i);
    }), BUBBLES.filter(b => b.z === 2).map((b, i) => /* @__PURE__ */jsx2(Bubble, {
      spec: b,
      frame
    }, i))]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = BubbleSwarmTakeover;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
