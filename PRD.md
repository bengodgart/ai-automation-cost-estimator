# PRD — ai-automation-cost-estimator

**One-liner (from brief 06):** A free single-page calculator that projects what an AI automation will actually cost (pick platform, model, steps, and monthly volume) with a "raw API would cost X instead" comparison, for automation builders who currently wire LLM nodes into workflows with no per-run cost visibility.

**Usefulness (from brief 06):** None of Zapier, Make, or n8n show token/dollar cost per node or execution; builders "fly blind." A cited 4-step/1000-run workflow is $69 on Zapier vs $16 on Make. Paste four inputs, get a projected cost and a cross-platform comparison, no signup, nothing stored.

## v1 scope (capped)

1. Inputs: platform (segmented control), model, steps per run, LLM steps, tokens per call, monthly runs.
2. Output: monthly total split into platform orchestration + token cost, with the multipliers visible.
3. A comparison across all four platforms, cheapest highlighted, plus a "raw API direct would cost X" line.
4. Editable rates with dated source links and a "prices change, check source" note.

## Non-goals (NOT v1 - expansion paths, parked)

- Live billing-API integration, accounts, saved scenarios, a pro tier, real-time monitoring.
- A build step or backend (static page, client-side only).

## Demo path (stranger sees value in under 2 minutes)

Open index.html -> the default 4-step, 1000-run scenario shows Zapier vs Make vs n8n vs raw API instantly. Change any input and it updates. Adjust rates to match a real plan.

## Done when

- The page produces a cost estimate and cross-platform comparison from inputs in under 2 minutes for a stranger.
- The math matches a hand-calculated spot check on the cited $69-vs-$16 example (node test.js reproduces it).
- Pricing sources are dated and linked; copy has no em-dashes.
- Static, free to host, nothing stored; smoke tests pass.
