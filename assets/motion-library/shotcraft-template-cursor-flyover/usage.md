# cursor-flyover

整页俯瞰淡入后，相机依次飞到四个角落 zoom-in 特写，SVG 光标同步跟到位指点并留下点击涟漪

适用：单页产品的功能巡览：一镜带观众看完四个功能区，光标当"导游手指"

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、180 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_cursor_flyover} from './motion-library.jsx';
<Sequence durationInFrames={180}>
  <Material_shotcraft_template_cursor_flyover />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "tx"
- "ty"
- "cx"
- "cy"
- "13px"
- "0 10px"
- "app.example.com/overview"
- "Overview"
- "Traffic"
- "Revenue"
- "Cohorts"
- "Alerts"
- "12.4k"
- "4.1s"
- "8px 0 0 8px"
- "METRIC "
- "M4 2 L4 19 L9 14.4 L12.2 21.5 L15.4 20 L12.2 13 L19 12.6 Z"

已适配的非通用文案：
未发现需替换的非通用文字

可覆盖常量：CAM、WIN、KEY、LINE_D。

可播放演示：同目录 demo.mp4。
