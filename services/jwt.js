const jwt = require("jsonwebtoken");

const generateAccessToken = (payload, options = {}) =>
  jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "60d",
    ...options,
  });

const generateRefreshToken = (payload, options = {}) =>
  jwt.sign({ ...payload, refreshToken: true }, process.env.SECRET_KEY, {
    expiresIn: "80d",
    ...options,
  });

const generateVerifyToken = (payload, options = {}) =>
  jwt.sign({ ...payload, verifyToken: true }, process.env.SECRET_KEY, {
    expiresIn: "10m",
    ...options,
  });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateVerifyToken,
};
