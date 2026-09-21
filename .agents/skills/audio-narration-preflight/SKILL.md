---
name: audio-narration-preflight
description: Mandatory project preflight for planning, synthesizing, checking, or regenerating zimeiti narration audio.
---

# Zimeiti narration preflight

Read this file completely before generating or regenerating narration audio. This rule does not remove any human gate:
topic selection, factual review, run authorization, voice authorization, and final video approval remain manual.

## Non-negotiable constraints

- Treat character counts as estimates. Never truncate unfinished meaning to satisfy a soft length target.
- Preserve every claim and sentence. When a block is too long, split at the nearest complete sentence boundary and
  synthesize both parts; never crop the WAV or discard text.
- Use the measured WAV duration as the main limit. A final narration block must be no longer than the configured 64-second ceiling.
- A Qwen request must contain at most 1,000 characters, including punctuation.
- A concept-explainer narration block normally covers 2-3 visual scenes so approximate scene and subtitle timing stays
  close to the spoken idea. Other profiles may cover up to their configured maximum. Technical duration or request-
  limit splits may temporarily produce a one-scene block and must be recorded in timing metadata.
- Keep explanations predominantly Chinese, but preserve proper product, company, model, and project names such as
  Claude, OpenAI, GitHub, Codex, Qwen, and repository names in their English form. Translate or explain technical
  jargon when an ordinary viewer would not understand it. Do not cluster many unrelated English terms in one request.
- The 32-character value is a subtitle readability soft target, not a TTS request limit. A longer cue is acceptable
  when no clean semantic boundary exists.
- Never fall back silently to another voice or provider. Confirm the configured voice ID through authenticated
  preflight without printing the API key.
- Automated checks may mark narration ready for listening, but never accepted. A human must listen to the complete
  narration in the final rendered MP4 at normal speed before final video approval.
- Prepared scene timing may be up to the configured 32 seconds. This is separate from the 64-second hard ceiling for
  one synthesized narration block.

## Choose cadence from the project

- `concept-explainer`: prefer coherent blocks spanning 2-3 related scenes. Preserve the same voice and sampling
  parameters across blocks instead of merging most of an episode into one request.
- `code-analysis`: reserve this for a separately approved source-code deep dive outside the normal repository
  research flow; cut when the explanation or flow changes.
- `operation-demo`: cut by complete operation steps, not by character count.
- `quick-news`: use short blocks and faster visual changes.

Use the profile inferred in the draft unless the content clearly requires a different configured profile. Record the
selected profile in `timing.json`.

## Required workflow

1. Inspect the planned `audio/jobs.json`. Confirm semantic completeness, Chinese-first wording, request length, scene
   coverage, and topic grouping before accepting synthesis.
2. Run the authenticated Qwen preflight and verify the registered voice, model, `max_new_tokens`, and 1,000-character.
3. Synthesize one continuous WAV per narration block. Measure the returned PCM WAV; do not estimate acceptance from
   text length.
4. If generation times out or the WAV exceeds 64 seconds, split at the nearest complete sentence and retry the two
   complete parts. If no sentence boundary exists, fail for editorial correction instead of cutting content.
5. If adjacent blocks share a topic and either is shorter than the profile's short-block threshold, try one merged
   synthesis. Keep the original valid blocks if the merged request fails or exceeds any hard limit.
6. Build subtitle cues and scene boundaries inside the continuous block from the measured duration. Visual scenes may
   change while the same WAV continues; do not insert a new TTS request merely because the picture changes. The
   current Qwen endpoint returns WAV without word timestamps, so `measured-block-weighted-cues` is an approximate
   semantic allocation and must not be described as forced alignment.
7. Verify `timing.json`, `storyboard.json`, `subtitles.srt`, the final narration duration, and all quality gates. Flag
   any one-scene technical split or subtitle cue above the soft target for review.
8. In the final rendered MP4, listen to every narration block at normal speed. Check voice identity across block
   boundaries, pronunciation of names and numbers, clipped phonemes, duplicated words, abnormal pauses, cadence
   jumps, and subtitle agreement. Record the human full-episode listening result; metadata alone cannot pass this
   step.

## Safe commands

```powershell
pnpm video:voice:check
pnpm video:prepare -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/repository
```

Use the approved selection mapping. Regeneration may overwrite that project's current narration and production
resources; archive an earlier cut only when the user explicitly requests it.
