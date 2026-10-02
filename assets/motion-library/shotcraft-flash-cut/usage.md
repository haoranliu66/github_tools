# 暖光闪切

## 画面与用途

暖白光从中心短暂扩亮后消失，适合一次强调拍或跨段落的硬切遮盖。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_flash_cut} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_flash_cut startFrame={30} durationFrames={12}/>
  );
}
```

## 参数

startFrame=20, durationFrames=10, color=暖白 CSS 颜色, peak=.85。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
