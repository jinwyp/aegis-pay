/*!
 * nodeclub - app.js
 */

/**
 * Module dependencies.
 */
//require("babel-register");
require('colors');

var config = require('./config');

var path             = require('path');
var express          = require('express');
var session          = require('express-session');
var routes           = require('./routes');
var auth             = require('./middlewares/auth');
var RedisStore       = require('connect-redis')(session);
var _                = require('lodash');
var responseTime     = require('response-time');
var morgan           = require('morgan');
var csurf            = require('csurf');
var compression      = require('compression');
var bodyParser       = require('body-parser');
var busboy           = require('connect-busboy');
var errorhandler     = require('./middlewares/errorhandler');
var renderMiddleware = require('./middlewares/render');
var logger           = require("./libs/logger");
var ejs              = require('ejs');
var flash            = require('./libs/flash');

var request          = require("request");


// 静态文件目录
var document  = path.join(__dirname, '../docs/swagger/ui/output');
var staticDir  = path.join(__dirname, '../frontend/dist');
var fileStatic = config.file_path.root;
var viewHtmlPath = path.join(__dirname, 'views');
if (config.NODE_ENV === 'prod' || config.NODE_ENV === 'staging') { viewHtmlPath = path.join(__dirname, 'viewsdist')}

var app = express();

// configuration in all env
app.engine('ejs', ejs.__express);
app.engine('html', ejs.__express);

app.set('views', viewHtmlPath);
app.set('view engine', 'ejs');
app.enable('trust proxy');


//日志
app.use(morgan('dev'));


if (config.debug) {
    logger.info('----- NodeJS Environment Config Variable: ');
    logger.info(config);
    // 记录渲染时间
    app.use(renderMiddleware.render);
}
require("./libs/request-debug")(request) ;

// mock api request
if (config.mock) {
    require('./nock/index');
}

require('./libs/ejshelper')(app);

// 静态资源
app.use('/static', express.static(staticDir));
app.use('/files',express.static(fileStatic));
app.use('/docs',express.static(document));


// 每日访问限制
app.use(compression());
app.use(responseTime());
app.use(bodyParser.json({limit : '1mb'}));
app.use(bodyParser.urlencoded({extended : true, limit : '1mb'}));

app.use(require('cookie-parser')(config.session_secret));

app.use(session({
    secret            : config.session_secret,
    store             : new RedisStore({
        port : config.redis.port,
        host : config.redis.host
    }),
    resave            : true,
    saveUninitialized : true
}));

app.get('/check', function(req, res){
    res.send('ok');
});

app.use(flash());
// custom middleware
app.use(auth.passport);

if (!config.debug) {
    app.use(function (req, res, next) {
        if (req.path.indexOf('/api') === -1) {
            csurf()(req, res, next);
            return;
        }
        next();
    });
    app.set('view cache', true);
}


_.extend(app.locals, {
    config : config,
    staticPath : '/static',
    homepage : config.homepage,
    memberUrl : config.passport.member,
    payUrl : config.passport.pay,
    sitepage : config.site_page
});

app.use(function (req, res, next) {
    res.locals.user = req.session.user || {};
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    res.locals.currentLocation= req.protocol + '://' + req.hostname + ":" + config.port + req.originalUrl;
    app.locals.user = _.assign({}, (typeof app.locals.user === 'undefined')?{}:app.locals.user, res.locals.user);
    next();
});

// for debug
// app.get('/err', function (req, res, next) {
//   next(new Error('haha'))
// });
app.use(busboy({
    limits : {
        fileSize : 10 * 1024 * 1024 // 10MB
    }
}));

// routes
// 探针服务

app.use('/api', routes.api);
app.use('/', routes.webPage);
routes.autoLoaderControllers(app);

// 支付下载文件目录
// app.use('/download/:path?/:name', function(req, res, next){
//     var downloadPath = config.file_path.root + config.file_path.download + '/';
//     var path = req.params.path? (downloadPath + req.params.path + '/') : downloadPath;
//     var fileName = req.params.name;
//     var filePath = path + fileName;

//     res.download(filePath, fileName, function(err){
//         if(err) return next(err);
//     });
// });

app.use(errorhandler.PageNotFoundMiddleware);

// error handler
if (config.debug) {
    app.use(errorhandler.DevelopmentHandlerMiddleware);
} else {
    app.use(errorhandler.ProductionHandlerMiddleware);
}

module.exports = app;

if (!module.parent) {
    app.set('port', config.port);
    app.listen(app.get('port'), function () {
        logger.info('----- NodeJS Server started on ' + config.homepage + ', press Ctrl-C to terminate.');
    });
}
