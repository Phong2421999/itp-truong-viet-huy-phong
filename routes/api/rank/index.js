var express = require("express");
var router = express.Router();

const getTotalStudentController = require("../../../controllers/rank/getTotalStudent.controller");
const getStudentRankController = require("../../../controllers/rank/getStudentRank.controller");
const getTotalTestedStudentController = require("../../../controllers/rank/getTotalTestedStudent.controller");
const getTotalTestedByTestTimeController = require("../../../controllers/rank/getTotalTestedByTestTime.controller");

router.get("/university/totalRegister", getTotalStudentController);
router.get("/university/totalTested", getTotalTestedStudentController);
router.get("/university/totalByTestTime", getTotalTestedByTestTimeController);
router.get("/student", getStudentRankController);

module.exports = router;
