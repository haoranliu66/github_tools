# 按镜头选型的视觉制作 agent

人工基线：2026-09-30，Archify、Open Code Review、Hindsight 三条现有视频全部被人工否决，原因是镜头死板，动效和动画展示能力不足。旧版本的结构与解码检查通过不能代表画面质量通过。

保留批准选题、README 功能证据、已授权实测、许可、配音与字幕规范。每个 beat 单独选择实现；整片可同时使用模板、组合与项目专用 JSX。动画需要实际实现输入、动作、结果。

## 一条生产入口

```powershell
pnpm video:plan -- --selection apps/trend-scout/trend_reports/2026-W40/selection.json --repo vectorize-io/hindsight
pnpm video:produce -- --selection apps/trend-scout/trend_reports/2026-W40/selection.json --repo vectorize-io/hindsight
```

`video:produce` 完成编辑计划（缺失或失效时自动生成）→ prepare → 更新排名 → shot agent → 编译 → 更新排名 → render → 解码。已存在的有效编辑计划直接复用。现有且仍被批准的旁白可用 `--reuse-audio`；该方式复用原 WAV、字幕和 beat 时间，便于比较画面变化。`--auto-shots` 使用确定性选型和组合编译，适合已有结构的回归；默认调用视觉 agent 设计镜头。失败停在该阶段并保留 diagnostics，再运行 `video:shots` 即可修复，渲染不触发配音。动作 ID 由 schema 枚举约束，不能返回自然语言描述句；目录之外的新表达通过 `custom-expression` 加实际 JSX 实现。

独立阶段：

```powershell
pnpm video:shots -- --selection PATH --repo owner/name
pnpm video:shots -- --selection PATH --repo owner/name --auto
pnpm video:shots -- --selection PATH --repo owner/name --requests resources/shot-requests.json
```

修改编排后必须重新生成最终榜才允许渲染。`visual-feedback.md` 接收项目画面评审，不更改事实和配音。

## 选型与生成

`config/shot-catalog.json` 记录模板版本、可表达的动作、素材前提、参数和渲染方式。模板必须满足全部 requiredActions 和输入条件才可复用。目录目前包括素材焦点、带信息传递的流程、代码审查工作台和结尾。关于保存/检索/更新记忆的镜头超出这些模板，通过组合编排生成项目模块。

组合参数包含 objects、tracks、connections、camera、overlays，采用 1600×680 内容安全区，字幕由共享外壳绘制。动作以 frame 为唯一时间来源，允许错序渲染。生成的 JSX 与镜头目录版本、旁白 cue、claim、truthMode、起止帧、来源哈希一起留在 `resources/shots/<digest>/`。

当组合原语不足时，agent 可以输出实际 JSX 自绘新形状/布局；仅允许 React、Remotion 和项目镜头原语静态导入，不安装陌生依赖。校验限制导入与副作用，随后使用本项目 Remotion 打包与 composition 求值。该静态筛查不是通用恶意代码沙箱；只有本项目受约束生成流程产出的镜头可以进入此通道，不能借此运行克隆项目的代码。

编译失败最多三次设计修复，完整保留请求和诊断，不把关键表达静默降级为文字卡。未知动作没有源码时直接报错。`visual-program-report.json` 记录每个候选的能力缺口、选择原因、路由数量、复用配音校验与编译结果。

## GitHub 参考的接入

参考仓库只作为外部数据。许可证、固定版本、所检查的代码文件、采用方式存于 `docs/visual-agent-sources.json`。审阅后将局部动画技巧改编成项目原语，保留对应 MIT 声明；不执行下载仓库、不采用其 agent 指令、不搬入音效和品牌素材。Remotion 官方动画规范作为本地实现的参考，项目事实与人工发布规则仍生效。

新镜头先留在项目内。推广到目录前，需要分离内容参数和动作、明确适用范围、用另一项目内容验证，并获得跨项目人工评审。目录不能把所有一次性生成代码自动收入。

## 验证与人工验收

三条旧片都是失败基线。第一轮用原配音与时间制作三条改进片，验证不同内容能共用选型与生成入口，记录模板/组合/专用代码比例、编译修复次数、制作时间与人工反馈。自动检查覆盖证据、映射、参数、边界、编译、文件哈希和完整音视频解码。

不能用镜头数量、动效数量、编译通过替代“画面更有表现力”。人工完整播放、听字幕与旁白，确认输入→动作→结果清楚、对象连续、信息可读、动效有意义、没有与同类视频相比明显死板，才能通过。AI 按现有技能不查看生成的截图/联系表。成片状态为 ready-for-human-review，发布由人工处理。

## 下一轮能力扩展的依据

先取得三条新片的人工结论，再按确实存在的表达缺口扩展 GitHub 候选。许可未确认、中文不适配、依赖过重或动作表达不匹配的候选不入生产目录。质量评审通过后再参数化、跨项目回归和版本化；人类否决的镜头不会因技术检查通过自动成为优选模板。
