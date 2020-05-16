const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const updateQuestionCollectionsController = async (req, res) => {
  try {
    let questionCollectionDAO = new DAO("questionCollections");
    let { name, time } = req.body;
    let { id } = req.params;
    let { success, payload, err } = await questionCollectionDAO.getOne({
      name,
      _id: { $ne: id },
    });
    if (success) {
      returnToUser.errorWithMess(res, "Duplicate name");
    } else {
      let { success, payload, err } = await questionCollectionDAO.updateById(
        id,
        {
          name,
          time,
        },
        { new: true }
      );
      if (success)
        returnToUser.success(
          res,
          "update question collection success",
          payload
        );
      else {
        console.log("update question collection", err);
        returnToUser.errorProcess(res, err);
      }
    }
  } catch (err) {
    console.log("update question collections", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = updateQuestionCollectionsController;
