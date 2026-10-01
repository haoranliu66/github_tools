# 当前制作流程

本页是生产入口的流程说明；总规范是 `.agents/skills/video-production-quality/SKILL.md`。

1. 在周榜选择文件中批准研究项目和视频项目。
2. 研究 Agent 只围绕本片主线核实必要事实，完成连续旁白、语义单元、分镜设计、选定风格、动效组件和实际需要的图片/SVG/媒体。素材可来自所选 README 媒体、已保存的本地录屏/图片或生成的 SVG，按表达价值选用。查看所选组件的运行代码、演示和用法，按表达需要选择复用、组合或专用 JSX，提供后续实现所需的设计。交付 `editorial-plan.json` 和它引用的素材，不输出无关功能、未选候选、研究报告或模板评语。
3. `video:prepare` 根据该案生成配音、测量 WAV 时长并准备素材。语义单元只帮助配音组织，不是硬编码的大模板。字幕位置是块内加权估计，不宣称精确词级对齐。
4. 同一个导演读取总规范、选定风格和完整策划案，依次实现镜头文件。根据实测音频确定帧区间，按需读取选中组件代码、效果演示或 Remotion 插件参考。可以多次查看、试做和修复；导演专门实现画面，不重新写旁白或替换叙事。
5. 每镜头可以运行 `shot-preview.mjs`，查看实际预览。编译器检查时间轴、引用和资源。全片视觉预检渲染预览，查看连续帧和各接缝前后帧，结合完整分镜设计检查表达、可读性、标记、状态变化、连续性和节奏。发现问题时将时间、证据和修复要求反馈给同一导演，修改相关文件并重新编译与预检。
6. 只有当前程序绑定的视觉预检通过后，才发布 `visual-ready` 策划案并允许最终渲染。缺审查、失败、未解决问题、旧报告、外部视频诊断均不能替代当前程序批准。最终 QA 完整解码音画；成片交由人工完整观看、试听。发布由人工决定。

单一策划案贯穿研究、音频和导演阶段；它包含固定的故事与设计，可通过多轮工具调用实现。需要改变旁白、功能主张、主线或风格时，应显式返回策划阶段。画面修复复用原音频。

## 命令

```powershell
pnpm research -- --repo owner/name --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json
pnpm video:plan -- --selection PATH --repo owner/name
pnpm video:produce -- --selection PATH --repo owner/name
pnpm video:prepare -- --selection PATH --repo owner/name
pnpm video:direct -- --selection PATH --repo owner/name
pnpm video:produce -- --selection PATH --repo owner/name --reuse-audio
pnpm video:library list
pnpm video:library demo -- --id flow-packet
pnpm video:preflight -- --storyboard PATH --resources DIRECTORY --prepare-only
```

`research` 和 `video:plan` 运行当前研究策划阶段；画面生成使用 `video:direct`，完整制作使用 `video:produce`。生产只接受 `scoped-production-package`；失效计划须重新策划。`video:direct --request FILE` 可接受人工/外部镜头实现，但仍须绑定原案镜头、旁白、时间和组件，并经过真实视觉预检。`--dry-run` 保存提示词，不发起模型生成；研究的预检仍获取当前固定版本的来源。

## 素材与上下文

`config/motion-library.json` 提供导出代码位置、实际演示、用法、适用表达和依赖。`assets/motion-library/ID/demo.mp4` 是可播放演示；`MaterialDemo.jsx` 提供可运行示例。素材库没有评审结论或许可证。上游代码、来源及必要通知独立保存在 `integrations/motion-sources`；研究来源归档在项目 `_provenance`。这些归档不加入导演提示词。

`config/style-library.json` 控制色彩、字体、几何、构图、插画习惯、运动节奏、转场与字幕。风格一致性由实际画面检查，不通过匹配字段数量判定。自由 JSX 保留，没有固定对象、动作、布局或动效配额。

`docs/production-reference-index.json` 是按需索引，指向素材代码/演示/用法及已安装 Remotion 插件的本地参考。默认提示词只加载总 Skill、选定风格、统一策划案和当前任务。目录、整个 README、全量研究及全部技术参考不会自动拼接。

整理完成的专用素材，可以用 `video:library add --request FILE` 添加。请求包含 id、module、实际 demo、example 和 supports，可附 dependencies/reuseScope。评审意见属于制作记录，不存入素材库。

## 保留产物与验证边界

导演源码和会话在 `resources/shots/runs`，编译包在 `resources/shots/DIGEST`。音频、字幕、时间轴在 `resources/production`。技术帧在 `production/qa/runtime`；预览、连续截图、接缝、审查和修复证据在 `production/visual-preflight`。未看画面不能写通过，修改代码或材料会使旧报告失效。

视觉预检是实际采样画面的审查，不能保证采样间每一帧、配音听感和精确词级同步。最终人工观看、试听仍然需要。动效种类、数量、比例或覆盖率不作为视觉质量验收门槛。

导演中断后可使用 `video:direct --selection PATH --repo owner/name --resume-run resources/shots/runs/RUN` 继续同一会话。只有策划、配音、时间轴和素材索引摘要均未改变时才复用已完成镜头；改变输入时重新实现。
