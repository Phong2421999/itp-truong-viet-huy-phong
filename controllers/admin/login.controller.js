const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");
const jwt = require("../../services/jwt");
const bcrypt = require("bcryptjs");

const adminLoginController = async (req, res, next) => {
  try {
    let adminDAO = new DAO("admins");
    let { username, password } = req.body;
    let { success, payload, err } = await adminDAO.getOne({ username });
    if (success) {
      if (await bcrypt.compare(password, payload.password)) {
        returnToUser.success(res, "tokens", {
          accessToken: jwt.generateAccessToken({
            id: payload._id,
            isAdmin: true,
          }),
          refreshToken: jwt.generateRefreshToken({
            id: payload._id,
            isAdmin: true,
          }),
        });
      } else {
        returnToUser.errorWithMess(res, "Wrong password");
      }
    } else {
      returnToUser.errorWithMess(res, "admin account not found");
    }
  } catch (err) {
    console.log("admin login controller", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = adminLoginController;
