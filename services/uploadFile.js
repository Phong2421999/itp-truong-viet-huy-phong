var multer = require("multer");
var randomString = require("randomstring");
const fs = require("fs");

module.exports = {
  uploadFile: (checkType) => {
    var placeStore = process.env.UPLOAD_DIR;
    let storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, placeStore);
      },
      filename: (req, file, cb) => {
        let fileName = file.originalname.split(".");
        let newFileName = `${randomString.generate(
          10
        )}-${new Date().getTime()}`;
        if (checkType) {
          if (checkType.indexOf(fileName[fileName.length - 1]) > -1) {
            cb(null, `${newFileName}.${fileName[fileName.length - 1]}`);
          } else {
            cb(null, `null`);
          }
        } else {
          cb(null, `${newFileName}.${fileName[fileName.length - 1]}`);
        }
      },
    });
    return multer({ storage: storage });
  },
};
