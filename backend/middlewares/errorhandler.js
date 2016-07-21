/**
 * Created by JinWYP on 5/30/16.
 */


var PrettyErrorLib = require('pretty-error');
var PrettyError = new PrettyErrorLib();
PrettyError.skipNodeFiles(); // this will skip events.js and http.js and similar core node files, this will skip node.js, path.js, event.js, etc.
PrettyError.skipPackage('express', 'mongoose'); // this will skip all the trace lines about express` core and sub-modules

var logger = require('../libs/logger');

var PageNotFoundError = require('../errors/PageNotFoundError');
var SystemError = require('../errors/SystemError');

var BusinessError = require('../errors/BusinessError');
var MethodArgumentNotValidError = require('../errors/MethodArgumentNotValidError');
var UnauthenticatedAccessError = require('../errors/UnauthenticatedAccessError');
var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');
var cache = require('../libs/cache');
var config = require('../config');

var inspect = require('util').inspect;
exports.PageNotFoundMiddleware = function(req, res, next) {
    next(new PageNotFoundError(404 , 'Page Not Found'));
};


// 页面展示数据错误：500
// ajax: 
    // 提交数据错误：(409-》field:)
    // 

exports.DevelopmentHandlerMiddleware = function(err, req, res, next) {
    var newErr = null;

    if (typeof err.type === 'undefined'){
        newErr = new SystemError(500, err.message||'系统出错了，正在解决中', err);
        newErr.stack = err.stack;
    }else{
        newErr = newErr || err;
    }


    res.status(newErr.status);

    logger.debug(PrettyError.render(newErr));
    // debug(JSON.stringify(newError, null, 4));


    var resError = {
        success : false,
        type : newErr.type,
        name : newErr.name,
        message: newErr.message,
        status: newErr.status,
        errorCode: newErr.code,
        field: newErr.field,
        stack: newErr.stack,
        error: newErr,
        inspect:inspect(newErr)
    };

    var type = req.accepts('html', 'json', 'text');
    //console.log(type, resError.code, req.get('Content-Type'), req.is('application/x-www-form-urlencoded'), req.is('application/json'));

    // Security Header for content sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');


    if (req.xhr || req.is('application/json') ||  req.get('Content-Type') === 'application/json' || type ==='json' || (req.is('application/x-www-form-urlencoded')&&req.xhr)){
        return res.json(resError);

    }else if (type === 'text'){
        res.setHeader('Content-Type', 'text/plain');
        return res.json(resError);

    }else {
        if (resError.errorCode > 1000) {
            resError.url = req.url;
            resError.pageTitle = 'Field validation Error, 提交的数据不符合规格!';
            return res.render('global/globalTemp/validationErrorPage', resError);
        }

        if (resError.errorCode === 404) {
            resError.url = req.url;
            resError.pageTitle = '404 Page Not Found, 抱歉,页面没有找到!';
            return res.render('global/globalTemp/page404', resError);
        }

        resError.pageTitle = '500 系统错误, 请稍后重试!';
        return res.render('global/globalTemp/error', resError);
    }

};


var errorMessage = function (req,newErr) {
    return "requestHeader:\t"+JSON.stringify(req.headers)+"\nrequestUrl:\t"+req.originalUrl+"\nformData:\t"+
        JSON.stringify(req.query)+"\nrequestBody:\t"+JSON.stringify(req.body)+"\n"+newErr.message+newErr.stack;
};


exports.ProductionHandlerMiddleware = function(err, req, res, next) {
    var newErr = null;

    if (typeof err.type === 'undefined'){
        newErr = new SystemError(500, err.message||'系统出错了，正在解决中', err);
        newErr.stack = err.stack;
    }else{
        newErr = err;
        //当是nodejs报错,并且是500错误
        if(newErr.status==500) {
            var smsMessage = {
                to:config.to,
                cc:"",
                subject:"pay system alert",
                body:errorMessage(req,newErr),
                from:config.from
            };
            logger.error(smsMessage);
            cache.pub(config.notification_queue,JSON.stringify(smsMessage));
        }
    }

    res.status(newErr.status);


    var resError = {
        success : false,
        type : newErr.type,
        name : newErr.name,
        message: newErr.message,
        status: newErr.status,
        errorCode: newErr.code,
        field: newErr.field
    };

    var type = req.accepts('html', 'json', 'text');

    if (resError.errorCode === 404) {
        logger.warn(newErr);
    }else if (resError.errorCode >= 500){
        logger.error(newErr);
    }else if (resError.errorCode >= 1000){

    }else{
        logger.error(newErr);
    }


    if (req.xhr || req.is('application/json') ||  req.get('Content-Type') === 'application/json' || type ==='json' || (req.is('application/x-www-form-urlencoded')&&req.xhr)){
        res.setHeader('Content-Type', 'text/plain');
        return res.json(resError);
    }else{
        if (resError.errorCode > 1000) {
            resError.url = req.url;
            resError.pageTitle = 'Field validation Error, 提交的数据不符合规格!';
            return res.render('global/globalTemp/validationErrorPage', resError);
        }

        if (resError.errorCode === 404) {
            resError.url = req.url;
            resError.pageTitle = '404 Page Not Found, 抱歉,页面没有找到!';
            return res.render('global/globalTemp/page404', resError);
        }
        resError.pageTitle = '500 系统错误, 请稍后重试!';
        return res.render('global/globalTemp/error', resError);
    }
};



// To render exceptions thrown in non-promies code:
process.on('uncaughtException', function(error){
    var newError = null;

    if (typeof error.type === 'undefined'){
        newError = new SystemError(500, error.message, error);
        newError.stack = error.stack;
    }else{
        newError = error;
    }

    logger.error('5XX UncaughtException: ', newError);

    process.exit(1);
});



// To render unhandled rejections created in BlueBird:
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', function(reason, p){
    logger.error('5XX UnhandledRejection at Promise: ', JSON.stringify(p), ". Reason: ", reason);
});



// While PrettyError.start() works out of the box with when.js` unhandled rejections,
// now that wer'e manually rendering errors, we have to instead use npmjs.org/packages/pretty-monitor
// to handle when.js rejections.