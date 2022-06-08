const Bs = (array, target, arraySteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();
  split(array, target, 0, array.length - 1, arraySteps, colorSteps, colorKey);
};

const split = (
  array,
  target,
  left,
  right,
  arraySteps,
  colorSteps,
  colorKey
) => {
  if (left > right) {
    colorSteps[colorSteps.length - 1].fill(1);
    return;
  }

  const mid = Math.floor(left + (right - left) / 2);
  colorKey[mid] = 1;
  colorSteps.push(colorKey.slice(left, right + 1));
  arraySteps.push(array.slice(left, right + 1));

  if (target === array[mid]) {
    colorKey[mid] = 2;
    colorSteps.push(colorKey.slice(left, right + 1));
    arraySteps.push(array.slice(left, right + 1));
    return;
  }

  if (target < array[mid + 1]) {
    colorKey.fill(1, mid + 1, right + 1);
    colorSteps.push(colorKey.slice(left, right + 1));
    arraySteps.push(array.slice(left, right + 1));
    split(array, target, left, mid - 1, arraySteps, colorSteps, colorKey);
  } else {
    colorKey.fill(1, 0, mid + 1);
    colorSteps.push(colorKey.slice(left, right + 1));
    arraySteps.push(array.slice(left, right + 1));
    split(array, target, mid + 1, right, arraySteps, colorSteps, colorKey);
  }
};

export default Bs;
