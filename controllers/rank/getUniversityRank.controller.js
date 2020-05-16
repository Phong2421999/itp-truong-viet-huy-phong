const xl = require("excel4node");
const fs = require("async-file");
const randomString = require("randomstring");
const DAO = require("../../classes/DAO");
const returnToUser = require("../../services/returnToUser");

const getUniversityRankController = async (req, res) => {
  try {
    let { id } = req.params;
    let { testTime } = req.query;
    let universityDAO = new DAO("university");
    let resultDAO = new DAO("result");
    let userDAO = new DAO("users");
    let results;
    if (testTime)
      results = await resultDAO.getSort(
        { universityId: id, testTime },
        { rightAnswerNumber: -1, time: 1 },
        {}
      );
    else
      results = await resultDAO.getSort(
        { universityId: id },
        { rightAnswerNumber: -1, time: 1 },
        {}
      );
    let university = await universityDAO.getById(id);
    if (university.success) {
      if (results.success) {
        let resultsLength = results.payload.length;
        for (let i = 0; i < resultsLength; i++) {
          let user = await userDAO.getById(results.payload[i].userId);
          if (user.success) {
            user = user.payload.toObject();
            results.payload[i] = results.payload[i].toObject();
            results.payload[i] = {
              userName: user.name,
              userPhone: user.phone,
              userStudentId: user.studentId,
              ...results.payload[i],
            };
            delete results.payload[i]._id;
            delete results.payload[i].__v;
            delete results.payload[i].userId;
            delete results.payload[i].universityId;
          }
        }
        let wb = new xl.Workbook();
        let options = {
          sheetFormat: {
            baseColWidth: 20,
          },
        };
        let myStyle = wb.createStyle({
          alignment: {
            wrapText: true,
          },
        });
        let ws = wb.addWorksheet("Reports", options);
        ws.cell(1, 1).string("Tên");
        ws.cell(1, 2).string("Số điện thoại");
        ws.cell(1, 3).string("Mã số sinh viên");
        ws.cell(1, 4).string("Thời gian thi");
        ws.cell(1, 5).string("Số điểm");
        ws.cell(1, 6).string("Đợt thi");
        results.payload[results.payload.length - 1] = {};
        let dataLength = results.payload.length;
        for (let i = 0; i < dataLength; i++) {
          let keys = Object.keys(results.payload[i]); // tên các props;
          let numberProperty = keys.length; // số lượng props
          for (let j = 1; j <= numberProperty; j++) {
            if (j === 4) {
              let mm = Math.floor(results.payload[i][keys[j - 1]] / 60);
              let ss = results.payload[i][keys[j - 1]] % 60;
              ws.cell(i + 2, j).string(`${mm}:${ss}`);
            } else
              ws.cell(i + 2, j).string(
                results.payload[i][keys[j - 1]].toString()
              );
          }
        }
        let buffer = await wb.writeToBuffer();
        let filePath = `public/reports/${university.payload.name}.xlsx`;
        await fs.writeFile(filePath, buffer, {
          encoding: "utf8",
        });
        returnToUser.success(res, "Data", {
          url: `${process.env.SERVER_URL}/reports/${university.payload.name}.xlsx`,
        });
      } else returnToUser.errorWithMess(res, "Server error");
    } else returnToUser.errorWithMess(res, "Server error");
  } catch (error) {
    console.log("get university rank: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = getUniversityRankController;
