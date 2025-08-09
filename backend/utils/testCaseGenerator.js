function generateRandomArray(size = 5) {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
  return {
    testCase: arr.join(' '),
    expectedOutput: Math.max(...arr).toString(),
    question: `Given an array of integers, find the maximum number.\nInput: ${arr.join(' ')}\nOutput: ${Math.max(...arr)}`
  };
}

module.exports = { generateRandomArray };
