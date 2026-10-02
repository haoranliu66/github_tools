// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/effects/spotlight-sweep-moves/GlowWakeSleepPanel.tsx
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
 var W = __scConfig("demos/effects/spotlight-sweep-moves/GlowWakeSleepPanel.tsx#W", "W", () => 1250);
var H = __scConfig("demos/effects/spotlight-sweep-moves/GlowWakeSleepPanel.tsx#H", "H", () => 860);
var R = __scConfig("demos/effects/spotlight-sweep-moves/GlowWakeSleepPanel.tsx#R", "R", () => 26);
var ink = "#3a3a3a";
var mid = "#9a9a98";
var line = "#e2e2e0";
var Row = ({
  w,
  icon = true
}) => /* @__PURE__ */jsxs("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    height: 30
  },
  children: [icon && /* @__PURE__ */jsx("div", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 5,
      background: mid
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 11,
      width: w,
      background: "#c9c9c7",
      borderRadius: 6
    }
  })]
});
var TaskCard = ({
  seed
}) => /* @__PURE__ */jsxs("div", {
  style: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
    padding: __scCopy("14px 0")
  },
  children: [/* @__PURE__ */jsx("div", {
    style: {
      height: 9,
      width: 150 + seed % 3 * 22,
      background: line,
      borderRadius: 5
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 12,
      width: 190 + seed * 7 % 4 * 18,
      background: "#b9b9b7",
      borderRadius: 6
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      width: 15,
      height: 11,
      background: "#d9d9d7",
      borderRadius: 2
    }
  })]
});
var Panel = () => /* @__PURE__ */jsxs("div", {
  style: {
    width: W,
    height: H,
    background: "#f6f6f5",
    borderRadius: R,
    display: "flex",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      width: 300,
      borderRight: `2px solid ${line}`,
      padding: __scCopy("30px 28px"),
      boxSizing: "border-box"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 34
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 30,
          height: 30,
          borderRadius: 8,
          background: ink
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 16,
          width: 96,
          background: ink,
          borderRadius: 7
        }
      })]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      },
      children: [/* @__PURE__ */jsx(Row, {
        w: 72
      }), /* @__PURE__ */jsx(Row, {
        w: 128
      }), /* @__PURE__ */jsx(Row, {
        w: 64
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        height: 13,
        width: 84,
        background: "#b3b3b1",
        borderRadius: 6,
        margin: __scCopy("34px 0 16px")
      }
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      },
      children: [/* @__PURE__ */jsx(Row, {
        w: 110
      }), /* @__PURE__ */jsx(Row, {
        w: 140
      }), /* @__PURE__ */jsx(Row, {
        w: 104
      }), /* @__PURE__ */jsx(Row, {
        w: 126
      })]
    })]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      flex: 1,
      padding: __scCopy("30px 36px"),
      boxSizing: "border-box"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 30
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 24,
          height: 20,
          background: mid,
          borderRadius: 4
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 17,
          width: 250,
          background: "#6f6f6d",
          borderRadius: 8
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 12,
          width: 96,
          background: line,
          borderRadius: 6,
          marginLeft: 40
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 12,
          width: 76,
          background: line,
          borderRadius: 6
        }
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        display: "flex",
        gap: 44
      },
      children: [0, 1].map(col => /* @__PURE__ */jsxs("div", {
        style: {
          flex: 1
        },
        children: [/* @__PURE__ */jsxs("div", {
          style: {
            borderTop: `4px solid ${col === 0 ? "#b9a44c" : "#6b5bd6"}`,
            paddingTop: 16,
            display: "flex",
            alignItems: "center",
            gap: 10
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              height: 14,
              width: 88,
              background: "#5a5a58",
              borderRadius: 7
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              width: 22,
              height: 22,
              borderRadius: 11,
              border: `2px solid ${line}`
            }
          })]
        }), [0, 1, 2].map(i => /* @__PURE__ */jsx(TaskCard, {
          seed: col * 3 + i + 1
        }, i))]
      }, col))
    })]
  })]
});
var EdgeStreak = ({
  cx,
  y,
  len,
  opacity,
  vertical = false
}) => {
  const long = {
    position: "absolute",
    left: 0,
    top: 0,
    opacity
  };
  const grad = c => vertical ? `linear-gradient(180deg, rgba(0,0,0,0) 0%, ${c} 45%, ${c} 55%, rgba(0,0,0,0) 100%)` : `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${c} 45%, ${c} 55%, rgba(0,0,0,0) 100%)`;
  if (vertical) {
    return /* @__PURE__ */jsxs("div", {
      style: long,
      children: [/* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: y - 30,
          top: cx - len / 2,
          width: 60,
          height: len,
          background: grad("rgba(147,80,235,0.55)"),
          filter: "blur(26px)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: y - 11,
          top: cx - len / 2,
          width: 22,
          height: len,
          background: grad("rgba(190,120,255,0.85)"),
          filter: "blur(9px)"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: y - 2.5,
          top: cx - len * 0.4,
          width: 5,
          height: len * 0.8,
          background: grad("#f0deff"),
          filter: "blur(1.4px)"
        }
      })]
    });
  }
  return /* @__PURE__ */jsxs("div", {
    style: long,
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: cx - len / 2,
        top: y - 34,
        width: len,
        height: 68,
        background: grad("rgba(150,82,238,0.60)"),
        filter: "blur(26px)"
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: cx - len / 2,
        top: y - 12,
        width: len,
        height: 24,
        background: grad("rgba(196,126,255,0.9)"),
        filter: "blur(9px)"
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: cx - len * 0.4,
        top: y - 3,
        width: len * 0.8,
        height: 6,
        background: grad("#f4e4ff"),
        filter: "blur(1.6px)"
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: cx - len * 0.3,
        top: y - 7,
        width: len * 0.6,
        height: 12,
        background: grad("rgba(240,150,230,0.75)"),
        filter: "blur(5px)"
      }
    })]
  });
};
var GlowWakeSleepPanel = () => {
  const frame = useCurrentFrame();
  const sx = interpolate(frame, [4, 120], [-260, W + 260], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const sy = 150;
  const env = interpolate(frame, [0, 16, 100, 130], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rightNear = Math.max(0, Math.min(1, (sx - (W - 420)) / 420));
  const tailBlue = interpolate(frame, [100, 116, 132], [0, 0.8, 0.25], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const logoGlow = Math.exp(-((sx - 60) ** 2) / (2 * 230 ** 2)) * env;
  const drift = interpolate(frame, [0, 132], [-150, 150]);
  const driftY = interpolate(frame, [0, 132], [-36, 36]);
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: "#040308",
      overflow: "hidden"
    },
    children: /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        inset: 0,
        perspective: 1700,
        perspectiveOrigin: "46% 40%"
      },
      children: /* @__PURE__ */jsxs("div", {
        style: {
          position: "absolute",
          left: 400,
          top: 150,
          transform: `translate(${drift}px, ${driftY}px) scale(1.05) rotateY(-13deg) rotateX(9deg) rotateZ(-17deg)`,
          transformStyle: "preserve-3d"
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: sx - 520,
            top: -300,
            width: 1040,
            height: 700,
            background: "radial-gradient(ellipse at 50% 55%, rgba(110,62,205,0.42), rgba(110,62,205,0) 65%)",
            filter: "blur(34px)",
            opacity: env
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: -46,
            top: 34
          },
          children: /* @__PURE__ */jsxs("div", {
            style: {
              position: "relative",
              filter: "brightness(0.92)"
            },
            children: [/* @__PURE__ */jsx(Panel, {}), /* @__PURE__ */jsx("div", {
              style: {
                position: "absolute",
                inset: 0,
                borderRadius: R,
                background: `radial-gradient(circle 680px at ${sx - 46}px ${sy + 34}px, rgba(4,3,8,${1 - 0.45 * env}) 0%, rgba(4,3,8,${1 - 0.14 * env}) 55%, rgba(4,3,8,0.99) 88%)`
              }
            })]
          })
        }), /* @__PURE__ */jsxs("div", {
          style: {
            position: "relative"
          },
          children: [/* @__PURE__ */jsx(Panel, {}), /* @__PURE__ */jsx("div", {
            style: {
              position: "absolute",
              inset: 0,
              borderRadius: R,
              background: `radial-gradient(circle 640px at ${sx}px ${sy}px, rgba(4,3,8,${0.12 * (1 - env)}) 0%, rgba(4,3,8,${1 - 0.72 * env}) 58%, rgba(4,3,8,0.985) 92%)`
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              position: "absolute",
              inset: 0,
              borderRadius: R,
              background: "linear-gradient(260deg, rgba(120,130,235,0.30) 0%, rgba(120,130,235,0) 16%)",
              opacity: tailBlue
            }
          })]
        }), /* @__PURE__ */jsx(EdgeStreak, {
          cx: sx,
          y: -2,
          len: 980,
          opacity: env
        }), /* @__PURE__ */jsx(EdgeStreak, {
          cx: 260,
          y: W + 2,
          len: 620,
          opacity: Math.max(rightNear * env, tailBlue * 0.9),
          vertical: true
        }), /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: 8,
            top: 12,
            width: 150,
            height: 66,
            borderRadius: 16,
            boxShadow: "0 0 26px 8px rgba(196,126,255,0.75), 0 0 60px 22px rgba(150,82,238,0.4)",
            opacity: logoGlow
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: sx - 190,
            top: -84,
            width: 380,
            height: 170,
            background: "radial-gradient(ellipse, rgba(236,205,255,0.95), rgba(180,110,250,0.35) 45%, rgba(0,0,0,0) 72%)",
            filter: "blur(12px)",
            opacity: env * 0.95
          }
        })]
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GlowWakeSleepPanel;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
