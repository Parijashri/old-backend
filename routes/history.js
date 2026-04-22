const router  = require('express').Router();
const History = require('../models/History');
const protect = require('../middleware/auth');

router.post('/', protect, async (req, res) => {
  const data = await History.create({
    user_id: req.user._id,
    ...req.body
  });
  res.json(data);
});

router.get('/', protect, async (req, res) => {
  const data = await History.find({ user_id: req.user._id });
  res.json(data);
});

module.exports = router;