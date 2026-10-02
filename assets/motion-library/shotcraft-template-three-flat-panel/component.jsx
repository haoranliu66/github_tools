// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/local-three-panel.tsx
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";

// implementation/video-shotcraft/full/stage/source/assets/lib/FlatPanel.tsx
import * as THREE from "three";
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/assets/lib/helpers/camera.tsx
import { useThree } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import * as THREE2 from "three";

// implementation/video-shotcraft/full/stage/source/assets/lib/helpers/shake.ts

// implementation/video-shotcraft/full/stage/source/local-three-panel.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var useShadowTexture = () => {
  return useMemo(() => {
    const c = document.createElement(__scCopy("canvas"));
    c.width = c.height = 128;
    const ctx = c.getContext(__scCopy("2d"));
    const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 64);
    g.addColorStop(0, "rgba(58,51,42,0.32)");
    g.addColorStop(1, "rgba(58,51,42,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(c);
    return tex;
  }, []);
};
var FlatPanel = ({
  texture,
  width,
  height,
  position = [0, 0.02, 0],
  yaw = 0,
  opacity = 1,
  glow = 0.3,
  shadow = true
}) => {
  const shadowTex = useShadowTexture();
  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: "#fdfcfa",
      roughness: 0.62,
      metalness: 0,
      transparent: true
    });
    return m;
  }, []);
  mat.map = texture ?? null;
  mat.emissive = new THREE.Color("#ffffff");
  mat.emissiveMap = texture ?? null;
  mat.emissiveIntensity = glow;
  mat.opacity = opacity;
  mat.needsUpdate = true;
  return /* @__PURE__ */jsxs("group", {
    position,
    rotation: [0, yaw, 0],
    children: [shadow ? /* @__PURE__ */jsxs("mesh", {
      rotation: [-Math.PI / 2, 0, 0],
      position: [0.05, -0.012, 0.06],
      children: [/* @__PURE__ */jsx("planeGeometry", {
        args: [width * 1.3, height * 1.3]
      }), /* @__PURE__ */jsx("meshBasicMaterial", {
        map: shadowTex,
        transparent: true,
        opacity: 0.85 * opacity,
        depthWrite: false
      })]
    }) : null, /* @__PURE__ */jsx("mesh", {
      rotation: [-Math.PI / 2, 0, 0],
      material: mat,
      children: /* @__PURE__ */jsx("planeGeometry", {
        args: [width, height]
      })
    })]
  });
};

// implementation/video-shotcraft/full/stage/source/assets/lib/helpers/camera.tsx

// implementation/video-shotcraft/full/stage/source/assets/lib/helpers/shake.ts
var handheld = (frame, amp = 0.012) => [amp * (Math.sin(frame * 0.31) + 0.6 * Math.sin(frame * 0.83 + 1.7)), amp * (Math.sin(frame * 0.47 + 0.9) + 0.5 * Math.sin(frame * 1.13 + 3.1)), 0];

// implementation/video-shotcraft/full/stage/source/assets/lib/helpers/camera.tsx
var easeInOut = Easing.bezier(0.4, 0, 0.2, 1);
var Rig = ({
  keyframes,
  easing = easeInOut,
  shake = 0
}) => {
  const frame = useCurrentFrame();
  const {
    camera
  } = useThree();
  let a = keyframes[0];
  let b = keyframes[keyframes.length - 1];
  for (let i = 0; i < keyframes.length - 1; i++) {
    if (frame >= keyframes[i].frame && frame <= keyframes[i + 1].frame) {
      a = keyframes[i];
      b = keyframes[i + 1];
      break;
    }
  }
  const t = a.frame === b.frame ? 1 : interpolate(frame, [a.frame, b.frame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  });
  const lerp3 = (p, q) => new THREE2.Vector3(p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t);
  const pos = lerp3(a.pos, b.pos);
  const look = lerp3(a.look, b.look);
  const fov = (a.fov ?? 36) + ((b.fov ?? 36) - (a.fov ?? 36)) * t;
  useLayoutEffect(() => {
    if (shake > 0) {
      const [dx, dy] = handheld(frame, shake);
      pos.x += dx;
      pos.y += dy;
      look.x += dx * 0.6;
      look.y += dy * 0.6;
    }
    camera.position.copy(pos);
    camera.lookAt(look);
    if (camera instanceof THREE2.PerspectiveCamera) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });
  return null;
};

// implementation/video-shotcraft/full/stage/source/local-three-panel.tsx

var ThreePanel = ({
  panel = {},
  keyframes = [{
    frame: 0,
    pos: [0, 6, 7],
    look: [0, 0, 0],
    fov: 45
  }, {
    frame: 180,
    pos: [4, 5, 5],
    look: [0, 0, 0],
    fov: 40
  }]
}) => {
  const {
    width,
    height
  } = useVideoConfig();
  return /* @__PURE__ */jsxs2(ThreeCanvas, {
    width,
    height,
    camera: {
      position: [0, 6, 7],
      fov: 45
    },
    children: [/* @__PURE__ */jsx2("color", {
      attach: "background",
      args: ["#ece8e0"]
    }), /* @__PURE__ */jsx2("ambientLight", {
      intensity: 1.8
    }), /* @__PURE__ */jsx2("directionalLight", {
      position: [5, 8, 3],
      intensity: 2
    }), /* @__PURE__ */jsx2(Rig, {
      keyframes
    }), /* @__PURE__ */jsx2(FlatPanel, {
      texture: null,
      width: 4,
      height: 3,
      ...panel
    }), /* @__PURE__ */jsxs2("mesh", {
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -0.04, 0],
      children: [/* @__PURE__ */jsx2("planeGeometry", {
        args: [30, 30]
      }), /* @__PURE__ */jsx2("meshStandardMaterial", {
        color: "#e2dbcd"
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = ThreePanel;
 return {component:template_entry_default,duration:180};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
