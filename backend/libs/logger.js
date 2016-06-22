var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
var path     = require('path');


var config = require('../config');
var env          = process.env.NODE_ENV || "development";
var utils    = require('./utils');


var pathLog = path.join(config.app_root, config.logdir);
// var filename = config.logdir + env + '.log';
var filenameDebug = config.logdir +  env+ '-debug.log';
// var filenameInfo = config.logdir + env + '-info.log';
var filenameError = config.logdir + env + '-error.log';

console.log(filenameDebug);
console.log(filenameError);
console.log(pathLog);

utils.makeDir(pathLog);


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({name:'debug-console', level: 'debug', colorize:true, timestamp:true, json:false, stringify:false, prettyPrint:true, humanReadableUnhandledException:true}),
        //new (winston.transports.File)({ filename: filename }),
        new (winstonDaily)({ name: 'debug-file', level: 'debug', filename: filenameDebug, prepend:true }),
        new (winstonDaily)({ name: 'error-file', level: 'error', filename: filenameError, prepend:true })
    ],
    exitOnError: false
});



module.exports = logger;


