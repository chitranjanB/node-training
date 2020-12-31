const {
  absolute,
  greet,
  getCurrencies,
  getProduct,
  registerUser,
  applyDiscount,
  notifyCustomer,
} = require("./lib");

const db = require("./db");
const mail = require("./mail");

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

describe("applyDiscount", () => {
  it("should apply discount correctly", () => {
    db.getCustomerSync = (id) => {
      console.log("Mocked getCustomerSync function");
      return { id: id, points: 11 };
    };
    const order = { customerId: 1, totalPrice: 100 };
    applyDiscount(order);
  });
});

describe("notifyCustomer", () => {
  it("should notify customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "email" });
    mail.send = jest.fn().mockReturnValue();

    const order = { customerId: 1, totalPrice: 100 };
    notifyCustomer(order);

    expect(mail.send).toBeCalledWith(
      "email",
      "Your order was placed successfully."
    );

    //Matching email name - match
    expect(mail.send.mock.calls[0][0]).toBe("email");
    //Matching the calls with args - match
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);

    expect(mail.send).toBeCalledTimes(1);
  });
});
