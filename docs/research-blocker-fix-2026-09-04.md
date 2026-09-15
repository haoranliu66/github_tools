# 研究进程阻断：根因与修复验证

- 日期：2026-09-04（Asia/Shanghai）
- 项目：`D:\zimeiti`
- 本机验证版本：Codex CLI `0.153.0-alpha.5`，Windows 11。
- 范围：只读研究；不执行仓库代码，不更改持久用户配置，不关闭沙箱。

## 根因

研究入口为了隔离用户配置和仓库规则，传入了 `--ignore-user-config` 和 `--ignore-rules`。但本机原生 Windows 沙箱设置 `windows.sandbox = "elevated"` 也来自用户配置，被一起忽略。入口只指定 `--sandbox read-only`，没有显式指定原生 Windows 沙箱后端。

在本次 CLI/Windows 环境中，这一配置缺失导致只读命令在执行策略层被拒绝。不是登录失败，也不是目标文件不存在。`read-only` 是访问边界，`windows.sandbox` 是 Windows 原生沙箱实现的选择，不能相互替代。

## 单变量对照证据

两组均使用相同版本、模型、测试仓库、提示、`--ignore-user-config`、`--ignore-rules`、`read-only` 和非交互执行。命令均为：

```powershell
Get-Content -LiteralPath README.md -TotalCount 1
```

| 检查 | 结果 |
|---|---|
| 直接使用已配置的 Windows 只读沙箱，不调用模型 | 返回 `# Tiny Notes`，命令退出码 0 |
| 原研究启动参数 | `CreateProcess ... rejected: blocked by policy`，命令没有启动 |
| 仅增加 `-c 'windows.sandbox="elevated"'` | `command_execution` 完成，`aggregated_output` 为 `# Tiny Notes\r\n`，命令退出码 0 |

两组策略日志均显示规则文件数为 0，说明无需恢复加载不受信任的仓库规则就能解决问题。原参数下 Codex 自身仍会返回 0，因此必须区分 CLI 成功结束和研究成功。

原参数诊断约 139.7 秒；修正参数诊断约 134.3 秒。两组都先出现 WebSocket 重连，再回退 HTTPS。这是独立的网络延迟问题，不是本地文件读取拒绝的原因。自带诊断确认登录可用、HTTP 可达、原生沙箱已完成安装；WebSocket 连接被远端重置。本次未修改网络、代理或防火墙配置。

## 实施的修复

1. Windows 下显式传入 `windows.sandbox="elevated"`，继续保留默认 `read-only`、隔离用户配置和仓库规则。
2. 提取启动参数构造，增加 Windows、非 Windows、显式运行授权三组回归测试。
3. 研究输出增加 `status`、`blockedReason`、`inspectedFiles`。只有声明完成、固定完整 commit SHA、列出已读文件并提供至少一条已读文件证据，才生成脚本和分镜。受阻或失败结果抛错，由 CLI 返回非零退出码。
4. 本地模式使用 `local:owner/name` 标识，提示明确不搜索同名远程仓库。
5. 调用输出、错误和运行元数据保存在 `output/research/_runs/`，便于追溯。日志可能含仓库内容，不应公开提交。
6. 明确区分必要读取失败和可选元数据警告；禁止模型尝试修补用户 Git 配置或使用 `core.excludesFile=NUL`。已读源码和 HEAD 有效时，普通警告应披露为限制，不应清空有效研究。

完成状态和证据门槛用于拒绝空研究、受阻报告，不是对所有事实真实性的自动证明；仍需人工审核。

## 自动化测试

- 新增完成状态和证据门槛测试：修改前 8 项预期失败，修改后通过。
- 新增启动参数测试：修改前 2 项 Windows 用例失败，修复后通过。
- 部署后运行 `pnpm test`：35/35 通过，0 跳过。
- 没有修改已有总 Stars 评分逻辑。

## 完整研究验收

执行命令：

```powershell
cd D:\zimeiti
pnpm research -- fixture/tiny-notes-repaired --local 'C:\Users\64539\Documents\ChatGPT\自媒体\repo-researcher-fixture-20260903'
```

最终真实调用退出码 0，耗时约 211.7 秒；日志确认 `approval: never`、`sandbox: read-only`。没有使用 `--allow-run`。

| 验收项 | 结果 |
|---|---|
| 研究状态 | `completed`，`blockedReason` 为空 |
| 实际读取 | README、架构文档、LICENSE、CHANGELOG、package.json、主源码，共 6 个文件 |
| 固定提交 | `248f5ed318a8b32805675f294f39a6627edef653`，与独立 `git rev-parse HEAD` 结果一致 |
| 事实证据 | 4 条 claims；5 处仓库文件引用检查了文件名和行号范围，Git 元数据引用与执行日志核对 |
| 产物 | 7/7 存在且非空；claims.json 与 research.json 中的 claims 一致 |
| Schema | Ajv 8.20.0 Draft 2020-12 校验通过 |
| 分镜 | video-factory 校验通过，5 个场景、1,500 帧；本次未渲染 |
| 演示 | 4 个步骤全部 `not-run`，未执行项目代码 |

模型准确披露了 README 的已有未提交修改，以及 Git 全局 ignore 文件访问警告和换行警告，没有读取被拒的用户配置文件。报告中的 README 引用对应工作区内容，不将其冒充为完全一致的 HEAD 快照。它还将 CLI 入口的 Windows 路径兼容性问题标为静态推断、待运行验证，而非伪造测试结论。

第一次完整验收中，文件读取已经恢复，但模型尝试了无效的 `core.excludesFile=NUL` 参数，主动返回 `blocked`。新门槛使主 CLI 返回 1，没有生成脚本、分镜等产物；执行日志保留在 `_runs/2026-09-04T10-08-05-744Z-17680/`。收紧可选警告处理指引后，第二次完整验收通过。

最终证据：

- [研究简报](../output/research/2026-09-04/fixture--tiny-notes-repaired/research_brief.md)
- [研究 JSON](../output/research/2026-09-04/fixture--tiny-notes-repaired/research.json)
- [事实与证据](../output/research/2026-09-04/fixture--tiny-notes-repaired/claims.json)
- [运行元数据](../output/research/_runs/2026-09-04T10-12-09-262Z-20364/run.json)
- [原始执行日志](../output/research/_runs/2026-09-04T10-12-09-262Z-20364/codex.stderr.log)

本次验收覆盖本地仓库的真实 Codex 静态研究，不等于真实 GitHub 克隆分支、项目运行分支或成片生产全部验收完成。旧失败产物和历史验证报告保留，未覆盖或自动删除。

## 官方说明

- [Windows sandbox](https://learn.chatgpt.com/docs/windows/windows-sandbox)：原生 Windows 沙箱模式和配置。
- [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)：审批策略与沙箱访问边界。

上面官方资料用于解释配置含义；本机根因结论依据实际单变量对照，不将本次结果泛化到所有 CLI 版本。
