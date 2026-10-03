# 动效库使用与新增规范

本手册统一定义动效的检索、复用和新增规则。Agent 从当前镜头的画面需要出发，先检索描述，选中后读取该项用法，再按具体问题读取源码、演示或专项参考。无需预读全库。完整制作契约仍来自项目的 video-production-quality 总规范。

<a id="search"></a>

## Agent 的读取顺序

1. 描述本镜的主体、运动、结果和用途，运行 search；默认返回 5 个候选的 id、description 和相关性信息。
2. 根据描述选中动效，运行 usage --id；只读取当前准备使用的动效。已读且未变化的说明可复用。
3. 实现前确认参数、资源、局部时间与组合边界；后续可用 --section 只读所需部分。
4. 只有存在具体疑问时，通过 show 定位源码/演示，或通过 references 查询专项制作参考。实际预览用于检查当前镜头与接缝。
5. 策划和导演状态只记录选中/实际使用的 libraryIds、简短实现理由和真正使用的资源；未选候选与读取过程不进入交付。

```powershell
pnpm video:library search --query "在截图上输入查询，筛选结果，再进入详情" --limit 5 --repo owner/name
pnpm video:library usage --id shotcraft-template-type-and-filter --repo owner/name
pnpm video:library usage --id shotcraft-template-type-and-filter --section assets --repo owner/name
pnpm video:library show --id shotcraft-template-type-and-filter --repo owner/name
pnpm video:library references --query "图片"
```

search 只提供描述，不读取组件源码、演示或用法正文。show 只返回选中条目的路径。usage 只返回选中条目的使用说明。list 是分页维护工具，默认 20 条；无参数命令显示简短帮助。

检索返回的 description 必须突出本项动效的辨识特点和适用场景，按“主体如何运动 → 最终画面/节奏特点 → 适合表达什么”写成一段。同一类的不同变体分别描述，不能共用含混的 A/B 选型说明。以下两种网格动效即使都适合功能墙，也需要明确区别：

- 逐格点亮：暗色网格的边框依次描亮，内容随之变亮抬升，最后轻推收束。适合功能墙原位逐区唤醒、从暗场介绍多项能力。
- 波前翻面：灰背卡沿对角线依次原位翻转，翻出正面内容，末张过冲回弹。适合功能墙、结果墙或成批信息的揭晓。

描述不以“炫酷”“完整模板”“通用动效”代替效果说明，不堆缓动公式、接口参数、来源注释或评审词。只保留影响选型的边界，例如“依赖截图”“整屏转场”“默认静音”；具体文件键、调用参数和帧数留给 usage。

Agent 不批量读取 config/motion-library.json、production-reference-index.json、所有 usage、来源档案或所有 Remotion 参考。来源/许可/评审资料只在相应审查任务中读取。不得把内嵌图片、音频或视频的编码数据作为提示词内容。

<a id="base-api"></a>
<a id="shotcraft-core"></a>

## 每个动效的使用说明

每项材料在自己的 assets/motion-library/<id>/usage.md 中使用相同的六部分。它是该项接口的直接入口，不要求跳到整本全局 API 才能调用。

| 部分 | 必须说明什么 | 单独读取 |
|---|---|---|
| 画面与用途 | 可见主体、运动、结果、适用场景与必要边界 | --section purpose |
| 最小调用 | 完整 JSX 镜头示例，实际 exportName、桥接导入和必要参数 | --section example |
| 参数 | 必填值、默认值、类型或数据形状、主题接口；只列本项参数 | --section parameters |
| 输入资源 | 本项所需的截图/布局/图片/视频/音频/额外依赖，以及替换方法；无外部资源也明确说明 | --section assets |
| 时间与组合 | 局部帧、fps、固定或可变时长、容器尺寸及相邻镜头注意事项 | --section timing |
| 按需深入 | 当前组件源码、实际演示和确有需要的专项说明链接 | --section references |

说明只描述本项用法，不附来源评审、安装回顾、文案替换审计、大量 CSS 字符串键、所有主题或未使用模板。完整参数的特殊问题再读对应源码；演示值不作为正在制作的项目事实。

## 视频生产中的复用

当前镜头从生成的 ./motion-library.jsx 导入 usage 中的 exportName。组件可组合，也可按表达需要编写 JSX/SVG/Canvas；没有动效类型或数量配额。

动画使用 Remotion 帧时间。Sequence 内的 frame/useCurrentFrame 从本镜局部 0 开始；不可用全片时长替代当前镜头时长。计时先依据已生成并测量的旁白，再落实镜头区间。完整模板按该项用法中的设计 fps 和时长使用。

