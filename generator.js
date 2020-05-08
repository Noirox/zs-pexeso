import { formatCombinationSum } from "./stringUtil";

const candidatesDefautl = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20
];

export function newCardObject(item, idx) {
  return { id: idx, selected: false, hasMatch: false, ...item };
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getCombinationSum(candidates, target, limitSumLen) {
  let res = [];
  let combineDFS = (prefix = [], start = 0, sum = 0) => {
    if (limitSumLen) {
      if (sum === target && prefix.length <= limitSumLen) res.push(prefix);
    } else {
      if (sum === target) res.push(prefix);
    }

    for (let i = start; i < candidates.length; i++) {
      let n = candidates[i];
      if (sum + n > target || n === 0) continue;
      combineDFS(prefix.concat(n), i, sum + n);
    }
  };
  combineDFS([], 0, 0);
  return res;
}

function getRandomItemFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function itemToNumberAndItsSum(from, to, cross, candidates) {
  let targetNumber = getRandomInt(from, to);
  let possibleCombinationSums = getCombinationSum(candidates, targetNumber, 2);

  if (!cross) {
    possibleCombinationSums = possibleCombinationSums.filter(
      arr => arr[0] >= 10 || arr[1] >= 10
    );
  }

  possibleCombinationSums = possibleCombinationSums.map(formatCombinationSum);
  let combinationSum = getRandomItemFromArr(possibleCombinationSums);
  return { targetNumber, combinationSum };
}

function splitNumberAndCombinationSum(acc, curr) {
  acc.push({ value: curr.targetNumber, text: "" + curr.targetNumber });
  acc.push({ value: curr.targetNumber, text: curr.combinationSum });
  return acc;
}

export function generateSumSamples({
  size,
  from = 1,
  to = 10,
  cross = true,
  candidates = candidatesDefautl
}) {
  return new Array(size)
    .fill(0)
    .map(() => itemToNumberAndItsSum(from, to, cross, candidates))
    .reduce(splitNumberAndCombinationSum, [])
    .map(newCardObject);
}
