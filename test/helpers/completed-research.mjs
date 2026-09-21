import {contractMetadata} from '../../apps/repo-researcher/src/editorial-contract.mjs';

export function completedResearchFixture({
  contract,
  fullName = 'fixture/approved',
  score = 4,
  demoStatus = score > 4 ? 'passed' : 'not-run',
} = {}) {
  if (!contract) throw new Error('completedResearchFixture requires an editorial contract.');
  const repositoryName = fullName.split('/').at(-1);
  return {
    status: 'completed',
    blockedReason: '',
    inspectedFiles: ['README.md'],
    project: {
      name: repositoryName,
      url: `https://github.com/${fullName}`,
      versionOrCommit: '248f5ed318a8b32805675f294f39a6627edef653',
      license: 'MIT',
      primaryLanguage: 'JavaScript',
    },
    executiveSummary: '把零散文字整理成清楚的列表。',
    audience: ['需要快速整理文字的人'],
    findings: [{title: '整理文字', detail: 'README 展示了输入和整理后的结果。'}],
    claims: [{
      claim: '项目会清理输入并输出列表项。',
      confidence: 'high',
      evidence: [{source: 'official-readme', detail: 'README 的示例展示了整理前后的文字。'}],
    }],
    demoPlan: [{
      step: '整理一段文字',
      command: demoStatus === 'passed' ? 'node index.mjs' : '',
      expected: '输出列表项',
      status: demoStatus,
    }],
    demoability: {score, confidence: 'high', reason: `fixture score ${score}`},
    limitations: [],
    editorialContract: contractMetadata(contract),
    editorialBrief: {
      intendedViewer: '需要快速整理文字的人',
      familiarProblem: '复制来的文字经常需要手工清理',
      oneSentenceAnswer: '这个项目自动清理文字并输出列表',
      titlePromise: '几秒钟整理一段零散文字',
      concreteExamples: [{
        problem: '输入前后带着多余空格',
        projectAction: '项目清理空格并补上列表符号',
        usefulResult: '结果可以直接放进笔记',
        claimIndexes: [0],
      }],
      bRollPlan: [{
        purpose: '展示整理前后的差别',
        visual: '并排显示原始文字和列表结果',
        claimIndexes: [0],
      }],
    },
    visualEvidencePackage: {
      hookMoment: {
        purpose: '先展示整理后的结果',
        narrationCue: '文字总要手工整理',
        visualMode: 'compare',
        assetIds: [],
        claimIndexes: [0],
        truthMode: 'source-derived-animation',
        leadSeconds: 0.3,
        focalRegion: null,
      },
      visualBeats: Array.from({length: 6}, (_, index) => ({
        id: `beat-${index + 1}`,
        sectionIndex: index % 2,
        role: ['show', 'prove', 'change'][index % 3],
        purpose: `展示第 ${index + 1} 个整理变化`,
        narrationCue: index % 2 === 0 ? '复制来的文字' : '项目自动清理',
        visualMode: ['progressive-flow', 'compare', 'statement'][index % 3],
        assetIds: [],
        claimIndexes: [0],
        truthMode: 'source-derived-animation',
        durationHint: 3,
        leadSeconds: 0.3,
        focalRegion: null,
        stepIndex: null,
        lineNumbers: null,
      })),
      demoMoments: [],
      mechanismSteps: [{
        id: 'tidy',
        label: '整理',
        detail: '清理输入并生成列表',
        claimIndexes: [0],
      }],
      evidenceAssets: [],
      contrastMoments: [{
        id: 'before-after',
        before: '文字需要手工整理',
        after: '文字已经变成列表',
        claimIndexes: [0],
        truthMode: 'source-derived-animation',
      }],
    },
    video: {
      title: '快速整理零散文字',
      fullNarration: '文字总要手工整理，这个开源工具可能会帮到你，它叫 approved。' +
        '复制来的文字经常带着多余空格。项目自动清理格式并输出列表。' +
        '如果你经常独立整理短笔记，可以先收藏 approved。',
      hook: '文字总要手工整理，这个项目可以直接给出列表结果。',
      sections: [
        {heading: '原来的麻烦', narration: '复制来的文字经常带着多余空格。', visual: '展示整理前的文字。'},
        {heading: '项目的处理', narration: '项目自动清理格式并输出列表。', visual: '展示整理后的结果。'},
      ],
      closing: '适合经常整理短笔记的人。',
      visualAssets: [],
    },
  };
}
