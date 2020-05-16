var express = require("express");
var router = express.Router();
let DAO = require("../classes/DAO");
let jsonwebtoken = require("jsonwebtoken");
router.get("/", async (req, res) => {
  res.send("nothing to see");
});
router.use("/admin", require("./admin"));
router.use("/", require("./api"));
router.use("/files", require("./files"));
module.exports = router;
