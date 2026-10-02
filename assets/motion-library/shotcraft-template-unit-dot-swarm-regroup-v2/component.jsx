// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx
import { useCurrentFrame, spring, interpolate } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

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

// implementation/video-shotcraft/full/stage/source/demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx

var AMBER = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#AMBER", "AMBER", () => "#b45309");
var FPS = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#FPS", "FPS", () => 30);
var N = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#N", "N", () => 320);
var DOT_R = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#DOT_R", "DOT_R", () => 9);
var M1 = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#M1", "M1", () => 12);
var M2 = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#M2", "M2", () => 48);
var M3 = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#M3", "M3", () => 84);
var DUR = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#DUR", "DUR", () => 20);
var STAG = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#STAG", "STAG", () => 8);
var rnd = (i, salt) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
var scatter = i => [300 + rnd(i, 1) * 1320, 330 + rnd(i, 2) * 620];
var groupOf = i => i < 180 ? 0 : i < 282 ? 1 : 2;
var idxInGroup = i => i < 180 ? i : i < 282 ? i - 180 : i - 282;
var GROUP_N = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#GROUP_N", "GROUP_N", () => [180, 102, 38]);
var GROUP_LABEL = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#GROUP_LABEL", "GROUP_LABEL", () => [__scCopy("Free \xB7 7,210"), __scCopy("Pro \xB7 4,102"), __scCopy("Enterprise \xB7 1,535")]);
var CLUSTER_C = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#CLUSTER_C", "CLUSTER_C", () => [[520, 620], [980, 570], [1400, 640]]);
var CLUSTER_R = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#CLUSTER_R", "CLUSTER_R", () => GROUP_N.map(n => 58 + n * 0.46));
var cluster = i => {
  const g = groupOf(i);
  const r = Math.sqrt(rnd(i, 3)) * CLUSTER_R[g];
  const a = rnd(i, 4) * Math.PI * 2;
  return [CLUSTER_C[g][0] + r * Math.cos(a), CLUSTER_C[g][1] + r * Math.sin(a)];
};
var BAR_BASE = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#BAR_BASE", "BAR_BASE", () => 840);
var BAR_X = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#BAR_X", "BAR_X", () => [520, 980, 1400]);
var SPACING = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#SPACING", "SPACING", () => 20);
var bar = i => {
  const g = groupOf(i);
  const j = idxInGroup(i);
  const col = j % 8;
  const row = Math.floor(j / 8);
  return [BAR_X[g] + (col - 3.5) * SPACING, BAR_BASE - row * SPACING];
};
var ONE = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#ONE", "ONE", () => ["00100", "01100", "00100", "00100", "00100", "00100", "01110"]);
var TWO = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#TWO", "TWO", () => ["01110", "10001", "00001", "00010", "00100", "01000", "11111"]);
var EIGHT = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#EIGHT", "EIGHT", () => ["01110", "10001", "10001", "01110", "10001", "10001", "01110"]);
var FOUR = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#FOUR", "FOUR", () => ["00110", "01010", "10010", "11111", "00010", "00010", "00010"]);
var SEVEN = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#SEVEN", "SEVEN", () => ["11111", "00001", "00010", "00100", "00100", "00100", "00100"]);
var CELL = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#CELL", "CELL", () => 40);
var SUB = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#SUB", "SUB", () => 20);
var Y0 = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#Y0", "Y0", () => 390);
var cellPts = (x, y) => [[x, y], [x + SUB, y], [x, y + SUB], [x + SUB, y + SUB]];
var buildDigit = (bitmap, x0) => {
  const out = [];
  bitmap.forEach((rowStr, r) => {
    rowStr.split("").forEach((c, col) => {
      if (c === "1") out.push(...cellPts(x0 + col * CELL, Y0 + r * CELL));
    });
  });
  return out;
};
var DIGIT_PTS = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#DIGIT_PTS", "DIGIT_PTS", () => [...buildDigit(ONE, 350), ...buildDigit(TWO, 590),
// 逗号：基线处两格，微斜的小尾巴
...cellPts(845, Y0 + 5.4 * CELL), ...cellPts(836, Y0 + 6.3 * CELL), ...buildDigit(EIGHT, 920), ...buildDigit(FOUR, 1160), ...buildDigit(SEVEN, 1400)]);
var digit = i => {
  const p = DIGIT_PTS[i % DIGIT_PTS.length];
  const jx = (rnd(i, 5) - 0.5) * 7;
  const jy = (rnd(i, 6) - 0.5) * 7;
  return [p[0] + jx, p[1] + jy];
};
var lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
var fade = (frame, inA, inB, outA, outB) => {
  const fi = interpolate(frame, [inA, inB], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  if (outA === void 0 || outB === void 0) return fi;
  const fo = interpolate(frame, [outA, outB], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return Math.min(fi, fo);
};
var LABEL_FONT = __scConfig("demos/data/chart-live-moves/UnitDotSwarmRegroupV2.tsx#LABEL_FONT", "LABEL_FONT", () => "Helvetica, Arial, sans-serif");
var UnitDotSwarmRegroupV2 = () => {
  const frame = useCurrentFrame();
  const dots = Array.from({
    length: N
  }, (_, i) => {
    const stag = rnd(i, 7) * STAG;
    const mig = start => spring({
      frame: frame - start - stag,
      fps: FPS,
      config: {
        damping: 11.5,
        stiffness: 150,
        mass: 0.8
      },
      durationInFrames: DUR,
      durationRestThreshold: 1e-4
    });
    let p = scatter(i);
    p = lerp(p, cluster(i), mig(M1));
    p = lerp(p, bar(i), mig(M2));
    p = lerp(p, digit(i), mig(M3));
    return p;
  });
  const clusterLabelOp = fade(frame, 38, 46, M2, M2 + 8);
  const barLabelOp = fade(frame, 72, 80, M3, M3 + 8);
  const captionOp = fade(frame, 114, 126);
  return /* @__PURE__ */jsxs2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        top: 110,
        width: "100%",
        textAlign: "center"
      },
      children: /* @__PURE__ */jsx2(TitleBlock, {
        text: __scCopy("UNIT DOT SWARM REGROUP V2"),
        size: 72
      })
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        position: "absolute",
        left: 90,
        bottom: 70,
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: LABEL_FONT,
        fontSize: 24,
        fontWeight: 600,
        color: G.mid
      },
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          width: 18,
          height: 18,
          borderRadius: 9,
          background: G.mid
        }
      }), __scCopy("Each dot \u2248 40 customers")]
    }), /* @__PURE__ */jsx2("svg", {
      width: 1920,
      height: 1080,
      style: {
        position: "absolute",
        inset: 0
      },
      children: dots.map((p, i) => /* @__PURE__ */jsx2("circle", {
        cx: p[0],
        cy: p[1],
        r: DOT_R,
        fill: groupOf(i) === 1 ? AMBER : groupOf(i) === 2 ? G.ink : G.mid
      }, i))
    }), clusterLabelOp > 0 && CLUSTER_C.map((c, g) => /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: c[0] - 200,
        top: c[1] - CLUSTER_R[g] - 66,
        width: 400,
        textAlign: "center",
        fontFamily: LABEL_FONT,
        fontSize: 30,
        fontWeight: 700,
        color: g === 1 ? AMBER : G.ink,
        opacity: clusterLabelOp
      },
      children: GROUP_LABEL[g]
    }, `cl${g}`)), barLabelOp > 0 && /* @__PURE__ */jsxs2(Fragment, {
      children: [/* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: 380,
          width: 1160,
          top: BAR_BASE + 16,
          height: 3,
          background: G.bar,
          opacity: barLabelOp
        }
      }), BAR_X.map((x, g) => /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: x - 150,
          top: BAR_BASE + 30,
          width: 300,
          textAlign: "center",
          fontFamily: LABEL_FONT,
          fontSize: 28,
          fontWeight: 700,
          color: g === 1 ? AMBER : G.mid,
          opacity: barLabelOp
        },
        children: [__scCopy("Free"), __scCopy("Pro"), __scCopy("Enterprise")][g]
      }, `bl${g}`))]
    }), captionOp > 0 && /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: 0,
        width: 1920,
        top: Y0 + 7 * CELL + 60,
        textAlign: "center",
        fontFamily: LABEL_FONT,
        fontSize: 34,
        fontWeight: 600,
        color: G.mid,
        opacity: captionOp,
        letterSpacing: 2
      },
      children: __scCopy("Total customers")
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = UnitDotSwarmRegroupV2;
 return {component:template_entry_default,duration:180};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
