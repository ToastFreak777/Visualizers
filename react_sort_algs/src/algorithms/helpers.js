const swap = (array, a, b) => {
  [array[a], array[b]] = [array[b], array[a]];
  return array;
};

export { swap };
