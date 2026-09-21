# zimeiti

面向 GitHub 开源项目知识分享视频的内容生产流水线。项目包含三个可以独立运行、也可以串联的模块：

- **trend-scout**：每周幂等采集 GitHub Trending 和 GitHub API 数据，维护发现池与短期观察池，输出基础候选榜。
- **repo-researcher**：安全克隆候选仓库，通过本机 Codex CLI 生成带证据的研究包。
- **video-factory**：校验分镜 JSON，通过 Remotion 渲染，再用随项目安装的 FFmpeg 标准化输出。

## 运行要求

- Node.js 22.5+
- pnpm 10+
- Git
- Codex CLI（仅 `repo-researcher` 的正式研究需要）

`repo-researcher` 使用 Codex CLI 当前登录态，不调用 OpenAI API，不需要在项目里保存 `OPENAI_API_KEY`。

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

`scout:refresh` 保留为 `scout:weekly` 的兼容别名。

第一次运行还没有七天历史，评分会使用 GitHub Trending 页面显示的日/周增长作为冷启动信号。后续周采集会优先使用本地边界快照。JSON 中的 `growthMeasurementStatus`、`canClaimSevenDayGrowth` 和 `growthLabel` 是后续脚本必须遵循的发布口径：只有 `canClaimSevenDayGrowth=true` 才能写成“过去七日本地增长”。

每周搜索命中的仓库分为两个独立配额：30 个 GitHub Trending 高增长项目，以及 12 个最近 84 天有推送、总 Stars 最高且没有占用增长配额的项目。两池合并去重后最多形成 42 个“当前发现池”项目，再统一进入 93 分正式评分。最近四周曾出现、但本周没有重新发现的仓库保留在“短期观察池”，状态写为 `not-rediscovered`，本周业务趋势分为 0，且不能进入研究选择；数据库仍保留其真实 Star 观测和原始趋势分，绝不把事实增长改写成 0。流程不提供人工补录项目入口。

### 候选评分

候选阶段的基础趋势分最高 93 分，人工选出 7～8 个项目研究后，再在独立最终榜补可演示性 0–7 分。受众匹配不参与机器评分，最终选题由人工决定。

- 七日绝对增长（30 分）：5000 Stars 为 0 分，超过后按 `3 × (增长 - 5000) / 5000` 连续计分，最高 30 分。
- 七日相对增长（15 分）：`七日增长 / max(周初 Stars, 5000)`，每 10% 得 1 分，最高 15 分。
- 七日增长加速度（10 分）：本周相对增长率减去上周相对增长率，只计正值；两个周期的分母都至少为 5000，每增加 10 个百分点得 1 分，最高 10 分。没有十四天有效快照时该项为 `null`，不伪造为 0。
- 七日维护活跃度（8 分）：最近推送为当天得 8 分，随后七天线性降至 0 分。
- 总 Stars（30 分）：使用周初 Stars 计算 `min(30, 5 × log10(max(1, stars)))`，避免与本周增长重复计数。冷启动时以“当前 Stars − Trending 周增量”估算周初值。
- 可演示性（7 分）：由 `repo-researcher` 研究后输出。只读研究最高 4 分；必须至少有一个实际通过的演示步骤才允许超过 4 分。
- License 缺失只产生风险提示，不加分也不扣分；语言和主题只作为人工筛选元数据。

基础榜 JSON 中 `trendScoreMax=93`；没有十四天历史时 `scoreStatus=provisional`、`scoreCompleteness=83`。研究完成前 `demoabilityScore` 与 `finalScore` 保持 `null`。旧日期报告和研究包不会自动重算；`pnpm scout:report` 只为本周已经成功的采集生成报告。

周榜 Markdown 为每个仓库单列“主要功能”；JSON 使用 `primaryFunction` 和 `primaryFunctionSource`。候选阶段只采用仓库维护者填写的 GitHub description，并标记为 `github-description`；没有描述时明确标记为待 `repo-researcher` 补充，不把未经研究的推断写成事实。

输出位置：

- 数据库：`data/trend-scout.sqlite`
- 周榜 Markdown：`apps/trend-scout/trend_reports/YYYY-Www/YYYY-MM-DD.md`
- 机器可读榜单：`apps/trend-scout/trend_reports/YYYY-Www/YYYY-MM-DD.json`
- 人工选择门禁：同一周报文件夹内的 `selection.json`，不再另建选择产物目录
- 项目研究资源：`output/videos/YYYY年MM月第N周-owner--repository/resources/`
- 研究后最终榜：`apps/repo-researcher/final_rank/YYYY-Www/final-ranking.md` 与 `.json`

