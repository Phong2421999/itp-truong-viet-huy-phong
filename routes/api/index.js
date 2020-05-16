var express = require("express");
var router = express.Router();

const usersValidate = require("../../validate/users.validate");
const ddosValidate = require("../../validate/ddos.validate");

router.use("/users", require("./users"));
router.use("/university", /*ddosValidate,*/ require("./university"));
router.use("/auth", require("./auth"));
router.use("/rank", /*ddosValidate,*/ require("./rank"));
router.use("/config", /*ddosValidate,*/ require("./config"));
router.use(usersValidate);
router.use("/questions", require("./questions"));
router.use("/result", require("./result"));

module.exports = router;
