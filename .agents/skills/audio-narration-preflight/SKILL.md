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
- A narration block normally covers 2-6 visual scenes. Technical duration or request-limit splits may temporarily
  produce a one-scene block and must be recorded in timing metadata.
- Keep spoken narration predominantly Chinese. Retain English only for important names or terms on the configured
  allowlist. Do not cluster many English terms in one request.
- The 32-character value is a subtitle readability soft target, not a TTS request limit. A longer cue is acceptable
  when no clean semantic boundary exists.
- Never fall back silently to another voice or provider. Confirm the configured voice ID through authenticated
  preflight without printing the API key.

## Choose cadence from the project

- `concept-explainer`: prefer longer blocks spanning 4-6 related scenes.
- `code-analysis`: use medium blocks and cut when the source file, mechanism, or flow changes.
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

## Safe commands

```powershell
pnpm video:voice:check
pnpm video:prepare -- --selection selections/YYYY-Www.json --repo owner/repository
```

Always choose a new output directory through the approved selection mapping. Do not overwrite an earlier cut.
