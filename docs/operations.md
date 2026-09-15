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

每次尝试都会在 `output/research/_runs/` 单独记录所用沙箱和稳定诊断码。只有 `status=completed`、完整 commit SHA、已读文件清单、仓库内证据和有效的 `demoability` 评分全部齐备时，研究包才会发布到正式输出目录。只读研究的可演示性最高为 4/7；评分超过 4 必须至少有一个 `demoPlan` 步骤实际通过。

## 人工选择、批量研究与最终榜

1. `pnpm scout:select -- --report output/trend-reports/YYYY-MM-DD.json` 创建草稿。
2. 人工保留 7～8 个仓库并把 `status` 改为 `approved`；程序拒绝覆盖已有选择文件。
3. `pnpm research:batch -- --selection selections/YYYY-Www.json` 执行整批只读研究。单个失败不会阻止其他项目，并写入 `output/research-batches/YYYY-Www.json`。
4. `pnpm scout:final -- --selection selections/YYYY-Www.json` 生成研究后最终榜。最终分 = 基础趋势分（最高 93）+ 可演示性（最高 7）。
5. 只有在选择文件 `videoProjects` 中且研究完整的项目，最终榜才标记 `videoApproved=true`。`video-factory` 只接受这样的记录。

## 克隆恢复

克隆写入 `*.clone-*` 临时目录，成功后原子切换。瞬时网络错误会重试，永久错误（例如仓库不存在）立即失败。程序只清理自己创建的临时目录；如果正式目标已存在但不是 Git 仓库，会停止并保留用户数据。

## 发布前检查

1. 运行 `pnpm test`。
2. 运行 `pnpm scout:weekly`，确认 `weekly_runs` 成功标记、30/12 发现配额，以及基础榜的增长口径、`scoreStatus`、`rankingStatus`。
3. 人工批准 7～8 个项目，批量运行默认只读研究，审核 `claims.json`、`inspectedFiles` 与可演示性理由。
4. 仅在信任仓库且确实需要演示时显式使用 `--allow-run`。
5. 生成最终榜并确认目标记录的 `videoApproved=true`；渲染后检查分辨率、帧率、时长、音轨、字幕数量，并进行一次人工听看。
