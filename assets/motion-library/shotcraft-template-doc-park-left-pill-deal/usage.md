# doc-park-left-pill-deal

文档不淡出而是向左滑出只露约 35% 宽并微缩到 0.92，右侧按旁白节奏慢速发牌三张白底描边药丸（outBack 弹入），每张落定后其下方字幕逐词加深、下一张到来前整句淡出，左侧文档全程极缓慢自动滚动保持"正在被读"

适用：旁白驱动的"分析结论逐条给出"段落；文档理解、推荐理由、审阅意见类产品的核心说明镜头

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、174 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_doc_park_left_pill_deal} from './motion-library.jsx';
<Sequence durationInFrames={174}>
  <Material_shotcraft_template_doc_park_left_pill_deal />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "0 0 auto"
- "leaf"
- "M3 13c0-6 5-10 10-10 0 6-4 10-10 10Z"
- "M3 13 13 3"
- "bowl"
- "M2 7h12c0 4-2.6 6-6 6S2 11 2 7Z"
- "M6 4.5V2M9.5 4.5V2"
- "M4.4 6.2h7.2M4.4 9.8h7.2"
- "em"
- "Quick Start"
- "Start matches their preference"
- "Bundle Plan"
- "Plan fits their weekday usage"
- "Starter Kit"
- "Kit is their top repeat item"
- "-120px 0 0 -220px"
- "0 14px"
- "-.01em"

已适配的非通用文案：
未发现需替换的非通用文字

可覆盖常量：SANS、BG、INK、TXT、DIM、LINE、SKEL、DW、DH、COLS、COL_W、DOC_COLS、ITEMS、PX、PY、PH、PG、T0。

可播放演示：同目录 demo.mp4。
