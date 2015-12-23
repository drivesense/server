'use strict';

const statuses = require('statuses');

export default class HttpError extends Error {
  constructor (status) {
    super(statuses[status]);

    this.status = status;
  }
}