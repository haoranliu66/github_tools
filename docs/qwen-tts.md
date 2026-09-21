# Qwen cloned narration

`video-factory` uses the registered Qwen3-TTS voice when `.env.local` contains:

```dotenv
VIDEO_TTS_PROVIDER=qwen
QWEN_TTS_BASE_URL=http://127.0.0.1:8000
QWEN_TTS_API_KEY=local-secret
QWEN_TTS_VOICE_ID=32-character-voice-id
QWEN_TTS_LANGUAGE=Chinese
QWEN_TTS_SEED=20260918
QWEN_TTS_DO_SAMPLE=true
QWEN_TTS_TOP_K=50
QWEN_TTS_TOP_P=1
QWEN_TTS_TEMPERATURE=0.8
QWEN_TTS_REPETITION_PENALTY=1.05
QWEN_TTS_SUBTALKER_DO_SAMPLE=true
QWEN_TTS_SUBTALKER_TOP_K=50
QWEN_TTS_SUBTALKER_TOP_P=1
QWEN_TTS_SUBTALKER_TEMPERATURE=0.8
QWEN_TTS_AUTO_TUNNEL=true
QWEN_TTS_SSH_HOST=浅九
QWEN_TTS_SSH_USER=Administrator
QWEN_TTS_SSH_KEY=C:\Users\YOUR_NAME\.ssh\id_ed25519
```

Never commit `.env.local`, reference recordings, API keys, or SSH private keys. Only clone voices with explicit permission. The reference recording remains on the TTS host until its voice entry is deleted.

## Automatic connection to the remote workstation

The service should remain bound to remote loopback. `video:prepare` first reuses a healthy local Qwen connection. If none is available, it starts a non-interactive SSH tunnel using the configured public-key login, waits for `/health`, generates every narration clip, and closes only the tunnel it started.

```dotenv
QWEN_TTS_SSH_PORT=22
QWEN_TTS_REMOTE_HOST=127.0.0.1
QWEN_TTS_REMOTE_PORT=8000
QWEN_TTS_TUNNEL_START_TIMEOUT_MS=20000
```

The SSH command uses batch mode, so it never waits for a password or an interactive host-key prompt. Configure the public key and accept the remote host key once during machine setup. Do not expose port 8000 to the public internet.

No separate audio command or manually maintained tunnel is required for production preparation:

```powershell
pnpm video:prepare -- --selection apps/trend-scout/trend_reports/YYYY-Www/selection.json --repo owner/repository
```

The command establishes transport, verifies service health, authenticates, checks the configured `voice_id`, synthesizes adaptive narration blocks, measures the returned WAV files, pads and concatenates them, and writes `narration.wav`, subtitles, timing data, and the production storyboard. A block can continue while several visual scenes change. Any failure stops the job; it does not silently fall back to the Windows voice. `pnpm video:voice:check` remains available as an optional diagnostic and uses the same automatic tunnel lifecycle.

The deployed service uses `MAX_NEW_TOKENS=1024` and reports that value through `/health`; production preparation refuses an older service configuration. Each request remains limited to 1,000 characters. Returned WAV duration, not text length, is the primary gate: a block longer than 64 seconds is regenerated as two complete parts split at the nearest full sentence. Short adjacent blocks on the same topic are eligible for a measured merge. The service also resolves the already-downloaded model from its persistent cache with `HF_HUB_OFFLINE=1` and `TRANSFORMERS_OFFLINE=1`, so routine container restarts do not depend on Hugging Face availability.

When `QWEN_TTS_SEED` is set, every block in the episode sends the same explicit sampling policy. The production preset keeps sampling enabled, fixes both top-k/top-p paths, and uses `0.8` for the main and subtalker temperatures. The authenticated preflight fails closed unless the remote `/health` response advertises every sampling control, and the non-secret policy is recorded in `timing.json`. This improves repeatability across independently generated blocks without claiming that zero-shot speaker identity is mathematically identical.

The endpoint currently returns a WAV file without word timestamps. Scene changes and subtitle cues inside a continuous block therefore use measured block duration plus semantic text weights (`measured-block-weighted-cues`). This is deterministic but approximate, so final listening and subtitle review remain required; the metadata does not claim forced alignment.

Before narration work, read `.agents/skills/audio-narration-preflight/SKILL.md`. It records the hard service limits, Chinese-first wording rule, adaptive cadence profiles, split/merge behavior, and mandatory human listening check.

## Register and select voices

Qwen voice cloning requires both a reference recording and an accurate transcript of everything spoken in it. To register a voice and make it the default for all videos prepared afterward:

```powershell
pnpm video:voice:register -- --name narrator-two --audio "C:\path\reference.wav" --ref-text-file "C:\path\reference.txt" --activate
```

The transcript can also be supplied directly with `--ref-text "..."`. List registered voices or switch the active voice later with:

```powershell
pnpm video:voice:list
pnpm video:voice:use -- --voice-id 32-character-voice-id
pnpm video:voice:check
```

`--activate` and `video:voice:use` update only `QWEN_TTS_VOICE_ID` in the ignored `.env.local` file. Every later `video:prepare` run uses that selected voice automatically. Episodes already prepared keep their existing audio and are not rewritten.

## Deliberate Windows fallback

The legacy local voice remains available for offline emergency use only:

```dotenv
VIDEO_TTS_PROVIDER=windows
WINDOWS_TTS_VOICE=Microsoft Huihui Desktop
WINDOWS_TTS_RATE=1
```

Switching providers is an explicit configuration change. The selected provider and non-secret voice metadata are written to `timing.json` for review.
