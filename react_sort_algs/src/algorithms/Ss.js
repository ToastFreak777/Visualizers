//helper functions
const swap = (array, a, b) => {
  [array[a], array[b]] = [array[b], array[a]];
  return array;
};

const SelectionSort = (array, pos, arrSteps, colorSteps) => {
  var i, j, target;
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  const SIZE = array.length;

  for (i = 0; i < SIZE - 1; i++) {
    target = 0;
    j = 1;

    while (j < SIZE - i) {
      // Set colors of two being compared
      colorKey[target] = 1;
      colorKey[j] = 1;
      arrSteps.push(array.slice());
      colorSteps.push(colorKey.slice());
      if (array[j] >= array[target]) {
        colorKey[target] = 0;
        target = j;
      } else {
        // Remove color back to default once done comparing
        colorKey[j] = 0;
      }
      j++;
    }

    colorKey[target] = 0;
    array = swap(array, target, j - 1);
    arrSteps.push(array.slice());

    // Set color once we swap
    colorKey[j - 1] = 2;
    // arrSteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }
  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
};

export default SelectionSort;
