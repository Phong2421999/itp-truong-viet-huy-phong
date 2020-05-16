const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const createUniversityController = async (req, res) => {
  try {
    let universityDAO = new DAO("university");
    let { filename } = req.file;
    req.body.logo = `${process.env.SERVER_URL}/${process.env.UPLOAD_FOLDER}/${filename}`;
    let { payload, success, err } = await universityDAO.create(req.body);
    if (success)
      returnToUser.success(res, "create university success", payload);
    else returnToUser.errorProcess(res, err);
  } catch (error) {
    console.log("create university error: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = createUniversityController;
