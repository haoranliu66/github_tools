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
- Before preparation and final handoff, read
  [references/acceptance-checklist.md](references/acceptance-checklist.md).
- Before narration work, also read
  [../audio-narration-preflight/SKILL.md](../audio-narration-preflight/SKILL.md) completely.

## Preserve the production gates

- Work only from the human-approved project and production storyboard mapping.
- Require completed research and claim-level evidence. Do not run cloned code without explicit `--allow-run`.
- Keep provenance, licenses, static-review limits, and test status in production metadata. Do not turn them into
  viewer-facing badges, footers, or repeated narration unless a limitation changes whether the tool solves the
  viewer's problem.
- A new cut gets a new output directory. Never overwrite or publish automatically.

## Make one promise

The video must answer one question: **what problem does this project solve, and what would that look like for me?**

Before production, record the intended viewer, familiar problem, one-sentence answer, one concrete example, and
title promise. Remove architecture tours, evidence recaps, adoption checklists, and background detail unless they are
needed to understand that answer.

Use plain spoken Chinese. Prefer a familiar situation and a concrete before/after example over terms such as
“机制”“证据边界”“范式”“可演示性” or abstract feature taxonomies. Keep proper product and company names such as
Claude, OpenAI, GitHub, Codex, Qwen, and project names in English instead of transliterating them.

## Use B-roll as the explanation

- A-roll is the narration spine: state the problem, connect the example, and give the takeaway. It should not become
  a long presenter monologue or research report.
- B-roll carries most of the meaning: show the repository's own result image, README explanation, UI, diagram, or a
  research-derived example that demonstrates the same problem and response.
- Pair each spoken claim with the visual that makes it obvious. Prefer problem -> project action -> useful result.
- Mention GitHub popularity once, as “目前约有 N stars” or a small opening overlay. Do not explain trend scores.
- Do not display “官方素材”“非本机实测”“源码证据”“静态研究” or similar production labels. Keep those facts in
  metadata and avoid unsupported demo language in narration.
- Default to 6-12 scenes and roughly 45-120 seconds, with 60-90 seconds as the editorial target. Longer videos need
  a user-requested tutorial or deep-dive reason.

## Final handoff

After rendering, run deterministic validation and full audio/video decode, report the MP4 path, duration, format,
and checksum, then hand the video directly to the human reviewer. Do not open or interpret generated sample frames,
contact sheets, or screenshots as an AI review step. Human viewing, listening, approval, and publishing remain manual.

Stop when a material claim lacks evidence, the problem is not clear in the opening, the script uses unexplained
jargon, B-roll does not demonstrate the narration, the runtime exceeds the configured short-form limit, decoding
fails, or the output is missing.
