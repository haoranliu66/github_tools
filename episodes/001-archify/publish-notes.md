# Archify：让架构图有据可查

AI 画的架构图很好看，但它画对了吗？本期拆解开源项目 Archify 的工作方式：先用 JSON 表达组件和关系，再由工具校验与渲染，把图变成可检查、可修改的技术沟通材料。

本片为源码研究解说，不是端到端产品实测。画面包含仓库提供的官方示例、源码摘录和本片制作的机制动画；官方截图均有来源标识。旁白由本机 Microsoft Huihui Desktop 合成。

## 项目与数据

- 项目：[tt-a1i/archify](https://github.com/tt-a1i/archify)
- 固定源码：[06dd052602dd9a369e4d034e24faef0917b5a60c](https://github.com/tt-a1i/archify/tree/06dd052602dd9a369e4d034e24faef0917b5a60c)
- 本次快照：2026-09-04，46,987 stars；不同抓取时刻的实时数字可能变化。
- 本次候选分数：93.65，总 stars 权重 15%。这是我们自己的选题指标，不是 GitHub 官方评分。
- 当前增长信号仍属 Trending 冷启动；本片没有宣称本地连续七天净增。

## 主要证据

- [工作原理与边界：README](https://github.com/tt-a1i/archify/blob/06dd052602dd9a369e4d034e24faef0917b5a60c/README.md)
- [五种图类型与交付流程：CLI 源码](https://github.com/tt-a1i/archify/blob/06dd052602dd9a369e4d034e24faef0917b5a60c/archify/bin/archify.mjs)
- [视频 JSON 摘录：api-sql 连接](https://github.com/tt-a1i/archify/blob/06dd052602dd9a369e4d034e24faef0917b5a60c/docs/gallery/sources/web-app.architecture.json#L37)
- [官方阅读器示例图](https://github.com/tt-a1i/archify/blob/06dd052602dd9a369e4d034e24faef0917b5a60c/docs/assets/archify-menu.png)
- [官方时序图示例](https://github.com/tt-a1i/archify/blob/06dd052602dd9a369e4d034e24faef0917b5a60c/docs/assets/archify-sequence.png)

## 素材与许可

Archify 自有代码与文档采用 MIT；版权署名：Copyright (c) 2026 tt-a1i (Archify)，Copyright (c) 2025 Cocoon AI。完整许可证及第三方声明随成片保存在 `licenses/`。第三方名称、商标及标志仍属于各自权利人，不表示赞助或背书。

官方示例图用于项目介绍，画面有缓慢缩放及局部放大。没有使用来源不明的背景音乐或广告素材。本片尚未上传任何平台。

## 研究方法与联调说明

独立 Codex 研究子进程因 Windows 沙箱初始化助手取消（1223）受阻，本期证据包由主助手直接核验已有源码后生成，没有伪称自动研究已成功。

联调中原有 `node --test` 递归发现并误执行了克隆仓库的部分测试，发现后立即中止。现已改为只枚举 zimeiti 自身 `test/`，并有回归测试。该次误执行不作为功能测试结果；本期没有完成端到端运行演示。详见项目联调报告。

## 复现本期

在 `D:\zimeiti` 中运行：

```powershell
# 测试范围固定为 zimeiti/test，不递归运行克隆仓库。
pnpm test

# 输出目录必须为新目录，保留旧版本。
node scripts/prepare-episode.mjs episodes/001-archify/episode.json output/video/001-archify-new-cut
pnpm video:render -- --storyboard output/video/001-archify-new-cut/storyboard.json --output output/video/001-archify-new-cut/video.mp4
```

该命令复用本期已审校的固定选题脚本，不会自动换成一个新项目。全自动研究恢复仍需 Windows 沙箱初始化授权。
