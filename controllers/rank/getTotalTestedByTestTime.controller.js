const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getTotalTestedByTestTimeController = async (req, res) => {
  try {
    let resultDAO = new DAO("result");
    let universityDAO = new DAO("university");
    let { testTime, page = 0, limit = 10 } = req.query;

    let result;
    if (testTime) {
      testTime = parseInt(testTime);
      var { payload, success, err } = await resultDAO.aggregate([
        { $match: { testTime } },
        { $group: { _id: "$universityId", totalTestedStudent: { $sum: 1 } } },
        { $sort: { totalTestedStudent: -1 } },
        { $skip: parseInt(page * limit) },
        { $limit: parseInt(limit) },
      ]);
      if (success) result = payload;
      else returnToUser.errorProcess(res, err);
    } else {
      var { payload, success, err } = await resultDAO.aggregate([
        { $group: { _id: "$universityId", totalTestedStudent: { $sum: 1 } } },
        { $sort: { totalTestedStudent: -1 } },
        { $skip: parseInt(page * limit) },
        { $limit: parseInt(limit) },
      ]);
      if (success) result = payload;
      else returnToUser.errorProcess(res, err);
    }
    if (result) {
      let resultLength = result.length;
      let count = await resultDAO.aggregate([
        { $match: { testTime } },
        { $group: { _id: "$universityId", totalTestedStudent: { $sum: 1 } } },
      ]);
      for (let i = 0; i < resultLength; i++) {
        var { success, payload, err } = await universityDAO.getById(
          result[i]._id
        );
        if (success) {
          (result[i].universityName = payload.name),
            (result[i].universityLogo = payload.logo);
        }
      }
      result[result.length] = { quantity: count.payload.length };
      returnToUser.success(res, "total tested student in test time", result);
    } else {
      returnToUser.errorWithMess(res, "Lỗi server");
    }
  } catch (error) {
    returnToUser.errorProcess(res, error);
  }
};

module.exports = getTotalTestedByTestTimeController;
