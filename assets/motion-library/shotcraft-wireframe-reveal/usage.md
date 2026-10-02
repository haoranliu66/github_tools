# 蓝图描线实体化

SVG 蓝图路径错峰描绘，然后一道扫描光把线框替换为实际内容，适合从设计到实现、结构说明或界面首次亮相。调用方提供与内容对齐的路径和 JSX，完成后卸载蓝图与遮罩；不会自动把任意截图转成线稿。

接口：paths=[SVG d], children, startFrame=10, drawFrames=34, staggerFrames=4, scanStartFrame=70, scanFrames=30, theme。paths 与 Composition 同一坐标系。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_wireframe_reveal。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_wireframe_reveal} from './motion-library.jsx';
<Material_shotcraft_wireframe_reveal paths={["M120 160H1800V800H120Z"]} theme={style}><YourLayout/></Material_shotcraft_wireframe_reveal>
```
