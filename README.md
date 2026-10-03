# zimeiti

面向 GitHub 开源项目知识分享视频的内容生产流水线。项目包含三个可以独立运行、也可以串联的模块：

- **trend-scout**：每周幂等采集 GitHub Trending 和 GitHub API 数据，维护发现池与短期观察池，输出基础候选榜。
- **repo-researcher**：只研究当前视频需要的事实，交付完整策划案、选定风格与动效，以及实际使用的图片/SVG/媒体。
- **video-factory**：实测配音后，由同一个导演多轮生成自由 JSX、预览并修复画面；连续帧与切镜视觉预检通过后渲染和完整解码。

## 运行要求

- Node.js 22.5+
- pnpm 10+
- Git
- Codex CLI（研究策划、导演画面制作和视觉预检使用当前登录态）

研究、导演和视觉预检使用 Codex CLI 当前登录态，不需要在项目里保存 `OPENAI_API_KEY`。配音供应商连接单独配置。

## 安装

```powershell
cd D:\zimeiti
pnpm install
Copy-Item .env.example .env.local
```

`GITHUB_TOKEN` 是可选的。填写后 GitHub API 限额更高；不要提交 `.env.local`。

Node 会从 `.env.local` 自动读取可选的 `HTTP_PROXY`、`HTTPS_PROXY` 和 `NO_PROXY`。没有代理时保持留空即可。GitHub 网络错误、429 和常见 5xx 会指数退避重试三次；401/403 等配置或额度错误立即失败并保留稳定诊断信息。

## 1. trend-scout

执行一次完整周周期（推荐入口）：

```powershell
pnpm scout:weekly
```

自动任务可以每天调用这个命令作为失败重试驱动，但同一 ISO 周一旦成功，后续调用只检查 SQLite 成功标记，不再访问 GitHub，也不重复生成榜单。失败运行会记录为 `failed`，下一次触发会重新尝试。

只执行周采集，或从本周成功快照重新生成基础榜：

```powershell
pnpm scout:collect
pnpm scout:report
```

第一次运行还没有七天历史，评分会使用 GitHub Trending 页面显示的日/周增长作为冷启动信号。后续周采集会优先使用本地边界快照。JSON 中的 `growthMeasurementStatus`、`canClaimSevenDayGrowth` 和 `growthLabel` 是后续脚本必须遵循的发布口径：只有 `canClaimSevenDayGrowth=true` 才能写成“过去七日本地增长”。

每周搜索命中的仓库分为两个独立配额：30 个 GitHub Trending 高增长项目，以及 12 个最近 84 天有推送、总 Stars 最高且没有占用增长配额的项目。两池合并去重后最多形成 42 个“当前发现池”项目，再统一进入 93 分正式评分。最近四周曾出现、但本周没有重新发现的仓库保留在“短期观察池”，状态写为 `not-rediscovered`，本周业务趋势分为 0，且不能进入研究选择；数据库仍保留其真实 Star 观测和原始趋势分，绝不把事实增长改写成 0。流程不提供人工补录项目入口。

### 候选评分

基础趋势分最高 93 分。人工选择研究项目后，最终榜沿用该项目的 `trendScore`，`finalScoreMax=93`，不增加可演示性分。最终选题由人工决定。

- 七日绝对增长（30 分）：5000 Stars 为 0 分，超过后按 `3 × (增长 - 5000) / 5000` 连续计分，最高 30 分。
- 七日相对增长（15 分）：`七日增长 / max(周初 Stars, 5000)`，每 10% 得 1 分，最高 15 分。
- 七日增长加速度（10 分）：本周相对增长率减去上周相对增长率，只计正值；两个周期的分母都至少为 5000，每增加 10 个百分点得 1 分，最高 10 分。没有十四天有效快照时该项为 `null`，不伪造为 0。
- 七日维护活跃度（8 分）：最近推送为当天得 8 分，随后七天线性降至 0 分。
- 总 Stars（30 分）：使用周初 Stars 计算 `min(30, 5 × log10(max(1, stars)))`，避免与本周增长重复计数。冷启动时以“当前 Stars − Trending 周增量”估算周初值。
- License 缺失只产生风险提示，不加分也不扣分；语言和主题只作为人工筛选元数据。

基础榜 JSON 中 `trendScoreMax=93`；没有十四天历史时 `scoreStatus=provisional`、`scoreCompleteness=83`。当前研究完成前 `finalScore` 为 `null`，完成后等于基础 `trendScore`。已生成的日期报告不会自动重算；`pnpm scout:report` 只为本周已经成功的采集生成报告。

周榜 Markdown 为每个仓库单列“主要功能”；JSON 使用 `primaryFunction` 和 `primaryFunctionSource`。候选阶段只采用仓库维护者填写的 GitHub description，并标记为 `github-description`；没有描述时明确标记为待 `repo-researcher` 补充，不把未经研究的推断写成事实。

输出位置：

