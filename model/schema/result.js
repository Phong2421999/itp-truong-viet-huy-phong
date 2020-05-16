const mongoose = require("mongoose");

const { Schema } = mongoose;

const result = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  universityId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  rightAnswerNumber: {
    type: Number,
    required: true,
  },
  testTime: {
    type: Number,
    required: true,
  },
});

module.exports = result;
