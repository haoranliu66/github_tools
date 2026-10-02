# Three.js 桌面面板与相机

## 画面与用途

纸质平面置于真实三维桌面，带接触阴影，相机沿关键帧路径移动。适合：纸卡空间展示、需要真实三维相机与材质的镜头。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_three_flat_panel} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={180}>
      <Material_shotcraft_template_three_flat_panel />
    </Sequence>
  );
}
```

## 参数

- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。
- originalProps.panel：texture（Three.js Texture）、width、height、position=[x,y,z]、yaw、opacity。originalProps.keyframes=[{frame,pos:[x,y,z],look:[x,y,z],fov}] 控制相机。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。 已安装的额外依赖：@remotion/three、three、@react-three/fiber；只需要这些依赖。

## 时间与组合

设计尺寸 1920×1080，30fps，180 帧（6.00 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
