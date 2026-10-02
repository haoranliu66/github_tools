// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/opening/icon-field-colorize/IconFieldColorize.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

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
var SHAPES = __scConfig("demos/opening/icon-field-colorize/IconFieldColorize.tsx#SHAPES", "SHAPES", () => [c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M12 21s-7.5-4.7-9.6-9C.9 8.7 2.7 5 6.2 5c2 0 3.3 1 4 2.1h3.6C14.5 6 15.8 5 17.8 5c3.5 0 5.3 3.7 3.8 7-2.1 4.3-9.6 9-9.6 9z"),
  transform: "scale(0.92) translate(1,0)"
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M12 2l2.7 6.3 6.8.5-5.2 4.4 1.6 6.6L12 16.2 6.1 19.8l1.6-6.6L2.5 8.8l6.8-.5z")
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M13 2L4 14h6l-1 8 9-12h-6z")
}), c => /* @__PURE__ */jsx("circle", {
  fill: c,
  cx: "12",
  cy: "12",
  r: "9"
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M9 3v12.3A3.5 3.5 0 1 0 11 18V7h7v6.3A3.5 3.5 0 1 0 20 16V3z"),
  transform: "scale(0.85) translate(1.5,1.5)"
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z"),
  transform: "scale(0.85) translate(2,2)"
}), c => /* @__PURE__ */jsxs(Fragment, {
  children: [/* @__PURE__ */jsx("rect", {
    fill: c,
    x: "3",
    y: "6",
    width: "18",
    height: "13",
    rx: "2.5"
  }), /* @__PURE__ */jsx("circle", {
    fill: "#fff",
    cx: "12",
    cy: "12.5",
    r: "3.6"
  }), /* @__PURE__ */jsx("rect", {
    fill: c,
    x: "8",
    y: "3.5",
    width: "8",
    height: "4",
    rx: "1.5"
  })]
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M6.5 19a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 17.8 8.7 4.2 4.2 0 0 1 17.5 19z")
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"),
  transform: "scale(0.9) translate(1.2,0.5)"
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M3.5 10L12 3l8.5 7V21h-6v-6h-5v6h-6z")
}), c => /* @__PURE__ */jsxs(Fragment, {
  children: [/* @__PURE__ */jsx("rect", {
    fill: c,
    x: "3",
    y: "8",
    width: "18",
    height: "4",
    rx: "1"
  }), /* @__PURE__ */jsx("rect", {
    fill: c,
    x: "5",
    y: "12",
    width: "14",
    height: "9",
    rx: "1"
  }), /* @__PURE__ */jsx("rect", {
    fill: "#fff",
    x: "10.9",
    y: "8",
    width: "2.2",
    height: "13"
  })]
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M9.4 20.6l-1 1.9 7.2-.1 4.9-8.5-2.2.1-2 3.4L13 4.5h-2.1L7.6 17.3z"),
  transform: "scale(0.9) translate(1,1)"
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M20.3 6.7L9.6 17.4l-5.9-5.9 2.1-2.1 3.8 3.8 8.6-8.6z")
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M21.5 15.5L14 12V5.5a2 2 0 1 0-4 0V12l-7.5 3.5v2l7.5-2v4l-2.5 2v1.5l4.5-1 4.5 1V21.5l-2.5-2v-4l7.5 2z"),
  transform: "scale(0.85) translate(1.8,1.8)"
}), c => /* @__PURE__ */jsxs(Fragment, {
  children: [/* @__PURE__ */jsx("circle", {
    fill: c,
    cx: "12",
    cy: "12",
    r: "4"
  }), /* @__PURE__ */jsx("path", {
    fill: c,
    d: __scCopy("M12 1.5l1.4 3.6h-2.8zM12 22.5l-1.4-3.6h2.8zM1.5 12l3.6-1.4v2.8zM22.5 12l-3.6 1.4v-2.8zM4.6 4.6l3.5 1.5-2 2zM19.4 19.4l-3.5-1.5 2-2zM19.4 4.6l-1.5 3.5-2-2zM4.6 19.4l1.5-3.5 2 2z")
  })]
}), c => /* @__PURE__ */jsx("path", {
  fill: c,
  d: __scCopy("M20 4C10 4 4.5 9 4 15.7 3.9 17.5 4 20 4 20s2.7-.2 4.4-.3C15 19.2 20 13.5 20 4zM6.8 17.2C10 11 15 8 15 8s-5.5 1.5-8.8 8z")
})]);
var COLS = __scConfig("demos/opening/icon-field-colorize/IconFieldColorize.tsx#COLS", "COLS", () => 17);
var ROWS = __scConfig("demos/opening/icon-field-colorize/IconFieldColorize.tsx#ROWS", "ROWS", () => 10);
var CELL = __scConfig("demos/opening/icon-field-colorize/IconFieldColorize.tsx#CELL", "CELL", () => 110);
var ICON = __scConfig("demos/opening/icon-field-colorize/IconFieldColorize.tsx#ICON", "ICON", () => 44);
var GRAYS = __scConfig("demos/opening/icon-field-colorize/IconFieldColorize.tsx#GRAYS", "GRAYS", () => ["#9a9a9a", "#7c7c7c", "#b0b0b0", "#8b8b8b"]);
var WAVES = __scConfig("demos/opening/icon-field-colorize/IconFieldColorize.tsx#WAVES", "WAVES", () => [{
  color: "#5b67e8",
  fromRow: 0,
  start: 78
}, {
  color: "#e7a03c",
  fromRow: 3,
  start: 90
}, {
  color: "#34a56f",
  fromRow: 6,
  start: 100
}, {
  color: "#e2606b",
  fromRow: 9,
  start: 110
}]);
var IconFieldColorize = () => {
  const frame = useCurrentFrame();
  const rand = mulberry32(20260718);
  const icons = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const r1 = rand(),
        r2 = rand(),
        r3 = rand();
      const batch = Math.floor(r1 * 10);
      const t0 = 4 + batch * 4 + r2 * 3;
      const ap = interpolate(frame, [t0, t0 + 8], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp"
      });
      if (ap <= 0) continue;
      const easeOut = 1 - Math.pow(1 - ap, 3);
      const appearScale = ap < 1 ? 0.55 + easeOut * 0.52 - Math.max(0, ap - 0.72) * 0.25 : 1;
      const gray = GRAYS[Math.floor(r2 * GRAYS.length)];
      let color = gray;
      let flipPhase = 0;
      for (const w of WAVES) {
        if (r < w.fromRow) continue;
        const arrive = w.start + (r - w.fromRow) * 1.4 + c * 0.25 + r3 * 1.5;
        const p = interpolate(frame, [arrive, arrive + 3], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp"
        });
        if (p > 0) {
          color = w.color;
          flipPhase = p;
        }
      }
      const flipPop = flipPhase > 0 && flipPhase < 1 ? 1 + Math.sin(flipPhase * Math.PI) * 0.22 : 1;
      const shape = SHAPES[Math.floor(r3 * SHAPES.length) % SHAPES.length];
      const x = 48 + c * CELL + r % 2 * 26;
      const y = 26 + r * CELL;
      icons.push(/* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: x,
          top: y,
          width: ICON,
          height: ICON,
          opacity: ap,
          transform: `scale(${appearScale * flipPop})`
        },
        children: /* @__PURE__ */jsx("svg", {
          viewBox: "0 0 24 24",
          width: ICON,
          height: ICON,
          children: shape(color)
        })
      }, `${r}-${c}`));
    }
  }
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: "#ffffff"
    },
    children: icons
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = IconFieldColorize;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
