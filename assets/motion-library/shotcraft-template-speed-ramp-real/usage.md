# speed-ramp

## 画面与用途

帧号非线性 remap 变速——高速掠过突降 0.2x 凝视重点，再加速离开。适合：卡片流/长横移中把一个重点"放慢/停下给人看"；教学解说语境用定格标注。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_speed_ramp_real} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={135}>
      <Material_shotcraft_template_speed_ramp_real />
    </Sequence>
  );
}
```

## 参数

- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`CARD_W`、`GAP`、`RAIL`、`TARGET_I`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。
- screenshots/layout：图片路径字典和与图片一致的完整页面坐标；见输入资源。

## 输入资源

保留截图依赖，默认使用已嵌入的本地中性 PNG。替换时，screenshots 的键使用原始 textures/live/文件名.png，值为影片 public 中已暂存路径；同步整页/裁片尺寸、文件名和完整 layout。截图里的文字需要重新截图，不能只传 copy。 已安装的额外依赖：@remotion/motion-blur；只需要这些依赖。

## 时间与组合

设计尺寸 1920×1080，30fps，135 帧（4.50 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