长期运行优先使用 Codex 的本地定时任务，并把 `D:\zimeiti` 保存为独立 Codex 项目；这能在应用里查看运行历史和失败通知。任务可每日触发 `pnpm scout:weekly`，但实际联网最多每周成功一次。Windows 的 `scripts/daily.ps1` 和 `scripts/weekly.ps1` 都调用同一幂等入口，后者仅为旧任务兼容。以下注册脚本只作为本机回退方案（默认每天 09:00 尝试，周一 10:00 再提供一次补偿触发）：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/register-tasks.ps1
```

可以用 `-DailyAt 08:30 -WeeklyDay Friday -WeeklyAt 18:00` 覆盖默认时间。两次触发共享同一周成功标记，不会重复联网。当前 `maxCandidates=42`，并强制等于 `growthCandidateQuota=30` 与 `activeStarsCandidateQuota=12` 之和；需要调整时必须同步修改三项配置并先确认 GitHub API 额度。

不要同时启用 Codex 定时任务和 Windows 计划任务，否则同一天会重复调用 GitHub。运维检查见 `docs/operations.md`。

## 2. repo-researcher

先从基础榜创建人工选择文件：

```powershell
pnpm scout:select -- --report apps/trend-scout/trend_reports/YYYY-Www/YYYY-MM-DD.json
```

人工保留 7～8 个 `owner/name`，把 `status` 改为 `approved`，然后批量执行默认只读研究：

```powershell
pnpm research:batch -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json
```

`--dry-run` 可预览整批任务；只有逐仓库确认可信后才可在批量命令上增加 `--allow-run`。批处理会尝试所有选中项目，并把每项状态写入该项目的 `resources/research-batch-result.json`，不会因为单个项目失败而丢失其他结果。

先预览将交给 Codex 的任务，不发起模型运行：

```powershell
pnpm research -- owner/repository --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --dry-run
```

执行只读研究：

```powershell
pnpm research -- owner/repository --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json
```

只有在明确确认仓库可信时，才允许 Codex 按官方 Quick Start 运行项目：

```powershell
pnpm research -- owner/repository --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --allow-run
```

安全默认值：

- 启动时关闭项目 `AGENTS.md` 注入、用户配置和仓库规则文件加载。
- 启动研究前由 Zimeiti 主程序读取受信任的 `video-production-quality` Skill、市场模式、视觉证据合同和验收清单，完整注入研究提示词并记录内容摘要。克隆仓库中的 `SKILL.md`、`AGENTS.md` 既不作为指令执行，也不作为功能证据。
- 默认使用 Codex `read-only` 沙箱。
- Windows 下 `CODEX_WINDOWS_SANDBOX=auto` 会先选择首选的 `elevated` 沙箱；只有只读研究遇到沙箱设置被取消（错误 1223）时，才自动重试官方 `unelevated` 回退。`--allow-run` 永不自动降低隔离等级。
- 不运行安装脚本，不写系统目录，不使用用户凭据。
- `--allow-run` 会切换到 `workspace-write`，仍限制修改范围在克隆的研究工作区内。

研究一开始就创建 `output/videos/YYYY年MM月第N周-owner--repository/resources/`，包括研究简报、事实证据、演示步骤、口播稿和初始分镜。即使项目最终不制作视频，也保留相同项目目录结构。

本地仓库可使用 `pnpm research -- fixture/name --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --local 'C:\absolute\repository'`，该模式以 `local:fixture/name` 标识来源，不将测试标识误当成远程 GitHub 仓库。

研究结果必须声明 `status: completed`，包含完整 Git commit SHA、官方 README 读取记录、README 或获准实测证据、带理由和置信度的 `demoability` 评分，以及与当前制作 Skill 对齐的 `editorialBrief` 和 `visualEvidencePackage`，才会生成脚本、分镜等七件产物。研究不做源码、目录结构或文件行号映射。编辑简报明确目标观众、熟悉问题、一句话答案、标题承诺和带事实索引的具体例子；视觉证据包则把每个新信息映射为展示、证明或变化，并记录旁白 cue、事实索引、素材与 truth mode。语义门禁失败时，研究进程会自动进行一次有界修正；再次失败才终止。`blocked`、`failed`、证据不足或 Skill 摘要过期都会返回非零退出码。只读研究的可演示性最高 4/7；至少一个演示步骤实际通过后才允许评 5–7 分。`completed` 表示研究完成，不表示项目已执行或成片已获发布批准；事实、评分与证据仍需人工审核。

每次真实调用的标准输出、标准错误和运行元数据保存在对应项目的 `resources/_runs/`。该目录可能含仓库内容，不应公开提交；日志不记录环境变量或登录凭据。

远程仓库先克隆到一次性同盘目录，成功后再原子重命名为正式工作区。瞬时网络失败最多重试三次；失败残留会清理，已有非 Git 目录则拒绝覆盖。

## 3. video-factory

校验示例分镜：

```powershell
pnpm video:validate
```

研究完成后可先生成独立最终榜，用于比较研究后的最终分：

```powershell
pnpm scout:final -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json
```

确定制作项目后，把仓库加入选择文件的 `videoProjects`。生产目录由周报日期和仓库名自动推导，不再人工填写分镜路径。随后由统一编辑预设自动生成动态场景、旁白、字幕和结构质检报告：

```powershell
pnpm video:prepare -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/repository
```

生产旁白默认使用 `.env.local` 中显式选择的 TTS 提供方。当前推荐 `VIDEO_TTS_PROVIDER=qwen`：`video:prepare` 会复用可用连接，或自动建立免密 SSH 隧道，等待 Qwen 就绪后按项目节奏生成可跨 2～6 个画面的旁白块，再依据实测 WAV 时长生成场景和字幕时间轴。超过 64 秒或请求超时的旁白块只在完整句子处拆分；同主题短块会尝试合并，文案不会被裁掉。任务结束后只关闭本次自行建立的隧道。无需预先手动启动隧道，也无需单独执行音频命令；健康、认证或音色检查失败时直接停止，不会静默退回旧声音。Windows Huihui 仅在显式设置 `VIDEO_TTS_PROVIDER=windows` 时使用。生成前必须阅读 [.agents/skills/audio-narration-preflight/SKILL.md](.agents/skills/audio-narration-preflight/SKILL.md)，配置与安全边界见 [docs/qwen-tts.md](docs/qwen-tts.md)。

新增音色时需同时提供参考录音和准确逐字稿；注册并激活后，之后所有 `video:prepare` 都会自动使用它：

```powershell
pnpm video:voice:register -- --name narrator-two --audio "C:\path\reference.wav" --ref-text-file "C:\path\reference.txt" --activate
```

审核 `episode.source.json`、`storyboard.json` 和 `qa-report.json` 后重新生成最终榜。生产渲染只接受最终榜中“研究完成 + 人工批准 + 生产分镜存在”的项目，不能直接传入任意分镜：

```powershell
pnpm video:render -- --final-ranking apps/repo-researcher/final_rank/YYYY-Www/final-ranking.json --repo owner/repository
```

打开同一获准项目的 Remotion Studio：

```powershell
pnpm video:studio -- --final-ranking apps/repo-researcher/final_rank/YYYY-Www/final-ranking.json --repo owner/repository
```

分镜支持 `hero`、`flow`、`code`、`media`、`contrast`、`audience` 等动态编辑场景；仓库研究生成的场景按旁白 cue 使用 README 素材裁切、逐步流程、获准实测录屏与前后对比，不再要求源码高亮或文件行号映射。带 `src` 的场景及 beat 可以引用本地图片或视频，顶层 `voiceover` 可以引用本地旁白；渲染前这些素材会复制到忽略版本控制的临时静态目录。正式渲染后还会自动完成音视频全量解码，抽取 8 个代表帧并生成 `qa/final/contact-sheet.png`；AI 不打开或评审这些截图，直接交给人工检查。

## 推荐周更流程

1. 自动任务每日调用 `pnpm scout:weekly`；本周成功后均无网络副作用，失败则在下次触发重试。
2. 从基础榜生成草稿，人工确认 7～8 个项目并将选择文件改为 `approved`。
3. 批量执行默认只读研究，审核事实清单；信任项目后才使用 `--allow-run` 做演示验证。
4. 运行 `pnpm scout:final`，根据趋势分 93 + 可演示性 7 形成独立最终榜，用它选择视频项目。
5. 将获准制作的项目加入 `videoProjects`；生产路径由程序自动推导。
6. 运行 `pnpm video:prepare` 生成动态分镜和结构 QA，人工审核后重新生成最终榜。
7. 由 `video-factory` 正式渲染；检查自动生成的联系表和解码报告后再做人工成片批准。

详细编排规范见 [docs/video-editorial-workflow.md](docs/video-editorial-workflow.md)，边界和数据流见 [docs/architecture.md](docs/architecture.md)。
