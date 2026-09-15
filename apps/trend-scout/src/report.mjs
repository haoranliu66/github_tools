import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

function escapeCell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replace(/\s+/g, ' ').trim();
}

function displayScore(value) {
  return value === null || value === undefined ? '-' : value;
}

function primaryFunctionFields(repo) {
  const description = typeof repo.description === 'string' ? repo.description.trim() : '';
  return description
    ? {primaryFunction: description, primaryFunctionSource: 'github-description'}
    : {primaryFunction: '待 repo-researcher 补充', primaryFunctionSource: 'unavailable'};
}

function discoveryPool(repo) {
  if (repo.discovery_source?.startsWith('growth:')) return 'growth';
  if (repo.discovery_source?.startsWith('active-stars:')) return 'active-stars';
  return null;
}

function discoveryPoolLabel(value) {
  if (value === 'growth') return '高增长';
  if (value === 'active-stars') return '高总 Stars';
  return '-';
}

export function summarizeRankingRows(rows) {
  const eligibleRows = rows.filter((row) => row.eligibleForResearch !== false);
  return {
    eligible: eligibleRows.length,
    ready: eligibleRows.filter((row) => row.canClaimSevenDayGrowth).length,
    coldStart: eligibleRows.filter((row) => row.growthMeasurementStatus === 'cold-start').length,
    notRediscovered: rows.filter((row) => row.rankingStatus === 'not-rediscovered').length,
  };
}

export function writeRankingReport(ranking, outputDirectory, date, {weekId = null} = {}) {
  mkdirSync(outputDirectory, {recursive: true});
  let eligibleRank = 0;
  const rows = ranking.map(({repo, metrics}) => ({
    rank: metrics.eligibleForResearch === false ? null : ++eligibleRank,
    weekId,
    fullName: repo.full_name,
    url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stars: repo.stars,
    forks: repo.forks,
    license: repo.license,
    topics: repo.topics,
    discoveryPool: discoveryPool(repo),
    lastDiscoveredWeek: repo.last_discovered_week ?? weekId,
    ...primaryFunctionFields(repo),
    ...metrics,
  }));
  const eligibleRows = rows.filter((row) => row.eligibleForResearch !== false);
  const omittedRows = rows.filter((row) => row.rankingStatus === 'not-rediscovered');
  const hasColdStartRows = eligibleRows.some((row) => !row.canClaimSevenDayGrowth);

  const markdown = [
    `# GitHub 周度候选榜 · ${date}`,
    '',
    hasColdStartRows
      ? '> ⚠️ 冷启动：本地快照尚不足七日。标为冷启动的数值不得表述为“过去七日本地增长”；它只是 GitHub Trending 页面信号。'
      : '> 本榜单增长数值均已使用本地七日净增长快照。',
    '',
    `> 周期：${weekId ?? 'legacy'}。本榜基础趋势分最高 93 分；最终创作项目由人工决定。`,
    '',
    '> “未重新发现”是选题业务状态：该项目本周趋势分按 0 计，但真实 Star 增长字段不会被伪造成 0。',
    '',
    '> 趋势分最高 93 分：七日绝对增长 30 + 七日相对增长 15 + 七日增长加速度 10 + 七日维护活跃度 8 + 周初总 Stars 30。绝对增长 5000 为 0 分，此后每增加 5000 连续增加 3 分。相对增长和加速度的最小保护分母均为 5000。',
    '',
    '> 可演示性由 repo-researcher 在研究后评 0–7 分；未研究时为“待研究”。最终总分最高 100 分，但不替代人工选题。',
    '',
    '| # | 项目 | 发现配额 | 主要功能 | 增长信号 | 总 Star | 趋势分 / 93 | 绝对 / 30 | 相对 / 15 | 加速 / 10 | 维护 / 8 | 规模 / 30 | 可演示性 / 7 | 状态 | 口径 |',
    '|---:|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|',
    ...eligibleRows.map((row) =>
      `| ${row.rank} | [${escapeCell(row.fullName)}](${row.url}) | ${discoveryPoolLabel(row.discoveryPool)} | ${escapeCell(row.primaryFunction)} | ${row.growth} | ${row.stars} | ${row.trendScore} | ${row.absoluteGrowthScore} | ${displayScore(row.relativeGrowthScore)} | ${displayScore(row.accelerationScore)} | ${row.maintenanceActivityScore} | ${row.totalStarsScore} | ${row.demoabilityScore === null ? '待研究' : row.demoabilityScore} | ${row.scoreStatus} (${row.scoreCompleteness}/93) | ${escapeCell(row.growthLabel)} |`,
    ),
    '',
    '## 编辑提示',
    '',
    ...eligibleRows.map((row) =>
      `${row.rank}. **${row.fullName}**：主要功能：${escapeCell(row.primaryFunction)}。  ` +
      `最近推送约 ${row.freshnessDays} 天前；评分完整度 ${row.scoreCompleteness}/93；` +
      `增长口径：${row.growthLabel}；可演示性：${row.demoabilityScore === null ? '待研究' : `${row.demoabilityScore}/7`}；` +
      `${row.missingLicense ? '⚠️ 未检测到许可证（仅警告，不扣分）。' : `许可证 ${row.license}。`}`,
    ),
    '',
    '## 本周未重新发现（业务分 0）',
    '',
    omittedRows.length
      ? '| 项目 | 上次发现周 | 实际增长观测 | 原始趋势分 | 业务趋势分 | 状态 |'
      : '无。',
    ...(omittedRows.length ? [
      '|---|---|---:|---:|---:|---|',
      ...omittedRows.map((row) =>
        `| [${escapeCell(row.fullName)}](${row.url}) | ${escapeCell(row.lastDiscoveredWeek)} | ${row.growth ?? '-'} | ${row.rawTrendScore ?? '-'} | 0 | not-rediscovered |`,
      ),
    ] : []),
    '',
  ].join('\n');

  const markdownPath = join(outputDirectory, `${date}.md`);
  const jsonPath = join(outputDirectory, `${date}.json`);
  writeFileSync(markdownPath, markdown, 'utf8');
  writeFileSync(jsonPath, `${JSON.stringify(rows, null, 2)}\n`, 'utf8');
  return {markdownPath, jsonPath, rows};
}
