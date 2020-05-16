const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getUserResultController = async (req, res) => {
  try {
    let resultDAO = new DAO("result");
    let configDAO = new DAO("config");
    let config = await configDAO.getOne({});
    if (config.success) {
      let { success, payload, err } = await resultDAO.getOne({
        userId: req.userId,
        testTime: config.payload.testTime,
      });
      if (success) returnToUser.success(res, "result data of user", payload);
      else {
        returnToUser.errorWithMess(res, "Not have result");
      }
    } else returnToUser.errorWithMess(res, "error");
  } catch (err) {
    console.log("get result controller: ", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = getUserResultController;
