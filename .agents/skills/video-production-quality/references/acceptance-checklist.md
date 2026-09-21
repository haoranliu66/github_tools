# Zimeiti short-video acceptance checklist

Use this checklist before rendering and for the human handoff. 

## Before preparation

- The approved project, completed research revision, final-ranking row, and production storyboard mapping agree.
- Every viewer-facing feature claim is supported by the official README or an explicitly authorized, retained local
  test result. The trend snapshot may supply the one stars value but is not feature evidence.
- The script answers “what problem does it solve?” in one plain sentence and includes at least one concrete example.
- The familiar problem and example are written for an individual developer unless collaboration is the product's
  documented purpose.
- One continuous narration was written and read through before it was divided into hook, sections, and closing.
- The script does not read like a research report. Remove methodology, evidence recaps, architecture tours,
  project-boundary sections, limitations, and repeated conclusions.
- Proper names such as Claude, OpenAI, GitHub, Codex, Qwen, and the project name keep their English form.

## Editorial review prompts

Use this section while planning and during human review. These preferences must not reject research, preparation, or
rendering automatically.

- The first five seconds show or state the familiar problem.
- The opening explicitly says the project name after the problem and shows the official GitHub repository preview with
  a restrained 2-4 second push-in.
- The project answer is clear within 15 seconds.
- Stars appear at most once, use an approximate magnitude instead of an exact count, and are not proof of quality.
- B-roll carries most of the explanation through README-linked visuals, README content, an authorized local demo, or
  a README-backed example.
- Each important claim maps to at least one visual beat whose role is show, prove, or change.
- Every beat records valid claim mappings and one truth mode. Static research contains no executed-demo beats.
- The prepared cut has no visual-semantic gap longer than six seconds, no consecutive duplicate composition, and no
  two adjacent text-only beats.
- Each example follows problem -> project action -> result and is understandable without senior technical knowledge.
- Section joins continue one thought without restarting the pitch, and the closing recommends saving the project for a
  relevant future task instead of saying where its URL appears.
- Viewer-facing visuals and narration do not contain production labels such as “官方素材”“非本机实测”“源码证据”
  or “静态研究”. Provenance remains available in the storyboard and research package.
- The cut stays within the configured 45-120 second range unless the user explicitly requested another format.

## Automated checks

- Storyboard structure, evidence truth modes, approval mapping, and required media paths are valid.
- Narration metadata matches the approved Qwen provider and voice.
- The prepared timeline respects the 32-second per-scene limit, 64-second narration-block limit, and 1,000-character
  request limit.
- A normal concept-explainer narration block covers 2-3 scenes; a one-scene block is reserved for a technical split.
- Full audio/video decode passes and the render report records resolution, frame rate, duration, and checksum.

## Human handoff

After the checks above, report `ready-for-human-review` and provide the final MP4 plus the automated QA report. The AI
must not inspect generated screenshots, samples, or contact sheets after rendering. The human reviewer watches the
complete video, listens to the narration, checks captions and visuals, and decides whether to approve or request a new
cut. Publishing remains a separate human action.
