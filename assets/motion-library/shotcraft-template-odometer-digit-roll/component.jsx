// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/odometer-digit-roll/OdometerDigitRoll.tsx
import { useCurrentFrame, interpolate, interpolateColors, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/odometer-digit-roll/OdometerDigitRoll.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/data/odometer-digit-roll/OdometerDigitRoll.tsx

var ROW = __scConfig("demos/data/odometer-digit-roll/OdometerDigitRoll.tsx#ROW", "ROW", () => 210);
var DW = __scConfig("demos/data/odometer-digit-roll/OdometerDigitRoll.tsx#DW", "DW", () => 126);
var FS = __scConfig("demos/data/odometer-digit-roll/OdometerDigitRoll.tsx#FS", "FS", () => 190);
var SPIN = __scConfig("demos/data/odometer-digit-roll/OdometerDigitRoll.tsx#SPIN", "SPIN", () => 0.85);
var DIGITS = __scConfig("demos/data/odometer-digit-roll/OdometerDigitRoll.tsx#DIGITS", "DIGITS", () => [9, 9, 9, 8]);
var posAt = (f, i) => {
  const d = DIGITS[i];
  const s = 20 + i * 7;
  const p0 = SPIN * s;
  const T = Math.ceil((p0 + 6 - d) / 10) * 10 + d;
  if (f < s) return SPIN * Math.max(f, 0);
  if (f < s + 16) return interpolate(f, [s, s + 16], [p0, T + 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  if (f < s + 22) return interpolate(f, [s + 16, s + 22], [T + 0.5, T], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  return T;
};
var Strip = ({
  pos,
  color,
  opacity = 1,
  dy = 0
}) => /* @__PURE__ */jsx2("div", {
  style: {
    position: "absolute",
    left: 0,
    top: 0,
    width: DW,
    transform: `translateY(${-(pos % 10) * ROW + dy}px)`,
    opacity
  },
  children: Array.from({
    length: 20
  }).map((_, k) => /* @__PURE__ */jsx2("div", {
    style: {
      width: DW,
      height: ROW,
      lineHeight: `${ROW}px`,
      textAlign: "center",
      fontSize: FS,
      fontWeight: 800,
      fontVariantNumeric: "tabular-nums",
      color
    },
    children: k % 10
  }, k))
});
var DigitReel = ({
  frame,
  i,
  color
}) => {
  const pos = posAt(frame, i);
  const speed = Math.abs(pos - posAt(frame - 1, i));
  const gate = interpolate(speed, [0.06, 0.5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2("div", {
    style: {
      position: "relative",
      width: DW,
      height: ROW,
      overflow: "hidden"
    },
    children: [gate > 1e-3 && /* @__PURE__ */jsxs2(Fragment, {
      children: [/* @__PURE__ */jsx2(Strip, {
        pos,
        color,
        opacity: 0.25 * gate,
        dy: ROW * 0.5
      }), /* @__PURE__ */jsx2(Strip, {
        pos,
        color,
        opacity: 0.12 * gate,
        dy: -ROW * 0.5
      })]
    }), /* @__PURE__ */jsx2(Strip, {
      pos,
      color
    })]
  });
};
var StaticGlyph = ({
  ch,
  color,
  w
}) => /* @__PURE__ */jsx2("div", {
  style: {
    width: w,
    height: ROW,
    lineHeight: `${ROW}px`,
    textAlign: "center",
    fontSize: FS,
    fontWeight: 800,
    fontVariantNumeric: "tabular-nums",
    color
  },
  children: ch
});
var OdometerDigitRoll = () => {
  const frame = useCurrentFrame();
  const inkNow = interpolateColors(frame, [63, 67, 71], [G.ink, "#000000", G.ink]);
  const pulseScale = interpolate(frame, [63, 67, 71], [1, 1.035, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const labelOp = interpolate(frame, [66, 84], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
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
        left: 120,
        top: 96
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("ODOMETER DIGIT ROLL"),
        size: 54
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 400,
        width: 1920,
        display: "flex",
        justifyContent: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        transform: `scale(${pulseScale})`,
        transformOrigin: __scCopy("960px 105px")
      },
      children: [/* @__PURE__ */jsx2(DigitReel, {
        frame,
        i: 0,
        color: inkNow
      }), /* @__PURE__ */jsx2(DigitReel, {
        frame,
        i: 1,
        color: inkNow
      }), /* @__PURE__ */jsx2(StaticGlyph, {
        ch: ".",
        color: inkNow,
        w: 70
      }), /* @__PURE__ */jsx2(DigitReel, {
        frame,
        i: 2,
        color: inkNow
      }), /* @__PURE__ */jsx2(DigitReel, {
        frame,
        i: 3,
        color: inkNow
      }), /* @__PURE__ */jsx2(StaticGlyph, {
        ch: "%",
        color: inkNow
      })]
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 680,
        width: 1920,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity: labelOp
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 520,
          height: 22,
          background: G.bar,
          borderRadius: 11
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          width: 320,
          height: 14,
          background: G.line,
          borderRadius: 7
        }
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = OdometerDigitRoll;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
