var express = require("express");
var router = express.Router();
const userLoginController = require("../../../controllers/users/userLogin.controller");
const updateUsersController = require("../../../controllers/users/updateUsers.controllers");
const userFirstLoginController = require("../../../controllers/users/userFirstLogin.controller");
const getUsersController = require("../../../controllers/users/getUsers.controller");
const usersValidate = require("../../../validate/users.validate");
const refreshTokenController = require("../../../controllers/tokens/refreshToken.controller");
const ddosValidate = require("../../../validate/ddos.validate");

router.post("/login", userLoginController);
router.post("/login/:id", userFirstLoginController);
router.get("/refresh", /*ddosValidate,*/ refreshTokenController);
//router.put("/:id", usersValidate, updateUsersController);
router.get("/", usersValidate, getUsersController);

module.exports = router;
