const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    trim: true,
    match: [
      /\w+@\w+\.com/i,
      "Please provide a valid email"
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    trim: true,
  }
});

userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.verifyPassword = async function() {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateJwt = function() {
  const token = jwt.sign(
    {
      userId: this._id,
      name: this.name
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    });
  return token;
}

module.exports = mongoose.model('User', userSchema);