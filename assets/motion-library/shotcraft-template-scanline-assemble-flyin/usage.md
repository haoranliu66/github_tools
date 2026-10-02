# scanline-assemble-flyin

页面开场是空的暗底网格，一条亮扫描线自上而下掠过；扫到每个区块的落点，该处组件就从画外飞入贴合，带残影模糊与落位闪边——扫完整页恰好装配完成

适用："页面自己生成"的开场；AI 建站/自动排版类产品的核心演示；从空白到成品的能力叙事

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、138 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_scanline_assemble_flyin} from './motion-library.jsx';
<Sequence durationInFrames={138}>
  <Material_shotcraft_template_scanline_assemble_flyin />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "topbar"
- "logo"
- "module"
- "h1"
- "cta"
- "footer"
- "social"
- "3px 10px"
- "app.example.com"
- "200 OK · TLS"
- "Acme "
- "Studio"
- "The headline for"
- "your product here"
- "H1 · UI-SERIF / GEORGIA"
- "6px 13px"
- "GET STARTED"
- "DOCS"
- "WORK"
- "04 / 08"
- "sample"
- "KINETIC TYPE · 04"
- "00:30"
- "A PRODUCT OF ACME · ACME LABS, INC."
- "11px"
- "x"
- "@USERNAME"
- "ASSEMBLY · COMPLETE"

已适配的非通用文案：
未发现需替换的非通用文字

可覆盖常量：MONO、SERIF、ACCENT、A_RGB、PLAN、FT。

可播放演示：同目录 demo.mp4。
