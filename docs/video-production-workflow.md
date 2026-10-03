# 视频制作流程

本文件是唯一现行制作流程，仅接受 scoped-production-package；总规范位于 .agents/skills/video-production-quality/SKILL.md。研究策划、材料查看、导演统筹和视觉预检由当前聊天主 Agent 完成，宿主负责准备任务、文件校验、音频与画面处理、状态和渲染。宿主不另开研究或短片导演模型会话。

1. 批准本片项目，人工指定 --style STYLE_ID；主 Agent 读取总规范共通原则和研究交付章节，以及所选风格的本地文字卡。整集、场景、旁白块不设时长上下限。现有一分钟建议适用于知识分享形式，其他类型不受此建议限制。不要研究或输出示意说明、项目边界或不适合的描述，不虚构项目已实际执行。
2. 通过 --content-skill NAME 选择 .agents/skills/content-choose/NAME/SKILL.md，通过 --form NAME 选择形式；不选择时 contentRoute.skill/form 均为 null。主 Agent 首次读取所选内容 Skill 的统一正文及所选形式，全流程沿用，不按研究、导演或预检拆分，也不重复注入正文，不预载其他类型。只有选用 github-project-sharing 时填写 sharing，其他类型省略该字段。内容形式独立于平台、画幅和120秒导演模式。
3. 主 Agent 研究本片使用的官方事实，编写完整连续旁白、语义单元、全片分镜和共享设计。按人工风格检索组件描述，选择并准备实际使用的源码、依赖、用法、演示及图片/SVG/媒体；缺少合适素材可生成独立动效材料。宿主准备选中素材的实际查看证据；主 Agent 查看、必要替换并完成配音前自检。宿主校验通过后才交付唯一 editorial-plan.json。导演所用材料均通过策划案本地链接交付，不注入素材源码、编码数据或整套用法；不输出未用候选和评语。
4. 主 Agent 将配音任务交给子代理。子代理读取总规范配音章节、audio-narration-preflight/SKILL.md 和其 qwen-tts.md，执行 video:prepare，返回结果路径。策划每个完整语义单元成为独立旁白块；仅1000字符服务限制或超时触发技术拆分，保留同一 semanticBlockId。沿用实测 WAV 和加权字幕分配。主 Agent 验证文件、来源和实测时长后进入导演。
5. 主 Agent 读取总规范导演章节、video-editorial-agent 对应模式并沿用已读的统一内容要求。小于120秒：一个整体任务生成全片 layout、共享模块与全部初版自由 JSX，可多文件。达到120秒：主 Agent 先维护全片布局、共享设计代码与进入/结束状态，再交给镜头子代理实施各自文件，随后集成。每个语义块通常安排 2–3 个场景作为创作建议，实际视觉场景可少可多，可跨语义音频边界，用 planShotIds 保留表达目的及完整音频覆盖；不按场景、组件或动效数量验收。
6. 宿主编译、渲染连续画面采样及每个接缝的相邻帧，主 Agent 沿用所选内容的统一要求检查内容理解、结果可见、可读性、节奏及连续性。同一主 Agent 必须实际查看画面；blocking/major 保存时间、证据与修复目标，由主 Agent 修复后复检。minor 可通过、不修复、不保存具体问题或建议，也不保留对应的查看证据、范围、观察或通过记录。仅 blocking/major 保留诊断；成功查看后的临时图像、预览与审查任务/响应删除，只保留全片制作继续执行所需的最小状态。修复同步同一策划、状态及受影响源码；复用有效配音和字幕。需改旁白或故事时返回策划。
7. 预检通过后，主 Agent 调用宿主最终渲染并验证完整音画解码，交付视频及技术信息。人工全片观看和试听决定最终批准；发布需单独授权。

## 任务交接与命令

video:plan 和 video:direct 默认准备待主 Agent 完成的任务，返回 awaiting-main-agent、taskPath 和本轮输出格式。主 Agent 读取任务及链接、完成所需文件，将 {taskId,value} 写为本地响应，通过相应阶段的 --task-response FILE 交回。视觉预检响应写入任务给出的 responsePath，主 Agent 实际查看后返回结论，宿主消费后清理临时审查材料。响应与项目、风格、材料、音频及当前任务绑定；资料变化须重新准备，不通过改一个状态跳过实际查看。研究首次准备后恢复同一来源快照与材料查看进度；--fresh 明确开始新研究。导演恢复同一运行目录，技术或视觉修复继续交给主 Agent，不另开导演模型会话。

~~~powershell
pnpm video:plan -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/name --style editorial-paper --content-skill github-project-sharing --form single-short
pnpm video:plan -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/name --task-response PATH
pnpm video:prepare -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/name
pnpm video:direct -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/name
pnpm video:direct -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/name --task-response PATH
pnpm video:produce -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/name --style editorial-paper --content-skill github-project-sharing --form single-short
~~~

video:produce 推进已完成阶段，遇到研究、配音、导演或主 Agent 视觉预检待办即返回对应 Agent 任务，不把待办当作完成。配音待办指定 audio-subagent 和确切命令；主 Agent 分发后验证实测文件再推进。已有效的音频直接复用。材料与主 Agent 响应校验失败会保留具体错误及待办，不自动回退旧流程。

新增内容 Skill 在 content-choose/NAME/SKILL.md 中提供统一内容要求，不要求任何制作阶段章节；有形式时提供“形式：FORM”章节。所选内容必须能加载，其专属字段只在使用对应 Skill 时接通。人工可用 video:library search --type style 检索文字描述，style --id 读取单项文字卡；研究只接受人工确认的 ID，沿用策划本地 style.json 链接交付。