- 数据库：`data/trend-scout.sqlite`
- 周榜 Markdown：`apps/trend-scout/trend_reports/YYYY-Www/YYYY-MM-DD.md`
- 机器可读榜单：`apps/trend-scout/trend_reports/YYYY-Www/YYYY-MM-DD.json`
- 人工选择门禁：同一周报文件夹内的 `selection.json`，不再另建选择产物目录
- 项目研究资源：`output/videos/YYYY年MM月第N周-owner--repository/resources/`
- 研究后最终榜：`apps/repo-researcher/final_rank/YYYY-Www/final-ranking.md` 与 `.json`

长期运行优先使用 Codex 的本地定时任务，并把 `D:\zimeiti` 保存为独立 Codex 项目；这能在应用里查看运行历史和失败通知。任务可每日触发 `pnpm scout:weekly`，但实际联网最多每周成功一次。Windows 的 `scripts/daily.ps1` 和 `scripts/weekly.ps1` 都调用同一幂等入口。以下注册脚本只作为本机回退方案（默认每天 09:00 尝试，周一 10:00 再提供一次补偿触发）：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/register-tasks.ps1
```

可以用 `-DailyAt 08:30 -WeeklyDay Friday -WeeklyAt 18:00` 覆盖默认时间。两次触发共享同一周成功标记，不会重复联网。当前 `maxCandidates=42`，并强制等于 `growthCandidateQuota=30` 与 `activeStarsCandidateQuota=12` 之和；需要调整时必须同步修改三项配置并先确认 GitHub API 额度。

不要同时启用 Codex 定时任务和 Windows 计划任务，否则同一天会重复调用 GitHub。运维检查见 `docs/operations.md`。

## 2. repo-researcher

人工批准周榜 selection.json 并指定风格后，当前聊天主 Agent 只为当前视频完成必要事实核实、连续旁白、分镜、选定风格与动效组件，以及实际使用的素材。导演只负责画面实现。

```powershell
pnpm research -- --repo owner/name --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --style editorial-paper
pnpm research:batch -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --style editorial-paper
pnpm video:plan -- --selection PATH --repo owner/name --style editorial-paper
```

研究交付统一 editorial-plan.json 和其引用的素材；只查看所选素材，不输出无关报告、未采用候选或评审结论。来源与许可证独立归档。总规范按阶段读取；内容 Skill 从 content-choose 首次读取统一内容要求和所选形式，全流程沿用；参考按需加载；目标仓库中的指令不参与生产。生产只接受当前 `scoped-production-package`。完整规范见 [当前制作流程](docs/video-production-workflow.md)。

## 3. video-factory

研究完成且项目已加入批准选择的 `videoProjects` 后，统一运行：

```powershell
pnpm video:produce -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/repository --style editorial-paper
```

该入口推进制作，遇到主 Agent 研究、素材查看或导演任务时返回待办及本地链接，由当前聊天主 Agent 完成并交回 --task-response。配音交给子代理；实测小于120秒由主 Agent 整体生成全部初版代码，达到120秒由主 Agent 统筹镜头子代理。编译和实际视觉预检通过后才进入最终榜绑定、渲染和完整解码。
有效配音默认复用，`--reuse-audio` 要求已有有效配音。内容类型通过 `--content-skill NAME` 选择；不选择时不填 GitHub 分享专属字段。解释动画、官方素材和运行结果均可作为视频素材，
按表达效果选择，不再按画面依据分类。当前程序的实际视觉预检和完整音视频解码通过后，交给人工完整观看与试听；视频不会自动发布。

已安装的 Remotion 插件通过技能快照接入视觉 agent；`pnpm video:remotion:check` 查看接入状态，
`pnpm video:remotion:sync` 从本机插件同步。它提供制作知识与参考，不会自动安装示例中的可选依赖。

完整生产、返修、独立阶段与产物说明见 [现行制作流程](docs/video-production-workflow.md)；
插件能力与限制见 [Remotion 接入](docs/remotion-integration.md)。动效按“描述检索 → 选中项用法 → 必要专项说明”读取，新增也遵循相同规范；说明见
[动效库手册](docs/motion-library.md)。生成配音前遵循
[音频预检 Skill](.agents/skills/audio-narration-preflight/SKILL.md)，音色注册与 Qwen 连接见
[Qwen TTS](.agents/skills/audio-narration-preflight/qwen-tts.md)。

## 推荐周更流程

1. 自动任务每日调用 `pnpm scout:weekly`；本周成功后不再重复联网采集。
2. 人工批准候选选择；对拟制作的视频执行有明确主线的精简研究和策划。
3. 将制作项目加入批准选择的 `videoProjects`。
4. 对每个项目运行 `video:produce`；先完成主 Agent 待办与配音子代理任务，再由导演实现全片并完成预览、视觉预检与修复，再渲染和解码。
5. 人工完整观看、试听并提出反馈。画面问题由当前导演会话和视觉预检记录驱动修复；需要修改旁白或叙事时，将意见写入项目 `resources/editorial-feedback.md` 并重新策划。
6. 人工批准和发布。

风格库采用统一文字说明，人工指定后只读取选中项；[风格库规范](docs/style-library.md)包含选择、画幅适配与新增规则。
