var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
var path     = require('path');


var config = require('../config');
var env          = process.env.NODE_ENV || "development";
var utils    = require('./utils');

var pathLog = path.join(__dirname, '../../logs');
var filename = '../logs/' + env + '.log';
var filenameDebug = '../logs/' + env + '-debug.log';
var filenameInfo = '../logs/' + env + '-info.log';
var filenameError = '../logs/' + env + '-error.log';
utils.makeDir(pathLog);



var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({name:'debug-console', level: 'debug', colorize:true, timestamp:true, humanReadableUnhandledException:true}),
        //new (winston.transports.File)({ filename: filename }),
        new (winstonDaily)({ name: 'debug-file', level: 'debug', filename: filenameDebug, prepend:true }),
        new (winstonDaily)({ name: 'error-file', level: 'error', filename: filenameError, prepend:true })
    ],
    exitOnError: false
});



module.exports = logger;


