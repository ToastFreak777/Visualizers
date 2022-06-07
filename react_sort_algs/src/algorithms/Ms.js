const split = (
  array,
  start,
  end,
  arrSteps,
  colorSteps,
  colorKey = undefined
) => {
  if (start >= end) {
    colorKey[start] = 1;
    arrSteps.push(array.slice());
    colorSteps.push(colorKey.slice());
    return;
  }
  if (colorKey === undefined) {
    colorKey = colorSteps[colorSteps.length - 1].slice();
  } else {
    colorKey.fill(1, start, end + 1);
    arrSteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }

  const middle = Math.floor(start + (end - start) / 2);

  if (colorSteps.length > 1) {
    colorKey.fill(0, start, end + 1);
    arrSteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }
  split(array, start, middle, arrSteps, colorSteps, colorKey);
  colorKey.fill(0, start, end + 1);
  arrSteps.push(array.slice());
  colorSteps.push(colorKey.slice());
  split(array, middle + 1, end, arrSteps, colorSteps, colorKey);
  merge(array, start, middle, end, arrSteps, colorSteps, colorKey);
  colorKey.fill(0, start, end + 1);
  arrSteps.push(array.slice());
  colorSteps.push(colorKey.slice());
};

const merge = (array, start, mid, end, arrSteps, colorSteps, colorKey) => {
  let i = start,
    k = start,
    j = mid + 1;

  const subArray = array.slice();

  colorKey[j] = 1;
  colorKey[i] = 1;
  arrSteps.push(array.slice());
  colorSteps.push(colorKey.slice());

  for (k; k <= end; k++) {
    if (i > mid) {
      colorKey[j] = 0;
      colorKey[i] = 0;
      array[k] = subArray[j++];
    } else if (j > end) {
      colorKey[j] = 0;
      colorKey[i] = 0;
      array[k] = subArray[i++];
    } else if (subArray[j] < subArray[i]) {
      colorKey[j] = 0;
      colorKey[i] = 0;
      array[k] = subArray[j++];
    } else {
      colorKey[j] = 0;
      colorKey[i] = 0;
      array[k] = subArray[i++];
    }

    if (!noChange(array, subArray)) {
      arrSteps.push(array.slice());
      colorSteps.push(colorKey.slice());
    }
  }
};

const MergeSort = (array, pos, arrSteps, colorSteps) => {
  split(array, 0, array.length - 1, arrSteps, colorSteps);
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
};

const noChange = (arr, subArr) => {
  if (arr.length !== subArr.length) return false;

  return arr.every((value, index) => value === subArr[index]);
};

export default MergeSort;
