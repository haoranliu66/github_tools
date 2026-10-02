// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/camera/space-camera-moves/ExplodedView.tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/camera/space-camera-moves/ExplodedView.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/camera/space-camera-moves/ExplodedView.tsx

var EXPLODE = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#EXPLODE", "EXPLODE", () => 24);
var ASSEMBLE = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#ASSEMBLE", "ASSEMBLE", () => 90);
var STAGGER = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#STAGGER", "STAGGER", () => 3);
var N = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#N", "N", () => 8);
var CLOSE = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#CLOSE", "CLOSE", () => ASSEMBLE + (N - 1) * STAGGER + 12);
var SIDE_W = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#SIDE_W", "SIDE_W", () => 220);
var TOP_H = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#TOP_H", "TOP_H", () => 72);
var PAD = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#PAD", "PAD", () => 36);
var GAP = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#GAP", "GAP", () => 28);
var CARD_W = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#CARD_W", "CARD_W", () => (1920 - SIDE_W - PAD * 2 - GAP * 2) / 3);
var CARD_H = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#CARD_H", "CARD_H", () => (1080 - TOP_H - PAD * 2 - GAP) / 2);
var Sidebar = () => /* @__PURE__ */jsxs2("div", {
  style: {
    width: SIDE_W,
    height: 1080,
    background: G.side,
    padding: __scCopy("28px 22px"),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 18
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: "#777775"
    }
  }), Array.from({
    length: 7
  }).map((_, i) => /* @__PURE__ */jsx2("div", {
    style: {
      height: 12,
      width: `${60 + i * 29 % 35}%`,
      background: G.sideBar,
      borderRadius: 6
    }
  }, i))]
});
var Topbar = () => /* @__PURE__ */jsxs2("div", {
  style: {
    width: 1920 - SIDE_W,
    height: TOP_H,
    background: G.panel,
    borderBottom: `2px solid ${G.line}`,
    display: "flex",
    alignItems: "center",
    padding: __scCopy("0 32px"),
    gap: 20,
    boxSizing: "border-box"
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      height: 18,
      width: 180,
      background: G.bar,
      borderRadius: 9
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      marginLeft: "auto",
      height: 36,
      width: 320,
      background: "#fff",
      border: `2px solid ${G.line}`,
      borderRadius: 18,
      boxSizing: "border-box"
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 18,
      background: G.mid
    }
  })]
});
var CARD_Z = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#CARD_Z", "CARD_Z", () => [150, 300, 80, 230, 320, 110]);
var LAYERS = __scConfig("demos/camera/space-camera-moves/ExplodedView.tsx#LAYERS", "LAYERS", () => [{
  key: "top",
  x: SIDE_W,
  y: 0,
  w: 1920 - SIDE_W,
  h: TOP_H,
  z: 260,
  order: 0,
  radius: 0,
  node: /* @__PURE__ */jsx2(Topbar, {})
}, {
  key: __scCopy("side"),
  x: 0,
  y: 0,
  w: SIDE_W,
  h: 1080,
  z: 190,
  order: 1,
  radius: 0,
  node: /* @__PURE__ */jsx2(Sidebar, {})
}, ...Array.from({
  length: 6
}).map((_, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  return {
    key: `card${i}`,
    x: SIDE_W + PAD + col * (CARD_W + GAP),
    y: TOP_H + PAD + row * (CARD_H + GAP),
    w: CARD_W,
    h: CARD_H,
    z: CARD_Z[i],
    order: 2 + i,
    radius: 14,
    node: /* @__PURE__ */jsx2(Card, {
      w: CARD_W,
      h: CARD_H,
      seed: i + 1
    })
  };
})]);
var ExplodedView = () => {
  const frame = useCurrentFrame();
  const layerP = order => {
    const out = interpolate(frame, [EXPLODE + order * STAGGER, EXPLODE + order * STAGGER + 14], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.back(1.7))
    });
    const back = interpolate(frame, [ASSEMBLE + (N - 1 - order) * STAGGER, ASSEMBLE + (N - 1 - order) * STAGGER + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic)
    });
    return out * (1 - back);
  };
  const g = interpolate(frame, [EXPLODE, EXPLODE + 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  }) * (1 - interpolate(frame, [ASSEMBLE, CLOSE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  }));
  const since = frame - CLOSE;
  const env = since >= 0 ? 13 * Math.exp(-since / 1.3) : 0;
  const shakeX = env * Math.sin(since * 3.3);
  const shakeY = env * 0.7 * Math.sin(since * 4.7 + 1.1);
  return /* @__PURE__ */jsx2(AbsoluteFill, {
    style: {
      background: "#dedddb",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx2(AbsoluteFill, {
      style: {
        perspective: 1600,
        transform: `translate(${shakeX}px, ${shakeY}px)`
      },
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: 1920,
          height: 1080,
          transform: "scale(0.76) rotateX(18deg) rotateY(-12deg)",
          transformOrigin: "50% 50%",
          transformStyle: "preserve-3d"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 0,
            background: G.bg,
            border: `2px solid ${G.border}`,
            boxSizing: "border-box",
            filter: `brightness(${1 - g * 0.22})`
          }
        }), LAYERS.map(L => {
          const p = Math.min(1, Math.max(0, layerP(L.order)));
          if (p <= 0.01) return null;
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: L.x + L.z * 0.16 * p,
              top: L.y + L.z * 0.26 * p,
              width: L.w,
              height: L.h,
              borderRadius: L.radius,
              background: "rgba(0,0,0,0.30)",
              filter: `blur(${8 + L.z * 0.09 * p}px)`,
              opacity: 0.5 * p,
              transform: "translateZ(2px)"
            }
          }, `sh-${L.key}`);
        }), LAYERS.map(L => {
          const p = layerP(L.order);
          const pc = Math.min(1, Math.max(0, p));
          const bright = 1 - (1 - L.z / 320) * 0.28 * pc;
          return /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: L.x,
              top: L.y,
              width: L.w,
              height: L.h,
              borderRadius: L.radius,
              transform: `translateZ(${L.z * p}px)`,
              filter: `brightness(${bright})`,
              boxShadow: pc > 0.02 ? `0 ${10 + L.z * 0.1 * pc}px ${16 + L.z * 0.14 * pc}px rgba(0,0,0,${0.12 + 0.1 * pc})` : "none"
            },
            children: L.node
          }, L.key);
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ExplodedView;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
