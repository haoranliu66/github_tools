// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/outro/ui-to-brand-morph/IconFlipBloomLogo.tsx
import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring, useVideoConfig } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/outro/ui-to-brand-morph/IconFlipBloomLogo.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/outro/ui-to-brand-morph/IconFlipBloomLogo.tsx

var FONT = __scConfig("demos/outro/ui-to-brand-morph/IconFlipBloomLogo.tsx#FONT", "FONT", () => "Helvetica, Arial, sans-serif");
var INK = __scConfig("demos/outro/ui-to-brand-morph/IconFlipBloomLogo.tsx#INK", "INK", () => "#20808d");
var SmileLaptop = ({
  size
}) => /* @__PURE__ */jsxs2("svg", {
  width: size,
  height: size,
  viewBox: "0 0 40 40",
  children: [/* @__PURE__ */jsx2("rect", {
    x: 7,
    y: 6,
    width: 26,
    height: 20,
    rx: 3.5,
    fill: "#fff",
    stroke: G.ink,
    strokeWidth: 3
  }), /* @__PURE__ */jsx2("circle", {
    cx: 15.5,
    cy: 13.5,
    r: 2,
    fill: G.ink
  }), /* @__PURE__ */jsx2("circle", {
    cx: 24.5,
    cy: 13.5,
    r: 2,
    fill: G.ink
  }), /* @__PURE__ */jsx2("path", {
    d: __scCopy("M14 18.5 Q20 23.5 26 18.5"),
    stroke: G.ink,
    strokeWidth: 2.8,
    fill: "none",
    strokeLinecap: "round"
  }), /* @__PURE__ */jsx2("path", {
    d: __scCopy("M3.5 31.5 L36.5 31.5"),
    stroke: G.ink,
    strokeWidth: 3.6,
    strokeLinecap: "round"
  })]
});
var FlowerMark = ({
  size,
  bloom
}) => {
  const petals = 5;
  return /* @__PURE__ */jsxs2("svg", {
    width: size,
    height: size,
    viewBox: "-50 -50 100 100",
    children: [Array.from({
      length: petals
    }).map((_, i) => {
      const finalAngle = -90 + (i - (petals - 1) / 2) * (360 / petals);
      const angle = interpolate(bloom, [0, 1], [-90, finalAngle]);
      const len = interpolate(bloom, [0, 1], [20, 38]);
      const wid = interpolate(bloom, [0, 1], [3, 15]);
      return /* @__PURE__ */jsx2("ellipse", {
        cx: 0,
        cy: -len / 2,
        rx: wid / 2,
        ry: len / 2,
        fill: INK,
        opacity: 0.92,
        transform: `rotate(${angle + 90})`
      }, i);
    }), /* @__PURE__ */jsx2("circle", {
      r: interpolate(bloom, [0, 1], [2, 9]),
      fill: G.ink
    })]
  });
};
var WORD = __scConfig("demos/outro/ui-to-brand-morph/IconFlipBloomLogo.tsx#WORD", "WORD", () => __scCopy("perplexity"));
var IconFlipBloomLogo = () => {
  const frame = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  const FLIP_START = 34;
  const FLIP_MID = 46;
  const BLOOM_END = 62;
  const WORD_START = 66;
  const inT = spring({
    frame,
    fps,
    config: {
      damping: 13,
      stiffness: 140,
      mass: 0.8
    }
  });
  const wobble = interpolate(frame, [12, 18, 24, 30, FLIP_START], [0, -12, 14, -18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.sin)
  });
  const flipIn = interpolate(frame, [FLIP_START, FLIP_MID], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  });
  const iconScaleX = interpolate(flipIn, [0, 1], [1, 0.04]);
  const bloomSpring = spring({
    frame: frame - FLIP_MID,
    fps,
    config: {
      damping: 11,
      stiffness: 130,
      mass: 0.9
    }
  });
  const bloom = frame < FLIP_MID ? 0 : bloomSpring;
  const markScaleX = interpolate(bloom, [0, 1], [0.04, 1]);
  const shift = interpolate(frame, [WORD_START - 2, WORD_START + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const markX = interpolate(shift, [0, 1], [0, -420]);
  const showIcon = frame < FLIP_MID;
  const ghosts = frame >= FLIP_START && frame < FLIP_MID ? [0.12, 0.24] : [];
  return /* @__PURE__ */jsx2(AbsoluteFill, {
    style: {
      background: G.bg,
      alignItems: "center",
      justifyContent: "center"
    },
    children: /* @__PURE__ */jsxs2("div", {
      style: {
        position: "relative",
        width: 1920,
        height: 400,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 960 + markX,
          top: 200,
          transform: "translate(-50%, -50%)"
        },
        children: showIcon ? /* @__PURE__ */jsxs2(Fragment, {
          children: [ghosts.map((g, i) => {
            const gs = Math.min(1, iconScaleX + g);
            return /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) scaleX(${gs})`,
                opacity: 0.22 - i * 0.08,
                filter: "blur(6px)"
              },
              children: /* @__PURE__ */jsx2(SmileLaptop, {
                size: 340
              })
            }, i);
          }), /* @__PURE__ */jsx2("div", {
            style: {
              transform: `scale(${inT}) rotate(${wobble}deg) scaleX(${iconScaleX})`,
              transformOrigin: __scCopy("center 78%"),
              filter: flipIn > 0.3 ? `blur(${flipIn * 5}px)` : "none",
              opacity: inT
            },
            children: /* @__PURE__ */jsx2(SmileLaptop, {
              size: 340
            })
          })]
        }) : /* @__PURE__ */jsx2("div", {
          style: {
            transform: `scaleX(${markScaleX})`
          },
          children: /* @__PURE__ */jsx2(FlowerMark, {
            size: 340,
            bloom
          })
        })
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 960 + markX + 230,
          top: 200,
          transform: "translateY(-50%)",
          display: "flex",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 150,
          color: G.ink,
          letterSpacing: 2
        },
        children: WORD.split("").map((ch, i) => {
          const cT = interpolate(frame, [WORD_START + i * 2.2, WORD_START + i * 2.2 + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic)
          });
          return /* @__PURE__ */jsx2("span", {
            style: {
              display: "inline-block",
              opacity: cT,
              transform: `translateX(${(1 - cT) * -70}px)`,
              filter: `blur(${(1 - cT) * 16}px)`
            },
            children: ch
          }, i);
        })
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = IconFlipBloomLogo;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
