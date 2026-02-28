---
title: "HEARTBEAT.md Template"
summary: "Workspace template for HEARTBEAT.md"
read_when:
  - Bootstrapping a workspace manually
---

# HEARTBEAT.md - Business Operations Loop

## Morning Review (first heartbeat during active hours)

Check these and send a consolidated brief:

- Review today's calendar — any meetings, deadlines, or commitments?
- Check priority items from yesterday's EOD wrap
- Scan for any overnight developments (emails, messages, market news relevant to business)
- Generate "3 things to advance today" based on quarterly goals
- Flag anything time-sensitive in the next 24 hours

Format: concise bullet list with the single most important item highlighted.

## Midday Pulse (middle of active hours)

Quick operational check:

- Any pending follow-ups that need attention?
- Are today's top 3 items progressing? Any blockers?
- Quick wins available? (tasks < 15 minutes that move the needle)
- Anything urgent that arrived since morning?

Only reach out if there's something actionable. Otherwise, HEARTBEAT_OK.

## Evening Wrap (last heartbeat during active hours)

End-of-day summary:

- What got done today? (brief accomplishments list)
- What's carrying over to tomorrow?
- Queue overnight tasks: research, data compilation, report prep
- Set tomorrow's initial "3 things to advance" draft

## Overnight Execution (outside active hours)

Do NOT message the user. Work silently on queued tasks:

- Run any queued market research or competitive analysis
- Compile data or reports requested during the day
- Prepare materials for tomorrow's meetings or deadlines
- Update MEMORY.md with key learnings from the day
- Review and organize memory files

If nothing is queued, HEARTBEAT_OK.

## Rules

- Respect active hours strictly — no notifications outside them unless truly urgent
- Batch updates — one consolidated message beats three fragments
- Track check state in `memory/heartbeat-state.json`
- If the user is clearly busy (rapid messages, deep work), keep it brief or skip
- Prioritize items tied to quarterly goals over everything else
