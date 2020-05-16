const returnToUser = require("../services/returnToUser");
const DAO = require("../classes/DAO");
const userQuestionValidate = async (req, res, next) => {
  try {
    let { size } = req.query;
    if (!size) {
      return returnToUser.errorWithMess(res, "not allow to test");
    }
    let configDAO = new DAO("config");
    let resultDAO = new DAO("result");
    let userId = req.userId;
    var { success, payload, err } = await configDAO.getOne({});
    if (success && payload.canTest) {
      let testTime = payload.testTime;
      var { success, payload, err } = await resultDAO.getSort(
        { userId },
        "-testTime",
        {}
      );
      if (success) {
        if (payload.length === 1) return next();
        else if (payload[0].testTime < testTime) return next();
        else return returnToUser.errorWithMess(res, "not allow to test");
      } else return returnToUser.errorProcess(res, err);
    } else return returnToUser.errorProcess(res, err);
  } catch (err) {
    console.log("err validate user question: ", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = userQuestionValidate;
