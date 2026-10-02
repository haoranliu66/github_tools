// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/scroll-brake-moves/BrakeReticleLock.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/scroll-brake-moves/BrakeReticleLock.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/data/scroll-brake-moves/BrakeReticleLock.tsx

var SCROLL_START = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#SCROLL_START", "SCROLL_START", () => 12);
var BRAKE = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#BRAKE", "BRAKE", () => 59);
var DUR = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#DUR", "DUR", () => 150);
var PITCH = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#PITCH", "PITCH", () => 156);
var ROW_H = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#ROW_H", "ROW_H", () => 120);
var TARGET_ROW = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#TARGET_ROW", "TARGET_ROW", () => 30);
var FINAL_SCROLL = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#FINAL_SCROLL", "FINAL_SCROLL", () => TARGET_ROW * PITCH - 480);
var LIST_X = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#LIST_X", "LIST_X", () => 360);
var LIST_W = __scConfig("demos/data/scroll-brake-moves/BrakeReticleLock.tsx#LIST_W", "LIST_W", () => 1200);
var scrollAt = f => {
  if (f <= SCROLL_START) return 0;
  if (f <= 50) {
    return interpolate(f, [SCROLL_START, 50], [0, FINAL_SCROLL - 430], {
      easing: Easing.in(Easing.sin)
    });
  }
  if (f <= BRAKE) {
    return interpolate(f, [50, BRAKE], [FINAL_SCROLL - 430, FINAL_SCROLL + 30], {
      easing: Easing.out(Easing.cubic)
    });
  }
  return interpolate(f, [BRAKE, BRAKE + 4], [FINAL_SCROLL + 30, FINAL_SCROLL], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
};
var Row = ({
  i,
  highlight
}) => /* @__PURE__ */jsxs2("div", {
  style: {
    position: "absolute",
    top: i * PITCH,
    left: 0,
    width: LIST_W,
    height: ROW_H,
    background: highlight > 0 ? "#ffffff" : G.card,
    border: `${highlight > 0 ? 3 : 2}px solid ${highlight > 0 ? G.ink : G.border}`,
    borderRadius: 14,
    display: "flex",
    alignItems: "center",
    gap: 24,
    padding: __scCopy("0 28px"),
    boxSizing: "border-box",
    boxShadow: highlight > 0 ? `0 10px 34px rgba(0,0,0,${0.2 * highlight})` : "none"
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: G.mid
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      height: 14,
      width: `${28 + i * 31 % 34}%`,
      background: G.bar,
      borderRadius: 7
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      height: 10,
      width: `${12 + i * 17 % 18}%`,
      background: G.line,
      borderRadius: 5
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      marginLeft: "auto",
      height: 12,
      width: 120,
      background: G.line,
      borderRadius: 6
    }
  })]
});
var Corner = ({
  flip,
  style
}) => /* @__PURE__ */jsxs2("div", {
  style: {
    position: "absolute",
    width: 46,
    height: 46,
    transform: `scale(${flip[0]}, ${flip[1]})`,
    ...style
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 46,
      height: 8,
      background: G.ink,
      borderRadius: 3
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      width: 8,
      height: 46,
      background: G.ink,
      borderRadius: 3
    }
  })]
});
var BrakeReticleLock = () => {
  const f = useCurrentFrame();
  const scroll = scrollAt(f);
  const v = Math.abs(scroll - scrollAt(Math.max(0, f - 1)));
  const blur = Math.min(v * 0.12, 24);
  const highlight = interpolate(f, [BRAKE, BRAKE + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const lockT = interpolate(f, [BRAKE, BRAKE + 9], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.4))
  });
  const fly = 1 - lockT;
  const rowTop = TARGET_ROW * PITCH - scroll;
  const GAP = 10;
  const rect = {
    x: LIST_X - GAP,
    y: rowTop - GAP,
    w: LIST_W + GAP * 2,
    h: ROW_H + GAP * 2
  };
  const corners = [{
    x: rect.x - 23,
    y: rect.y - 23,
    fromX: -620,
    fromY: -320,
    flip: [1, 1]
  }, {
    x: rect.x + rect.w - 23,
    y: rect.y - 23,
    fromX: 620,
    fromY: -320,
    flip: [-1, 1]
  }, {
    x: rect.x - 23,
    y: rect.y + rect.h - 23,
    fromX: -620,
    fromY: 320,
    flip: [1, -1]
  }, {
    x: rect.x + rect.w - 23,
    y: rect.y + rect.h - 23,
    fromX: 620,
    fromY: 320,
    flip: [-1, -1]
  }];
  const tagT = interpolate(f, [BRAKE + 4, BRAKE + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.6))
  });
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        background: G.panel,
        borderBottom: `2px solid ${G.line}`,
        display: "flex",
        alignItems: "center",
        padding: __scCopy("0 32px"),
        gap: 20,
        boxSizing: "border-box",
        zIndex: 3
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          height: 18,
          width: 220,
          background: G.bar,
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          marginLeft: "auto",
          width: 36,
          height: 36,
          borderRadius: 18,
          background: G.mid
        }
      })]
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: LIST_X,
        top: 0,
        width: LIST_W,
        height: 1080,
        filter: blur > 0.5 ? `blur(${blur}px)` : "none"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          top: -scroll,
          left: 0,
          width: LIST_W,
          height: 40 * PITCH
        },
        children: Array.from({
          length: 38
        }).map((_, i) => /* @__PURE__ */jsx2(Row, {
          i,
          highlight: i === TARGET_ROW ? highlight : 0
        }, i))
      })
    }), f >= BRAKE && corners.map((c, i) => /* @__PURE__ */jsx2(Corner, {
      flip: c.flip,
      style: {
        left: c.x + c.fromX * fly,
        top: c.y + c.fromY * fly,
        opacity: Math.min(1, lockT * 3 + 0.35)
      }
    }, i)), f >= BRAKE + 4 && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: rect.x + rect.w + 28,
        top: rect.y + rect.h / 2 - 27,
        transform: `scale(${tagT})`,
        transformOrigin: __scCopy("left center"),
        padding: __scCopy("12px 26px"),
        borderRadius: 27,
        background: G.ink,
        color: "#ffffff",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: 0.5
      },
      children: __scCopy("v2.41")
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = BrakeReticleLock;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
