const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  api_key: { type: String, unique: true }
});

UserSchema.pre('save', async function(next) {
  // Generate API key if not provided
  if (!this.api_key) {
    this.api_key = uuidv4();
  }

  // Hash password if modified
  if (this.isModified('password_hash')) {
    this.password_hash = await bcrypt.hash(this.password_hash, 10);
  }
  next();
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
