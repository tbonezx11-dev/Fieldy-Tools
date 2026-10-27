import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_WAKE_WORD = "hey,?\\s+fieldy";
const TRANSCRIPT_FIELDS = ["transcript", "text", "transcription", "content"];

function firstString(payload, fields) {
  for (const field of fields) {
    if (typeof payload?.[field] === "string" && payload[field].trim()) {
      return payload[field].trim();
    }
  }

  for (const container of [payload?.data, payload?.conversation, payload?.event]) {
    for (const field of fields) {
      if (typeof container?.[field] === "string" && container[field].trim()) {
        return container[field].trim();
      }
    }
  }

  return "";
}

function safeWakePattern(source) {
  try {
    return new RegExp(`(?:^|[.!?]\\s+)${source}\\s*[:,—-]?\\s*`, "iu");
  } catch {
    return new RegExp(`(?:^|[.!?]\\s+)${DEFAULT_WAKE_WORD}\\s*[:,—-]?\\s*`, "iu");
  }
}

function extractCommand(transcript, wakePattern) {
  const match = wakePattern.exec(transcript);
  if (!match) return "";
  return transcript.slice(match.index + match[0].length).trim();
}

async function saveTranscript(transcript, payload) {
  const directory = process.env.FIELDY_TRANSCRIPT_DIR?.trim();
  if (!directory) return;

  await mkdir(directory, { recursive: true });
  const record = {
    receivedAt: new Date().toISOString(),
    transcript,
    eventId: payload?.id ?? payload?.eventId ?? payload?.data?.id ?? null
  };
  const file = path.join(directory, "fieldy-transcripts.jsonl");
  await appendFile(file, `${JSON.stringify(record)}\n`, { encoding: "utf8", mode: 0o600 });
}

export async function transform({ payload }) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;

  const transcript = firstString(payload, TRANSCRIPT_FIELDS);
  if (!transcript) return null;

  await saveTranscript(transcript, payload);

  const mode = process.env.FIELDY_WEBHOOK_MODE?.trim().toLowerCase() || "review";
  if (mode !== "voice-command") {
    const eventId = payload?.id ?? payload?.eventId ?? payload?.data?.id ?? "unknown";
    return {
      kind: "agent",
      name: "Fieldy post-recording review",
      message: [
        "A Fieldy recording has completed.",
        `Event ID: ${eventId}`,
        "Classify it as Work—Client, Work—Internal, Personal—Home, Personal—Family, Creative, Other, or noise/quarantined.",
        "Extract only explicit or high-confidence commitments, decisions, open questions, technical risks, and proposed follow-up drafts.",
        "Keep all actions draft-only. Do not send messages, publish links, or update external systems without the user's approval.",
        "Transcript:",
        transcript
      ].join("\n\n"),
      sessionKey: "hook:fieldy-review",
      sessionKeySource: "static",
      sessionMode: "isolated",
      deliver: true
    };
  }

  const wakePattern = safeWakePattern(process.env.FIELDY_WAKE_WORD_REGEX || DEFAULT_WAKE_WORD);
  const command = extractCommand(transcript, wakePattern);
  if (!command) return null;

  return {
    kind: "agent",
    name: "Fieldy voice command",
    message: command,
    sessionKey: "hook:fieldy",
    sessionKeySource: "static",
    sessionMode: "isolated",
    deliver: true
  };
}

export default transform;

export const _test = { firstString, safeWakePattern, extractCommand };
