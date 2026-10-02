// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/effects/assemble-then-type-flyin/AssembleThenTypeFlyin.tsx
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
var rand = seed => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
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

// implementation/video-shotcraft/full/stage/source/demos/effects/assemble-then-type-flyin/AssembleThenTypeFlyin.tsx

var ASSEMBLE_THEN_TYPE_FLYIN_DURATION = 156;
var MONO2 = __scConfig("demos/effects/assemble-then-type-flyin/AssembleThenTypeFlyin.tsx#MONO2", "MONO2", () => "'SF Mono',Menlo,Consolas,monospace");
var SERIF2 = __scConfig("demos/effects/assemble-then-type-flyin/AssembleThenTypeFlyin.tsx#SERIF2", "SERIF2", () => "Georgia,'Times New Roman',serif");
var SH = __scConfig("demos/effects/assemble-then-type-flyin/AssembleThenTypeFlyin.tsx#SH", "SH", () => ({
  urlPill: {
    from: [0, -60],
    rot: 0,
    ft: 0.04
  },
  topLine: {
    from: [80, -40],
    rot: 4,
    ft: 0.07
  },
  mark: {
    from: [-140, -30],
    rot: -8,
    ft: 0.1
  },
  card: {
    from: [220, 30],
    rot: 6,
    ft: 0.13
  },
  cta: {
    from: [-70, 120],
    rot: -4,
    ft: 0.17
  },
  social: {
    from: [130, 60],
    rot: 5,
    ft: 0.2
  }
}));
var BLOCKS = __scConfig("demos/effects/assemble-then-type-flyin/AssembleThenTypeFlyin.tsx#BLOCKS", "BLOCKS", () => [{
  x: 22,
  y: 64,
  font: `400 29px ${SERIF2}`,
  color: "#f2f3f6",
  ls: 0.3,
  start: 0.34,
  segs: [{
    s: __scCopy("The headline for")
  }],
  dy: -0.5
}, {
  x: 22,
  y: 100,
  font: `400 29px ${SERIF2}`,
  color: "#f2f3f6",
  ls: 0.3,
  start: 0.4,
  segs: [{
    s: __scCopy("your product here"),
    i: true
  }],
  dy: -0.5
}, {
  x: 41,
  y: 35,
  font: `400 13px ${SERIF2}`,
  color: "#eceef2",
  ls: 0,
  start: 0.47,
  segs: [{
    s: __scCopy("Acme ")
  }, {
    s: __scCopy("Studio"),
    i: true
  }]
}, {
  x: 316,
  y: 96,
  font: `italic 400 36px ${SERIF2}`,
  color: "#f4f5f8",
  ls: 0,
  start: 0.5,
  segs: [{
    s: __scCopy("sample"),
    i: true
  }]
}, {
  x: 34,
  y: 172,
  font: `600 7.5px ${MONO2}`,
  color: "#e8e9ee",
  ls: 1.5,
  start: 0.58,
  segs: [{
    s: __scCopy("GET STARTED")
  }]
}, {
  x: 122,
  y: 173,
  font: `500 7.5px ${MONO2}`,
  color: "#6a707c",
  ls: 1.5,
  start: 0.62,
  segs: [{
    s: __scCopy("DOCS")
  }]
}, {
  x: 24,
  y: 14,
  font: `500 7px ${MONO2}`,
  color: "#8d93a0",
  ls: 1,
  start: 0.64,
  segs: [{
    s: __scCopy("app.example.com")
  }],
  dy: 0.5
}, {
  x: 306,
  y: 61,
  font: `500 6.5px ${MONO2}`,
  color: "#7c828e",
  ls: 1.5,
  start: 0.66,
  segs: [{
    s: __scCopy("WORK")
  }]
}, {
  x: 432,
  y: 61,
  font: `500 6.5px ${MONO2}`,
  color: "#565b66",
  ls: 1.5,
  start: 0.68,
  segs: [{
    s: "04 / 08"
  }]
}, {
  x: 306,
  y: 164,
  font: `500 6px ${MONO2}`,
  color: "#6a707c",
  ls: 1.5,
  start: 0.7,
  segs: [{
    s: __scCopy("KINETIC TYPE \xB7 04")
  }]
}, {
  x: 22,
  y: 143,
  font: `500 6.5px ${MONO2}`,
  color: "#565b66",
  ls: 1.5,
  start: 0.72,
  segs: [{
    s: __scCopy("H1 \xB7 UI-SERIF / GEORGIA")
  }]
}, {
  x: 18,
  y: 246,
  font: `500 6.5px ${MONO2}`,
  color: "#4c515c",
  ls: 1.5,
  start: 0.74,
  segs: [{
    s: __scCopy("A PRODUCT OF ACME \xB7 ACME LABS, INC.")
  }]
}, {
  x: 369,
  y: 242,
  font: `600 7.5px ${MONO2}`,
  color: "#c9cdd6",
  ls: 1.5,
  start: 0.76,
  segs: [{
    s: __scCopy("@USERNAME")
  }]
}]);
var charSeed = 0;
var CHAR_PARAMS = __scConfig("demos/effects/assemble-then-type-flyin/AssembleThenTypeFlyin.tsx#CHAR_PARAMS", "CHAR_PARAMS", () => BLOCKS.map(b => b.segs.map(sg => Array.from(sg.s, () => {
  const k = charSeed++;
  return {
    dx: (rand(k) - 0.5) * 340,
    dy: (rand(k + 50) - 0.5) * 260,
    dz: -120 - rand(k + 99) * 300,
    rx: (rand(k + 7) - 0.5) * 340,
    ry: (rand(k + 13) - 0.5) * 380,
    rz: (rand(k + 23) - 0.5) * 240
  };
}))));
var AssembleThenTypeFlyin = () => {
  const t = useT();
  const shell = ({
    from,
    rot,
    ft
  }) => {
    const a = seg(t, ft, ft + 0.14, E.outBack);
    const sp = a > 0 && a < 0.97 ? 1 - a : 0;
    return {
      position: "absolute",
      opacity: t >= ft ? Math.min(1, seg(t, ft, ft + 0.05) * 1.5) : 0,
      transform: `translate(${lerp(a, from[0], 0)}px,${lerp(a, from[1], 0)}px) rotate(${lerp(a, rot, 0)}deg)`,
      filter: sp > 0.03 ? `blur(${sp * 2}px)` : "none"
    };
  };
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0a0b0e",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg,#101116,#0c0d11)"
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          background: "repeating-linear-gradient(0deg,transparent 0 23px,rgba(255,255,255,.025) 23px 24px),repeating-linear-gradient(90deg,transparent 0 23px,rgba(255,255,255,.025) 23px 24px)"
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          ...shell(SH.urlPill),
          left: 18,
          top: 11,
          width: 78,
          height: 14,
          border: "1px solid #2a2c33",
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          ...shell(SH.topLine),
          right: 18,
          top: 16,
          width: 52,
          height: 5,
          background: "#1d1f26",
          borderRadius: 2
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          ...shell(SH.mark),
          left: 24,
          top: 37,
          width: 10,
          height: 10
        },
        children: [0, 1, 2, 3].map(i => /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#e8e9ee",
            left: i % 2 * 6,
            top: (i >> 1) * 6
          }
        }, i))
      }), /* @__PURE__ */jsxs("div", {
        style: {
          ...shell(SH.card),
          left: 296,
          top: 52,
          width: 162,
          height: 150,
          background: "#121319",
          border: "1px solid #23252d",
          borderRadius: 5
        },
        children: [/* @__PURE__ */jsx2("div", {
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
            top: 104,
            width: "100%",
            height: 1,
            background: "#1e2028"
          }
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
        }, i))]
      }), /* @__PURE__ */jsx2("div", {
        style: {
          ...shell(SH.cta),
          left: 22,
          top: 166,
          width: 74,
          height: 24,
          border: "1px solid #3a3d46",
          borderRadius: 12
        }
      }), /* @__PURE__ */jsx2("div", {
        style: {
          ...shell(SH.social),
          left: 352,
          top: 241,
          width: 11,
          height: 11,
          border: "1px solid #3a3d46",
          borderRadius: 2
        }
      }), BLOCKS.map((b, bi) => {
        const n = CHAR_PARAMS[bi].reduce((acc, sgp) => acc + sgp.length, 0);
        const step = Math.min(0.012, Math.max(2e-3, (0.94 - b.start - 0.13) / n));
        let ci = 0;
        return /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            left: b.x,
            top: b.y,
            font: b.font,
            color: b.color,
            letterSpacing: b.ls,
            whiteSpace: "nowrap",
            transform: b.dy ? `translateY(${b.dy}px)` : void 0
          },
          children: b.segs.map((sg, si) => /* @__PURE__ */jsx2("span", {
            style: sg.i ? {
              fontStyle: "italic"
            } : void 0,
            children: Array.from(sg.s, (ch, k) => {
              const c = CHAR_PARAMS[bi][si][k];
              const ft = b.start + ci++ * step;
              const a = seg(t, ft, ft + 0.13, E.outCubic);
              return /* @__PURE__ */jsx2("span", {
                style: {
                  display: "inline-block",
                  opacity: a > 0 ? Math.min(1, a * 1.8) : 0,
                  transform: a >= 1 ? "none" : `perspective(600px) translate3d(${lerp(a, c.dx, 0)}px,${lerp(a, c.dy, 0)}px,${lerp(a, c.dz, 0)}px) rotateX(${lerp(a, c.rx, 0)}deg) rotateY(${lerp(a, c.ry, 0)}deg) rotateZ(${lerp(a, c.rz, 0)}deg)`
                },
                children: ch === " " ? "\xA0" : ch
              }, k);
            })
          }, si))
        }, bi);
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = AssembleThenTypeFlyin;
 return {component:template_entry_default,duration:ASSEMBLE_THEN_TYPE_FLYIN_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
