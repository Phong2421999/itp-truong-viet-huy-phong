const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const deleteUniversityController = async (req, res) => {
  try {
    let universityDAO = new DAO("university");
    let { id } = req.params;
    let { payload, success, err } = await universityDAO.deleteById(id);
    if (success)
      returnToUser.success(res, "delete university success", payload);
    else returnToUser.errorProcess(res, err);
  } catch (error) {
    console.log("delete unviersity controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = deleteUniversityController;
