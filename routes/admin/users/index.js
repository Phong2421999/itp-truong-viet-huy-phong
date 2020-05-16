var express = require("express");
var router = express.Router();

const getUsersController = require("../../../controllers/users/getUsers.controller");

router.get("/", getUsersController);
router.get("/:id", getUsersController);

module.exports = router;
