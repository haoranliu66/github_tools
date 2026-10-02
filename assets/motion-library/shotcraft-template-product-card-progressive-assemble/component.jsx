// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/product-card-progressive-assemble/ProductCardProgressiveAssemble.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var E = __scConfig("demos/_fixtures/Motion.tsx#E", "E", () => ({
  linear: t => t,
  inQuad: t => t * t,
  outQuad: t => t * (2 - t),
  inOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  inCubic: t => t * t * t,
  outCubic: t => 1 - Math.pow(1 - t, 3),
  inOutCubic: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  outQuart: t => 1 - Math.pow(1 - t, 4),
  outQuint: t => 1 - Math.pow(1 - t, 5),
  inQuart: t => t * t * t * t,
  outExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  inExpo: t => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
  outBack: (t, s = 1.70158) => 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
  inBack: (t, s = 1.70158) => (s + 1) * t * t * t - s * t * t,
  outElastic: t => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1,
  spring: (t, bounce = 0.25) => {
    const w = 8 + 8 * (1 - bounce);
    return 1 - Math.exp(-6 * t) * Math.cos(w * t * bounce * 2.2);
  }
}));
var lerp = (t, a, b) => a + (b - a) * t;
var seg = (t, t0, t1, ease = E.linear) => ease(Math.min(1, Math.max(0, (t - t0) / (t1 - t0))));
var useT = () => {
  const frame = useCurrentFrame();
  const {
    durationInFrames
  } = useVideoConfig();
  return Math.min(1, frame / Math.max(1, durationInFrames - 1));
};
var DesignStage = ({
  w = 480,
  h = 270,
  bg,
  raster = __scCopy("scale"),
  children
}) => {
  const {
    width
  } = useVideoConfig();
  const scale = width / w;
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: bg ?? "#000",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: w,
        height: h,
        overflow: "hidden",
        ...(raster === "zoom" ? {
          zoom: scale
        } : {
          transform: `scale(${scale})`,
          transformOrigin: __scCopy("top left")
        })
      },
      children
    })
  });
};

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/product-card-progressive-assemble/ProductCardProgressiveAssemble.tsx

