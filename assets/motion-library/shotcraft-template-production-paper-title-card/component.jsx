// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/template/src/themes/visual-theme.tsx
import { createContext, useContext } from "react";
import { staticFile } from "remotion";

// implementation/video-shotcraft/full/stage/source/template/src/themes/palettes.json

// implementation/video-shotcraft/full/stage/source/template/src/themes/visual-theme.tsx
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/template/src/aifl/PaperTitleCard.tsx
import { AbsoluteFill, interpolate as interpolate2, useCurrentFrame as useCurrentFrame2, Easing as Easing2 } from "remotion";

// implementation/video-shotcraft/full/stage/source/template/src/aifl/DigitRoll.tsx
import { interpolate, useCurrentFrame, Easing } from "remotion";
import { jsx as jsx2 } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/template/src/aifl/PaperTitleCard.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 // implementation/video-shotcraft/full/stage/source/template/src/themes/palettes.json
var palettes_default = {
  "vintage-kraft": {
    page: "#c8aa7d",
    surface: "#dfc69e",
    field: "#ccb086",
    text: "#382a20",
    muted: "#6b513b",
    accent: "#8b4937",
    border: "#ac895e"
  },
  "deep-ocean": {
    page: "#0b1620",
    surface: "#142735",
    field: "#1c3443",
    text: "#e8f1f5",
    muted: "#9fb6c3",
    accent: "#7cc8b4",
    border: "#304957"
  },
  "obsidian-violet": {
    page: "#14121b",
    surface: "#211d2c",
    field: "#2e283d",
    text: "#f0edf7",
    muted: "#b3a9c5",
    accent: "#bca0e8",
    border: "#41364f"
  },
  "modern-light": {
    page: "#f4f7fb",
    surface: "#ffffff",
    field: "#edf2f8",
    text: "#142238",
    muted: "#5c6b82",
    accent: "#2563eb",
    border: "#d8e2ef"
  },
  midnight: {
    page: "#090f1a",
    surface: "#111c2c",
    field: "#162438",
    text: "#f0f5ff",
    muted: "#9babbe",
    accent: "#61d9ef",
    border: "#293b52"
  },
  "solar-pop": {
    page: "#f9faf6",
    surface: "#ffffff",
    field: "#f0f3e7",
    text: "#26342b",
    muted: "#637067",
    accent: "#527434",
    border: "#dde4d5"
  },
  "coral-burst": {
    page: "#fffffe",
    surface: "#ffffff",
    field: "#f9f2f3",
    text: "#1f1235",
    muted: "#716579",
    accent: "#d94e59",
    border: "#e9dfe6"
  },
  "color-play": {
    page: "#f7f5fb",
    surface: "#ffffff",
    field: "#eee9f7",
    text: "#282039",
    muted: "#726781",
    accent: "#7354b5",
    border: "#e2dbea"
  }
};

// implementation/video-shotcraft/full/stage/source/template/src/themes/visual-theme.tsx

