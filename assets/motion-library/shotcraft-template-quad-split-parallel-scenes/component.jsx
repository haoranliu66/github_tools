// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx

var QUAD_SPLIT_PARALLEL_SCENES_DURATION = 63;
var ACCENT = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#ACCENT", "ACCENT", () => "#7c5cff");
var ACCENT_SOFT = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#ACCENT_SOFT", "ACCENT_SOFT", () => "#c9bcff");
var F = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#F", "F", () => "system-ui,-apple-system,sans-serif");
var BGS = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#BGS", "BGS", () => ["#c3c6cc", "#f2f1ef", "#e7e6e3", "#b8bcc3"]);
var TRAFFIC = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#TRAFFIC", "TRAFFIC", () => ["#ff5f57", "#febc2e", "#28c840"]);
var TABNAMES = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#TABNAMES", "TABNAMES", () => [__scCopy("Tab One"), __scCopy("Tab Two"), __scCopy("Tab Three"), __scCopy("Tab Four"), __scCopy("Tab Five"), __scCopy("Tab Six")]);
var TXT1 = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#TXT1", "TXT1", () => __scCopy("Placeholder headline text"));
var TXT2 = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#TXT2", "TXT2", () => __scCopy("and a second line of copy"));
var WORDS = __scConfig("demos/rhythm/quad-split-parallel-scenes/QuadSplitParallelScenes.tsx#WORDS", "WORDS", () => [__scCopy("One"), __scCopy("clear"), __scCopy("message")]);
var qBez = (a, b, c, t) => {
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * b[0] + t * t * c[0], u * u * a[1] + 2 * u * t * b[1] + t * t * c[1]];
};
var QuadTL = ({
  t,
  frame
}) => {
  const n1 = Math.floor(seg(t, 0.02, 0.95) * TXT1.length);
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      left: "10%",
      top: "22%",
      width: "80%",
      height: "60%",
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 8px 24px rgba(20,40,80,.25)",
      fontFamily: F,
      transform: `scale(${lerp(E.inQuad(t), 1, 1.45)})`,
      transformOrigin: "50% 78%"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 5,
        padding: __scCopy("8px 10px 4px")
      },
      children: [TRAFFIC.map(c => /* @__PURE__ */jsx2("i", {
        style: {
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: c
        }
      }, c)), /* @__PURE__ */jsx2("div", {
        style: {
          display: "flex",
          flex: 1,
          gap: 3,
          marginLeft: 6,
          minWidth: 0
        },
        children: TABNAMES.map((n, i) => {
          const k = seg(t, 0.08 + i * 0.13, 0.08 + i * 0.13 + 0.09, E.outBack);
          return /* @__PURE__ */jsx2("div", {
            style: {
              flex: 1,
              minWidth: 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontSize: 8,
              color: "#555",
              background: "#e8eaee",
              borderRadius: __scCopy("5px 5px 0 0"),
              padding: __scCopy("2px 5px"),
              transform: `scale(${k})`
            },
            children: n
          }, n);
        })
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        margin: __scCopy("6px 10px"),
        height: 22,
        borderRadius: 11,
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        padding: __scCopy("0 10px"),
        fontSize: 10,
        color: "#333"
      },
      children: [/* @__PURE__ */jsx2("b", {
        style: {
          color: "#8a8f98",
          marginRight: 6
        },
        children: __scCopy("\u25C6")
      }), /* @__PURE__ */jsx2("span", {
        children: TXT1.slice(0, n1)
      }), /* @__PURE__ */jsx2("i", {
        style: {
          width: 1,
          height: 12,
          background: "#333",
          marginLeft: 1,
          opacity: frame % 16 < 8 ? 1 : 0
        }
      })]
    })]
  });
};
var QuadTR = ({
  t,
  frame
}) => {
  const n2 = Math.floor(seg(t, 0.06, 0.9) * TXT2.length);
  const zip = seg(t, 0.42, 0.54, E.inOutCubic);
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      inset: 0,
      fontFamily: '"SF Mono",Menlo,monospace',
      transform: `scale(${lerp(zip, 1, 2.1)})`,
      transformOrigin: "46% 42%",
      filter: `blur(${Math.sin(zip * Math.PI) * 4}px)`
    },
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: "12%",
        top: "24%",
        width: "76%",
        background: "#fbf8f1",
        borderRadius: 8,
        boxShadow: "0 6px 20px rgba(0,0,0,.12)",
        padding: __scCopy("8px 12px 14px"),
        // 原渲染无全局 border-box：76% 是内容宽，padding 外扩（Remotion 注入
        // 了 * { box-sizing:border-box }，显式还原 content-box 才对得上原片）
        boxSizing: "content-box"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          display: "flex",
          gap: 4,
          marginBottom: 6
        },
        children: TRAFFIC.map(c => /* @__PURE__ */jsx2("i", {
          style: {
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: c
          }
        }, c))
      }), /* @__PURE__ */jsx2("div", {
        style: {
          fontSize: 8,
          color: "#8a8f98",
          marginBottom: 5
        },
        children: __scCopy("\u2726 Section label \u203A")
      }), /* @__PURE__ */jsxs("div", {
        style: {
          fontSize: 11,
          color: "#111"
        },
        children: [/* @__PURE__ */jsx2("span", {
          children: TXT2.slice(0, n2)
        }), /* @__PURE__ */jsx2("span", {
          style: {
            opacity: (frame + 5) % 14 < 7 ? 1 : 0
          },
          children: __scCopy("_")
        })]
      })]
    })
  });
};
var QuadBL = ({
  t
}) => /* @__PURE__ */jsx2("div", {
  style: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    fontFamily: F,
    fontWeight: 800,
    fontSize: 19,
    color: "#1a1a1a"
  },
  children: WORDS.map((w, i) => {
    const k = seg(t, [0.24, 0.46, 0.56][i], [0.24, 0.46, 0.56][i] + 0.1, E.outBack);
    return /* @__PURE__ */jsx2("span", {
      style: {
        transform: `scale(${k}) translateY(${(1 - k) * 8}px)`,
        opacity: Math.min(1, k * 2)
      },
      children: w
    }, w);
  })
});
var QuadBR = ({
  t
}) => {
  const slide = seg(t, 0.12, 0.3, E.outBack);
  const m1 = seg(t, 0.3, 0.42, E.inOutCubic);
  const m2 = seg(t, 0.62, 0.74, E.inOutCubic);
  const p = m2 > 0 ? qBez([44, 66], [66, 52], [82, 68], m2) : qBez([88, 30], [50, 40], [44, 66], m1);
  const c1 = seg(t, 0.42, 0.47);
  const c2 = seg(t, 0.74, 0.79);
  const n4 = Math.floor(seg(t, 0.46, 0.62) * 9);
  const pop = seg(t, 0.8, 0.88, E.outBack);
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      inset: 0,
      fontFamily: F
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: "12%",
        bottom: "46%",
        width: "66%",
        background: "rgba(255,255,255,.92)",
        borderRadius: 8,
        padding: __scCopy("6px 9px"),
        boxSizing: "content-box",
        // 同上：66% 为内容宽
        fontSize: 8,
        color: "#222",
        transform: `scale(${pop})`,
        transformOrigin: "20% 100%",
        boxShadow: "0 5px 16px rgba(20,40,90,.25)"
      },
      children: [/* @__PURE__ */jsx2("b", {
        children: __scCopy("You \xB7 just now")
      }), /* @__PURE__ */jsx2("br", {}), __scCopy("All good!")]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: "8%",
        bottom: "26%",
        width: "84%",
        height: 26,
        borderRadius: 13,
        background: "rgba(255,255,255,.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        padding: __scCopy("0 8px"),
        boxSizing: "content-box",
        // 同上：84% 为内容宽
        gap: 6,
        fontSize: 8,
        boxShadow: "0 4px 14px rgba(20,40,90,.2)",
        transform: `translateX(${(1 - slide) * 120}%)`,
        marginBottom: -pop * 4
      },
      children: [/* @__PURE__ */jsx2("span", {
        style: {
          background: ACCENT,
          color: "#fff",
          borderRadius: 8,
          padding: __scCopy("1px 5px")
        },
        children: __scCopy("00:00")
      }), /* @__PURE__ */jsx2("span", {
        style: {
          flex: 1,
          color: t < 0.44 ? "#666" : "#111"
        },
        children: t < 0.44 ? __scCopy("Leave your comment...") : __scCopy("All good!").slice(0, n4)
      }), /* @__PURE__ */jsx2("span", {
        style: {
          color: n4 >= 9 ? ACCENT : ACCENT_SOFT
        },
        children: __scCopy("\u27A4")
      })]
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "#fff",
        border: "1.5px solid #333",
        zIndex: 5,
        boxShadow: "0 1px 4px rgba(0,0,0,.3)",
        left: `${p[0]}%`,
        top: `${p[1]}%`,
        transform: `scale(${1 - Math.sin(c1 * Math.PI) * 0.3 - Math.sin(c2 * Math.PI) * 0.3})`
      }
    })]
  });
};
var QuadSplitParallelScenes = () => {
  const t = useT();
  const frame = Math.floor(t * 63);
  const scenes = [/* @__PURE__ */jsx2(QuadTL, {
    t,
    frame
  }, 0), /* @__PURE__ */jsx2(QuadTR, {
    t,
    frame
  }, 1), /* @__PURE__ */jsx2(QuadBL, {
    t
  }, 2), /* @__PURE__ */jsx2(QuadBR, {
    t
  }, 3)];
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#000",
    raster: "zoom",
    children: scenes.map((scene, i) => /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: `${i % 2 * 50}%`,
        top: `${(i >> 1) * 50}%`,
        width: "50%",
        height: "50%",
        overflow: "hidden",
        background: BGS[i]
      },
      children: scene
    }, i))
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = QuadSplitParallelScenes;
 return {component:template_entry_default,duration:QUAD_SPLIT_PARALLEL_SCENES_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
