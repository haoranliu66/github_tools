# 网格波浪翻面

## 画面与用途

网格中的哑光背面沿对角波前翻为实际内容，末格轻微过冲回弹，适合功能墙、结果墙或批量信息亮相。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_grid_wave_flip} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_grid_wave_flip items={[<div key="one">结果一</div>,<div key="two">结果二</div>]} theme={style}/>
  );
}
```

## 参数

items, columns=3, cellWidth=480, cellHeight=230, gap=28, startFrame=20, staggerFrames=6, durationFrames=14, theme。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
