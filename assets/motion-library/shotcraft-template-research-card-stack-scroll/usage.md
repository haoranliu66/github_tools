# research-card-stack-scroll

深色论文卡每 12 帧一张沿右下轴线飞入中心叠压，落位带 1 帧压缩，只有最上一张全清晰渲染标题+作者+摘要，下方卡按堆积深度递增模糊变暗只露标题条，背景横向 grid 同步下移做速度参照

适用："读了大量资料/处理了海量文档"的量级交代；研究类、检索类、批处理类产品的能力镜头

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、144 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_research_card_stack_scroll} from './motion-library.jsx';
<Sequence durationInFrames={144}>
  <Material_shotcraft_template_research_card_stack_scroll />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "Sparse Attention Mechanisms for Long-Context Reasoning"
- "Retrieval Drift in Multi-Hop Agent Pipelines"
- "On the Calibration of Preference Reward Models"
- "Grid-Aligned Motion Priors for UI Animation"
- "Cheap Verifiers Beat Expensive Samplers"
- "Structured Decoding Without Grammar Loss"
- "Depth-Ordered Compositing for Live Interfaces"
- "Token-Budget Routing in Agent Fleets"
- "Contrastive Layouts for Document Understanding"
- "Fast Approximate Re-Ranking at Query Time"
- "Signal Propagation in Deep Residual Agents"
- "A Note on Deterministic Replay of Motion"
- "100% 24px"

已适配的非通用文案：
- "Latent Caching Reduces Tool-Call Latency by 41%" → "Example Study: Tool-Call Latency Evaluation"

可覆盖常量：ORANGE、ORANGE_SOFT、INK、FONT、W、H、F、PER、GAP、XOFF、LW、LH、S、TITLES、CW、CH。

可播放演示：同目录 demo.mp4。
