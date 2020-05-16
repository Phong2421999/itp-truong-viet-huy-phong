const mongoose = require("mongoose");

const { Schema } = mongoose;

const config = new Schema({
  testTime: {
    type: Number,
    default: 1,
  },
  timeOnTest: {
    type: Number,
    default: 20,
  },
  testCollectionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  canTest: {
    type: Boolean,
    default: true,
  },
});

module.exports = config;
