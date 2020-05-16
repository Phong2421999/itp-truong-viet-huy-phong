const mongoose = require("mongoose");

const { Schema } = mongoose;

const university = new Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
});

module.exports = university;
