# 竖向词条滚轮

句干保持位置，后半词在竖向滚轮中逐个替换，中心词清晰并染上强调色，相邻词退为模糊灰色。适合受众、能力、对象的并列枚举；传入任意短词、行高和时间，不自动生成文案。

接口：prefix, words, startFrame=20, stepFrames=30, rollFrames=16, rowHeight=100, width=600, fontSize=72, theme。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_word_roll。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_word_roll} from './motion-library.jsx';
<Material_shotcraft_word_roll prefix="适用于" words={["个人","团队","企业"]} theme={style}/>
```
