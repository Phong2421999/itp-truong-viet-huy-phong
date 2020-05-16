const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getConfigController = async (req, res) => {
  try {
    let configDAO = new DAO("config");
    let questionCollectionsDAO = new DAO("questionCollections");
    let { success, payload, err } = await configDAO.getOne({});
    let config = payload;
    if (success) {
      let { success, payload, err } = await questionCollectionsDAO.getById(
        config.testCollectionId
      );
      if (success) {
        config.testCollectionName = payload.name;
        returnToUser.success(res, "config data", config);
      } else {
        config.testCollectionId = null;
        returnToUser.success(res, "config data", config);
      }
    } else {
      console.log("get config controller", err);
      returnToUser.errorProcess(res, err);
    }
  } catch (err) {
    console.log("get config controller", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = getConfigController;
