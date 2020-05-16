const returnToUser = require("../../services/returnToUser");

const uploadFilesController = async (req, res) => {
  try {
    let { filename } = req.file;
    if (filename) {
      let url = `${process.env.SERVER_URL}/${process.env.UPLOAD_FOLDER}/${filename}`;
      returnToUser.success(res, "upload success", { url });
    } else {
      console.log("uploadFile controller");
      returnToUser.errorWithMess(res, "upload fail");
    }
  } catch (err) {
    console.log("uploadFile controller", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = uploadFilesController;
