const mongoose = require("mongoose");

const { Schema } = mongoose;

const result = new Schema({
  count: {
    type: Number,
  },
  testTime: {
    type: Number,
  },
});

module.exports = result;
