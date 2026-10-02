# 逐行嵌入

## 画面与用途

内容行从上方飞入，透视角逐步展平，在落地瞬间沿底边展开强调色细缝，适合结构化结果进入列表、字段填充和详情逐步建立。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_row_embed} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_row_embed items={[<div key="one">记录一</div>,<div key="two">记录二</div>]} theme={style}/>
  );
}
```

## 参数

items, startFrame=12, staggerFrames=9, durationFrames=12, gap=18, width=1400, theme。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
