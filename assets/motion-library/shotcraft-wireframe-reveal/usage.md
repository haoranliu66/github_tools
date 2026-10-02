# 蓝图描线实体化

## 画面与用途

SVG 蓝图路径错峰描绘，然后一道扫描光把线框替换为实际内容，适合从设计到实现、结构说明或界面首次亮相。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_wireframe_reveal} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_wireframe_reveal paths={["M120 160H1800V800H120Z"]} theme={style}><div>本地页面内容</div></Material_shotcraft_wireframe_reveal>
  );
}
```

## 参数

paths=[SVG d], children, startFrame=10, drawFrames=34, staggerFrames=4, scanStartFrame=70, scanFrames=30, theme。paths 与 Composition 同一坐标系。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
