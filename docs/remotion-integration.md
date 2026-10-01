# Remotion 插件接入

项目读取用户在 Codex 安装的 Remotion 插件，使用其中的制作技能与参考文档。
它与项目已有的 Remotion 渲染依赖配合使用；插件没有独立的模板下载、视频生成或质量评分 MCP 接口。

```powershell
pnpm video:remotion:sync
pnpm video:remotion:check
```

sync 从 `$CODEX_HOME/plugins/cache/openai-curated-remote/remotion/<version>/skills` 发现最新安装版本，
完整读取已选参考后保存到 `integrations/remotion/skills/`，并在 `manifest.json` 记录插件版本、技能版本和逐文件摘要。
不同安装位置可设置 `REMOTION_SKILLS_ROOT` 指向插件的 skills 目录。项目不依赖某个用户的绝对安装路径。
同步来源仅是本机已安装插件，不是目标仓库的规则文件。插件更新后需再次 sync；不会静默改动已锁定快照。

默认导演提示词只常驻总视频规范、选定风格、统一策划案及当前任务。`docs/production-reference-index.json` 指向插件快照；需要时间、序列、文字测量、图片裁切等知识时才读取相关文件，避免全量参考进入上下文。插件快照的完整性仍可通过 check 验证。镜头记录按需引用的索引位置，渲染代码以本项目实际版本执行。

| 能力 | 项目中的使用方式 |
| --- | --- |
| 帧动画、插值和 spring | 按需读取参考，生成代码以 beat 相对帧确定状态 |
| Sequence 与多层时间安排 | 按需读取序列参考，支持专用 JSX 内的分层编排 |
| 文字布局与安全区 | 提供测量参考，仍遵循现有字幕和画面安全区 |
| 图片、视频与裁切 | 需要时读取对应参考，通过已暂存素材路径使用 |
| 转场 | 按需读取相关参考；额外包须实际安装且能离线渲染 |
| Spring 入场与标注 | `./shot-runtime.jsx` 直接导出 `FrameReveal` 与 `FrameAnnotation` |
| Studio 与渲染 | 继续使用项目原有动态入口，Studio 使用 `--no-open` |

专用镜头可使用：

```jsx
import {FrameReveal, FrameAnnotation} from './shot-runtime.jsx';
export default function Shot({frame, fps, accent}) {
  return <FrameReveal frame={frame} fps={fps} start={0} duration={18}>
    <div style={{position: 'relative', width: 480, fontSize: 48}}>
      找回相关记忆
      <FrameAnnotation frame={frame} start={20} duration={18}
        width={380} height={70} kind="underline" color={accent}/>
    </div>
  </FrameReveal>;
}
```

标注支持 highlight、circle、underline 和 box；全部依靠传入的帧数，不用计时器或 CSS 动画。
这些组件是按照插件指导在本项目实现的核心 API 适配，不声称安装了 `@remotion/rough-notation`。
插件示例提及的 `@remotion/media`、transitions、Three.js 等可选依赖不会自动安装或进入允许导入清单。
生成镜头可以导入已安装的浏览器兼容包；不得导入本机文件系统、执行网络访问或使用非确定性计时。配音仍使用项目配置的提供方，插件示例不会更换音色或 TTS。
