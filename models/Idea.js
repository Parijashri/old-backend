const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: String,
  category: String,
  emoji: String,
  required_items: [String],
  optional_items: [String],
  steps: [String],
  likes: { type: Number, default: 0 },
  likers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, default: 'pending' },
  submitted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Idea', IdeaSchema);