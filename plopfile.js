'use strict';

require('babel-register');

const fs = require('fs');
const path = require('path');

module.exports =  function (plop) {
  fs.readdirSync('./plop')
    .filter(filename => fs.statSync(path.join('./plop', filename)).isDirectory())
    .forEach(folder => require(`./plop/${folder}`).default(plop));
};