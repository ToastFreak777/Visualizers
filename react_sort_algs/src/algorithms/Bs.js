//helper functions
import swap from "./helpers";

const BubbleSort = (array, pos, arrSteps, colorSteps) => {
  var i, j, swapped;
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  const SIZE = array.length;

  for (i = 0; i < SIZE; i++) {
    swapped = false;
    for (j = 0; j < SIZE - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        array = swap(array, j, j + 1);
        swapped = true;
      }
      arrSteps.push(array.slice());
      // Set colors of two being compared
      colorKey[j] = 1;
      colorKey[j + 1] = 1;
      colorSteps.push(colorKey.slice());
      // Remove color back to default once done comparing
      colorKey[j] = 0;
      colorKey[j + 1] = 0;
    }
    // Set color once we swap
    colorKey[SIZE - 1 - i] = 2;
    arrSteps.push(array.slice());
    colorSteps.push(colorKey.slice());
    if (!swapped) {
      colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
      return;
    }
  }
};

export default BubbleSort;
