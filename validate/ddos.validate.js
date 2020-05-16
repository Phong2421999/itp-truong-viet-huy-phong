const returnToUser = require("../services/returnToUser");
const DAO = require("../classes/DAO");
const jwt = require("jsonwebtoken");
const ddosValidate = async (req, res, next) => {
  try {
    if (req.headers.fu) {
      let payload = jwt.verify(req.headers.fu, process.env.LOGIN_SECRET_KEY);
      if (payload.time) {
        let now = Date.now();
        if (now - payload.time > process.env.HEADER_TIME)
          return returnToUser.errorWithMess(res, "...");
        else return next();
      } else return returnToUser.notAllow(res);
    } else return returnToUser.notAllow(res);
  } catch (err) {
    console.log(err);
    returnToUser.notAllow(res);
  }
};

module.exports = ddosValidate;
