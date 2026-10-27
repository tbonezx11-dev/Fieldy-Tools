import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { transform } from "../src/fieldy-webhook.js";

afterEach(() => {
  delete process.env.FIELDY_WAKE_WORD_REGEX;
  delete process.env.FIELDY_TRANSCRIPT_DIR;
  delete process.env.FIELDY_WEBHOOK_MODE;
});

test("turns a completed recording into a draft-only review", async () => {
  const result = await transform({ payload: { transcript: "Hey, Fieldy, summarize this: hello world" } });
  assert.match(result.message, /A Fieldy recording has completed/);
  assert.match(result.message, /draft-only/);
  assert.match(result.message, /Hey, Fieldy, summarize this: hello world/);
  assert.equal(result.sessionKey, "hook:fieldy-review");
  assert.equal(result.sessionKeySource, "static");
});

test("accepts nested payloads and wake phrases after sentence boundaries", async () => {
  process.env.FIELDY_WEBHOOK_MODE = "voice-command";
  const result = await transform({ payload: { data: { transcription: "Noise first. Hey Fieldy: create a reminder" } } });
  assert.equal(result.message, "create a reminder");
});

test("ignores transcripts without the wake phrase", async () => {
  process.env.FIELDY_WEBHOOK_MODE = "voice-command";
  assert.equal(await transform({ payload: { transcript: "ordinary conversation" } }), null);
});

test("supports a custom wake-word regex", async () => {
  process.env.FIELDY_WEBHOOK_MODE = "voice-command";
  process.env.FIELDY_WAKE_WORD_REGEX = "hey,?\\s+buddy";
  const result = await transform({ payload: { text: "Hey buddy — send the report" } });
  assert.equal(result.message, "send the report");
});

test("stores transcripts only when explicitly enabled", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "fieldy-test-"));
  process.env.FIELDY_TRANSCRIPT_DIR = directory;
  await transform({ payload: { id: "evt-1", transcript: "Hey Fieldy, take a note" } });
  const saved = JSON.parse(await readFile(path.join(directory, "fieldy-transcripts.jsonl"), "utf8"));
  assert.equal(saved.eventId, "evt-1");
  assert.equal(saved.transcript, "Hey Fieldy, take a note");
});
