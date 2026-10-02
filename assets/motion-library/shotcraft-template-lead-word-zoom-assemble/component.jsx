// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx
import { Fragment, useEffect, useRef, useState } from "react";
import { AbsoluteFill, continueRender, delayRender, Easing, getRemotionEnvironment, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
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
 var LEAD_WORD_ZOOM_ASSEMBLE_DURATION = 84;
var TEXT = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#TEXT", "TEXT", () => __scCopy("Introducing Lumen Deck"));
var HIGHLIGHT_WORD = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#HIGHLIGHT_WORD", "HIGHLIGHT_WORD", () => __scCopy("Lumen"));
var FONT_SIZE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#FONT_SIZE", "FONT_SIZE", () => 96);
var INITIAL_SCALE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#INITIAL_SCALE", "INITIAL_SCALE", () => 2.3);
var INTRO_DURATION = 6;
var HOLD_DURATION = 12;
var PUSH_SCALE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#PUSH_SCALE", "PUSH_SCALE", () => 1.06);
var RECEDE_DURATION = 12;
var ASSEMBLE_DURATION = 24;
var WORD_DELAY = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#WORD_DELAY", "WORD_DELAY", () => 6);
var WORD_STAGGER = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#WORD_STAGGER", "WORD_STAGGER", () => 4);
var WORD_DURATION = 12;
var WORD_PUSH = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#WORD_PUSH", "WORD_PUSH", () => 0.5);
var WORD_FADE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#WORD_FADE", "WORD_FADE", () => 2);
var LETTER_SPACING = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#LETTER_SPACING", "LETTER_SPACING", () => __scCopy("-0.03em"));
var LIFT = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#LIFT", "LIFT", () => [34, 50]);
var LIFT_DISTANCE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#LIFT_DISTANCE", "LIFT_DISTANCE", () => -56);
var SUBLINE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#SUBLINE", "SUBLINE", () => __scCopy("One shot card, one motion recipe \u2014 copy, paste, render."));
var CRASH_FRAMES = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#CRASH_FRAMES", "CRASH_FRAMES", () => 12);
var CRASH_SCALE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#CRASH_SCALE", "CRASH_SCALE", () => 0.2);
var CRASH_BLUR = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#CRASH_BLUR", "CRASH_BLUR", () => 9);
var INK = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#INK", "INK", () => "#1d1d1f");
var INK_DIM = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#INK_DIM", "INK_DIM", () => "#7a7a7a");
var ACCENT = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#ACCENT", "ACCENT", () => "#7A5AF8");
var SANS = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#SANS", "SANS", () => '-apple-system, "PingFang SC", BlinkMacSystemFont, sans-serif');
var MESH_BG = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#MESH_BG", "MESH_BG", () => "radial-gradient(52% 44% at 18% 22%, rgba(122,90,248,0.20) 0%, rgba(122,90,248,0) 70%),radial-gradient(46% 42% at 84% 18%, rgba(255,138,178,0.20) 0%, rgba(255,138,178,0) 70%),radial-gradient(58% 50% at 78% 84%, rgba(96,190,255,0.20) 0%, rgba(96,190,255,0) 70%),radial-gradient(50% 46% at 24% 88%, rgba(255,196,112,0.20) 0%, rgba(255,196,112,0) 70%),linear-gradient(180deg, #f7f6f9 0%, #f2f1f5 100%)");
var PUSH_EASE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#PUSH_EASE", "PUSH_EASE", () => Easing.bezier(0.25, 1, 0.5, 1));
var ZOOM_EASE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#ZOOM_EASE", "ZOOM_EASE", () => Easing.bezier(0.5, 0, 0.05, 1));
var WORD_EASE = __scConfig("demos/typography/lead-word-zoom-assemble/LeadWordZoomAssemble.tsx#WORD_EASE", "WORD_EASE", () => Easing.bezier(0.22, 0.8, 0.36, 1));
var TextReveal = () => {
  const frame = useCurrentFrame();
  const {
    width
  } = useVideoConfig();
  const lineRef = useRef(null);
  const leadRef = useRef(null);
  const baselineRef = useRef(null);
  const [handle] = useState(() => delayRender("lead-word-zoom-assemble: measure line"));
  const [metrics, setMetrics] = useState(null);
  useEffect(() => {
    const line = lineRef.current;
    const lead = leadRef.current;
    if (!line || !lead) {
      continueRender(handle);
      return;
    }
    setMetrics({
      lineWidth: line.offsetWidth,
      leadRatio: (lead.offsetLeft + lead.offsetWidth / 2) / line.offsetWidth,
      baseline: baselineRef.current?.offsetTop ?? line.offsetHeight * 0.8
    });
  }, [handle]);
  useEffect(() => {
    if (metrics) continueRender(handle);
  }, [metrics, handle]);
  const words = TEXT.split(" ").filter(Boolean);
  const ready = metrics !== null;
  const leadRatio = metrics?.leadRatio ?? 0.14;
  const lineWidth = metrics?.lineWidth ?? width * 0.5;
  const baseline = metrics?.baseline ?? FONT_SIZE * 0.88;
  const zoomStart = HOLD_DURATION;
  const slideDistance = lineWidth * (0.5 - leadRatio);
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      alignItems: "center",
      justifyContent: "center"
    },
    children: /* @__PURE__ */jsxs("span", {
      ref: lineRef,
      style: {
        position: "relative",
        display: "inline-block",
        fontSize: FONT_SIZE,
        fontWeight: 600,
        color: INK,
        letterSpacing: LETTER_SPACING,
        lineHeight: 1.1,
        whiteSpace: "nowrap",
        fontFamily: SANS,
        transformOrigin: `${leadRatio * 100}% ${baseline}px`,
        scale: interpolate(frame, [0, HOLD_DURATION], [INITIAL_SCALE, INITIAL_SCALE * PUSH_SCALE], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: PUSH_EASE
        }) + interpolate(frame, [zoomStart, zoomStart + RECEDE_DURATION], [0, 1 - INITIAL_SCALE * PUSH_SCALE], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ZOOM_EASE
        }),
        translate: `${interpolate(frame, [zoomStart, zoomStart + ASSEMBLE_DURATION], [slideDistance, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: ZOOM_EASE
        })}px`,
        opacity: ready ? 1 : 0,
        textRendering: __scCopy("geometricPrecision"),
        ...(getRemotionEnvironment().isRendering ? null : {
          willChange: "transform"
        })
      },
      children: [words.map((word, i) => {
        const isLead = i === 0;
        const pushStart = zoomStart + WORD_DELAY + (i - 1) * WORD_STAGGER;
        const opacity = isLead ? interpolate(frame, [0, INTRO_DURATION], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        }) : interpolate(frame, [pushStart, pushStart + WORD_FADE], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        return /* @__PURE__ */jsxs(Fragment, {
          children: [/* @__PURE__ */jsx("span", {
            ref: isLead ? leadRef : void 0,
            style: {
              display: "inline-block",
              opacity,
              color: word === HIGHLIGHT_WORD ? ACCENT : void 0,
              translate: isLead ? void 0 : `${interpolate(frame, [pushStart, pushStart + WORD_DURATION], [WORD_PUSH * FONT_SIZE, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: WORD_EASE
              })}px`
            },
            children: word
          }), i < words.length - 1 ? " " : null]
        }, i);
      }), /* @__PURE__ */jsx("span", {
        ref: baselineRef,
        style: {
          display: "inline-block",
          width: 0,
          height: 0
        }
      })]
    })
  });
};
var LeadWordZoomAssemble = () => {
  const frame = useCurrentFrame();
  const {
    durationInFrames
  } = useVideoConfig();
  const lift = interpolate(frame, LIFT, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const crash = interpolate(frame, [durationInFrames - CRASH_FRAMES, durationInFrames - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad)
  });
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: MESH_BG,
      fontFamily: SANS
    },
    children: /* @__PURE__ */jsxs(AbsoluteFill, {
      style: {
        transform: `scale(${1 + crash * CRASH_SCALE})`,
        filter: crash > 0.01 ? `blur(${crash * CRASH_BLUR}px)` : void 0,
        opacity: 1 - crash * 0.55
      },
      children: [/* @__PURE__ */jsx(AbsoluteFill, {
        style: {
          transform: `translateY(${lift * LIFT_DISTANCE}px)`
        },
        children: /* @__PURE__ */jsx(TextReveal, {})
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          marginTop: 62,
          textAlign: "center",
          fontSize: 32,
          color: INK_DIM,
          opacity: lift,
          transform: `translateY(${(1 - lift) * 16}px)`
        },
        children: SUBLINE
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = LeadWordZoomAssemble;
 return {component:template_entry_default,duration:LEAD_WORD_ZOOM_ASSEMBLE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
