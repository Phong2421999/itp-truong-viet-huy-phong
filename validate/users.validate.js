const jwt = require("jsonwebtoken");
const returnToUser = require("../services/returnToUser");

const usersValidate = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let payload = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
      if (payload.id) {
        req.userId = payload.id;
        return next();
      } else returnToUser.notAllow(res);
    } else returnToUser.notAllow(res);
  } catch (err) {
    returnToUser.notAllow(res);
  }
};

module.exports = usersValidate;
