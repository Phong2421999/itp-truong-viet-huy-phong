var express = require("express");
var router = express.Router();

const updateConfigController = require("../../../controllers/config/updateConfig.controller");
const getConfigController = require("../../../controllers/config/getConfig.controller");

router.get("/", getConfigController);
router.put("/", updateConfigController);

module.exports = router;
