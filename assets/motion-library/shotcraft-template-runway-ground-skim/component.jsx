// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx
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
 var FONT = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#FONT", "FONT", () => "Helvetica, Arial, sans-serif");
var INK = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#INK", "INK", () => "#3c3c42");
var MID = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#MID", "MID", () => "#8d8d94");
var FAINT = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#FAINT", "FAINT", () => "#d2d2d5");
var easeRise = Easing.bezier(0.42, 0, 0.16, 1);
var mulberry32 = seed => () => {
  seed |= 0;
  seed = seed + 1831565813 | 0;
  let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var CARD_W = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#CARD_W", "CARD_W", () => 760);
var MiniCardFace = ({
  title,
  sub
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: CARD_W,
    border: `4px solid ${FAINT}`,
    borderRadius: 22,
    padding: __scCopy("30px 40px"),
    background: "#fcfcfb",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxSizing: "border-box"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 24
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 40,
        height: 40,
        border: "6px solid #85858b",
        borderRadius: 8,
        flexShrink: 0
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        fontFamily: FONT,
        fontSize: 46,
        color: INK,
        fontWeight: 650,
        whiteSpace: "nowrap"
      },
      children: title
    })]
  }), /* @__PURE__ */jsx("div", {
    style: {
      fontFamily: FONT,
      fontSize: 36,
      color: MID,
      paddingLeft: 64,
      whiteSpace: "nowrap"
    },
    children: sub
  })]
});
var CARDS = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#CARDS", "CARDS", () => [{
  title: __scCopy("Creative Refresh"),
  sub: __scCopy("New logo exploration"),
  col: 0,
  row: 0
}, {
  title: __scCopy("New Bugs Per Week"),
  sub: __scCopy("Bug tracker Dashboard"),
  col: 1,
  row: 0
}, {
  title: __scCopy("Tiger Team Roadmap"),
  sub: __scCopy("Roadmap Outline"),
  col: 2,
  row: 0
}, {
  title: __scCopy("Design System"),
  sub: __scCopy("Design Handbook Inspo"),
  col: 3,
  row: 0
}, {
  title: __scCopy("Development Sprint Dashboard"),
  sub: __scCopy("Dev Team Sprints"),
  col: 0,
  row: 1
}, {
  title: __scCopy("CSS Bug Tracker"),
  sub: __scCopy("Query Reports"),
  col: 1,
  row: 1
}, {
  title: __scCopy("Platform"),
  sub: __scCopy("System Health Monitor"),
  col: 2,
  row: 1
}]);
var GRID_X = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#GRID_X", "GRID_X", () => 1180);
var GRID_Y = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#GRID_Y", "GRID_Y", () => 760);
var COL_GAP = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#COL_GAP", "COL_GAP", () => 850);
var ROW_GAP = __scConfig("demos/ui-entrance/runway-ground-skim/RunwayGroundSkim.tsx#ROW_GAP", "ROW_GAP", () => 250);
var slotPos = (col, row) => ({
  x: GRID_X + col * COL_GAP,
  y: GRID_Y + row * ROW_GAP
});
var Ground = () => /* @__PURE__ */jsx("div", {
  style: {
    width: 4600,
    height: 2600,
    background: "#f6f6f5",
    borderRadius: 60,
    position: "relative",
    overflow: "hidden"
  },
  children: /* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      height: "100%"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        width: 860,
        borderRight: `4px solid ${FAINT}`,
        padding: __scCopy("70px 60px 0"),
        background: "#f1f1f0"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 26
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 64,
            height: 64,
            borderRadius: 18,
            background: "linear-gradient(135deg,#adadb3,#6b6b72)"
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontFamily: FONT,
            fontSize: 56,
            fontWeight: 800,
            color: INK
          },
          children: __scCopy("ClickUp")
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 46
        }
      }), [__scCopy("Home"), __scCopy("Inbox"), __scCopy("Company"), __scCopy("People & Teams"), __scCopy("Goals"), __scCopy("Docs"), __scCopy("More")].map((t, i) => /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 30,
          height: 108,
          paddingLeft: 32,
          background: i === 0 ? "#e6e6f0" : "transparent",
          borderRadius: 20
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 36,
            height: 36,
            border: "6px solid #90909a",
            borderRadius: 9
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontFamily: FONT,
            fontSize: 46,
            color: INK,
            fontWeight: i === 0 ? 650 : 400
          },
          children: t
        })]
      }, t)), /* @__PURE__ */jsx("div", {
        style: {
          height: 60
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          fontFamily: FONT,
          fontSize: 38,
          letterSpacing: 5,
          color: MID,
          fontWeight: 600,
          paddingLeft: 32
        },
        children: __scCopy("SPACES")
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 16
        }
      }), [__scCopy("EPD"), __scCopy("Product roadmap"), __scCopy("Design"), __scCopy("Designer handbook"), "3.0", __scCopy("Design system")].map(t => /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 30,
          height: 96,
          paddingLeft: 32
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "#d6d6da"
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontFamily: FONT,
            fontSize: 42,
            color: INK
          },
          children: t
        })]
      }, t))]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        flex: 1,
        padding: __scCopy("70px 100px 0"),
        position: "relative"
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: 110,
          fontFamily: FONT,
          fontSize: 42,
          color: MID,
          marginBottom: 60
        },
        children: [/* @__PURE__ */jsx("div", {
          children: __scCopy("Product analytics")
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontWeight: 700,
            color: INK
          },
          children: __scCopy("ClickUp 3.0")
        }), /* @__PURE__ */jsx("div", {
          children: __scCopy("Widget brainstorm")
        }), /* @__PURE__ */jsx("div", {
          children: __scCopy("Design system")
        }), /* @__PURE__ */jsx("div", {
          children: __scCopy("Design")
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          fontFamily: FONT,
          fontSize: 110,
          fontWeight: 750,
          color: INK
        },
        children: __scCopy("Home")
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 40
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 30,
          border: `4px solid ${FAINT}`,
          borderRadius: 24,
          padding: __scCopy("28px 42px"),
          background: "#fff",
          width: 1400
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 38,
            height: 38,
            borderRadius: 19,
            border: "6px solid #9a9aa0"
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontFamily: FONT,
            fontSize: 42,
            color: MID
          },
          children: __scCopy("Search by app, filetype, or keyword")
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 66
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: 70,
          fontFamily: FONT,
          fontSize: 46
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            color: INK,
            fontWeight: 700
          },
          children: __scCopy("Recent")
        }), /* @__PURE__ */jsx("div", {
          style: {
            color: MID
          },
          children: __scCopy("Favorites")
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 560
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: 70,
          fontFamily: FONT,
          fontSize: 44
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            color: INK,
            fontWeight: 700
          },
          children: __scCopy("Todo")
        }), /* @__PURE__ */jsx("div", {
          style: {
            color: MID
          },
          children: __scCopy("Comments")
        }), /* @__PURE__ */jsx("div", {
          style: {
            color: MID
          },
          children: __scCopy("Done")
        }), /* @__PURE__ */jsx("div", {
          style: {
            color: MID
          },
          children: __scCopy("Delegated")
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 36
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          display: "inline-block",
          padding: __scCopy("16px 40px"),
          background: "#e4e4e3",
          borderRadius: 14,
          fontFamily: FONT,
          fontSize: 36,
          letterSpacing: 4,
          color: "#6f6f75",
          fontWeight: 600
        },
        children: __scCopy("TODAY")
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 40
        }
      }), [__scCopy("New Bugs Per Week"), __scCopy("Designer handbook"), __scCopy("Mobile screens"), __scCopy("Product roadmap")].map(t => /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 34,
          height: 118,
          borderBottom: "3px solid #e5e5e3",
          width: 2600
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 32,
            height: 32,
            borderRadius: 9,
            background: "#c04a6e"
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            fontFamily: FONT,
            fontSize: 46,
            color: INK,
            fontWeight: 550
          },
          children: t
        }), /* @__PURE__ */jsx("div", {
          style: {
            marginLeft: "auto",
            width: 180,
            height: 16,
            background: "#e3e3e8",
            borderRadius: 8
          }
        })]
      }, t))]
    })]
  })
});
var RunwayGroundSkim = () => {
  const frame = useCurrentFrame();
  const rand = mulberry32(20260718);
  const jit = CARDS.map(() => rand() * 1.2);
  const START0 = 6,
    GAP = 1.5,
    FALLF = 9;
  const lifts = CARDS.map((c, i) => {
    const t = frame - (START0 + i * GAP + jit[i]);
    const H = 560 + i % 3 * 160;
    if (t <= 0) return H;
    const p = t / FALLF;
    if (p < 1) return H * (1 - p * p);
    return 0;
  });
  const riseP = interpolate(frame, [38, 94], [0, 1], {
    easing: easeRise,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const landP = interpolate(frame, [0, 34], [0, 1], {
    easing: Easing.bezier(0.3, 0.1, 0.6, 0.9),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const rx = interpolate(landP, [0, 1], [72, 66]) - 66 * riseP;
  const z = interpolate(landP, [0, 1], [-620, -320]) + riseP * (-1620 - -320);
  const bright = interpolate(frame, [0, 32, 86], [0.32, 0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const anchorTop = 58 - riseP * 6;
  const perspY = 30 + riseP * 20;
  const cam = (children, extra) => /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      perspective: 1050,
      perspectiveOrigin: `50% ${perspY}%`,
      ...extra
    },
    children: /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: `${anchorTop}%`,
        width: 0,
        height: 0,
        transformStyle: "preserve-3d",
        transform: `translateZ(${z}px) rotateX(${rx}deg)`
      },
      children
    })
  });
  const scene = /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      transformStyle: "preserve-3d",
      transform: "translate(-2300px, -1500px)"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        filter: `brightness(${bright})`
      },
      children: /* @__PURE__ */jsx(Ground, {})
    }), CARDS.map((c, i) => {
      const h = lifts[i];
      if (h < 2) return null;
      const s = slotPos(c.col, c.row);
      return /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: s.x + 20,
          top: s.y + 14,
          width: CARD_W - 40,
          height: 150,
          transform: `translateZ(1px) translate(${h * 0.08}px, ${h * 0.12}px) scale(${1 + h * 4e-4})`,
          background: "rgba(10,8,16,0.9)",
          borderRadius: 24,
          filter: `blur(${10 + h * 0.03}px)`,
          opacity: Math.max(0.12, 0.38 - h * 3e-4)
        }
      }, __scCopy("sh") + i);
    }), CARDS.map((c, i) => {
      const h = lifts[i];
      const s = slotPos(c.col, c.row);
      const airLit = h > 2 ? Math.max(1.35, bright) : bright;
      return /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          left: s.x,
          top: s.y,
          transform: `translateZ(${h}px)`,
          filter: `brightness(${airLit})`,
          boxShadow: h > 2 ? `0 0 ${30 + h * 0.05}px rgba(240,235,255,${Math.min(0.3, h * 4e-4)})` : "none"
        },
        children: /* @__PURE__ */jsx(MiniCardFace, {
          title: c.title,
          sub: c.sub
        })
      }, __scCopy("card") + i);
    })]
  });
  const airOp = 1 - riseP;
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#07060a"
    },
    children: [/* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        background: `radial-gradient(ellipse 60% 14% at 50% 40%, rgba(190,170,255,${(0.16 + landP * 0.1) * airOp}), transparent 75%)`
      }
    }), cam(scene), airOp > 0.02 && /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        filter: "blur(10px) brightness(0.88)",
        opacity: airOp,
        WebkitMaskImage: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 84%, black 98%)",
        maskImage: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.7) 84%, black 98%)"
      },
      children: cam(scene)
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        background: "linear-gradient(180deg, rgba(4,3,8,0.9) 0%, rgba(4,3,8,0.35) 16%, transparent 32%)",
        opacity: airOp,
        pointerEvents: "none"
      }
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        background: "radial-gradient(ellipse 95% 90% at 50% 55%, transparent 50%, rgba(3,2,7,0.55) 85%, rgba(2,1,5,0.88) 100%)",
        opacity: 1 - riseP * 0.55,
        pointerEvents: "none"
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = RunwayGroundSkim;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
