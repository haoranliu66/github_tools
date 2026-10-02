# CameraMove

## 画面与用途

对包裹内容按关键帧平移和缩放，适合从整体进入局部、追随关注点或在同一空间中解释结构。可包裹任意 JSX，与关系线、字段变化和状态转换组合。

## 最小调用

```jsx
import React from 'react';
import {CameraMove} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <CameraMove keys={[{frame:0,x:0,y:0,scale:1},{frame:90,x:-180,y:-80,scale:1.3}]}><div>页面内容</div></CameraMove>
  );
}
```

## 参数

children 必填 JSX；keys=[{frame,x,y,scale}]，每个关键帧填写全部坐标，frame 严格递增；easing=cinematic/snappy/linear；style 可选。

## 输入资源

不依赖外部图片、音频或视频。调用方提供实际文字、数据或 JSX；已安装 react/remotion。

## 时间与组合

startFrame 等时间均为镜头局部帧；由当前 Composition 的 fps 解释。镜头时长依据实测旁白编排，按本项时间参数给动作留足区间；外层布局负责位置和尺寸。

## 按需深入

- [当前源码](../../../apps/video-factory/remotion/MotionLibrary.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- [演示入口](../../../apps/video-factory/remotion/MaterialDemo.jsx)：只定位本项 id 分支。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
