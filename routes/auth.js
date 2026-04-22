const router = require('express').Router();
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const sign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ token: sign(user._id), user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password)))
      return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ token: sign(user._id), user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;