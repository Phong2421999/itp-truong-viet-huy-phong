var express = require("express");
var router = express.Router();

const createQuestionsController = require("../../../controllers/questions/createQuestions.controller");
const deleteQuestionsController = require("../../../controllers/questions/deleteQuestions.controller");
const updateQuestionsController = require("../../../controllers/questions/updateQuestions.controller");
const getQuestionsController = require("../../../controllers/questions/getQuestions.controller");
const allowNotUploadFileValidate = require("../../../validate/allowNotUploadFile");
const { uploadFile } = require("../../../services/uploadFile");

router.get("/", getQuestionsController);
router.post(
  "/",
  uploadFile(["wav", "mp3", "m4a", "png", "jpeg", "jpg"]).single("file"),
  allowNotUploadFileValidate,
  createQuestionsController
);
router.delete("/:id", deleteQuestionsController);
router.put(
  "/:id",
  uploadFile(["wav", "mp3", "m4a", "png", "jpeg", "jpg"]).single("file"),
  allowNotUploadFileValidate,
  updateQuestionsController
);

module.exports = router;