var PRODUCT_CARD_PROGRESSIVE_ASSEMBLE_DURATION = 150;
var ACCENT = __scConfig("demos/ui-entrance/product-card-progressive-assemble/ProductCardProgressiveAssemble.tsx#ACCENT", "ACCENT", () => "#ff6a1f");
var ACCENT_SOFT = __scConfig("demos/ui-entrance/product-card-progressive-assemble/ProductCardProgressiveAssemble.tsx#ACCENT_SOFT", "ACCENT_SOFT", () => "rgba(255,122,26,.42)");
var F = f => f / 60;
var fieldStyle = (t, f0, mode = __scCopy("rise")) => {
  const k = seg(t, F(f0), F(f0) + 0.1, E.outCubic);
  return {
    opacity: Math.min(1, k * 2),
    transform: mode === __scCopy("pop") ? `scale(${lerp(E.outBack(Math.min(1, k)), 0.4, 1)})` : `translateY(${lerp(k, 6, 0)}px)`
  };
};
var LINES = __scConfig("demos/ui-entrance/product-card-progressive-assemble/ProductCardProgressiveAssemble.tsx#LINES", "LINES", () => [[[__scCopy("Placeholder copy for ")], [__scCopy("a key highlight"), true], [__scCopy(" in the")]], [[__scCopy("product body. ")], [__scCopy("Second highlight"), true], [__scCopy(" sits here on")]], [[__scCopy("the third line of neutral sample text.")]]]);
var ProductCardProgressiveAssemble = () => {
  const t = useT();
  const push = seg(t, 0, 0.75, E.outQuad);
  const cut = t >= F(26);
  const nk = seg(t, F(26), F(26) + 0.12);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0d0e13",
    raster: "zoom",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: "78%",
        height: "74%",
        transform: `translate(-50%,-50%) scale(${lerp(push, 1, 1.06)})`,
        background: "#f6f5f2",
        borderRadius: 12,
        boxShadow: "0 18px 50px rgba(0,0,0,.5)",
        fontFamily: "-apple-system,Helvetica,sans-serif",
        display: "flex",
        padding: "4.5%",
        boxSizing: "border-box",
        gap: "5%"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          flex: "0 0 38%",
          background: "#e2e0da",
          borderRadius: 8,
          position: "relative",
          overflow: "hidden",
          ...fieldStyle(t, 0)
        },
        children: /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: "18%",
            top: "14%",
            width: "64%",
            height: "72%",
            background: "linear-gradient(160deg,#2b3040,#171a24)",
            borderRadius: "40% 40% 14% 14%/26% 26% 10% 10%"
          },
          children: /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: "49%",
              top: "20%",
              width: "2%",
              height: "58%",
              background: "#525a70"
            }
          })
        })
      }), /* @__PURE__ */jsxs("div", {
        style: {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 19,
            fontWeight: 800,
            color: "#17181c",
            letterSpacing: __scCopy("-.3px"),
            ...fieldStyle(t, 4)
          },
          children: __scCopy("Sample Product Title")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            display: "flex",
            gap: 6,
            margin: __scCopy("8px 0 10px")
          },
          children: [__scCopy("Category"), __scCopy("Subgroup"), __scCopy("Detail")].map((txt, i) => /* @__PURE__ */jsx2("div", {
            style: {
              fontSize: 9,
              fontWeight: 600,
              color: "#5a5e6b",
              background: "#e9e7e1",
              padding: __scCopy("3px 9px"),
              borderRadius: 99,
              ...fieldStyle(t, 8 + i * 2, __scCopy("pop"))
            },
            children: txt
          }, txt))
        }), /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "baseline",
            gap: 9,
            marginBottom: 11,
            ...fieldStyle(t, 16)
          },
          children: [/* @__PURE__ */jsx2("span", {
            style: {
              fontSize: cut ? 15 : 21,
              fontWeight: 800,
              color: cut ? "#9a9da6" : "#17181c",
              textDecoration: cut ? __scCopy("line-through") : "none"
            },
            children: __scCopy("$249")
          }), /* @__PURE__ */jsx2("span", {
            style: {
              fontSize: 21,
              fontWeight: 800,
              color: ACCENT,
              opacity: Math.min(1, nk * 3),
              transform: `scale(${lerp(E.spring(nk, 0.35), 1.15, 1)})`
            },
            children: __scCopy("$189")
          })]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            fontSize: 10.5,
            lineHeight: 1.75,
            color: "#494d58"
          },
          children: LINES.map((segs, li) => /* @__PURE__ */jsx2("div", {
            style: {
              whiteSpace: "nowrap",
              ...fieldStyle(t, 30 + li * 2)
            },
            children: segs.map(([txt, isMark], si) => !isMark ? /* @__PURE__ */jsx2("span", {
              children: txt
            }, si) : /* @__PURE__ */jsxs("span", {
              style: {
                position: "relative",
                display: "inline-block"
              },
              children: [/* @__PURE__ */jsx2("span", {
                style: {
                  position: "absolute",
                  left: -2,
                  right: -2,
                  top: "8%",
                  bottom: "4%",
                  background: ACCENT_SOFT,
                  borderRadius: 2,
                  transform: `scaleX(${seg(t, F(30 + li * 2 + 4), F(30 + li * 2 + 4) + 0.085, E.outCubic)})`,
                  transformOrigin: __scCopy("left center")
                }
              }), /* @__PURE__ */jsx2("span", {
                style: {
                  position: "relative",
                  fontWeight: 700,
                  color: "#26282f"
                },
                children: txt
              })]
            }, si))
          }, li))
        }), /* @__PURE__ */jsx2("div", {
          style: {
            display: "flex",
            gap: 7,
            marginTop: "auto"
          },
          children: ["#191b20", "#8b8f99", "#3a5b8c"].map((cclr, i) => /* @__PURE__ */jsx2("div", {
            style: {
              width: 16,
              height: 16,
              borderRadius: 4,
              background: cclr,
              outline: "1.5px solid rgba(0,0,0,.12)",
              outlineOffset: 1.5,
              ...fieldStyle(t, 40 + i * 2, __scCopy("pop"))
            }
          }, cclr))
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ProductCardProgressiveAssemble;
 return {component:template_entry_default,duration:PRODUCT_CARD_PROGRESSIVE_ASSEMBLE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
