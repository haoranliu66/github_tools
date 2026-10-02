# 页面 2.5D 运镜

## 画面与用途

同一页面按焦点关键帧平移、缩放和透视倾斜，适合从全局进入局部、扫描长页面或追随界面证据。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_page_camera} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_page_camera theme={style} pageH={1300} keys={[{frame:0,cx:960,cy:500,zoom:0.85},{frame:80,cx:1100,cy:740,zoom:1.25,rotY:12}]}><div>本地页面内容</div></Material_shotcraft_page_camera>
  );
}
```

## 参数

src?（本地 staticFile 路径）, children?, pageWidth=1920, pageH=1080, keys=[{frame,cx,cy,zoom,rotX?,rotY?,rotZ?,persp?}], theme, frame?。关键帧必须严格递增，zoom/persp 为正数。

## 输入资源

可使用 children 的本地 JSX，或 src 指向影片 public 中已暂存的页面图片。pageWidth/pageH 与实际页面尺寸匹配。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
