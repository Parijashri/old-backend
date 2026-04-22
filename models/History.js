const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  searched_items: [String],
  result_count: Number
}, { timestamps: true });

module.exports = mongoose.model('History', HistorySchema);