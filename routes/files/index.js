var express = require("express");
var router = express.Router();

const usersValidate = require("../../validate/users.validate");
const adminValidate = require("../../validate/admins.validate");

router.use("/", usersValidate, require("./uploadFile"));
router.use("/", adminValidate, require("./deleteFile"));

module.exports = router;
