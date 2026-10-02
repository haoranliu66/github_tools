// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx
import React from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx

var SCANLINE_ANNOTATE_FOCUS_DURATION = 138;
var MONO = __scConfig("demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx#MONO", "MONO", () => "'SF Mono',Menlo,Consolas,monospace");
var SERIF = __scConfig("demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx#SERIF", "SERIF", () => "Georgia,'Times New Roman',serif");
var ACCENT = __scConfig("demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx#ACCENT", "ACCENT", () => "#9fb6e8");
var A_RGB = __scConfig("demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx#A_RGB", "A_RGB", () => "159,182,232");
var TARGETS = __scConfig("demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx#TARGETS", "TARGETS", () => (() => {
  const ts = [{
    x: 18,
    y: 30,
    w: 108,
    h: 22,
    label: __scCopy("LOGO \xB7 MARK + WORDMARK"),
    lx: 132,
    ly: 38,
    ft: 0
  }, {
    x: 292,
    y: 48,
    w: 170,
    h: 158,
    label: __scCopy("MODULE \xB7 KINETIC TYPE"),
    lx: 292,
    ly: 36,
    ft: 0
  }, {
    x: 18,
    y: 58,
    w: 242,
    h: 78,
    label: __scCopy("H1 \xB7 SERIF DISPLAY"),
    lx: 266,
    ly: 92,
    ft: 0
  }, {
    x: 18,
    y: 160,
    w: 136,
    h: 32,
    label: __scCopy("CTA \xB7 PRIMARY + GHOST"),
    lx: 160,
    ly: 172,
    ft: 0
  }, {
    x: 14,
    y: 240,
    w: 224,
    h: 18,
    label: __scCopy("FOOTER \xB7 LEGAL"),
    lx: 242,
    ly: 246,
    ft: 0
  }, {
    x: 348,
    y: 235,
    w: 116,
    h: 23,
    label: __scCopy("SOCIAL \xB7 BRAND VOICE"),
    lx: 348,
    ly: 224,
    ft: 0
  }];
  const rawT = tg => 0.06 + (tg.y + tg.h + 30) / 330 * 0.6;
  let prev = -1;
  for (const tg of [...ts].sort((a, b) => a.y + a.h - (b.y + b.h))) {
    tg.ft = Math.max(rawT(tg), prev + 0.05);
    prev = tg.ft;
  }
  return ts;
})());
var C_BORDER = __scConfig("demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx#C_BORDER", "C_BORDER", () => "1.5px solid #f2f3f5");
var CORNERS = __scConfig("demos/effects/scanline-annotate-focus/ScanlineAnnotateFocus.tsx#CORNERS", "CORNERS", () => [{
  left: 0,
  top: 0,
  borderTop: C_BORDER,
  borderLeft: C_BORDER
}, {
  right: 0,
  top: 0,
  borderTop: C_BORDER,
  borderRight: C_BORDER
}, {
  left: 0,
  bottom: 0,
  borderBottom: C_BORDER,
  borderLeft: C_BORDER
}, {
  right: 0,
  bottom: 0,
  borderBottom: C_BORDER,
  borderRight: C_BORDER
}]);
var ScanlineAnnotateFocus = () => {
  const t = useT();
  const ly = lerp(seg(t, 0.06, 0.66), -30, 300);
  const lineOpacity = seg(t, 0.04, 0.09) * (1 - seg(t, 0.66, 0.71));
  const fired = TARGETS.reduce((acc, tg) => acc + (seg(t, tg.ft, tg.ft + 0.11, E.outCubic) > 0 ? 1 : 0), 0);
  const done = seg(t, 0.74, 0.8);
  return /* @__PURE__ */jsxs(DesignStage, {
    bg: "#0a0b0e",
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg,#101116,#0c0d11)"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          width: 480,
          height: 30,
          transform: "translateY(0.5px)"
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 18,
            top: 11,
            padding: __scCopy("3px 10px"),
            border: "1px solid #2a2c33",
            borderRadius: 9,
            font: `500 7px ${MONO}`,
            color: "#8d93a0",
            letterSpacing: 1
          },
          children: __scCopy("app.example.com")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            right: 18,
            top: 14,
            font: `500 7px ${MONO}`,
            color: "#565b66",
            letterSpacing: 1.5
          },
          children: __scCopy("200 OK \xB7 TLS")
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 24,
          top: 35,
          width: 100,
          height: 18
        },
        children: [[0, 1, 2, 3].map(i => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#e8e9ee",
            left: i % 2 * 6,
            top: 2 + (i >> 1) * 6
          }
        }, i)), /* @__PURE__ */jsxs("div", {
          style: {
            position: "absolute",
            left: 17,
            top: 0,
            font: `400 13px ${SERIF}`,
            color: "#eceef2"
          },
          children: [__scCopy("Acme "), /* @__PURE__ */jsx2("i", {
            children: __scCopy("Studio")
          })]
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 22,
          top: 64,
          width: 242,
          height: 84
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            font: `400 29px ${SERIF}`,
            color: "#f2f3f6",
            letterSpacing: 0.3,
            transform: "translateY(-0.5px)"
          },
          children: __scCopy("The headline for")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 36,
            font: `italic 400 29px ${SERIF}`,
            color: "#f2f3f6",
            letterSpacing: 0.3,
            transform: "translateY(-0.5px)"
          },
          children: __scCopy("your product here")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 1,
            top: 79,
            font: `500 6.5px ${MONO}`,
            color: "#565b66",
            letterSpacing: 1.5
          },
          children: __scCopy("H1 \xB7 UI-SERIF / GEORGIA")
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 22,
          top: 166,
          width: 136,
          height: 26
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 0,
            padding: __scCopy("6px 13px"),
            border: "1px solid #3a3d46",
            borderRadius: 12,
            font: `600 7.5px ${MONO}`,
            color: "#e8e9ee",
            letterSpacing: 1.5
          },
          children: __scCopy("GET STARTED")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 100,
            top: 7,
            font: `500 7.5px ${MONO}`,
            color: "#6a707c",
            letterSpacing: 1.5
          },
          children: __scCopy("DOCS")
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 296,
          top: 52,
          width: 162,
          height: 150,
          boxSizing: "content-box",
          background: "#121319",
          border: "1px solid #23252d",
          borderRadius: 5
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 10,
            top: 9,
            font: `500 6.5px ${MONO}`,
            color: "#7c828e",
            letterSpacing: 1.5
          },
          children: __scCopy("WORK")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            right: 10,
            top: 9,
            font: `500 6.5px ${MONO}`,
            color: "#565b66",
            letterSpacing: 1.5
          },
          children: __scCopy("04 / 08")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 24,
            width: "100%",
            height: 1,
            background: "#1e2028"
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 44,
            width: "100%",
            textAlign: "center",
            font: `italic 400 36px ${SERIF}`,
            color: "#f4f5f8"
          },
          children: __scCopy("sample")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 104,
            width: "100%",
            height: 1,
            background: "#1e2028"
          }
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 10,
            top: 112,
            font: `500 6px ${MONO}`,
            color: "#6a707c",
            letterSpacing: 1.5
          },
          children: __scCopy("KINETIC TYPE \xB7 04")
        }), [0, 1, 2, 3].map(i => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 10 + i * 30,
            top: 124,
            width: 24,
            height: 16,
            background: "#1a1c23",
            borderRadius: 2
          }
        }, i)), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            right: 8,
            top: 129,
            font: `500 6px ${MONO}`,
            color: "#565b66"
          },
          children: __scCopy("00:30")
        })]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 18,
          top: 243,
          width: 220,
          height: 14
        },
        children: /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 3,
            font: `500 6.5px ${MONO}`,
            color: "#4c515c",
            letterSpacing: 1.5
          },
          children: __scCopy("A PRODUCT OF ACME \xB7 ACME LABS, INC.")
        })
      }), /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 352,
          top: 239,
          width: 108,
          height: 16
        },
        children: [/* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 0,
            top: 2,
            width: 11,
            height: 11,
            boxSizing: "content-box",
            border: "1px solid #3a3d46",
            borderRadius: 2,
            font: `600 7px ${MONO}`,
            color: "#c9cdd6",
            textAlign: "center",
            lineHeight: __scCopy("11px")
          },
          children: __scCopy("x")
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: 17,
            top: 3,
            font: `600 7.5px ${MONO}`,
            color: "#c9cdd6",
            letterSpacing: 1.5
          },
          children: __scCopy("@USERNAME")
        })]
      })]
    }), TARGETS.map((tg, i) => {
      const a = seg(t, tg.ft, tg.ft + 0.11, E.outCubic);
      const s = lerp(E.outBack(seg(t, tg.ft, tg.ft + 0.13)), 1.75, 1);
      const fillO = 0.07 * seg(t, tg.ft + 0.04, tg.ft + 0.09) * (1 - seg(t, tg.ft + 0.09, tg.ft + 0.22));
      const la = seg(t, tg.ft + 0.05, tg.ft + 0.16, E.outCubic);
      return /* @__PURE__ */jsxs(React.Fragment, {
        children: [/* @__PURE__ */jsxs("div", {
          style: {
            position: "absolute",
            left: tg.x,
            top: tg.y,
            width: tg.w,
            height: tg.h,
            opacity: Math.min(1, a * 1.6),
            transform: `scale(${a > 0 ? s : 1.75})`
          },
          children: [CORNERS.map((c, k) => /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              width: 9,
              height: 9,
              boxSizing: "content-box",
              ...c
            }
          }, k)), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              inset: 1,
              background: "#fff",
              opacity: fillO
            }
          })]
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: tg.lx,
            top: tg.ly,
            font: `500 6.5px ${MONO}`,
            color: "#b8bdc7",
            letterSpacing: 1.5,
            whiteSpace: "nowrap",
            opacity: la,
            transform: `translateY(${lerp(la, 4, 0)}px)`
          },
          children: tg.label
        })]
      }, i);
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: 40,
        background: `linear-gradient(180deg,transparent,rgba(${A_RGB},.07) 55%,rgba(${A_RGB},.02) 96%,transparent)`,
        transform: `translateY(${ly - 40}px)`,
        opacity: lineOpacity
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 1.5,
          background: "rgba(238,244,255,.9)",
          boxShadow: `0 0 7px ${ACCENT},0 0 18px rgba(${A_RGB},.35)`
        }
      })
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: 14,
        transform: "translateX(-50%)",
        font: `600 7px ${MONO}`,
        letterSpacing: 2,
        color: done >= 1 ? ACCENT : "#8d93a0",
        opacity: seg(t, 0.03, 0.08)
      },
      children: done >= 1 ? __scCopy("ANALYSIS \xB7 COMPLETE") : `SCAN \xB7 0${fired}/0${TARGETS.length}`
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ScanlineAnnotateFocus;
 return {component:template_entry_default,duration:SCANLINE_ANNOTATE_FOCUS_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
