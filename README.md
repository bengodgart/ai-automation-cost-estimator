# ai-automation-cost-estimator

**See what an AI automation will cost before you build it.** Pick a platform, a model, how many steps and how often it runs, and get the monthly cost, with the same automation priced across Zapier, Make, n8n, and calling the API directly.

Automation builders wire LLM calls into workflows with no per-run cost visibility. None of Zapier, Make, or n8n show you the dollar cost of a run up front, so the bill is a surprise. The same four-step workflow at a thousand runs a month can be roughly $69 on Zapier and $16 on Make, and you cannot see that gap until it arrives. This makes it visible before you commit.

It is a single page. No signup, no backend, nothing stored, all math in your browser.

## Try it

Open `index.html` in a browser, or use the live version once it is deployed (see below). Change any input and every number updates instantly.

## What it shows

- **Monthly total** for the platform you picked, split into platform orchestration cost and LLM token cost.
- **Raw API comparison:** what the same work would cost calling the model directly, and how much you are paying the platform on top for orchestration.
- **Side by side:** the same automation priced across Zapier, Make, n8n, and raw API, cheapest highlighted.

## How the cost is modeled

- Zapier bills per task, Make per operation, n8n per workflow execution, raw API has no platform fee.
- Token cost is your model provider's price for the LLM steps (you bring your key), the same across platforms.
- Total = platform orchestration + token cost. Raw API total is the token cost alone.

Rates are editable, so you can match your own plan. Defaults are representative July 2026 figures and are clearly labeled estimates, with source links on the page. A precise figure depends on your plan tier and current provider pricing.

## The numbers are tested

The pricing math lives in `calc.js` as pure functions, with a dependency-free test suite:

```bash
node test.js   # 10 assertions, including the $69 Zapier vs $16 Make example
```

## Deploy it free

It is a static page (`index.html` + `calc.js`), so GitHub Pages hosts it for $0. See `publish-guide.html` for the click path, or any static host works.

## Why I built it

I ran marketing automations for years and watched AI steps turn into cost surprises nobody could see coming. Every platform hides the per-run cost of an LLM call, and the price gap between platforms is large and invisible until the invoice. So I made the math public and let you see it before you build.

## License

MIT. See [LICENSE](LICENSE).
