// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/timeline-travel/TimelineTravel.tsx
import { useCurrentFrame, interpolate, Easing, spring } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/timeline-travel/TimelineTravel.tsx
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
var Card = ({
  w,
  h,
  seed = 0,
  style
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: w,
      height: h,
      background: G.card,
      border: `2px solid ${G.border}`,
      borderRadius: 14,
      padding: 18,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      ...style
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 16,
        width: `${titleW}%`,
        background: G.bar,
        borderRadius: 8
      }
    }), Array.from({
      length: lines
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: `${88 - i * 14 - seed % 5 * 3}%`,
        background: G.line,
        borderRadius: 5
      }
    }, i)), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 8,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 13,
          background: G.mid
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 10,
          width: 64,
          background: G.line,
          borderRadius: 5
        }
      })]
    })]
  });
};
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

// implementation/video-shotcraft/full/stage/source/demos/data/timeline-travel/TimelineTravel.tsx

var W = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#W", "W", () => 1920);
var AXIS_Y = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#AXIS_Y", "AXIS_Y", () => 700);
var TICK_GAP = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#TICK_GAP", "TICK_GAP", () => 1400);
var TICKS = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#TICKS", "TICKS", () => [{
  label: __scCopy("v1.0"),
  x: 960
}, {
  label: __scCopy("v2.0"),
  x: 960 + TICK_GAP
}, {
  label: __scCopy("v3.0"),
  x: 960 + TICK_GAP * 2
}, {
  label: __scCopy("Today"),
  x: 960 + TICK_GAP * 3
}]);
var WORLD_W = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#WORLD_W", "WORLD_W", () => 960 + TICK_GAP * 3 + 960);
var TRAVEL_START = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#TRAVEL_START", "TRAVEL_START", () => 12);
var TRAVEL_END = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#TRAVEL_END", "TRAVEL_END", () => 104);
var ZOOM_END = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#ZOOM_END", "ZOOM_END", () => 114);
var camXAt = f => {
  const total = TICKS[3].x - 960;
  const t = interpolate(f, [TRAVEL_START, TRAVEL_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const eased = interpolate(t, [0, 0.15, 0.88, 1], [0, 0.055, 0.9, 1], {
    easing: Easing.inOut(Easing.quad)
  });
  return eased * total;
};
var popFrameOf = tickX => {
  for (let f = TRAVEL_START; f <= TRAVEL_END; f++) {
    if (camXAt(f) >= tickX - 960) return f;
  }
  return TRAVEL_END;
};
var CARD_W = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#CARD_W", "CARD_W", () => 360);
var CARD_H = __scConfig("demos/data/timeline-travel/TimelineTravel.tsx#CARD_H", "CARD_H", () => 240);
var TickStop = ({
  i,
  frame
}) => {
  const tick = TICKS[i];
  const pop = popFrameOf(tick.x) - 6;
  const s = spring({
    frame: frame - pop,
    fps: 30,
    config: {
      damping: 11,
      stiffness: 160,
      mass: 0.9
    },
    // 明显过冲
    durationInFrames: 26
  });
  const appeared = frame >= pop;
  return /* @__PURE__ */jsxs2("div", {
    style: {
      position: "absolute",
      left: tick.x,
      top: 0
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: -3,
        top: AXIS_Y - 28,
        width: 6,
        height: 56,
        background: G.ink,
        borderRadius: 3
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: -80,
        top: AXIS_Y + 44,
        width: 160,
        textAlign: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 800,
        fontSize: 40,
        color: G.ink
      },
      children: tick.label
    }), appeared && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: -CARD_W / 2,
        top: AXIS_Y - 36 - CARD_H,
        transform: `scaleY(${s}) scaleX(${0.6 + 0.4 * s})`,
        transformOrigin: "50% 100%",
        opacity: Math.min(1, s * 2)
      },
      children: /* @__PURE__ */jsx2(Card, {
        w: CARD_W,
        h: CARD_H,
        seed: i + 2
      })
    })]
  });
};
var TimelineTravel = () => {
  const frame = useCurrentFrame();
  const camX = camXAt(frame);
  const zoom = interpolate(frame, [TRAVEL_END, ZOOM_END], [1, 1.28], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: W,
      height: 1080,
      background: G.bg,
      overflow: "hidden",
      position: "relative"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        width: W,
        height: 1080,
        transform: `scale(${zoom})`,
        transformOrigin: "50% 62%"
      },
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: WORLD_W,
          height: 1080,
          transform: `translateX(${-camX}px)`
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 200,
            top: AXIS_Y - 3,
            width: WORLD_W - 400,
            height: 6,
            background: G.bar,
            borderRadius: 3
          }
        }), Array.from({
          length: 22
        }).map((_, i) => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 960 + i * (TICK_GAP / 5) - 2,
            top: AXIS_Y - 12,
            width: 4,
            height: 24,
            background: G.bar,
            borderRadius: 2
          }
        }, i)), TICKS.map((_, i) => /* @__PURE__ */jsx2(TickStop, {
          i,
          frame
        }, i))]
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        top: 90,
        width: "100%",
        textAlign: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("TIMELINE TRAVEL"),
        size: 64
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = TimelineTravel;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
