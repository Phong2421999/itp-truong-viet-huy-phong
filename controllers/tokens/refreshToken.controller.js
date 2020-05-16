const jsonwebtoken = require("jsonwebtoken");
const returnToUser = require("../../services/returnToUser");
const jwt = require("../../services/jwt");

const refreshTokenController = async (req, res) => {
  try {
    if (req.headers.authorization) {
      let payload = jsonwebtoken.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
      if (payload.refreshToken) {
        let token = jwt.generateAccessToken({ id: payload.id });
        returnToUser.success(res, "refresh token", { accessToken: token });
      } else returnToUser.notAllow(res);
    } else returnToUser.notAllow(res);
  } catch (error) {
    console.log("refresh token controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = refreshTokenController;
