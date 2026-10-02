# chip-lift-to-user-pill

## 画面与用途

网格里的目标 chip 先 3 帧硬切反色成黑底白字，其余 chip 按到它的曼哈顿距离交错淡出缩小；黑 chip 左缘锚定向右生长成药丸，内部逐字打出人名并点亮绿点，再拉一条 1px 连接线接到圆形徽标。适合："从一堆候选里选中并展开这一个"的交互链路；协作/通讯录/收件人类产品的功能演示；选中→详情的转场。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_chip_lift_to_user_pill} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={150}>
      <Material_shotcraft_template_chip_lift_to_user_pill />
    </Sequence>
  );
}
```

## 参数

- copy：需要替换的可见文字原文 → 新文案字典；默认通用文字可直接保留，截图文字另行替换图片。
- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`SANS`、`BG`、`INK`、`TXT`、`DIM`、`LINE`、`COLS`、`ROWS`、`CW`、`CH`、`GX`、`GY`、`GX0`、`GY0`、`TC`、`TR`、`LABELS`、`TX`、`TY`、`OTHERS`、`PW0`、`PW1`、`NAME_CHARS`、`CAP_WORDS`、`CAP_ST`、`CAP_WIN`、`BADGE_SIZE`、`BADGE_SVG`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。

## 时间与组合

设计尺寸 1920×1080，30fps，150 帧（5.00 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