var font = '"Segoe UI Variable", "Segoe UI", "Microsoft YaHei", Arial, sans-serif';
var THEME = __scConfig("template/src/themes/visual-theme.tsx#THEME", "THEME", () => ({
  id: __scCopy("modern-light"),
  page: "#f4f7fb",
  surface: "#ffffff",
  field: "#edf2f8",
  text: "#142238",
  muted: "#5c6b82",
  accent: "#2563eb",
  border: "#d8e2ef",
  shadowRgb: "20,34,56",
  pageRgb: "244,247,251",
  lightRgb: "239,245,255",
  accentRgb: "37,99,235",
  stage: "#142238",
  font
}));
var rgb = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(",");
var VISUAL_THEMES = __scConfig("template/src/themes/visual-theme.tsx#VISUAL_THEMES", "VISUAL_THEMES", () => ({
  "ink-press": {
    ...THEME,
    id: __scCopy("ink-press"),
    page: "#f2eee6"
  },
  ...Object.fromEntries(Object.entries(palettes_default).map(([id, p]) => [id, {
    ...THEME,
    ...p,
    id,
    pageRgb: rgb(p.page),
    accentRgb: rgb(p.accent),
    shadowRgb: rgb(p.text),
    lightRgb: rgb(p.surface),
    stage: p.field
  }]))
}));
var ThemeContext = createContext(VISUAL_THEMES[__scCopy("ink-press")]);
var useVisualTheme = () => useContext(ThemeContext);
var rgba = (color, alpha) => `color-mix(in srgb, ${color} ${Math.max(0, Math.min(1, alpha)) * 100}%, transparent)`;
var INK_RGB_ROLES = __scConfig("template/src/themes/visual-theme.tsx#INK_RGB_ROLES", "INK_RGB_ROLES", () => ({
  "250,247,242": __scCopy("pageRgb"),
  "255,190,120": __scCopy("lightRgb"),
  "255,214,150": __scCopy("lightRgb"),
  "255,240,210": __scCopy("lightRgb"),
  "255,240,214": __scCopy("lightRgb"),
  "255,241,214": __scCopy("lightRgb"),
  "255,244,224": __scCopy("lightRgb"),
  "255,246,228": __scCopy("lightRgb"),
  "255,248,232": __scCopy("lightRgb"),
  "255,248,235": __scCopy("lightRgb"),
  "255,255,255": __scCopy("lightRgb"),
  "180,120,50": __scCopy("accentRgb"),
  "0,0,0": __scCopy("shadowRgb"),
  "30,25,18": __scCopy("shadowRgb"),
  "31,41,55": __scCopy("shadowRgb"),
  "40,30,20": __scCopy("shadowRgb"),
  "60,45,30": __scCopy("shadowRgb"),
  "62,48,32": __scCopy("shadowRgb"),
  "70,56,38": __scCopy("shadowRgb")
}));
var themePaint = (theme, css) => {
  if (theme.id === __scCopy("ink-press")) return css;
  const hex = {
    "#f2eee6": theme.page,
    "#faf7f2": theme.page,
    "#f9f6f1": theme.page,
    "#fdfcfa": theme.page,
    "#fefcf9": theme.field,
    "#fff": theme.surface,
    "#13110f": theme.text,
    "#1f2937": theme.text,
    "#955905": theme.accent,
    "#ae6700": theme.accent,
    "#b5651d": theme.accent,
    "#65635f": theme.muted,
    "#575552": theme.muted,
    "#6b7280": theme.muted,
    "#9ca3af": theme.muted
  };
  return css.replace(/#[\da-f]{3,8}\b/gi, c => hex[c.toLowerCase()] ?? c).replace(/oklch\(\s*([\d.]+)%?[^)]+\)/g, (cssColor, lightness) => {
    const l = Number(lightness) <= 1 ? Number(lightness) * 100 : Number(lightness);
    const color = l >= 94 ? theme.page : l >= 80 ? theme.border : l >= 40 ? theme.accent : theme.text;
    const alpha = cssColor.match(/\/\s*([\d.]+)(%)?/);
    return alpha ? rgba(color, Number(alpha[1]) / (alpha[2] ? 100 : 1)) : color;
  }).replace(/(rgba?)\(\s*(\d+),\s*(\d+),\s*(\d+)/g, (cssColor, fn, r, g, b) => {
    const role = INK_RGB_ROLES[`${+r},${+g},${+b}`];
    return role ? `${fn}(${theme[role]}` : cssColor;
  });
};
var sceneDefaults = (theme, key, defaults) => {
  if (theme.id === __scCopy("ink-press")) return defaults;
  const mapped = Object.fromEntries(Object.entries(defaults).map(([k, v]) => [k, typeof v === __scCopy("string") && /^(#|oklch|rgba)/.test(v) ? themePaint(theme, v) : v]));
  const sizes = {
    morning: {
      wordmarkSize: 116,
      kickerSize: 44
    },
    outro: {
      wordmarkSize: 124,
      taglineSize: 44
    },
    caption: {
      fontSize: 36,
      bottom: 32,
      color: theme.text
    },
    wbr: {
      kickerSize: 20
    }
  };
  return {
    ...mapped,
    ...sizes[key]
  };
};

// implementation/video-shotcraft/full/stage/source/template/src/aifl/PaperTitleCard.tsx

var DIGITS = __scConfig("template/src/aifl/DigitRoll.tsx#DIGITS", "DIGITS", () => "0123456789");
var DigitRoll = ({
  value,
  delay = 0,
  fontSize = 30,
  color = "oklch(52% 0.115 65)"
}) => {
  const theme = useVisualTheme();
  const paperStyle = theme.id === __scCopy("ink-press");
  const frame = useCurrentFrame();
  const lineH = fontSize * 1.15;
  return /* @__PURE__ */jsx2("span", {
    style: {
      fontFamily: paperStyle ? void 0 : theme.font,
      display: "inline-flex",
      overflow: "hidden",
      height: lineH,
      verticalAlign: "bottom"
    },
    children: value.split("").map((ch, i) => {
      const target = DIGITS.indexOf(ch);
      if (target < 0) {
        return /* @__PURE__ */jsx2("span", {
          style: {
            fontSize,
            lineHeight: `${lineH}px`,
            color
          },
          children: ch
        }, i);
      }
      const t = interpolate(frame, [delay + i * 4, delay + i * 4 + 22], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.25, 0.8, 0.25, 1)
      });
      const offset = (10 + target) * t * lineH;
      return /* @__PURE__ */jsx2("span", {
        style: {
          display: "inline-block",
          height: lineH
        },
        children: /* @__PURE__ */jsx2("span", {
          style: {
            display: "block",
            transform: `translateY(${-offset}px)`
          },
          children: (DIGITS + DIGITS).split("").map((d, j) => /* @__PURE__ */jsx2("span", {
            style: {
              display: "block",
              fontSize,
              lineHeight: `${lineH}px`,
              color,
              fontVariantNumeric: "tabular-nums"
            },
            children: d
          }, j))
        })
      }, i);
    })
  });
};

// implementation/video-shotcraft/full/stage/source/template/src/aifl/PaperTitleCard.tsx

var TITLE_CARD_DEFAULTS = __scConfig("template/src/aifl/PaperTitleCard.tsx#TITLE_CARD_DEFAULTS", "TITLE_CARD_DEFAULTS", () => ({
  fontSize: 116,
  ink: "#13110f",
  // oklch(18% 0.006 82)
  accent: "#955905",
  // oklch(52% 0.115 65)
  muted: "#65635f",
  // oklch(50% 0.006 82)
  paper: "#f9f6f1"
  // oklch(97.5% 0.008 82)
}));
var PaperTitleCard = props => {
  const theme = useVisualTheme();
  const paperStyle = theme.id === __scCopy("ink-press");
  const paint = css => themePaint(theme, css);
  const SERIF = paperStyle ? 'ui-serif, Georgia, "Times New Roman", serif' : theme.font;
  const MONO = paperStyle ? "ui-monospace, SFMono-Regular, Menlo, monospace" : theme.font;
  const {
    duration,
    words,
    sub,
    subDigits,
    ...style
  } = props;
  const {
    fontSize,
    ink,
    accent,
    muted,
    paper
  } = {
    ...sceneDefaults(theme, __scCopy("title-card"), TITLE_CARD_DEFAULTS),
    ...style
  };
  const frame = useCurrentFrame2();
  const fadeOut = interpolate2(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const underline = interpolate2(frame, [16, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing2.bezier(0.3, 0, 0.2, 1)
  });
  const subT = interpolate2(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsx3(AbsoluteFill, {
    style: {
      backgroundColor: paper,
      justifyContent: "center",
      alignItems: "center",
      opacity: fadeOut,
      backgroundImage: paint("radial-gradient(1100px 750px at 50% 42%, oklch(99.3% 0.014 88 / 0.85), transparent 65%)")
    },
    children: /* @__PURE__ */jsxs("div", {
      style: {
        textAlign: "center",
        maxWidth: 1500
      },
      children: [/* @__PURE__ */jsx3("div", {
        style: {
          fontFamily: SERIF,
          fontSize,
          fontWeight: 600,
          lineHeight: 1.14,
          color: ink,
          letterSpacing: __scCopy("-0.012em"),
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: __scCopy("0.26em")
        },
        children: words.map((w, i) => {
          const delay = 4 + i * 4;
          const t = interpolate2(frame, [delay, delay + 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing2.bezier(0.2, 0.75, 0.3, 1)
          });
          return /* @__PURE__ */jsx3("span", {
            style: {
              opacity: t,
              transform: `scale(${1.28 - 0.28 * t})`,
              filter: `blur(${(1 - t) * 7}px)`,
              display: "inline-block",
              fontStyle: paperStyle && w.accent ? "italic" : "normal",
              color: w.accent ? accent : void 0
            },
            children: w.text
          }, i);
        })
      }), /* @__PURE__ */jsx3("div", {
        style: {
          height: 6,
          width: 220,
          margin: __scCopy("38px auto 0"),
          borderRadius: 3,
          background: accent,
          transform: `scaleX(${underline})`
        }
      }), sub ? /* @__PURE__ */jsxs("div", {
        style: {
          fontFamily: MONO,
          fontSize: paperStyle ? 26 : 44,
          letterSpacing: __scCopy("0.12em"),
          color: muted,
          marginTop: 34,
          opacity: subT,
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: __scCopy("0.5em")
        },
        children: [subDigits ? /* @__PURE__ */jsx3(DigitRoll, {
          value: subDigits,
          delay: 12,
          fontSize: paperStyle ? 26 : 44,
          color: accent
        }) : null, /* @__PURE__ */jsx3("span", {
          children: sub
        })]
      }) : null]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PaperTitleCard;
 return {component:template_entry_default,duration:55};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{"duration":55,"words":[{"text":"Your"},{"text":"team"},{"text":"together","accent":true}]}} {...props} {...originalProps}/>;
 return view;
}
