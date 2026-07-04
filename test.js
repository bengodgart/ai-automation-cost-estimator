// Smoke tests for the pricing math. Run: node test.js
// No dependencies. Exits non-zero on any failure.

const CostCalc = require("./calc.js");

let passed = 0;
let failed = 0;

function assert(name, cond) {
  if (cond) {
    passed++;
    console.log("  ok   " + name);
  } else {
    failed++;
    console.log("  FAIL " + name);
  }
}

function approx(a, b, tol) {
  return Math.abs(a - b) <= (tol == null ? 0.01 : tol);
}

// The cited example: a 4-step workflow at 1,000 runs/month.
// With no LLM token cost (llmSteps 0) the total is pure orchestration.
const base = { steps: 4, llmSteps: 0, inTokens: 0, outTokens: 0, runs: 1000, model: "claude-sonnet" };

const zap = CostCalc.estimate(Object.assign({}, base, { platform: "zapier" }));
assert("zapier orchestration ~ $69 (4*1000*0.0173)", approx(zap.orchestration, 69.2, 0.5));

const make = CostCalc.estimate(Object.assign({}, base, { platform: "make" }));
assert("make orchestration ~ $16 (4*1000*0.004)", approx(make.orchestration, 16.0, 0.1));

const n8n = CostCalc.estimate(Object.assign({}, base, { platform: "n8n" }));
assert("n8n bills per run: 1000*0.006 = $6", approx(n8n.orchestration, 6.0, 0.01));

const raw = CostCalc.estimate(Object.assign({}, base, { platform: "raw" }));
assert("raw has no orchestration cost", raw.orchestration === 0);

// token cost: 1 LLM step, 1000 runs, 1000 in + 500 out tokens, claude-sonnet ($3/$15 per 1M)
// per call = (1000*3 + 500*15)/1e6 = (3000 + 7500)/1e6 = 0.0105 ; *1000 runs = $10.50
const tok = CostCalc.estimate({
  platform: "raw", steps: 2, llmSteps: 1, inTokens: 1000, outTokens: 500, runs: 1000, model: "claude-sonnet",
});
assert("token cost = $10.50 for the sonnet example", approx(tok.tokenCost, 10.5, 0.01));
assert("raw total equals its token cost", approx(tok.total, tok.rawApiTotal, 0.001));

// platform overhead = total - rawApiTotal = orchestration
const full = CostCalc.estimate({
  platform: "zapier", steps: 4, llmSteps: 1, inTokens: 1000, outTokens: 500, runs: 1000, model: "claude-sonnet",
});
assert("platform overhead equals orchestration", approx(full.platformOverhead, full.orchestration, 0.01));
assert("full total = orchestration + tokenCost", approx(full.total, full.orchestration + full.tokenCost, 0.01));

// validation: llmSteps > steps is an error
const bad = CostCalc.estimate({ platform: "make", steps: 1, llmSteps: 3, inTokens: 100, outTokens: 100, runs: 10 });
assert("llmSteps > steps produces an error", bad.errors && bad.errors.length > 0);

// estimateAll returns all four platforms
const all = CostCalc.estimateAll(base);
assert("estimateAll covers zapier/make/n8n/raw", all.zapier && all.make && all.n8n && all.raw);

console.log("\n" + passed + " passed, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
