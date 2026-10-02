# orbit-ring-title-open

八张 16:9 内容卡按 45° 均布在 700×375 椭圆上匀速公转（卡身永不倾斜，纵深只由 sin θ 给出 ±9% 缩放与 z 序），环撑开期间卡内容冻结首帧、f24 之后八张一起开播；居中标题逐字解糊下沉落定，关键词到位那一刻黄色马克块自左横扫铺满，mono 副行随后浮出，末段整行失焦淡出、环继续转着交棒下一镜

适用：开场第一镜 = 「这个产品有一整套东西」；素材库/模板库/功能矩阵/案例集的门面拍；需要用真实运动的产品画面托住一句主张，而不是把截图摆成静态九宫格

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、130 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_orbit_ring_title_open} from './motion-library.jsx';
<Sequence durationInFrames={130}>
  <Material_shotcraft_template_orbit_ring_title_open />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "M8 118 L118 92 L228 104 L338 56 L448 68 L558 20 L632 34"
- "0.06em"
- "SESSIONS"
- "M40 380 C 200 380 190 210 340 200 C 500 190 500 90 700 70"
- "M80 380 L768 380"
- "M140 380 L200 90 L648 90 L708 380"
- "M280 90 L280 380"
- "M500 90 L500 380"
- "0.4em"
- "2026 · Q3"
- "-0.04em"
- "GO LIVE"
- "top left"
- "-0.05em"
- "0.06em -0.08em"
- "left center"
- "0.35em"

已适配的非通用文案：
- "让镜头卡替你想好每一个动效" → "让每一个想法清晰呈现"
- "VIDEO-SHOTCRAFT" → "YOUR PRODUCT"

可覆盖常量：RX、RY、CW、CH、N、ROT_SPEED、RING_IN、RING_SCALE_FROM、PLAY_START、DEPTH_SCALE、HEADLINE、H_SIZE、H_LEAD、H_TRAVEL、H_STAGGER、H_EASE、HL_START、MARKER_AT_F、MARKER_COLOR、KICKER、KICKER_IN、EXIT_AT、EXIT_BLUR、INK、INK_DIM、SANS、MONO、MESH_BG、SPARK、TILES。

可播放演示：同目录 demo.mp4。
