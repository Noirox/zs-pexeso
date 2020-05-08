import {
  getRandomInt,
  getCombinationSum,
  newCardObject,
  generateSumSamples
} from "./generator";

describe("generator", () => {
  test("it should get random int in range", () => {
    for (let a = 0; a < 100; a++) {
      const i = getRandomInt(1, 10);
      expect(i).toBeGreaterThan(0);
      expect(i).toBeLessThan(11);
    }
  });

  test("it should get all combination sums for given number", () => {
    const com = getCombinationSum([1, 2], 3);
    expect(com).toEqual([[1, 1, 1], [1, 2]]);
  });

  test("it should return empty array of array when there is no combination for given number", () => {
    const com = getCombinationSum([1, 2], 0);
    expect(com).toEqual([[]]);
  });

  test("it should allow limit how many members of sum should be there", () => {
    const com = getCombinationSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4, 2);
    expect(com).toEqual([[1, 3], [2, 2], [4]]);
  });

  test("it should create new card object", () => {
    const a = [{}, {}].map(newCardObject);

    expect(a).toEqual([
      { hasMatch: false, id: 0, selected: false },
      { hasMatch: false, id: 1, selected: false }
    ]);
    expect(a[0]).not.toBe(a[1]);
  });

  test("wtf", () => {
    const b = generateSumSamples({ size: 10 });
    console.log(b);
    expect(b.length).toBe(20);
  });
});
