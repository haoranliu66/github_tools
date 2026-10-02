# panel-to-canvas 行倒卡

复选框逐个自动打勾→按钮按下→三行沿上抛弧线错峰飞出，途中行形态与卡形态交叉淡化，落位带随机倾角；面板行槽塌陷成虚线留白

适用：AI/协作工具"生成结果落到画布上"的叙事段落；A 式讲"已有内容换了个存在形态"，B 式讲"从一句话长出一棵结构"

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
import {Material_shotcraft_template_panel_to_canvas_materialize} from './motion-library.jsx';
<Sequence durationInFrames={150}>
  <Material_shotcraft_template_panel_to_canvas_materialize />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "52px 52px"
- "Add all to canvas"
- "0 20px"
- "M3 9.5 L7.2 13.5 L15 4.5"
- "M2 1 L2 17 L6.5 13.2 L9.4 20 L12.4 18.7 L9.5 12 L15 11.6 Z"

已适配的非通用文案：
未发现需替换的非通用文字

可覆盖常量：PANEL_X、PANEL_Y、PANEL_W、ROW_H、ROWS_TOP、TARGETS、CARD_W、CARD_H、CHECK_FRAMES、BUTTON_FRAME、FLY_START。

可播放演示：同目录 demo.mp4。
