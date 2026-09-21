# Market patterns for short open-source project videos


## Observable format split

| Market sample | Observable pattern | House takeaway |
| --- | --- | --- |
| [Bilibili GitHub popular-project shorts](https://www.bilibili.com/video/BV1kquyzMEyH/) | The series contains single-tool clips around 31-55 seconds; titles lead with the result or pain, not the repository architecture. | A one-project introduction can explain the useful idea in well under two minutes. |
| [Bilibili weekly GitHub project shorts](https://www.bilibili.com/video/BV1b9VS64E1s/) | Individual project entries are commonly about 20-70 seconds and use direct labels such as PDF tool, memory plugin, remote desktop, or browser control. | Name the familiar job first; the repository name is supporting context. |
| [Daily AI / Skills project digest](https://www.bilibili.com/video/BV1LZJM6NEMG/) | Multi-project roundups range from about 3 to 12 minutes. | Several minutes are justified for a roundup, not as the default for one small project. |
| [GitHub project deployment explanation](https://www.bilibili.com/video/BV1D1421D77Y/) | A task-focused tutorial is 2:57 and promises one concrete outcome. | Installation or tutorial depth is a separate format and must be requested. |
| [OpenBiliClaw creator deep dive](https://www.bilibili.com/video/BV1vZRHBsEcj/) | The long-form version spends 18:28 on motivation, design, and product direction. | Creator stories and architecture belong to an intentional deep dive, not a quick project recommendation. |
| [2025 GitHub roundup](https://www.bilibili.com/video/BV1E6vzBwE2M/) | A 14:47 annual roundup covers many projects with one-line positioning. | Duration should scale with the number of projects and the viewer's promised task. |

YouTube's current creator guidance says the opening should immediately deliver the value promised by the title and
thumbnail, and its retention report treats the first 30 seconds as a distinct intro checkpoint. It also recommends
moving compelling later moments earlier because audiences normally decrease over time:

- <https://support.google.com/youtube/answer/16559650?hl=en>
- <https://support.google.com/youtube/answer/9314415?hl=en>

## Zimeiti default format

Use a 45-120 second single-project explanation. Prefer 55-75 seconds for static research; use 75-105 seconds only
when an authorized real demo adds useful input/action/result evidence. A practical outline is:

1. **0-5 seconds — familiar personal problem.** Show the frustrating before-state or the project's result while the
   narration names a situation an individual developer can recognize. Do not default to a colleague or team meeting.
2. **5-15 seconds — the answer.** Say “这个开源工具可能会帮到你，它叫 ProjectName”, show the official GitHub
   repository preview with a simple 2-4 second push-in, say what it changes, and mention approximate stars once.
3. **15-60 seconds — concrete example.** Use README-linked B-roll, an authorized local demo, or one README-backed
   example to show problem, project action, and result. Add a second example only when it teaches a different use.
4. **60-90 seconds — takeaway.** Say who benefits and end without a recap of every section. Do not add a separate
   project-boundary or limitation segment.

The time ranges are editorial guidance, not forced chapter boundaries. Delete a beat when the project is already
clear.

## A-roll and B-roll logic

### A-roll

A-roll is primarily the voiceover. Its jobs are limited to naming the problem, explaining the change, connecting the
example, and stating the takeaway. Use short sentences and familiar verbs. Do not narrate research methodology,
provenance labels, trend formulas, or a catalogue of features.

Draft A-roll as one continuous paragraph first. Only after the transitions work should it be divided into the hook,
sections, subtitle cues, and narration blocks. The section join must sound like one speaker continuing the same thought,
not several independent cards placed next to each other.

### B-roll

B-roll should carry the explanation rather than decorate it. Choose in this order:

1. result image, GIF frame, interface, or diagram linked from the official README that shows what the viewer gets;
2. a cropped README statement placed beside the visual it describes;
3. a captured input/action/result sequence from an explicitly authorized local run;
4. a simple before/action/after example constructed from a feature stated in the official README.

Change B-roll when the subject, action, proof, or result changes. A sentence may drive several beats, while several
short sentences may share one beat when the visual meaning is unchanged. Keep one focal point per beat. License,
confidence, truth mode, and static-review status remain in storyboard metadata but are not viewer-facing labels.

Research on transcript-aligned B-roll found common clip lengths of 0.5-8 seconds and strong alignment between insertion
points and nearby narration keywords. Treat that as timing guidance, not a universal quota for technical animation:

- <https://arxiv.org/abs/1902.11216>

## What to cut

- separate research-method, evidence-boundary, demo-plan, and source-disclosure scenes;
- repeated “who it is for” and “should you use it” sections;
- trend score explanations or more than one stars mention;
- exact star counts, or a popularity sentence separated from the project introduction;
- architecture and code detail that does not change the viewer's understanding of the problem;
- academic words that can be replaced by a situation, action, or result;
- an outro that repeats the hook, mechanism, proof, and caveat, or says “项目地址见画面”.
