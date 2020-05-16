const returnToUser = require("../../services/returnToUser");
const DAO = require("../../classes/DAO");

const createResultController = async (req, res) => {
  try {
    let resultDAO = new DAO("result");
    let questionDAO = new DAO("questions");
    let configDAO = new DAO("config");
    let rankDAO = new DAO("rank");
    let totalDAO = new DAO("total");
    var { success, payload, err } = await configDAO.getOne({});
    let testTime;
    if (success) testTime = payload.testTime;
    else returnToUser.errorProcess(res, err);
    let { time, answers, universityId } = req.body;
    let answerNumber = answers.length;
    if (answerNumber > 20)
      return returnToUser.errorWithMess(res, "fuck u cheater :v");
    let rightAnswer = 0;
    let ids = [];
    for (let i = 0; i < answerNumber; i++) {
      if (ids.indexOf(answers[i].id.toString()) !== -1) {
        return returnToUser.errorWithMess(res, "fuck u cheater :v");
      } else {
        ids.push(answers[i].id.toString());
      }
      let { payload, success, err } = await questionDAO.getById(answers[i].id);
      if (success) {
        if (payload.rightAnswer === answers[i].answer) rightAnswer++;
      } else returnToUser.errorProcess(res, err);
    }

    let ranks = await rankDAO.getSort(
      { testTime },
      { rightAnswerNumber: 1, time: -1 },
      {}
    );
    if (ranks.success) {
      var { payload, err, success } = await resultDAO.create({
        time,
        rightAnswerNumber: rightAnswer,
        userId: req.userId,
        universityId,
        testTime,
      });
      if (ranks.payload.length >= 45) {
        ranks.payload.pop();
        let compareData = ranks.payload[0];
        if (
          payload.rightAnswerNumber > compareData.rightAnswerNumber ||
          (payload.rightAnswerNumber === compareData.rightAnswerNumber &&
            payload.time < compareData.time)
        ) {
          await rankDAO.deleteById(compareData._id);
          await rankDAO.create({
            time,
            rightAnswerNumber: rightAnswer,
            userId: req.userId,
            universityId,
            testTime,
          });
        }
      } else {
        await rankDAO.create({
          time,
          rightAnswerNumber: rightAnswer,
          userId: req.userId,
          universityId,
          testTime,
        });
      }
      if (success) {
        await totalDAO.updateOne({ testTime }, { $inc: { count: 1 } });
        returnToUser.success(res, "create result success", payload);
      } else {
        console.log("create result controller: ", err);
        returnToUser.errorProcess(res, err);
      }
    } else {
      console.log("create result controller: ", err);
      returnToUser.errorProcess(res, err);
    }
  } catch (error) {
    console.log("create result controller: ", error);
    returnToUser.errorProcess(res, error);
  }
};

module.exports = createResultController;
