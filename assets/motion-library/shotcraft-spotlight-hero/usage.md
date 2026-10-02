# 聚光主角抬升

## 画面与用途

聚光从几个位置游走后锁定主角，内容透视倾斜并抬升悬浮，轮廓光沿边缘绕行，再回落原位。适合核心对象登场、产品重点和一处功能特写。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_spotlight_hero} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_spotlight_hero note="核心能力" theme={style}><div>本地页面内容</div></Material_shotcraft_spotlight_hero>
  );
}
```

## 参数

children, note?, width=920, height=450, startFrame=0, durationFrames=150, theme。完整动作在 durationFrames 内完成。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
