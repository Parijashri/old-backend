const router    = require('express').Router();
const Idea      = require('../models/Idea');
const protect   = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.get('/pending', protect, adminOnly, async (req, res) => {
  const ideas = await Idea.find({ status: 'pending' });
  res.json(ideas);
});

router.patch('/approve/:id', protect, adminOnly, async (req, res) => {
  const idea = await Idea.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.json(idea);
});

router.delete('/reject/:id', protect, adminOnly, async (req, res) => {
  await Idea.findByIdAndUpdate(req.params.id, { status: 'rejected' });
  res.json({ success: true });
});

module.exports = router;