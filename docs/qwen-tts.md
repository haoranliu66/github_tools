# Qwen cloned narration

`video-factory` uses the registered Qwen3-TTS voice when `.env.local` contains:

```dotenv
VIDEO_TTS_PROVIDER=qwen
QWEN_TTS_BASE_URL=http://127.0.0.1:8000
QWEN_TTS_API_KEY=local-secret
QWEN_TTS_VOICE_ID=32-character-voice-id
QWEN_TTS_LANGUAGE=Chinese
```

Never commit `.env.local`, reference recordings, API keys, or SSH private keys. Only clone voices with explicit permission. The reference recording remains on the TTS host until its voice entry is deleted.

## Connect to the remote workstation

The service should remain bound to remote loopback. Establish an SSH tunnel from the video-production machine and keep it running:

```powershell
ssh -i C:\Users\YOUR_NAME\.ssh\id_ed25519 -N -L 8000:127.0.0.1:8000 Administrator@REMOTE_HOST
```

Do not expose port 8000 to the public internet. Before preparing a video, run:

```powershell
pnpm video:voice:check
```

The check verifies service health, API authentication, and that the configured `voice_id` is registered. It never prints the API key. `video:prepare` repeats the same checks and stops on failure; it does not silently fall back to the Windows voice.

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
