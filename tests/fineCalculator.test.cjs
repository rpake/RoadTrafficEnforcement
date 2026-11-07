const test = require("node:test");
const assert = require("node:assert/strict");
test("demo fine fixture arithmetic", () => {
  const schedule = { speed: 150, seatbelt: 100 };
  assert.equal(schedule.speed + schedule.seatbelt, 250);
});
