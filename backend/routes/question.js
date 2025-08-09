const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const questionDB = {
  arrays: 'Find the maximum subarray sum using Kadane’s Algorithm.',
  strings: 'Check if a string is a valid palindrome ignoring non-alphanumeric characters.',
};

router.get('/:topic', auth, (req, res) => {
  const question = questionDB[req.params.topic.toLowerCase()] || 'No question found';
  res.json({ question });
});

module.exports = router;
