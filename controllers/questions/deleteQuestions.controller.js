const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");
const fs = require("async-file");
const path = require("path");

const deleteQuestionsController = async (req, res) => {
  try {
    let { id } = req.params;
    let questionDAO = new DAO("questions");
    let { payload, success, err } = await questionDAO.deleteById(id);
    if (payload.link) {
      let file = payload.link.split("/");
      file = `${process.env.UPLOAD_DIR}/${file[file.length - 1]}`;
      console.log(file);
      if (await fs.exists(file)) {
        await fs.unlink(file);
      }
    }
    if (success) returnToUser.successWithNoData(res, "delete question success");
    else returnToUser.errorProcess(res, err);
  } catch (error) {
    console.log("delete question controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = deleteQuestionsController;
