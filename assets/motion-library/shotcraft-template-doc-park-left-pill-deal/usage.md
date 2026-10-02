# doc-park-left-pill-deal

## 画面与用途

文档不淡出而是向左滑出只露约 35% 宽并微缩到 0.92，右侧按旁白节奏慢速发牌三张白底描边药丸（outBack 弹入），每张落定后其下方字幕逐词加深、下一张到来前整句淡出，左侧文档全程极缓慢自动滚动保持"正在被读"。适合：旁白驱动的"分析结论逐条给出"段落；文档理解、推荐理由、审阅意见类产品的核心说明镜头。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_doc_park_left_pill_deal} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={174}>
      <Material_shotcraft_template_doc_park_left_pill_deal />
    </Sequence>
  );
}
```

## 参数

- copy：需要替换的可见文字原文 → 新文案字典；默认通用文字可直接保留，截图文字另行替换图片。
- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`SANS`、`BG`、`INK`、`TXT`、`DIM`、`LINE`、`SKEL`、`DW`、`DH`、`COLS`、`COL_W`、`DOC_COLS`、`ITEMS`、`PX`、`PY`、`PH`、`PG`、`T0`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。

## 时间与组合

设计尺寸 1920×1080，30fps，174 帧（5.80 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
