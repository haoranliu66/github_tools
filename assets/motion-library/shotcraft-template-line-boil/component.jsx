// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/line-boil/LineBoil.tsx
import { useId } from "react";
import { useCurrentFrame, interpolate } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/line-boil/LineBoil.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/effects/line-boil/LineBoil.tsx

var BOIL_START = __scConfig("demos/effects/line-boil/LineBoil.tsx#BOIL_START", "BOIL_START", () => 35);
var BOIL_END = __scConfig("demos/effects/line-boil/LineBoil.tsx#BOIL_END", "BOIL_END", () => 105);
var BOIL_SCALE = __scConfig("demos/effects/line-boil/LineBoil.tsx#BOIL_SCALE", "BOIL_SCALE", () => 8);
var CornerTag = ({
  text,
  opacity
}) => /* @__PURE__ */jsx2("div", {
  style: {
    position: "absolute",
    right: 72,
    bottom: 56,
    padding: __scCopy("10px 22px"),
    border: `3px solid ${G.ink}`,
    borderRadius: 999,
    color: G.ink,
    background: G.bg,
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: 700,
    fontSize: 30,
    letterSpacing: 2,
    opacity
  },
  children: text
});
var LineBoil = () => {
  const f = useCurrentFrame();
  const boilId = `boil-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const boiling = f >= BOIL_START && f < BOIL_END;
  const seed = Math.floor(f / 3);
  const onOp = interpolate(f, [35, 40, 100, 105], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const offOp = 1 - onOp;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [boiling && /* @__PURE__ */jsx2("svg", {
      width: 0,
      height: 0,
      style: {
        position: "absolute"
      },
      children: /* @__PURE__ */jsx2("defs", {
        children: /* @__PURE__ */jsxs2("filter", {
          id: boilId,
          x: "-15%",
          y: "-15%",
          width: "130%",
          height: "130%",
          children: [/* @__PURE__ */jsx2("feTurbulence", {
            type: "fractalNoise",
            baseFrequency: 0.015,
            numOctaves: 2,
            seed,
            result: "noise"
          }), /* @__PURE__ */jsx2("feDisplacementMap", {
            in: "SourceGraphic",
            in2: "noise",
            scale: BOIL_SCALE,
            xChannelSelector: "R",
            yChannelSelector: "G"
          })]
        })
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 120,
        top: 96
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("LINE BOIL"),
        size: 54
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 56,
        filter: boiling ? `url(#${boilId})` : void 0
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 170,
          color: G.ink,
          letterSpacing: 4,
          lineHeight: 1
        },
        children: __scCopy("ALIVE")
      }), /* @__PURE__ */jsxs2("div", {
        style: {
          width: 520,
          height: 300,
          border: `3px solid ${G.ink}`,
          borderRadius: 20,
          boxSizing: "border-box",
          padding: __scCopy("36px 40px"),
          display: "flex",
          flexDirection: "column",
          gap: 26
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            height: 16,
            width: "62%",
            background: G.mid,
            borderRadius: 8
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 12,
            width: "88%",
            background: G.bar,
            borderRadius: 6
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 12,
            width: "74%",
            background: G.bar,
            borderRadius: 6
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            height: 12,
            width: "81%",
            background: G.bar,
            borderRadius: 6
          }
        }), /* @__PURE__ */jsxs2("div", {
          style: {
            marginTop: "auto",
            display: "flex",
            gap: 12,
            alignItems: "center"
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              width: 30,
              height: 30,
              borderRadius: 15,
              border: `3px solid ${G.ink}`,
              boxSizing: "border-box"
            }
          }), /* @__PURE__ */jsx2("div", {
            style: {
              height: 12,
              width: 120,
              background: G.mid,
              borderRadius: 6
            }
          })]
        })]
      })]
    }), /* @__PURE__ */jsx2(CornerTag, {
      text: __scCopy("boil on"),
      opacity: onOp
    }), /* @__PURE__ */jsx2(CornerTag, {
      text: __scCopy("boil off"),
      opacity: offOp
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = LineBoil;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
