# Setup

## Prerequisites

- Your own Fieldy account and a supported Fieldy connection in your assistant.
- An agent capable of loading SKILL.md instructions. Filesystem access is needed for Obsidian; a spreadsheet connection is needed to write a hosted ledger.
- Node.js 20+ and OpenClaw only if you want the optional webhook.

## Install instruction skills

Clone this repository. For a standard local Codex skill directory, copy the selected folders from skills/ into ~/.codex/skills/. If you use a custom CODEX_HOME, use its skills/ directory instead. Do not overwrite an existing skill folder without reviewing it. Reload your agent's skill discovery, then confirm the chosen skill appears. Other agents may use a different skill location; follow that agent's loading mechanism or supply the SKILL.md as instructions manually.

The skills work independently. If you copy fieldy-review alone, also keep the templates available or configure equivalent columns; the CSV is only a schema reference, not an automated spreadsheet integration.

## Configure your own destinations

| Setting | Example / meaning |
| --- | --- |
| timezone | America/Chicago; replace with your IANA timezone |
| review window | One local day or an explicitly chosen week |
| ledger | Your private spreadsheet with Commitments and Review Log tabs |
| vault folder | Your private Obsidian vault / Client Meeting Transcripts |
| brief destination | A private draft, report, or dashboard you control |
| brief retention | Optional; original workflow used 30 days |

Import the blank CSV templates if you want a ledger. Give the agent access only to the destinations you choose. Start with a draft review, then explicitly request ledger writes or archive creation. Check source quotes, timezone boundaries, and a repeated run's deduplication before scheduling.

## Recurring use

Create recurring tasks using your agent's supported scheduler. Supply the chosen skill, timezone, destination, scope, and allowed writes in the task prompt. The repository does not install schedules or change your existing automations. Suggested cadence: morning brief for yesterday, end-of-day review, Friday weekly synthesis, and periodic archive sync. Validate the schedule in your scheduler's UI; there is no universal schedule configuration across agents.
