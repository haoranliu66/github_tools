# modern-light 完整宣传片模板

## 画面与用途

36.2 秒完整宣传片，采用浅色底与蓝色强调主题：品牌开场与聚光主角、卡组飞入、搜索筛选、详情、论文列表、周报，最后组装成品牌字标。适合知识管理或多模块工具的连续功能宣传；保留截图与布局依赖，可选配本地原音效，默认静音。

## 最小调用

```jsx
import React from 'react';
import {Sequence} from 'remotion';
import {Material_shotcraft_template_film_modern_light} from './motion-library.jsx';

export default function Shot({style}) {
  return (
    <Sequence durationInFrames={1085}>
      <Material_shotcraft_template_film_modern_light />
    </Sequence>
  );
}
```

## 参数

- copy：需要替换的可见文字原文 → 新文案字典；默认通用文字可直接保留，截图文字另行替换图片。
- originalProps：透传原组件输入，优先于默认输入；默认数据形状：`{"theme":"modern-light"}`。
- originalProps.theme：该完整片默认主题为 modern-light，保持对应视觉预设。
- screenshots/layout：图片路径字典和与图片一致的完整页面坐标；见输入资源。
- audio：原音效文件名 → 已暂存音频路径；默认 {} 静音。config.SFX 为音效时点/音量数组，见输入资源。

## 输入资源

保留截图依赖，默认使用已嵌入的本地中性 PNG。替换时，screenshots 的键使用原始 textures/live/文件名.png，值为影片 public 中已暂存路径；同步整页/裁片尺寸、文件名和完整 layout。截图里的文字需要重新截图，不能只传 copy。

可选原音效：11 个 MP3、32 个时点，默认静音。运行 video:library audio --id shotcraft-template-film-modern-light 获取文件清单和完整 config.SFX；不要把 [内嵌音效配置](optional-audio.json)的编码数据读进上下文。将选用音频作为本片实际素材暂存，按原文件名映射到已暂存路径，并传入对应 config.SFX。

单声音示例：在策划中登记 id=pop 的实际音频素材后，镜头可使用：

```jsx
const originalAudio = {
  audio: {'pop.mp3': assets.find(a => a.id === 'pop').src},
  config: {SFX: [{from: 840, src: 'pop.mp3', volume: 0.4}]}
};
<Material_shotcraft_template_film_modern_light audio={originalAudio.audio}
  config={originalAudio.config} />
```

完整原音效使用查询返回的全部 SFX；也可只保留所需文件和时点。旁白、音效与 BGM 分别混音。[有声演示](demo-with-audio.mp4)。

## 时间与组合

设计尺寸 1920×1080，30fps，1085 帧（36.17 秒）。保持本模板局部时间和设计时长；Sequence 负责在实测旁白时间轴中的位置。不能只延长全片而改变 useT 的归一化动画。固定模板超出当前镜头时长时，调整镜头选择/编排并检查接缝；输入文案、字形或页面几何变化后检查实际预览。

## 按需深入

- [当前源码](component.jsx)：只有需要确认具体接口或实现时读取。
- [实际演示](demo.mp4)：用于解决效果疑问；制作中检查当前镜头的实际预览。
- 专项 Remotion 问题用 video:library references --query 主题，只读命中的当前问题参考。
