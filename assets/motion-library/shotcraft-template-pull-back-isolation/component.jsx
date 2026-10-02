// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/camera/tension-camera-moves/PullBackIsolation.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/camera/tension-camera-moves/PullBackIsolation.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/camera/tension-camera-moves/PullBackIsolation.tsx

var SIBS = __scConfig("demos/camera/tension-camera-moves/PullBackIsolation.tsx#SIBS", "SIBS", () => [{
  dx: -620,
  dy: -330,
  w: 360,
  h: 240,
  seed: 3
}, {
  dx: 10,
  dy: -390,
  w: 420,
  h: 220,
  seed: 4
}, {
  dx: 620,
  dy: -320,
  w: 380,
  h: 260,
  seed: 5
}, {
  dx: -680,
  dy: 20,
  w: 340,
  h: 230,
  seed: 6
}, {
  dx: 700,
  dy: 40,
  w: 360,
  h: 250,
  seed: 7
}, {
  dx: -600,
  dy: 360,
  w: 400,
  h: 240,
  seed: 8
}, {
  dx: 40,
  dy: 400,
  w: 440,
  h: 220,
  seed: 9
}, {
  dx: 640,
  dy: 350,
  w: 370,
  h: 250,
  seed: 10
}].map(s => ({
  ...s,
  dist: Math.hypot(s.dx, s.dy)
})));
var RANKED = __scConfig("demos/camera/tension-camera-moves/PullBackIsolation.tsx#RANKED", "RANKED", () => SIBS.map((s, i) => i).sort((a, b) => SIBS[a].dist - SIBS[b].dist));
var FADE_START = __scConfig("demos/camera/tension-camera-moves/PullBackIsolation.tsx#FADE_START", "FADE_START", () => RANKED.reduce((acc, idx, rank) => {
  acc[idx] = 30 + rank * 8;
  return acc;
}, []));
var FADE_DUR = 16;
var clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp"
};
var PullBackIsolation = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 110], [2.2, 0.62], {
    easing: Easing.out(Easing.cubic),
    ...clamp
  });
  const bgT = interpolate(frame, [60, 110], [0, 1], {
    easing: Easing.inOut(Easing.quad),
    ...clamp
  });
  const bgC = Math.round(236 + (20 - 236) * bgT);
  const bg = `rgb(${bgC},${bgC},${bgC})`;
  const glow = interpolate(frame, [60, 100], [0, 0.35], {
    ...clamp
  });
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: bg,
      overflow: "hidden",
      position: "relative"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `scale(${scale})`,
        transformOrigin: __scCopy("960px 540px")
      },
      children: [SIBS.map((s, i) => {
        const t0 = FADE_START[i];
        const op = interpolate(frame, [t0, t0 + FADE_DUR], [1, 0], {
          easing: Easing.out(Easing.quad),
          ...clamp
        });
        const bright = interpolate(frame, [t0, t0 + FADE_DUR], [1, 0.3], {
          ...clamp
        });
        return /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 960 + s.dx - s.w / 2,
            top: 540 + s.dy - s.h / 2,
            opacity: op,
            filter: `brightness(${bright})`
          },
          children: /* @__PURE__ */jsx2(Card, {
            w: s.w,
            h: s.h,
            seed: s.seed
          })
        }, i);
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: 960 - 260,
          top: 540 - 170,
          width: 520,
          height: 340,
          borderRadius: 14,
          boxShadow: `0 0 80px rgba(255,255,255,${glow}), 0 0 160px rgba(255,255,255,${glow * 0.6})`
        },
        children: [/* @__PURE__ */jsx2(Card, {
          w: 520,
          h: 340,
          seed: 2
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 800,
            fontSize: 128,
            letterSpacing: -3,
            color: G.ink,
            background: "rgba(255,255,255,0.72)",
            borderRadius: 14
          },
          children: __scCopy("99.9%")
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PullBackIsolation;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
