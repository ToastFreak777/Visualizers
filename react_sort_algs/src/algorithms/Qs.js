//helper functions
import { swap } from "./helpers";

const QuickSort = (array, pos, arrSteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  sort(array, 0, array.length - 1, arrSteps, colorSteps, colorKey);
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
};

const sort = (arr, lo, hi, arrSteps, colorSteps, colorKey) => {
  if (hi <= lo) return;
  let mid = partition(arr, lo, hi, arrSteps, colorSteps, colorKey);
  sort(arr, lo, mid - 1, arrSteps, colorSteps, colorKey);
  sort(arr, mid + 1, hi, arrSteps, colorSteps, colorKey);
};

const partition = (arr, lo, hi, arrSteps, colorSteps, colorKey) => {
  let i = lo + 1;
  let j = hi;
  while (true) {
    while (arr[i] < arr[lo]) {
      colorKey[i] = 1;
      colorKey[lo] = 2;
      arrSteps.push(arr.slice());
      colorSteps.push(colorKey.slice());
      if (i === hi) break;
      i++;
      colorKey[i - 1] = 0;
      arrSteps.push(arr.slice());
      colorSteps.push(colorKey.slice());
    }
    while (arr[j] > arr[lo]) {
      colorKey[j] = 1;
      colorKey[lo] = 2;
      arrSteps.push(arr.slice());
      colorSteps.push(colorKey.slice());
      if (j === lo) break;
      j--;
      colorKey[j + 1] = 0;
      arrSteps.push(arr.slice());
      colorSteps.push(colorKey.slice());
    }
    if (i >= j) break;
    colorKey[j] = 1;
    colorKey[i] = 1;
    arrSteps.push(arr.slice());
    colorSteps.push(colorKey.slice());
    swap(arr, i, j);
    colorKey[j] = 0;
    colorKey[i] = 0;
    arrSteps.push(arr.slice());
    colorSteps.push(colorKey.slice());
  }

  colorKey[lo] = 1;
  colorKey[j] = 1;
  arrSteps.push(arr.slice());
  colorSteps.push(colorKey.slice());
  swap(arr, lo, j);
  colorKey[j] = 0;
  colorKey[lo] = 0;
  arrSteps.push(arr.slice());
  colorSteps.push(colorKey.slice());
  return j;
};

export default QuickSort;
