# Visual evidence and beat contract

Use this reference while researching a repository, planning a storyboard, or deciding whether a visual can support a
spoken claim.

## Narrative scenes and visual beats

A scene is a narrative container. A visual beat is a meaningful change inside or between scenes. Do not create a new
narration block merely because the visual changes.

The opening identity beat is a special case: after the personal problem, show the official GitHub repository preview
for about 2-4 seconds with a small push-in while the narration explicitly says the project name and approximate star
magnitude. Treat it as project identity, not as evidence for a feature. Move immediately to README-backed feature
visuals or the concrete example.

Every beat has one job:

- `show`: make the named object, action, or result visible;
- `prove`: show the official README statement, README-linked asset, or authorized real result that supports the claim;
- `change`: move the explanation forward through a crop, highlight, new node, data-flow step, before/after state, or
  result reveal.

Decorative transitions do not count as beats. New information without a mapped beat is incomplete; a beat without a
claim or explanation is decoration.

## Truth modes

Truth mode belongs to each beat and asset, not to the whole video:

- `executed-demo`: captured from an explicitly authorized run with a passed demo step and retained run record;
- `repository-media`: an image, video, or interface linked from the official README with a usable license basis;
- `source-derived-animation`: a legacy schema name for an explanatory animation constructed only from a verified
  official README claim, without implying that the project was run. It does not authorize source-code inspection.

Static read-only research must never emit `executed-demo`. README-linked media and README-derived animation may
explain documented behavior, but may not use first-person test language or claim a runtime result.

## Research evidence boundary

Feature research uses only the official README and retained results from an explicitly authorized local run. Record
the Git commit as version context, but do not inspect source code, map claims to files or line numbers, or use release,
issue, commit-history, or arbitrary documentation content as feature evidence. If neither the README nor a passed
local run supports a claim, leave it out of the research package and video.

Repository media is eligible only when the official README links or embeds it. A local run must retain its command,
status, and captured result. Keep limitations internally only when the README or run result establishes them; do not
turn them into viewer-facing sections.

## Research handoff

Produce a `visualEvidencePackage` with:

- `hookMoment`: the strongest result or change that can appear immediately;
- `visualBeats`: ordered beats mapped to exact narration cues, claims, assets, truth modes, and useful focal regions;
- `demoMoments`: passed demo steps and capture assets, or an empty list in read-only research;
- `mechanismSteps`: the small set of nodes or actions that should appear progressively;
- `evidenceAssets`: reusable repository or captured media with path, license, provenance, and claim mappings;
- `contrastMoments`: verified before/after, right/wrong, promise/limit, or input/output pairs.

Also draft the viewer narration as one continuous paragraph before copying its exact spans into `video.hook`,
`video.sections[].narration`, and `video.closing`. Let those spans preserve the paragraph's order and transitions.

For every visual beat, use an exact short substring of its assigned section narration as `narrationCue`. Prefer one
focal point. Use normalized `focalRegion` coordinates only when a crop materially directs attention.

## Timing guidance

These are planning prompts, not automated pass/fail thresholds. Use judgment and let the human reviewer decide
whether the finished pacing works.

- Start a supporting visual shortly before or at its narration cue. The production target is about 0.3 seconds early,
  with a 0-1 second tolerance because Qwen does not provide word-level timestamps.
- Avoid more than six seconds without a meaningful visual change. A complex view may stay longer only when nodes,
  cursor position, highlight, crop, state, or data flow keeps changing.
- A 60-second video commonly uses 8-16 shots and 12-24 meaningful beats. This is a target range, not a quota.
- Do not place two text-only cards back to back. Do not repeat the same asset, crop, and visual mode as consecutive
  beats.
- Prefer 2-3 narrative scenes per concept-explainer narration block so approximate subtitle timing does not drift
  across too many different pictures. A visual beat may still change inside a scene without forcing a new TTS request.
- Use large text for keywords and results, not as a duplicate transcript.

## Preferred visual grammar

Use the smallest sequence that proves the point:

1. wide context;
2. local action or highlighted mechanism;
3. result or consequence.

Progressively reveal only the user-visible steps needed to understand a documented function. For real demos, show
the input, action, and observed output. Keep provenance in metadata instead of adding production labels to the
viewer-facing frame.
