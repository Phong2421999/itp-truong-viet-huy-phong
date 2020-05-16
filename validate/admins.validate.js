const jwt = require("jsonwebtoken");
const returnToUser = require("../services/returnToUser");

const adminValidate = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let payload = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
      if (payload.isAdmin) {
        req.adminId = payload.id;
        return next();
      } else return returnToUser.notAllow(res);
    } else return returnToUser.notAllow(res);
  } catch (err) {
    returnToUser.notAllow(res);
  }
};

module.exports = adminValidate;
