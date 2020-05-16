const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getQuestionCollectionsController = async (req, res) => {
  try {
    let questionCollectionsDAO = new DAO("questionCollections");
    let { page, limit } = req.query;
    if (page && limit) {
      let { success, payload, err } = await questionCollectionsDAO.getPage(
        page,
        limit
      );
      if (success)
        returnToUser.success(res, "get question collections", payload);
      else returnToUser.errorProcess(res, err);
    } else {
      let { success, payload, err } = await questionCollectionsDAO.getAll();
      if (success)
        returnToUser.success(res, "get question collections", payload);
      else returnToUser.errorProcess(res, err);
    }
  } catch (err) {
    console.log("get questions collections", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = getQuestionCollectionsController;
