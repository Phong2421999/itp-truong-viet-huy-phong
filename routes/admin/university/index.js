var express = require("express");
var router = express.Router();

const getUniversityController = require("../../../controllers/university/getUniversity.controller");
const createUniversityController = require("../../../controllers/university/createUniversity.controller");
const updateUniversityController = require("../../../controllers/university/updateUniversity.controller");
const deleteUniversityController = require("../../../controllers/university/deleteUniversity.controller");
const { uploadFile } = require("../../../services/uploadFile");
const filesValidate = require("../../../validate/files.validate");
const allowNotUploadFileValidate = require("../../../validate/allowNotUploadFile");

router.get("/", getUniversityController);
router.post(
  "/",
  uploadFile(["png", "jpeg", "jpg"]).single("file"),
  filesValidate,
  createUniversityController
);
router.put(
  "/:id",
  uploadFile(["png", "jpeg", "jpg"]).single("file"),
  allowNotUploadFileValidate,
  updateUniversityController
);
router.delete("/:id", deleteUniversityController);

module.exports = router;
