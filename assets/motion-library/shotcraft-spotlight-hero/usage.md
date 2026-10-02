# 聚光主角抬升

聚光从几个位置游走后锁定主角，内容透视倾斜并抬升悬浮，轮廓光沿边缘绕行，再回落原位。适合核心对象登场、产品重点和一处功能特写；接收任意子内容与旁注，属于从原镜头抽取的核心动作，不复刻示例页面和截图。

接口：children, note?, width=920, height=450, startFrame=0, durationFrames=150, theme。完整动作在 durationFrames 内完成。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_spotlight_hero。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_spotlight_hero} from './motion-library.jsx';
<Material_shotcraft_spotlight_hero note="核心能力" theme={style}><YourHero/></Material_shotcraft_spotlight_hero>
```
