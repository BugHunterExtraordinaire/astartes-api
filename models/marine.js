const mongoose = require('mongoose');

const marineSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Astartes name"],
    minlength: 3
  },
  chapter: {
    type: String,
    required: [true, "Please provide Astartes chapter"],
    minlength: 5
  },
  rank: {
    type: String,
    enum: ["Aspirant", "Neophyte", "Battle Brother", "Sargeant", "Lieutenant", "Captain", "Chapter Master"],
    default: "Battle Brother",
  },
  isTraitor: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Marine', marineSchema);