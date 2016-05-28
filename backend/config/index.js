var defaultConfig = require('./default.js');


var mode = process.env.MODE || 'local';

var currentConfig = require('./' + mode);


module.exports = Object.assign({}, defaultConfig, currentConfig);


