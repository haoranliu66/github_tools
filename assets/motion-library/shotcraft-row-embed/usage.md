# 逐行嵌入

内容行从上方飞入，透视角逐步展平，在落地瞬间沿底边展开强调色细缝，适合结构化结果进入列表、字段填充和详情逐步建立。items 接收任意 JSX，按实际内容布局；去除原镜头的截图裁片与相机依赖。

接口：items, startFrame=12, staggerFrames=9, durationFrames=12, gap=18, width=1400, theme。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_row_embed。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_row_embed} from './motion-library.jsx';
<Material_shotcraft_row_embed items={rows.map(r=><YourRow key={r.id} data={r}/>)} theme={style}/>
```
