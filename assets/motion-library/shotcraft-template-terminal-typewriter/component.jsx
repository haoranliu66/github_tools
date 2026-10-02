// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/typewriter-moves/TerminalTypewriter.tsx
import { useCurrentFrame, interpolate, Easing } from "remotion";

// implementation/video-shotcraft/full/stage/source/demos/_fixtures/Fixtures.tsx
import { jsx, jsxs } from "react/jsx-runtime";
// implementation/video-shotcraft/full/stage/source/demos/typography/typewriter-moves/TerminalTypewriter.tsx
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
var Card = ({
  w,
  h,
  seed = 0,
  style
}) => {
  const titleW = 45 + seed * 37 % 40;
  const lines = 2 + seed % 3;
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: w,
      height: h,
      background: G.card,
      border: `2px solid ${G.border}`,
      borderRadius: 14,
      padding: 18,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      ...style
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        height: 16,
        width: `${titleW}%`,
        background: G.bar,
        borderRadius: 8
      }
    }), Array.from({
      length: lines
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 10,
        width: `${88 - i * 14 - seed % 5 * 3}%`,
        background: G.line,
        borderRadius: 5
      }
    }, i)), /* @__PURE__ */jsxs("div", {
      style: {
        marginTop: "auto",
        display: "flex",
        gap: 8,
        alignItems: "center"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 26,
          height: 26,
          borderRadius: 13,
          background: G.mid
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 10,
          width: 64,
          background: G.line,
          borderRadius: 5
        }
      })]
    })]
  });
};
var FakeDashboard = ({
  variant = "A"
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: 1920,
    height: 1080,
    background: G.bg,
    display: "flex"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      width: 220,
      background: G.side,
      padding: __scCopy("28px 22px"),
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: 18
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: "#777775"
      }
    }), Array.from({
      length: 7
    }).map((_, i) => /* @__PURE__ */jsx("div", {
      style: {
        height: 12,
        width: `${60 + i * 29 % 35}%`,
        background: G.sideBar,
        borderRadius: 6
      }
    }, i))]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        height: 72,
        background: G.panel,
        borderBottom: `2px solid ${G.line}`,
        display: "flex",
        alignItems: "center",
        padding: __scCopy("0 32px"),
        gap: 20,
        boxSizing: "border-box"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          height: 18,
          width: 180,
          background: G.bar,
          borderRadius: 9
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          marginLeft: "auto",
          height: 36,
          width: 320,
          background: "#fff",
          border: `2px solid ${G.line}`,
          borderRadius: 18,
          boxSizing: "border-box"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: 36,
          height: 36,
          borderRadius: 18,
          background: G.mid
        }
      })]
    }), variant === "A" ? /* @__PURE__ */jsx("div", {
      style: {
        flex: 1,
        padding: 36,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridAutoRows: __scCopy("1fr"),
        gap: 28,
        boxSizing: "border-box"
      },
      children: Array.from({
        length: 6
      }).map((_, i) => /* @__PURE__ */jsx(Card, {
        w: 0,
        h: 0,
        seed: i + 1,
        style: {
          width: "100%",
          height: "100%"
        }
      }, i))
    }) : /* @__PURE__ */jsx("div", {
      style: {
        flex: 1,
        padding: 36,
        display: "flex",
        flexDirection: "column",
        gap: 20,
        boxSizing: "border-box"
      },
      children: Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */jsxs("div", {
        style: {
          flex: 1,
          background: G.card,
          border: `2px solid ${G.border}`,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: __scCopy("0 28px"),
          boxSizing: "border-box"
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 44,
            height: 44,
            borderRadius: 10,
            background: G.mid
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            height: 14,
            width: `${30 + i * 23 % 25}%`,
            background: G.bar,
            borderRadius: 7
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            marginLeft: "auto",
            height: 12,
            width: 120,
            background: G.line,
            borderRadius: 6
          }
        })]
      }, i))
    })]
  })]
});

// implementation/video-shotcraft/full/stage/source/demos/typography/typewriter-moves/TerminalTypewriter.tsx

