const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");
const fs = require("async-file");
const path = require("path");

const deleteQuestionCollectionsController = async (req, res) => {
  try {
    let questionCollectionDAO = new DAO("questionCollections");
    let questionDAO = new DAO("questions");
    let { id } = req.params;
    let { success, payload, err } = await questionDAO.getByQuery({
      collectionId: id,
    });
    let questions = payload;
    if (success) {
      let questionLength = questions.length;
      for (let i = 0; i < questionLength; i++) {
        if (questions[i].link) {
          let file = questions.link.split("/");
          file = `${process.env.UPLOAD_DIR}/${[file.length - 1]}`;
          if (await fs.exists(file)) {
            await fs.unlink(file);
          }
        }
      }
      await questionDAO.deleteMany({ id });
      let { success, payload, err } = await questionCollectionDAO.deleteById(
        id
      );
      if (success)
        returnToUser.success(res, "delete collection success", payload);
      else returnToUser.errorProcess(res, err);
    }
  } catch (err) {
    console.log("delete question collections", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = deleteQuestionCollectionsController;
