// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/rhythm/montage-rhythm-moves/DominoCascade.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/montage-rhythm-moves/DominoCascade.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/rhythm/montage-rhythm-moves/DominoCascade.tsx

var easeInCubic = Easing.in(Easing.cubic);
var easeOutCubic = Easing.out(Easing.cubic);
var TITLE_START = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#TITLE_START", "TITLE_START", () => 36);
var IMPACT_1 = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#IMPACT_1", "IMPACT_1", () => 51);
var CARD_STAGGER = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#CARD_STAGGER", "CARD_STAGGER", () => 5);
var CARD_DUR = 12;
var IMPACT_2 = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#IMPACT_2", "IMPACT_2", () => IMPACT_1 + 3 * CARD_STAGGER + CARD_DUR);
var SIDE_END = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#SIDE_END", "SIDE_END", () => IMPACT_2 + 14);
var SIDE_SETTLE = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#SIDE_SETTLE", "SIDE_SETTLE", () => SIDE_END + 8);
var shake = (f, at, amp) => {
  if (f < at || f > at + 4) return 0;
  const seq = [amp, -amp * 0.6, amp * 0.3, -amp * 0.12, 0];
  return seq[f - at];
};
var CARD_W = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#CARD_W", "CARD_W", () => 340);
var CARD_H = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#CARD_H", "CARD_H", () => 220);
var GAP = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#GAP", "GAP", () => 40);
var ROW_W = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#ROW_W", "ROW_W", () => 4 * CARD_W + 3 * GAP);
var ROW_LEFT = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#ROW_LEFT", "ROW_LEFT", () => 1080 - ROW_W / 2);
var CARD_TOP = __scConfig("demos/rhythm/montage-rhythm-moves/DominoCascade.tsx#CARD_TOP", "CARD_TOP", () => 700);
var DominoCascade = () => {
  const frame = useCurrentFrame();
  const titleTop = interpolate(frame, [TITLE_START, IMPACT_1], [-260, 240], {
    easing: easeInCubic,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const shakeY = shake(frame, IMPACT_1, 10) + shake(frame, IMPACT_2, 6);
  const cardDy = i => {
    const s = IMPACT_1 + i * CARD_STAGGER;
    const t = Math.min(1, Math.max(0, (frame - s) / CARD_DUR));
    return -60 * 4 * t * (1 - t);
  };
  const lastCardRot = interpolate(frame, [IMPACT_2 - 9, IMPACT_2, SIDE_END], [0, -3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  let sideX;
  if (frame < IMPACT_2) {
    sideX = -260;
  } else if (frame < SIDE_END) {
    const t = (frame - IMPACT_2) / (SIDE_END - IMPACT_2);
    sideX = -260 + 272 * easeOutCubic(t);
  } else if (frame < SIDE_SETTLE) {
    const t = (frame - SIDE_END) / (SIDE_SETTLE - SIDE_END);
    sideX = 12 * (1 - Easing.inOut(Easing.quad)(t));
  } else {
    sideX = 0;
  }
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      overflow: "hidden",
      position: "relative"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        transform: `translateY(${shakeY}px)`
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: ROW_LEFT - 30,
          top: 928,
          width: ROW_W + 60,
          height: 6,
          background: G.bar,
          borderRadius: 3
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 240,
          width: 1680,
          top: titleTop,
          display: "flex",
          justifyContent: "center"
        },
        children: /* @__PURE__ */jsx2(TitleBlock, {
          text: __scCopy("CHAIN REACTION"),
          size: 120
        })
      }), [0, 1, 2, 3].map(i => /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: ROW_LEFT + i * (CARD_W + GAP),
          top: CARD_TOP,
          transform: `translateY(${cardDy(i)}px)${i === 3 ? ` rotate(${lastCardRot}deg)` : ""}`,
          transformOrigin: "50% 100%"
        },
        children: /* @__PURE__ */jsx2(Card, {
          w: CARD_W,
          h: CARD_H,
          seed: i + 2
        })
      }, i)), /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: 240,
          height: 1080,
          background: G.side,
          transform: `translateX(${sideX}px)`,
          padding: __scCopy("32px 24px"),
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 22
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "#777775"
          }
        }), Array.from({
          length: 8
        }).map((_, i) => /* @__PURE__ */jsx2("div", {
          style: {
            height: 13,
            width: `${58 + i * 31 % 38}%`,
            background: G.sideBar,
            borderRadius: 6
          }
        }, i))]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = DominoCascade;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
