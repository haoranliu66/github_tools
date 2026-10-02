# 时钟扫描转场

## 画面与用途

扫描边界从十二点顺时针旋转，将前一页面擦成后一页面，适合状态刷新、数据更新或整屏交接。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_clock_wipe} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_clock_wipe before={<div>原页面</div>} after={<div>新页面</div>} theme={style}/>
  );
}
```

## 参数

before, after, startFrame=30, durationFrames=60, color?, theme。按 Composition 尺寸计算扫描半径。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
