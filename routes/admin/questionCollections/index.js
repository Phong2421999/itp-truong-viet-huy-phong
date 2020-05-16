var express = require("express");
var router = express.Router();

const getQuestionCollectionsController = require("../../../controllers/questionCollections/getQuestionCollections.controller");
const deleteQuestionCollectionsController = require("../../../controllers/questionCollections/deleteQuestionCollections.controller");
const updateQuestionCollectionsController = require("../../../controllers/questionCollections/updateQuestionCollections.controller");
const createQuestionCollectionsController = require("../../../controllers/questionCollections/createQuestionCollection.controller");

router.get("/", getQuestionCollectionsController);
router.post("/", createQuestionCollectionsController);
router.put("/:id", updateQuestionCollectionsController);
router.delete("/:id", deleteQuestionCollectionsController);

module.exports = router;
