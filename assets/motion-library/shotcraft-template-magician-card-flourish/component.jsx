// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/opening/magician-card-flourish/MagicianCardFlourish.tsx
import { useId } from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/opening/magician-card-flourish/MagicianCardFlourish.tsx
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

// implementation/video-shotcraft/full/stage/source/demos/opening/magician-card-flourish/MagicianCardFlourish.tsx

var CARD_W = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#CARD_W", "CARD_W", () => 380);
var CARD_H = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#CARD_H", "CARD_H", () => 540);
var AX = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#AX", "AX", () => CARD_W / Math.hypot(CARD_W, CARD_H));
var AY = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#AY", "AY", () => CARD_H / Math.hypot(CARD_W, CARD_H));
var TAKEOFF = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#TAKEOFF", "TAKEOFF", () => 9);
var FLASH_END = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#FLASH_END", "FLASH_END", () => 12);
var FLIGHT = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#FLIGHT", "FLIGHT", () => 50);
var LAND = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#LAND", "LAND", () => TAKEOFF + FLIGHT);
var SHEEN_START = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#SHEEN_START", "SHEEN_START", () => LAND + 8);
var SHEEN_DUR = 26;
var TURNS = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#TURNS", "TURNS", () => 13);
var FINAL_SCALE = __scConfig("demos/opening/magician-card-flourish/MagicianCardFlourish.tsx#FINAL_SCALE", "FINAL_SCALE", () => 1.88);
var CardFace = () => /* @__PURE__ */jsxs2("div", {
  style: {
    width: CARD_W,
    height: CARD_H,
    borderRadius: 22,
    background: G.card,
    border: `2px solid ${G.border}`,
    boxSizing: "border-box",
    padding: 26,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    overflow: "hidden"
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      height: 26,
      width: "62%",
      background: G.bar,
      borderRadius: 13
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      height: 12,
      width: "84%",
      background: G.line,
      borderRadius: 6
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      flex: 1,
      borderRadius: 14,
      background: `linear-gradient(145deg, #e6e6e4, ${G.bar})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    children: /* @__PURE__ */jsx2("div", {
      style: {
        width: 110,
        height: 110,
        borderRadius: 55,
        background: G.mid,
        opacity: 0.55
      }
    })
  }), /* @__PURE__ */jsx2("div", {
    style: {
      height: 12,
      width: "74%",
      background: G.line,
      borderRadius: 6
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      height: 12,
      width: "52%",
      background: G.line,
      borderRadius: 6
    }
  }), /* @__PURE__ */jsxs2("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 4
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 17,
        background: G.mid
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        height: 11,
        width: 90,
        background: G.line,
        borderRadius: 5
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        marginLeft: "auto",
        width: 58,
        height: 24,
        borderRadius: 12,
        background: G.ink,
        opacity: 0.75
      }
    })]
  })]
});
var CardBack = () => /* @__PURE__ */jsxs2("div", {
  style: {
    position: "absolute",
    inset: 0,
    borderRadius: 22,
    background: "#3c3c40",
    border: "2px solid #55555a",
    boxSizing: "border-box",
    overflow: "hidden"
  },
  children: [/* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 14px, transparent 14px 28px)"
    }
  }), /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      inset: 34,
      borderRadius: 12,
      border: "2px solid rgba(255,255,255,0.16)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    children: /* @__PURE__ */jsx2("div", {
      style: {
        width: 72,
        height: 72,
        borderRadius: 36,
        border: "3px solid rgba(255,255,255,0.22)"
      }
    })
  })]
});
var SpawnFlash = ({
  f
}) => {
  const SPIKE_ID = `mcf-needle-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  if (f > FLASH_END) return null;
  const grow = interpolate(f, [0, 2.5], [0.2, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad)
  });
  const shrink = interpolate(f, [6, TAKEOFF, FLASH_END], [1, 0.3, 0.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad)
  });
  const s = grow * shrink;
  const flicker = 0.94 + 0.06 * (0.5 + 0.5 * Math.sin(f * 1.9) * Math.sin(f * 0.83 + 1.7));
  const opacity = interpolate(f, [0, 2, 6, FLASH_END], [0, 1, 1, 0], {
    extrapolateRight: "clamp"
  }) * flicker;
  const rot = interpolate(f, [0, FLASH_END], [0, 90], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad)
  });
  const needle = (deg, len, w0, op) => /* @__PURE__ */jsxs2("g", {
    transform: `rotate(${deg})`,
    opacity: op,
    children: [/* @__PURE__ */jsx2("path", {
      d: `M 0 ${-w0 / 2} L ${len} 0 L 0 ${w0 / 2} Z`,
      fill: `url(#${SPIKE_ID})`
    }), /* @__PURE__ */jsx2("path", {
      d: `M 0 ${-w0 / 2} L ${len} 0 L 0 ${w0 / 2} Z`,
      fill: `url(#${SPIKE_ID})`,
      transform: "scale(-1,1)"
    })]
  }, `${deg}-${len}`);
  return /* @__PURE__ */jsxs2("div", {
    style: {
      position: "absolute",
      left: 960,
      top: 540,
      width: 0,
      height: 0,
      transform: `scale(${s})`,
      opacity,
      pointerEvents: "none"
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: -13,
        top: -13,
        width: 26,
        height: 26,
        borderRadius: 13,
        background: "radial-gradient(circle, #ffffff 0%, rgba(225,245,255,0.95) 45%, rgba(140,215,255,0) 80%)",
        filter: "blur(0.6px)"
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: -70,
        top: -70,
        width: 140,
        height: 140,
        borderRadius: 70,
        background: "radial-gradient(circle, rgba(90,175,255,0.75) 0%, rgba(50,130,245,0.35) 45%, rgba(40,110,235,0) 75%)",
        filter: "blur(4px)"
      }
    }), /* @__PURE__ */jsx2("svg", {
      width: 260,
      height: 260,
      viewBox: "-130 -130 260 260",
      style: {
        position: "absolute",
        left: -130,
        top: -130,
        transform: `rotate(${-rot * 0.6}deg)`
      },
      children: [15, 52, 88, 123, 160, 197, 231, 268, 305, 341].map((deg, i) => {
        const ln = 46 + i * 37 % 3 * 16;
        return /* @__PURE__ */jsx2("g", {
          transform: `rotate(${deg})`,
          opacity: 0.75,
          children: /* @__PURE__ */jsx2("path", {
            d: `M 8 -1.1 L ${ln} 0 L 8 1.1 Z`,
            fill: "rgba(150,210,255,0.85)",
            filter: "blur(0.8px)"
          })
        }, deg);
      })
    }), /* @__PURE__ */jsxs2("svg", {
      width: 3200,
      height: 3200,
      viewBox: "-1600 -1600 3200 3200",
      style: {
        position: "absolute",
        left: -1600,
        top: -1600,
        transform: `rotate(${rot}deg)`
      },
      children: [/* @__PURE__ */jsx2("defs", {
        children: /* @__PURE__ */jsxs2("linearGradient", {
          id: SPIKE_ID,
          x1: "0",
          y1: "0",
          x2: "1",
          y2: "0",
          children: [/* @__PURE__ */jsx2("stop", {
            offset: "0",
            stopColor: "#eaf6ff",
            stopOpacity: "1"
          }), /* @__PURE__ */jsx2("stop", {
            offset: "0.05",
            stopColor: "#8cc8ff",
            stopOpacity: "0.95"
          }), /* @__PURE__ */jsx2("stop", {
            offset: "0.3",
            stopColor: "#3f9bff",
            stopOpacity: "0.88"
          }), /* @__PURE__ */jsx2("stop", {
            offset: "0.62",
            stopColor: "#2277f2",
            stopOpacity: "0.6"
          }), /* @__PURE__ */jsx2("stop", {
            offset: "0.88",
            stopColor: "#1b64e0",
            stopOpacity: "0.25"
          }), /* @__PURE__ */jsx2("stop", {
            offset: "1",
            stopColor: "#1a5fd8",
            stopOpacity: "0"
          })]
        })
      }), /* @__PURE__ */jsx2("g", {
        filter: "blur(7px)",
        opacity: 0.75,
        children: needle(-38, 826, 26, 1)
      }), /* @__PURE__ */jsx2("g", {
        filter: "blur(1.8px)",
        children: needle(-38, 840, 8, 1)
      }), needle(-38, 819, 3, 1), /* @__PURE__ */jsx2("g", {
        filter: "blur(5px)",
        opacity: 0.75,
        children: needle(52, 413, 20, 1)
      }), /* @__PURE__ */jsx2("g", {
        filter: "blur(1.5px)",
        children: needle(52, 420, 6.5, 1)
      }), needle(52, 410, 2.6, 1)]
    })]
  });
};
var Scene = () => {
  const f = useCurrentFrame();
  const tEff = Math.min(1, Math.max(0, (f - TAKEOFF) / FLIGHT));
  const airborne = f >= TAKEOFF;
  const spinP = tEff < 0.4 ? tEff * 1.55 : 0.62 + 0.38 * (1 - Math.pow(1 - (tEff - 0.4) / 0.6, 2.4));
  const theta = TURNS * 360 * Math.min(1, spinP);
  const tp = tEff < 0.14 ? 0.06 * (tEff / 0.14) * (tEff / 0.14) : 0.06 + 0.94 * (1 - Math.pow(1 - (tEff - 0.14) / 0.86, 3));
  const arc = Math.sin(tp * Math.PI);
  const cx = 960 + arc * 360;
  const cy = 540 - arc * 250;
  const FOCAL = 900;
  const z = interpolate(tp, [0, 1], [14e3, 0]);
  const scale = FINAL_SCALE * (FOCAL / (FOCAL + z));
  const facingBack = Math.cos(theta * Math.PI / 180) < 0;
  const sheenP = interpolate(f, [SHEEN_START, SHEEN_START + SHEEN_DUR], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic)
  });
  const sheenVisible = f >= SHEEN_START && f <= SHEEN_START + SHEEN_DUR;
  const sheenLift = sheenVisible ? 0.07 * Math.sin(sheenP * Math.PI) : 0;
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: "#000000",
      position: "relative",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx2("div", {
      style: {
        position: "absolute",
        left: cx - CARD_W / 2,
        top: cy - CARD_H / 2,
        width: CARD_W,
        height: CARD_H,
        transform: `scale(${scale})`,
        transformOrigin: "50% 50%",
        opacity: airborne ? 1 : 0
      },
      children: /* @__PURE__ */jsxs2("div", {
        style: {
          width: "100%",
          height: "100%",
          transform: `perspective(1300px) rotate3d(${AX}, ${AY}, 0, ${theta}deg)`,
          transformOrigin: "50% 50%",
          position: "relative",
          borderRadius: 22,
          filter: sheenLift > 0 ? `brightness(${1 + sheenLift})` : void 0
        },
        children: [/* @__PURE__ */jsx2(CardFace, {}), /* @__PURE__ */jsx2("div", {
          style: {
            opacity: facingBack ? 1 : 0,
            position: "absolute",
            inset: 0
          },
          children: /* @__PURE__ */jsx2(CardBack, {})
        }), /* @__PURE__ */jsx2("div", {
          style: {
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            pointerEvents: "none",
            background: `linear-gradient(${115 + Math.sin(theta * Math.PI / 180) * 30}deg, rgba(255,255,255,0) 30%, rgba(255,255,255,${0.14 + 0.14 * Math.abs(Math.sin(theta * Math.PI / 180))}) 50%, rgba(255,255,255,0) 70%)`,
            mixBlendMode: "screen"
          }
        }), sheenVisible && /* @__PURE__ */jsxs2("div", {
          style: {
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            overflow: "hidden",
            pointerEvents: "none"
          },
          children: [/* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              top: "-45%",
              bottom: "-45%",
              left: `${-70 + sheenP * 215}%`,
              width: "42%",
              background: "linear-gradient(100deg, rgba(200,200,205,0) 0%, rgba(225,225,230,0.5) 34%, rgba(255,255,255,0.9) 50%, rgba(225,225,230,0.5) 66%, rgba(200,200,205,0) 100%)",
              transform: "rotate(16deg)",
              mixBlendMode: "overlay"
            }
          }), /* @__PURE__ */jsx2("div", {
            style: {
              position: "absolute",
              top: "-45%",
              bottom: "-45%",
              left: `${-70 + sheenP * 215}%`,
              width: "26%",
              background: "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0) 100%)",
              transform: "rotate(16deg)",
              mixBlendMode: "screen"
            }
          })]
        })]
      })
    })
  });
};
var FlashLayer = () => {
  const f = useCurrentFrame();
  return /* @__PURE__ */jsx2("div", {
    style: {
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      pointerEvents: "none"
    },
    children: /* @__PURE__ */jsx2(SpawnFlash, {
      f
    })
  });
};
var MagicianCardFlourish = () => /* @__PURE__ */jsxs2(Fragment, {
  children: [/* @__PURE__ */jsx2(CameraMotionBlur, {
    shutterAngle: 150,
    samples: 7,
    children: /* @__PURE__ */jsx2(Scene, {})
  }), /* @__PURE__ */jsx2(FlashLayer, {})]
});

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = MagicianCardFlourish;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
