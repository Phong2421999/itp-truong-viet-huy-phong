var express = require("express");
var router = express.Router();

const createResultController = require("../../../controllers/result/createResult.controller");
const getUserResultController = require("../../../controllers/result/getUserResult.controller");
const resultValidate = require("../../../validate/results.validate");

router.post("/", resultValidate, createResultController);
router.get("/", getUserResultController);

module.exports = router;
