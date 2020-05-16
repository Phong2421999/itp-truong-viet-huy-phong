const returnToUser = require("../services/returnToUser");
const DAO = require("../classes/DAO");

const resultValidate = async (req, res, next) => {
  try {
    let resultDAO = new DAO("result");
    let configDAO = new DAO("config");
    let config = await configDAO.getOne({});
    if (config.success && config.payload.canTest) {
      let testTime = config.payload.testTime;
      let userId = req.userId;
      let result = await resultDAO.getOne({
        userId,
        testTime,
      });
      if (result.success) {
        returnToUser.errorWithMess(res, "You not allow to send results");
      } else next();
    } else returnToUser.errorWithMess(res, "You not allow to send results");
  } catch (err) {
    returnToUser.notAllow(res);
  }
};

module.exports = resultValidate;
