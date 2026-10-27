# Optional Fieldy → OpenClaw webhook

This adapter comes from the original local setup. Validate the configuration against your installed OpenClaw version before enabling it. It is not needed for the three instruction skills. Paths below are relative to the repository root.

## Install

1. Copy the transform into OpenClaw's transform directory:

   ```bash
   mkdir -p ~/.openclaw/hooks/transforms
   cp src/fieldy-webhook.js ~/.openclaw/hooks/transforms/fieldy-webhook.js
   ```

2. Merge `openclaw.config.example.json5` into `~/.openclaw/openclaw.json`. Replace the hook token and agent ID if yours is not `main`.

3. Restart and validate OpenClaw:

   ```bash
   openclaw config validate
   openclaw gateway restart
   ```

4. Expose the Gateway through an HTTPS reverse proxy or Tailscale Funnel. Configure Fieldy to POST to:

   ```text
   https://your-gateway.example/hooks/fieldy
   ```

   The request must include `x-openclaw-token: YOUR_HOOK_TOKEN` (or `Authorization: Bearer YOUR_HOOK_TOKEN`). The source configuration expects header authentication rather than the `?token=...` URL shown in the older Fieldy article. If Fieldy cannot add a request header, put a small authenticated relay in front of OpenClaw; do not place the OpenClaw hook secret in the URL.

## Test

Run the unit tests:

```bash
npm test
```

Then test the live Gateway:

```bash
curl --fail-with-body \
  -H 'content-type: application/json' \
  -H 'x-openclaw-token: YOUR_HOOK_TOKEN' \
  -H 'idempotency-key: fieldy-test-1' \
  --data '{"transcript":"Hey, Fieldy, summarize this: hello world"}' \
  https://your-gateway.example/hooks/fieldy
```

A successful response confirms admission and includes a `runId`; verify completion in `openclaw logs --follow`.

## Options

- `FIELDY_WAKE_WORD_REGEX`: regex source for another wake phrase, e.g. `hey,?\\s+buddy`.
- `FIELDY_WEBHOOK_MODE`: defaults to `review`. Set to `voice-command` to require a wake phrase and forward only the command after it.
- `FIELDY_TRANSCRIPT_DIR`: when set on the Gateway process, append all received transcripts to `fieldy-transcripts.jsonl` in this directory. Storage is off by default for privacy.

Webhook payload text is accepted from `transcript`, `text`, `transcription`, or `content`, either at the top level or below `data`, `conversation`, or `event`.

## Security notes

- Use a dedicated, random hook token and HTTPS.
- Keep `allowUnsafeExternalContent` disabled (the default).
- Restrict `allowedAgentIds` and the target agent's tools/workspace.
- Static session keys are used only for admission ordering; each run remains isolated.


In voice-command mode the command is passed directly to the target agent. A wake phrase is not authentication or proof of user intent; restrict agent tools and require review for consequential external actions. The transform itself does not enforce an authorization boundary. Transcript logging is opt-in and writes sensitive data locally; keep that directory outside this repository. Delivery retries may repeat review runs; reconcile by source ID and normalized action.
