# 首条真实项目视频联调结果

> 2026-09-15 更新：同一路径的最终成片已按新的 A-roll/B-roll 编排重新制作。当前成片为 25 个场景、3844 帧、约 128.2 秒；下文的 9 场景、3164 帧与 105.49 秒数据仅记录 2026-09-04 的首次联调切片。当前发布说明见 `output/video/001-archify/publish-notes.md`。

日期：2026-09-04。项目目录：`D:\zimeiti`。

## 结论

首条真实项目视频已生成并完成技术检查：**《Archify：让架构图有据可查》**。本期采用主助手直接源码审阅补位，**不将整条链路报告为无人值守全自动通过**：独立 Codex 研究子进程仍因 Windows 沙箱初始化助手取消（1223）阻断，待用户授权后重试。

成片：`D:\zimeiti\output\video\001-archify\archify-001-final.mp4`

## 三模块结果

| 环节 | 结果 | 本次证据 |
|---|---|---|
| trend-scout 实时采集与榜单 | 通过 | 通过系统既有本地代理，实际采集 20 个公开项目，写入 2026-09-04 快照与 20 项候选榜 |
| repo-researcher 克隆 | 通过 | 成功浅克隆 tt-a1i/archify；固定 HEAD 为 06dd052602dd9a369e4d034e24faef0917b5a60c |
| repo-researcher 独立 Codex 静态研究 | 阻断 | ShellExecuteExW 启动沙箱 setup helper 返回 1223；子进程输出 blocked，发布门禁退出 1，没有写入伪成功研究包 |
| 研究模块产物生成与校验 | 直接审阅补位通过 | 主助手读取源码，整理 7 条事实、6 个文本证据文件；Ajv schema 与证据行号检查通过；使用原 writeResearchArtifacts 生成 7 件套，额外 provenance 明示来源 |
| video-factory | 通过 | 22 句本地中文 TTS → 按实测 WAV 长度构建 9 个分镜和字幕 → Remotion → FFmpeg → MP4 |
| 回归测试 | 通过 | 仅运行 zimeiti/test：43/43，0 失败、0 跳过 |

