# lead-word-zoom-assemble

首词以 2.3 倍字号占据画面中央、hold 期间继续推近 6%，随后一条曲线同时完成「缩回终字号」与「整行左滑归位」，后续词各自从槽位右侧 0.5em 被推进来；支点横向钉首词中心、纵向钉基线（挂载时实测），整行上移的同一时窗副行浮出，停一拍后整幕 crash-zoom 推近失焦交棒

适用：品牌名/产品名的 Introducing 字卡；发布会式开场第二镜；一句话主张需要"先让一个词占满画面、再把整句补齐"的场合

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、84 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_lead_word_zoom_assemble} from './motion-library.jsx';
<Sequence durationInFrames={84}>
  <Material_shotcraft_template_lead_word_zoom_assemble />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "-0.03em"
- "One shot card, one motion recipe — copy, paste, render."
- "geometricPrecision"

已适配的非通用文案：
- "Introducing Lumen Deck" → "Introducing Your Product"
- "Lumen" → "Your"

可覆盖常量：TEXT、HIGHLIGHT_WORD、FONT_SIZE、INITIAL_SCALE、PUSH_SCALE、WORD_DELAY、WORD_STAGGER、WORD_PUSH、WORD_FADE、LETTER_SPACING、LIFT、LIFT_DISTANCE、SUBLINE、CRASH_FRAMES、CRASH_SCALE、CRASH_BLUR、INK、INK_DIM、ACCENT、SANS、MESH_BG、PUSH_EASE、ZOOM_EASE、WORD_EASE。

可播放演示：同目录 demo.mp4。
