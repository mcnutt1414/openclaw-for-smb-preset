import fs from "node:fs/promises";
import path from "node:path";
import type { OpenClawConfig } from "../config/config.js";
import type { WizardPrompter } from "./prompts.js";

export type SmbContext = {
  ownerName: string;
  businessStage: "new" | "existing";
  industry: string;
  revenueRange: string;
  teamSize: string;
  goals: string;
  timeSinks: string[];
  workingHours: string;
};

export async function gatherSmbContext(prompter: WizardPrompter): Promise<SmbContext> {
  await prompter.note(
    [
      "Let's learn about your business so Clark can hit the ground running.",
      "This takes about 2 minutes.",
    ].join("\n"),
    "Business Setup",
  );

  const ownerName = await prompter.text({
    message: "What's your name?",
    placeholder: "e.g. Ryan",
  });

  const businessStage = await prompter.select<"new" | "existing">({
    message: "Are you starting a new business or do you have an existing one?",
    options: [
      { value: "existing", label: "Existing business" },
      { value: "new", label: "New business / idea stage" },
    ],
  });

  const industry = await prompter.text({
    message: "What industry or type of business?",
    placeholder: "e.g. SaaS, consulting, e-commerce, construction",
  });

  const revenueRange = await prompter.select({
    message: "Revenue range?",
    options: [
      { value: "pre-revenue", label: "Pre-revenue" },
      { value: "<$100K", label: "Under $100K" },
      { value: "$100K-$1M", label: "$100K - $1M" },
      { value: "$1M-$10M", label: "$1M - $10M" },
      { value: "$10M+", label: "$10M+" },
    ],
  });

  const teamSize = await prompter.select({
    message: "Team size?",
    options: [
      { value: "solo", label: "Just me" },
      { value: "2-5", label: "2-5 people" },
      { value: "6-20", label: "6-20 people" },
      { value: "20+", label: "20+ people" },
    ],
  });

  const goals = await prompter.text({
    message: "Top 3 goals this quarter (comma-separated)",
    placeholder: "e.g. launch website, close 5 new clients, hire a VA",
  });

  const timeSinks = await prompter.multiselect({
    message: "What eats up most of your time?",
    options: [
      { value: "sales", label: "Sales & prospecting" },
      { value: "marketing", label: "Marketing & content" },
      { value: "operations", label: "Operations & fulfillment" },
      { value: "customer-support", label: "Customer support" },
      { value: "admin", label: "Admin & bookkeeping" },
      { value: "hiring", label: "Hiring & team management" },
      { value: "accounting", label: "Invoicing & accounting" },
    ],
  });

  const workingHours = await prompter.text({
    message: "What are your typical working hours?",
    placeholder: "e.g. 8am-6pm EST",
    initialValue: "9am-5pm",
  });

  return {
    ownerName: ownerName.trim(),
    businessStage,
    industry: industry.trim(),
    revenueRange,
    teamSize,
    goals: goals.trim(),
    timeSinks,
    workingHours: workingHours.trim(),
  };
}

export async function writeSmbUserProfile(workspaceDir: string, ctx: SmbContext): Promise<void> {
  const goalLines = ctx.goals
    .split(",")
    .map((g, i) => `  ${i + 1}. ${g.trim()}`)
    .join("\n");

  const timeSinkList = ctx.timeSinks.map((t) => `- ${t}`).join("\n");

  const content = `# USER.md - About Your Human

## Personal

- **Name:** ${ctx.ownerName}
- **What to call them:** ${ctx.ownerName}
- **Role/Title:** Owner

## Business

- **Business Name:** _(to be filled in during first conversation)_
- **Industry:** ${ctx.industry}
- **Business Stage:** ${ctx.businessStage === "new" ? "idea / startup" : "growing / established"}
- **Revenue Range:** ${ctx.revenueRange}
- **Team Size:** ${ctx.teamSize}
- **Website/Online Presence:** _(to be filled in during first conversation)_

## Goals & Metrics

- **Top 3 Goals This Quarter:**
${goalLines}
- **Key Metrics/KPIs:** _(to be identified during first conversation)_
- **Biggest Time Sinks:**
${timeSinkList}

## Schedule & Preferences

- **Active Hours:** ${ctx.workingHours}
- **Communication Style:** _(to be learned)_
- **Decision Style:** _(to be learned)_

## Context

_(Ongoing projects, key relationships, competitive landscape, seasonal patterns, upcoming milestones — Clark will build this over time.)_
`;

  const userMdPath = path.join(workspaceDir, "USER.md");
  await fs.mkdir(workspaceDir, { recursive: true });
  await fs.writeFile(userMdPath, content, "utf-8");
}

export function applySmbHeartbeatConfig(config: OpenClawConfig, ctx: SmbContext): OpenClawConfig {
  // Parse active hours from user input like "8am-6pm EST"
  const hoursMatch = ctx.workingHours.match(
    /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i,
  );
  const start = hoursMatch?.[1]?.trim();
  const end = hoursMatch?.[2]?.trim();

  // Extract timezone if present (anything after the time range)
  const tzMatch = ctx.workingHours.match(
    /\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*[-–]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s+(.+)/i,
  );
  const timezone = tzMatch?.[1]?.trim();

  return {
    ...config,
    agents: {
      ...config.agents,
      defaults: {
        ...config.agents?.defaults,
        heartbeat: {
          ...config.agents?.defaults?.heartbeat,
          every: "30m",
          ...(start && end
            ? {
                activeHours: {
                  start,
                  end,
                  ...(timezone ? { timezone } : {}),
                },
              }
            : {}),
        },
      },
    },
  };
}
