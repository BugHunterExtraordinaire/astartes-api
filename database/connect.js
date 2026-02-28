const mongoose = require('mongoose');

const connectDB = async (uri) => {
  return await mongoose.connect(uri, {
    dbName: "CODEX-ASTARTES"
  })
};

module.exports = connectDB;