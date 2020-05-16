const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const updateUsersController = async (req, res) => {
  try {
    let { id } = req.params;
    let body = req.body;
    let userDAO = new DAO("users");
    let checkUser = await userDAO.getOne({
      _id: { $ne: id },
      studentId: body.studentId,
    });
    if (checkUser) {
      returnToUser.errorWithMess(res, "Duplicate studentId");
    } else {
      let user = await userDAO.updateById(id, body, { new: true });
      returnToUser.success(res, "Update student success", user);
    }
  } catch (err) {
    console.log("update users controller: ", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = updateUsersController;