var CMD = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#CMD", "CMD", () => __scCopy("acme deploy --prod"));
var T = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#T", "T", () => ({
  typeStart: 10,
  // 开始敲字
  typeEnd: 10 + CMD.length * 2,
  // 46：18 字符 × 2f
  enter: 58,
  // 敲完停 12f 后回车
  pushEnd: 64,
  // 6f 急推结束，硬切帧
  settleEnd: 68,
  // dashboard 1.06→1 回稳 4f
  total: 145
  // f68 起真静止 77f
}));
var TW = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#TW", "TW", () => 1100);
var TH = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#TH", "TH", () => 620);
var TL = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#TL", "TL", () => (1920 - TW) / 2);
var TT = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#TT", "TT", () => (1080 - TH) / 2);
var TITLEBAR = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#TITLEBAR", "TITLEBAR", () => 52);
var PAD = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#PAD", "PAD", () => 34);
var FOCUS_X = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#FOCUS_X", "FOCUS_X", () => 960);
var FOCUS_Y = __scConfig("demos/typography/typewriter-moves/TerminalTypewriter.tsx#FOCUS_Y", "FOCUS_Y", () => TT + TITLEBAR + PAD + 92);
var TerminalWindow = ({
  chars,
  cursorOn
}) => /* @__PURE__ */jsxs2("div", {
  style: {
    width: TW,
    height: TH,
    background: "#1e1e1c",
    borderRadius: 14,
    boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
    overflow: "hidden",
    boxSizing: "border-box"
  },
  children: [/* @__PURE__ */jsxs2("div", {
    style: {
      height: TITLEBAR,
      background: "#2a2a28",
      borderBottom: "1px solid #3a3a38",
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: __scCopy("0 22px"),
      boxSizing: "border-box"
    },
    children: [["#6a6a68", "#8f8f8d", "#b5b5b3"].map((c, i) => /* @__PURE__ */jsx2("div", {
      style: {
        width: 16,
        height: 16,
        borderRadius: 8,
        background: c
      }
    }, i)), /* @__PURE__ */jsx2("div", {
      style: {
        margin: __scCopy("0 auto"),
        height: 10,
        width: 200,
        background: "#4a4a48",
        borderRadius: 5
      }
    }), /* @__PURE__ */jsx2("div", {
      style: {
        width: 72
      }
    })]
  }), /* @__PURE__ */jsxs2("div", {
    style: {
      padding: PAD,
      fontFamily: "Menlo, Consolas, monospace",
      fontSize: 40,
      color: "#d8d8d6",
      lineHeight: 1.5
    },
    children: [/* @__PURE__ */jsx2("div", {
      style: {
        color: "#7a7a78",
        fontSize: 32,
        marginBottom: 18
      },
      children: __scCopy("~/acme-app (main)")
    }), /* @__PURE__ */jsxs2("div", {
      style: {
        display: "flex",
        alignItems: "center",
        whiteSpace: "pre"
      },
      children: [/* @__PURE__ */jsx2("span", {
        style: {
          color: "#9f9f9d"
        },
        children: "$ "
      }), /* @__PURE__ */jsx2("span", {
        children: CMD.substring(0, chars)
      }), /* @__PURE__ */jsx2("span", {
        style: {
          display: "inline-block",
          width: 24,
          height: 48,
          marginLeft: 4,
          background: "#d8d8d6",
          opacity: cursorOn ? 1 : 0
        }
      })]
    })]
  })]
});
var TerminalTypewriter = () => {
  const frame = useCurrentFrame();
  const chars = Math.min(CMD.length, Math.max(0, Math.floor((frame - T.typeStart) / 2)));
  const cursorOn = frame % 12 < 6;
  const pushScale = interpolate(frame, [T.enter, T.pushEnd], [1, 3.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.cubic)
  });
  const pushBlur = interpolate(frame, [T.pushEnd - 2, T.pushEnd], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const cut = frame >= T.pushEnd;
  const dashScale = interpolate(frame, [T.pushEnd, T.settleEnd], [1.06, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });
  return /* @__PURE__ */jsx2("div", {
    style: {
      width: 1920,
      height: 1080,
      background: G.bg,
      position: "relative",
      overflow: "hidden"
    },
    children: !cut ? /* @__PURE__ */jsx2("div", {
      style: {
        width: 1920,
        height: 1080,
        transform: `scale(${pushScale})`,
        transformOrigin: `${FOCUS_X}px ${FOCUS_Y}px`,
        ...(pushBlur > 0 ? {
          filter: `blur(${pushBlur}px)`
        } : {})
      },
      children: /* @__PURE__ */jsx2("div", {
        style: {
          position: "absolute",
          left: TL,
          top: TT
        },
        children: /* @__PURE__ */jsx2(TerminalWindow, {
          chars,
          cursorOn
        })
      })
    }) : /* @__PURE__ */jsx2("div", {
      style: {
        width: 1920,
        height: 1080,
        transform: `scale(${dashScale})`,
        transformOrigin: __scCopy("960px 540px")
      },
      children: /* @__PURE__ */jsx2(FakeDashboard, {
        variant: "A"
      })
    })
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = TerminalTypewriter;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
