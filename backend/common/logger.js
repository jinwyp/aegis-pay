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




var writeLog     = function (prefix, logType, args) {
    var filePrint = logType !== 'debug';
    var consolePrint = config.debug && env !== 'test';

    if (!filePrint && !consolePrint) {
        return;
    }

    var infos  = Array.prototype.slice.call(args);
    var logStr = infos.join(" ");

    switch (logType) {
        case "debug":
            logStr = logStr.gray;
            break;
        case 'warn':
            logStr = logStr.yellow;
            break;
        case 'error':
            logStr = logStr.red;
            break;
    }

    var line = prefix + logStr;

    if (filePrint) {
        fs.appendFile('../logs/' + env + '.log', line + "\n");
    }
    if (consolePrint) {
        console.log(line);
    }
};
