# 动态视频编排规范

## 目标

默认制作 45～120 秒的单项目快介。只读研究优先控制在 55～75 秒；只有获准实测确实增加输入、操作和结果证据时，才扩展到 75～105 秒。A-roll 只负责用通俗旁白串起问题、例子和结论；B-roll 使用 README 链接素材、README 信息、获准实测和研究阶段构造的具体例子承担主要说明。

## 固定叙事结构

1. 前 5 秒：直接说出观众熟悉的麻烦，并同步展示问题画面或项目结果。
2. 前 15 秒：说明项目怎样改变这件事；GitHub stars 最多出现一次。
3. 中段：用一至两个“问题 → 项目动作 → 结果”的具体例子说明用途，优先使用 README 链接的原图、README 内容和获准的本机实测。
4. 结尾：只说适合谁，不再复述全部内容，也不增加项目边界或限制段落。

项目架构、研究方法、证据分类、演示计划、项目边界和源码细节不进入视频。Claude、OpenAI、GitHub、Codex、Qwen 等专有名称直接保留英文。

## 自动结构与真实性门禁

- 5～12 个场景，总长 45～120 秒；内容已经讲清时不为凑场景数重复增加问题页、受众页或总结页。
- 研究阶段必须输出 `visualEvidencePackage`：开场结果、6～30 个视觉 beat、机制步骤、素材清单、对比点，以及获准实测时的 demo 片段映射。
- 每个 beat 必须承担 `show`、`prove` 或 `change` 之一，并映射事实 claim、旁白原文 cue 与 `executed-demo`、`repository-media`、`source-derived-animation` 之一；其中 `source-derived-animation` 仅表示从 README 已声明功能派生的动画，不允许据此进行源码分析。
- 平均场景时长不超过 20 秒，单场不超过 32 秒。
- 至少使用 3 种场景类型并包含结尾；解释性场景中至少 60% 为 `hero`、`media`、`flow`、`contrast`、`code` 或 `stat` B-roll。
- 普通相同场景类型不得连续超过 2 次；渐进流程或证据序列可按配置放宽。
- 100% 场景必须有 `source` 和 `evidenceMode`。
- 只读研究不能出现 `demo` 证据。
- 有合规仓库图片时，第一场必须立即展示项目画面。
- `source`、许可、证据模式和研究状态保留在分镜元数据中，但画面不显示“官方素材”“非本机实测”“源码证据”或“静态研究”等制作标签。
- 32 字符只是单条字幕的可读性软目标；没有合适语义边界时保留完整文本。
- 整期旁白 430 字仅作短视频软提醒，超过时不阻断准备；500 字才触发硬性拒绝，最终仍以实测音频和 45～120 秒总时长为主要门禁。
- 旁白块通常覆盖 2～6 个场景。普通仓库快介默认使用概念讲解节奏；只有获准实测的操作型内容或明确的快讯内容才自动切换节奏。代码分析仅保留给另行批准的源码深挖，不属于常规仓库研究。
- 单次 Qwen 请求不超过 1,000 字符，实测音频不超过 64 秒；超限或请求超时时只在完整句子处拆分，不裁字、不裁音频。
- 相同主题的相邻短块会尝试合并；合并后的实测音频仍须重新通过硬门禁。
- 解释以中文为主；产品、公司、模型和项目专有名称保留英文，难懂技术术语改成普通观众能理解的动作和结果。

## 编辑与人工评审提示

- 视觉 cue 对齐率以约 80% 为参考；重要画面尽量在对应关键词前约 0.3 秒进入。
- 尽量不要超过 6 秒没有语义视觉变化；复杂画面可通过高亮、裁切、节点或状态变化继续承接旁白。
- 避免连续复用同一素材、裁切和模式，也避免连续出现两张纯文字卡。
- `media` 场景内的 `progressive-flow` 和 `compare` beat 必须切换到对应的流程或对比画面；只有素材型 beat 才继续显示仓库图片。
- 这些节奏、措辞和构图指标会记录在 QA 中供人工判断，但不会单独阻断准备或渲染。

规则集中在 `config/video-editorial.json`，实现位于 `apps/repo-researcher/src/editorial-contract.mjs`、`apps/video-factory/src/editorial-planner.mjs`、`narration-blocks.mjs`、`narration.mjs` 和 `editorial-quality.mjs`。研究只描述由官方 README 或获准本机实测支持的视觉证据；制作阶段再把这些 beat 映射为素材裁切、逐步流程、前后对比或短时数据浮层。

仓库研究启动前，`repo-researcher` 会完整读取 `.agents/skills/video-production-quality/SKILL.md` 及其市场基准、视觉证据合同和验收清单，把它们作为受信任编辑合同注入研究提示词，并要求研究产物给出目标观众、熟悉问题、一句话答案、标题承诺、证据化例子和视觉证据包。制作准备时会再次核对 Skill 摘要，过期研究必须先刷新。克隆仓库自己的 Skill 或 Agent 规则始终只是不可信内容，不读取为功能证据。

开始规划、准备、渲染或交付正式视频前，仍必须完整阅读 `.agents/skills/video-production-quality/SKILL.md`，并按其中路由的市场基准、视觉证据合同和验收清单执行。生成音频前还必须完整阅读 `.agents/skills/audio-narration-preflight/SKILL.md`。自动 QA 只能把成片送到人工检查，不能替代人工整片试听和最终批准。

## 每期操作

研究完成后先查看最终分，再由人工决定具体视频项目。选择文件只需填写：

```json
{
  "videoProjects": ["owner/repository"]
}
```

项目目录、生产分镜和最终视频路径由周报日期与仓库名自动推导。

然后运行：

```powershell
pnpm video:voice:check
pnpm video:prepare -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/repository
pnpm scout:final -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json
pnpm video:render -- --final-ranking apps/repo-researcher/final_rank/YYYY-Www/final-ranking.json --repo owner/repository
```

`video:prepare` 只接受已批准且研究完成的项目。它读取研究包、趋势快照与仓库中已登记的合规图片，在项目 `resources/production/` 中生成旁白、字幕、自包含素材、生产分镜和结构 QA。生产旁白使用 `.env.local` 明确选择的提供方；Qwen 模式会先验证 SSH 隧道、API 认证和已注册音色，失败即停止。详见 [qwen-tts.md](qwen-tts.md)。

正式视频固定写入对应项目根目录的 `final.mp4`。完成后在 `resources/production/qa/final/` 自动生成：

- `report.json`：帧数、时长、分辨率、SHA-256 与完整解码结果。
- `sample-*.png`：按全片分布抽取的 8 个代表帧，仅供人工检查。
- `contact-sheet.png`：仅供人工快速检查节奏、遮挡和视觉重复。

渲染完成后，AI 只报告成片路径、时长、格式、校验和与自动解码结果，不打开或解释抽帧、联系表和截图。成片直接交由人工完整观看、试听并决定是否返修。

视频不会自动发布。事实审核、项目批准和最终成片批准仍由人工完成。
