const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getUniversityController = async (req, res) => {
  try {
    let universityDAO = new DAO("university");
    let { page, limit } = req.query;
    let { payload, success, err } = await universityDAO.count();
    let count = 0;
    if (success) {
      count = payload;
    }
    if (page) {
      let { payload, success, err } = await universityDAO.getPage(page, limit);
      if (success) returnToUser.success(res, "get university success", payload);
      else returnToUser.errorProcess(res, err);
    } else {
      let { payload, success, err } = await universityDAO.getAll();
      if (success) returnToUser.success(res, "get university success", payload);
      else returnToUser.errorProcess(res, err);
    }
  } catch (error) {
    console.log("get university controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = getUniversityController;
