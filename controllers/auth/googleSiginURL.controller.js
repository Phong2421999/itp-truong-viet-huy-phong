const { google } = require("googleapis");
const googleConfig = require("../../googleConfig");
const returnToUser = require("../../services/returnToUser");

const googleSiginURLController = (req, res) => {
  let oauth = new google.auth.OAuth2(
    googleConfig.googleClientID,
    googleConfig.googleClientSecret,
    googleConfig.callbackURL
  );
  let url = oauth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: googleConfig.defaultScope,
  });
  returnToUser.success(res, "google sigin url", { url });
};

module.exports = googleSiginURLController;
