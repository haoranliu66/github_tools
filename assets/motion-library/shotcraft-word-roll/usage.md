# 竖向词条滚轮

## 画面与用途

句干保持位置，后半词在竖向滚轮中逐个替换，中心词清晰并染上强调色，相邻词退为模糊灰色。适合受众、能力、对象的并列枚举。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_word_roll} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_word_roll prefix="适用于" words={["个人","团队","企业"]} theme={style}/>
  );
}
```

## 参数

prefix, words, startFrame=20, stepFrames=30, rollFrames=16, rowHeight=100, width=600, fontSize=72, theme。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
