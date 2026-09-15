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
- 周榜 Markdown：`output/trend-reports/YYYY-MM-DD.md`
- 机器可读榜单：`output/trend-reports/YYYY-MM-DD.json`
- 人工选择：`selections/YYYY-Www.json`
- 批量研究清单：`output/research-batches/YYYY-Www.json`
- 研究后最终榜：`output/final-rankings/YYYY-Www.md` 与 `.json`

长期运行优先使用 Codex 的本地定时任务，并把 `D:\zimeiti` 保存为独立 Codex 项目；这能在应用里查看运行历史和失败通知。任务可每日触发 `pnpm scout:weekly`，但实际联网最多每周成功一次。Windows 的 `scripts/daily.ps1` 和 `scripts/weekly.ps1` 都调用同一幂等入口，后者仅为旧任务兼容。以下注册脚本只作为本机回退方案（默认每天 09:00 尝试，周一 10:00 再提供一次补偿触发）：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/register-tasks.ps1
```

可以用 `-DailyAt 08:30 -WeeklyDay Friday -WeeklyAt 18:00` 覆盖默认时间。两次触发共享同一周成功标记，不会重复联网。当前 `maxCandidates=42`，并强制等于 `growthCandidateQuota=30` 与 `activeStarsCandidateQuota=12` 之和；需要调整时必须同步修改三项配置并先确认 GitHub API 额度。

不要同时启用 Codex 定时任务和 Windows 计划任务，否则同一天会重复调用 GitHub。运维检查见 `docs/operations.md`。

## 2. repo-researcher

先从基础榜创建人工选择文件：

```powershell
pnpm scout:select -- --report output/trend-reports/YYYY-MM-DD.json
```

人工保留 7～8 个 `owner/name`，把 `status` 改为 `approved`，然后批量执行默认只读研究：

```powershell
pnpm research:batch -- --selection selections/YYYY-Www.json
```

`--dry-run` 可预览整批任务；只有逐仓库确认可信后才可在批量命令上增加 `--allow-run`。批处理会尝试所有选中项目，并在清单中分别记录成功或失败，不会因为单个项目失败而丢失其他结果。

先预览将交给 Codex 的任务，不发起模型运行：

```powershell
pnpm research -- owner/repository --dry-run
```

执行只读研究：

```powershell
pnpm research -- owner/repository
```

只有在明确确认仓库可信时，才允许 Codex 按官方 Quick Start 运行项目：

```powershell
pnpm research -- owner/repository --allow-run
```

安全默认值：

- 启动时关闭项目 `AGENTS.md` 注入、用户配置和仓库规则文件加载。
- 默认使用 Codex `read-only` 沙箱。
- Windows 下 `CODEX_WINDOWS_SANDBOX=auto` 会先选择首选的 `elevated` 沙箱；只有只读研究遇到沙箱设置被取消（错误 1223）时，才自动重试官方 `unelevated` 回退。`--allow-run` 永不自动降低隔离等级。
- 不运行安装脚本，不写系统目录，不使用用户凭据。
- `--allow-run` 会切换到 `workspace-write`，仍限制修改范围在克隆的研究工作区内。

研究包输出到 `output/research/YYYY-MM-DD/owner--repository/`，包括研究简报、事实证据、演示步骤、口播稿和初始分镜。

本地仓库可使用 `pnpm research -- fixture/name --local 'C:\absolute\repository'`，该模式以 `local:fixture/name` 标识来源，不将测试标识误当成远程 GitHub 仓库。

研究结果必须声明 `status: completed`，包含完整 Git commit SHA、实际读取文件清单、至少一条引用已读文件的证据，以及带理由和置信度的 `demoability` 评分，才会生成脚本、分镜等七件产物。`blocked`、`failed` 或证据不足会返回非零退出码。只读研究的可演示性最高 4/7；至少一个演示步骤实际通过后才允许评 5–7 分。`completed` 表示研究完成，不表示项目已执行或成片已获发布批准；事实、评分与证据仍需人工审核。

每次真实调用的标准输出、标准错误和运行元数据保存在 `output/research/_runs/`。该目录可能含仓库内容，不应公开提交；日志不记录环境变量或登录凭据。历史产物不会自动重新校验或清除。

远程仓库先克隆到一次性同盘目录，成功后再原子重命名为正式工作区。瞬时网络失败最多重试三次；失败残留会清理，已有非 Git 目录则拒绝覆盖。

## 3. video-factory

校验示例分镜：

```powershell
pnpm video:validate
```

研究完成后生成独立最终榜：

```powershell
pnpm scout:final -- --selection selections/YYYY-Www.json
```

先在选择文件的 `videoProjects` 中加入人工确认制作的项目，再重新生成最终榜。生产渲染只接受该最终榜中“研究完成 + 人工批准”的项目，不能直接传入任意分镜：

```powershell
pnpm video:render -- --final-ranking output/final-rankings/YYYY-Www.json --repo owner/repository --output output/video/owner--repository.mp4
```

打开同一获准项目的 Remotion Studio：

```powershell
pnpm video:studio -- --final-ranking output/final-rankings/YYYY-Www.json --repo owner/repository
```

`pnpm video:smoke` 使用仓库自带的合成最终榜，仅验证渲染链路，不代表真实项目获批。

分镜中的 `media` 场景可以引用本地图片或视频，顶层 `voiceover` 可以引用本地旁白。渲染前这些素材会复制到忽略版本控制的临时静态目录。

## 推荐周更流程

1. 自动任务每日调用 `pnpm scout:weekly`；本周成功后均无网络副作用，失败则在下次触发重试。
2. 从基础榜生成草稿，人工确认 7～8 个项目并将选择文件改为 `approved`。
3. 批量执行默认只读研究，审核事实清单；信任项目后才使用 `--allow-run` 做演示验证。
4. 运行 `pnpm scout:final`，根据趋势分 93 + 可演示性 7 形成独立最终榜。
5. 将获准制作的项目加入 `videoProjects`，重新生成最终榜，再由 `video-factory` 渲染。

详细边界和数据流见 [docs/architecture.md](docs/architecture.md)。
