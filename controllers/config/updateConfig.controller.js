const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const updateConfigController = async (req, res) => {
  try {
    let configDAO = new DAO("config");
    if (req.body.timeOnTest)
      req.body.timeOnTest = Math.floor(req.body.timeOnTest);
    let { payload, err, success } = await configDAO.updateOne({}, req.body, {
      new: true,
    });
    if (success) returnToUser.success(res, "update config success", payload);
    else returnToUser.errorProcess(res, err);
  } catch (err) {
    console.log("update config controller: ", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = updateConfigController;
