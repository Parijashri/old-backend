const router  = require('express').Router();
const Idea    = require('../models/Idea');
const protect = require('../middleware/auth');

router.post('/:id', protect, async (req, res) => {
  const idea = await Idea.findById(req.params.id);

  if (idea.likers.includes(req.user._id)) {
    idea.likers.pull(req.user._id);
  } else {
    idea.likers.push(req.user._id);
  }

  idea.likes = idea.likers.length;
  await idea.save();

  res.json(idea);
});

module.exports = router;