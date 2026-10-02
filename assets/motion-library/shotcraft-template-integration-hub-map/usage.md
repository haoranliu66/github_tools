# integration-hub-map

旧页面一次性快翻 180°（侧棱瞬间亮闪）落成新中枢页，五个集成 app 图标同帧弹现、随即五条彩虹光管同帧齐连，光管内输送脉冲持续流动——"翻开新一页，生态一齐接入"

适用：集成/生态能力段（一个产品连一切）；版本翻新叙事（旧页翻成新页）；暗场霓虹调性的功能高潮

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
import {Material_shotcraft_template_integration_hub_map} from './motion-library.jsx';
<Sequence durationInFrames={150}>
  <Material_shotcraft_template_integration_hub_map />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "Q3 Enterprise Deal"
- "Revenue · Pipeline · Q3 Quota"
- "Major Enterprise Account - UK"
- "Revenue · MQL · International"
- "Enterprise Pitch Deck"
- "MQL Lead Form Design"
- "Figma File · Last Edited"
- "Enterprise Sales"
- "Enterprise Closed Archive"
- "Archived · In Enterprise Sales"
- "Open Enterprise Lead - Follow up"
- "In Progress · In Enterprise Sales · Yesterday"
- "26px 30px"
- "Enterprise MQLs"
- "All"
- "Tasks"
- "Docs"
- "Whiteboards"
- "Dashboards"
- "Files"
- "Chat"
- "People"
- "Recent"
- "+ Add Location Filter"
- "QUICK FILTERS"
- "Assigned to Me"
- "Created by Me"
- "TASK FILTERS"
- "Open"
- "Closed"
- "Archived"
- "30px 34px"
- "Revenue"
- "Pipeline"
- "Q3 Quota"
- "3px 10px"
- "figma"
- "github"
- "salesforce"
- "gdrive"
- "M16 2 L32 2 L48 30 L40 42 L8 42 L0 30 Z"
- "M16 2 L32 2 L20 24 L4 24 Z"
- "M32 2 L46 28 L30 28 L18 6 Z"
- "M6 28 L42 28 L36 38 L12 38 Z"
- "M12 0 L24 8 L12 16 L0 8 Z"
- "M36 0 L48 8 L36 16 L24 8 Z"
- "M12 18 L24 26 L12 34 L0 26 Z"
- "M36 18 L48 26 L36 34 L24 26 Z"
- "M 452 322 L 452 440 Q 452 480 492 480 L 552 480"
- "M 316 612 L 552 612"
- "M 992 240 L 992 332"
- "M 1512 332 L 1512 440 Q 1512 480 1472 480 L 1372 480"
- "dropbox"
- "M 1640 618 L 1372 618"

已适配的非通用文案：
- "Open in GDrive" → "Open in Drive"
- "ClickUp Space" → "Workspace Space"

可覆盖常量：NOISE、FONT、LIST、PIPES、GROW、RECTS。

可播放演示：同目录 demo.mp4。
