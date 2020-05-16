var mongoose = require("mongoose");

var posts = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  time: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = posts;
