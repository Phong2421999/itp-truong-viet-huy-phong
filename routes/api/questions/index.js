var express = require("express");
var router = express.Router();

const getQuestionsController = require("../../../controllers/questions/getQuestions.controller");
const userQuestionValidate = require("../../../validate/userQuestion.validate");

router.get("/", userQuestionValidate, getQuestionsController);

module.exports = router;
