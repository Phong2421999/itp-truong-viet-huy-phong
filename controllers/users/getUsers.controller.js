const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");
const jwt = require("jsonwebtoken");

const getUsersController = async (req, res) => {
  try {
    let userDAO = new DAO("users");
    let universityDAO = new DAO("university");
    let { id } = req.params;
    let { page, limit } = req.query;
    if (req.userId) {
      let { payload, success, err } = await userDAO.getById(req.userId);
      if (success) {
        let university = await universityDAO.getById(payload.universityId);
        if (success) {
          payload = payload.toObject();
          payload.universityName = university.payload.name;
          returnToUser.success(res, "user info", payload);
        } else returnToUser.errorProcess(res, err);
      } else returnToUser.errorProcess(res, err);
    } else if (id) {
      let { payload, success, err } = await userDAO.getById(id);
      if (success) returnToUser.success(res, "user info", payload);
      else returnToUser.errorProcess(res, err);
    } else if ((page, limit)) {
      let { payload, success, err } = await userDAO.getPage(page, limit);
      if (success) returnToUser.success(res, "user info", payload);
      else returnToUser.errorProcess(res, err);
    } else {
      let { payload, success, err } = await userDAO.getAll();
      if (success) returnToUser.success(res, "user info", payload);
      else returnToUser.errorProcess(res, err);
    }
  } catch (error) {
    console.log("get users controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = getUsersController;
