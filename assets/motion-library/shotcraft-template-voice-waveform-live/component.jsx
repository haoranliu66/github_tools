// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/voice-waveform-live/VoiceWaveformLive.tsx
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
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
var noiseAt = x => {
  const i = Math.floor(x);
  const fr = x - i;
  const a = mulberry32(i * 7919 + 13)();
  const b = mulberry32((i + 1) * 7919 + 13)();
  const s = fr * fr * (3 - 2 * fr);
  return a + (b - a) * s;
};
var envelope = t => {
  const seg = (a, b, rise = 5, fall = 7) => interpolate(t, [a, a + rise, b - fall, b], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const talk = Math.max(seg(15, 57), seg(80, 124));
  const syllable = 0.55 + 0.45 * noiseAt(t / 4.5 + 200);
  return talk * syllable;
};
var N_BARS = __scConfig("demos/interaction/voice-waveform-live/VoiceWaveformLive.tsx#N_BARS", "N_BARS", () => 64);
var VoiceWaveformLive = () => {
  const f = useCurrentFrame();
  const submitAt = 126;
  const submitted = f >= submitAt;
  const btnPress = interpolate(f, [submitAt, submitAt + 3, submitAt + 9], [1, 0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease)
  });
  const collapse = interpolate(f, [submitAt, submitAt + 12], [1, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.ease)
  });
  const capsuleScale = interpolate(f, [submitAt, submitAt + 20], [1, 0.96], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease)
  });
  const inOp = interpolate(f, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease)
  });
  const inScale = interpolate(f, [0, 14], [1.04, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const SCROLL = 1.6;
  const bars = Array.from({
    length: N_BARS
  }).map((_, i) => {
    const sampleT = f - (N_BARS - 1 - i) * SCROLL;
    const env = sampleT < 0 ? 0 : envelope(sampleT);
    const center = Math.pow(Math.sin(i / (N_BARS - 1) * Math.PI), 0.8);
    const jitter = 0.35 + 0.65 * noiseAt(sampleT * 1.7 + i * 0.13);
    const hRaw = env * center * jitter;
    const h = Math.max(5, hRaw * 235 * collapse);
    return h;
  });
  const nowEnv = envelope(f);
  const micGlow = submitted ? 0 : nowEnv;
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#08080a",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: -300,
        top: -200,
        width: 2600,
        height: 1700,
        background: "radial-gradient(closest-side, rgba(130,131,140,0.16), rgba(0,0,0,0) 70%)",
        transform: `translate(${f * 0.6}px, ${f * 0.25}px)`
      }
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */jsx("div", {
        style: {
          width: 1320,
          height: 300,
          borderRadius: 150,
          opacity: inOp,
          transform: `scale(${inScale * capsuleScale})`,
          background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.3))",
          padding: 2.5,
          boxSizing: "border-box"
        },
        children: /* @__PURE__ */jsxs("div", {
          style: {
            width: "100%",
            height: "100%",
            borderRadius: 148,
            background: "rgba(24,25,29,0.72)",
            backdropFilter: "blur(24px)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10), 0 40px 100px rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            gap: 36,
            padding: __scCopy("0 44px"),
            boxSizing: "border-box"
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 96,
              height: 96,
              borderRadius: 48,
              flexShrink: 0,
              background: `rgba(255,255,255,${0.08 + micGlow * 0.14})`,
              border: "2.5px solid rgba(255,255,255,0.28)",
              boxShadow: `0 0 ${28 * micGlow}px rgba(235,235,245,${micGlow * 0.5})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 46,
              filter: "grayscale(1)",
              boxSizing: "border-box"
            },
            children: __scCopy("\u{1F399}\uFE0F")
          }), /* @__PURE__ */jsx("div", {
            style: {
              flex: 1,
              height: 244,
              display: "flex",
              alignItems: "center",
              gap: 6,
              overflow: "hidden"
            },
            children: bars.map((h, i) => /* @__PURE__ */jsx("div", {
              style: {
                flex: 1,
                height: h,
                borderRadius: 4,
                background: `rgba(240,240,248,${0.4 + h / 235 * 0.6})`
              }
            }, i))
          }), /* @__PURE__ */jsx("div", {
            style: {
              width: 96,
              height: 96,
              borderRadius: 48,
              flexShrink: 0,
              background: submitted ? "#ffffff" : "rgba(255,255,255,0.92)",
              transform: `scale(${btnPress})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: submitted ? "0 0 60px rgba(255,255,255,0.55)" : "0 8px 24px rgba(0,0,0,0.4)"
            },
            children: /* @__PURE__ */jsx("svg", {
              width: "44",
              height: "44",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */jsx("path", {
                d: __scCopy("M12 20V5M12 5l-6.5 6.5M12 5l6.5 6.5"),
                stroke: "#111114",
                strokeWidth: "3",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                fill: "none"
              })
            })
          })]
        })
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = VoiceWaveformLive;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
