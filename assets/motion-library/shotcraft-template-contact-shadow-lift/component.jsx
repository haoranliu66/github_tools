// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/element-body-moves/ContactShadowLift.tsx
import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/element-body-moves/ContactShadowLift.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/element-body-moves/ContactShadowLift.tsx

var outCubic = Easing.out(Easing.cubic);
var inCubic = Easing.in(Easing.cubic);
var LIFT_Y = __scConfig("demos/ui-entrance/element-body-moves/ContactShadowLift.tsx#LIFT_Y", "LIFT_Y", () => -28);
var LIFT_S = __scConfig("demos/ui-entrance/element-body-moves/ContactShadowLift.tsx#LIFT_S", "LIFT_S", () => 1.08);
var cardMotion = t => {
  const y = interpolate(t, [0, 10], [0, LIFT_Y], {
    easing: outCubic,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) + interpolate(t, [28, 36], [0, -LIFT_Y], {
    easing: inCubic,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  let s;
  if (t < 28) {
    s = interpolate(t, [0, 10], [1, LIFT_S], {
      easing: outCubic,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  } else if (t < 38) {
    s = interpolate(t, [28, 36], [LIFT_S, 0.99], {
      easing: inCubic,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  } else {
    s = interpolate(t, [38, 43], [0.99, 1], {
      easing: outCubic,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
  }
  const lift = interpolate(t, [0, 10], [0, 1], {
    easing: outCubic,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }) - interpolate(t, [28, 36], [0, 1], {
    easing: inCubic,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return {
    y,
    s,
    lift
  };
};
var CARD_W = __scConfig("demos/ui-entrance/element-body-moves/ContactShadowLift.tsx#CARD_W", "CARD_W", () => 360);
var CARD_H = __scConfig("demos/ui-entrance/element-body-moves/ContactShadowLift.tsx#CARD_H", "CARD_H", () => 220);
var GAP = __scConfig("demos/ui-entrance/element-body-moves/ContactShadowLift.tsx#GAP", "GAP", () => 120);
var STARTS = __scConfig("demos/ui-entrance/element-body-moves/ContactShadowLift.tsx#STARTS", "STARTS", () => [2, 42, 82]);
var ContactShadowLift = () => {
  const frame = useCurrentFrame();
  const rowW = CARD_W * 3 + GAP * 2;
  const left0 = (1920 - rowW) / 2;
  const top = (1080 - CARD_H) / 2 - 20;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 84,
        background: G.panel,
        borderBottom: `2px solid ${G.line}`,
        display: "flex",
        alignItems: "center",
        padding: __scCopy("0 48px"),
        gap: 24,
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 10,
          background: G.side
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 18,
          width: 220,
          background: G.bar,
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          marginLeft: "auto",
          width: 36,
          height: 36,
          borderRadius: 18,
          background: G.mid
        }
      })]
    }), [0, 1, 2].map(i => {
      const t = frame - STARTS[i];
      const {
        y,
        s,
        lift
      } = cardMotion(t);
      const x = left0 + i * (CARD_W + GAP);
      const shScale = 1 + 0.72 * lift;
      const shOpacity = 0.55 - 0.37 * lift;
      const shW = CARD_W * 0.88;
      const shH = 44;
      return /* @__PURE__ */jsxs2(React.Fragment, {
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: x + (CARD_W - shW) / 2,
            top: top + CARD_H - shH / 2 - 4,
            width: shW,
            height: shH,
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 42%, rgba(0,0,0,0) 72%)",
            transform: `scale(${shScale})`,
            opacity: shOpacity
          }
        }), /* @__PURE__ */jsx2(Card, {
          w: CARD_W,
          h: CARD_H,
          seed: i + 2,
          style: {
            position: "absolute",
            left: x,
            top,
            boxShadow: "none",
            transform: `translateY(${y}px) scale(${s})`
          }
        })]
      }, i);
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ContactShadowLift;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
