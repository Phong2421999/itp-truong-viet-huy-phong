var express = require("express");
var router = express.Router();

const getPostsController = require("../../../controllers/posts/getPosts.controller");

router.get("/", getPostsController);
router.get("/:id", getPostsController);

module.exports = router;
