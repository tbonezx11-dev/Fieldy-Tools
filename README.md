# Fieldy Tools

A community toolkit for turning Fieldy recordings into reviewed commitments, a private knowledge archive, and useful daily briefs. Built from Sean's personal workflow. **Unofficial; not affiliated with Fieldy.** “Fieldie” in conversation refers to Fieldy here.

## What's included

| Component | Purpose |
| --- | --- |
| [fieldy-review](skills/fieldy-review/SKILL.md) | Daily reviews and weekly synthesis with source-backed commitments |
| [fieldy-obsidian-sync](skills/fieldy-obsidian-sync/SKILL.md) | Incremental Markdown archive, deduplicated by Fieldy ID |
| [fieldy-daily-brief](skills/fieldy-daily-brief/SKILL.md) | Private decision brief with tracked actions and coverage |
| [OpenClaw webhook](docs/WEBHOOK.md) | Optional post-recording triage and opt-in wake phrase mode |
| [Templates](templates) | Blank commitment and review-log CSV headers |

The skills are portable instruction files adapted from existing automations. The JavaScript webhook is executable code. This repository does not contain Fieldy's proprietary MCP server, a standalone Fieldy API client, or your recordings. Each person connects their own Fieldy account through their agent's supported integration. Tool availability and history access depend on that connection.

## Start here

1. Read [setup](docs/SETUP.md), connect your own Fieldy account, and install the skills you want.
2. Try a single-day review before enabling recurring work.
3. Choose an optional private ledger, Obsidian folder, or private brief destination.
4. Read [how I use it](docs/WORKFLOW.md) for the full workflow and example prompts.

Example: “Use fieldy-review to review yesterday's recordings in America/Chicago. Show commitments and decisions with source evidence; keep follow-ups as drafts.”

## Development

Requires Node.js 20 or newer for the webhook. No npm dependencies.

```sh
npm test
```

Tests exercise the transform locally. They do not verify your Fieldy connection, OpenClaw installation, webhook delivery, or dashboard deployment. See [tool boundaries and troubleshooting](docs/TOOLS.md).

Only instructions, code, blank templates, and synthetic test data belong here. Keep recordings, vault notes, ledgers, credentials, and private configuration outside this public repository. No open-source license has been selected yet; ask the owner before redistributing or adapting the code beyond rights otherwise granted by law.
