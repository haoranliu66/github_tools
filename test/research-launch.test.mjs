import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildCodexArgs,
  buildResearchRepairPrompt,
  buildWindowsSandboxPlan,
  classifyCodexFailure,
} from '../apps/repo-researcher/src/cli.mjs';

function configOverrides(args) {
  return args.flatMap((arg, index) => arg === '-c' ? [args[index + 1]] : []);
}

test('Windows research retains a sandbox backend when user configuration is ignored', () => {
  const args = buildCodexArgs('Inspect repository', false, 'win32');
  assert.ok(configOverrides(args).includes('windows.sandbox="elevated"'));
  assert.equal(args[args.indexOf('--sandbox') + 1], 'read-only');
  assert.ok(args.includes('--ignore-user-config'));
  assert.ok(args.includes('--ignore-rules'));
  assert.ok(!args.includes('--approve-for-me'));
  assert.ok(!args.includes('--dangerously-bypass-approvals-and-sandbox'));
  assert.equal(args.at(-1), '-');
  assert.ok(!args.includes('Inspect repository'));
});

test('non-Windows research does not receive Windows-specific sandbox configuration', () => {
  const args = buildCodexArgs('Inspect repository', false, 'linux');
  assert.ok(!configOverrides(args).some((value) => value.startsWith('windows.')));
  assert.equal(args[args.indexOf('--sandbox') + 1], 'read-only');
});

test('explicit run permission keeps workspace boundaries and automatic approval review', () => {
  const args = buildCodexArgs('Inspect repository', true, 'win32');
  assert.ok(configOverrides(args).includes('windows.sandbox="elevated"'));
  assert.equal(args[args.indexOf('--sandbox') + 1], 'workspace-write');
  assert.ok(args.includes('--approve-for-me'));
  assert.ok(!args.includes('--dangerously-bypass-approvals-and-sandbox'));
});

test('read-only Windows research falls back after elevated sandbox setup cancellation', () => {
  assert.deepEqual(buildWindowsSandboxPlan({configured: 'auto', allowRun: false}),
    ['elevated', 'unelevated']);
  const diagnosis = classifyCodexFailure({
    stderr: 'orchestrator_helper_launch_canceled: ShellExecuteExW failed to launch setup helper: 1223',
  });
  assert.deepEqual(diagnosis, {
    code: 'WINDOWS_SANDBOX_SETUP_CANCELED',
    canUseUnelevatedFallback: true,
  });
});

test('run-enabled research never weakens the Windows sandbox automatically', () => {
  assert.deepEqual(buildWindowsSandboxPlan({configured: 'auto', allowRun: true}), ['elevated']);
});

test('ordinary repository policy blockers are not mistaken for sandbox setup failures', () => {
  assert.deepEqual(classifyCodexFailure({blockedReason: 'Policy denied access to secrets.env'}), {
    code: 'CODEX_RESEARCH_BLOCKED',
    canUseUnelevatedFallback: false,
  });
});

test('a completed Codex result is recorded as healthy rather than as an execution failure', () => {
  assert.deepEqual(classifyCodexFailure({
    researchStatus: 'completed',
    stderr: 'warning: optional telemetry unavailable',
  }), {
    code: 'OK',
    canUseUnelevatedFallback: false,
  });
});

test('a failed editorial gate gets one bounded correction prompt without trusting the draft', () => {
  const prompt = buildResearchRepairPrompt(
    'Original trusted prompt',
    {status: 'completed', video: {hook: 'bad draft'}},
    new Error('Editorial brief requires one concrete example.'),
  );
  assert.match(prompt, /Original trusted prompt/);
  assert.match(prompt, /one correction|corrected complete JSON/i);
  assert.match(prompt, /Editorial brief requires one concrete example/);
  assert.match(prompt, /untrusted\s+data/i);
  assert.match(prompt, /BEGIN PREVIOUS DRAFT DATA/);
});
