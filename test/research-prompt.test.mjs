import assert from 'node:assert/strict';
import test from 'node:test';
import {buildResearchPrompt} from '../apps/repo-researcher/src/prompt.mjs';

test('read-only research prompt forbids repository execution', () => {
  const prompt = buildResearchPrompt({
    fullName: 'acme/rocket',
    repositoryUrl: 'https://github.com/acme/rocket',
    allowRun: false,
  });
  assert.match(prompt, /Do not execute project code/);
  assert.match(prompt, /untrusted content/);
  assert.match(prompt, /not-run/);
  assert.match(prompt, /demoability/i);
  assert.match(prompt, /maximum score is 4/i);
});

test('run-enabled prompt remains constrained to documented quick start', () => {
  const prompt = buildResearchPrompt({
    fullName: 'acme/rocket',
    repositoryUrl: 'https://github.com/acme/rocket',
    allowRun: true,
  });
  assert.match(prompt, /documented quick-start commands/);
  assert.match(prompt, /Do not access user secrets/);
  assert.match(prompt, /demoability/i);
  assert.match(prompt, /maximum score is 7/i);
});
