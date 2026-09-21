---
name: video-production-quality
description: Mandatory planning and handoff rules for short, plain-language Zimeiti videos that explain what one open-source project solves. Use before researching video examples, planning, preparing, rendering, or handing off a production cut.
---

# Zimeiti short project video

Use this skill for every production video. The default deliverable is a concise project explanation for viewers who
are interested in useful tools but are not necessarily senior engineers.

## Read the routed references

- Before choosing the structure or visuals, read
   [references/market-patterns.md](references/market-patterns.md). It defines the current short-form house format and
   A-roll/B-roll division.
- During repository research and storyboard planning, read
  [references/visual-evidence-and-beats.md](references/visual-evidence-and-beats.md). It defines the visual evidence
  package, beat truth modes, and the handoff contract between research and production.
- Before preparation and final handoff, read
   [references/acceptance-checklist.md](references/acceptance-checklist.md).
- Before narration work, also read
  [../audio-narration-preflight/SKILL.md](../audio-narration-preflight/SKILL.md) completely.

## Preserve the production gates

- Work only from the human-approved project and production storyboard mapping.
- Require completed research and claim-level evidence. For viewer-facing feature claims, use only the official README
  and retained results from an explicitly authorized local run. Do not run cloned code without explicit `--allow-run`.
- Do not perform source-code, repository-structure, or file-by-file analysis for video research, and do not map claims
  to source files or line numbers. Keep the inspected Git commit only as version context.
- Keep provenance, licenses, static-review limits, and test status in production metadata. Do not turn them into
  viewer-facing badges, footers, narration, or project-boundary segments.
- Regenerating an approved project may overwrite that project's mapped production resources and final video. Preserve
  an earlier cut only when the user explicitly asks for an archive. Never publish automatically.

## Make one promise

The video must answer one question: **what problem does this project solve, and what would that look like for me?**

Before production, record the intended viewer, familiar problem, one-sentence answer, one concrete example, and
title promise. Default the situation and example to a problem one individual developer can recognize and solve alone.
Use colleague, team, review, or handoff stories only when collaboration is itself the documented product function.
Remove architecture tours, evidence recaps, adoption checklists, project-boundary sections, and background detail.
Viewer-facing copy should introduce existing functions, examples, and results rather than explain what the project
cannot do.

Write one continuous narration before dividing it into the hook, sections, and closing. Read the joined result aloud
as a single paragraph, then derive scene boundaries and narration cues from that paragraph. Transitions must carry the
same example forward; do not make each section restart the pitch or repeat the previous result.

Use plain spoken Chinese. Prefer a familiar situation and a concrete before/after example over terms such as
“机制”“证据边界”“范式”“可演示性” or abstract feature taxonomies. Keep proper product and company names such as
Claude, OpenAI, GitHub, Codex, Qwen, and project names in English instead of transliterating them.

## Use visual beats as the explanation

- A-roll is the narration spine: state the problem, connect the example, and give the takeaway. It should not become
  a long presenter monologue or research report.
- B-roll carries most of the meaning: show an image or diagram linked by the official README, a README explanation,
  an authorized local demo, or a README-derived example that demonstrates the same problem and response.
- Pair each new spoken claim with a visual beat that shows, proves, or changes something. Every beat must reference
  verified claims and declare whether it is a real executed demo, repository media, or a source-derived animation.
- Prefer problem -> project action -> useful result. Keep narration continuous while several visual beats develop
  underneath it; do not force a new narration block for every visual change.
- After the personal problem, explicitly name the project in the opening: “这个开源工具可能会帮到你，它叫
  ProjectName”。Show the official GitHub repository preview for about 2-4 seconds with a restrained push-in before
  moving to the concrete example. This identity shot is not feature evidence and must not replace explanatory B-roll.
- Mention GitHub popularity once in the same opening sentence and only as an approximate magnitude, such as “已经收获
  6 万多 stars”。Never speak or display the exact snapshot count, and do not explain trend scores.
- Do not display “官方素材”“非本机实测”“源码证据”“静态研究” or similar production labels. Keep those facts in
  metadata and avoid unsupported demo language in narration.
- Default to 6-9 narrative scenes and roughly 45-120 seconds, with 55-75 seconds preferred for static research and
  75-105 seconds reserved for an authorized real demo. A typical minute should contain about 12-24 meaningful visual
  beats, but clarity and evidence take priority over a fixed count.
- Close with a useful recommendation for the individual developer, such as saving the project for the next relevant
  task. Do not say “项目地址见画面” or narrate where the URL is displayed.

## Final handoff

After rendering, run deterministic validation and full audio/video decode, report the MP4 path, duration, format,
and checksum, then hand the video directly to the human reviewer. Do not open or interpret generated sample frames,
contact sheets, or screenshots as an AI review step. Human viewing, listening, approval, and publishing remain manual.

Treat wording, English-term usage, visual cadence, cue proximity, repeated compositions, and the exact sentence shape
of the research brief as editorial guidance for planning and human review, not automated rejection criteria. Revise
them when useful, but do not block preparation or rendering solely because a style target was missed.

Stop when a material claim lacks evidence, required authorization is missing, the output cannot be rendered or
decoded, or the output is missing.
