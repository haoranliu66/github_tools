# 风格库使用与新增规范

风格定义一套可复用的配色、文字、构图、材质和运动语言。当前库以文字为唯一风格参考，风格目录中的图片已由文字风格卡替换。影片实际使用的照片、录屏或视频仍作为该片素材单独准备。

## 按需选择与使用

人工按视觉气质和表达场景选择风格，可使用以下检索命令辅助判断。通过 --style STYLE_ID 将确认结果交给主 Agent；研究只读取该项文字卡，不自行改选。把对应 style.json 通过策划案本地链接交给导演。导演使用已准备风格，不默认重新检索全库。

```powershell
pnpm video:library search --type style --query "剪纸拼贴 手写箭头 知识故事" --limit 5
pnpm video:library style --id mixed-media-collage
pnpm video:library style --id mixed-media-collage --section motion
pnpm video:library style --id mixed-media-collage --section tokens
```

检索只返回 ID、名称、简短描述和相关性；style 返回单项文字卡。--section 支持 purpose、color、typography、composition、materials、motion、captions、adaptation、tokens。已读且未变化的说明可复用。不要预载完整配置、所有风格卡或来源档案。

## 统一文字描述

config/style-library.json 是风格的唯一编辑源。每项包含简短 description、完整 visualDescription 和原有渲染参数。assets/style-library/<id>/description.md 是由 style-library.mjs 的 styleMarkdown 函数根据这些字段生成的文字卡，保持与配置同步。

| 部分 | 必须说明的内容 |
|---|---|
| 风格概述 | 有辨识度的视觉气质、运动特点与适用场景 |
| 配色与层级 | 背景、正文、次级信息、强调色与前后层 |
| 字体与文字 | 中文可用字体或回退、标题字重、字号关系和文字的画面角色 |
| 构图与空间 | 对齐方式、主次关系、主体位置、留白和景别变化 |
| 材质与图形 | 纸纹、玻璃、颗粒、线条、图形或体积感的构造方式 |
| 运动与转场 | 时间气质、运动方向、落点、语义停顿和连续关系 |
| 字幕 | 字色、底条、重点标记、位置和与画面文字的分工 |
| 画幅适配 | 横竖屏重排、标题换行、字幕安全区和对象连续性 |

description 帮助选型，不堆接口和来源研究。文字卡描述实际可执行的设计，不以“高级”“炫酷”等词代替构图与材料说明。配色与尺寸采用本项目配置；按实际文字长度、画幅和实测旁白调整。风格是设计语言，动效从动效库选择或自由编写，没有固定动效配额。

## 新增与维护

新增风格沿用相同字段结构，保留可直接供制作使用的 palette、background、typography、geometry、layout、illustration、motion 和 captions。配色、字体、构图、材质与运动形成一致设计；不同风格要有可辨识差异。只修改颜色的变体应明确保持了哪套构图与运动。

中文字体使用本机可用字体或明确回退。参数与文字描述必须一致；外部素材按具体影片需要准备。新增与修改后同步生成文字卡并刷新生产参考索引，使用 validateStyleCatalog 校验必需文本、渲染字段、唯一 ID 与无图片依赖。

公开趋势、品牌案例、参考链接及提取依据独立保存在 integrations/style-sources，不进入生产风格配置或导演提示词。原始趋势用于选择视觉方向；本项目的色值、布局尺寸、中文字体与制作说明为适配后的设计。

目录或规范变化后按当前制作门禁校验相关计划，历史验证保留当时摘要。[制作流程](video-production-workflow.md)与[动效规范](motion-library.md)说明完整生产入口。

## 文字风格卡目录

以下目录供人查看；Agent 仍按描述检索后只读选中项。

| 新增风格 | ID | 辨识特点 |
|---|---|---|
| [节拍大字报](../assets/style-library/kinetic-type-pop/description.md) | kinetic-type-pop | 高对比、超大粗字、字重脉冲和硬切 |
| [手工混媒拼贴](../assets/style-library/mixed-media-collage/description.md) | mixed-media-collage | 撕边纸片、手写标记和停格贴入 |
| [复古数字桌面](../assets/style-library/retro-digital/description.md) | retro-digital | 早期窗口、像素网格、指针和步进变化 |
| [留白杂志讲解](../assets/style-library/calm-editorial/description.md) | calm-editorial | 衬线标题、编辑栏式布局、舒展停顿 |
| [电影纪实叙事](../assets/style-library/cinematic-documentary/description.md) | cinematic-documentary | 全景到特写、时间标记、资料裁片 |
| [触感三维小景](../assets/style-library/tactile-miniature/description.md) | tactile-miniature | 圆润哑光物件、接触阴影、拼装与回弹 |
| [梦核超现实](../assets/style-library/dreamcore-surreal/description.md) | dreamcore-surreal | 雾蓝淡紫、悬浮物件、尺度错位和缓慢穿行 |
| [流光玻璃产品](../assets/style-library/liquid-glass-product/description.md) | liquid-glass-product | 半透明圆角层、动态高光、连续变形 |

原有风格同样使用文字卡：

| 风格 | ID |
|---|---|
| [纸面编辑风](../assets/style-library/editorial-paper/description.md) | editorial-paper |
| [深色产品演示](../assets/style-library/dark-cinematic/description.md) | dark-cinematic |
| [手绘讲解](../assets/style-library/ink-notebook/description.md) | ink-notebook |
| [明亮几何风](../assets/style-library/bold-geometric/description.md) | bold-geometric |
| [复古牛皮纸](../assets/style-library/shotcraft-vintage-kraft/description.md) | shotcraft-vintage-kraft |
| [深海](../assets/style-library/shotcraft-deep-ocean/description.md) | shotcraft-deep-ocean |
| [黑曜紫](../assets/style-library/shotcraft-obsidian-violet/description.md) | shotcraft-obsidian-violet |
| [现代浅色](../assets/style-library/shotcraft-modern-light/description.md) | shotcraft-modern-light |
| [午夜深色](../assets/style-library/shotcraft-midnight/description.md) | shotcraft-midnight |
| [鼠尾草](../assets/style-library/shotcraft-solar-pop/description.md) | shotcraft-solar-pop |
| [珊瑚](../assets/style-library/shotcraft-coral-burst/description.md) | shotcraft-coral-burst |
| [鸢尾](../assets/style-library/shotcraft-color-play/description.md) | shotcraft-color-play |
| [纸墨印刷](../assets/style-library/shotcraft-ink-press/description.md) | shotcraft-ink-press |
