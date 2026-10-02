# 时钟扫描转场

扫描边界从十二点顺时针旋转，将前一页面擦成后一页面，适合状态刷新、数据更新或整屏交接。前后接收任意 JSX；扫描完成后卸载旧页面和遮罩，保留完整新页面。

接口：before, after, startFrame=30, durationFrames=60, color?, theme。按 Composition 尺寸计算扫描半径。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_clock_wipe。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_clock_wipe} from './motion-library.jsx';
<Material_shotcraft_clock_wipe before={<OldView/>} after={<NewView/>} theme={style}/>
```
