# invisible-cut 前景遮挡隐形切

## 画面与用途

一张超画幅卡片带重运动模糊贴脸横扫，糊满全屏的遮挡帧内背景 A→B 硬切，卡片飞出观众以为还是同一镜。适合：两镜衔接处需要"无痕换景"或"仪式感开屏"时（技法卡，与 shot-transitions 六式同层选型）。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_invisible_cut} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={150}>
      <Material_shotcraft_template_invisible_cut />
    </Sequence>
  );
}
```

## 参数

- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`SW_START`、`SW_END`、`CUT`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。 已安装的额外依赖：@remotion/motion-blur；只需要这些依赖。

## 时间与组合

设计尺寸 1920×1080，30fps，150 帧（5.00 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
