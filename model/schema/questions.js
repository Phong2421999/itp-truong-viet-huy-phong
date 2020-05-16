const mongoose = require("mongoose");

const { Schema } = mongoose;

const questions = new Schema({
  link: {
    type: String,
  },
  type: {
    type: String,
    enum: ["text", "image", "audio"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  A: {
    type: String,
  },
  B: {
    type: String,
  },
  C: {
    type: String,
  },
  D: {
    type: String,
  },
  rightAnswer: {
    type: String,
    required: true,
  },
  collectionId: {
    type: String,
    required: true,
  },
});

module.exports = questions;
