'use strict';

const statuses = require('statuses');

export default status => {
  return (req, res, next) => {
    const err = new Error(statuses[status]);

    err.status = status;
    next(err);
  };
};