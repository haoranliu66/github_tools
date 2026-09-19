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

Use a 45-120 second single-project explanation, targeting 60-90 seconds. A practical outline is:

1. **0-5 seconds — familiar problem.** Show the frustrating before-state or the project's result while the narration
   names the problem in ordinary language.
2. **5-15 seconds — the answer.** Name the project, say what it changes, and mention its current stars once if useful.
3. **15-60 seconds — concrete example.** Use repository B-roll and one research-backed example to show problem,
   project action, and result. Add a second example only when it teaches a different use.
4. **60-90 seconds — takeaway.** Say who benefits and the one caveat that changes the decision. End without a recap
   of every section.

The time ranges are editorial guidance, not forced chapter boundaries. Delete a beat when the project is already
clear.

## A-roll and B-roll logic

### A-roll

A-roll is primarily the voiceover. Its jobs are limited to naming the problem, explaining the change, connecting the
example, and stating the takeaway. Use short sentences and familiar verbs. Do not narrate research methodology,
provenance labels, trend formulas, or a catalogue of features.

### B-roll

B-roll should carry the explanation rather than decorate it. Choose in this order:

1. repository-owned result image, GIF frame, interface, or README diagram that shows what the viewer gets;
2. a cropped README statement placed beside the visual it describes;
3. a simple before/action/after example constructed from verified repository behavior;
4. a short flow or code excerpt only when a non-expert can understand why it matters immediately.

Change B-roll when the subject or action changes, not at every sentence. Keep one focal point per scene. A source path,
license, confidence, and static-review status remain in storyboard metadata but are not viewer-facing labels.

## What to cut

- separate research-method, evidence-boundary, demo-plan, and source-disclosure scenes;
- repeated “who it is for” and “should you use it” sections;
- trend score explanations or more than one stars mention;
- architecture and code detail that does not change the viewer's understanding of the problem;
- academic words that can be replaced by a situation, action, or result;
- an outro that repeats the hook, mechanism, proof, and caveat.
