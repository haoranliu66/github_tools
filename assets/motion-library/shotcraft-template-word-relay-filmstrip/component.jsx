// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
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
 var mulberry32 = a => () => {
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var CARD_W = __scConfig("demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx#CARD_W", "CARD_W", () => 940);
var CARD_H = __scConfig("demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx#CARD_H", "CARD_H", () => 530);
var GAP = __scConfig("demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx#GAP", "GAP", () => 105);
var STEP = __scConfig("demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx#STEP", "STEP", () => CARD_H + GAP);
var DarkArticle = ({
  seed
}) => {
  const rand = mulberry32(seed);
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "#101318",
      padding: __scCopy("38px 46px")
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: 26,
        alignItems: "center",
        marginBottom: 34
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 90,
          height: 13,
          background: "#d8b25a",
          borderRadius: 3,
          opacity: 0.9
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          marginLeft: "auto",
          display: "flex",
          gap: 18
        },
        children: [0, 1, 2, 3].map(i => /* @__PURE__ */jsx("div", {
          style: {
            width: 54,
            height: 9,
            background: "#3a3f48",
            borderRadius: 3
          }
        }, i))
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        width: 150,
        height: 9,
        background: "#a8452e",
        borderRadius: 3,
        marginBottom: 20
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        width: "62%",
        height: 30,
        background: "#e8e6df",
        borderRadius: 5,
        marginBottom: 14
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        width: "44%",
        height: 30,
        background: "#e8e6df",
        borderRadius: 5,
        marginBottom: 30
      }
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: 30
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          flex: 1.3
        },
        children: Array.from({
          length: 6
        }).map((_, i) => /* @__PURE__ */jsx("div", {
          style: {
            height: 9,
            width: `${62 + rand() * 34}%`,
            background: "#41454e",
            borderRadius: 3,
            marginBottom: 13
          }
        }, i))
      }), /* @__PURE__ */jsx("div", {
        style: {
          flex: 1,
          border: "1px solid #2c313a",
          borderRadius: 8,
          background: "#151a22",
          padding: 20
        },
        children: Array.from({
          length: 4
        }).map((_, i) => /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 15
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 58,
              height: 12,
              background: "#6d5423",
              borderRadius: 3
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              width: `${34 + rand() * 30}%`,
              height: 9,
              background: "#4a4f58",
              borderRadius: 3
            }
          })]
        }, i))
      })]
    })]
  });
};
var LightMedal = ({
  seed
}) => {
  const rand = mulberry32(seed);
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "#ffffff",
      padding: __scCopy("36px 44px")
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 120,
        height: 9,
        background: "#b9bcc2",
        borderRadius: 3,
        marginBottom: 14
      }
    }), /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: 14,
        marginBottom: 24
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 150,
          height: 32,
          background: "#17181a",
          borderRadius: 5
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: 170,
          height: 32,
          background: "#2f6fd6",
          borderRadius: 5,
          opacity: 0.85
        }
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 22
      },
      children: [64, 96, 78, 110, 70, 88, 92].map((w, i) => /* @__PURE__ */jsx("div", {
        style: {
          width: w,
          height: 24,
          borderRadius: 12,
          background: i === 0 ? "#2f6fd6" : "#f2f3f5",
          border: i === 0 ? "none" : "1px solid #dfe1e5"
        }
      }, i))
    }), /* @__PURE__ */jsx("div", {
      style: {
        height: 34,
        borderRadius: 6,
        border: "1px solid #dfe1e5",
        marginBottom: 26
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        display: "flex",
        gap: 16
      },
      children: [0, 1, 2].map(c => /* @__PURE__ */jsxs("div", {
        style: {
          flex: 1,
          border: "1px solid #e4e6ea",
          borderRadius: 8,
          padding: 18
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 74,
            height: 8,
            background: "#9aa0aa",
            borderRadius: 3,
            marginBottom: 12
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: `${52 + rand() * 30}%`,
            height: 13,
            background: "#1c1d20",
            borderRadius: 4,
            marginBottom: 10
          }
        }), /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            gap: 8,
            alignItems: "center"
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 20,
              height: 13,
              background: c === 0 ? "#c8342f" : c === 1 ? "#2c8a4b" : "#c8342f",
              borderRadius: 2
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              width: 60,
              height: 8,
              background: "#c3c7cd",
              borderRadius: 3
            }
          })]
        })]
      }, c))
    })]
  });
};
var DarkStats = ({
  seed
}) => {
  const rand = mulberry32(seed);
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "#0e0d12",
      padding: __scCopy("44px 52px")
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        borderLeft: "3px solid #6a2430",
        paddingLeft: 34
      },
      children: [{
        n: 92,
        accent: false
      }, {
        n: 74,
        accent: false
      }, {
        n: 58,
        accent: false
      }, {
        n: 118,
        accent: true
      }].map((row, i) => /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: 20,
          alignItems: "center",
          marginBottom: 26
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: row.n,
            height: row.accent ? 30 : 20,
            background: row.accent ? "#c33b2e" : "#d6d3cc",
            borderRadius: 4,
            opacity: row.accent ? 0.95 : 0.85
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: 130,
            height: 11,
            background: row.accent ? "#7a3328" : "#4c4a52",
            borderRadius: 3
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: `${20 + rand() * 26}%`,
            height: 8,
            background: "#33323a",
            borderRadius: 3
          }
        })]
      }, i))
    }), /* @__PURE__ */jsx("div", {
      style: {
        marginTop: 30,
        background: "#1c1216",
        borderRadius: 8,
        padding: __scCopy("22px 30px"),
        display: "flex",
        gap: 60
      },
      children: [0, 1, 2].map(i => /* @__PURE__ */jsxs("div", {
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 96,
            height: 16,
            background: "#c3564a",
            borderRadius: 3,
            marginBottom: 10,
            opacity: 0.9
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: 76,
            height: 8,
            background: "#5a4448",
            borderRadius: 3
          }
        })]
      }, i))
    })]
  });
};
var LightTable = ({
  seed
}) => {
  const rand = mulberry32(seed);
  return /* @__PURE__ */jsxs("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "#ffffff",
      padding: __scCopy("34px 44px")
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 26
      },
      children: [/* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: 12,
          alignItems: "center"
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 34,
            height: 22,
            background: "#1d4f9e",
            borderRadius: 4
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: 130,
            height: 11,
            background: "#2a2b2e",
            borderRadius: 3
          }
        })]
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          gap: 16
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 84,
            height: 10,
            background: "#c6c9cf",
            borderRadius: 3
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: 70,
            height: 10,
            background: "#c6c9cf",
            borderRadius: 3
          }
        })]
      })]
    }), Array.from({
      length: 7
    }).map((_, i) => /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: __scCopy("13px 0"),
        borderBottom: "1px solid #eceef1"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 22,
          height: 10,
          background: "#9aa0aa",
          borderRadius: 3
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: 26,
          height: 16,
          background: ["#b23a3a", "#2c62b8", "#caa53c", "#3a8a52"][i % 4],
          borderRadius: 2,
          opacity: 0.85
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: 90 + rand() * 60,
          height: 10,
          background: "#3a3c40",
          borderRadius: 3
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          marginLeft: "auto",
          display: "flex",
          gap: 46
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 16,
            height: 16,
            background: i % 3 === 1 ? "#8d8f94" : "#eceef1",
            borderRadius: 3
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: 16,
            height: 16,
            background: i % 3 === 2 ? "#a5772e" : "#eceef1",
            borderRadius: 3
          }
        }), /* @__PURE__ */jsx("div", {
          style: {
            width: 14,
            height: 10,
            background: "#5a5c60",
            borderRadius: 3
          }
        })]
      })]
    }, i))]
  });
};
var DarkMri = () => /* @__PURE__ */jsxs("div", {
  style: {
    position: "absolute",
    inset: 0,
    background: "#08090b",
    padding: 0
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      height: 44,
      borderBottom: "1px solid #1c1e22",
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: __scCopy("0 26px")
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 100,
        height: 10,
        background: "#cfd2d6",
        borderRadius: 3,
        opacity: 0.8
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        marginLeft: "auto",
        width: 60,
        height: 8,
        background: "#2c2f34",
        borderRadius: 3
      }
    })]
  }), /* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      height: CARD_H - 44
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        width: 190,
        borderRight: "1px solid #17191d",
        padding: 20
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 110,
          height: 10,
          background: "#b8a24e",
          borderRadius: 3,
          marginBottom: 14
        }
      }), Array.from({
        length: 5
      }).map((_, i) => /* @__PURE__ */jsx("div", {
        style: {
          height: 7,
          width: `${58 + i * 13 % 36}%`,
          background: "#2e3138",
          borderRadius: 3,
          marginBottom: 10
        }
      }, i)), /* @__PURE__ */jsx("div", {
        style: {
          marginTop: 24,
          width: 44,
          height: 130,
          margin: __scCopy("24px auto 0"),
          border: "1px solid #4a4330",
          borderRadius: 6
        }
      })]
    }), /* @__PURE__ */jsx("div", {
      style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      children: /* @__PURE__ */jsx("div", {
        style: {
          width: 300,
          height: 360,
          borderRadius: 16,
          background: "radial-gradient(ellipse 46% 40% at 50% 42%, #b9bcc0 0%, #6c7076 34%, #33363c 62%, #101216 100%)",
          position: "relative"
        },
        children: [[120, 100], [200, 150], [96, 210]].map(([x, y], i) => /* @__PURE__ */jsx("div", {
          style: {
            position: "absolute",
            left: x,
            top: y,
            width: 12,
            height: 12,
            borderRadius: 6,
            border: "2px solid #d8b25a"
          }
        }, i))
      })
    }), /* @__PURE__ */jsx("div", {
      style: {
        width: 170,
        borderLeft: "1px solid #17191d",
        padding: 18
      },
      children: Array.from({
        length: 8
      }).map((_, i) => /* @__PURE__ */jsx("div", {
        style: {
          height: 7,
          width: `${50 + i * 17 % 44}%`,
          background: "#26292f",
          borderRadius: 3,
          marginBottom: 11
        }
      }, i))
    })]
  })]
});
var LightPortfolio = () => /* @__PURE__ */jsxs("div", {
  style: {
    position: "absolute",
    inset: 0,
    background: "#f7f7f8",
    padding: __scCopy("40px 60px"),
    textAlign: "center"
  },
  children: [/* @__PURE__ */jsx("div", {
    style: {
      width: 340,
      height: 26,
      background: "#242528",
      borderRadius: 5,
      margin: __scCopy("10px auto 18px")
    }
  }), [420, 470, 300].map((w, i) => /* @__PURE__ */jsx("div", {
    style: {
      width: w,
      height: 9,
      background: "#b6b9bf",
      borderRadius: 3,
      margin: __scCopy("0 auto 11px")
    }
  }, i)), /* @__PURE__ */jsx("div", {
    style: {
      display: "flex",
      gap: 18,
      marginTop: 36
    },
    children: [0, 1, 2, 3].map(i => /* @__PURE__ */jsxs("div", {
      style: {
        flex: 1,
        height: 150,
        background: "#ffffff",
        border: "1px solid #e2e4e8",
        borderRadius: 10,
        padding: 16,
        textAlign: "left"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: "54%",
          height: 12,
          background: "#2c2d30",
          borderRadius: 3,
          marginBottom: 12
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: "80%",
          height: 8,
          background: "#d3d6db",
          borderRadius: 3,
          marginBottom: 8
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          width: "66%",
          height: 8,
          background: "#d3d6db",
          borderRadius: 3
        }
      })]
    }, i))
  })]
});
var CARDS = __scConfig("demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx#CARDS", "CARDS", () => [({
  seed
}) => /* @__PURE__ */jsx(DarkArticle, {
  seed
}), ({
  seed
}) => /* @__PURE__ */jsx(LightMedal, {
  seed
}), () => /* @__PURE__ */jsx(DarkMri, {}), ({
  seed
}) => /* @__PURE__ */jsx(LightTable, {
  seed
}), ({
  seed
}) => /* @__PURE__ */jsx(DarkStats, {
  seed
}), () => /* @__PURE__ */jsx(LightPortfolio, {})]);
var WORDS = __scConfig("demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx#WORDS", "WORDS", () => [__scCopy("researches"), __scCopy("builds"), __scCopy("codes")]);
var SWITCHES = __scConfig("demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx#SWITCHES", "SWITCHES", () => [14, 62, 108]);
var SW_DUR = 16;
var SERIF = __scConfig("demos/typography/word-relay-filmstrip/WordRelayFilmstrip.tsx#SERIF", "SERIF", () => '"Didot", "Bodoni 72", "Playfair Display", Georgia, serif');
var WordRelayFilmstrip = () => {
  const frame = useCurrentFrame();
  let stepF = 0;
  SWITCHES.forEach(s => {
    const p = interpolate(frame, [s, s + SW_DUR], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    stepF += p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  });
  const scroll = stepF * STEP;
  const total = CARDS.length * STEP;
  const cards = [];
  for (let rep = -1; rep < 2; rep++) {
    CARDS.forEach((C, i) => {
      const y = 275 + i * STEP + rep * total - scroll;
      if (y > 1200 || y < -CARD_H - 120) return;
      cards.push(/* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          top: y,
          left: 106,
          width: CARD_W,
          height: CARD_H,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(30,26,20,0.14)",
          border: "1px solid rgba(0,0,0,0.06)",
          background: "#fff"
        },
        children: /* @__PURE__ */jsx(C, {
          seed: (i + 1) * 733
        })
      }, `${rep}-${i}`));
    });
  }
  const wordStyle = {
    fontFamily: SERIF,
    fontWeight: 400,
    fontSize: 116,
    lineHeight: 1.18,
    letterSpacing: __scCopy("0.002em"),
    textAlign: "right",
    whiteSpace: "nowrap"
  };
  const smooth = x => x * x * (3 - 2 * x);
  const wordNodes = WORDS.map((w, i) => {
    const sIn = SWITCHES[i];
    const sOut = i + 1 < SWITCHES.length ? SWITCHES[i + 1] : null;
    const pIn = interpolate(frame, [sIn + 7, sIn + SW_DUR], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    if (i === 0 ? frame < sIn : pIn <= 0) return null;
    const pInEff = i === 0 ? interpolate(frame, [sIn, sIn + 12], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    }) : pIn;
    const grey = sOut ? interpolate(frame, [sOut - 14, sOut - 2], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    }) : 0;
    const pOut = sOut ? interpolate(frame, [sOut, sOut + 8], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    }) : 1;
    const op = smooth(pInEff) * smooth(pOut);
    if (op <= 0) return null;
    const mix = smooth(grey);
    const ch = Math.round(25 + (157 - 25) * mix);
    return /* @__PURE__ */jsx("div", {
      style: {
        ...wordStyle,
        position: "absolute",
        right: 0,
        top: 0,
        color: `rgb(${ch},${Math.round(25 + (152 - 25) * mix)},${Math.round(25 + (142 - 25) * mix)})`,
        opacity: op
      },
      children: w
    }, w);
  });
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#faf8f3"
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        inset: 0
      },
      children: cards
    }), /* @__PURE__ */jsxs("div", {
      style: {
        position: "absolute",
        right: 210,
        top: 402
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          ...wordStyle,
          color: "#191919"
        },
        children: __scCopy("Computer")
      }), /* @__PURE__ */jsx("div", {
        style: {
          position: "relative",
          height: 140
        },
        children: wordNodes
      })]
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = WordRelayFilmstrip;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
