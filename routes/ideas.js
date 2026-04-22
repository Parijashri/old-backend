const router  = require('express').Router();
const Idea    = require('../models/Idea');
const protect = require('../middleware/auth');

router.get('/', async (req, res) => {
  const ideas = await Idea.find({ status: 'approved' });
  res.json(ideas);
});

router.post('/', protect, async (req, res) => {
  const idea = await Idea.create({
    ...req.body,
    submitted_by: req.user._id
  });
  res.json(idea);
});

module.exports = router;