// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/paper-title-card/PaperTitleCard.tsx
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
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
 var PAPER_TITLE_CARD_DURATION = 55;
var SERIF = __scConfig("demos/typography/paper-title-card/PaperTitleCard.tsx#SERIF", "SERIF", () => 'ui-serif, Georgia, "Times New Roman", serif');
var MONO = __scConfig("demos/typography/paper-title-card/PaperTitleCard.tsx#MONO", "MONO", () => "ui-monospace, SFMono-Regular, Menlo, monospace");
var WORDS = __scConfig("demos/typography/paper-title-card/PaperTitleCard.tsx#WORDS", "WORDS", () => [{
  text: __scCopy("All")
}, {
  text: __scCopy("your")
}, {
  text: __scCopy("team\u2019s")
}, {
  text: __scCopy("research,")
}, {
  text: __scCopy("one"),
  accent: true
}, {
  text: __scCopy("place")
}, {
  text: __scCopy("to")
}, {
  text: __scCopy("go.")
}]);
var SUB = __scConfig("demos/typography/paper-title-card/PaperTitleCard.tsx#SUB", "SUB", () => __scCopy("of 31 fetched today"));
var SUB_DIGITS = __scConfig("demos/typography/paper-title-card/PaperTitleCard.tsx#SUB_DIGITS", "SUB_DIGITS", () => "5");
var DIGITS = __scConfig("demos/typography/paper-title-card/PaperTitleCard.tsx#DIGITS", "DIGITS", () => "0123456789");
var DigitColumn = ({
  ch,
  delay,
  lineH,
  color
}) => {
  const frame = useCurrentFrame();
  if (ch < "0" || ch > "9") {
    return /* @__PURE__ */jsx("span", {
      style: {
        fontSize: 26,
        lineHeight: `${lineH}px`,
        color
      },
      children: ch
    });
  }
  const target = DIGITS.indexOf(ch);
  const t = interpolate(frame, [delay, delay + 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.25, 0.8, 0.25, 1)
  });
  const offset = (10 + target) * t * lineH;
  return /* @__PURE__ */jsx("span", {
    style: {
      display: "inline-block",
      height: lineH
    },
    children: /* @__PURE__ */jsx("span", {
      style: {
        display: "block",
        transform: `translateY(${-offset}px)`
      },
      children: (DIGITS + DIGITS).split("").map((d, j) => /* @__PURE__ */jsx("span", {
        style: {
          display: "block",
          fontSize: 26,
          lineHeight: `${lineH}px`,
          color,
          fontVariantNumeric: "tabular-nums"
        },
        children: d
      }, j))
    })
  });
};
var DigitRoll = ({
  value,
  delay,
  color
}) => {
  const lineH = 26 * 1.15;
  return /* @__PURE__ */jsx("span", {
    style: {
      display: "inline-flex",
      overflow: "hidden",
      height: lineH,
      verticalAlign: "bottom"
    },
    children: value.split("").map((c, i) => /* @__PURE__ */jsx(DigitColumn, {
      ch: c,
      delay: delay + i * 4,
      lineH,
      color
    }, i))
  });
};
var PaperTitleCard = () => {
  const frame = useCurrentFrame();
  const duration = PAPER_TITLE_CARD_DURATION;
  const fadeOut = interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const underline = interpolate(frame, [16, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.3, 0, 0.2, 1)
  });
  const subT = interpolate(frame, [10, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      backgroundColor: "oklch(97.5% 0.008 82)",
      justifyContent: "center",
      alignItems: "center",
      opacity: fadeOut,
      backgroundImage: "radial-gradient(1100px 750px at 50% 42%, oklch(99.3% 0.014 88 / 0.85), transparent 65%)"
    },
    children: /* @__PURE__ */jsxs("div", {
      style: {
        textAlign: "center",
        maxWidth: 1500
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          fontFamily: SERIF,
          fontSize: 116,
          fontWeight: 600,
          lineHeight: 1.14,
          color: "oklch(18% 0.006 82)",
          letterSpacing: __scCopy("-0.012em"),
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: __scCopy("0.26em")
        },
        children: WORDS.map((w, i) => {
          const delay = 4 + i * 4;
          const t = interpolate(frame, [delay, delay + 9], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.2, 0.75, 0.3, 1)
          });
          return /* @__PURE__ */jsx("span", {
            style: {
              opacity: t,
              transform: `scale(${1.28 - 0.28 * t})`,
              filter: `blur(${(1 - t) * 7}px)`,
              display: "inline-block",
              fontStyle: w.accent ? "italic" : "normal",
              color: w.accent ? "oklch(52% 0.115 65)" : void 0
            },
            children: w.text
          }, i);
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 6,
          width: 220,
          margin: __scCopy("38px auto 0"),
          borderRadius: 3,
          background: "oklch(52% 0.115 65)",
          transform: `scaleX(${underline})`
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          fontFamily: MONO,
          fontSize: 26,
          letterSpacing: __scCopy("0.12em"),
          color: "oklch(50% 0.006 82)",
          marginTop: 34,
          opacity: subT,
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: __scCopy("0.5em")
        },
        children: [/* @__PURE__ */jsx(DigitRoll, {
          value: SUB_DIGITS,
          delay: 12,
          color: "oklch(52% 0.115 65)"
        }), /* @__PURE__ */jsx("span", {
          children: SUB
        })]
      })]
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = PaperTitleCard;
 return {component:template_entry_default,duration:PAPER_TITLE_CARD_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
