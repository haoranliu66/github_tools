# 可调用动效 API

从 `./motion-library.jsx` 导入。所有组件使用 Remotion 帧时间；生成镜头在独立 Sequence 内，
`frame` 与 `useCurrentFrame()` 均从本 beat 的 0 开始。不要用全片 duration 当作 beat 时长。
容器组件可接收任意 React 子内容；路径、计数、文字等组件通过各自参数组合。具体作用范围见检索描述和下表。
以下 API 是工具，不是必须套用的画面或固定动作词表。生成器可以自由编写其他 Remotion 表达。

| 导出 | 参数与用途 |
|---|---|
| GradientText | gradient, style, children：可编辑渐变文字 |
| KineticHeadline | text, startFrame=0, staggerFrames=3, style, gradient：按空格词组弹簧出现；中文可按短语插入空格 |
| DrawOnUnderline | width, startFrame=0, durationFrames=18, color, strokeWidth, style：绘制强调线 |
| GhostAhead | tokens 数组, startFrame=0, staggerFrames=6, color, style：先预示后落实的词组构建 |
| DefocusReveal | children, startFrame=0, durationFrames=16, style：固定模糊层的清晰化显现 |
| DipToColor | cutFrame=30, durationFrames=10, color：覆盖层在切换帧前后经过纯色；不会缩短音频时间轴 |
| MatchCut | before, after, anchor, cutFrame=60, zoomPeak=1.15, durationFrames=20：保留锚点，替换周边状态 |
| PerspectivePanel | children, startFrame=0, durationFrames=20, style：透视抬升并展平的界面容器 |
| CascadeGrid | items, renderItem(item,index), columns=3, startFrame=0, staggerFrames=4, style：结果列表级联出现 |
| CountUp | target, startFrame=0, durationFrames=68, style：数值减速落定；只展示已有证据支持的数字 |
| DrawPath | d SVG 路径, startFrame=0, durationFrames=58, color, viewBox, style：关系或轨迹绘制 |
| CameraMove | children, keys=[{frame,x,y,scale}], easing=cinematic/snappy/linear, style：持续的镜头运动 |
| FlowPacket | from={x,y}, to={x,y}, label, startFrame=0, durationFrames=40, color, style：带实际内容的信息传递 |
| FrameReveal | 见 RemotionEffects.jsx：项目已有的帧驱动进入 |
| FrameAnnotation | 见 RemotionEffects.jsx：圈线、框选和高亮 |

生成组件接收 `{frame,durationInFrames,fps,style,accent,assets,scene,beat}`。
`style` 包含 palette、background、typography、geometry、layout、illustration、motion、transitions、captions。
用 `style.typography.heading`、`style.geometry.radius` 等设计画面，字幕区域参考 `style.layout.captionSafeBottom`。
图片可用 `<Img src={staticFile(assets.find(a=>a.id==='id').src)}/>`，也可使用策划案列出的已暂存相对路径。
禁止虚构图片文件路径。没有合适素材时，可以直接绘制 SVG/HTML/Canvas。

专用组件通过 exportName、module 和实际演示按需读取；项目素材仅在对应项目可用。

## 本轮扩展接口

| 导出 | 参数 |
|---|---|
| CardFlip | before/after 任意 JSX, startFrame=30, durationFrames=45, backdrop, style：实际双面透视翻转 |
| BrushReveal | children, startFrame=0, durationFrames=12, strokes=3, direction=left/right, style：多段画笔显示 |
| BrowserFrame | children, url, startFrame=0, width=1400, height=650, theme=完整风格, style：容器，不是预制静态卡片 |
| CodeDiff | lines=[{text,type:add/remove/context}], title, startFrame=0, lineDelay=5, fontSize=34, theme=完整风格, style：逐行显示实际示例改动 |
| AccentTypewriter | text, startFrame=0, framesPerChar=3, fadeFrames=5, color, accent, style：用户输入，可自行组合搜索与结果 |
