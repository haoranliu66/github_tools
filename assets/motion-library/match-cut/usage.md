# MatchCut

## 画面与用途

同一画面位置切换前后两组内容，并保留共享锚点，适合对象延续而问题、环境或周围状态改变。前后内容及锚点接收任意 JSX。

## 最小调用

```jsx
import React from 'react';
import {MatchCut} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <MatchCut before={<div>原状态</div>} after={<div>新状态</div>} anchor={<div>同一对象</div>} />
  );
}
```

## 参数

before/after/anchor 为 JSX；cutFrame=60，zoomPeak=1.15，durationFrames=20；anchor 保持在同一位置。

## 输入资源

不依赖外部图片、音频或视频。调用方提供实际文字、数据或 JSX；已安装 react/remotion。

## 时间与组合

startFrame 等时间均为镜头局部帧；由当前 Composition 的 fps 解释。镜头时长依据实测旁白编排，按本项时间参数给动作留足区间；外层布局负责位置和尺寸。

## 按需深入

- [当前源码](../../../apps/video-factory/remotion/MotionLibrary.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- [演示入口](../../../apps/video-factory/remotion/MaterialDemo.jsx)：只定位本项 id 分支。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
