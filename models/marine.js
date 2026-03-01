const mongoose = require('mongoose');

const marineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide Astartes name"],
    minlength: 3
  },
  chapter: {
    type: String,
    required: [true, "Please provide Astartes chapter"],
    enum: ["the Emperor's Children", "World Eaters", "Death Guard", "Thousand Sons", 
           "Black Legion", "Word Bearers", "Iron Warriors", "Night Lords", 
           "Alpha Legion", "Black Templars", "Crimson Fists", "Dark Angels", 
           "Blood Angels", "White Scars", "Imperial Fists", "Iron Hands", 
           "Ultramarines", "Salamanders", "Raven Gaurd"]
  },
  rank: {
    type: String,
    enum: ["Aspirant", "Neophyte", "Vanguard Space Marine", "Battle Brother", 
           "Sergeant", "Lieutenant", "Captain", "Chapter Master", 
           "Librarian", "Chaplain", "Apothecary", "Techmarine", 
           "Master of the Signal", "Chapter Ancient", "Judiciar"],
    default: "Battle Brother",
  },
  isTraitor: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}, {
  timestamps: true
});

marineSchema.pre('save', function() {
  const traitorMarines = ["The Emperor's Children", "World Eaters", "Death Guard", 
                          "Thousand Sons", "Black Legion", "Word Bearers", 
                          "Iron Warriors", "Night Lords", "Alpha Legion"];
  traitorMarines.forEach(traitor => {
    if (traitor === this.chapter) {
      this.isTraitor = true;
    }
  });
})

module.exports = mongoose.model('Marine', marineSchema);