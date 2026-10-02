# Video Shotcraft 全量接入档案

动效使用说明与全量目录已统一到 [动效库手册](../../../../../docs/motion-library.md#full-templates)。本目录保存来源核对与接入证据。

上游：[Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft/tree/5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab)，固定提交 5ddbf521038b0a7accfb6dc1e0a9eb29c67277ab。许可及修改记录见 [NOTICE](../NOTICE.md)。

| 档案 | 用途 |
|---|---|
| [source-review.json](source-review.json) | 来源、接入范围与替代处理 |
| [definitions.json](definitions.json) | 模板、时长、参数与文案替换记录 |
| [coverage.json](coverage.json) | 157 张镜头卡与 214 个画廊变体的覆盖关系 |
| [source-inventory.json](source-inventory.json) | 原始源文件摘要；originals 保留原始资料 |
| [asset-validation.json](asset-validation.json) | 本地截图尺寸与清单 |
| [technical-validation.json](technical-validation.json) | 逐模板渲染与全片解码结果 |
| [visual-inspection.json](visual-inspection.json) | 实际采样画面检查记录 |
| [integration-validation.json](integration-validation.json) | 本项目实际导入与输入替换验证 |
| [optional-audio-validation.json](optional-audio-validation.json) | 原音效实际项目渲染、字节摘要与静音验证 |
| [audio-upstream-attribution.md](audio-upstream-attribution.md) | 未改写的上游音效归属说明 |
| [optional-audio-project-test-results.txt](optional-audio-project-test-results.txt) | 音效接入后的项目测试 |
| [native-project-preview.mp4](native-project-preview.mp4) | 原生项目调用预览 |
| [project-test-results.txt](project-test-results.txt) | 接入时项目测试结果 |
| [project-rule-adaptations.json](project-rule-adaptations.json) | 项目规范适配记录 |

依据用户确认的上游素材可用性，完整片引用的 11 个原始 MP3 已入库为可选音效，恢复全部 32 个原始时点；完整成片模板默认静音。原始音效归属记录单独保留。agent-stream.jpg 已换成本地生成的中性截图，图片依赖保留。VerticalTicker 的外部来源链不完整，使用本地兼容实现，原始文件仅用于来源核对。

采样画面检查属于材料接入证据，具体影片仍需连续视觉检查与最终人工观看、试听。

旧 integration-validation.json 保留音效接入前的库摘要；本次配置摘要变更与源码不变证明见 optional-audio-validation.json。旧计划/批准不会自动刷新，具体影片按现行摘要门禁重新校验。
