import assert from 'node:assert/strict';
import test from 'node:test';
import {mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createRequire} from 'node:module';
import {spawnSync} from 'node:child_process';
import * as narration from '../apps/video-factory/src/narration.mjs';
const ffmpeg = createRequire(import.meta.url)('@ffmpeg-installer/ffmpeg').path;

test('audio concatenation resolves clips relative to the list, even outside cwd', () => {
  assert.equal(typeof narration.concatPcmWav, 'function');
  const root = mkdtempSync(join(tmpdir(), 'zimeiti audio '));
  try {
    const audio = join(root, 'audio clips'); mkdirSync(audio);
    const result = spawnSync(ffmpeg, ['-y', '-v', 'error', '-f', 'lavfi', '-i', 'sine=frequency=440:duration=0.25', '-c:a', 'pcm_s16le', join(audio, 'one.wav')]);
    assert.equal(result.status, 0);
    const list = join(audio, 'concat.txt');
    writeFileSync(list, "file 'one.wav'\nfile 'one.wav'\n");
    const output = join(root, 'complete.wav');
    narration.concatPcmWav(ffmpeg, list, output);
    assert.equal(narration.wavDuration(readFileSync(output)), 0.5);
  } finally { rmSync(root, {recursive: true, force: true}); }
});
