const mongoose = require("mongoose");

const { Schema } = mongoose;

const questionCollections = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

module.exports = questionCollections;
