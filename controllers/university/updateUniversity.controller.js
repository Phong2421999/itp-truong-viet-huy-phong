const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const updateUniversityController = async (req, res) => {
  try {
    let universityDAO = new DAO("university");
    if (req.file) {
      req.body.logo = `${process.env.SERVER_URL}/${process.env.UPLOAD_FOLDER}/${req.file.filename}`;
    }
    let { id } = req.params;
    let { payload, success, err } = await universityDAO.updateById(
      id,
      req.body,
      { new: true }
    );
    if (success)
      returnToUser.success(res, "update university success", payload);
    else returnToUser.errorProcess(res, err);
  } catch (error) {
    console.log("update univeristy controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = updateUniversityController;
