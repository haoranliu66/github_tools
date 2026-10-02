# 暖光闪切

暖白光从中心短暂扩亮后消失，适合一次强调拍或跨段落的硬切遮盖。它是无交互覆盖层，需与前后内容切换组合；不会改变镜头或旁白时长。

接口：startFrame=20, durationFrames=10, color=暖白 CSS 颜色, peak=.85。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_flash_cut。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_flash_cut} from './motion-library.jsx';
<Material_shotcraft_flash_cut startFrame={30} durationFrames={12}/>
```
