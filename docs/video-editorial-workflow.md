# 动态视频编排规范

## 目标

每条正式视频使用同一套证据驱动的编辑语法：A-roll 负责讲清结论，B-roll 必须展示结果、源码、机制、数据或边界，不能只是装饰背景。

## 固定叙事结构

1. 结果先行：前两秒出现仓库官方画面；没有合规素材时使用问题/证据对比开场。
2. 项目定位：一句话说明解决什么问题，趋势数字只作为线索。
3. 核心机制：用 `flow` 拆解输入、处理和输出。
4. 源码证据：用 `code` 展示研究包中已有路径和摘录。
5. 应用场景：用 `media` 与 `audience` 说明适合谁、怎样使用。
6. 重要边界：用 `contrast` 区分已验证事实、推断和未运行事项。
7. 一句话结论：回收机制、证据和采用建议，最后进入 `outro`。

## 自动质量门禁

- 20～28 个场景，总长 85～300 秒。
- 平均场景时长不超过 12.5 秒，单场不超过 24 秒。
- 至少使用 6 种场景类型，并包含流程、源码、对比、受众和结尾场景。
- 普通相同场景类型不得连续超过 2 次；渐进流程、源码高亮或证据序列可按配置放宽。
- 100% 场景必须有 `source` 和 `evidenceMode`。
- 只读研究不能出现 `demo` 证据。
- 有合规仓库图片时，第一场必须立即展示项目画面。
- 32 字符只是单条字幕的可读性软目标；没有合适语义边界时保留完整文本。
- 旁白块通常覆盖 2～6 个场景，并按项目自动选择概念讲解、代码分析、操作演示或快讯节奏。
- 单次 Qwen 请求不超过 1,000 字符，实测音频不超过 64 秒；超限或请求超时时只在完整句子处拆分，不裁字、不裁音频。
- 相同主题的相邻短块会尝试合并；合并后的实测音频仍须重新通过硬门禁。
- 口播以中文为主，只保留必要的项目名和白名单英文术语。

规则集中在 `config/video-editorial.json`，实现位于 `apps/video-factory/src/editorial-planner.mjs`、`narration-blocks.mjs`、`narration.mjs` 和 `editorial-quality.mjs`。生成音频前还必须阅读 `.agents/skills/audio-narration-preflight/SKILL.md`。

## 每期操作

研究完成后先查看最终分，再由人工决定具体视频项目。选择文件必须同时填写：

```json
{
  "videoProjects": ["owner/repository"],
  "videoStoryboards": {
    "owner/repository": "output/video/owner--repository/storyboard.json"
  }
}
```

然后运行：

```powershell
pnpm video:voice:check
pnpm video:prepare -- --selection selections/YYYY-Www.json --repo owner/repository
pnpm scout:final -- --selection selections/YYYY-Www.json
pnpm video:render -- --final-ranking output/final-rankings/YYYY-Www.json --repo owner/repository --output output/video/owner--repository/final.mp4
```

`video:prepare` 只接受已批准、研究完成且有生产分镜映射的项目。它读取研究包、趋势快照与仓库中已登记的合规图片，生成旁白、字幕、自包含素材和结构 QA。生产旁白使用 `.env.local` 明确选择的提供方；Qwen 模式会先验证 SSH 隧道、API 认证和已注册音色，失败即停止。详见 [qwen-tts.md](qwen-tts.md)。

正式渲染只写入 `output/video/`。完成后自动生成：

- `qa/final/report.json`：帧数、时长、分辨率、SHA-256 与完整解码结果。
- `qa/final/sample-*.png`：按全片分布抽取的 8 个代表帧。
- `qa/final/contact-sheet.png`：供人工快速检查节奏、遮挡和视觉重复。

视频不会自动发布。事实审核、项目批准和最终成片批准仍由人工完成。
