# steep-tilt-glide

固定镜头下直立页面以 60° 强透视侧立（右近左远），页面自身沿其 3D 横面方向滑移掠过镜头（物动镜不动），滑移带速度重影、文字组件悬空贴落、由暗揭亮

适用：长页面/多区块 UI 的炫技巡览（内容依次滑过固定机位）；暗场霓虹调性；与贴面运镜卡互补的"侧掠"机位

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
import {Material_shotcraft_template_steep_tilt_glide} from './motion-library.jsx';
<Sequence durationInFrames={150}>
  <Material_shotcraft_template_steep_tilt_glide />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "M 14 62 L 50 30 L 86 62"
- "M 22 84 L 50 62 L 78 84"
- "M 27 10 L 50 25 L 27 40 L 4 25 Z"
- "M 73 10 L 96 25 L 73 40 L 50 25 Z"
- "M 27 40 L 50 55 L 27 70 L 4 55 Z"
- "M 73 40 L 96 55 L 73 70 L 50 55 Z"
- "M 27 74 L 50 89 L 73 74 L 50 62 Z"
- "Product analytics"
- "Widget brainstorm"
- "Design system"
- "Design"
- "M 10 15 L 20 26 L 30 15"
- "M 6 20 L 20 7 L 34 20 M 11 17 V 33 H 29 V 17"
- "Home"
- "M 20 5 C 13 5 10 10 10 16 V 24 L 6 30 H 34 L 30 24 V 16 C 30 10 27 5 20 5 Z M 16 33 C 16 36 24 36 24 33"
- "Inbox"
- "Docs"
- "Dashboards"
- "M 26 6 L 12 20 L 26 34"
- "W"
- "Product Management"
- "20px 40px"
- "List"
- "Board"
- "11"
- "14px 30px"
- "IN PROGRESS"
- "TASK NAME"
- "New Feature Launch"
- "Roadmap Q3"
- "User Testing"
- "Bug Triage"
- "left top"

已适配的非通用文案：
- "ClickUp 3.0" → "Workspace 3.0"
- "ClickUp" → "Workspace"

可覆盖常量：FONT、INK、PW、PH、CAM。

可播放演示：同目录 demo.mp4。
