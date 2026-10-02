# 多源曲线汇流

## 画面与用途

多路来源先建立曲线连接，信息包沿曲线传递，随后来源缩小汇入共同目标，连接撤回后保留结果。适合多源整合、聚合或统一入口。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_bezier_merge} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_bezier_merge sources={["文档","对话","代码"]} target="统一检索" theme={style}/>
  );
}
```

## 参数

sources=[短标签], target, startFrame=0, durationFrames=150, theme。1～6 路建议，更多会压缩间距。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
