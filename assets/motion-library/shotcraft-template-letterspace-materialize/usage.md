# letterspace-materialize

大字距字标全字符并行连续描画结晶——所有字母同帧起笔、笔画像手写一样连续生长、同帧齐收成词；氛围底景上的品牌字标显影

适用：片尾/片头品牌字标登场（SUPERHUMAN 式大字距全大写）；章节题字；needs 静谧/高级感的收束帧

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、150 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_letterspace_materialize} from './motion-library.jsx';
<Sequence durationInFrames={150}>
  <Material_shotcraft_template_letterspace_materialize />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "M 62 13 C 51 4, 18 3, 15 15 C 12 26, 29 29, 39 31 C 50 33, 66 37, 63 48 C 60 59, 21 61, 11 50"
- "M 12 5 L 12 40 C 12 59, 66 59, 66 40 L 66 5"
- "M 12 59 L 12 5 L 44 5 C 64 5, 64 32, 44 32 L 12 32"
- "M 62 5 L 12 5 L 12 59 L 62 59 M 12 31 L 56 31"
- "M 12 59 L 12 5 L 44 5 C 64 5, 64 31, 44 31 L 12 31 M 42 31 L 64 59"
- "M 12 5 L 12 59 M 66 5 L 66 59 M 12 31 L 66 31"
- "M 8 59 L 8 6 L 39 38 L 70 6 L 70 59"
- "M 7 59 L 39 5 L 71 59 M 17 41 L 61 41"
- "M 12 59 L 12 5 L 66 59 L 66 5"

已适配的非通用文案：
- "SUPERHUMAN" → "WORKSPACE"

可覆盖常量：GLYPHS、WORD、START、DUR。

可播放演示：同目录 demo.mp4。
