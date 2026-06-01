import { getActivePageClass } from ".";

describe("getActivePageClass", () => {
  it("returns selected classes for the current route", () => {
    expect(getActivePageClass("/dashboard", "/dashboard")).toBe(
      "font-semibold",
    );
  });

  it("returns unselected classes for other routes", () => {
    expect(getActivePageClass("/transactions", "/dashboard")).toBe(
      "text-gray-600 font-normal",
    );
  });
});
