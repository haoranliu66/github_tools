# 百叶窗错峰转场

整屏内容被分成竖条，每条先收缩旧画面再展开新画面，错峰形成横向推进波，适合翻页、章节推进和对比。前后任意 JSX 需确定性可重复渲染；完成后撤销切条结构，恢复单层完整页面。

接口：before, after, strips=12, startFrame=20, staggerFrames=2, durationFrames=10, theme。切片期间内容会重复渲染，避免带声音的媒体。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_blinds_slice。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_blinds_slice} from './motion-library.jsx';
<Material_shotcraft_blinds_slice before={<OldView/>} after={<NewView/>} theme={style}/>
```
