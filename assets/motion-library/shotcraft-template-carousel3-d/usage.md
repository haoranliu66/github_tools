# carousel-3d

## 画面与用途

8 张卡按 sin/cos 排成半径 190px 的圆环并匀速整环自转一圈，每卡只绕 Y 公转、自身 billboard 朝外，正反两层同向贴图配 backface-visibility:hidden 保证任何时刻都正立不倒置，相机全程钉在浅俯角近景。适合：作品集/模板库/集成清单的循环展示；需要无缝 loop 的背景拍或落地页 hero。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_carousel3_d} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={168}>
      <Material_shotcraft_template_carousel3_d />
    </Sequence>
  );
}
```

## 参数

- copy：需要替换的可见文字原文 → 新文案字典；默认通用文字可直接保留，截图文字另行替换图片。
- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`N`、`RADIUS`、`ICONS`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。

## 时间与组合

设计尺寸 1920×1080，30fps，168 帧（5.60 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
