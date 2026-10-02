# dataviz-landscape-open

暗场支流线束地景开场——多条流线汇入主干、虚构 ID 标签浮在线上、相机重景深低速飞越

适用：品牌级抽象开场（"数据宇宙"隐喻），接亮场产品段或字标；与 glow-flyline-moves 分工：那卡是段落内卡片之间的连线叙事，本卡是开场专用的全画幅地景

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、240 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_dataviz_landscape_open} from './motion-library.jsx';
<Sequence durationInFrames={240}>
  <Material_shotcraft_template_dataviz_landscape_open />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "M 130 1270 C 480 830, 880 360, 1290 -130"
- "M 1480 1240 C 1830 800, 2180 330, 2540 -110"
- "OKR-1024"
- "TEAM-4417"
- "KR-2093"
- "SYNC-3308"
- "OBJ-2471"
- "PLAN-9124"
- "GOAL-7752"

已适配的非通用文案：
未发现需替换的非通用文字

可覆盖常量：W、H、DUR、WORLD_W、MID_TRIBS、FAR_LINES、FAR_NODE_TS、NEAR_LINES、LABELS、CONV。

可播放演示：同目录 demo.mp4。
