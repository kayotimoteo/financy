import {
  categoryColors,
  categoryIcons,
  defaultCategoryColor,
  defaultCategoryIcon,
  getCategoryColorOption,
  getCategoryIconOption,
} from "./category-options";

describe("category options", () => {
  it("contains the configured default icon and color", () => {
    expect(getCategoryIconOption(defaultCategoryIcon)).toBeDefined();
    expect(getCategoryColorOption(defaultCategoryColor)).toBeDefined();
  });

  it("keeps icon and color values unique", () => {
    const iconValues = categoryIcons.map((option) => option.value);
    const colorValues = categoryColors.map((option) => option.value);

    expect(new Set(iconValues).size).toBe(iconValues.length);
    expect(new Set(colorValues).size).toBe(colorValues.length);
  });
});
