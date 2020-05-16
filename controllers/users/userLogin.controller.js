const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("../../services/jwt");
const axios = require("axios");

const verifyUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

const userLoginController = async (req, res, next) => {
  try {
    let data = jsonwebtoken.verify(
      req.body.token,
      process.env.LOGIN_SECRET_KEY
    );
    if (data) {
      let userDAO = new DAO("users");
      let { payload, success, err } = await userDAO.getOne({
        email: data.email,
      });
      if (success) {
        user = payload;
        if (user && user.studentId) {
          returnToUser.success(res, "tokens", {
            accessToken: jwt.generateAccessToken({
              email: user.email,
              id: user._id,
            }),
            refreshToken: jwt.generateRefreshToken({
              email: user.email,
              id: user._id,
            }),
          });
        } else {
          returnToUser.error(
            res,
            "Invalid user's university information",
            user
          );
        }
      } else {
        user = await userDAO.create({
          email: data.email,
          avatar: data.picture,
        });
        if (user.success) {
          returnToUser.error(
            res,
            "Invalid user's university information",
            user.payload
          );
        } else {
          returnToUser.errorProcess(res, user.err);
        }
      }
    }
  } catch (err) {
    console.log("login controller: ", err);
    returnToUser.errorWithMess(res, "backend issue");
  }
};

module.exports = userLoginController;
