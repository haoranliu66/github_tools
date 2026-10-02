// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx

var CARD_W = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#CARD_W", "CARD_W", () => 560);
var CARD_H = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#CARD_H", "CARD_H", () => 350);
var CX = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#CX", "CX", () => (1920 - CARD_W) / 2);
var CY = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#CY", "CY", () => (1080 - CARD_H) / 2 + 40);
var FLOAT_START = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#FLOAT_START", "FLOAT_START", () => 12);
var FLOAT_END = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#FLOAT_END", "FLOAT_END", () => 38);
var SLAP1 = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#SLAP1", "SLAP1", () => 58);
var SLAP2 = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#SLAP2", "SLAP2", () => 82);
var APPROACH = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#APPROACH", "APPROACH", () => 6);
var FREEZE = __scConfig("demos/ui-entrance/paper-craft-moves/MaskingTapeSlap.tsx#FREEZE", "FREEZE", () => 2);
var amp = f => {
  const rise = interpolate(f, [FLOAT_END, FLOAT_END + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const damp = interpolate(f, [SLAP1, SLAP1 + 4], [1, 0.45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return rise * damp;
};
var rawRot = f => amp(f) * 1.5 * Math.sin((f - FLOAT_END) * 0.16);
var rawBob = f => amp(f) * 5 * Math.sin((f - FLOAT_END) * 0.11);
var frozen = (f, raw) => f <= SLAP2 ? raw(f) : interpolate(f, [SLAP2, SLAP2 + FREEZE], [raw(SLAP2), 0], {
  extrapolateRight: "clamp"
});
var Tape = ({
  frame,
  land,
  cx,
  cy,
  rot,
  fromX,
  fromY
}) => {
  if (frame < land - APPROACH) return null;
  const t = interpolate(frame, [land - APPROACH, land], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const scale = interpolate(t, [0, 1], [1.45, 1]);
  const dx = fromX * (1 - t);
  const dy = fromY * (1 - t);
  const opacity = interpolate(frame, [land - APPROACH, land - APPROACH + 2], [0, 0.85], {
    extrapolateRight: "clamp"
  });
  const r = interpolate(frame, [land - APPROACH, land, land + 4], [rot - 16, rot + 7, rot], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const sy = frame === land ? 0.72 : frame === land + 1 ? 0.9 : 1;
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: cx - 160,
      top: cy - 34,
      width: 320,
      height: 68,
      transform: `translate(${dx}px, ${dy}px) rotate(${r}deg) scale(${scale}) scaleY(${sy})`,
      transformOrigin: "50% 50%",
      opacity,
      background: "linear-gradient(90deg, rgba(214,212,206,0.95) 0%, rgba(226,224,218,0.95) 30%, rgba(212,210,204,0.95) 60%, rgba(222,220,214,0.95) 100%)",
      // 撕边：两端锯齿
      clipPath: "polygon(0% 8%, 2.5% 0%, 97% 3%, 100% 12%, 98.2% 30%, 100% 52%, 98% 74%, 100% 90%, 96.5% 100%, 3% 97%, 0% 88%, 1.8% 64%, 0% 42%, 2% 22%)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.15)"
    }
  });
};
var MaskingTapeSlap = () => {
  const frame = useCurrentFrame();
  const floatY = interpolate(frame, [FLOAT_START, FLOAT_END], [-120, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const floatOp = interpolate(frame, [FLOAT_START, FLOAT_START + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rot = frozen(frame, rawRot);
  const bob = frozen(frame, rawBob);
  const sink = interpolate(frame, [SLAP2, SLAP2 + FREEZE], [0, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const shOff = interpolate(frame, [SLAP2, SLAP2 + FREEZE], [16, 3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const shBlur = interpolate(frame, [SLAP2, SLAP2 + FREEZE], [34, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const shAlpha = interpolate(frame, [SLAP2, SLAP2 + FREEZE], [0.22, 0.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
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
        top: 110,
        width: "100%",
        textAlign: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("MASKING TAPE SLAP"),
        size: 72
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: CX,
        top: CY,
        transform: `translateY(${floatY + bob + sink}px) rotate(${rot}deg)`,
        transformOrigin: "50% 50%",
        opacity: floatOp
      },
      children: /* @__PURE__ */jsx2(Card, {
        w: CARD_W,
        h: CARD_H,
        seed: 3,
        style: {
          boxShadow: `0 ${shOff}px ${shBlur}px rgba(0,0,0,${shAlpha})`
        }
      })
    }), /* @__PURE__ */jsx2(Tape, {
      frame,
      land: SLAP1,
      cx: CX + 55,
      cy: CY + 40,
      rot: -45,
      fromX: -170,
      fromY: -130
    }), /* @__PURE__ */jsx2(Tape, {
      frame,
      land: SLAP2,
      cx: CX + CARD_W - 55,
      cy: CY + CARD_H - 40,
      rot: -45,
      fromX: 170,
      fromY: 130
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = MaskingTapeSlap;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
