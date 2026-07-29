---
type: Tech Stack
title: ai-automation-cost-estimator stack
description: 'Frameworks, storage and services ai-automation-cost-estimator runs on.'
runtime: Browser
framework: 'None. Plain HTML, CSS and JavaScript.'
build: 'None. No build step and no dependencies.'
storage: 'None. Nothing is stored and there is no backend.'
hosting: GitHub Pages
tests: 'node test.js, 10 assertions'
generated:
  by: claude-opus-5
  at: '2026-07-29T04:31:42+00:00'
status: stable
---

# Stack

* **Runtime**: the browser. There is no server and no backend.
* **Framework**: none. Plain HTML, CSS and JavaScript.
* **Build**: none. No build step, no npm dependencies to fetch.
* **Files that carry the logic**: `index.html` for the page, `calc.js` for the pricing math
  as pure functions, `test.js` for the suite.
* **Storage**: none. Nothing is stored and nothing is sent anywhere.
* **Hosting**: GitHub Pages, which serves a static page like this for $0.
* **Tests**: `node test.js`, 10 assertions including the $69 Zapier against $16 Make example.

## Notes

The cost model is: total equals platform orchestration plus token cost, where Zapier bills
per task, Make per operation, n8n per workflow execution, and the raw API has no platform
fee. `calc.js` runs in both the browser and Node.
