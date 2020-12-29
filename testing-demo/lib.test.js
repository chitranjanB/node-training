const { absolute } = require("./lib");

describe("absolute", () => {
  test("positive number", () => {
    const result = absolute(1);
    expect(result).toBe(1);
  });

  test("negative number", () => {
    const result = absolute(-1);
    expect(result).toBe(1);
  });

  test("zero number", () => {
    const result = absolute(0);
    expect(result).toBe(0);
  });
});
