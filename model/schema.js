var mongoose = require("mongoose");
var schema = require("./schema/index");

module.exports = {
  users: mongoose.model("users", schema.users),
  questions: mongoose.model("questions", schema.questions),
  result: mongoose.model("result", schema.result),
  university: mongoose.model("university", schema.university),
  config: mongoose.model("config", schema.config),
  posts: mongoose.model("posts", schema.posts),
  admins: mongoose.model("admins", schema.admins),
  questionCollections: mongoose.model(
    "questionCollections",
    schema.questionCollections
  ),
  rank: mongoose.model("rank", schema.rank),
  total: mongoose.model("total", schema.total),
};
