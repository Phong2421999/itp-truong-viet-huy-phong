const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getTotalStudentController = async (req, res) => {
  try {
    let { limit, page } = req.query;
    if (!page && !limit) {
      page = 0;
      limit = 10;
    }

    let usersDAO = new DAO("users");
    let universityDAO = new DAO("university");
    let { success, payload, err } = await usersDAO.aggregate([
      { $match: { universityId: { $ne: null } } },
      {
        $group: {
          _id: "$universityId",
          totalStudent: { $sum: 1 },
        },
      },
      { $sort: { totalStudent: -1 } },
      { $skip: parseInt(page * limit) },
      { $limit: parseInt(limit) },
    ]);
    var count = await usersDAO.aggregate([
      { $match: { universityId: { $ne: null } } },
      {
        $group: {
          _id: "$universityId",
          totalStudent: { $sum: 1 },
        },
      },
    ]);
    if (success) {
      let users = payload;
      let usersLength = users.length;
      for (let i = 0; i < usersLength; i++) {
        let { success, payload, err } = await universityDAO.getById(
          users[i]._id
        );
        if (success) {
          users[i].universityName = payload.name;
          users[i].universityLogo = payload.logo;
        }
      }
      users[users.length] = { quantity: count.payload.length };
      returnToUser.success(res, "Rank by total student", users);
    } else returnToUser.errorProcess(res, err);
  } catch (error) {
    console.log("get total student controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = getTotalStudentController;
