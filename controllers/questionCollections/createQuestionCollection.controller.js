const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const createQuestionCollectionsController = async (req, res) => {
  try {
    let questionCollectionDAO = new DAO("questionCollections");
    let { name, time } = req.body;
    let { success, payload, err } = await questionCollectionDAO.getOne({
      name,
    });
    if (success) {
      returnToUser.errorWithMess(res, "Duplicate name");
    } else {
      let { success, payload, err } = await questionCollectionDAO.create({
        name,
        time,
      });
      if (success)
        returnToUser.success(
          res,
          "Create question collection success",
          payload
        );
      else {
        console.log("create question collection", err);
        returnToUser.errorProcess(res, err);
      }
    }
  } catch (err) {
    console.log("create question collections", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = createQuestionCollectionsController;
