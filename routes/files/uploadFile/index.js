var express = require("express");
var router = express.Router();
const uploadFilesController = require("../../../controllers/files/uploadFiles.controller");
const filesValidate = require("../../../validate/files.validate");
const { uploadFile } = require("../../../services/uploadFile");

router.post(
  "/",
  uploadFile(["png", "jpeg", "jpg"]).single("file"),
  filesValidate,
  uploadFilesController
);
module.exports = router;
