# BrowserFrame

## 画面与用途

浏览器外观容器以弹簧节奏进入，适合网站界面、操作过程或交互示意。

## 最小调用

```jsx
import React from 'react';
import {BrowserFrame} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <BrowserFrame theme={style} url="localhost"><div>真实界面内容</div></BrowserFrame>
  );
}
```

## 参数

children 为界面 JSX；url=localhost，width=1400，height=650，startFrame=0；theme 可传完整项目 style，style 为可选外层 CSS。

## 输入资源

不依赖外部图片、音频或视频。调用方提供实际文字、数据或 JSX；已安装 react/remotion。

## 时间与组合

startFrame 等时间均为镜头局部帧；由当前 Composition 的 fps 解释。镜头时长依据实测旁白编排，按本项时间参数给动作留足区间；外层布局负责位置和尺寸。

## 按需深入

- [当前源码](../../../apps/video-factory/remotion/ExpandedMotion.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- [演示入口](../../../apps/video-factory/remotion/MaterialDemo.jsx)：只定位本项 id 分支。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
