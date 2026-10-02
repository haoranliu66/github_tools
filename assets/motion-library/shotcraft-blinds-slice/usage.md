# 百叶窗错峰转场

## 画面与用途

整屏内容被分成竖条，每条先收缩旧画面再展开新画面，错峰形成横向推进波，适合翻页、章节推进和对比。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_blinds_slice} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_blinds_slice before={<div>原页面</div>} after={<div>新页面</div>} theme={style}/>
  );
}
```

## 参数

before, after, strips=12, startFrame=20, staggerFrames=2, durationFrames=10, theme。切片期间内容会重复渲染，避免带声音的媒体。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
