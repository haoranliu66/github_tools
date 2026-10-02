# 时间轴横移

## 画面与用途

镜头沿水平时间轴连续移动，每到一处刻度，对应内容从轴线弹立，最后推近终点。适合版本演进、阶段进程和历史节点。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_timeline_travel} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_timeline_travel items={[{label:"早期",content:<div>早期内容</div>},{label:"现在",content:<div>当前内容</div>}]} theme={style}/>
  );
}
```

## 参数

items=[{label,content}], startFrame=12, travelFrames=92, gap=1400, zoomPeak=1.18, theme。建议 2～5 个简短节点。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
