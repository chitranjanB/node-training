const {
  absolute,
  greet,
  getCurrencies,
  getProduct,
  registerUser,
} = require("./lib");

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

describe("greet", () => {
  it("should greet the user", () => {
    const result = greet("chitranjan");
    expect(result).toBe("Welcome chitranjan");
    expect(result).toContain("chitranjan");
    expect(result).toMatch(/chitranjan/);
  });
});

describe("getCurrencies", () => {
  it("should get all currencies", () => {
    const result = getCurrencies();
    expect(result).toHaveLength(3);
    expect(result).to;
  });
});

describe("getProduct", () => {
  it("should get correct product", () => {
    const result = getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
  });
});

describe("registerUser", () => {
  it("should get fail if input username is falsy", () => {
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((arg) => expect(() => registerUser(arg)).toThrow());
  });

  it("should get return user if input username is correct", () => {
    const result = registerUser("chitranjan");
    expect(result).toHaveProperty("username");
    expect(result.username).toBe("chitranjan");
    expect(result.id).toBeGreaterThan(0);
  });
});
