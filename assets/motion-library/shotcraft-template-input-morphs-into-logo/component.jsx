// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/outro/ui-to-brand-morph/InputMorphsIntoLogo.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
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
 var BG = __scConfig("demos/outro/ui-to-brand-morph/InputMorphsIntoLogo.tsx#BG", "BG", () => "#3d1f47");
var CX = __scConfig("demos/outro/ui-to-brand-morph/InputMorphsIntoLogo.tsx#CX", "CX", () => 960);
var CY = __scConfig("demos/outro/ui-to-brand-morph/InputMorphsIntoLogo.tsx#CY", "CY", () => 560);
var FINAL = __scConfig("demos/outro/ui-to-brand-morph/InputMorphsIntoLogo.tsx#FINAL", "FINAL", () => ({
  mainPill: {
    x: CX - 150,
    y: CY + 10,
    w: 300,
    h: 108,
    r: 54
  },
  // 横胶囊
  bigDot: {
    x: CX - 204,
    y: CY + 10,
    d: 108
  },
  // 左端圆（与胶囊左帽相切，构成泪滴感）
  vPill: {
    x: CX + 96,
    y: CY - 152,
    w: 108,
    h: 260,
    r: 54
  },
  // 右上竖胶囊
  smallDot: {
    x: CX + 150,
    y: CY - 226,
    d: 76
  }
  // 竖胶囊顶上的小圆
}));
var InputMorphsIntoLogo = () => {
  const f = useCurrentFrame();
  const {
    fps
  } = useVideoConfig();
  const CLICK = 22;
  const FLY = 26;
  const MORPH = 34;
  const DROPS = [56, 70, 84];
  const SETTLE = 108;
  const box0 = {
    x: CX - 430,
    y: CY - 60,
    w: 860,
    h: 120,
    r: 26
  };
  const cursorX = interpolate(f, [0, CLICK], [1500, box0.x + box0.w - 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const cursorY = interpolate(f, [0, CLICK], [900, box0.y + 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  const press = f >= CLICK && f <= CLICK + 4 ? 0.82 : 1;
  const cursorGone = interpolate(f, [FLY + 4, FLY + 12], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const btnFlash = f >= CLICK && f <= CLICK + 6 ? 1 : 0;
  const flyT = interpolate(f, [FLY, FLY + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  });
  const m = spring({
    frame: f - MORPH,
    fps,
    config: {
      damping: 13,
      stiffness: 90,
      mass: 0.9
    }
  });
  const bx = interpolate(m, [0, 1], [box0.x, FINAL.mainPill.x]);
  const by = interpolate(m, [0, 1], [box0.y, FINAL.mainPill.y - FINAL.mainPill.h / 2 + 60 - 60]);
  const bw = interpolate(m, [0, 1], [box0.w, FINAL.mainPill.w]);
  const bh = interpolate(m, [0, 1], [box0.h, FINAL.mainPill.h]);
  const br = interpolate(m, [0, 1], [box0.r, FINAL.mainPill.r]);
  const bColor = m;
  const dropSpring = i => spring({
    frame: f - DROPS[i],
    fps,
    config: {
      damping: 12,
      stiffness: 110,
      mass: 0.85
    }
  });
  const breathe = f >= SETTLE ? 1 + 0.03 * Math.sin((f - SETTLE) * 0.18) : 1;
  const dropY = (finalY, s) => interpolate(s, [0, 1], [-260, finalY]);
  const s0 = dropSpring(0);
  const s1 = dropSpring(1);
  const s2 = dropSpring(2);
  const WHITE = "#fdf6ee";
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: BG,
      fontFamily: "Helvetica, Arial, sans-serif",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsxs(AbsoluteFill, {
      style: {
        transform: `scale(${breathe})`,
        transformOrigin: `${CX}px ${CY - 40}px`
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: bx,
          top: by,
          width: bw,
          height: bh,
          borderRadius: br,
          border: `4px solid ${WHITE}`,
          background: `rgba(253,246,238,${bColor})`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          padding: __scCopy("0 34px"),
          boxShadow: m > 0.6 ? "0 0 60px rgba(253,246,238,0.25)" : "none"
        },
        children: [/* @__PURE__ */jsxs("div", {
          style: {
            fontSize: 44,
            color: WHITE,
            whiteSpace: "nowrap",
            opacity: (1 - flyT) * (1 - m),
            transform: `translate(${flyT * 700}px, ${-flyT * 380}px) rotate(${-flyT * 10}deg)`
          },
          children: [__scCopy("Ready, set, go!"), /* @__PURE__ */jsx("span", {
            style: {
              opacity: Math.floor(f / 8) % 2 === 0 && f < FLY ? 1 : 0
            },
            children: __scCopy("|")
          })]
        }), /* @__PURE__ */jsx("div", {
          style: {
            marginLeft: "auto",
            width: 72,
            height: 72,
            borderRadius: 18,
            background: btnFlash ? "#ffffff" : "rgba(253,246,238,0.9)",
            opacity: 1 - m,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${press})`,
            flexShrink: 0
          },
          children: /* @__PURE__ */jsx("svg", {
            width: 34,
            height: 34,
            viewBox: "0 0 34 34",
            children: /* @__PURE__ */jsx("path", {
              d: __scCopy("M3 17 L31 4 L20 30 L15 19 Z"),
              fill: BG
            })
          })
        })]
      }), f >= DROPS[0] && /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: FINAL.bigDot.x - FINAL.bigDot.d / 2,
          top: dropY(FINAL.bigDot.y - FINAL.bigDot.d / 2, s0),
          width: FINAL.bigDot.d,
          height: FINAL.bigDot.d,
          borderRadius: "50%",
          background: WHITE,
          boxShadow: "0 0 40px rgba(253,246,238,0.2)"
        }
      }), f >= DROPS[1] && /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: FINAL.vPill.x - FINAL.vPill.w / 2,
          top: dropY(FINAL.vPill.y - FINAL.vPill.h / 2, s1),
          width: FINAL.vPill.w,
          height: FINAL.vPill.h,
          borderRadius: FINAL.vPill.r,
          background: WHITE,
          boxShadow: "0 0 40px rgba(253,246,238,0.2)"
        }
      }), f >= DROPS[2] && /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: FINAL.smallDot.x - FINAL.smallDot.d / 2,
          top: dropY(FINAL.smallDot.y - FINAL.smallDot.d / 2, s2),
          width: FINAL.smallDot.d,
          height: FINAL.smallDot.d,
          borderRadius: "50%",
          background: "#e8b84b",
          boxShadow: "0 0 40px rgba(232,184,75,0.35)"
        }
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: cursorX,
        top: cursorY,
        opacity: cursorGone,
        transform: `scale(${press})`,
        zIndex: 50
      },
      children: /* @__PURE__ */jsx("svg", {
        width: 40,
        height: 44,
        viewBox: "0 0 40 44",
        children: /* @__PURE__ */jsx("path", {
          d: __scCopy("M4 2 L4 34 L13 26 L19 40 L26 37 L20 23 L32 22 Z"),
          fill: "#ffffff",
          stroke: BG,
          strokeWidth: 2
        })
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = InputMorphsIntoLogo;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
