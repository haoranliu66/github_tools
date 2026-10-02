# 时间轴横移

镜头沿水平时间轴连续移动，每到一处刻度，对应内容从轴线弹立，最后推近终点。适合版本演进、阶段进程和历史节点；每项包含 label 与任意 content，支持实测局部时长，不内置项目版本或历史事实。

接口：items=[{label,content}], startFrame=12, travelFrames=92, gap=1400, zoomPeak=1.18, theme。建议 2～5 个简短节点。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_timeline_travel。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_timeline_travel} from './motion-library.jsx';
<Material_shotcraft_timeline_travel items={[{label:"早期",content:<First/>},{label:"现在",content:<Current/>}]} theme={style}/>
```
