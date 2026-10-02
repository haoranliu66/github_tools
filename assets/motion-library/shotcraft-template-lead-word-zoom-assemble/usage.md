# lead-word-zoom-assemble

## 画面与用途

首词以 2.3 倍字号占据画面中央、hold 期间继续推近 6%，随后一条曲线同时完成「缩回终字号」与「整行左滑归位」，后续词各自从槽位右侧 0.5em 被推进来；支点横向钉首词中心、纵向钉基线（挂载时实测），整行上移的同一时窗副行浮出，停一拍后整幕 crash-zoom 推近失焦交棒。适合：品牌名/产品名的 Introducing 字卡；发布会式开场第二镜；一句话主张需要"先让一个词占满画面、再把整句补齐"的场合。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_lead_word_zoom_assemble} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={84}>
      <Material_shotcraft_template_lead_word_zoom_assemble />
    </Sequence>
  );
}
```

## 参数

- copy：需要替换的可见文字原文 → 新文案字典；默认通用文字可直接保留，截图文字另行替换图片。
- config：按原始常量名覆盖；同名歧义时用完整源码路径#常量名。该项键：`TEXT`、`HIGHLIGHT_WORD`、`FONT_SIZE`、`INITIAL_SCALE`、`PUSH_SCALE`、`WORD_DELAY`、`WORD_STAGGER`、`WORD_PUSH`、`WORD_FADE`、`LETTER_SPACING`、`LIFT`、`LIFT_DISTANCE`、`SUBLINE`、`CRASH_FRAMES`、`CRASH_SCALE`、`CRASH_BLUR`、`INK`、`INK_DIM`、`ACCENT`、`SANS`、`MESH_BG`、`PUSH_EASE`、`ZOOM_EASE`、`WORD_EASE`。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{}`。
- theme：完整项目 style，仅映射原组件强调色 ACCENT。

## 输入资源

默认组件自包含，不需要上游工作台或远程素材。示例内容可以保留结构；制作具体影片时提供实际文字/数据。

## 时间与组合

设计尺寸 1920×1080，30fps，84 帧（2.80 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
