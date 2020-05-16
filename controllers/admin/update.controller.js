const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");
const bcrypt = require("bcryptjs");

const updateAdminController = async (req, res) => {
  try {
    let adminDAO = new DAO("admins");
    let { password, name, oldPassword } = req.body;
    let id = req.adminId;
    let updateData = {
      ...req.body,
    };
    delete updateData.oldPassword;
    delete updateData.username;
    if (password && oldPassword) {
      let { success, payload, err } = await adminDAO.getById(id);
      if (success) {
        if (await bcrypt.compare(oldPassword, payload.password)) {
          updateData.password = await bcrypt.hash(password, 10);
        } else return returnToUser.errorWithMess(res, "wrong old password");
      } else return returnToUser.errorProcess(res, err);
    }
    let { success, payload, err } = await adminDAO.updateById(id, updateData, {
      new: true,
    });
    if (success) {
      returnToUser.success(res, "update admin", payload);
    } else returnToUser.errorProcess(res, err);
  } catch (err) {
    console.log("update admin controller", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = updateAdminController;
