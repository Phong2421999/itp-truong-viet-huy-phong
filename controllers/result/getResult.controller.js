const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getResultController = async (req, res) => {
  try {
    let resultDAO = new DAO("result");
    let { page, limit } = req.query;
    if (page && limit) {
      let { success, payload, err } = await resultDAO.getPage(page, limit);
      if (success) returnToUser.success(res, "result data", payload);
      else {
        console.log("get result controller: ", err);
        returnToUser.errorProcess(res, err);
      }
    }
  } catch (err) {
    console.log("get result controller", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = getResultController;
