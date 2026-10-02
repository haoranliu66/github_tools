# 机械数字滚轮

## 画面与用途

数值的每个数字列滚过一整轮，再错峰停在目标字符，适合版本号、计数和已核实指标的强调落定。

## 最小调用

```jsx
import React from 'react';
import {Material_shotcraft_digit_roll} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Material_shotcraft_digit_roll value="1,280" theme={style} fontSize={96}/>
  );
}
```

## 参数

value, startFrame=0, staggerFrames=4, durationFrames=22, fontSize=76, color?, theme。

## 输入资源

不依赖额外截图或音频；内容、标签和 JSX 由调用方提供。已安装 react/remotion。

## 时间与组合

所有时间参数为镜头局部帧，使用当前 Composition 的 fps；完整动作区间由该项 durationFrames、travelFrames 或分段时间决定。theme 传完整项目 style；不把全片时长当作局部动作时长。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
