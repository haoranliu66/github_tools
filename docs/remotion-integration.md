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

视觉 agent 的真实提示词会加载 markup、timing、sequencing、文字测量和 transitions 的完整参考；
存在图片/视频素材时再加图片、裁切与视频嵌入参考。每次生产的 `visual-program-report.json` 和镜头程序均保存
所用插件版本、参考文件摘要及当前 Remotion 版本。快照文件被改动或缺失时明确失败，不静默忽略。

| 能力 | 项目中的使用方式 |
| --- | --- |
| 帧动画、插值和 spring | 进入镜头提示词，生成代码以 beat 相对帧确定状态 |
| Sequence 与多层时间安排 | 提供完整参考，支持专用 JSX 内的分层编排 |
| 文字布局与安全区 | 提供测量参考，仍遵循现有字幕和画面安全区 |
| 图片、视频与裁切 | 有素材时注入相关参考，通过已暂存素材路径使用 |
| 转场 | 提供相关参考；需要额外包的范例只能在包获准接入后使用 |
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
当前允许导入仍为 react、remotion 和镜头 runtime。配音仍使用项目配置的提供方，插件示例不会更换音色或 TTS。
