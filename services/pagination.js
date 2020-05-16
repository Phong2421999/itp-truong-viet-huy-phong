const _ = require("lodash");

const getPagination = optional => {
  if (!_.isEmpty(optional)) {
    let { page, limit } = optional;
    if (optional.pagination === true) {
      delete optional.pagination;
      delete optional.page;
      delete optional.limit;
      return {
        paging: true,
        query: { ...optional },
        page,
        limit
      };
    } else {
      delete optional.pagination;
      return {
        paging: false,
        query: { ...optional }
      };
    }
  }
  return {
    paging: false,
    query: {}
  };
};

module.exports = {
  getPagination
};
