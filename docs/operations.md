# zimeiti 长期运行手册

## 周期运行

- 自动/手动统一入口：`pnpm scout:weekly`
- 仅采集：`pnpm scout:collect`
- 仅从本周成功数据重建基础榜：`pnpm scout:report`
- 发现配额：在 `config/trend-scout.json` 中配置 `growthCandidateQuota=30`、`activeStarsCandidateQuota=12`，两者之和必须等于 `maxCandidates=42`

长期调度只选择一种：优先使用 Codex 本地定时任务；若该目录尚未保存为 Codex 项目，再使用 `scripts/register-tasks.ps1` 的 Windows 本机回退。不要同时启用两套调度。调度器可以每天触发作为失败重试，但本周已经有成功标记时，命令不发起网络请求。

`data/trend-scout.sqlite` 的 `weekly_runs` 保存 `running`、`failed`、`completed` 或 `completed_with_warnings` 状态。后两者都代表本周采集成功；失败原因会保留，下一次触发重试。`weekly_discoveries` 保存当前发现池，`watchlist` 保存短期观察池。仓库 Star 快照仍以实际观测日期记录，不伪造中间日期。

## 趋势口径门禁

候选 JSON 的三个字段是发布门禁：

- `growthMeasurementStatus=ready` 且 `canClaimSevenDayGrowth=true`：可以描述为本地七日净增长。
- `growthMeasurementStatus=cold-start`：只能描述为 GitHub Trending 冷启动信号，不能写成过去七日本地增长。
- `growthLabel`：模板和文案生成器应直接展示这个字段，不要根据 `growth` 数字自行推断口径。

候选趋势分最高 93 分：七日绝对增长 30、七日相对增长 15、七日增长加速度 10、维护活跃度 8、周初总 Stars 30。相对增长和加速度统一使用 5000 Stars 的最小保护分母；总 Stars 采用 `min(30, 5 × log10(max(1, 周初 Stars)))`。正式评分前，发现层先取 30 个带正 GitHub Trending 信号的高增长项目，再从最近 84 天有推送的搜索结果中选取 12 个尚未入选、总 Stars 最高的项目。正常数据充足时形成 42 个唯一候选；不通过人工补录扩充。本周发现的候选进入主榜；短期观察池中本周未重新发现的项目以 `not-rediscovered` 状态附列，业务趋势分为 0，但 `growth` 与 `rawTrendScore` 保留事实值。

只有本地十四天边界快照齐全时，加速度才进入趋势分；否则 `accelerationScore=null`、`scoreStatus=provisional`，评分完整度为 83/93。冷启动可以用 GitHub Trending 信号临时估算本周绝对/相对增长和周初 Stars，但不得据此生成加速度。

## 网络与 GitHub

默认直连。如果环境必须使用代理，在未提交的 `.env.local` 中配置 `HTTP_PROXY`、`HTTPS_PROXY` 和 `NO_PROXY`。不要把代理凭据写入仓库。

GitHub 请求会对网络异常、408、429 和常见 5xx 最多尝试三次，并使用指数退避。401/403 不短时间重试，因为通常需要修正 Token、权限或额度。错误会带 `GITHUB_NETWORK_ERROR` 或 `GITHUB_HTTP_ERROR`，便于定时任务判定失败原因。

## 研究沙箱

默认 `CODEX_WINDOWS_SANDBOX=auto`：只读研究先使用 `elevated`，如果 Windows 沙箱设置助手被取消并返回 1223，则重试 `unelevated`。这是为了让静态读取继续进行；`unelevated` 的隔离弱于 `elevated`。

带 `--allow-run` 的研究只使用 `elevated`，不会自动回退。若企业策略长期阻止 elevated 设置，应由管理员修复本地用户/组、Firewall 和登录权限；不要通过关闭沙箱解决。

每次尝试都会在对应项目的 `output/videos/YYYY年MM月第N周-owner--repository/resources/_runs/` 单独记录所用沙箱、稳定诊断码和受信任制作 Skill 摘要。研究提示词会完整携带 Zimeiti 的 `video-production-quality` Skill、市场模式、视觉证据合同和验收清单；克隆仓库自己的规则文件既不执行，也不作为功能证据。功能研究只使用官方 README，以及显式 `--allow-run` 后保留的本机实测结果；不做源码、目录结构或文件行号映射。只有 `status=completed`、完整 commit SHA、官方 README 记录、有效的 `demoability` 评分、通过门禁的 `editorialBrief` 和 `visualEvidencePackage` 全部齐备时，研究包才会发布到同一项目的 `resources/`。编辑门禁失败会在研究阶段自动修正一次，不会把问题推迟到 TTS 或渲染阶段。只读研究的可演示性最高为 4/7；评分超过 4 必须至少有一个 `demoPlan` 步骤实际通过。

## 人工选择、批量研究与最终榜

1. `pnpm scout:select -- --report apps/trend-scout/trend_reports/YYYY-Www/YYYY-MM-DD.json` 在同一周报文件夹创建 `selection.json` 门禁文件，不再向独立选择目录输出产物。
2. 人工保留 7～8 个仓库并把 `status` 改为 `approved`；程序拒绝覆盖已有选择文件。
3. `pnpm research:batch -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json` 执行整批只读研究。单个失败不会阻止其他项目，每个项目的状态和研究资料都只写入其 `resources/`。
4. `pnpm scout:final -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json` 在 `apps/repo-researcher/final_rank/YYYY-Www/` 生成最终榜。最终分 = 基础趋势分（最高 93）+ 可演示性（最高 7）。
5. 只有在选择文件 `videoProjects` 中、研究完整且记录的制作 Skill 摘要仍与当前版本一致的项目，才能执行 `pnpm video:prepare`。项目目录和生产分镜路径由程序自动推导。
6. 重新生成最终榜后，只有 `videoApproved=true` 且动态分镜质量门禁通过的记录能正式渲染。渲染后自动执行完整音视频解码并生成 8 帧联系表，最终成片仍需人工审核。

## 克隆恢复

克隆写入 `*.clone-*` 临时目录，成功后原子切换。瞬时网络错误会重试，永久错误（例如仓库不存在）立即失败。程序只清理自己创建的临时目录；如果正式目标已存在但不是 Git 仓库，会停止并保留用户数据。

## 发布前检查

1. 运行 `pnpm test`。
2. 运行 `pnpm scout:weekly`，确认 `weekly_runs` 成功标记、30/12 发现配额，以及基础榜的增长口径、`scoreStatus`、`rankingStatus`。
3. 人工批准 7～8 个项目，批量运行默认只读研究，审核 `claims.json` 中的 README/实测证据与可演示性理由。
4. 仅在信任仓库且确实需要演示时显式使用 `--allow-run`。
5. 生成最终榜并确认目标记录的 `videoApproved=true`；渲染后检查分辨率、帧率、时长、音轨、字幕数量，并进行一次人工听看。
