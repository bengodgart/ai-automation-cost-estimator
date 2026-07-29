---
type: Product
title: ai-automation-cost-estimator
description: 'See what an AI automation will cost per month before you build it, with the same workflow priced across Zapier, Make, n8n and calling the API directly.'
domain: AI & LLM Tooling
users: 'Automation builders wiring LLM calls into Zapier, Make or n8n workflows who cannot see the per-run cost before the invoice arrives.'
lifecycle: shipped
live_url: https://bengodgart.github.io/ai-automation-cost-estimator/
pricing: 'Free. MIT licensed, no signup.'
generated:
  by: claude-opus-5
  at: '2026-07-29T04:24:12+00:00'
status: stable
resource: https://github.com/bengodgart/ai-automation-cost-estimator.git
---

# ai-automation-cost-estimator

See what an AI automation will cost per month before you build it, with the same workflow
priced across Zapier, Make, n8n and calling the API directly.

## Who it is for

Automation builders wiring LLM calls into Zapier, Make or n8n workflows who cannot see the
per-run cost before the invoice arrives.

## What problem it solves

None of Zapier, Make or n8n show the dollar cost of a run up front, so the bill is a
surprise. The same four-step workflow at a thousand runs a month can be roughly $69 on
Zapier and $16 on Make, and that gap is invisible until it arrives. The page makes it
visible before you commit: monthly total split into platform orchestration and LLM token
cost, what the same work costs calling the model directly, and all four priced side by side
with the cheapest highlighted.

## Current state

Shipped and public on GitHub Pages. Rates are editable so they can be matched to a specific
plan. The defaults are representative July 2026 figures, labelled as estimates on the page
with source links, because a precise figure depends on the plan tier and current provider
pricing.
