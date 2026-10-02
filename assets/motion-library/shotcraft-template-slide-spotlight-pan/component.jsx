// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/spotlight-sweep-moves/SlideSpotlightPan.tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
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
 var ink = "#3c3c3a";
var mid = "#98989a";
var line = "#e4e4e2";
var PW = __scConfig("demos/effects/spotlight-sweep-moves/SlideSpotlightPan.tsx#PW", "PW", () => 3e3);
var PH = __scConfig("demos/effects/spotlight-sweep-moves/SlideSpotlightPan.tsx#PH", "PH", () => 1400);
var TOP = __scConfig("demos/effects/spotlight-sweep-moves/SlideSpotlightPan.tsx#TOP", "TOP", () => 150);
var CR = __scConfig("demos/effects/spotlight-sweep-moves/SlideSpotlightPan.tsx#CR", "CR", () => 60);
var SideRow = ({
  w
}) => /* @__PURE__ */jsxs("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    height: 44
  },
  children: [/* @__PURE__ */jsx("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 7,
      background: mid
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 15,
      width: w,
      background: "#c6c6c4",
      borderRadius: 7
    }
  })]
});
var Task = ({
  seed
}) => /* @__PURE__ */jsxs("div", {
  style: {
    display: "flex",
    flexDirection: "column",
    gap: 13,
    padding: __scCopy("26px 0")
  },
  children: [/* @__PURE__ */jsx("div", {
    style: {
      height: 13,
      width: 210 + seed % 3 * 30,
      background: line,
      borderRadius: 6
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 17,
      width: 260 + seed * 7 % 4 * 26,
      background: "#aeaeac",
      borderRadius: 8
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      width: 22,
      height: 16,
      background: "#d6d6d4",
      borderRadius: 3
    }
  })]
});
var Col = ({
  accent,
  seed,
  w
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: w,
    flexShrink: 0
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      borderTop: `6px solid ${accent}`,
      paddingTop: 24,
      display: "flex",
      alignItems: "center",
      gap: 14
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 20,
        width: 120,
        background: "#525250",
        borderRadius: 9
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 16,
        border: `3px solid ${line}`
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        marginLeft: "auto",
        width: 22,
        height: 22,
        background: line,
        borderRadius: 4
      }
    })]
  }), [0, 1].map(i => /* @__PURE__ */jsx(Task, {
    seed: seed + i
  }, i))]
});
var WidePanel = () => /* @__PURE__ */jsxs("div", {
  style: {
    width: PW,
    height: PH,
    background: "#f4f4f3",
    display: "flex",
    boxSizing: "border-box",
    borderRadius: `${CR}px ${CR}px 0 0`
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      width: 560,
      borderRight: `3px solid ${line}`,
      padding: __scCopy("52px 48px"),
      boxSizing: "border-box"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 18,
        marginBottom: 56
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 46,
          height: 46,
          borderRadius: 12,
          background: ink
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 26,
          width: 150,
          background: ink,
          borderRadius: 10
        }
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 20
      },
      children: [/* @__PURE__ */jsx(SideRow, {
        w: 110
      }), /* @__PURE__ */jsx(SideRow, {
        w: 200
      }), /* @__PURE__ */jsx(SideRow, {
        w: 100
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        height: 20,
        width: 130,
        background: "#adadab",
        borderRadius: 9,
        margin: __scCopy("58px 0 24px")
      }
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 20
      },
      children: [/* @__PURE__ */jsx(SideRow, {
        w: 180
      }), /* @__PURE__ */jsx(SideRow, {
        w: 220
      }), /* @__PURE__ */jsx(SideRow, {
        w: 170
      })]
    })]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      flex: 1,
      padding: __scCopy("52px 64px"),
      boxSizing: "border-box"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 22,
        marginBottom: 48
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 36,
          height: 30,
          background: mid,
          borderRadius: 6
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 26,
          width: 400,
          background: "#606060",
          borderRadius: 11
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 18,
          width: 150,
          background: line,
          borderRadius: 8,
          marginLeft: 64
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 18,
          width: 120,
          background: line,
          borderRadius: 8
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 18,
          width: 90,
          background: line,
          borderRadius: 8
        }
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: 84
      },
      children: [/* @__PURE__ */jsx(Col, {
        accent: "#c4ad45",
        seed: 1,
        w: 620
      }), /* @__PURE__ */jsx(Col, {
        accent: "#6b5bd6",
        seed: 4,
        w: 620
      }), /* @__PURE__ */jsx(Col, {
        accent: "#4f8f6f",
        seed: 7,
        w: 620
      })]
    })]
  })]
});
var SlideSpotlightPan = () => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 132], [180, -1100]);
  const head = interpolate(frame, [0, 132], [-360, 2600]);
  const onTop = Math.max(0, head);
  const cornerT = Math.min(1, Math.max(0, (head + 360) / 360));
  const vertHeadY = TOP + 620 - cornerT * 620;
  const headScreenX = slide + onTop;
  const leftEdgeX = slide;
  const vGlow = head < 0 ? 1 : Math.max(0, 1 - head / 900);
  const hGlow = Math.min(1, Math.max(0, (head + 120) / 240));
  const grad = (dir, c) => `linear-gradient(${dir}, rgba(0,0,0,0) 0%, ${c} 42%, ${c} 58%, rgba(0,0,0,0) 100%)`;
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#050409",
      overflow: "hidden"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: 0,
        top: TOP,
        transform: `translateX(${slide}px)`
      },
      children: [/* @__PURE__ */jsx(WidePanel, {}), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: onTop - 620,
          top: -30,
          width: 1240,
          height: 380,
          background: "radial-gradient(ellipse 620px 190px at 50% 0%, rgba(168,95,245,0.5), rgba(140,75,235,0.16) 55%, rgba(0,0,0,0) 78%)",
          filter: "blur(6px)",
          opacity: hGlow
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: -30,
          top: vertHeadY - TOP - 320,
          width: 340,
          height: 780,
          background: "radial-gradient(ellipse 170px 390px at 0% 50%, rgba(168,95,245,0.45), rgba(140,75,235,0.14) 55%, rgba(0,0,0,0) 78%)",
          filter: "blur(6px)",
          opacity: vGlow
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          inset: -60,
          background: `radial-gradient(ellipse 1350px 1000px at ${onTop + 60}px ${(head < 0 ? vertHeadY - TOP : 40) + 260}px, rgba(0,0,0,0) 26%, rgba(0,0,0,0.55) 60%, rgba(5,4,9,0.96) 100%)`
        }
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        opacity: hGlow
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: headScreenX - 640,
          top: TOP - 56,
          width: 1280,
          height: 112,
          background: grad(__scCopy("90deg"), "rgba(150,82,238,0.55)"),
          filter: "blur(30px)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: headScreenX - 470,
          top: TOP - 17,
          width: 940,
          height: 34,
          background: grad(__scCopy("90deg"), "rgba(196,126,255,0.9)"),
          filter: "blur(10px)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: headScreenX - 330,
          top: TOP - 8,
          width: 660,
          height: 16,
          background: grad(__scCopy("90deg"), "rgba(240,155,235,0.85)"),
          filter: "blur(5px)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: headScreenX - 300,
          top: TOP - 3,
          width: 600,
          height: 6,
          background: grad(__scCopy("90deg"), "#f6e8ff"),
          filter: "blur(1.5px)"
        }
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        opacity: vGlow
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: leftEdgeX - 52,
          top: vertHeadY - 420,
          width: 104,
          height: 840,
          background: grad(__scCopy("180deg"), "rgba(150,82,238,0.5)"),
          filter: "blur(28px)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: leftEdgeX - 14,
          top: vertHeadY - 330,
          width: 28,
          height: 660,
          background: grad(__scCopy("180deg"), "rgba(196,126,255,0.9)"),
          filter: "blur(9px)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: leftEdgeX - 3,
          top: vertHeadY - 260,
          width: 6,
          height: 520,
          background: grad(__scCopy("180deg"), "#f6e8ff"),
          filter: "blur(1.5px)"
        }
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: 1920,
        height: TOP - 4,
        background: "linear-gradient(180deg, #050409 78%, rgba(5,4,9,0) 100%)"
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SlideSpotlightPan;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
