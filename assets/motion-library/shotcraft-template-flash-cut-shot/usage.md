# 推进流白 flash-cut

## 画面与用途

截图页面先由相机推进到局部，再跨换页切点叠加暖白闪层，亮光退去后显露后一页。适合：两个截图页面的推进式交接；保留截图依赖。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_flash_cut_shot} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={120}>
      <Material_shotcraft_template_flash_cut_shot />
    </Sequence>
  );
}
```

## 参数

- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。
- screenshots/layout：图片路径字典和与图片一致的完整页面坐标；见输入资源。

## 输入资源

保留截图依赖，默认使用已嵌入的本地中性 PNG。替换时，screenshots 的键使用原始 textures/live/文件名.png，值为影片 public 中已暂存路径；同步整页/裁片尺寸、文件名和完整 layout。截图里的文字需要重新截图，不能只传 copy。

## 时间与组合

设计尺寸 1920×1080，30fps，120 帧（4.00 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
