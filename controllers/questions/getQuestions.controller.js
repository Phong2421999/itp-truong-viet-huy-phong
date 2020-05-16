const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getQuestionsController = async (req, res) => {
  try {
    let { size, page = 0, limit = 10, collectionId } = req.query;
    let questionDAO = new DAO("questions");
    let configDAO = new DAO("config");
    let { success, payload, err } = await configDAO.getOne({});
    let config = payload;
    if (success) {
      if (size) {
        let { payload, success, err } = await questionDAO.getRandom(size, [
          {
            $match: { collectionId: config.testCollectionId.toString() },
          },
        ]);
        if (success) {
          let questionLength = payload.length;
          for (let i = 0; i < questionLength; i++) {
            delete payload[i].rightAnswer;
          }
          returnToUser.success(res, "get question success", payload);
        } else returnToUser.errorProcess(res, err);
      } else if (collectionId) {
        let { payload, success, err } = await questionDAO.getSort(
          { collectionId },
          { time: -1 },
          { page, limit }
        );
        if (success) returnToUser.success(res, "get question success", payload);
        else returnToUser.errorProcess(res, err);
      } else {
        let { payload, success, err } = await questionDAO.getAll();
        if (success) returnToUser.success(res, "get question success", payload);
        else returnToUser.errorProcess(res, err);
      }
    } else {
      console.log("get question controller");
      returnToUser.errorProcess(res, err);
    }
  } catch (error) {
    console.log("get question controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = getQuestionsController;
