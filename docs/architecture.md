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

GitHub repositories are untrusted. Discovery only reads public metadata. Research first pins a GitHub commit and has a read-only source-choice agent select a bounded online README/media snapshot or a shallow clone in `workspaces/repos/`. Both paths ignore repository Agent rules and begin in a read-only Codex sandbox. Only an explicit `--allow-run` permits code execution, and that path requires a local checkout. Selected media is retained with provenance in the project's `resources/` directory.

Generated content is not automatically published. Repository selection, claims approval, and final video approval remain human checkpoints. A watchlist repository marked `not-rediscovered` receives business score 0 and cannot enter the current research selection, while its factual observations remain intact.

## Artifact contract

The research boundary is the approved `apps/trend-scout/trend_reports/YYYY-Www/selection.json`; the rendering boundary is `apps/repo-researcher/final_rank/YYYY-Www/final-ranking.json`. Every selected repository receives `output/videos/YYYY年MM月第N周-owner--repository/resources/` before research starts, even if it never becomes a video. After video approval, `video:plan` runs a separate read-only editorial agent using the verified research package, the trusted research production contract, and an independent editorial-agent Skill. Its `resources/editorial-plan.json` may revise narration and beat arrangement, never claims, retained demos, or evidence assets. The plan pins the research bytes and both Skill digests. Editorial style changes therefore require replanning, not repeating fact research. `video:prepare` refuses missing or stale plans, derives the production path, and turns the plan into a storyboard with metadata provenance and QA. The final ranking resolves that exact storyboard and the project-root `final.mp4`, so rendering cannot bypass human selection, research completeness, video approval, or the editorial quality gate.

## Visual shot program

The prepared episode can carry `meta.visualProgram`. The shot agent chooses an eligible catalog template or emits timed choreography/custom JSX. Project-local sources and mappings are hashed and bundled into a per-render registry. Narration, captions, truth modes and approved research remain upstream inputs; final-ranking checks still apply. See [visual-agent.md](visual-agent.md).
