// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/slam-entrance-moves/ImpactBurstKit.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/slam-entrance-moves/ImpactBurstKit.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/effects/slam-entrance-moves/ImpactBurstKit.tsx

var h = n => {
  const s = Math.sin(n * 127.3) * 43758.5453;
  return s - Math.floor(s);
};
var CW = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#CW", "CW", () => 400);
var CH = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#CH", "CH", () => 280);
var GAP = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#GAP", "GAP", () => 60);
var X_L = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#X_L", "X_L", () => (1920 - (CW * 3 + GAP * 2)) / 2);
var Y = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#Y", "Y", () => (1080 - CH) / 2);
var CX = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#CX", "CX", () => 960);
var CY = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#CY", "CY", () => Y + CH / 2);
var IMPACT = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#IMPACT", "IMPACT", () => 20);
var HIT_NEIGHBOR = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#HIT_NEIGHBOR", "HIT_NEIGHBOR", () => IMPACT + 3);
var PARTICLES = __scConfig("demos/effects/slam-entrance-moves/ImpactBurstKit.tsx#PARTICLES", "PARTICLES", () => Array.from({
  length: 14
}).map((_, i) => ({
  angle: -Math.PI / 2 + (h(i + 1) - 0.5) * Math.PI * 1.7,
  // 上半球为主
  dist: 160 + h(i + 40) * 180,
  size: 8 + h(i + 80) * 10,
  square: i % 2 === 0
})));
var pushEnv = f => {
  const t = f - HIT_NEIGHBOR;
  if (t < 0 || t >= 40) return 0;
  return Math.cos(t * 0.5) * Math.exp(-t / 8);
};
var ImpactBurstKit = () => {
  const frame = useCurrentFrame();
  const dropP = interpolate(frame, [14, IMPACT], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  });
  const mainScale = interpolate(dropP, [0, 1], [1.8, 1]);
  const mainDy = interpolate(dropP, [0, 1], [-120, 0]);
  const sq = interpolate(frame, [IMPACT, IMPACT + 3, IMPACT + 6], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
  const mainSx = mainScale * (1 + 0.07 * sq);
  const mainSy = mainScale * (1 - 0.1 * sq);
  const ringP = interpolate(frame, [IMPACT, IMPACT + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const ringR = interpolate(ringP, [0, 1], [80, 900]);
  const ringOp = frame >= IMPACT && frame < IMPACT + 14 ? 0.75 * (1 - ringP) : 0;
  const pT = interpolate(frame, [IMPACT, IMPACT + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const particlesAlive = frame >= IMPACT && frame < IMPACT + 22;
  const env = pushEnv(frame);
  const pushX = 30 * env;
  const pushRot = 3 * env;
  let shakeX = 0;
  let shakeY = 0;
  if (frame >= IMPACT && frame < IMPACT + 4) {
    const amp = 6 * (1 - (frame - IMPACT) / 4);
    shakeX = (h(frame * 3.7) - 0.5) * 2 * amp;
    shakeY = (h(frame * 7.1 + 13) - 0.5) * 2 * amp;
  }
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
          left: 120,
          top: 96
        },
        children: /* @__PURE__ */jsx2(TitleBlock, {
          text: __scCopy("IMPACT BURST KIT"),
          size: 54
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: X_L,
          top: Y,
          transform: `translateX(${-pushX}px) rotate(${-pushRot}deg)`
        },
        children: /* @__PURE__ */jsx2(Card, {
          w: CW,
          h: CH,
          seed: 2
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: X_L + (CW + GAP) * 2,
          top: Y,
          transform: `translateX(${pushX}px) rotate(${pushRot}deg)`
        },
        children: /* @__PURE__ */jsx2(Card, {
          w: CW,
          h: CH,
          seed: 4
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: X_L + CW + GAP,
          top: Y + mainDy,
          transform: `scale(${mainSx}, ${mainSy})`,
          transformOrigin: "50% 100%"
        },
        children: /* @__PURE__ */jsx2(Card, {
          w: CW,
          h: CH,
          seed: 7,
          style: {
            boxShadow: "0 6px 18px rgba(0,0,0,0.16)"
          }
        })
      }), particlesAlive && PARTICLES.map((p, i) => {
        const px = CX + Math.cos(p.angle) * p.dist * pT;
        const py = CY + Math.sin(p.angle) * p.dist * pT;
        const s = p.size * (1 - pT);
        if (s < 0.5) return null;
        return /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: px - s / 2,
            top: py - s / 2,
            width: s,
            height: s,
            background: G.ink,
            borderRadius: p.square ? 2 : "50%",
            opacity: 1 - pT * pT
          }
        }, i);
      }), ringOp > 0 && /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: CX - ringR,
          top: CY - ringR,
          width: ringR * 2,
          height: ringR * 2,
          border: `3px solid ${G.ink}`,
          borderRadius: "50%",
          opacity: ringOp,
          boxSizing: "border-box"
        }
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ImpactBurstKit;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
