# 现行视频制作流程

本文件是唯一的完整操作顺序。README、operations 和旧 editorial-workflow 页面只指向这里。
镜头设计细节见 [visual-agent.md](visual-agent.md)，插件接入见 [remotion-integration.md](remotion-integration.md)。

## 选题与研究

周报候选经人工确认，`selection.json` 状态为 `approved`，先执行研究，再将制作项目加入 `videoProjects`。
研究读取官方 README、核对功能事实和素材许可，交付 `research.json`、事实索引、素材与具体动画方案。
实际运行目标仓库仍须显式 `--allow-run`。实际测试记录和素材制作是独立事项；不用为了选用某种画面执行项目。

解释动画、仓库图片/视频、观察到的运行结果均可作为视频素材。按与旁白的相关性、清楚程度和画面表现选择，
不要求 `truthMode`，不以研究运行状态限制素材。来源路径、许可证和功能事实映射仍保留；动画不会改写实际测试记录。
历史 JSON 中的 `truthMode` 仅兼容读取，不参与素材选择或验收。

## 整片生产入口

```powershell
pnpm video:remotion:check
pnpm video:produce -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/repository
```

`video:produce` 需要已批准选择和完成的研究，按以下顺序执行：

1. 检查编辑计划；缺失或失效时调用编辑 agent，写连续旁白、章节与视觉 beat。
2. `prepare` 做配音预检、生成音频，并按实测配音块时长安排字幕和 beat 帧数。无需对每个视觉变化单独配音。
3. 更新最终榜，绑定批准选择、研究、编辑计划和生产分镜。
4. 视觉 agent 读取 beat、材料、镜头目录、画面反馈及 Remotion 插件参考，逐拍提出表达动作和实现。
5. 模板满足全部动作和输入条件时复用；否则组合现有原语；仍无法表达时生成实际 JSX 专用镜头。
6. 检查参数、引用、导入与动画时间，打包求值；默认 agent 路径最多三次尝试修复设计/编译问题。
7. 再次同步最终榜，渲染全部帧与音轨，完成完整解码并交付 `final.mp4` 和技术报告。
8. 人工完整观看、试听，决定批准、返修及发布。技术通过不代表表现力通过。

生成音频前遵循音频预检 Skill；Qwen 连接与音色设置见 [qwen-tts.md](qwen-tts.md)。
镜头源代码与 Remotion 参考摘要保存在项目资源目录。生成镜头仍遵循共享字幕与画面安全区。

## 画面返修

在项目 `resources/visual-feedback.md` 写具体意见，然后运行：

```powershell
pnpm video:produce -- --selection PATH --repo owner/repository --reuse-audio
```

该路径跳过编辑和配音准备，复用仍有效的 WAV、字幕、场景时长和 beat 时间，重新设计、编译并渲染镜头。
它不能跳过摘要或批准检查。修改文案时使用 `editorial-feedback.md`，再运行正常生产入口；涉及内容或时间变化时
不能使用复用音频路径。旧 `video:revisualize --canvas-overrides` 命令和直接修改分镜再跳过镜头编译的流程已移除。

## 独立阶段和调试

`video:plan --dry-run` 可以查看编辑提示词。需要先人工读编辑计划时可单独运行 `video:plan`，然后继续 `video:produce`。
`video:prepare`、`scout:final`、`video:shots` 和 `video:render` 保留为分阶段调试入口，不构成另一套生产流程。
分阶段顺序为 plan → prepare → final → shots → final → render。正式 render 要求已经生成 visualProgram。

`--auto-shots` 使用确定性组合，适合回归验证，不表示 agent 重新设计了画面。
`video:shots --requests PATH` 只接收镜头请求，仍经过同一选型、编译和绑定。
`video:studio --final-ranking PATH --repo owner/name` 打开对应项目的动态镜头入口；以 `--no-open` 启动并输出 URL。

任何阶段失败均保留诊断并返回失败状态；目前尚无整片自动视觉质量评审或自动发布。

## 产物与维护

项目根目录 `output/videos/YYYY年MM月第N周-owner--repository/` 保存 `final.mp4`，其 `resources/` 保存研究、
编辑计划、生产音频、字幕、分镜、镜头代码及 QA。人工观看用联系表和抽帧保留，AI 不将这些图片当作画面验收。

改变研究、制作合同、编辑 Skill 或人工反馈后，原有摘要绑定会失效；不要直接改写历史摘要冒充重新批准。
新镜头先留在项目内，经过参数化、另一项目验证和人工质量评审后再进入公共目录。
实际事实研究、许可证、配音规范、项目批准、解码和人工发布规则继续生效。
