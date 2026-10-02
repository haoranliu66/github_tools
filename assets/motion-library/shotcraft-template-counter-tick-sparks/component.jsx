// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/particle-celebrate-hits/CounterTickSparks.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/particle-celebrate-hits/CounterTickSparks.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/particle-celebrate-hits/CounterTickSparks.tsx

var AMBER = __scConfig("demos/data/particle-celebrate-hits/CounterTickSparks.tsx#AMBER", "AMBER", () => "#b45309");
var TARGET = __scConfig("demos/data/particle-celebrate-hits/CounterTickSparks.tsx#TARGET", "TARGET", () => 12847);
var COUNT_END = __scConfig("demos/data/particle-celebrate-hits/CounterTickSparks.tsx#COUNT_END", "COUNT_END", () => 78);
var easeOutCubic = t => 1 - Math.pow(1 - t, 3);
var valueAt = f => Math.round(TARGET * easeOutCubic(Math.min(Math.max(f / COUNT_END, 0), 1)));
var frac = x => x - Math.floor(x);
var rnd = (i, salt) => frac(Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453);
var TICKS = __scConfig("demos/data/particle-celebrate-hits/CounterTickSparks.tsx#TICKS", "TICKS", () => (() => {
  const out = [];
  let prev = 0;
  for (let f = 1; f <= COUNT_END; f++) {
    const v = valueAt(f);
    if (Math.floor(v / 1e3) > Math.floor(prev / 1e3)) out.push({
      f,
      big: false
    });
    prev = v;
  }
  out.push({
    f: COUNT_END,
    big: true
  });
  return out;
})());
var SPARK_LIFE = __scConfig("demos/data/particle-celebrate-hits/CounterTickSparks.tsx#SPARK_LIFE", "SPARK_LIFE", () => 18);
var GRAV = __scConfig("demos/data/particle-celebrate-hits/CounterTickSparks.tsx#GRAV", "GRAV", () => 0.9);
var CounterTickSparks = () => {
  const frame = useCurrentFrame();
  const value = valueAt(frame);
  const popScale = 1 + 0.1 * interpolate(frame, [COUNT_END, COUNT_END + 5, COUNT_END + 16], [0, 1, 0], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const TOP_Y = 452;
  const CX = 960;
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
        text: __scCopy("COUNTER TICK SPARKS"),
        size: 72
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 560,
        top: 400,
        width: 800,
        height: 330,
        background: G.card,
        border: `2px solid ${G.border}`,
        borderRadius: 16,
        boxSizing: "border-box",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 14,
          width: 220,
          background: G.bar,
          borderRadius: 7
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 800,
          fontSize: 168,
          color: G.ink,
          letterSpacing: -3,
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
          transform: `scale(${popScale})`
        },
        children: value.toLocaleString(__scCopy("en-US"))
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 10,
          width: 150,
          background: G.line,
          borderRadius: 5
        }
      })]
    }), TICKS.map((tick, t) => {
      const age = frame - tick.f;
      if (age <= 0 || age >= SPARK_LIFE) return null;
      const n = tick.big ? 20 : 6 + Math.floor(rnd(t, 21) * 5);
      return Array.from({
        length: n
      }).map((_, i) => {
        const salt = t * 31 + i;
        const vy = -(9 + rnd(salt, 2) * 4);
        const vx = (rnd(salt, 3) - 0.5) * (tick.big ? 13 : 9);
        const x0 = CX + (rnd(salt, 4) - 0.5) * (tick.big ? 560 : 380);
        const x = x0 + vx * age;
        const y = TOP_Y + vy * age + 0.5 * GRAV * age * age;
        const life = 1 - age / SPARK_LIFE;
        const size = (tick.big ? 7 : 5.5) * (0.4 + 0.6 * life);
        return /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: x,
            top: y,
            width: size,
            height: size,
            borderRadius: size / 2,
            background: AMBER,
            opacity: life,
            boxShadow: `0 0 ${6 * life}px ${AMBER}`
          }
        }, `${t}-${i}`);
      });
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CounterTickSparks;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
