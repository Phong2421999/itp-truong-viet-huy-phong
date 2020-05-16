var express = require("express");
var router = express.Router();

const getUniversityController = require("../../../controllers/university/getUniversity.controller");

router.get("/", getUniversityController);

module.exports = router;
