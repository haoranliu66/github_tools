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
  official README claim. The example's webpage, filenames, code fragments, and illustrative comment may be invented
  to make the documented function understandable; the animation is not a record of a project run. It does not
  authorize source-code inspection.

Static read-only research must never emit `executed-demo`. A narrated feature claim needs README or authorized-run
evidence; the small example used to explain that feature does not need to be a historical run. Keep the example's
illustrative details separate from evidence metadata and describe them in ordinary viewer language.

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
- `productionMaterials`: one inspected, filmable media or animation plan per selected episode function;
- `contrastMoments`: verified before/after, right/wrong, promise/limit, or input/output pairs.

Research is the visual-material handoff, not a source-code mapping exercise. After the research agent selects the
episode's functions, a separate read-only subagent must inspect the README-linked media for those functions. Record
each candidate's path, useful or unsuitable verdict, reason, reuse basis, and a useful crop or clip when applicable.
For a function with no suitable media, describe one recognizable user situation and the exact drawable objects,
example details, and reveal, movement, scan, connection, or state-change actions, with a README-backed claim mapping.
If media explains only setup or one portion of the function, retain it and also hand off an animation plan for the
unexplained action or result. Do not write “image not yet inspected” and
continue into production. Copy eligible README-linked media into
the project's `resources/visual-assets/` and retain its original repository path, provenance, and license basis in
the manifest. Do not collect a statistic or setup screenshot merely because it exists when it does not explain the
spoken function. Research proposes shots; final animation is designed after the narration is selected.

An illustrative beat may specify a renderable `shot`: a stylized browser, comparison, or question layout with short
before/action/result text, a focus state, and an optional cross over the misconception. Use it only with
`source-derived-animation` and a supporting README claim. Prefer a concrete visual example over a generic card:
show which webpage element changed, which file carries the change, what related area is inspected, and where a
sample comment appears when those are the documented functions. Render the example in the house illustration style
so it is visually distinct from repository media. A beat's `purpose` alone never creates an animation.

Prefer `object-action` for a function best explained by motion. Each beat's `stage` is a complete snapshot of stable
object IDs, kinds, short labels, normalized positions, and states; its `action` names what the renderer will animate
(`reveal`, `move`, `gather`, `expand`, `scan`, `anchor`, `morph`, or `focus`) and which objects it affects. Subsequent
beats carry unchanged objects forward instead of redrawing a new card. Put short illustrative details inside a
window, code, or comment object when those details make the function intelligible; labels alone are insufficient.
A focal change with no visible object or state change is not a new explanatory beat.

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

Use fades or directional entrances to reveal the next meaningful object. Reserve a large sliding question for a
turning point and an animated cross for a documented wrong premise, not an unsupported project limitation. Keep
objects spatially continuous across adjacent beats; a new transition without new meaning is not a beat.
