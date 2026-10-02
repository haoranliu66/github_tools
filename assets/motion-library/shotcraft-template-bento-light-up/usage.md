# bento-light-up 逐格点亮

暗场 3×2 bento 墙压暗待命，琥珀流光逐格描边一圈、内容随即提亮上浮，全亮后镜头缓推收住

适用：功能墙/卡片墙/整页界面的整体亮相；内容已在原位、要"显形"而非"涌入"的段落

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
import {Material_shotcraft_template_bento_light_up} from './motion-library.jsx';
<Sequence durationInFrames={150}>
  <Material_shotcraft_template_bento_light_up />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "960px 540px"
- "Features"

已适配的非通用文案：
未发现需替换的非通用文字

可覆盖常量：BG、AMBER、FIRST、GAP、CELL_W、CELL_H、GUT、LEFT、TOP。

可播放演示：同目录 demo.mp4。
