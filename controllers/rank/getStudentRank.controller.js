const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const getStudentRankController = async (req, res) => {
  try {
    let { testTime, limit = 10, page = 0 } = req.query;
    let totalDAO = new DAO("total");
    let usersDAO = new DAO("users");
    let universityDAO = new DAO("university");
    let rankDAO = new DAO("rank");
    if (testTime) {
      var { payload, err, success } = await rankDAO.getSort(
        { testTime },
        { rightAnswerNumber: -1, time: 1 },
        { page, limit }
      );
      let users = payload;
      let quantity = users[users.length - 1];
      users.pop();

      if (success) {
        let usersLength = users.length;
        for (let i = 0; i < usersLength; i++) {
          var { success, payload, err } = await usersDAO.getById(
            users[i].userId
          );

          if (success) {
            let university = await universityDAO.getById(users[i].universityId);
            users[i] = users[i].toObject();
            users[i] = {
              ...users[i],
              userName: payload.name,
              userEmail: payload.email,
              userAvatar: payload.avatar,
              userId: payload._id,
              userStudentId: payload.studentId,
              universityId: university.payload._id,
              universityName: university.payload.name,
            };
          }
        }
        let rankQuantity = await rankDAO.count({ testTime });
        let weeklyQuantity = await totalDAO.getOne({ testTime });
        if (weeklyQuantity.payload)
          weeklyQuantity = weeklyQuantity.payload.count;
        else weeklyQuantity = 0;
        users[users.length] = {
          rankQuantity: rankQuantity.payload,
          weeklyQuantity,
        };
        returnToUser.success(res, "get student rank with testTime", users);
      } else returnToUser.errorProcess(res, err);
    } else {
      let resultDAO = new DAO("results");
      var { payload, err, success } = await resultDAO.aggregate([
        {
          $group: {
            _id: "$userId",
            totalTime: { $sum: "$time" },
            totalRightAnswerNumber: { $sum: "$rightAnswerNumber" },
          },
        },
        {
          $sort: { totalRightAnswerNumber: -1, totalTime: 1 },
        },
        {
          $skip: parseInt(page * limit),
        },
        {
          $limit: parseInt(limit),
        },
      ]);
      let count = await resultDAO.aggregate([
        {
          $group: {
            _id: "$userId",
            totalTime: { $sum: "$time" },
            totalRightAnswerNumber: { $sum: "$rightAnswerNumber" },
          },
        },
      ]);
      let users = payload;
      // Nếu chưa có dữ liệu thì trả về câu lỗi
      if (!users) return returnToUser.errorWithMess(res, "Chưa có dữ liệu");

      //
      let usersLength = users.length;
      for (let i = 0; i < usersLength; i++) {
        var { success, payload, err } = await usersDAO.getById(users[i]._id);
        if (success) {
          let university = await universityDAO.getById(payload.universityId);
          users[i] = {
            ...users[i],
            userName: payload.name,
            userEmail: payload.email,
            userAvatar: payload.avatar,
            userId: payload._id,
            userStudentId: payload.studentId,
            universityId: university.payload._id,
            universityName: university.payload.name,
          };
        } else returnToUser.errorProcess(res, err);
      }
      payload[payload.length] = {
        quantity: count.payload.length,
      };
      if (success) returnToUser.success(res, "get student rank", users);
      else returnToUser.errorProcess(res, err);
    }
  } catch (err) {
    console.log("error get student rank controller", err);
    returnToUser.errorProcess(res, err);
  }
};

module.exports = getStudentRankController;
