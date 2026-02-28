---
name: outbound-sales
description: "Outbound sales frameworks including call prep, outreach templates, follow-up cadences, and lead qualification. Use when: user asks about prospecting, cold outreach, sales calls, follow-ups, or lead qualification. NOT for: inbound marketing strategy, paid advertising, or CRM configuration."
metadata: { "openclaw": { "emoji": "📞" } }
---

# Outbound Sales Skill

Frameworks for prospecting, outreach, sales conversations, and pipeline management.

## When to Use

- "Help me prepare for a sales call"
- "Draft a cold email to [prospect]"
- "When should I follow up with [lead]?"
- "Is this lead worth pursuing?"
- "Help me build an outreach sequence"
- Before discovery calls or demos
- Pipeline review and prioritization

## When NOT to Use

- Inbound marketing strategy (content, SEO, ads) -> different discipline
- CRM setup or configuration -> tool-specific, recommend documentation
- Legal review of sales contracts -> recommend legal counsel
- Spam or unsolicited bulk messaging -> never assist with this

## Sales Call Prep Checklist

Before any sales call, research and prepare:

### Pre-Call Research (use `web_search`)

1. **Company**: What do they do? Recent news? Funding? Growth trajectory?
2. **Person**: Role, tenure, LinkedIn activity, shared connections, past companies
3. **Industry**: Current trends, challenges, regulatory changes
4. **Competitors**: Are they using a competitor? Which one? Any public complaints?
5. **Triggers**: Why now? What changed that makes this relevant?

### Call Structure

1. **Open** (2 min): Build rapport, set agenda, confirm time
2. **Discovery** (15-20 min): Ask questions, understand their situation
3. **Value** (5-10 min): Connect their pain to your solution
4. **Next steps** (3 min): Agree on specific action and timeline

### Post-Call

- Log key takeaways in memory files
- Set follow-up reminder via `cron`
- Draft any promised materials

## Cold Outreach Templates

### Cold Email Framework

Structure every cold email:

1. **Subject line**: Short, specific, no clickbait (reference their company or a trigger event)
2. **Opening** (1 sentence): Why you're reaching out — reference something specific to them
3. **Problem** (1-2 sentences): The pain point you solve, framed in their language
4. **Proof** (1 sentence): Brief credibility — a result, a relevant customer, a data point
5. **Ask** (1 sentence): Low-friction CTA — "Worth a 15-minute call?" not "Buy our product"

### Key Principles

- Keep emails under 125 words
- Write at an 8th-grade reading level
- One CTA per email
- Personalize the first line — generic = deleted
- Send Tuesday-Thursday, 8-10 AM in their timezone

### Follow-Up Sequence

A multi-touch outreach cadence:

| Day | Action                                           | Channel           |
| --- | ------------------------------------------------ | ----------------- |
| 1   | Initial email                                    | Email             |
| 3   | LinkedIn connection request + note               | LinkedIn          |
| 5   | Follow-up email (new angle, not "bumping")       | Email             |
| 8   | Value-add touch (share relevant article/insight) | Email or LinkedIn |
| 12  | Break-up email ("Should I close the file?")      | Email             |

### Follow-Up Rules

- Never say "just following up" or "circling back" — add new value each touch
- Reference something new: their news, industry development, a relevant case study
- Space touches further apart over time
- Know when to stop — 5 touches with no response = move on (revisit in 3-6 months)

## Lead Qualification

### BANT Framework

Quick qualification check:

- **Budget**: Can they afford the solution? Do they have allocated budget?
- **Authority**: Are you talking to the decision-maker? Who else is involved?
- **Need**: Is there a real problem, or just curiosity?
- **Timeline**: When do they need a solution? Is there urgency?

Score: needs 3 of 4 to be worth active pursuit.

### MEDDIC Framework (for larger deals)

More rigorous qualification:

- **Metrics**: What business outcomes are they measuring?
- **Economic buyer**: Who signs the check?
- **Decision criteria**: How will they evaluate options?
- **Decision process**: What are the steps to a decision?
- **Identify pain**: What's the cost of not solving this?
- **Champion**: Who inside the org is advocating for you?

### Lead Prioritization

When reviewing pipeline, rank by:

1. **Urgency** — Active pain vs. nice-to-have
2. **Fit** — Match to ICP (see market-research skill)
3. **Access** — Can you reach the decision-maker?
4. **Size** — Deal value relative to effort
5. **Momentum** — Are they engaging or going dark?

Focus time on the top tier. Nurture the rest with low-touch sequences.

## Discovery Call Question Bank

### Situation Questions (understand context)

- "Walk me through how you handle [process] today"
- "What tools are you currently using for [area]?"
- "How big is the team involved in [function]?"

### Problem Questions (uncover pain)

- "What's the biggest challenge with [current approach]?"
- "What happens when [process] breaks down?"
- "How much time does your team spend on [task] each week?"

### Impact Questions (quantify the cost)

- "What does that cost you in terms of [time/revenue/customers]?"
- "If this doesn't get fixed in the next 6 months, what happens?"
- "How does this affect [their key metric]?"

### Vision Questions (paint the future)

- "If you could wave a magic wand, what would [process] look like?"
- "What would solving this free you up to do?"
- "What does success look like 12 months from now?"
