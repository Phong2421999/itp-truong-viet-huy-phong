var express = require("express");
var router = express.Router();

const getConfigController = require("../../../controllers/config/getConfig.controller");

router.get("/", getConfigController);

module.exports = router;
