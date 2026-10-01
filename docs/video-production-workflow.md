# 当前制作流程

1. 周榜选择批准项目；制作使用当前有效的统一策划案。
2. 研究 Agent 核实本片需要的事实，写连续旁白、语义单元和完整分镜，选择风格并准备实际图片/SVG/媒体。先提出表达需求，通过关键词、概念扩展和多表达查询检索组件描述。按描述选首选组件；有必要才读代码、看演示或试用。无需逐个看全库，也不再有强制查看所选演示后重新输出整份策划包的轮次。
3. 交付唯一 editorial-plan.json 与使用材料。designContext 只保存共享设计和连续关系，具体构图与组件是实现建议；查看过程、未选候选、评语和来源归档不进入导演材料。
4. video:prepare 生成配音、测量 WAV 时长和准备时间轴。字幕线索是块内加权估计，不宣称词级对齐。只修画面时复用音频。
5. 同一导演读取总 Skill 的共通原则与导演部分、去重后的选定风格、故事概览和共享设计。完整策划案保存在文件中可按需读取。逐镜任务只提供当前目的、相关字幕与实测帧区间、必要衔接状态；director-state.json 记录实际源码、组件及实现说明。多轮会话与工具历史仍存在，本文不声称已实现无限上下文自动压缩。
6. 导演自由编写 JSX，可替换或组合库组件，或使用专用实现。记录实际 libraryIds；编译器验证真实可用性、源码使用、时间和语义一致性，不要求使用策划的首选组件。改变故事、旁白、事实或整体风格须显式返回策划。
7. 局部预览与最终编译使用相同的基础、扩展和项目可用组件。导演查看实际画面，技术检查通过后执行连续帧与接缝视觉预检，发现问题反馈同一导演修复。修复同步实际组件记录与续跑状态。当前预检仍是全片复检，影响范围复检尚未实现。
8. 当前程序视觉预检通过后允许最终渲染，再做完整音画解码。人工观看试听决定最终批准，发布需另行授权。代码或输入改变会使旧报告失效。

## 检索与材料

每个组件提供一段 description：画面特点、运动、适用场景、组合方式及必要边界。检索返回 id、描述与检索分值/命中通道；这些是相关性信息，不是质量评语。代码、实际演示和接口说明通过 show 按需定位。当前使用本地 BM25 关键词、可扩展的概念同义表达及多查询排名融合，没有向量模型或外部 embedding 服务。

```powershell
pnpm video:library search --query "信息进入存储，并行汇集结果" --repo owner/name
pnpm video:library search --queries visual-needs.json --repo owner/name --limit 5
pnpm video:library show --id flow-packet --repo owner/name
pnpm video:library demo --id flow-packet
pnpm video:library add --request material.json
pnpm video:plan --selection PATH --repo owner/name
pnpm video:produce --selection PATH --repo owner/name
pnpm video:produce --selection PATH --repo owner/name --reuse-audio
pnpm video:direct --selection PATH --repo owner/name --resume-run resources/shots/runs/RUN
```

visual-needs.json 是表达需求字符串数组，仅为检索输入，未用候选不交付。新增组件需 description、可运行 module、实际 demo、example 和 supports。无评审结论或许可证；来源和通知另存在 integrations/motion-sources。

总规范只来自 .agents/skills/video-production-quality/SKILL.md，按阶段抽取，完整文件摘要仍绑定策划案。规范变化后旧计划明确失效，应重新策划；旧成片保留为历史产物，不写成新流程的批准。只有输入摘要均一致时续跑才复用镜头。
