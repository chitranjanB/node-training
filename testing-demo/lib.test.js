const { TestScheduler } = require("jest");
const { absolute } = require("./lib");

test("absolute - positive number", () => {
  const result = absolute(1);
  expect(result).toBe(1);
});

test("absolute - negative number", () => {
  const result = absolute(-1);
  expect(result).toBe(1);
});

test("absolute - zero number", () => {
  const result = absolute(0);
  expect(result).toBe(0);
});
