# floating-glossy-label-pills

四块浅灰 dashboard wireframe 面板各顶一枚高光胶囊标签横向排队，轨道三拍向右换位（缓起→中段冲→缓收，首拍更慢带长尾），居中者放大清晰、两侧缩到 0.62 并下沉变淡微模糊形成走廊感，末段黑色描白边光标从右上斜滑到末位胶囊右端静止

适用：多功能横向枚举（Feature A–D 各一屏）；产品概览、功能巡览类段落，也可作落地页 hero 的循环底

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、120 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_floating_glossy_label_pills} from './motion-library.jsx';
<Sequence durationInFrames={120}>
  <Material_shotcraft_template_floating_glossy_label_pills />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "M8 116 C 40 112, 56 62, 84 64 S 128 120, 152 116 S 196 50, 224 56 L224 134 L8 134 Z"
- "M8 116 C 40 112, 56 62, 84 64 S 128 120, 152 116 S 196 50, 224 56"
- "Feature A"
- "Feature B"
- "Feature C"
- "Feature D"
- "4px 13px"
- "4px solid transparent"
- "14px solid transparent"

已适配的非通用文案：
未发现需替换的非通用文字

可覆盖常量：ACCENT、ACCENT_LIGHT、ACCENT_DEEP、A_RGB、AL_RGB、AD_RGB、F、CW、CH、CS、W、H、SP、PANEL_TOP、TITLE、TEXT、FAINT、LINE、GROUPS、FOGS、BEATS。

可播放演示：同目录 demo.mp4。
