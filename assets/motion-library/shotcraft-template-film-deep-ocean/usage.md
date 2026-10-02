# deep-ocean 完整宣传片模板

36.2 秒完整宣传片结构：品牌开场、聚光主角、字卡、卡组飞入、搜索筛选、详情、论文列表、周报和收尾；保留 deep-ocean 主题。接收截图与布局替换，音效需自备并通过 audio 映射注入。

适用：完整宣传片结构

这是完整镜头/结构模板，原始运动、布局、几何和通用文案保持。默认素材及数值是演示内容；制作具体影片时按叙事提供实际内容。

默认：1920×1080、30fps、1085 帧（准确导出时长见 SHOTCRAFT_DURATION）。按原始时长包在 Sequence 中使用；不要仅延长整个影片而意外改变 useT 的归一化时间。

接口：
- copy：以原文为键的文字替换字典；通用固定文案默认原样。
- config：按本文件大写常量名覆盖；跨模块同名时使用 完整源码路径#常量名。可覆盖原始数组、尺寸、颜色和时序。
- screenshots：以 textures/live/文件名.png（或原始 textures/文件名.png）为键，值为影片 public 下实际截图的相对路径。截图仍是图片输入；默认嵌入本地生成的去品牌页面截图。
- layout：完整 live-layout 数据，包含页面尺寸、卡片/记录位置、裁切矩形与 file 名；截图尺寸/结构变化时同步更新。默认保持原几何。
- originalProps：透传原始组件接口，优先于默认 props。
- theme：可传项目 style；只有原本提供 ACCENT 的模板使用项目强调色，其他默认原始设计。完整片预设可用 originalProps.theme 指定。
- audio：完整片按音效文件名提供已暂存的本地音频路径；默认静音，保留音效时点，不使用授权来源不完整的上游音频。

```jsx
import {Material_shotcraft_template_film_deep_ocean} from './motion-library.jsx';
<Sequence durationInFrames={1085}>
  <Material_shotcraft_template_film_deep_ocean />
</Sequence>
```

原始默认 props：
```json
{
  "theme": "deep-ocean"
}
```

可替换文案键：
- "ink-press"
- "caption"
- "0.14em"
- "0.015em"
- "max-content"
- "8px 18px"
- "ink-press"
- "ink-press"
- "960px 540px"
- "ink-press"
- "macro"
- "ink-press"
- "table"
- "center center"
- "One card,"
- "one project."
- "ink-press"
- "morning"
- "center center"
- "-0.012em"
- "0 auto 34px"
- "-0.01em"
- "flex-end"
- "center bottom"
- "0.14em"
- "Team Research Console"
- "nav"
- "card4"
- "card1"
- "paper1"
- "card7"
- "paper3"
- "search"
- "stats"
- "wbr"
- "ink-press"
- "outro"
- "center center"
- "34px auto 0"
- "0.14em"
- "Paper Radar"
- "Of 31 Fetched Today"
- "ink-press"
- "chart"
- "center center"
- "0.16em"
- "flex-end"
- "0.12em"
- "Weekly Brief · 2026-W28"
- "h2"
- "ink-press"
- "wbr"
- "li"
- "8px 10px 0"
- "0.14em"
- "0.08em"
- "All your team’s research, *one* place to go."
- "Paper *Radar,* tailored for your morning reading."
- "of 31 fetched today"
- "Every project, *linked* to your weekly report."
- "The whole team, on the *same* page."
- "TEN LIVE PROJECTS · FOUR RESEARCHERS"
- "NEW WORK LANDS ALL WEEK"
- "SEARCH · FILTER · OPEN"
- "EVERY QUESTION, TRACKED TO ITS EXPERIMENTS"
- "THE DAILY PAPER RADAR"
- "FOUR VOICES, ONE WEEKLY BRIEF"
- "ink-press"
- "title-card"
- "-0.012em"
- "0.26em"
- "38px auto 0"
- "0.12em"
- "0.5em"
- "page"
- "surface"
- "field"
- "muted"
- "accent"
- "vintage-kraft"
- "modern-light"
- "ink-press"
- "pageRgb"
- "lightRgb"
- "accentRgb"
- "shadowRgb"
- "string"

已适配的非通用文案：
- "nano-lab" → "demo-lab"
- "AI Foundation Lab" → "Example Workspace"
- "TEAM RESEARCH CONSOLE" → "TEAM WORKSPACE"
- "AI Foundation Lab" → "Example Workspace"
- "2026 第 27 周|7月3日|2026-W27 · Foundation Lab Weekly" → "2026 第 27 周|7月3日|2026-W27 · Workspace Weekly"
- "2026 第 26 周|6月26日|2026-W26 · Foundation Lab Weekly" → "2026 第 26 周|6月26日|2026-W26 · Workspace Weekly"
- "2026 第 25 周|6月19日|2026-W25 · Foundation Lab Weekly" → "2026 第 25 周|6月19日|2026-W25 · Workspace Weekly"
- "2026 第 24 周|6月12日|2026-W24 · Foundation Lab Weekly" → "2026 第 24 周|6月12日|2026-W24 · Workspace Weekly"
- "2026 第 23 周|6月5日|2026-W23 · Foundation Lab Weekly" → "2026 第 23 周|6月5日|2026-W23 · Workspace Weekly"
- "2026 第 22 周|5月29日|2026-W22 · Foundation Lab Weekly" → "2026 第 22 周|5月29日|2026-W22 · Workspace Weekly"

可覆盖常量：查看原始 props 或所属子模块的完整常量键。

可播放演示：同目录 demo.mp4。
