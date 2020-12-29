const { absolute } = require("./lib");

describe("absolute", () => {
  it("should return positive number, given input as positive number", () => {
    const result = absolute(1);
    expect(result).toBe(1);
  });

  it("should return negative number, given input as negative number", () => {
    const result = absolute(-1);
    expect(result).toBe(1);
  });

  it("should return zero, given input as zero", () => {
    const result = absolute(0);
    expect(result).toBe(0);
  });
});
