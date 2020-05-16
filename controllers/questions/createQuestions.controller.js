const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const createQuestionsController = async (req, res) => {
  try {
    let questionDAO = new DAO("questions");
    let link;
    if (req.file) {
      let { filename } = req.file;
      link = `${process.env.SERVER_URL}/${process.env.UPLOAD_FOLDER}/${filename}`;
    }
    req.body.link = link;
    let { payload, success, err } = await questionDAO.create(req.body);
    if (success) returnToUser.success(res, "create question success", payload);
    else returnToUser.errorProcess(res, err);
  } catch (error) {
    console.log("create question controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = createQuestionsController;
