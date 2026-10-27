# How I use Fieldy

This guide describes the workflow represented in my saved setup; it does not promise that every integration is available in another account.

## From recordings to decisions

Fieldy is the canonical source for recordings, summaries, conversation IDs, and transcripts. I use those records to create three useful downstream views: a commitment review, a private archive, and a daily brief. My setup also references a private Drive archive as durable backup. This bundle does not include an automated Drive backup tool.

My daily review separates work, personal, creative, and noisy recordings. It extracts commitments, decisions, open questions, risks, and follow-up drafts. Commitments enter the private ledger as Proposed / Needs Review, with a source quote and conversation ID. A review log records coverage. I decide what becomes an external action.

My Friday synthesis looks across the workweek for overdue or waiting items, repeated client requirements, technical questions, contradictions, product feedback, and possible knowledge-base topics. Personal decisions stay separate.

The Obsidian sync archives Fieldy's detailed content or summary to Markdown. Each note carries fieldy_id so repeated runs do not duplicate recordings. This is a Fieldy-generated content archive; it is not automatically a full verbatim transcript export.

The morning brief reviews the prior calendar day and curates decision-bearing sessions. In my original setup it updates an existing private dashboard, keeps 30 days of dated entries, preserves unresolved commitments, and verifies deployment and access protection. Other users can start with a private draft; the dashboard adapter is not part of this bundle.

An optional webhook accelerates review when a recording completes. The scheduled review still reconciles the day, because receiving a webhook is not proof of complete source coverage.

## Prompts to try

- “Use fieldy-review for yesterday in America/Chicago. Draft a review with source quotes and uncertain deadlines called out.”
- “Use fieldy-review for Monday through Friday. Show recurring themes and the source IDs behind each.”
- “Use fieldy-obsidian-sync to archive this week's Fieldy summaries into my selected vault folder. Preserve existing notes.”
- “Use fieldy-daily-brief to draft yesterday's decisions and next steps privately. Report any inaccessible history.”

Replace the timezone and configure your own destinations. These examples do not authorize sending messages, changing a CRM, or sharing recordings publicly.
