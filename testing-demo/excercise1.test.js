const { fizzBuzz } = require("./exercise1");

describe("fizzBuzz", () => {
  it("should throw when input is not a number", () => {
    expect(() => fizzBuzz("input")).toThrow();
  });

  it("should return fizzbuzz, if multiple of 3 and 5", () => {
    const result = fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should return Fizz, if multiple of 3", () => {
    const result = fizzBuzz(3);
    expect(result).toBe("Fizz");
  });

  it("should return Buzz, if multiple of 5", () => {
    const result = fizzBuzz(5);
    expect(result).toBe("Buzz");
  });

  it("should return input, if not multiple of 3 or 5", () => {
    const result = fizzBuzz(2);
    expect(result).toBe(2);
  });
});
