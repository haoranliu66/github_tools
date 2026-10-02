// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/interaction/collab-cursor-moves/CursorDialogueDuet.tsx
import { useCurrentFrame, interpolate } from "remotion";
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
 var BLUE = __scConfig("demos/interaction/collab-cursor-moves/CursorDialogueDuet.tsx#BLUE", "BLUE", () => "#4C8DF6");
var GREEN = __scConfig("demos/interaction/collab-cursor-moves/CursorDialogueDuet.tsx#GREEN", "GREEN", () => "#2FBF71");
var DARK = __scConfig("demos/interaction/collab-cursor-moves/CursorDialogueDuet.tsx#DARK", "DARK", () => "#101012");
var easeOutCubic = t => 1 - Math.pow(1 - t, 3);
var easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
var easeInCubic = t => t * t * t;
var clamp01 = t => Math.min(1, Math.max(0, t));
var bez = (t, p0, c1, c2, p3) => {
  const u = 1 - t;
  const x = u * u * u * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * p3[0];
  const y = u * u * u * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * p3[1];
  return [x, y];
};
var Cursor = ({
  x,
  y,
  scale,
  color,
  name,
  badgeLit,
  badgeOpacity = 1
}) => /* @__PURE__ */jsxs("div", {
  style: {
    position: "absolute",
    left: x,
    top: y,
    transform: `scale(${scale})`,
    transformOrigin: "0 0"
  },
  children: [/* @__PURE__ */jsx("svg", {
    width: 42,
    height: 62,
    viewBox: "0 0 13.5 20",
    style: {
      display: "block",
      overflow: "visible"
    },
    children: /* @__PURE__ */jsx("path", {
      d: __scCopy("M0.5 0.5 L0.5 17.2 L4.7 13.4 L7.3 19.5 L10 18.3 L7.4 12.3 L13 12.3 Z"),
      fill: color,
      stroke: "#ffffff",
      strokeWidth: 1.1,
      strokeLinejoin: "round"
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 34,
      top: 56,
      whiteSpace: "nowrap",
      background: color,
      color: "#fff",
      borderRadius: 8,
      padding: __scCopy("5px 13px"),
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: 700,
      fontSize: 16,
      opacity: badgeOpacity * (0.28 + 0.72 * badgeLit),
      filter: `saturate(${0.35 + 0.65 * badgeLit})`,
      boxShadow: badgeLit > 0.6 ? `0 0 ${22 * badgeLit}px ${color}` : "none"
    },
    children: name
  })]
});
var CursorDialogueDuet = () => {
  const f = useCurrentFrame();
  const CX = 960;
  const CY = 520;
  const R = 270;
  let dx = 0;
  let dy = 0;
  {
    const t = easeOutCubic(clamp01(f / 24));
    [dx, dy] = bez(t, [-140, 260], [300, 300], [520, 620], [CX - R, CY]);
  }
  if (f > 26) {
    const t = easeInOutCubic(clamp01((f - 26) / 30));
    const [nx, ny] = bez(t, [CX - R, CY], [CX - R + 120, CY - 150], [CX - 90, CY - 120], [CX - 120, CY - 24]);
    dx = nx;
    dy = ny;
  }
  if (f > 60) {
    const t = easeInOutCubic(clamp01((f - 60) / 38));
    const a = Math.PI + t * Math.PI;
    dx = CX + Math.cos(a) * (R - 40) * (1 - t * 0.15) - 0;
    dy = CY + Math.sin(a) * (R - 110);
    if (t < 0.08) {
      const m = t / 0.08;
      dx = (CX - 120) * (1 - m) + dx * m;
      dy = (CY - 24) * (1 - m) + dy * m;
    }
  }
  if (f > 104) {
    const t = easeInCubic(clamp01((f - 104) / 24));
    dx = interpolate(t, [0, 1], [dx, -320]);
    dy = interpolate(t, [0, 1], [dy, 1240]);
  }
  let gx = 0;
  let gy = 0;
  {
    const t = easeOutCubic(clamp01((f - 4) / 24));
    [gx, gy] = bez(clamp01(t), [2080, 820], [1700, 760], [1420, 420], [CX + R, CY]);
  }
  if (f > 30) {
    const t = easeInOutCubic(clamp01((f - 30) / 28));
    const sway = Math.sin(t * Math.PI) * 70;
    gx = CX + R + sway * 0.6;
    gy = CY - Math.sin(t * Math.PI * 2) * 40;
  }
  if (f > 60) {
    const t = easeInOutCubic(clamp01((f - 60) / 38));
    const a = 0 + t * Math.PI;
    gx = CX + Math.cos(a) * (R - 40);
    gy = CY + Math.sin(a) * (R - 110);
  }
  const blow = easeInCubic(clamp01((f - 100) / 34));
  if (f > 100) {
    gx = interpolate(blow, [0, 1], [gx, -160]);
    gy = interpolate(blow, [0, 1], [gy, -140]);
  }
  const gScale = 2.8 + blow * 66;
  const handoff = easeInOutCubic(clamp01((f - 70) / 14));
  const dLit = f < 24 ? easeOutCubic(clamp01(f / 24)) : 1 - handoff;
  const gLit = handoff;
  const dBadgeIn = easeOutCubic(clamp01((f - 12) / 14));
  const gBadgeIn = easeOutCubic(clamp01((f - 18) / 14));
  const dPulse = f > 26 && f < 60 ? 1 + Math.sin((f - 26) * 0.5) * 0.05 : 1;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: 1920,
      height: 1080,
      background: DARK,
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 1100px 700px at 50% 48%, rgba(255,255,255,0.045), transparent 70%)`
      }
    }), f <= 132 && /* @__PURE__ */jsx(Cursor, {
      x: dx,
      y: dy,
      scale: 2.8 * dPulse,
      color: BLUE,
      name: __scCopy("Designer"),
      badgeLit: dLit,
      badgeOpacity: dBadgeIn * (f > 104 ? 1 - easeInCubic(clamp01((f - 104) / 18)) : 1)
    }), /* @__PURE__ */jsx(Cursor, {
      x: gx,
      y: gy,
      scale: gScale,
      color: GREEN,
      name: __scCopy("Developer"),
      badgeLit: gLit,
      badgeOpacity: gBadgeIn * (1 - clamp01((f - 102) / 12))
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CursorDialogueDuet;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
