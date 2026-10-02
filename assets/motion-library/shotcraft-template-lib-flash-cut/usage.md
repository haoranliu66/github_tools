# FlashCut 原始组件

## 画面与用途

暖白光短促扩亮后退去，作为覆盖层遮住切换点。适合：硬切掩盖、段落交接、强调拍。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_lib_flash_cut} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={30}>
      <Material_shotcraft_template_lib_flash_cut />
    </Sequence>
  );
}
```

## 参数

- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{"duration":10}`。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。

## 时间与组合

设计尺寸 1920×1080，30fps，30 帧（1.00 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
