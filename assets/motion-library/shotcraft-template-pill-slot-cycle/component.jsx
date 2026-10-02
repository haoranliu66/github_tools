// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/pill-slot-cycle/PillSlotCycle.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/pill-slot-cycle/PillSlotCycle.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/typography/pill-slot-cycle/PillSlotCycle.tsx

var FONT = __scConfig("demos/typography/pill-slot-cycle/PillSlotCycle.tsx#FONT", "FONT", () => "Helvetica, Arial, sans-serif");
var PILLS = __scConfig("demos/typography/pill-slot-cycle/PillSlotCycle.tsx#PILLS", "PILLS", () => [{
  label: __scCopy("Ask a question"),
  icon: "?"
}, {
  label: __scCopy("Find in Drive"),
  icon: "\u25B2"
}, {
  label: __scCopy("Find in Slack"),
  icon: "#"
}, {
  label: __scCopy("Summarize"),
  icon: "\u2261"
}, {
  label: __scCopy("Improve writing"),
  icon: "\u270E"
}, {
  label: __scCopy("Draft an agenda"),
  icon: "\u2630"
}]);
var BEAT = __scConfig("demos/typography/pill-slot-cycle/PillSlotCycle.tsx#BEAT", "BEAT", () => 21);
var INTRO = __scConfig("demos/typography/pill-slot-cycle/PillSlotCycle.tsx#INTRO", "INTRO", () => 12);
var CYCLES = __scConfig("demos/typography/pill-slot-cycle/PillSlotCycle.tsx#CYCLES", "CYCLES", () => PILLS.length);
var Pill = ({
  label,
  icon,
  style
}) => /* @__PURE__ */jsxs2("div", {
  style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 16,
    padding: __scCopy("14px 36px 14px 24px"),
    borderRadius: 999,
    background: "#fff",
    border: `3px solid ${G.border}`,
    boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
    fontFamily: FONT,
    fontWeight: 700,
    fontSize: 64,
    color: G.ink,
    whiteSpace: "nowrap",
    ...style
  },
  children: [/* @__PURE__ */jsx2("span", {
    style: {
      width: 58,
      height: 58,
      borderRadius: 14,
      background: G.bg,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 38,
      color: G.mid,
      flexShrink: 0
    },
    children: icon
  }), label]
});
var PillSlotCycle = () => {
  const frame = useCurrentFrame();
  const stemT = interpolate(frame, [0, INTRO], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const cycleStart = INTRO;
  const cycleEnd = cycleStart + CYCLES * BEAT;
  const rel = frame - cycleStart;
  const idx = Math.min(Math.floor(rel / BEAT), CYCLES - 1);
  const beatFrame = rel - idx * BEAT;
  const SWAP = 8;
  const isFinale = frame >= cycleEnd;
  const finT = interpolate(frame, [cycleEnd, cycleEnd + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4))
  });
  let slot = null;
  if (!isFinale && rel >= 0) {
    const incoming = PILLS[idx];
    const outgoing = idx > 0 ? PILLS[idx - 1] : null;
    const inT = interpolate(beatFrame, [0, SWAP], [0, 1], {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic)
    });
    const inY = interpolate(inT, [0, 1], [120, 0]);
    const inBlur = interpolate(inT, [0, 0.7, 1], [14, 4, 0]);
    const outT = interpolate(beatFrame, [0, SWAP - 1], [0, 1], {
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic)
    });
    const outY = interpolate(outT, [0, 1], [0, -130]);
    slot = /* @__PURE__ */jsxs2("div", {
      style: {
        position: "relative",
        display: "inline-block"
      },
      children: [/* @__PURE__ */jsx2(Pill, {
        label: incoming.label,
        icon: incoming.icon,
        style: {
          visibility: "hidden"
        }
      }), outgoing && outT < 1 && /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translateY(${outY}px)`,
          opacity: 1 - outT,
          filter: `blur(${outT * 10}px)`
        },
        children: /* @__PURE__ */jsx2(Pill, {
          label: outgoing.label,
          icon: outgoing.icon
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          transform: `translateY(${inY}px)`,
          opacity: idx === 0 ? inT : Math.min(1, inT * 1.6),
          filter: `blur(${inBlur}px)`
        },
        children: /* @__PURE__ */jsx2(Pill, {
          label: incoming.label,
          icon: incoming.icon
        })
      })]
    });
  } else if (isFinale) {
    const lastOutT = interpolate(frame, [cycleEnd, cycleEnd + 7], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.in(Easing.cubic)
    });
    slot = /* @__PURE__ */jsxs2("div", {
      style: {
        position: "relative",
        display: "inline-block"
      },
      children: [/* @__PURE__ */jsx2("span", {
        style: {
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 96,
          color: G.ink,
          letterSpacing: -1,
          display: "inline-block",
          opacity: finT,
          transform: `translateY(${(1 - finT) * 90}px)`,
          filter: `blur(${(1 - finT) * 8}px)`,
          whiteSpace: "nowrap"
        },
        children: __scCopy("do it all.")
      }), lastOutT < 1 && /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: -8,
          transform: `translateY(${-130 * lastOutT}px)`,
          opacity: 1 - lastOutT,
          filter: `blur(${lastOutT * 10}px)`
        },
        children: /* @__PURE__ */jsx2(Pill, {
          label: PILLS[CYCLES - 1].label,
          icon: PILLS[CYCLES - 1].icon
        })
      })]
    });
  }
  return /* @__PURE__ */jsx2(AbsoluteFill, {
    style: {
      background: G.bg
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 300,
        top: 540,
        transform: `translateY(calc(-50% + ${(1 - stemT) * 50}px))`,
        display: "flex",
        alignItems: "center",
        gap: 36,
        opacity: stemT
      },
      children: [/* @__PURE__ */jsx2("span", {
        style: {
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 96,
          color: G.ink,
          letterSpacing: -1,
          whiteSpace: "nowrap"
        },
        children: __scCopy("One AI tool to")
      }), slot]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PillSlotCycle;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
