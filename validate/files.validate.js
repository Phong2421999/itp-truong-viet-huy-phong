const returnToUser = require("../services/returnToUser");

const filesValidate = async (req, res, next) => {
  try {
    if (req.file) {
      let { filename } = req.file;
      if (filename === "null")
        returnToUser.errorWithMess(res, "upload file not allow");
      else {
        return next();
      }
    } else {
      returnToUser.errorWithMess(res, "no files uploaded");
    }
  } catch (err) {
    console.log("err upload images: ", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = filesValidate;
