module.exports = {
  notAllow: (res) => {
    res.status(401).send({
      success: false,
      message: "You are not allowed.",
      data: null,
    });
  },
  empty: (res, mess, option = {}) => {
    return res.status(204).send({
      success: true,
      message: mess,
      data: null,
      option,
    });
  },
  errorProcess: (res, err) => {
    return res.status(500).send({
      success: false,
      message: `${err.message}`,
      data: null,
    });
  },
  success: (res, mess, data, option = {}) => {
    return res.json({
      success: true,
      message: mess,
      data: data,
      option,
    });
  },
  errorWithMess: (res, mess) => {
    return res.status(406).json({
      success: false,
      message: mess,
      data: null,
    });
  },
  error: (res, mess, data) => {
    return res.status(406).json({
      success: false,
      message: mess,
      data,
    });
  },
  successWithNoData: (res, mess, option = {}) => {
    return res.status(200).json({
      success: true,
      message: mess,
      data: null,
      option,
    });
  },
  redirectLogin: (res) => {
    return res.redirect("/login");
  },
};