style 为共享视觉设计。只有明确提供 theme 接口的组件才传 theme={style}；完整片的主题预设使用自己的 originalProps.theme。实际图片、视频和音频先暂存到本片资源中，并通过真实资源路径使用；不虚构文件名。

<a id="full-templates"></a>

## 截图与完整模板

截图模板继续依赖截图。默认本地截图与页面结构可以直接用于示例；替换真实页面时，同步截图、裁片和匹配的 layout。PNG 中的文字需要重新截图，copy 不能修改像素里的字。

具体模板所需的文件键、结构和关联查询字段只在该项 usage 的输入资源部分说明。需要调整常量时，读取该项参数部分；有同名常量时用完整源码路径#常量名定位。

<a id="optional-audio"></a>

## 可选原音效

有可选音效的模板在 show 中返回配置与有声演示路径。先按需读取音效文件和时点元信息，不把 optional-audio.json 中的 Base64 读进上下文：

```powershell
pnpm video:library audio --id shotcraft-template-film-ink-press
pnpm video:library usage --id shotcraft-template-film-ink-press --section assets
```

audio 返回文件名、共享本地路径、摘要和 config.SFX。将选用音频登记为本片实际使用素材，暂存到影片 public；组件的 audio 按原文件名映射到已暂存路径。选用完整原音效时使用全部 config.SFX；也可选择部分声音并调整时点/音量。默认静音，音效、旁白与 BGM 分别选择和混音。

<a id="styles-and-dependencies"></a>
<a id="catalog"></a>

## 按需目录与参考

动效清单以 search 为生产检索入口；维护时用 list --offset N --limit N 分页查看。人可通过 [Shotcraft 画廊](../assets/motion-library/shotcraft-gallery.html) 查看完整模板与原音效演示。

人工可先用 search --type style 检索描述，再用 style --id 查看单项并通过 --style 指定；研究只使用人工确认的选择；统一规则见 [风格库规范](style-library.md)。专项 Remotion 参考通过 references --query 查询，只有命中当前问题的文件才读取。[生产参考索引](production-reference-index.json)保存路径元信息供工具维护，不作为 Agent 的全量上下文输入。

<a id="maintenance"></a>

## 新增与适配动效

新增沿用相同流程，登记前完成以下内容：

- description 写清可见运动、辨识特点和适用场景，用“适合/适用/用于”明确用途；同类变体分别描述。必要边界可说明，源码注释、接口表、缓动公式、许可或评审词不进入检索描述。
- 提供可运行离线帧组件、实际演示、符合六部分结构的 usage.md，以及表达场景 supports。最小示例使用真实导出名，必要输入均就绪。
- 截图依赖保留并说明匹配布局；固定文案区分通用与专用；音效明确可选性；额外依赖在项目中实际安装后再登记。只说明本项需要的输入。
- 用本项目实际导入、参数替换和局部预览验证适配；查看相关画面与接缝。技术检查与视觉检查分别记录，具体影片仍由人工完整观看试听决定批准。
- 来源、固定提交、许可、修改审计和验证证据独立保存在 integrations/motion-sources；不放进生产描述或单项用法。

请求 JSON 的 module、demo、usageFile 路径相对于请求文件。登记使用：

```json
{
  "id": "your-motion",
  "description": "内容由模糊逐渐变清晰，重点区域最后锁定。适合结果揭晓和重点说明。",
  "module": "component.jsx",
  "demo": "demo.mp4",
  "usageFile": "usage.md",
  "supports": ["结果揭晓", "重点说明"],
  "dependencies": ["react", "remotion"],
  "reuseScope": "universal"
}
```

module 默认导出组件；本例的桥接导出名为 Material_your_motion，最小调用必须真正导入并调用它。项目专用项使用 reuseScope=project 并填写 sourceProject=owner/name，检索时保持相同 --repo 范围。

```powershell
pnpm video:library add --request material.json
pnpm video:library check --id your-motion
pnpm video:library search --query "该动效的实际画面需要"
```

add 在写入前校验描述中的用途、排除实现/评审内容，并校验必需字段、六部分用法和完整 JSX 示例；不合格请求不会创建动效目录。登记后自动更新参考索引。后续修改同步 description、单项用法和演示，避免保留过期说明。

规范或库摘要变化后，旧策划和批准按现行门禁重新校验；历史验证保留原摘要，不改写成新规范下的批准。[现行制作流程](video-production-workflow.md)说明完整生产入口。
