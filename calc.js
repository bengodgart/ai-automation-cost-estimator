// Pure pricing math for the AI automation cost estimator.
// Works in the browser (attaches to window.CostCalc) and in Node (module.exports),
// so the same function powers the page and the tests.
//
// Model of cost:
//   orchestration = what the automation PLATFORM charges to run the steps
//     - Zapier: billed per task; tasks = steps * runs
//     - Make:   billed per operation; operations = steps * runs
//     - n8n:    billed per workflow execution; executions = runs (steps are free within a run)
//     - raw:    no platform; orchestration = 0
//   tokenCost = what the MODEL PROVIDER charges for the LLM calls (you bring your key)
//             = llmSteps * runs * (inTokens * inRate + outTokens * outRate)
//   total = orchestration + tokenCost
//   rawApiTotal = tokenCost (no platform fee)
//   platformOverhead = total - rawApiTotal = orchestration
//
// Rates are editable in the UI. Defaults are representative July 2026 figures and
// are ESTIMATES; see the sources note on the page.

(function (root) {
  // default per-unit platform rates (USD)
  var PLATFORM_DEFAULTS = {
    zapier: { unit: "task", perUnit: 0.0173, billBy: "step" },   // ~$0.0173/task
    make: { unit: "operation", perUnit: 0.0040, billBy: "step" }, // ~$0.004/op
    n8n: { unit: "execution", perUnit: 0.0060, billBy: "run" },   // ~$0.006/execution
    raw: { unit: "none", perUnit: 0.0, billBy: "none" },
  };

  // default model token rates in USD per 1,000,000 tokens (in / out)
  var MODEL_DEFAULTS = {
    "claude-haiku": { label: "Claude Haiku", in: 0.80, out: 4.0 },
    "claude-sonnet": { label: "Claude Sonnet", in: 3.0, out: 15.0 },
    "gpt-4o-mini": { label: "GPT-4o mini", in: 0.15, out: 0.60 },
    "gpt-4o": { label: "GPT-4o", in: 2.5, out: 10.0 },
  };

  function round(n) {
    return Math.round(n * 100) / 100;
  }

  // inputs: {platform, steps, llmSteps, inTokens, outTokens, runs, perUnit, modelInRate, modelOutRate}
  // perUnit / modelInRate / modelOutRate are optional overrides.
  function estimate(inputs) {
    var errors = [];
    var platform = inputs.platform;
    if (!PLATFORM_DEFAULTS[platform]) errors.push("Pick a platform.");
    var steps = num(inputs.steps);
    var llmSteps = num(inputs.llmSteps);
    var runs = num(inputs.runs);
    var inTokens = num(inputs.inTokens);
    var outTokens = num(inputs.outTokens);

    if (steps < 0) errors.push("Steps per run cannot be negative.");
    if (llmSteps < 0) errors.push("LLM steps cannot be negative.");
    if (llmSteps > steps) errors.push("LLM steps cannot exceed total steps per run.");
    if (runs < 0) errors.push("Monthly runs cannot be negative.");
    if (errors.length) return { errors: errors };

    var def = PLATFORM_DEFAULTS[platform];
    var perUnit = inputs.perUnit != null ? num(inputs.perUnit) : def.perUnit;

    var units;
    if (def.billBy === "step") units = steps * runs;
    else if (def.billBy === "run") units = runs;
    else units = 0;
    var orchestration = units * perUnit;

    var inRate = (inputs.modelInRate != null ? num(inputs.modelInRate) : null);
    var outRate = (inputs.modelOutRate != null ? num(inputs.modelOutRate) : null);
    if (inRate == null || outRate == null) {
      var m = MODEL_DEFAULTS[inputs.model] || MODEL_DEFAULTS["claude-sonnet"];
      if (inRate == null) inRate = m.in;
      if (outRate == null) outRate = m.out;
    }
    // rates are per 1,000,000 tokens
    var perLlmCall = (inTokens * inRate + outTokens * outRate) / 1000000;
    var tokenCost = llmSteps * runs * perLlmCall;

    var total = orchestration + tokenCost;
    var rawApiTotal = tokenCost;

    return {
      errors: [],
      platform: platform,
      unit: def.unit,
      units: units,
      perUnit: perUnit,
      orchestration: round(orchestration),
      tokenCost: round(tokenCost),
      total: round(total),
      rawApiTotal: round(rawApiTotal),
      platformOverhead: round(total - rawApiTotal),
    };
  }

  // estimate the same scenario across all platforms for the comparison view
  function estimateAll(inputs) {
    var out = {};
    ["zapier", "make", "n8n", "raw"].forEach(function (p) {
      var copy = Object.assign({}, inputs, { platform: p, perUnit: null });
      out[p] = estimate(copy);
    });
    return out;
  }

  function num(v) {
    var n = typeof v === "number" ? v : parseFloat(v);
    return isNaN(n) ? 0 : n;
  }

  var api = {
    estimate: estimate,
    estimateAll: estimateAll,
    PLATFORM_DEFAULTS: PLATFORM_DEFAULTS,
    MODEL_DEFAULTS: MODEL_DEFAULTS,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.CostCalc = api;
  }
})(typeof window !== "undefined" ? window : this);