选题来自真实仓库 [tt-a1i/archify](https://github.com/tt-a1i/archify)。本次榜单 rank=1、stars=46987、score=93.65、totalStarsWeight=0.15。数据是采集时刻的快照，不是恒定实时值；增长信号仍为 `github-trending-cold-start`，不能当成本地连续七日净增。

## 本轮发现与处理

### 1. GitHub 网络连接

Git 直连报 `RPC failed; curl 28 Recv failure: Connection was reset`；采集初次报 `fetch failed`。读取系统现有代理后，以该代理执行 `git ls-remote` 成功；Node API 与 Trending 请求均返回 200。

本轮仅对子进程设置 `HTTP_PROXY`、`HTTPS_PROXY` 和采集所需 `NODE_USE_ENV_PROXY=1`，没有更改全局 Git、系统代理或凭据。未新增 API 密钥。

### 2. 独立研究仍未完成

阻断日志：`output/research/_runs/2026-09-04T10-45-33-143Z-8476/`。

准确错误：`orchestrator_helper_launch_canceled: ShellExecuteExW failed to launch setup helper: 1223`。它发生在必要的本地命令启动前，与 GitHub 克隆成功是不同层的问题。本轮没有降低只读沙箱、修改全局安全设置或把 blocked 改为 completed。已向用户发起是否重试及允许 Windows 沙箱初始化的询问，未获得新授权时不重试。

补位研究目录：`output/research/direct-review/2026-09-04/tt-a1i--archify/`。其中 `provenance.json` 明确标注 `primary-assistant-direct-source-review` 与 `automaticResearchStatus: blocked`。

### 3. 重要：测试发现范围误执行事件

原根脚本为 `node --test`。克隆真实仓库后，该命令递归发现并误执行了 `workspaces/repos/tt-a1i--archify` 的部分测试，包含渲染相关测试。用户并未传入 `--allow-run`，这是本轮不应发生的执行，不能归类为正常授权的项目实测。

发现后立即中断运行；后续进程检查未发现残留的 archify 测试进程，仓库所有者身份下 `git status --short` 未显示改动。该检查不等同于对临时目录和所有外部副作用的完整安全审计。

已修复为 `node scripts/run-project-tests.mjs`，仅枚举项目根目录下 `test/*.test.mjs` 的普通文件，不递归遍历克隆仓库。回归测试在临时目录放置模拟克隆测试文件，证明它不会进入发现结果。先确认测试失败，再实现并确认通过。

视频不使用误执行测试的输出作为功能证据；表述为“功能结论基于源码，未做端到端演示”。

### 4. 音频拼接路径

旧版 Windows FFmpeg 使用绝对 concat 列表路径时无法定位相对 WAV。相同列表在音频目录中用 basename 读取可通过。实现 `concatPcmWav` 固定 cwd 为列表所在目录，并保留相对安全路径。真实 FFmpeg 回归测试使用带空格的临时目录，验证两段 0.25 秒音频拼为 0.5 秒。

### 5. 带媒体模板首次渲染 404

素材被暂存到 `apps/video-factory/public`，原 Remotion 命令未传 `--public-dir`，因此旁白与图片 URL 404。现由 `buildRenderArgs` 显式传入同一个 PUBLIC_ROOT，配套回归测试与真实有声视频渲染通过。

### 6. 全片进度条

抽帧检查发现分镜内部的 durationInFrames 会使全片进度条提前走完。改为父级累计的全片总帧数；修订版 9 张抽帧显示进度连续，3 秒时进度约 2.9%。

## 新增能力与文件

- `apps/video-factory/remotion/EditorialVideo.jsx`：源码解说模板、官方媒体来源标签、逐句字幕、章节和全片进度。
- `apps/video-factory/src/narration.mjs`：从 PCM WAV 实测时长生成逐帧时间轴、SRT 与音频拼接。
- `scripts/synthesize-narration.ps1`：本地 Windows 中文语音，不调用外部 TTS 服务。
- `scripts/prepare-episode.mjs`：审校后的分镜草稿 → 旁白 WAV、字幕、渲染 JSON、计时记录；已有 storyboard 的输出目录会拒绝覆盖。
- `scripts/run-project-tests.mjs`：只运行本项目测试。
- `episodes/001-archify/`：可编辑分镜、直接审阅研究源、简介和证据。

GitNexus 探索技能确认本项目未索引后，本轮直接阅读源码；systematic-debugging 技能要求先定位实际错误，再通过回归测试和完整成片复验确认修复。没有安装 archify 技能或采用其仓库指令作为本任务指令。

## 最终成片技术检查

| 项目 | 实测结果 |
|---|---|
| 容器时长 | 105.49 秒（包含 AAC 封装边界） |
| 画面 | 1920×1080，16:9，30 fps，H.264 High，yuv420p |
| 视频帧数 | 3164 帧，对应画面时长 105.466667 秒 |
| 音频 | AAC LC，48 kHz，双声道，中文合成旁白 |
| 旁白原始时间轴 | 105.466667 秒，与分镜帧数计算值差为 0 |
| 字幕 | 22 条，已烧录；另有 UTF-8 SRT。cue 在分镜边界内且不重叠 |
| 成片响度 | -16.58 LUFS；真峰值 -1.48 dBTP；LRA 3.30 LU |
| 全片解码 | FFmpeg video+audio 解码完成，exit 0，3164 帧，无解码错误 |
| 画面检查 | 最终 9 分镜抽帧及 1080p 封面已目视检查，未发现文案重叠或截断；官方图局部放大已标注 |
| 音频检查范围 | 技术解码、存在性、长度、响度和峰值检查；未宣称人工完整试听 |
| 文件大小 | 10,893,625 bytes，约 10.39 MiB |
| SHA-256 | 122b4a3e0ce498f14684bd2783202b5a12730a3a87a76a0a560af5ea52e12ec8 |

最终检查图：`output/video/001-archify/qa/contact-sheet-final.png`。

## 交付与边界

同目录包含：`archify-001-final.mp4`、`cover.png`、`subtitles.srt`、`storyboard.json`、`narration.wav`、`publish-notes.md`、`media_manifest.json`、`trend-snapshot.json`、`assets/`、`licenses/` 和 `qa/`。最终分镜的图片与旁白均指向本目录现存文件，不依赖在线素材。首版和 picturelock 文件保留用于本次审校追溯，最终交付只以 `-final.mp4` 为准。

本片是**真实项目的源码知识解说**，不是产品端到端实测，也尚未发布到平台。后续恢复无人值守研究需完成 Windows 沙箱初始化；真正运行项目仍需用户明确的 `--allow-run` 授权。本期没有创建定时自动化、安装项目依赖或新增云服务账户。
