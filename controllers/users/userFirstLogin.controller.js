const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");
const jwt = require("../../services/jwt");
const userFirstLoginController = async (req, res) => {
  try {
    let { id } = req.params;
    let body = req.body;
    let userDAO = new DAO("users");
    var { payload, err, success } = await userDAO.getOne({
      _id: { $ne: id },
      studentId: body.studentId,
      universityId: body.universityId,
    });
    if (payload) {
      returnToUser.errorWithMess(res, "Duplicate studentId");
    } else {
      var { success, payload, err } = await userDAO.updateById(
        id,
        {
          universityId: body.universityId,
          studentId: body.studentId,
          name: body.name,
          phone: body.phone,
        },
        { new: true }
      );
      if (success) {
        let user = payload;
        returnToUser.success(res, "Update first login success", {
          accessToken: jwt.generateAccessToken({
            id: user._id,
            email: user.email,
          }),
          refreshToken: jwt.generateRefreshToken({
            id: user._id,
            email: user.email,
          }),
        });
      } else {
        returnToUser.errorProcess(res, err);
      }
    }
  } catch (err) {
    console.log("users first login controller: ", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = userFirstLoginController;
