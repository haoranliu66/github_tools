# Zimeiti short-video acceptance checklist

Use this checklist before rendering and for the human handoff. 

## Before preparation

- The approved project, completed research revision, final-ranking row, and production storyboard mapping agree.
- Every factual claim has repository, official-document, release, issue, trend-snapshot, or real-test support.
- The script answers “what problem does it solve?” in one plain sentence and includes at least one concrete example.
- The script does not read like a research report. Remove methodology, evidence recaps, architecture tours, and
  repeated conclusions unless they change the viewer's decision.
- Proper names such as Claude, OpenAI, GitHub, Codex, Qwen, and the project name keep their English form.

## Editorial structure

- The first five seconds show or state the familiar problem.
- The project answer is clear within 15 seconds.
- Stars appear at most once and are not used as proof of quality.
- B-roll carries most of the explanation through repository visuals, README content, or a research-backed example.
- Each example follows problem -> project action -> result and is understandable without senior technical knowledge.
- Viewer-facing visuals and narration do not contain production labels such as “官方素材”“非本机实测”“源码证据”
  or “静态研究”. Provenance remains available in the storyboard and research package.
- The cut stays within the configured 45-120 second range unless the user explicitly requested another format.

## Automated checks

- Storyboard validation and editorial gates pass with 6-12 scenes and B-roll-dominant coverage.
- Narration metadata matches the approved Qwen provider and voice.
- The prepared timeline respects the 32-second per-scene limit, 64-second narration-block limit, and 1,000-character
  request limit.
- Full audio/video decode passes and the render report records resolution, frame rate, duration, and checksum.

## Human handoff

After the checks above, report `ready-for-human-review` and provide the final MP4 plus the automated QA report. The AI
must not inspect generated screenshots, samples, or contact sheets after rendering. The human reviewer watches the
complete video, listens to the narration, checks captions and visuals, and decides whether to approve or request a new
cut. Publishing remains a separate human action.
