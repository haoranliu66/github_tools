// Copyright 2026 Wei Yihao. Licensed under Apache-2.0.
// Modified 2026-10-02 for zimeiti: complete template, configurable copy/constants/layout, offline screenshots.
// Source: Vincentwei1021/video-shotcraft at 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab.
// See integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md and full-adaptation/.
// implementation/video-shotcraft/full/stage/source/demos/camera/graze-face-tour/GrazeFaceTour.tsx
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";

import {useMemo as __scMemo} from 'react';
import {staticFile as __scStaticFile,AbsoluteFill as __scFill} from 'remotion';
const __scDefaultAssets={};
const __scNeutral={"AI Foundation Lab":"Example Workspace","Foundation Lab Weekly":"Workspace Weekly","Foundation Lab":"Example Workspace","TEAM RESEARCH CONSOLE":"TEAM WORKSPACE","ClickUp 3.0":"Workspace 3.0","ClickUp":"Workspace","Notion AI":"Product AI","RAYCAST":"WORKSPACE","SUPERHUMAN":"WORKSPACE","perplexity":"assistant","Ask Atlas":"Ask Assistant","Introducing Lumen Deck":"Introducing Your Product","Lumen":"Your","VIDEO-SHOTCRAFT":"YOUR PRODUCT","让镜头卡替你想好每一个动效":"让每一个想法清晰呈现","nano-lab":"demo-project","nano-lab: automated research loop":"Demo project: research workflow","acme deploy --prod":"workspace deploy --prod","~/acme-app (main)":"~/workspace (main)","Split.io Access for Oleg":"Example access request","Open in GDrive":"Open in Drive","Find in Drive":"Find in storage","Find in Slack":"Find in messages","Latent Caching Reduces Tool-Call Latency by 41%":"Example Study: Tool-Call Latency Evaluation"};
function __scMake(__scSettings){
 const __scCopy=s=>{if(Object.hasOwn(__scSettings.copy??{},s))return String(__scSettings.copy[s]);return Object.entries(__scNeutral).sort((a,b)=>b[0].length-a[0].length).reduce((text,[a,b])=>text.replaceAll(a,b),s);};
 const __scConfig=(path,key,original)=>{if(Object.hasOwn(__scSettings.config??{},path))return __scSettings.config[path];if(Object.hasOwn(__scSettings.config??{},key))return __scSettings.config[key];if(key==='ACCENT'&&__scSettings.theme?.palette?.accent)return __scSettings.theme.palette.accent;return original();};
 const __scLayout=original=>__scSettings.layout??JSON.parse(JSON.stringify(original),(_key,value)=>typeof value==='string'?__scCopy(value):value);
 const __scAsset=path=>{const custom=__scSettings.screenshots?.[path]??__scSettings.audio?.[path]??__scSettings.audio?.[path.replace(/^audio\//,'')];if(custom!==undefined){if(typeof custom!=='string'||/^(?:https?:|file:|[A-Za-z]:|\/)/i.test(custom))throw new Error('Use a staged local public path for '+path);return custom.startsWith('data:')?custom:__scStaticFile(custom);}if(__scDefaultAssets[path])return __scDefaultAssets[path];if(path.startsWith('textures/')&&__scDefaultAssets[path.split('/').at(-1)])return __scDefaultAssets[path.split('/').at(-1)];return __scStaticFile(path);};
 var FONT = __scConfig("demos/camera/graze-face-tour/GrazeFaceTour.tsx#FONT", "FONT", () => "Helvetica, Arial, sans-serif");
var INK = __scConfig("demos/camera/graze-face-tour/GrazeFaceTour.tsx#INK", "INK", () => "#3a3a40");
var MID = __scConfig("demos/camera/graze-face-tour/GrazeFaceTour.tsx#MID", "MID", () => "#8b8b92");
var FAINT = __scConfig("demos/camera/graze-face-tour/GrazeFaceTour.tsx#FAINT", "FAINT", () => "#c8c8ce");
var easeIO = Easing.bezier(0.45, 0, 0.25, 1);
var easeFall = Easing.bezier(0.5, 0.05, 0.6, 1);
var FloatWrap = ({
  h,
  children
}) => /* @__PURE__ */jsxs("div", {
  style: {
    position: "relative"
  },
  children: [h > 1.5 && /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      inset: 0,
      transform: `translate(${h * 0.22}px, ${h * 0.42}px) scale(${1 + h * 11e-4})`,
      filter: `blur(${3.5 + h * 0.085}px) brightness(0.32) saturate(0.4)`,
      opacity: Math.min(0.38, 0.16 + h * 4e-3),
      pointerEvents: "none"
    },
    children
  }), /* @__PURE__ */jsx("div", {
    style: {
      transform: `translate(${-h * 0.34}px, ${-h * 0.78}px)`
    },
    children
  })]
});
var liftOf = (t, land, H = 120) => {
  const FALL = 0.34;
  const p = Math.min(1, Math.max(0, (t - (land - FALL)) / FALL));
  return (1 - easeFall(p)) * H;
};
var Chip = ({
  letter,
  tone
}) => /* @__PURE__ */jsx("div", {
  style: {
    width: 64,
    height: 64,
    borderRadius: 16,
    background: tone,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FONT,
    fontWeight: 700,
    fontSize: 36,
    color: "#666"
  },
  children: letter
});
var Tri = ({
  open
}) => /* @__PURE__ */jsx("div", {
  style: {
    width: 0,
    height: 0,
    borderLeft: open ? __scCopy("16px solid transparent") : "22px solid #9a9aa0",
    borderRight: open ? __scCopy("16px solid transparent") : __scCopy("0 solid transparent"),
    borderTop: open ? "22px solid #9a9aa0" : __scCopy("14px solid transparent"),
    borderBottom: open ? "0" : __scCopy("14px solid transparent")
  }
});
var DocIcon = () => /* @__PURE__ */jsxs("div", {
  style: {
    width: 44,
    height: 54,
    border: "5px solid #9a9aa0",
    borderRadius: 8,
    position: "relative"
  },
  children: [/* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 7,
      top: 10,
      width: 22,
      height: 5,
      background: "#b6b6bc"
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 7,
      top: 22,
      width: 22,
      height: 5,
      background: "#b6b6bc"
    }
  })]
});
var FolderIcon = () => /* @__PURE__ */jsx("div", {
  style: {
    width: 54,
    height: 42,
    background: "#8f8f95",
    borderRadius: 7,
    position: "relative"
  },
  children: /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 0,
      top: -10,
      width: 24,
      height: 12,
      background: "#8f8f95",
      borderRadius: __scCopy("6px 6px 0 0")
    }
  })
});
var TreeRow = ({
  depth,
  label,
  icon,
  chip,
  count,
  size = 58,
  dim
}) => /* @__PURE__ */jsxs("div", {
  style: {
    display: "flex",
    alignItems: "center",
    gap: 30,
    paddingLeft: 40 + depth * 90,
    height: size * 2.1,
    opacity: dim ? 0.35 : 1
  },
  children: [icon === __scCopy("tri") && /* @__PURE__ */jsx(Tri, {}), icon === __scCopy("triOpen") && /* @__PURE__ */jsx(Tri, {
    open: true
  }), icon === __scCopy("doc") && /* @__PURE__ */jsx(DocIcon, {}), icon === __scCopy("folder") && /* @__PURE__ */jsx(FolderIcon, {}), icon === __scCopy("dash") && /* @__PURE__ */jsx("div", {
    style: {
      width: 40,
      height: 40,
      border: "6px dashed #a2a2a8",
      borderRadius: 10
    }
  }), chip && /* @__PURE__ */jsx(Chip, {
    letter: chip,
    tone: "#d4d4da"
  }), /* @__PURE__ */jsx("div", {
    style: {
      fontFamily: FONT,
      fontSize: size,
      color: INK,
      fontWeight: 500
    },
    children: label
  }), count && /* @__PURE__ */jsx("div", {
    style: {
      marginLeft: "auto",
      marginRight: 80,
      fontFamily: FONT,
      fontSize: size * 0.85,
      color: MID
    },
    children: count
  })]
});
var RecentCard = ({
  title,
  sub,
  w = 880
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: w,
    border: `4px solid ${FAINT}`,
    borderRadius: 24,
    padding: __scCopy("36px 44px"),
    display: "flex",
    flexDirection: "column",
    gap: 18,
    background: "#fbfbfa"
  },
  children: [/* @__PURE__ */jsxs("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 26
    },
    children: [/* @__PURE__ */jsx("div", {
      style: {
        width: 44,
        height: 44,
        border: "6px solid #85858b",
        borderRadius: 8
      }
    }), /* @__PURE__ */jsx("div", {
      style: {
        fontFamily: FONT,
        fontSize: 52,
        color: INK,
        fontWeight: 600
      },
      children: title
    })]
  }), /* @__PURE__ */jsx("div", {
    style: {
      fontFamily: FONT,
      fontSize: 42,
      color: MID,
      paddingLeft: 70
    },
    children: sub
  })]
});
var SceneTree = ({
  t = 1
}) => {
  const L = (i, n = 14) => liftOf(t, 0.22 + i / n * 0.62, 130);
  const rows = [[0, __scCopy("People & Teams"), __scCopy("doc"), void 0, void 0], [0, __scCopy("Goals"), __scCopy("doc"), void 0, void 0], [0, __scCopy("Docs"), __scCopy("doc"), void 0, void 0], [0, __scCopy("More"), __scCopy("dash"), void 0, void 0], [0, __scCopy("EPD"), __scCopy("tri"), "E", void 0], [0, __scCopy("Product roadmap"), __scCopy("tri"), "P", void 0], [0, __scCopy("Design"), __scCopy("triOpen"), "D", void 0], [1, __scCopy("Designer handbook"), __scCopy("doc"), void 0, void 0], [1, "3.0", __scCopy("folder"), void 0, void 0], [1, __scCopy("Design system"), __scCopy("folder"), void 0, void 0], [2, __scCopy("Design system"), __scCopy("doc"), void 0, void 0], [2, __scCopy("Components"), __scCopy("dash"), void 0, "56"], [2, __scCopy("Patterns"), __scCopy("dash"), void 0, "8"], [2, __scCopy("Tokens"), __scCopy("dash"), void 0, "256"]];
  return /* @__PURE__ */jsxs("div", {
    style: {
      width: 2900,
      height: 2400,
      background: "#f5f5f4",
      display: "flex"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        width: 1500,
        borderRight: `4px solid ${FAINT}`,
        paddingTop: 60,
        background: "#f2f2f1"
      },
      children: [rows.slice(0, 4).map((r, i) => /* @__PURE__ */jsx(FloatWrap, {
        h: L(i),
        children: /* @__PURE__ */jsx(TreeRow, {
          depth: r[0],
          label: r[1],
          icon: r[2],
          chip: r[3],
          count: r[4]
        })
      }, r[1] + i)), /* @__PURE__ */jsx("div", {
        style: {
          height: 90
        }
      }), /* @__PURE__ */jsx(FloatWrap, {
        h: L(4),
        children: /* @__PURE__ */jsx("div", {
          style: {
            paddingLeft: 48,
            fontFamily: FONT,
            fontSize: 46,
            letterSpacing: 6,
            color: MID,
            fontWeight: 600
          },
          children: __scCopy("SPACES")
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 30
        }
      }), rows.slice(4).map((r, i) => /* @__PURE__ */jsx(FloatWrap, {
        h: L(i + 4.6),
        children: /* @__PURE__ */jsx(TreeRow, {
          depth: r[0],
          label: r[1],
          icon: r[2],
          chip: r[3],
          count: r[4]
        })
      }, r[1] + i))]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        flex: 1,
        paddingTop: 100,
        paddingLeft: 110
      },
      children: [/* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.3, 150),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            gap: 90,
            fontFamily: FONT,
            fontSize: 52
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
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 64
        }
      }), /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 44
        },
        children: [/* @__PURE__ */jsx(FloatWrap, {
          h: liftOf(t, 0.42, 170),
          children: /* @__PURE__ */jsx(RecentCard, {
            title: __scCopy("Logo"),
            sub: __scCopy("Brand refresh")
          })
        }), /* @__PURE__ */jsx(FloatWrap, {
          h: liftOf(t, 0.55, 170),
          children: /* @__PURE__ */jsx(RecentCard, {
            title: __scCopy("Split.io Access for Oleg"),
            sub: __scCopy("Team credentials")
          })
        })]
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 110
        }
      }), /* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.68, 150),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            gap: 90,
            fontFamily: FONT,
            fontSize: 50
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
          })]
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 50
        }
      }), /* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.8, 150),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            gap: 40,
            alignItems: "center"
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              padding: __scCopy("22px 46px"),
              background: "#e3e3ec",
              borderRadius: 18,
              fontFamily: FONT,
              fontSize: 46,
              color: INK,
              fontWeight: 600
            },
            children: __scCopy("\u2261 List")
          }), /* @__PURE__ */jsx("div", {
            style: {
              fontFamily: FONT,
              fontSize: 46,
              color: MID
            },
            children: __scCopy("\u25A6 Gallery")
          })]
        })
      })]
    })]
  });
};
var SceneTopNav = ({
  t = 1
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: 3e3,
    height: 2100,
    background: "#f5f5f4",
    borderRadius: 48
  },
  children: [/* @__PURE__ */jsx("div", {
    style: {
      height: 150,
      borderBottom: `4px solid ${FAINT}`,
      display: "flex",
      alignItems: "center",
      gap: 120,
      paddingLeft: 90,
      fontFamily: FONT,
      fontSize: 54,
      color: INK
    },
    children: [__scCopy("Product analytics"), __scCopy("ClickUp 3.0"), __scCopy("Widget brainstorm"), __scCopy("Design system")].map((tb, i) => /* @__PURE__ */jsx(FloatWrap, {
      h: liftOf(t, 0.2 + i * 0.1, 140),
      children: /* @__PURE__ */jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 26,
          fontWeight: i === 1 ? 700 : 400,
          opacity: i > 1 ? 0.75 : 1
        },
        children: [/* @__PURE__ */jsx("div", {
          style: {
            width: 40,
            height: 40,
            borderRadius: i === 1 ? 14 : 8,
            background: i === 1 ? "#7d7d84" : "transparent",
            border: i === 1 ? "none" : "5px solid #9a9aa0"
          }
        }), tb]
      })
    }, tb))
  }), /* @__PURE__ */jsxs("div", {
    style: {
      display: "flex"
    },
    children: [/* @__PURE__ */jsxs("div", {
      style: {
        width: 1250,
        padding: __scCopy("70px 70px 0")
      },
      children: [/* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.34, 150),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 30
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 74,
              height: 74,
              borderRadius: 20,
              background: "linear-gradient(135deg,#a9a9af,#6f6f76)"
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              fontFamily: FONT,
              fontSize: 66,
              fontWeight: 800,
              color: INK
            },
            children: __scCopy("ClickUp")
          }), /* @__PURE__ */jsx("div", {
            style: {
              marginLeft: "auto",
              width: 130,
              height: 90,
              border: `4px solid ${FAINT}`,
              borderRadius: 22,
              background: "#fff"
            }
          })]
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 60
        }
      }), /* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.46, 160),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 34,
            background: "#e6e6f0",
            border: "4px solid #c5c5d4",
            borderRadius: 24,
            padding: __scCopy("30px 44px")
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 48,
              height: 44,
              border: "6px solid #5f5f66",
              borderBottom: "none",
              borderRadius: __scCopy("10px 10px 0 0")
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              fontFamily: FONT,
              fontSize: 56,
              color: "#4a4a55",
              fontWeight: 600
            },
            children: __scCopy("Home")
          }), /* @__PURE__ */jsx("div", {
            style: {
              marginLeft: "auto",
              width: 62,
              height: 62,
              borderRadius: 31,
              background: "#a5a5ab",
              color: "#fff",
              fontFamily: FONT,
              fontSize: 38,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: __scCopy("3")
          })]
        })
      }), [__scCopy("Inbox"), __scCopy("Company"), __scCopy("People & Teams"), __scCopy("Goals"), __scCopy("Docs")].map((tb, i) => /* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.55 + i * 0.08, 140),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 34,
            height: 128,
            paddingLeft: 44
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 44,
              height: 44,
              border: "6px solid #93939a",
              borderRadius: 10
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              fontFamily: FONT,
              fontSize: 54,
              color: INK
            },
            children: tb
          })]
        })
      }, tb))]
    }), /* @__PURE__ */jsxs("div", {
      style: {
        flex: 1,
        borderLeft: `4px solid ${FAINT}`,
        padding: __scCopy("70px 90px 0")
      },
      children: [/* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.4, 150),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 40,
            color: MID,
            fontFamily: FONT,
            fontSize: 52
          },
          children: [/* @__PURE__ */jsx("div", {
            children: __scCopy("\u2039")
          }), /* @__PURE__ */jsx("div", {
            children: __scCopy("\u203A")
          }), /* @__PURE__ */jsx("div", {
            style: {
              width: 44,
              height: 40,
              border: "6px solid #93939a",
              borderBottom: "none",
              borderRadius: __scCopy("10px 10px 0 0")
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              color: INK
            },
            children: __scCopy("Home")
          })]
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 80
        }
      }), /* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.58, 180),
        children: /* @__PURE__ */jsx("div", {
          style: {
            fontFamily: FONT,
            fontSize: 130,
            fontWeight: 750,
            color: INK
          },
          children: __scCopy("Home")
        })
      }), /* @__PURE__ */jsx("div", {
        style: {
          height: 70
        }
      }), /* @__PURE__ */jsx(FloatWrap, {
        h: liftOf(t, 0.74, 160),
        children: /* @__PURE__ */jsxs("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 36,
            border: `4px solid ${FAINT}`,
            borderRadius: 26,
            padding: __scCopy("34px 46px"),
            background: "#fff",
            width: 1100
          },
          children: [/* @__PURE__ */jsx("div", {
            style: {
              width: 44,
              height: 44,
              borderRadius: 22,
              border: "6px solid #9a9aa0"
            }
          }), /* @__PURE__ */jsx("div", {
            style: {
              fontFamily: FONT,
              fontSize: 48,
              color: MID
            },
            children: __scCopy("Search by app, filetype\u2026")
          })]
        })
      })]
    })]
  })]
});
var SceneListRows = ({
  t = 1
}) => /* @__PURE__ */jsxs("div", {
  style: {
    width: 2900,
    height: 2200,
    background: "#f6f6f5",
    paddingTop: 60
  },
  children: [/* @__PURE__ */jsx(FloatWrap, {
    h: liftOf(t, 0.22, 150),
    children: /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: 100,
        paddingLeft: 120,
        fontFamily: FONT,
        fontSize: 54
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
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 56
    }
  }), /* @__PURE__ */jsx(FloatWrap, {
    h: liftOf(t, 0.32, 150),
    children: /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        gap: 44,
        alignItems: "center",
        paddingLeft: 120
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          padding: __scCopy("24px 52px"),
          background: "#e2e2ea",
          borderRadius: 20,
          fontFamily: FONT,
          fontSize: 50,
          color: INK,
          fontWeight: 600
        },
        children: __scCopy("\u2261 List")
      }), /* @__PURE__ */jsx("div", {
        style: {
          fontFamily: FONT,
          fontSize: 50,
          color: MID
        },
        children: __scCopy("\u25A6 Gallery")
      }), /* @__PURE__ */jsxs("div", {
        style: {
          marginLeft: 500,
          display: "flex",
          gap: 80,
          color: MID,
          fontFamily: FONT,
          fontSize: 46
        },
        children: [/* @__PURE__ */jsx("div", {
          children: __scCopy("Filter")
        }), /* @__PURE__ */jsx("div", {
          children: __scCopy("Group")
        }), /* @__PURE__ */jsx("div", {
          children: __scCopy("Sort")
        })]
      })]
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 40,
      borderBottom: `4px solid ${FAINT}`,
      marginLeft: 120,
      marginRight: 120
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 60
    }
  }), /* @__PURE__ */jsx(FloatWrap, {
    h: liftOf(t, 0.44, 160),
    children: /* @__PURE__ */jsx("div", {
      style: {
        marginLeft: 120,
        display: "inline-block",
        padding: __scCopy("20px 48px"),
        background: "#e4e4e3",
        borderRadius: 16,
        fontFamily: FONT,
        fontSize: 44,
        letterSpacing: 4,
        color: "#6f6f75",
        fontWeight: 600
      },
      children: __scCopy("TODAY")
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 60
    }
  }), /* @__PURE__ */jsx(FloatWrap, {
    h: liftOf(t, 0.54, 150),
    children: /* @__PURE__ */jsx("div", {
      style: {
        paddingLeft: 120,
        fontFamily: FONT,
        fontSize: 42,
        letterSpacing: 5,
        color: MID
      },
      children: __scCopy("TASK NAME")
    })
  }), /* @__PURE__ */jsx("div", {
    style: {
      height: 30
    }
  }), [__scCopy("New Bugs Per Week"), __scCopy("Designer handbook"), __scCopy("Mobile screens"), __scCopy("Product roadmap")].map((tb, i) => /* @__PURE__ */jsx(FloatWrap, {
    h: liftOf(t, 0.62 + i * 0.09, 160),
    children: /* @__PURE__ */jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 44,
        height: 170,
        marginLeft: 120,
        marginRight: 120,
        borderBottom: "3px solid #e6e6e4"
      },
      children: [/* @__PURE__ */jsx("div", {
        style: {
          width: 40,
          height: 40,
          borderRadius: 12,
          background: "#88888e"
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          fontFamily: FONT,
          fontSize: 58,
          color: INK,
          fontWeight: 550
        },
        children: tb
      }), /* @__PURE__ */jsx("div", {
        style: {
          marginLeft: "auto",
          width: 220,
          height: 20,
          background: "#e2e2e8",
          borderRadius: 10
        }
      }), /* @__PURE__ */jsx("div", {
        style: {
          color: MID,
          fontSize: 60
        },
        children: __scCopy("\u2026")
      })]
    })
  }, tb))]
});
var Plane = ({
  cam,
  t,
  edge = "left",
  children
}) => {
  const x = interpolate(t, [0, 1], cam.x, {
    easing: easeIO
  });
  const y = interpolate(t, [0, 1], cam.y, {
    easing: easeIO
  });
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      perspective: 1050,
      perspectiveOrigin: "50% 46%"
    },
    children: /* @__PURE__ */jsx("div", {
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 0,
        height: 0,
        transformStyle: "preserve-3d",
        transform: `scale(${cam.scale}) rotateX(${cam.rx}deg) rotateY(${cam.ry}deg) rotateZ(${cam.rz}deg)`
      },
      children: /* @__PURE__ */jsx("div", {
        style: {
          position: "absolute",
          transform: `translate3d(${x}px, ${y}px, 0)`
        },
        children: /* @__PURE__ */jsxs("div", {
          style: {
            position: "relative",
            transform: "translate(-50%, -50%)"
          },
          children: [edge === "left" ? /* @__PURE__ */jsxs(Fragment, {
            children: [/* @__PURE__ */jsx("div", {
              style: {
                position: "absolute",
                left: -70,
                top: -40,
                width: 110,
                height: "104%",
                background: "linear-gradient(185deg, #ff7ab8, #b06cff 55%, #6d4dff)",
                filter: "blur(70px)",
                opacity: 0.9
              }
            }), /* @__PURE__ */jsx("div", {
              style: {
                position: "absolute",
                left: -10,
                top: 0,
                width: 8,
                height: "100%",
                background: "linear-gradient(180deg, #ffb0d5, #b78cff)",
                filter: "blur(3px)",
                opacity: 0.95
              }
            })]
          }) : /* @__PURE__ */jsxs(Fragment, {
            children: [/* @__PURE__ */jsx("div", {
              style: {
                position: "absolute",
                left: -40,
                top: -70,
                width: "104%",
                height: 110,
                background: "linear-gradient(90deg, #ff7ab8, #b06cff 55%, #6d4dff)",
                filter: "blur(70px)",
                opacity: 0.85
              }
            }), /* @__PURE__ */jsx("div", {
              style: {
                position: "absolute",
                left: 0,
                top: -10,
                width: "100%",
                height: 8,
                background: "linear-gradient(90deg, #ffb0d5, #b78cff)",
                filter: "blur(3px)",
                opacity: 0.9
              }
            })]
          }), children, /* @__PURE__ */jsx("div", {
            style: {
              position: "absolute",
              inset: 0,
              background: edge === "left" ? "linear-gradient(105deg, rgba(0,0,10,0) 30%, rgba(0,0,10,0.35) 75%, rgba(0,0,10,0.6) 100%)" : "linear-gradient(175deg, rgba(0,0,10,0) 35%, rgba(0,0,10,0.3) 80%, rgba(0,0,10,0.55) 100%)",
              pointerEvents: "none"
            }
          })]
        })
      })
    })
  });
};
var NeonRects = ({
  drift
}) => /* @__PURE__ */jsxs(AbsoluteFill, {
  style: {
    overflow: "hidden"
  },
  children: [/* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: -140 + drift * 40,
      top: 240,
      width: 620,
      height: 380,
      border: "4px solid #c04dff",
      borderRadius: 34,
      filter: "blur(7px)",
      opacity: 0.5
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      left: 60 + drift * 25,
      top: 700,
      width: 420,
      height: 260,
      border: "4px solid #ff4da8",
      borderRadius: 28,
      filter: "blur(10px)",
      opacity: 0.4
    }
  }), /* @__PURE__ */jsx("div", {
    style: {
      position: "absolute",
      right: -180 - drift * 30,
      top: -80,
      width: 560,
      height: 340,
      border: "4px solid #7b4dff",
      borderRadius: 30,
      filter: "blur(12px)",
      opacity: 0.35
    }
  })]
});
var SEGS = __scConfig("demos/camera/graze-face-tour/GrazeFaceTour.tsx#SEGS", "SEGS", () => [{
  // 侧栏树：从树顶（SPACES 附近）贴面滑到树底（Components/Patterns/Tokens）
  cam: {
    rx: 12,
    ry: 30,
    rz: -6,
    scale: 0.95,
    x: [1450 - 950, 1450 - 880],
    y: [1200 - 1050, 1200 - 1850]
  },
  edge: "left",
  render: t => /* @__PURE__ */jsx(SceneTree, {
    t
  })
}, {
  // 顶栏 tab 条 → 右区 Home 大标题
  cam: {
    rx: 20,
    ry: -20,
    rz: 6,
    scale: 0.95,
    x: [1500 - 800, 1500 - 2e3],
    y: [1050 - 350, 1050 - 800]
  },
  edge: "top",
  render: t => /* @__PURE__ */jsx(SceneTopNav, {
    t
  })
}, {
  // 列表行：沿 TASK NAME 行右扫
  cam: {
    rx: 14,
    ry: 28,
    rz: -5,
    scale: 1.05,
    x: [1450 - 900, 1450 - 680],
    y: [1100 - 620, 1100 - 1240]
  },
  edge: "left",
  render: t => /* @__PURE__ */jsx(SceneListRows, {
    t
  })
}]);
var SEG_LEN = __scConfig("demos/camera/graze-face-tour/GrazeFaceTour.tsx#SEG_LEN", "SEG_LEN", () => 50);
var FADE = __scConfig("demos/camera/graze-face-tour/GrazeFaceTour.tsx#FADE", "FADE", () => 7);
var Stage = () => {
  const frame = useCurrentFrame();
  return /* @__PURE__ */jsx(AbsoluteFill, {
    style: {
      background: "#060608"
    },
    children: SEGS.map((s, i) => {
      const start = i * SEG_LEN;
      const local = frame - start;
      if (local < -FADE || local > SEG_LEN + FADE) return null;
      const t = Math.min(1, Math.max(0, local / SEG_LEN));
      const opacity = interpolate(local, [-FADE, 0, SEG_LEN - FADE, SEG_LEN], [i === 0 ? 1 : 0, 1, 1, i === SEGS.length - 1 ? 1 : 0]);
      return /* @__PURE__ */jsxs(AbsoluteFill, {
        style: {
          opacity
        },
        children: [/* @__PURE__ */jsx(NeonRects, {
          drift: t
        }), /* @__PURE__ */jsx(Plane, {
          cam: s.cam,
          t,
          edge: s.edge,
          children: s.render(t)
        })]
      }, i);
    })
  });
};
var GrazeFaceTour = () => {
  const frame = useCurrentFrame();
  const seg = Math.min(2, Math.floor(frame / SEG_LEN));
  const focusX = [44, 40, 46][seg];
  const focusY = [46, 40, 50][seg];
  return /* @__PURE__ */jsxs(AbsoluteFill, {
    style: {
      background: "#060608"
    },
    children: [/* @__PURE__ */jsx(Stage, {}), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        filter: "blur(16px) brightness(0.92)",
        WebkitMaskImage: `radial-gradient(ellipse 58% 52% at ${focusX}% ${focusY}%, transparent 34%, rgba(0,0,0,0.85) 72%, black 92%)`,
        maskImage: `radial-gradient(ellipse 58% 52% at ${focusX}% ${focusY}%, transparent 34%, rgba(0,0,0,0.85) 72%, black 92%)`
      },
      children: /* @__PURE__ */jsx(Stage, {})
    }), /* @__PURE__ */jsx(AbsoluteFill, {
      style: {
        background: "radial-gradient(ellipse 90% 80% at 50% 45%, transparent 40%, rgba(2,2,6,0.55) 78%, rgba(1,1,4,0.9) 100%)",
        pointerEvents: "none"
      }
    })]
  });
};

// implementation/video-shotcraft/full/stage/template-entry.tsx
var template_entry_default = GrazeFaceTour;
 return {component:template_entry_default,duration:150};
}
export const SHOTCRAFT_DURATION=__scMake({}).duration;
export default function FullTemplate({copy={},config={},screenshots={},layout,audio={},theme,originalProps={},...props}){
 const settings={copy,config,screenshots,layout,audio,theme},key=JSON.stringify(settings),Component=__scMemo(()=>__scMake(settings).component,[key]);
 const view=<Component {...{}} {...props} {...originalProps}/>;
 return view;
}
