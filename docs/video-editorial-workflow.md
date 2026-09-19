# 动态视频编排规范

## 目标

默认制作 45～120 秒的单项目快介，目标是 60～90 秒。A-roll 只负责用通俗旁白串起问题、例子和结论；B-roll 使用仓库画面、README 信息和研究阶段构造的具体例子承担主要说明。

## 固定叙事结构

1. 前 5 秒：直接说出观众熟悉的麻烦，并同步展示问题画面或项目结果。
2. 前 15 秒：说明项目怎样改变这件事；GitHub stars 最多出现一次。
3. 中段：用一至两个“问题 → 项目动作 → 结果”的具体例子说明用途，优先使用仓库原图、README 内容和直观流程。
4. 结尾：只说适合谁以及真正影响使用的一项限制，不再复述全部内容。

项目架构、研究方法、证据分类、演示计划和源码细节默认删除；只有它们直接帮助普通观众理解“这个项目解决什么问题”时才保留。Claude、OpenAI、GitHub、Codex、Qwen 等专有名称直接保留英文。

## 自动质量门禁

- 6～12 个场景，总长 45～120 秒，编辑目标为 60～90 秒。
- 平均场景时长不超过 20 秒，单场不超过 32 秒。
- 至少使用 3 种场景类型并包含结尾；解释性场景中至少 60% 为 `hero`、`media`、`flow`、`contrast`、`code` 或 `stat` B-roll。
- 普通相同场景类型不得连续超过 2 次；渐进流程、源码高亮或证据序列可按配置放宽。
- 100% 场景必须有 `source` 和 `evidenceMode`。
- 只读研究不能出现 `demo` 证据。
- 有合规仓库图片时，第一场必须立即展示项目画面。
- `source`、许可、证据模式和研究状态保留在分镜元数据中，但画面不显示“官方素材”“非本机实测”“源码证据”或“静态研究”等制作标签。
- 32 字符只是单条字幕的可读性软目标；没有合适语义边界时保留完整文本。
- 旁白块通常覆盖 2～6 个场景，并按项目自动选择概念讲解、代码分析、操作演示或快讯节奏。
- 单次 Qwen 请求不超过 1,000 字符，实测音频不超过 64 秒；超限或请求超时时只在完整句子处拆分，不裁字、不裁音频。
- 相同主题的相邻短块会尝试合并；合并后的实测音频仍须重新通过硬门禁。
- 解释以中文为主；产品、公司、模型和项目专有名称保留英文，难懂技术术语改成普通观众能理解的动作和结果。

规则集中在 `config/video-editorial.json`，实现位于 `apps/video-factory/src/editorial-planner.mjs`、`narration-blocks.mjs`、`narration.mjs` 和 `editorial-quality.mjs`。

开始规划、准备、渲染或交付正式视频前，必须完整阅读 `.agents/skills/video-production-quality/SKILL.md`，并按其中路由的市场基准和验收清单执行。生成音频前还必须完整阅读 `.agents/skills/audio-narration-preflight/SKILL.md`。自动 QA 只能把成片送到人工检查，不能替代人工整片试听和最终批准。

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
