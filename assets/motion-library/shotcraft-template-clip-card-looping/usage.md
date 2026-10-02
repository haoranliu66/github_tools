# ClipCardLooping

## 画面与用途

真实视频卡片截取后循环，支持交叉淡化、裁切和字幕；示例分别展示有声循环、短片段循环与半屏卡片。适合：持续展示操作片段、验证循环边界；依赖实际视频素材。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_clip_card_looping} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={120}>
      <Material_shotcraft_template_clip_card_looping />
    </Sequence>
  );
}
```

## 参数

- copy：需要替换的可见文字原文 → 新文案字典；默认通用文字可直接保留，截图文字另行替换图片。
- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`CLIP`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。 视频使用影片 public 中已暂存的真实文件；默认演示视频/音轨是本机生成的示例。循环/裁切输入通过 originalProps，音量和静音参数只针对该视频。

## 时间与组合

设计尺寸 1920×1080，30fps，120 帧（4.00 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
