const router  = require('express').Router();
const User    = require('../models/User');
const protect = require('../middleware/auth');

router.post('/save', protect, async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    saved_items: req.body.items
  });
  res.json({ success: true });
});

router.get('/', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.json(user.saved_items);
});

module.exports = router;