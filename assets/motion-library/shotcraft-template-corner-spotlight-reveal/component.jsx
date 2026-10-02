// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/spotlight-sweep-moves/CornerSpotlightReveal.tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
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
 var FONT = __scConfig("demos/effects/spotlight-sweep-moves/CornerSpotlightReveal.tsx#FONT", "FONT", () => '"Avenir Next", "Helvetica Neue", Helvetica, sans-serif');
var InboxPanel = () => /* @__PURE__ */jsxs("div", {
  style: {
    width: 1920,
    height: 1080,
    background: "#f6f6f5",
    fontFamily: FONT,
    padding: __scCopy("90px 120px"),
    boxSizing: "border-box",
    color: "#2c2c2c"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 26
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        fontSize: 118,
        fontWeight: 700,
        letterSpacing: -2
      },
      children: __scCopy("Inbox")
    }), /* @__PURE__ */jsx("div", {
      style: {
        width: 0,
        height: 0,
        marginTop: 26,
        borderLeft: __scCopy("16px solid transparent"),
        borderRight: __scCopy("16px solid transparent"),
        borderTop: "20px solid #3a3a3a"
      }
    })]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      gap: 64,
      marginTop: 90,
      fontSize: 44,
      color: "#555"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        background: "#e9e8f6",
        color: "#5b55c8",
        padding: __scCopy("10px 34px"),
        borderRadius: 14,
        fontWeight: 600
      },
      children: __scCopy("All")
    }), /* @__PURE__ */jsx("div", {
      style: {
        padding: __scCopy("10px 0")
      },
      children: __scCopy("Tasks")
    }), /* @__PURE__ */jsx("div", {
      style: {
        padding: __scCopy("10px 0")
      },
      children: __scCopy("Docs")
    }), /* @__PURE__ */jsx("div", {
      style: {
        padding: __scCopy("10px 0")
      },
      children: __scCopy("People")
    }), /* @__PURE__ */jsx("div", {
      style: {
        padding: __scCopy("10px 0")
      },
      children: __scCopy("Chat")
    })]
  }), [0, 1, 2].map(row => /* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 30,
      marginTop: row === 0 ? 96 : 64
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 42,
        height: 42,
        border: "3px solid #c9c9c7",
        borderRadius: 10
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        width: 14,
        height: 14,
        borderRadius: 7,
        background: "#5b55c8"
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        width: 56,
        height: 56,
        borderRadius: 28,
        background: "#efe4e2"
      }
    }), /* @__PURE__ */jsxs("div", {
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: 22,
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            height: 22,
            width: 220 + row * 67 % 90,
            background: "#3f3f3f",
            borderRadius: 11
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: 8,
            height: 8,
            borderRadius: 4,
            background: "#bbb"
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            height: 18,
            width: 260,
            background: "#c9c9c7",
            borderRadius: 9
          }
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: 14,
          marginTop: 16
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            height: 18,
            width: 300,
            background: "#8f8bd8",
            borderRadius: 9,
            opacity: 0.75
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            height: 18,
            width: 340 - row * 91 % 120,
            background: "#d8d8d6",
            borderRadius: 9
          }
        })]
      })]
    })]
  }, row))]
});
var CornerSpotlightReveal = () => {
  const frame = useCurrentFrame();
  const r = interpolate(frame, [0, 100], [160, 1300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const cx = interpolate(frame, [0, 96], [140, 420], {
    extrapolateRight: "clamp"
  });
  const cy = interpolate(frame, [0, 96], [90, 260], {
    extrapolateRight: "clamp"
  });
  const feather = r * 0.85;
  const drift = interpolate(frame, [0, 100], [0, 1]);
  const scale = 1.75 - 0.28 * drift;
  const tx = -40 + 70 * drift;
  const ty = -30 + 50 * drift;
  const mask = `radial-gradient(circle ${r + feather}px at ${cx}px ${cy}px, rgba(255,255,255,1) ${Math.max(0, (r - feather * 0.25) / (r + feather) * 100)}%, rgba(255,255,255,0) 100%)`;
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#000"
    },
    children: [/* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        WebkitMaskImage: mask,
        maskImage: mask,
        transform: `scale(${scale}) translate(${tx}px, ${ty}px) rotate(${-1.2 + 1.2 * drift}deg)`,
        transformOrigin: "18% 12%"
      },
      children: /* @__PURE__ */jsx(InboxPanel, {})
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: cx - r * 0.7,
        top: cy - r * 0.7,
        width: r * 1.4,
        height: r * 1.4,
        borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(255,255,255,0.85), rgba(255,255,255,0.25) 45%, transparent 75%)",
        filter: "blur(26px)",
        opacity: interpolate(frame, [0, 10, 60, 90], [0, 0.9, 0.55, 0], {
          extrapolateRight: "clamp"
        }),
        pointerEvents: "none"
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = CornerSpotlightReveal;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
