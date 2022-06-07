const Ls = (array, target, arraySteps, colorSteps) => {
  const SIZE = array.length;
  var i;

  let colorKey = colorSteps[colorSteps.length - 1].slice();

  for (i = 0; i < SIZE; i++) {
    if (i > 0) {
      colorKey[i] = 1;
      colorKey[i - 1] = 0;
    } else colorKey[i] = 1;

    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());

    if (array[i] === target) {
      colorKey[i] = 2;
      arraySteps.push(array.slice());
      colorSteps.push(colorKey.slice());
      return;
    }
  }

  colorSteps[colorSteps.length - 1] = new Array(SIZE).fill(1);
};

export default Ls;
