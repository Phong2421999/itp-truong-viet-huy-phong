var express = require("express");
var router = express.Router();

const adminValidate = require("../../validate/admins.validate");
const adminLoginController = require("../../controllers/admin/login.controller");
const updateAdminController = require("../../controllers/admin/update.controller");
const refreshToken = require("../../controllers/admin/refreshToken.controller");

router.post("/login", adminLoginController);
router.use(adminValidate);
router.put("/", updateAdminController);
router.get("/refresh", refreshToken);
router.use("/questions", require("./questions"));
router.use("/university", require("./university"));
router.use("/config", require("./config"));
router.use("/users", require("./users"));
router.use("/rank", require("./rank"));
router.use("/questionCollections", require("./questionCollections"));

module.exports = router;
