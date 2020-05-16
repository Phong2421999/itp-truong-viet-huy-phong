const { google } = require("googleapis");
var express = require("express");
var router = express.Router();
const googleConfig = require("../../../googleConfig");

const googleCallbackController = require("../../../controllers/auth/googleCallback.controller");
const googleSiginURLController = require("../../../controllers/auth/googleSiginURL.controller");

router.get("/callback", googleCallbackController);
router.get("/", googleSiginURLController);

module.exports = router;
