var express = require("express");
var router = express.Router();

router.use("/google", require("./google.routes"));

module.exports = router;
