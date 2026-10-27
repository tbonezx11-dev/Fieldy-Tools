# Tools and boundaries

The Fieldy connection may expose browsing, search, time-range listing, conversation retrieval, transcript listing, and sharing. Use the schemas actually available in your environment; connector prefixes vary. Newer metadata browsing supports complete date-range inventories and pagination. Topic search serves a different purpose and can have incomplete index coverage.

A Fieldy conversation is a recording, not a chat with the assistant. Calendar associations and invitee lists do not establish attendance. Account history boundaries limit accessible records; report the limitation instead of claiming no recordings exist.

## Troubleshooting

- **No Fieldy tools:** connect Fieldy through your agent's supported integrations. Installing these skills does not install or authenticate Fieldy's service.
- **Too few records:** check timezone boundaries, pagination, history limits, and whether you used search instead of metadata browsing.
- **Duplicate actions:** compare source ID plus normalized action, not just a meeting title.
- **Duplicate notes:** index fieldy_id; title/date filenames alone are insufficient.
- **Missing vault or spreadsheet access:** return a draft and configure the intended destination before writes.
- **Webhook accepted but no result:** inspect gateway admission and agent-run logs separately. Verify the transform shape against the installed OpenClaw version.
- **Brief publishing unavailable:** the skill prepares content; supply your own private publishing adapter and validation commands.

## Validation status

The bundled tests validate the local webhook transform. The three skills were checked for frontmatter and packaging. No live recordings, private ledgers, vaults, or deployments are required to test this repository, and none are included as fixtures.
