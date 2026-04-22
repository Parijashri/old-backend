const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
 
const UserSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  password:    { type: String, required: true },
  role:        { type: String, enum: ['user','admin'], default: 'user' },
  saved_items: [{ type: String }],
  liked_ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Idea' }],
  saved_ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Idea' }],
}, { timestamps: true });
 
// Hash password before save
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
 
UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};
 
module.exports = mongoose.model('User', UserSchema);