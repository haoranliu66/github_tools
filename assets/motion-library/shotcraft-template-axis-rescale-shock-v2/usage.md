# axis-rescale-shock

## 画面与用途

增长曲线冲出图框，坐标刻度与网格重新标定，旧曲线被压缩，画面轻震强调量级跃迁。适合：增长超出预期、容量突破、数据量级变化。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_axis_rescale_shock_v2} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={180}>
      <Material_shotcraft_template_axis_rescale_shock_v2 />
    </Sequence>
  );
}
```

## 参数

- copy：需要替换的可见文字原文 → 新文案字典；默认通用文字可直接保留，截图文字另行替换图片。
- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`AMBER`、`CARD_W`、`CARD_H`、`CX`、`CY`、`PAD`、`AXIS_W`、`PLOT_W`、`PLOT_H`、`PLOT_X`、`PLOT_Y`、`DATA`、`N`、`MONTHS`、`HOLD`、`DRAW_END`、`SHOCK_END`、`BEAT`、`RESCALE_END`、`MARK_END`、`VAL_END`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。

## 时间与组合

设计尺寸 1920×1080，30fps，180 帧（6.00 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
