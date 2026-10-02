// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/marker-underline-title/MarkerUnderlineTitle.tsx
import { useId } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { jsx, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var buildStroke = (len, seed) => {
  const rand = mulberry32(seed);
  const N = 40;
  const top = [];
  const bot = [];
  const wob = Array.from({
    length: N + 1
  }, () => rand() - 0.5);
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const x = t * len;
    const mid = 19 - t * 9 + Math.sin(t * Math.PI * 1.6 + 0.4) * 2.6 + wob[i] * 1.6;
    const wBase = 14 + Math.sin(t * Math.PI) * 6 - Math.max(0, t - 0.86) * 46;
    const w = Math.max(2.2, wBase + wob[i] * 3);
    top.push(`${x.toFixed(1)},${(mid - w / 2).toFixed(1)}`);
    bot.push(`${x.toFixed(1)},${(mid + w / 2).toFixed(1)}`);
  }
  return `M${top.join("L")}L${bot.reverse().join("L")}Z`;
};
var MarkerUnderlineTitle = () => {
  const frame = useCurrentFrame();
  const revealId = `reveal-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const LEN = 252;
  const enter = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const eo = 1 - Math.pow(1 - enter, 3);
  const titleY = (1 - eo) * 36;
  const titleOp = Math.min(1, enter * 1.6);
  const draw = interpolate(frame, [32, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const drawE = 1 - Math.pow(1 - draw, 2.2);
  const path = buildStroke(LEN, 77);
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: "#f4f4f2",
      alignItems: "center",
      justifyContent: "center"
    },
    children: /* @__PURE__ */jsxs("div", {
      style: {
        opacity: titleOp,
        transform: `translateY(${titleY}px)`,
        fontFamily: '-apple-system, "Helvetica Neue", Arial, sans-serif',
        fontWeight: 700,
        fontSize: 118,
        color: "#191919",
        textAlign: "center",
        lineHeight: 1.12,
        letterSpacing: __scCopy("-0.02em")
      },
      children: [/* @__PURE__ */jsxs("div", {
        children: [__scCopy("Meet the"), " ", /* @__PURE__ */jsxs("span", {
          style: {
            fontStyle: "italic",
            position: "relative",
            display: "inline-block"
          },
          children: [__scCopy("new"), /* @__PURE__ */jsxs("svg", {
            width: LEN,
            height: 44,
            viewBox: `0 0 ${LEN} 44`,
            style: {
              position: "absolute",
              left: -12,
              bottom: -20,
              overflow: "visible"
            },
            children: [/* @__PURE__ */jsx("defs", {
              children: /* @__PURE__ */jsx("clipPath", {
                id: revealId,
                children: /* @__PURE__ */jsx("rect", {
                  x: 0,
                  y: -20,
                  width: drawE * (LEN + 6),
                  height: 60
                })
              })
            }), draw > 0 && /* @__PURE__ */jsx("path", {
              d: path,
              fill: "#111111",
              clipPath: `url(#${revealId})`
            })]
          })]
        })]
      }), /* @__PURE__ */jsx("div", {
        children: __scCopy("Notion AI")
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = MarkerUnderlineTitle;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
