# 多源曲线汇流

多路来源先建立曲线连接，信息包沿曲线传递，随后来源缩小汇入共同目标，连接撤回后保留结果。适合多源整合、聚合或统一入口；来源标签和结果由调用方传入，SVG 曲线与节点使用同一几何，不代表真实网络请求。

接口：sources=[短标签], target, startFrame=0, durationFrames=150, theme。1～6 路建议，更多会压缩间距。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_bezier_merge。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_bezier_merge} from './motion-library.jsx';
<Material_shotcraft_bezier_merge sources={["文档","对话","代码"]} target="统一检索" theme={style}/>
```
