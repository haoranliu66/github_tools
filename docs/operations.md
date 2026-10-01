# zimeiti 长期运行手册

## 周期运行

- 完整周周期：`pnpm scout:weekly`。
- 仅采集：`pnpm scout:collect`。
- 从本周成功数据重建基础榜：`pnpm scout:report`。
- 发现配额在 `config/trend-scout.json` 中配置，`growthCandidateQuota=30`、`activeStarsCandidateQuota=12`，两者之和必须等于 `maxCandidates=42`。

长期调度选择一种：优先使用 Codex 本地定时任务；本机调度可使用 scripts/register-tasks.ps1。调度器可以每天触发作为失败重试，但本周已有成功标记时不再发起网络请求。

data/trend-scout.sqlite 的 weekly_runs 保存 running、failed、completed 或 completed_with_warnings；后两者代表本周采集成功。错误原因保留以便重试。weekly_discoveries 保存发现池，watchlist 保存短期观察池；Star 快照以实际日期记录。

## 趋势与最终排名

- growthMeasurementStatus=ready 且 canClaimSevenDayGrowth=true，才可描述为本地七日净增长。
- cold-start 只能描述为 GitHub Trending 冷启动信号；文案沿用 growthLabel，不根据数字猜测口径。
- 趋势分最高 93 分：七日绝对增长 30、相对增长 15、加速度 10、维护活跃度 8、周初总 Stars 30。
- 相对增长和加速度以 5000 Stars 为最小保护分母；总 Stars 分为 min(30, 5 × log10(max(1, 周初 Stars)))。
- 十四天边界快照不完整时，加速度为 null，scoreStatus=provisional，评分完整度为 83/93。冷启动不生成加速度。
- 本周未重新发现的观察池项目标记 not-rediscovered，业务趋势分为 0，但保留真实增长与 rawTrendScore；不能进入研究选择。
- 最终榜沿用 trendScore，最高仍为 93，不增加可演示性分。完成当前研究后才有 finalScore；批准视频进入渲染还需要完整策划案、程序和当前视觉预检。

## 网络

GitHub API 和趋势采集默认直连；需要代理时在未提交的 .env.local 中配置 HTTP_PROXY、HTTPS_PROXY、NO_PROXY。凭据不得进入仓库。

GitHub 请求对网络异常、408、429 和常见 5xx 最多尝试三次并指数退避；401/403 应修正权限或额度。错误保留 GITHUB_NETWORK_ERROR 或 GITHUB_HTTP_ERROR。

## 研究与制作

人工批准周榜 selection.json 后，研究 Agent 只核实本片所需事实，交付完整旁白、风格与动效选择、分镜及实际使用的图片/SVG/媒体。读取固定提交的官方 README，按需查看相关素材代码、效果演示和用法，不运行被研究仓库。未使用的资料和候选不进入交付包；来源归档独立保存。

根据策划案生成配音并测量时长，再确定镜头帧区间。同一个导演专门生成画面，通过多轮工具调用自由编写 JSX、预览和修复。全片连续帧及切镜前后画面的视觉预检通过后，绑定最终榜并渲染，执行完整音视频解码，再交由人工观看和试听。

命令、返修、恢复会话及产物说明统一见 [当前制作流程](video-production-workflow.md)。使用 video:produce 完整制作；有效配音的画面返修使用 --reuse-audio。生产仅支持当前 scoped-production-package，失效计划重新生成，不恢复旧生成流程。

## 故障处理与验证

失败时保留当前阶段的诊断、源码和视觉证据，修复后继续同一计划。会话恢复需确认策划、配音、时间轴和素材索引摘要一致。合同或方案变化会使旧状态失效，不能更改历史批准记录来绕过检查。

开发验证运行 `pnpm test` 和 `pnpm video:remotion:check`。正式视频还需要实际视觉预检通过、完整音视频解码和人工完整观看、试听。仅准备预检证据不代表已检查画面；动效种类或数量不构成通过条件。
