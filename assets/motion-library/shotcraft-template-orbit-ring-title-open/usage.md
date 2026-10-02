# orbit-ring-title-open

## 画面与用途

八张 16:9 内容卡按 45° 均布在 700×375 椭圆上匀速公转（卡身永不倾斜，纵深只由 sin θ 给出 ±9% 缩放与 z 序），环撑开期间卡内容冻结首帧、f24 之后八张一起开播；居中标题逐字解糊下沉落定，关键词到位那一刻黄色马克块自左横扫铺满，mono 副行随后浮出，末段整行失焦淡出、环继续转着交棒下一镜。适合：开场第一镜 = 「这个产品有一整套东西」；素材库/模板库/功能矩阵/案例集的门面拍；需要用真实运动的产品画面托住一句主张，而不是把截图摆成静态九宫格。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_orbit_ring_title_open} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={130}>
      <Material_shotcraft_template_orbit_ring_title_open />
    </Sequence>
  );
}
```

## 参数

- copy：需要替换的可见文字原文 → 新文案字典；默认通用文字可直接保留，截图文字另行替换图片。
- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`RX`、`RY`、`CW`、`CH`、`N`、`ROT_SPEED`、`RING_IN`、`RING_SCALE_FROM`、`PLAY_START`、`DEPTH_SCALE`、`HEADLINE`、`H_SIZE`、`H_LEAD`、`H_TRAVEL`、`H_STAGGER`、`H_EASE`、`HL_START`、`MARKER_AT_F`、`MARKER_COLOR`、`KICKER`、`KICKER_IN`、`EXIT_AT`、`EXIT_BLUR`、`INK`、`INK_DIM`、`SANS`、`MONO`、`MESH_BG`、`SPARK`、`TILES`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。

## 时间与组合

设计尺寸 1920×1080，30fps，130 帧（4.33 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
