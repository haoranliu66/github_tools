# dashboard-glow-highlight-pill

金字悬于黑场，数据仪表盘自底带透视升入并持续 3D 漂移；金色光斑从右侧巡游到底部拉成胶囊，再由它起笔描出弹窗的辉光轮廓

适用：金融/数据类产品的重功能揭示；"注意这里"的高级指引；黑金调品牌片的核心一拍

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、60 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_dashboard_glow_highlight_pill} from './motion-library.jsx';
<Sequence durationInFrames={60}>
  <Material_shotcraft_template_dashboard_glow_highlight_pill />
</Sequence>
```

原始默认 props：
```json
{}
```

可替换文案键：
- "1px 0"
- "Ready."
- "0 8px"
- "◆ ACME"
- "Trade"
- "Earn"
- "Vault"
- "Support "
- " 0x8f...c2 "
- "1px 5px"
- "Connect"
- "4px 5px"
- "Orderbook"
- "Trades"
- "155.01 ▼"
- "4px 6px"
- "● TOKEN-USD "
- "PERP"
- "155.01"
- "24h Vol $1,891,145.10 "
- " Funding 0.0042% "
- " OI $9.4M"
- "2px 0"
- "Cross"
- "10x"
- "One-Way"
- "Market"
- "Limit"
- "Pro"
- "4px 0"
- "▢ Reduce Only"
- "Buy"
- "Sell"
- "Current Position|0.00 TOKEN"
- "Liq. Price|--"
- "Order Value|$0.00"
- "Margin Required|$0.00"
- "Fees|0.035% / 0.010%"
- "Account"
- "Portfolio Margin|$20,182.49"
- "Unrealized PNL|+$142.11"
- "Available|$1,021.19"
- "3px 8px"
- "Balances"
- "Order History"
- "Trade History"
- "Funding History"
- "Position History"
- "TOKEN"
- "ALT"
- "-USD"
- "152.30"
- "$7,801.75"
- "$1,775.00"
- "74,212.07"
- "$53,225.00"
- "Market | Limit"
- "Reverse"
- "6px 7px"
- "Focus Mode"
- "All panels share one unified workspace layout. Changes in one panel are reflected in the others,"
- "keeping context in one place"
- "."
- "Choose how panels are arranged:"
- "● Standard"
- "Placeholder body copy for option one. The selected option directly determines the layout of each panel — simple and predictable."
- "○ Pro"
- "Placeholder body copy for option two, written a little longer so the block keeps its shape. Replace both with your own wording."
- "Confirm"

已适配的非通用文案：
未发现需替换的非通用文字

可覆盖常量：OB_ROWS、CANDLES、MW、MH、MCX、MCY、MRAD、RW、RH、BW、BH、BO、SX、TRACE_D、P_L、POSE、BLOB。

可播放演示：同目录 demo.mp4。
