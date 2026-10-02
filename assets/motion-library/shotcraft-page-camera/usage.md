# 页面 2.5D 运镜

同一页面按焦点关键帧平移、缩放和透视倾斜，适合从全局进入局部、扫描长页面或追随界面证据。接收本地图片或任意 JSX；焦点采用页面坐标。保持焦点居中，文字采用布局缩放；不自动识别重点。

接口：src?（本地 staticFile 路径）, children?, pageWidth=1920, pageH=1080, keys=[{frame,cx,cy,zoom,rotX?,rotY?,rotZ?,persp?}], theme, frame?。关键帧必须严格递增，zoom/persp 为正数。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_page_camera。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_page_camera} from './motion-library.jsx';
<Material_shotcraft_page_camera theme={style} pageH={1300} keys={[{frame:0,cx:960,cy:500,zoom:0.85},{frame:80,cx:1100,cy:740,zoom:1.25,rotY:12}]}><YourPage/></Material_shotcraft_page_camera>
```
