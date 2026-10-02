# PerspectivePanel

## 画面与用途

面板以透视抬升、缩放和显现进入，然后展平，适合界面、结果面板或新信息进入视野。

## 最小调用

```jsx
import React from 'react';
import {PerspectivePanel} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <PerspectivePanel><div>界面内容</div></PerspectivePanel>
  );
}
```

## 参数

children 必填 JSX；startFrame=0，durationFrames=20；style 可选。

## 输入资源

不依赖外部图片、音频或视频。调用方提供实际文字、数据或 JSX；已安装 react/remotion。

## 时间与组合

startFrame 等时间均为镜头局部帧；由当前 Composition 的 fps 解释。镜头时长依据实测旁白编排，按本项时间参数给动作留足区间；外层布局负责位置和尺寸。

## 按需深入

- [当前源码](../../../apps/video-factory/remotion/MotionLibrary.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- [演示入口](../../../apps/video-factory/remotion/MaterialDemo.jsx)：只定位本项 id 分支。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
