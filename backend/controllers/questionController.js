const { generateRandomArray } = require('../utils/testCaseGenerator');

exports.getQuestion = (req, res) => {
  const { topic } = req.params;
  if (topic === 'arrays') {
    const { testCase, expectedOutput, question } = generateRandomArray();
    res.json({ topic, question, testCase, expectedOutput });
  } else {
    res.status(400).json({ error: 'Topic not supported' });
  }
};
