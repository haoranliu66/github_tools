// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/camera/steep-tilt-glide/SteepTiltGlide.tsx
import { useId } from "react";
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
 var FONT = __scConfig("demos/camera/steep-tilt-glide/SteepTiltGlide.tsx#FONT", "FONT", () => "Helvetica, Arial, sans-serif");
var INK = __scConfig("demos/camera/steep-tilt-glide/SteepTiltGlide.tsx#INK", "INK", () => "#2f2f36");
var easeFall = Easing.bezier(0.5, 0.05, 0.6, 1);
var FloatWrap = ({
  h,
  children
}) => /* @__PURE__ */jsxs("div", {
  style: {
    position: "relative"
  },
  children: [h > 2 && /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      inset: 0,
      transform: `translate(${h * 0.24}px, ${h * 0.46}px) scale(${1 + h * 9e-4})`,
      filter: `blur(${5 + h * 0.075}px) brightness(0.35) saturate(0.4)`,
      opacity: Math.min(0.38, 0.15 + h * 16e-4),
      pointerEvents: "none"
    },
    children
  }), /* @__PURE__ */jsx("div", {
    style: {
      transform: `translate(${-h * 0.34}px, ${-h * 0.8}px)`
    },
    children
  })]
});
var liftOf = (t, land, H = 230) => {
  const FALL = 0.32;
  const p = Math.min(1, Math.max(0, (t - (land - FALL)) / FALL));
  return (1 - easeFall(p)) * H;
};
var CULogo = ({
  size
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return /* @__PURE__ */jsxs("svg", {
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    children: [/* @__PURE__ */jsxs("defs", {
      children: [/* @__PURE__ */jsxs("linearGradient", {
        id: `cu1-${uid}`,
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0",
        children: [/* @__PURE__ */jsx("stop", {
          offset: "0",
          stopColor: "#8930fd"
        }), /* @__PURE__ */jsx("stop", {
          offset: "1",
          stopColor: "#49ccf9"
        })]
      }), /* @__PURE__ */jsxs("linearGradient", {
        id: `cu2-${uid}`,
        x1: "0",
        y1: "0",
        x2: "1",
        y2: "0",
        children: [/* @__PURE__ */jsx("stop", {
          offset: "0",
          stopColor: "#ff02f0"
        }), /* @__PURE__ */jsx("stop", {
          offset: "1",
          stopColor: "#ffc800"
        })]
      })]
    }), /* @__PURE__ */jsx("path", {
      d: __scCopy("M 14 62 L 50 30 L 86 62"),
      fill: "none",
      stroke: `url(#cu1-${uid})`,
      strokeWidth: "16",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }), /* @__PURE__ */jsx("path", {
      d: __scCopy("M 22 84 L 50 62 L 78 84"),
      fill: "none",
      stroke: `url(#cu2-${uid})`,
      strokeWidth: "16",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })]
  });
};
var DropboxGlyph = ({
  size
}) => /* @__PURE__ */jsxs("svg", {
  width: size,
  height: size,
  viewBox: "0 0 100 100",
  children: [[[50, 8, 27, 22], [50, 8, 73, 22], [50, 36, 27, 50], [50, 36, 73, 50]].map(() => null), /* @__PURE__ */jsxs("g", {
    fill: "#0061fe",
    children: [/* @__PURE__ */jsx("path", {
      d: __scCopy("M 27 10 L 50 25 L 27 40 L 4 25 Z")
    }), /* @__PURE__ */jsx("path", {
      d: __scCopy("M 73 10 L 96 25 L 73 40 L 50 25 Z")
    }), /* @__PURE__ */jsx("path", {
      d: __scCopy("M 27 40 L 50 55 L 27 70 L 4 55 Z")
    }), /* @__PURE__ */jsx("path", {
      d: __scCopy("M 73 40 L 96 55 L 73 70 L 50 55 Z")
    }), /* @__PURE__ */jsx("path", {
      d: __scCopy("M 27 74 L 50 89 L 73 74 L 50 62 Z")
    })]
  })]
});
var PW = __scConfig("demos/camera/steep-tilt-glide/SteepTiltGlide.tsx#PW", "PW", () => 6200);
var PH = __scConfig("demos/camera/steep-tilt-glide/SteepTiltGlide.tsx#PH", "PH", () => 2400);
var Panel = ({
  shade,
  t = 1
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: PW,
    height: PH,
    background: "#f4f4f6",
    borderRadius: 64,
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 0 220px rgba(220,210,255,0.35)",
    fontFamily: FONT
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: PW,
      height: 230,
      borderBottom: "4px solid #dcdce2",
      display: "flex",
      alignItems: "center",
      paddingLeft: 130
    },
    children: [/* @__PURE__ */jsx(FloatWrap, {
      h: liftOf(t, 0.3),
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx("svg", {
          width: 58,
          height: 58,
          viewBox: "0 0 40 40",
          style: {
            marginRight: 34
          },
          children: [[4, 4], [23, 4], [4, 23], [23, 23]].map(([x, y], i) => /* @__PURE__ */jsx("rect", {
            x,
            y,
            width: 13,
            height: 13,
            rx: 3,
            fill: "none",
            stroke: "#4a4a52",
            strokeWidth: 3.5
          }, i))
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 66,
            color: INK,
            fontWeight: 500
          },
          children: __scCopy("Product analytics")
        })]
      })
    }), /* @__PURE__ */jsx(FloatWrap, {
      h: liftOf(t, 0.42, 280),
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 72,
            height: 72,
            borderRadius: 20,
            background: "#4147f5",
            marginLeft: 150,
            flexShrink: 0
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 165,
            color: "#26262c",
            fontWeight: 550,
            marginLeft: 110,
            letterSpacing: 1,
            whiteSpace: "nowrap"
          },
          children: __scCopy("ClickUp 3.0")
        })]
      })
    }), [[__scCopy("Widget brainstorm"), 3050], [__scCopy("Design system"), 3900], [__scCopy("Design"), 4650]].map(([tb, x]) => /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: x,
        top: 88,
        fontSize: 58,
        color: "#8d8d96"
      },
      children: tb
    }, tb))]
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 120,
      top: 560
    },
    children: /* @__PURE__ */jsx(FloatWrap, {
      h: liftOf(t, 0.54, 250),
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 26
        },
        children: [/* @__PURE__ */jsx(CULogo, {
          size: 104
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 92,
            fontWeight: 800,
            color: "#222228",
            letterSpacing: -1
          },
          children: __scCopy("ClickUp")
        })]
      })
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 1330,
      top: 440
    },
    children: /* @__PURE__ */jsx(FloatWrap, {
      h: liftOf(t, 0.62, 260),
      children: /* @__PURE__ */jsxs("div", {
        style: {
          width: 620,
          height: 350,
          background: "#ebebef",
          borderRadius: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 60
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 210,
            height: 210,
            background: "#fdfdfe",
            borderRadius: 44,
            boxShadow: "0 6px 60px rgba(180,180,200,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: /* @__PURE__ */jsx(DropboxGlyph, {
            size: 130
          })
        }), /* @__PURE__ */jsx("svg", {
          width: 90,
          height: 90,
          viewBox: "0 0 40 40",
          children: /* @__PURE__ */jsx("path", {
            d: __scCopy("M 10 15 L 20 26 L 30 15"),
            fill: "none",
            stroke: "#6a6a74",
            strokeWidth: 3.6,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })]
      })
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 110,
      top: 830,
      width: 2900
    },
    children: /* @__PURE__ */jsx(FloatWrap, {
      h: liftOf(t, 0.68, 260),
      children: /* @__PURE__ */jsxs("div", {
        style: {
          width: 2900,
          height: 168,
          borderRadius: 34,
          border: "3.5px solid rgba(118,108,238,0.75)",
          background: "rgba(122,110,240,0.09)",
          display: "flex",
          alignItems: "center",
          gap: 40,
          paddingLeft: 56,
          boxSizing: "border-box"
        },
        children: [/* @__PURE__ */jsx("svg", {
          width: 66,
          height: 66,
          viewBox: "0 0 40 40",
          children: /* @__PURE__ */jsx("path", {
            d: __scCopy("M 6 20 L 20 7 L 34 20 M 11 17 V 33 H 29 V 17"),
            fill: "none",
            stroke: "#5a5ad2",
            strokeWidth: 3.4,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 70,
            color: "#5353cf",
            fontWeight: 550
          },
          children: __scCopy("Home")
        })]
      })
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 166,
      top: 1070
    },
    children: /* @__PURE__ */jsx(FloatWrap, {
      h: liftOf(t, 0.8, 240),
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 40
        },
        children: [/* @__PURE__ */jsx("svg", {
          width: 64,
          height: 64,
          viewBox: "0 0 40 40",
          children: /* @__PURE__ */jsx("path", {
            d: __scCopy("M 20 5 C 13 5 10 10 10 16 V 24 L 6 30 H 34 L 30 24 V 16 C 30 10 27 5 20 5 Z M 16 33 C 16 36 24 36 24 33"),
            fill: "none",
            stroke: "#3a3a42",
            strokeWidth: 3,
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 70,
            color: INK
          },
          children: __scCopy("Inbox")
        })]
      })
    })
  }), [__scCopy("Docs"), __scCopy("Dashboards")].map((tb, i) => /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 166,
      top: 1310 + i * 240
    },
    children: /* @__PURE__ */jsx(FloatWrap, {
      h: liftOf(t, 0.86 + i * 0.06, 230),
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 40
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 58,
            height: 58,
            border: "6px solid #8f8f98",
            borderRadius: 14
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 70,
            color: INK
          },
          children: tb
        })]
      })
    })
  }, tb)), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 2440,
      top: 1060
    },
    children: /* @__PURE__ */jsx("svg", {
      width: 120,
      height: 120,
      viewBox: "0 0 40 40",
      children: /* @__PURE__ */jsx("path", {
        d: __scCopy("M 26 6 L 12 20 L 26 34"),
        fill: "none",
        stroke: "#2c2c33",
        strokeWidth: 4.4,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      })
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 3050,
      top: 300,
      fontSize: 430,
      fontWeight: 700,
      color: "#26262c",
      letterSpacing: -6
    },
    children: __scCopy("W")
  }), [[2620, 620, 640, 380], [2740, 1360, 720, 420], [2620, 1900, 560, 330]].map(([x, y, w, h], i) => /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      background: "#fbfbfd",
      borderRadius: 56,
      boxShadow: "0 6px 60px rgba(190,190,205,0.3)"
    }
  }, i)), /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      left: 3560,
      top: 230,
      width: PW - 3560,
      height: PH - 230,
      background: "#fbfbfd"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 220,
        top: 200,
        fontSize: 150,
        fontWeight: 750,
        color: "#232329",
        letterSpacing: -2,
        whiteSpace: "nowrap"
      },
      children: __scCopy("Product Management")
    }), /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: 240,
        top: 480,
        display: "flex",
        gap: 110,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 26,
          background: "#ececf1",
          borderRadius: 22,
          padding: __scCopy("20px 40px")
        },
        children: [/* @__PURE__ */jsx("svg", {
          width: 56,
          height: 56,
          viewBox: "0 0 40 40",
          children: [9, 20, 31].map(y => /* @__PURE__ */jsxs("g", {
            children: [/* @__PURE__ */jsx("rect", {
              x: 5,
              y: y - 1.6,
              width: 4,
              height: 4,
              fill: "#3a3a42"
            }), /* @__PURE__ */jsx("rect", {
              x: 14,
              y: y - 1.4,
              width: 20,
              height: 3.4,
              rx: 1.6,
              fill: "#3a3a42"
            })]
          }, y))
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 62,
            fontWeight: 600,
            color: "#2c2c33"
          },
          children: __scCopy("List")
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 26
        },
        children: [/* @__PURE__ */jsxs("svg", {
          width: 56,
          height: 56,
          viewBox: "0 0 40 40",
          children: [/* @__PURE__ */jsx("rect", {
            x: 5,
            y: 7,
            width: 12,
            height: 26,
            rx: 3,
            fill: "none",
            stroke: "#3a3a42",
            strokeWidth: 3
          }), /* @__PURE__ */jsx("rect", {
            x: 23,
            y: 7,
            width: 12,
            height: 18,
            rx: 3,
            fill: "none",
            stroke: "#3a3a42",
            strokeWidth: 3
          })]
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontSize: 62,
            fontWeight: 500,
            color: "#2c2c33"
          },
          children: __scCopy("Board")
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          fontSize: 56,
          color: "#9a9aa4",
          marginLeft: -40
        },
        children: __scCopy("11")
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 900,
        top: 620,
        width: 1500,
        height: 3,
        background: "#e4e4ea"
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 240,
        top: 850,
        background: "#fce4f5",
        color: "#c93bb0",
        fontSize: 46,
        fontWeight: 650,
        letterSpacing: 2,
        padding: __scCopy("14px 30px"),
        borderRadius: 14
      },
      children: __scCopy("IN PROGRESS")
    }), /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: 244,
        top: 1030,
        fontSize: 44,
        fontWeight: 600,
        color: "#8f8f98",
        letterSpacing: 1
      },
      children: __scCopy("TASK NAME")
    }), [[__scCopy("New Feature Launch"), "#3a3a42"], [__scCopy("Roadmap Q3"), "#55555e"], [__scCopy("User Testing"), "#83838d"], [__scCopy("Bug Triage"), "#b3b3bc"]].map(([name, col], i) => /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        left: 280,
        top: 1180 + i * 210,
        display: "flex",
        alignItems: "center",
        gap: 56
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "#e33bc6"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          fontSize: 64,
          fontWeight: 550,
          color: col,
          whiteSpace: "nowrap"
        },
        children: name
      })]
    }, name))]
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "#050409",
      opacity: shade
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(90deg, rgba(5,4,9,0.9), rgba(5,4,9,0) 42%)",
      opacity: Math.min(1, shade * 1.6)
    }
  })]
});
var CAM = __scConfig("demos/camera/steep-tilt-glide/SteepTiltGlide.tsx#CAM", "CAM", () => ({
  persp: 1100,
  origin: "30% 58%",
  rotY: -60,
  rotZ: -2,
  left: "40%",
  top: "15%",
  scale: 0.62
}));
var PanelLayer = ({
  lx,
  shade,
  opacity,
  t
}) => /* @__PURE__ */jsx(AbsoluteFill, {
  style: {
    opacity
  },
  children: /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      perspective: CAM.persp,
      perspectiveOrigin: CAM.origin
    },
    children: /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: CAM.left,
        top: CAM.top,
        transform: `rotateY(${CAM.rotY}deg) rotateZ(${CAM.rotZ}deg)`,
        transformOrigin: __scCopy("left top")
      },
      children: /* @__PURE__ */jsx("div", {
        style: {
          transform: `scale(${CAM.scale}) translateX(${lx}px)`,
          transformOrigin: __scCopy("left top")
        },
        children: /* @__PURE__ */jsx(Panel, {
          shade,
          t
        })
      })
    })
  })
});
var SteepTiltGlide = () => {
  const frame = useCurrentFrame();
  const glide = Easing.bezier(0.3, 0.12, 0.72, 0.9);
  const lxAt = f => {
    const p = interpolate(f, [0, 120], [0, 1], {
      easing: glide,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    return interpolate(p, [0, 1], [60, -4100]);
  };
  const lx = lxAt(frame);
  const shade = interpolate(frame, [0, 18, 44], [0.7, 0.4, 0], {
    extrapolateRight: "clamp"
  });
  const speed = Math.abs(lxAt(frame - 1) - lxAt(frame + 1)) / 2;
  const g1 = Math.min(0.42, speed * 0.03);
  const g2 = Math.min(0.22, speed * 0.016);
  const drop = interpolate(frame, [4, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const glow = interpolate(frame, [14, 70], [0.15, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#060409"
    },
    children: [/* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        opacity: glow,
        background: "radial-gradient(ellipse 40% 50% at 20% 66%, rgba(118,58,190,0.30), transparent 70%)"
      }
    }), g2 > 0.02 && /* @__PURE__ */jsx(PanelLayer, {
      lx: lxAt(frame - 5),
      shade,
      opacity: g2,
      t: drop
    }), g1 > 0.02 && /* @__PURE__ */jsx(PanelLayer, {
      lx: lxAt(frame - 2.5),
      shade,
      opacity: g1,
      t: drop
    }), /* @__PURE__ */jsx(PanelLayer, {
      lx,
      shade,
      opacity: 1,
      t: drop
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        background: "radial-gradient(ellipse 105% 95% at 55% 42%, transparent 60%, rgba(3,2,8,0.25) 85%, rgba(2,1,6,0.5) 100%)",
        pointerEvents: "none"
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = SteepTiltGlide;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
