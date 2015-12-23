'use strict';

import Stream from 'stream';

const levels = {
  '10': 'TRACE',
  '20': 'DEBUG',
  '30': 'INFO',
  '40': 'WARN',
  '50': 'ERROR',
  '60': 'FATAL'
};

export default class BunyanFormatter extends Stream {
  constructor (std) {
    super();

    this.writable = true;
    this._std = std;
  }

  write (line) {
    if (this._std.isTTY) {
      const json = JSON.parse(line);
      const msg = json.level === 50 ? json.err.message : json.msg;

      this._std.write(`${levels[json.level.toString()]}: ${msg}\n`);
    }
    else {
      this._std.write(line);
    }
  }
}