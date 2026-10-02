// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx
import React from "react";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx

var FLOATING_GLOSSY_LABEL_PILLS_DURATION = 120;
var ACCENT = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#ACCENT", "ACCENT", () => "#7a8699");
var ACCENT_LIGHT = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#ACCENT_LIGHT", "ACCENT_LIGHT", () => "#a8b2c0");
var ACCENT_DEEP = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#ACCENT_DEEP", "ACCENT_DEEP", () => "#4c5666");
var A_RGB = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#A_RGB", "A_RGB", () => "122,134,153");
var AL_RGB = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#AL_RGB", "AL_RGB", () => "168,178,192");
var AD_RGB = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#AD_RGB", "AD_RGB", () => "76,86,102");
var F = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#F", "F", () => "-apple-system,BlinkMacSystemFont,sans-serif");
var CW = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#CW", "CW", () => 330);
var CH = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#CH", "CH", () => 255);
var CS = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#CS", "CS", () => 252 / CW);
var W = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#W", "W", () => Math.round(CW * CS));
var H = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#H", "H", () => Math.round(CH * CS));
var SP = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#SP", "SP", () => 232);
var PANEL_TOP = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#PANEL_TOP", "PANEL_TOP", () => 75);
var TITLE = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#TITLE", "TITLE", () => "#a8adb5");
var TEXT = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#TEXT", "TEXT", () => "#d4d7dd");
var FAINT = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#FAINT", "FAINT", () => "#e3e5ea");
var LINE = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#LINE", "LINE", () => "#eceef1");
var Skel = ({
  x,
  y,
  w,
  h,
  col,
  r
}) => /* @__PURE__ */jsx2("div", {
  style: {
    position: "absolute",
    left: x,
    top: y,
    width: w,
    height: h,
    borderRadius: r === void 0 ? Math.min(h / 2, 3) : r,
    background: col
  }
});
var Topbar = () => /* @__PURE__ */jsxs("div", {
  style: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: 16,
    background: "#fff",
    borderBottom: "1px solid #eceef1",
    zIndex: 1
  },
  children: [/* @__PURE__ */jsx2(Skel, {
    x: 8,
    y: 4,
    w: 8,
    h: 8,
    col: ACCENT,
    r: 2
  }), /* @__PURE__ */jsx2(Skel, {
    x: 20,
    y: 6,
    w: 28,
    h: 5,
    col: "#b9bec6"
  }), /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      right: 8,
      top: 5.5,
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "#d8dbe0"
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      right: 18,
      top: 5.5,
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: "#d8dbe0"
    }
  })]
});
var Sidebar = () => /* @__PURE__ */jsxs("div", {
  style: {
    position: "absolute",
    left: 0,
    top: 16,
    width: 70,
    height: "calc(100% - 16px)",
    background: "#f7f8f9",
    borderRight: "1px solid #eceef1"
  },
  children: [/* @__PURE__ */jsx2(Skel, {
    x: 8,
    y: 8,
    w: 36,
    h: 8,
    col: ACCENT
  }), Array.from({
    length: 8
  }, (_, i) => /* @__PURE__ */jsx2(Skel, {
    x: 8,
    y: 26 + i * 11,
    w: 30 + rand(i + 9) * 22,
    h: 4,
    col: i === 1 ? ACCENT_LIGHT : "#d8dbe0"
  }, i))]
});
var BCards = () => /* @__PURE__ */jsxs(Fragment, {
  children: [/* @__PURE__ */jsx2(Topbar, {}), /* @__PURE__ */jsx2(Skel, {
    x: CW / 2 - 46,
    y: 30,
    w: 92,
    h: 9,
    col: TITLE
  }), /* @__PURE__ */jsx2(Skel, {
    x: CW / 2 - 70,
    y: 46,
    w: 140,
    h: 5,
    col: FAINT
  }), Array.from({
    length: 3
  }, (_, i) => /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      left: 16 + i * 104,
      top: 64,
      width: 92,
      height: 170,
      border: `1px solid ${LINE}`,
      borderRadius: 6,
      background: "#fff"
    },
    children: [/* @__PURE__ */jsx2(Skel, {
      x: 10,
      y: 12,
      w: 38,
      h: 6,
      col: "#b9bec6"
    }), /* @__PURE__ */jsx2(Skel, {
      x: 10,
      y: 26,
      w: 52,
      h: 14,
      col: TITLE,
      r: 4
    }), Array.from({
      length: 5
    }, (_2, k) => /* @__PURE__ */jsx2(Skel, {
      x: 10,
      y: 52 + k * 13,
      w: 44 + rand(i * 7 + k) * 26,
      h: 4,
      col: FAINT
    }, k)), /* @__PURE__ */jsx2(Skel, {
      x: 10,
      y: 142,
      w: 72,
      h: 16,
      col: ACCENT,
      r: 4
    })]
  }, i))]
});
var BDash = () => /* @__PURE__ */jsxs(Fragment, {
  children: [/* @__PURE__ */jsx2(Topbar, {}), /* @__PURE__ */jsx2(Sidebar, {}), /* @__PURE__ */jsx2(Skel, {
    x: 84,
    y: 26,
    w: 64,
    h: 9,
    col: TITLE
  }), Array.from({
    length: 4
  }, (_, i) => /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      left: 84 + i * 60,
      top: 44,
      width: 54,
      height: 32,
      border: `1px solid ${LINE}`,
      borderRadius: 6,
      background: "#fff"
    },
    children: [/* @__PURE__ */jsx2(Skel, {
      x: 7,
      y: 7,
      w: 34,
      h: 8,
      col: TITLE
    }), /* @__PURE__ */jsx2(Skel, {
      x: 7,
      y: 20,
      w: 22,
      h: 3,
      col: FAINT
    })]
  }, i)), /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      left: 84,
      top: 86,
      width: 232,
      height: 146,
      border: `1px solid ${LINE}`,
      borderRadius: 6,
      background: "#fff"
    },
    children: [/* @__PURE__ */jsx2(Skel, {
      x: 8,
      y: 8,
      w: 56,
      h: 5,
      col: TEXT
    }), /* @__PURE__ */jsxs("svg", {
      viewBox: "0 0 232 146",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%"
      },
      children: [/* @__PURE__ */jsx2("path", {
        d: __scCopy("M8 116 C 40 112, 56 62, 84 64 S 128 120, 152 116 S 196 50, 224 56 L224 134 L8 134 Z"),
        fill: `rgba(${A_RGB},.18)`
      }), /* @__PURE__ */jsx2("path", {
        d: __scCopy("M8 116 C 40 112, 56 62, 84 64 S 128 120, 152 116 S 196 50, 224 56"),
        fill: "none",
        stroke: ACCENT,
        strokeWidth: 2
      })]
    }), Array.from({
      length: 5
    }, (_, i) => /* @__PURE__ */jsx2(Skel, {
      x: 12 + i * 44,
      y: 138,
      w: 22,
      h: 3,
      col: FAINT
    }, i))]
  })]
});
var BTable = () => /* @__PURE__ */jsxs(Fragment, {
  children: [/* @__PURE__ */jsx2(Topbar, {}), /* @__PURE__ */jsx2(Sidebar, {}), /* @__PURE__ */jsx2(Skel, {
    x: 84,
    y: 26,
    w: 76,
    h: 9,
    col: TITLE
  }), Array.from({
    length: 4
  }, (_, i) => /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      left: 84 + i * 60,
      top: 44,
      width: 54,
      height: 22,
      border: `1px solid ${LINE}`,
      borderRadius: 6,
      background: "#fff"
    },
    children: /* @__PURE__ */jsx2(Skel, {
      x: 7,
      y: 7,
      w: 26 + rand(i + 3) * 14,
      h: 8,
      col: TITLE
    })
  }, i)), Array.from({
    length: 7
  }, (_, i) => /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      left: 84,
      top: 78 + i * 22,
      width: 232,
      height: 18,
      borderBottom: "1px solid #f0f1f4"
    },
    children: [/* @__PURE__ */jsx2(Skel, {
      x: 0,
      y: 6,
      w: 70 + rand(i + 21) * 60,
      h: 5,
      col: TEXT
    }), /* @__PURE__ */jsx2(Skel, {
      x: 172,
      y: 4,
      w: 26,
      h: 9,
      col: i % 2 ? "#f2d6d6" : "#cdeccf",
      r: 4
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 226,
        top: 6,
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#28c06a"
      }
    })]
  }, i))]
});
var BForm = () => /* @__PURE__ */jsxs(Fragment, {
  children: [/* @__PURE__ */jsx2(Topbar, {}), /* @__PURE__ */jsx2(Sidebar, {}), /* @__PURE__ */jsx2(Skel, {
    x: 84,
    y: 26,
    w: 96,
    h: 9,
    col: TITLE
  }), /* @__PURE__ */jsx2(Skel, {
    x: 84,
    y: 44,
    w: 44,
    h: 5,
    col: "#b9bec6"
  }), Array.from({
    length: 3
  }, (_, i) => /* @__PURE__ */jsxs(React.Fragment, {
    children: [/* @__PURE__ */jsx2(Skel, {
      x: 84,
      y: 56 + i * 26,
      w: 34 + rand(i + 51) * 30,
      h: 4,
      col: TEXT
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 84,
        top: 64 + i * 26,
        width: 120,
        height: 13,
        border: "1px solid #dcdfe4",
        borderRadius: 4,
        background: "#fff"
      }
    })]
  }, i)), /* @__PURE__ */jsx2(Skel, {
    x: 84,
    y: 140,
    w: 120,
    h: 15,
    col: "#26282d",
    r: 8
  }), /* @__PURE__ */jsx2(Skel, {
    x: 84,
    y: 168,
    w: 60,
    h: 5,
    col: "#b9bec6"
  }), Array.from({
    length: 3
  }, (_, i) => /* @__PURE__ */jsx2(Skel, {
    x: 84,
    y: 180 + i * 9,
    w: 110 + rand(i + 71) * 60,
    h: 3,
    col: FAINT
  }, i)), /* @__PURE__ */jsx2(Skel, {
    x: 218,
    y: 44,
    w: 40,
    h: 5,
    col: "#b9bec6"
  }), /* @__PURE__ */jsx2(Skel, {
    x: 218,
    y: 122,
    w: 52,
    h: 5,
    col: "#b9bec6"
  }), Array.from({
    length: 4
  }, (_, i) => /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      left: 218,
      top: 56 + i * 30 + (i > 1 ? 22 : 0),
      width: 100,
      height: 22
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 3,
        width: 13,
        height: 13,
        borderRadius: "50%",
        background: `hsl(${212 + i * 4},14%,${56 + i * 5}%)`
      }
    }), /* @__PURE__ */jsx2(Skel, {
      x: 19,
      y: 3,
      w: 48,
      h: 4,
      col: "#c2c6cc"
    }), /* @__PURE__ */jsx2(Skel, {
      x: 19,
      y: 11,
      w: 32,
      h: 4,
      col: FAINT
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        right: 0,
        top: 4,
        width: 18,
        height: 10,
        borderRadius: 6,
        background: i % 2 ? "#d6d9de" : "#2f7de1"
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          top: 1.5,
          ...(i % 2 ? {
            left: 1.5
          } : {
            right: 1.5
          }),
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#fff"
        }
      })
    })]
  }, i))]
});
var GROUPS = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#GROUPS", "GROUPS", () => [{
  txt: __scCopy("Feature A"),
  Body: BCards
}, {
  txt: __scCopy("Feature B"),
  Body: BDash
}, {
  txt: __scCopy("Feature C"),
  Body: BTable
}, {
  txt: __scCopy("Feature D"),
  Body: BForm
}]);
var FOGS = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#FOGS", "FOGS", () => [{
  left: "68%",
  top: "8%",
  rgb: AD_RGB
}, {
  left: "4%",
  top: "60%",
  rgb: A_RGB
}, {
  left: "40%",
  top: "82%",
  rgb: AL_RGB
}]);
var BEATS = __scConfig("demos/ui-entrance/floating-glossy-label-pills/FloatingGlossyLabelPills.tsx#BEATS", "BEATS", () => [{
  b: 0.2,
  d: 0.185,
  tail: 0.28
},
// 第 1 位 → 第 2 位
{
  b: 0.483,
  d: 0.15,
  tail: 0
},
// 第 2 位 → 第 3 位
{
  b: 0.688,
  d: 0.15,
  tail: 0
}
// 第 3 位 → 第 4 位
]);
var FloatingGlossyLabelPills = () => {
  const t = useT();
  let trackX = -11 * (1 - seg(t, 0, 0.19, E.outQuart));
  for (const B of BEATS) {
    const p = B.tail ? 0.85 * seg(t, B.b, B.b + B.d, E.inOutCubic) + 0.15 * seg(t, B.b, B.b + B.tail, E.outCubic) : seg(t, B.b, B.b + B.d, E.inOutCubic);
    trackX += p * SP;
  }
  const N = GROUPS.length,
    RING = N * SP;
  const cp = seg(t, 0.717, 0.9, E.outQuart);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#fbfbfc",
    children: /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: `radial-gradient(55% 75% at 106% 42%, rgba(${A_RGB},.55), transparent 70%),
      radial-gradient(42% 50% at -6% 88%, rgba(${AD_RGB},.42), transparent 70%),
      radial-gradient(48% 40% at 12% -10%, rgba(${AL_RGB},.5), transparent 70%),
      #fbfbfc`
      },
      children: [FOGS.map(({
        left,
        top,
        rgb
      }, i) => /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left,
          top,
          width: 240,
          height: 160,
          borderRadius: "50%",
          filter: "blur(50px)",
          background: `rgba(${rgb},.14)`,
          transform: `translate(${Math.sin(t * Math.PI * 2 * 0.5 + i * 2.1) * 18}px,${Math.cos(t * Math.PI * 2 * 0.4 + i) * 12}px)`
        }
      }, i)), GROUPS.map(({
        txt,
        Body
      }, i) => {
        let wx = trackX - i * SP;
        wx = (wx % RING + RING * 1.5) % RING - RING / 2;
        const d = Math.min(1, Math.abs(wx) / SP);
        const close = 1 - d;
        const sc = lerp(close, 0.62, 1);
        return /* @__PURE__ */jsxs("div", {
          style: {
            position: "absolute",
            left: "50%",
            top: 0,
            width: W,
            height: 270,
            marginLeft: -W / 2,
            transform: `translateX(${wx}px)`,
            // 邻位（d=1）必须仍清楚可见 —— 原片左右两侧始终露出相邻面板边缘
            opacity: lerp(Math.min(1, close * 2.4), 0.78, 1),
            filter: `blur(${d * 1.3}px)`,
            zIndex: close > 0.5 ? 2 : 1
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              left: 0,
              top: PANEL_TOP,
              width: W,
              height: H,
              borderRadius: 8,
              transformOrigin: "50% 0",
              boxShadow: `0 0 0 1.5px rgba(${A_RGB},.6), 0 14px 34px rgba(${AD_RGB},.22)`,
              transform: `translateY(${d * 80}px) scale(${sc})`
            },
            children: /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: 0,
                top: 0,
                width: CW,
                height: CH,
                borderRadius: 10,
                background: "#fff",
                overflow: "hidden",
                transform: `scale(${CS})`,
                transformOrigin: "0 0",
                fontFamily: F
              },
              children: /* @__PURE__ */jsx2(Body, {})
            })
          }), /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: "50%",
              top: 28,
              transformOrigin: "50% 50%",
              padding: __scCopy("4px 13px"),
              borderRadius: 999,
              whiteSpace: "nowrap",
              // 原 cssText 中 font 简写在 line-height:1 之后，实际生效行高为 normal
              font: `700 14px ${F}`,
              color: "#fff",
              background: `linear-gradient(180deg,${ACCENT_LIGHT} 0%,${ACCENT} 45%,${ACCENT_DEEP} 100%)`,
              boxShadow: `inset 0 2px 3px rgba(255,255,255,.65), inset 0 -4px 8px rgba(34,39,47,.5),
          0 12px 28px rgba(${AD_RGB},.35)`,
              transform: `translateX(-50%) translateY(${d * 92}px) scale(${sc})`
            },
            children: [txt, /* @__PURE__ */jsx2("div", {
              style: {
                position: "absolute",
                left: "12%",
                top: 3,
                width: "76%",
                height: "38%",
                borderRadius: 999,
                background: "linear-gradient(180deg,rgba(255,255,255,.75),rgba(255,255,255,0))",
                pointerEvents: "none"
              }
            })]
          })]
        }, i);
      }), /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          width: 0,
          height: 0,
          borderLeft: "8px solid #0d0d11",
          borderRight: __scCopy("4px solid transparent"),
          borderBottom: __scCopy("14px solid transparent"),
          filter: "drop-shadow(0 0 1px #fff) drop-shadow(0 0 1px #fff) drop-shadow(0 2px 3px rgba(0,0,0,.3))",
          transform: "rotate(-16deg)",
          opacity: seg(t, 0.717, 0.725),
          zIndex: 5,
          left: `${lerp(cp, 403, 281) / 480 * 100}%`,
          top: `${lerp(cp, 36, 56) / 270 * 100}%`
        }
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = FloatingGlossyLabelPills;
 return {component:template_entry_default,duration:FLOATING_GLOSSY_LABEL_PILLS_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
