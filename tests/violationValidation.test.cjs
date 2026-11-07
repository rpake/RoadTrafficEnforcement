const test = require("node:test");
const assert = require("node:assert/strict");
test("plate demo validation example", () =>
  assert.equal(/^[A-Z0-9 -]{3,12}$/.test("ABC 123"), true));
