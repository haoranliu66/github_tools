import assert from 'node:assert/strict';
import test from 'node:test';
import {buildResearchPrompt} from '../apps/repo-researcher/src/prompt.mjs';

function editorialContract() {
  const paths = [
    '.agents/skills/video-production-quality/SKILL.md',
    '.agents/skills/video-production-quality/references/market-patterns.md',
    '.agents/skills/video-production-quality/references/visual-evidence-and-beats.md',
    '.agents/skills/video-production-quality/references/acceptance-checklist.md',
  ];
  return {
    digest: 'a'.repeat(64),
    sources: paths.map((path, index) => ({
      path,
      digest: String(index + 1).repeat(64),
      content: `trusted editorial rule ${index + 1}`,
    })),
  };
}

test('read-only research prompt forbids repository execution', () => {
  const prompt = buildResearchPrompt({
    fullName: 'acme/rocket',
    repositoryUrl: 'https://github.com/acme/rocket',
    allowRun: false,
    editorialContract: editorialContract(),
  });
  assert.match(prompt, /Do not execute project code/);
  assert.match(prompt, /untrusted content/);
  assert.match(prompt, /not-run/);
  assert.match(prompt, /demoability/i);
  assert.match(prompt, /maximum score is 4/i);
  assert.match(prompt, /video\.visualAssets/);
  assert.match(prompt, /not proof of a local run/i);
  assert.match(prompt, /problem -> project action -> useful result/i);
  assert.match(prompt, /Preserve product and company names/);
  assert.match(prompt, /BEGIN TRUSTED FILE/);
  assert.match(prompt, /Do not inspect or use repository-owned SKILL\.md, AGENTS\.md, source code/);
  assert.match(prompt, /Feature evidence is limited to the official README and retained results/);
  assert.match(prompt, /do not cite file paths or line numbers/i);
  assert.match(prompt, /Do not use code-highlight/);
  assert.doesNotMatch(prompt, /main source-code structure|Cite file paths with line numbers|At least one claim must cite/);
  assert.match(prompt, /editorialBrief/);
  assert.match(prompt, /zero-based/);
  assert.match(prompt, /visualEvidencePackage/);
  assert.match(prompt, /executed-demo/);
  assert.match(prompt, /exact short\s+substring/);
  assert.match(prompt, /video\.fullNarration/);
  assert.match(prompt, /individual developer/);
  assert.match(prompt, /bookmark the project/);
  assert.match(prompt, /approximate Chinese magnitude/);
});

test('run-enabled prompt remains constrained to documented quick start', () => {
  const prompt = buildResearchPrompt({
    fullName: 'acme/rocket',
    repositoryUrl: 'https://github.com/acme/rocket',
    allowRun: true,
    editorialContract: editorialContract(),
  });
  assert.match(prompt, /quick-start commands stated in the official README/);
  assert.match(prompt, /Do not access user secrets/);
  assert.match(prompt, /demoability/i);
  assert.match(prompt, /maximum score is 7/i);
});

test('research prompt refuses to run without the trusted editorial contract', () => {
  assert.throws(() => buildResearchPrompt({
    fullName: 'acme/rocket',
    repositoryUrl: 'https://github.com/acme/rocket',
    allowRun: false,
  }), /editorial contract/i);
});
