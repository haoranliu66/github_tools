# Video Shotcraft 材料使用

本页记录第一批 12 个核心动效。后续全量接入见 [完整模板目录与接口](video-shotcraft-full-adaptation.md)。

按画面需求检索，选定后按需读代码、用法和本地演示。组件全部接收可替换内容，不带示例项目事实；风格以完整项目 style 传给组件的 theme。

## 动效

| id | 画面 / 场景 | 代码与接口 |
|---|---|---|
| shotcraft-page-camera | 页面 2.5D 运镜 | [用法](../assets/motion-library/shotcraft-page-camera/usage.md) · [本地演示](../assets/motion-library/shotcraft-page-camera/demo.mp4) |
| shotcraft-digit-roll | 机械数字滚轮 | [用法](../assets/motion-library/shotcraft-digit-roll/usage.md) · [本地演示](../assets/motion-library/shotcraft-digit-roll/demo.mp4) |
| shotcraft-flash-cut | 暖光闪切 | [用法](../assets/motion-library/shotcraft-flash-cut/usage.md) · [本地演示](../assets/motion-library/shotcraft-flash-cut/demo.mp4) |
| shotcraft-clock-wipe | 时钟扫描转场 | [用法](../assets/motion-library/shotcraft-clock-wipe/usage.md) · [本地演示](../assets/motion-library/shotcraft-clock-wipe/demo.mp4) |
| shotcraft-blinds-slice | 百叶窗错峰转场 | [用法](../assets/motion-library/shotcraft-blinds-slice/usage.md) · [本地演示](../assets/motion-library/shotcraft-blinds-slice/demo.mp4) |
| shotcraft-grid-wave-flip | 网格波浪翻面 | [用法](../assets/motion-library/shotcraft-grid-wave-flip/usage.md) · [本地演示](../assets/motion-library/shotcraft-grid-wave-flip/demo.mp4) |
| shotcraft-wireframe-reveal | 蓝图描线实体化 | [用法](../assets/motion-library/shotcraft-wireframe-reveal/usage.md) · [本地演示](../assets/motion-library/shotcraft-wireframe-reveal/demo.mp4) |
| shotcraft-word-roll | 竖向词条滚轮 | [用法](../assets/motion-library/shotcraft-word-roll/usage.md) · [本地演示](../assets/motion-library/shotcraft-word-roll/demo.mp4) |
| shotcraft-bezier-merge | 多源曲线汇流 | [用法](../assets/motion-library/shotcraft-bezier-merge/usage.md) · [本地演示](../assets/motion-library/shotcraft-bezier-merge/demo.mp4) |
| shotcraft-timeline-travel | 时间轴横移 | [用法](../assets/motion-library/shotcraft-timeline-travel/usage.md) · [本地演示](../assets/motion-library/shotcraft-timeline-travel/demo.mp4) |
| shotcraft-spotlight-hero | 聚光主角抬升 | [用法](../assets/motion-library/shotcraft-spotlight-hero/usage.md) · [本地演示](../assets/motion-library/shotcraft-spotlight-hero/demo.mp4) |
| shotcraft-row-embed | 逐行嵌入 | [用法](../assets/motion-library/shotcraft-row-embed/usage.md) · [本地演示](../assets/motion-library/shotcraft-row-embed/demo.mp4) |

## 风格

| styleId | 名称 |
|---|---|
| shotcraft-vintage-kraft | 复古牛皮纸 |
| shotcraft-deep-ocean | 深海 |
| shotcraft-obsidian-violet | 黑曜紫 |
| shotcraft-modern-light | 现代浅色 |
| shotcraft-midnight | 午夜深色 |
| shotcraft-solar-pop | 鼠尾草 |
| shotcraft-coral-burst | 珊瑚 |
| shotcraft-color-play | 鸢尾 |
| shotcraft-ink-press | 纸墨印刷 |

风格在 config/style-library.json 中提供完整 palette、background、typography、geometry、layout、illustration、motion、transitions 和 captions。预览放在 assets/style-library/<styleId>/preview.png。主题适配保留上游语义配色，中文字体、布局、字幕和动效元数据按本项目规范补齐；不是原成片的逐像素复刻。

## 查询和调用

```powershell
pnpm video:library search --query "多源曲线汇流，汇入统一入口" --limit 5
pnpm video:library show --id shotcraft-bezier-merge
pnpm video:library demo --id shotcraft-bezier-merge
```

镜头从 ./motion-library.jsx 导入 show 返回的 exportName。例如：

```jsx
import {Material_shotcraft_bezier_merge} from './motion-library.jsx';
export default function Shot({style}) {
  return <Material_shotcraft_bezier_merge theme={style}
    sources={["文档", "对话", "代码"]} target="统一检索" durationFrames={150}/>;
}
```

## 演示重建

现有 video:library demo 会保留已登记的实际 MP4。需要重建时，使用项目的专用演示入口，Composition ID 为相同组件 id：

```powershell
node node_modules/@remotion/cli/remotion-cli.js render apps/video-factory/remotion/ShotcraftDemo.jsx shotcraft-bezier-merge assets/motion-library/shotcraft-bezier-merge/demo.mp4 --scale=0.5 --concurrency=2
```

每项组件演示为 1920×1080 设计尺寸、30fps、160 帧，以 0.5 倍输出 960×540 MP4。演示代码和材料不需要上游仓库、音效、工作台、远程字体或截图。风格静帧的 Composition ID 为 <styleId>-style。

来源、固定提交、许可与修改记录另存 [独立归档](../integrations/motion-sources/Vincentwei1021/video-shotcraft/NOTICE.md)。新增内容改变库摘要；已有策划和视觉批准仍须遵守原有摘要门禁，不自动套用新库或伪造新批准。
