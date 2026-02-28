---
name: market-research
description: "Market research and competitive analysis frameworks using web search. Use when: user asks about market size, competitors, customer personas, pricing research, or industry analysis. NOT for: real-time stock data, proprietary databases, or primary research (surveys, interviews)."
metadata: { "openclaw": { "emoji": "🔍" } }
---

# Market Research Skill

Frameworks for market analysis, competitive intelligence, and customer research using web search and publicly available data.

## When to Use

- "Who are my competitors?"
- "How big is the market for [product/service]?"
- "What should I charge?"
- "Who is my ideal customer?"
- "What's happening in [industry]?"
- Before launching a new product or entering a new market
- Quarterly competitive landscape reviews

## When NOT to Use

- Real-time stock prices or financial data -> use a financial data service
- Proprietary market research reports (Gartner, etc.) -> suggest purchasing access
- Primary research (customer interviews, surveys) -> guide methodology but user must execute
- Legal/regulatory research -> recommend legal counsel

## TAM/SAM/SOM Analysis

Use `web_search` to estimate market size:

### Steps

1. **TAM (Total Addressable Market)**: Search for industry reports, market size data
   - Query: `"[industry] market size [year]"`, `"[industry] TAM"`
   - Sources: Statista previews, IBISWorld summaries, industry associations, press releases
   - Look for: total revenue, number of businesses, growth rate

2. **SAM (Serviceable Addressable Market)**: Narrow by geography, segment, capability
   - What subset can you actually serve? (geography, company size, vertical)
   - Query: `"[industry] [geography] market"`, `"[segment] spending"`

3. **SOM (Serviceable Obtainable Market)**: Realistic capture in 1-3 years
   - Based on: sales capacity, competitive landscape, go-to-market approach
   - Rule of thumb: 1-5% of SAM for startups, higher for established players

### Output Format

Present as a simple table:

- TAM: $X (total market)
- SAM: $Y (your reachable segment)
- SOM: $Z (realistic 1-3 year target)
- Growth rate: X% annually
- Key drivers and risks

## Competitor Analysis

### Feature Matrix

Build a comparison grid:

1. **Identify competitors** (search: `"[product type] alternatives"`, `"best [category] for [segment]"`)
2. **Gather data** for each competitor:
   - Pricing (check pricing pages, G2, Capterra)
   - Key features (product pages, comparison sites)
   - Target customer (marketing copy, case studies)
   - Strengths/weaknesses (reviews on G2, Trustpilot, Reddit)
   - Estimated size (LinkedIn employee count, press mentions, funding)
3. **Identify gaps** — where are competitors weak? What do customers complain about?

### Competitive Intelligence Sources

- **Pricing**: Competitor websites, G2/Capterra, archived pricing pages
- **Product changes**: Blog posts, changelogs, Product Hunt launches
- **Growth signals**: Job postings (hiring = growing), LinkedIn headcount, press releases
- **Struggle signals**: Layoff news, review sentiment decline, leadership changes
- **Strategy**: Conference talks, podcast interviews, blog content themes

## Pricing Research

### Approach

1. **Competitor pricing**: Map out pricing models and tiers of top 5-10 competitors
2. **Value-based anchoring**: What outcome does the customer get? What's that worth?
3. **Cost-plus floor**: What does it cost you to deliver? (minimum viable price)
4. **Willingness to pay**: Customer reviews mentioning price — "expensive" vs "great value"

### Pricing Model Options

Present tradeoffs for each:

- **Per-unit** — Simple, scales with usage
- **Tiered** — Good/better/best, captures different segments
- **Per-seat** — Common in SaaS, predictable for buyer
- **Usage-based** — Aligns cost with value, harder to predict revenue
- **Flat rate** — Simple, but may leave money on the table

## ICP (Ideal Customer Profile)

### Framework

Help the user define their ICP:

1. **Demographics**: Company size, revenue, industry, geography
2. **Psychographics**: Values, priorities, buying behavior, tech savviness
3. **Pain points**: What problem are they desperate to solve?
4. **Buying signals**: What triggers them to search for a solution?
5. **Decision process**: Who decides? Who influences? What's the timeline?
6. **Anti-patterns**: Who is NOT a good customer? (important to define)

### Research Methods

- Search: `"[product category] reviews"` — who's writing them?
- Search: `"[problem] solution"` — what language do buyers use?
- Search: `Reddit [industry] [problem]` — unfiltered customer voice
- Check competitor case studies — who are they selling to?
- LinkedIn: What job titles are engaging with competitor content?

## Customer Persona Development

Build 2-3 personas from ICP research:

For each persona:

- **Name and role** (e.g., "Operations Olivia — COO at a 20-person agency")
- **Day-to-day** — What does their typical day look like?
- **Goals** — What are they trying to achieve?
- **Frustrations** — What's broken or painful?
- **Buying triggers** — What makes them start looking for a solution?
- **Objections** — What would stop them from buying?
- **Channels** — Where do they spend time online? How do they discover solutions?
