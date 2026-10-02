# 网格波浪翻面

网格中的哑光背面沿对角波前翻为实际内容，末格轻微过冲回弹，适合功能墙、结果墙或批量信息亮相。items 为任意 JSX，支持列数与尺寸；翻面保持原位，后续信息变化由调用方组合。

接口：items, columns=3, cellWidth=480, cellHeight=230, gap=28, startFrame=20, staggerFrames=6, durationFrames=14, theme。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_grid_wave_flip。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_grid_wave_flip} from './motion-library.jsx';
<Material_shotcraft_grid_wave_flip items={results.map(r=><Result key={r.id} data={r}/>)} theme={style}/>
```
