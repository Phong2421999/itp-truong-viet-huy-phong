const returnToUser = require("../../services/returnToUser");
const fs = require("async-file");

const deleteFilesController = async (req, res) => {
  try {
    let { files } = req.body;
    let filesLength = files.length;
    let folder = `${process.env.UPLOAD_DIR}/`;
    for (let i = 0; i < filesLength; i++) {
      if (await fs.exists(folder + files[i])) {
        await fs.unlink(folder + files[i]);
      }
    }
    returnToUser.successWithNoData(res, "delete files success");
  } catch (err) {
    console.log("delete files controller", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = deleteFilesController;
