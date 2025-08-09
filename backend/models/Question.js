const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  topic: String,
  question: String,
  testCase: String,
  expectedOutput: String,
});

module.exports = mongoose.model('Question', questionSchema);
