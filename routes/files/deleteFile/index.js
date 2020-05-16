var express = require("express");
var router = express.Router();
const deleteFilesController = require("../../../controllers/files/deleteFiles.controller");

router.delete("/", deleteFilesController);
module.exports = router;
