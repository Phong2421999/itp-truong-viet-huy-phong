const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getTotalTestedStudentController = async (req, res) => {
  try {
    let resultDAO = new DAO("result");
    let universityDAO = new DAO("university");
    let { page = 0, limit = 10 } = req.query;
    var { success, payload, err } = await resultDAO.aggregate([
      {
        $group: {
          _id: "$universityId",
          totalTestedStudent: { $sum: 1 },
        },
      },
      {
        $sort: { totalTestedStudent: -1 },
      },
      {
        $skip: parseInt(page * limit),
      },
      {
        $limit: parseInt(limit),
      },
    ]);
    if (success) {
      let university = payload;
      let count = await resultDAO.aggregate([
        {
          $group: {
            _id: "$universityId",
            totalTestedStudent: { $sum: 1 },
          },
        },
      ]);
      let universityLength = university.length;
      for (let i = 0; i < universityLength; i++) {
        var { success, payload, err } = await universityDAO.getById(
          university[i]._id
        );
        if (success) {
          university[i].universityName = payload.name;
          university[i].universityLogo = payload.logo;
        } else returnToUser.errorProcess(res, err);
      }
      university[university.length] = { quantity: count.payload.length };
      returnToUser.success(res, "total tested student", university);
    } else returnToUser.errorProcess(res, err);
  } catch (error) {
    console.log("error get total tested student: ", error);
  }
};

module.exports = getTotalTestedStudentController;
