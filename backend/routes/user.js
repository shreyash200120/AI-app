const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ name: user.name, email: user.email });
});

router.get('/stats', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ solved: user.solved, recent: user.recent, successRate: user.successRate });
});

module.exports = router;
