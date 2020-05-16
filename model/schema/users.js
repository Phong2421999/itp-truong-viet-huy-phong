const mongoose = require("mongoose");

const { Schema } = mongoose;

const users = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  universityId: {
    type: Schema.Types.ObjectId,
  },
  studentId: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = users;
