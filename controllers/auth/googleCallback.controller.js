const { google } = require("googleapis");
const googleConfig = require("../../googleConfig");
const returnToUser = require("../../services/returnToUser");
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2();
const jwt = require("jsonwebtoken");

const googleCallbackController = async (req, res) => {
  try {
    let code = req.query.code;
    const auth = new google.auth.OAuth2(
      googleConfig.googleClientID,
      googleConfig.googleClientSecret,
      googleConfig.callbackURL
    );

    let tokenData = await auth.getToken(code);
    let token = tokenData.tokens;
    oauth2Client.setCredentials({ access_token: token.access_token });
    var oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    let users = await oauth2.userinfo.get();
    let registerToken = await jwt.sign(
      {
        name: users.data.name,
        email: users.data.email,
        avatar: users.data.picture,
      },
      process.env.LOGIN_SECRET_KEY
    );
    returnToUser.success(res, "ad", { token: registerToken });
  } catch (err) {
    returnToUser.errorProcess(res, err);
  }
};

module.exports = googleCallbackController;
