const DAO = require("./classes/DAO");
const bcrypt = require("bcryptjs");

require("dotenv").config();
require("./model/connect");
require("./model/schema");

const setup = async () => {
  //setup config
  let questionCollectionDAO = new DAO("questionCollections");
  let configDAO = new DAO("config");
  await questionCollectionDAO.deleteOne({ name: "default" });
  await configDAO.deleteOne({});
  var { success, payload, err } = await questionCollectionDAO.create({
    name: "default",
    time: Date.now(),
  });
  if (success) {
    await configDAO.create({
      testCollectionId: payload._id,
      testCollectionName: payload.name,
    });
    console.log("Setup config thành công");
  } else {
    console.log(err);
    console.log("Setup thất bại");
  }
  let adminDAO = new DAO("admins");
  let check = await adminDAO.getOne({ username: "admin" });
  if (check.payload) await adminDAO.deleteOne({ username: "admin" });
  let password = await bcrypt.hash("itp", 10);
  var { success, payload, message } = await adminDAO.create({
    username: "itp",
    password,
    name: "admin",
  });
  if (success) console.log("setup admin account thành công");
  else console.log(err);

  //Vì chỉ có 4 tuần thi nên tạo sẵn 4 collection ranks để ghi nhận 45 người cao điểm nhất
  let rankDAO = new DAO("rank");
  for (let i = 0; i < 4; i++) {
    await rankDAO.create({
      testTime: i + 1,
    });
  }
};

setup();
