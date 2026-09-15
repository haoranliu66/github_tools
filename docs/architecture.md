# Architecture

```text
daily retry trigger ─> weekly success marker ─> GitHub Trending / REST API
                              │                           │
                              │                           v
                              │        30 growth + 12 active-stars discoveries
                              │                           │
                              │                           v
                              │          deduplicated current pool + watchlist
                              │                           │
                              └─ same week: no network    v
                                           base weekly ranking (max 93)
                                                       │
                                           human selection (7–8)
                                                       │
                                                       v
                                      batch repo-researcher / Codex
                                                       │
                                                       v
                              research package + demoability (0–7)
                                                       │
                                                       v
                                        separate final ranking (max 100)
                                                       │
                                          human video approval
                                                       │
                                                       v
                                    storyboard ─> Remotion ─> FFmpeg ─> MP4
```

## Trust boundaries

GitHub repositories are untrusted. Discovery only reads public metadata. Research clones into `workspaces/repos/`, ignores repository Agent rules, and starts in a read-only Codex sandbox. Code execution requires the explicit `--allow-run` flag.

Generated content is not automatically published. Repository selection, claims approval, and final video approval remain human checkpoints. A watchlist repository marked `not-rediscovered` receives business score 0 and cannot enter the current research selection, while its factual observations remain intact.

## Artifact contract

The research boundary is the approved `selections/YYYY-Www.json`; the rendering boundary is `output/final-rankings/YYYY-Www.json`. The final ranking resolves the exact research `storyboard.json`, so production rendering cannot bypass human selection or research completeness. Deterministic software remains responsible for timing, layout, rendering, and encoding.
