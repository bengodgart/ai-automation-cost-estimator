---
type: Playbook
title: Run ai-automation-cost-estimator locally
description: 'How to open ai-automation-cost-estimator and run its tests on a dev machine.'
generated:
  by: claude-opus-5
  at: '2026-07-29T04:00:00+00:00'
status: stable
---

# Steps

1. Clone the repo: `git clone https://github.com/bengodgart/ai-automation-cost-estimator.git`
2. Open `index.html` in a browser. There is nothing to install and no environment variables
   to set.
3. Change any input and every number updates instantly.

## Available scripts

* `node test.js` runs the test suite, 10 assertions.

There is no package manager step. The repo has no `package.json` and no dependencies.

## Common failures

* The platform rates are July 2026 estimates, not a live price feed. If a number disagrees
  with a real invoice, edit the rates to match that plan tier rather than assuming the math
  is wrong.

## Deploying

It is a static page, so GitHub Pages hosts it for $0. `publish-guide.html` in the repo has
the click path, and any static host works.
