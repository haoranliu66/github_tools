import assert from 'node:assert/strict';
import {EventEmitter} from 'node:events';
import {mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import test from 'node:test';
import {ensureQwenTransport, resolveQwenTunnelConfig} from '../apps/video-factory/src/qwen-tunnel.mjs';

function ttsConfig() {
  return {provider: 'qwen', baseUrl: 'http://127.0.0.1:8000'};
}

function withKey(run) {
  const directory = mkdtempSync(join(tmpdir(), 'zimeiti-ssh-'));
  const keyPath = join(directory, 'id_ed25519');
  writeFileSync(keyPath, 'test-only');
  return Promise.resolve(run(keyPath)).finally(() => rmSync(directory, {recursive: true, force: true}));
}

class FakeChild extends EventEmitter {
  constructor() {
    super();
    this.stderr = new EventEmitter();
    this.exitCode = null;
    this.signalCode = null;
    this.killedWith = [];
  }

  kill(signal = 'SIGTERM') {
    this.killedWith.push(signal);
    this.exitCode = 0;
    queueMicrotask(() => this.emit('exit', 0, signal));
    return true;
  }
}

test('automatic tunnel configuration is explicit and constrained to loopback', async () => withKey((keyPath) => {
  const config = resolveQwenTunnelConfig(ttsConfig(), {
    QWEN_TTS_AUTO_TUNNEL: 'true', QWEN_TTS_SSH_HOST: '192.168.1.100',
    QWEN_TTS_SSH_USER: 'Administrator', QWEN_TTS_SSH_KEY: keyPath,
  });
  assert.equal(config.localHost, '127.0.0.1');
  assert.equal(config.localPort, 8000);
  assert.equal(config.remotePort, 8000);
  assert.throws(() => resolveQwenTunnelConfig({provider: 'qwen', baseUrl: 'http://192.168.1.100:8000'}, {
    QWEN_TTS_AUTO_TUNNEL: 'true', QWEN_TTS_SSH_HOST: '192.168.1.100',
    QWEN_TTS_SSH_USER: 'Administrator', QWEN_TTS_SSH_KEY: keyPath,
  }), /loopback/);
}));

test('an already healthy Qwen connection is reused and never stopped', async () => {
  let spawned = false;
  const transport = await ensureQwenTransport(ttsConfig(), {
    env: {}, fetchImpl: async () => new Response('{}', {status: 200}),
    spawnImpl: () => { spawned = true; },
  });
  assert.equal(transport.mode, 'existing');
  assert.equal(spawned, false);
  await transport.close();
});

test('an unavailable Qwen service starts a batch SSH tunnel and owns its cleanup', async () => withKey(async (keyPath) => {
  let healthChecks = 0;
  let spawnCall;
  const child = new FakeChild();
  const transport = await ensureQwenTransport(ttsConfig(), {
    env: {
      QWEN_TTS_AUTO_TUNNEL: 'true', QWEN_TTS_SSH_HOST: '192.168.1.100',
      QWEN_TTS_SSH_USER: 'Administrator', QWEN_TTS_SSH_KEY: keyPath,
    },
    fetchImpl: async () => {
      healthChecks += 1;
      if (healthChecks === 1) throw new Error('not connected');
      return new Response('{}', {status: 200});
    },
    spawnImpl: (command, args, options) => {
      spawnCall = {command, args, options};
      return child;
    },
    sleepImpl: async () => {},
  });
  assert.equal(transport.mode, 'started');
  assert.equal(spawnCall.command, 'ssh');
  assert.equal(spawnCall.options.windowsHide, true);
  assert.equal(spawnCall.args.includes('BatchMode=yes'), true);
  assert.equal(spawnCall.args.includes('127.0.0.1:8000:127.0.0.1:8000'), true);
  assert.equal(spawnCall.args.at(-1), 'Administrator@192.168.1.100');
  await transport.close();
  assert.deepEqual(child.killedWith, ['SIGTERM']);
}));

test('an unreachable service fails clearly when automatic tunneling is disabled', async () => {
  await assert.rejects(() => ensureQwenTransport(ttsConfig(), {
    env: {QWEN_TTS_AUTO_TUNNEL: 'false'}, fetchImpl: async () => { throw new Error('offline'); },
  }), /automatic SSH tunneling is disabled/);
});
