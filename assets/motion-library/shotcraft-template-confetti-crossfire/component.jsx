// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx

var AMBER = __scConfig("demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx#AMBER", "AMBER", () => "#b45309");
var FIRE = __scConfig("demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx#FIRE", "FIRE", () => 16);
var DECAY = __scConfig("demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx#DECAY", "DECAY", () => 0.9);
var GRAV = __scConfig("demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx#GRAV", "GRAV", () => 1.5);
var frac = x => x - Math.floor(x);
var rnd = (i, salt) => frac(Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453);
var decaySum = age => (1 - Math.pow(DECAY, age)) / (1 - DECAY);
var makeGun = (originDeg, saltBase) => Array.from({
  length: 50
}).map((_, i) => {
  const ang = (originDeg + (rnd(i, saltBase) - 0.5) * 55) * Math.PI / 180;
  const speed = 70 + rnd(i, saltBase + 1) * 25;
  const grays = ["#6d6d6b", "#8f8f8d", "#4a4a48", "#b0b0ae"];
  return {
    vx: Math.cos(ang) * speed,
    vy: -Math.sin(ang) * speed,
    // 屏幕坐标向下为正，射向斜上
    w: 14 + rnd(i, saltBase + 2) * 12,
    h: 8 + rnd(i, saltBase + 3) * 8,
    spin: 8 + rnd(i, saltBase + 4) * 7,
    // 8–15°/f
    phase: rnd(i, saltBase + 5) * 360,
    amber: rnd(i, saltBase + 6) < 1 / 3,
    shade: grays[Math.floor(rnd(i, saltBase + 7) * 4)]
  };
});
var LEFT_GUN = __scConfig("demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx#LEFT_GUN", "LEFT_GUN", () => makeGun(60, 3));
var RIGHT_GUN = __scConfig("demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx#RIGHT_GUN", "RIGHT_GUN", () => makeGun(120, 9));
var LEFT_POS = __scConfig("demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx#LEFT_POS", "LEFT_POS", () => ({
  x: 140,
  y: 1040
}));
var RIGHT_POS = __scConfig("demos/data/particle-celebrate-hits/ConfettiCrossfire.tsx#RIGHT_POS", "RIGHT_POS", () => ({
  x: 1780,
  y: 1040
}));
var ConfettiCrossfire = () => {
  const frame = useCurrentFrame();
  const age = frame - FIRE;
  const cardScale = interpolate(frame, [0, 14], [0.6, 1], {
    easing: Easing.out(Easing.back(1.8)),
    extrapolateRight: "clamp"
  });
  const cardOp = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp"
  });
  const renderGun = (gun, origin, keyBase) => gun.map((c, i) => {
    if (age <= 0) return null;
    const s = decaySum(age);
    const x = origin.x + c.vx * s;
    const gDisp = GRAV * (age - (DECAY - Math.pow(DECAY, age + 1)) / (1 - DECAY)) / (1 - DECAY);
    const y = origin.y + c.vy * s + gDisp;
    if (y > 1140 || x < -80 || x > 2e3) return null;
    const rot = c.phase + c.spin * age;
    return /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: x,
        top: y,
        width: c.w,
        height: c.h,
        background: c.amber ? AMBER : c.shade,
        borderRadius: 2,
        // rotateX 造翻牌式 3D 翻转（宽度不变、高度压扁），再加平面 rotate
        transform: `rotate(${rot}deg) rotateX(${rot * 2.3}deg)`
      }
    }, `${keyBase}${i}`);
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
        text: __scCopy("CONFETTI CROSSFIRE"),
        size: 72
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 660,
        top: 400,
        width: 600,
        height: 320,
        background: G.card,
        border: `2px solid ${G.border}`,
        borderRadius: 16,
        boxSizing: "border-box",
        padding: 36,
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${cardScale})`,
        opacity: cardOp
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
          fontSize: 150,
          color: AMBER,
          letterSpacing: -3,
          lineHeight: 1.1,
          fontVariantNumeric: "tabular-nums"
        },
        children: __scCopy("98.5%")
      }), /* @__PURE__ */jsx2("div", {
        style: {
          height: 10,
          width: 150,
          background: G.line,
          borderRadius: 5
        }
      })]
    }), renderGun(LEFT_GUN, LEFT_POS, "L"), renderGun(RIGHT_GUN, RIGHT_POS, "R")]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ConfettiCrossfire;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
