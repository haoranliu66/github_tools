// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Motion.tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { jsx } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/camera/basic-3d-scene/Basic3DScene.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/camera/basic-3d-scene/Basic3DScene.tsx

var BASIC_3D_SCENE_DURATION = 180;
var POSES = __scConfig("demos/camera/basic-3d-scene/Basic3DScene.tsx#POSES", "POSES", () => [{
  x: 0,
  y: 0,
  z: 0,
  rx: 0,
  ry: 0,
  rz: 0,
  s: 1,
  hue: 215,
  tt: __scCopy("STEP 01"),
  sub: __scCopy("Position the idea")
}, {
  x: 520,
  y: -60,
  z: -180,
  rx: 0,
  ry: -40,
  rz: 0,
  s: 1,
  hue: 265,
  tt: __scCopy("STEP 02"),
  sub: __scCopy("Rotate the view")
}, {
  x: 160,
  y: 300,
  z: -520,
  rx: 0,
  ry: 0,
  rz: 90,
  s: 1,
  hue: 165,
  tt: __scCopy("STEP 03"),
  sub: __scCopy("Spin the frame")
}, {
  x: 220,
  y: 90,
  z: -260,
  rx: 0,
  ry: 0,
  rz: 0,
  s: 3.1,
  hue: 25,
  tt: __scCopy("OVERVIEW"),
  sub: __scCopy("See everything")
}]);
var FLY_AT = __scConfig("demos/camera/basic-3d-scene/Basic3DScene.tsx#FLY_AT", "FLY_AT", () => [0.22, 0.48, 0.76]);
var FLY = __scConfig("demos/camera/basic-3d-scene/Basic3DScene.tsx#FLY", "FLY", () => 0.16);
var Basic3DScene = () => {
  const t = useT();
  let af = 0;
  const cam = {
    ...POSES[0]
  };
  for (let i = 0; i < FLY_AT.length; i++) {
    const f = seg(t, FLY_AT[i], FLY_AT[i] + FLY, E.inOutCubic);
    af += f;
    const p = POSES[i + 1];
    cam.x = lerp(f, cam.x, p.x);
    cam.y = lerp(f, cam.y, p.y);
    cam.z = lerp(f, cam.z, p.z);
    cam.rx = lerp(f, cam.rx, p.rx);
    cam.ry = lerp(f, cam.ry, p.ry);
    cam.rz = lerp(f, cam.rz, p.rz);
    cam.s = lerp(f, cam.s, p.s);
  }
  const over = seg(t, FLY_AT[2], FLY_AT[2] + FLY);
  return /* @__PURE__ */jsx2(DesignStage, {
    bg: "#0a0b10",
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 40%,#141828 0%,#0a0b10 70%)",
        perspective: __scCopy("1000px")
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: `scale(${1 / cam.s})
              rotateZ(${-cam.rz}deg) rotateY(${-cam.ry}deg) rotateX(${-cam.rx}deg)
              translate3d(${-cam.x}px,${-cam.y}px,${-cam.z}px)`
        },
        children: POSES.map((p, i) => {
          const last = i === POSES.length - 1;
          const d = Math.min(1, Math.abs(af - i));
          const focus = Math.max(1 - d, over);
          return /* @__PURE__ */jsxs("div", {
            style: {
              position: "absolute",
              left: last ? -160 : -110,
              top: last ? -100 : -70,
              width: last ? 320 : 220,
              height: last ? 200 : 140,
              boxSizing: "border-box",
              borderRadius: 10,
              padding: __scCopy("18px 20px"),
              willChange: "opacity,filter",
              background: `linear-gradient(150deg,hsl(${p.hue},45%,16%),hsl(${p.hue},55%,9%))`,
              border: `1px solid hsl(${p.hue},60%,34%)`,
              boxShadow: `0 18px 50px rgba(0,0,0,.55), inset 0 1px 0 hsla(${p.hue},70%,70%,.25)`,
              transform: `translate3d(${p.x}px,${p.y}px,${p.z}px) rotateX(${p.rx}deg) rotateY(${p.ry}deg) rotateZ(${p.rz}deg) scale(${p.s / (last ? 2.2 : 1)})`,
              fontFamily: "-apple-system,system-ui,sans-serif",
              color: "#eef1f8",
              opacity: 0.28 + focus * 0.72,
              filter: `blur(${(1 - focus) * 3.5}px)`
            },
            children: [/* @__PURE__ */jsx2("div", {
              style: {
                fontSize: 11,
                letterSpacing: 3,
                color: `hsl(${p.hue},80%,68%)`,
                fontWeight: 700
              },
              children: p.tt
            }), /* @__PURE__ */jsx2("div", {
              style: {
                fontSize: last ? 26 : 21,
                fontWeight: 800,
                marginTop: 8
              },
              children: p.sub
            }), /* @__PURE__ */jsx2("div", {
              style: {
                marginTop: 12,
                height: 5,
                width: "56%",
                borderRadius: 3,
                background: `hsl(${p.hue},70%,45%)`
              }
            }), /* @__PURE__ */jsx2("div", {
              style: {
                marginTop: 7,
                height: 5,
                width: "34%",
                borderRadius: 3,
                background: `hsla(${p.hue},50%,60%,.4)`
              }
            })]
          }, i);
        })
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = Basic3DScene;
 return {component:template_entry_default,duration:BASIC_3D_SCENE_DURATION};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
