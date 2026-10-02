# graze-face-tour

大倾角贴面游走特写——镜头贴着 UI 表面低飞掠过（侧栏树/顶栏/列表当地形），页面文字初始悬浮在界面上空带同形软影，随镜头行进先后加速贴落回界面

适用：功能区巡礼（把 UI 当地景飞掠）；配合暗场+霓虹缘光做产品"内部世界"段落；界面内容逐区登场

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
import {Material_shotcraft_template_graze_face_tour} from './motion-library.jsx';
<Sequence durationInFrames={150}>
  <Material_shotcraft_template_graze_face_tour />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "16px solid transparent"
- "0 solid transparent"
- "14px solid transparent"
- "6px 6px 0 0"
- "tri"
- "triOpen"
- "doc"
- "folder"
- "dash"
- "36px 44px"
- "People & Teams"
- "Goals"
- "Docs"
- "More"
- "EPD"
- "Product roadmap"
- "Design"
- "Designer handbook"
- "Design system"
- "Components"
- "Patterns"
- "Tokens"
- "SPACES"
- "Recent"
- "Favorites"
- "Logo"
- "Brand refresh"
- "Team credentials"
- "Todo"
- "Comments"
- "Done"
- "22px 46px"
- "≡ List"
- "▦ Gallery"
- "Product analytics"
- "Widget brainstorm"
- "70px 70px 0"
- "30px 44px"
- "10px 10px 0 0"
- "Home"
- "3"
- "Inbox"
- "Company"
- "70px 90px 0"
- "‹"
- "›"
- "34px 46px"
- "Search by app, filetype…"
- "Delegated"
- "24px 52px"
- "Filter"
- "Group"
- "Sort"
- "20px 48px"
- "TODAY"
- "TASK NAME"
- "New Bugs Per Week"
- "Mobile screens"
- "…"

已适配的非通用文案：
- "Split.io Access for Oleg" → "Example access request"
- "ClickUp 3.0" → "Workspace 3.0"
- "ClickUp" → "Workspace"

可覆盖常量：FONT、INK、MID、FAINT、SEGS、SEG_LEN、FADE。

可播放演示：同目录 demo.mp4。
