var defaultConfig = require('./default.js');


var mode = process.env.MODE || 'local';
process.env.NODE_ENV = mode;

var currentConfig = require('./' + mode);


module.exports = Object.assign({NODE_ENV:mode}, defaultConfig, currentConfig);

