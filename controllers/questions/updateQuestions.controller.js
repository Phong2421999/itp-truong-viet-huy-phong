const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const updateQuestionsController = async (req, res) => {
  try {
    let { id } = req.params;
    let questionDAO = new DAO("questions");
    delete req.body.collectionId;
    if (req.file) {
      let { filename } = req.file;
      req.body.link = `${process.env.SERVER_URL}/${process.env.UPLOAD_FOLDER}/${filename}`;
    }
    let { payload, success, err } = await questionDAO.updateById(id, req.body, {
      new: true,
    });
    if (success) returnToUser.success(res, "update question success", payload);
    else returnToUser.errorProcess(res, err);
  } catch (error) {
    console.log("create question controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = updateQuestionsController;
