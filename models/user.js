const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [
      /\w+@\w+\.com/i,
      "Please provide a valid email"
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(12);
  return this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method('verifyPassword', async function(password) {
  return await bcrypt.compare(password, this.password)
});

module.exports = mongoose.model('User', userSchema);