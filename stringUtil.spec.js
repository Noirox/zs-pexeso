import { formatCombinationSum } from "./stringUtil";

describe("stringUtil", () => {
  test("it format it", () => {
    const s = formatCombinationSum([1, 1]);
    expect(s).toBe("1 + 1");
  });

  test("it format it when one of them is missing", () => {
    let s = formatCombinationSum([1]);
    expect(s).toBe("1 + 0");

    s = formatCombinationSum([, 1]);
    expect(s).toBe("0 + 1");
  });

  test("it format for array", () => {
    const s = [[1], [1, 2], [2, 2]].map(formatCombinationSum);

    expect(s).toEqual(["1 + 0", "1 + 2", "2 + 2"]);
  });
});
