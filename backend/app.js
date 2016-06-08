/*!
 * nodeclub - app.js
 */

/**
 * Module dependencies.
 */
//require("babel-register");
require('colors');

var config = require('./config');

var path                = require('path');
var express             = require('express');
var session             = require('express-session');
var webRouter           = require('./web_router');
var apiRouter           = require('./api_router');
var auth                = require('./middlewares/auth');
var RedisStore          = require('connect-redis')(session);
var _                   = require('lodash');
var responseTime        = require('response-time');
var morgan              = require('morgan');
var csurf               = require('csurf');
var compression         = require('compression');
var bodyParser          = require('body-parser');
var busboy              = require('connect-busboy');
var errorhandler        = require('./middlewares/errorhandler');
var cors                = require('cors');
var renderMiddleware    = require('./middlewares/render');
var logger              = require("./common/logger");
var engine              = require('ejs-locals');

// require('./common/ejsFiltersAddon')(require('ejs').filters);

// 静态文件目录
var staticDir  = path.join(__dirname, '../app/static');
// var fileStatic = path.join(__dirname,   '../../files/static');
//
var fileStatic = config.sysFileDir;


var app = express();

// configuration in all env
app.engine('ejs', engine);
app.engine('html', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable('trust proxy');


// Request logger 请求时间
app.use(morgan('dev'));


if (config.debug) {
    logger.info('----- NodeJS Environment Config Variable: ');
    logger.info(config);
    // Views 渲染时间
    app.use(renderMiddleware.render);
}


require('./common/ejshelper')(app);

// 静态资源
app.use('/static', express.static(staticDir));
app.use('/files', express.static(fileStatic));
// app.use(express.static(fileStatic));

// 每日访问限制
app.use(compression());
app.use(responseTime());
app.use(bodyParser.json({limit : '1mb'}));
app.use(bodyParser.urlencoded({extended : true, limit : '1mb'}));

// mock api request

if (config.mock) {
    require('./nock/index');
}

app.use(require('cookie-parser')(config.session_secret));

app.use(session({
    secret            : config.session_secret,
    store             : new RedisStore({
        port : config.redis.port,
        host : config.redis.host,
    }),
    resave            : true,
    saveUninitialized : true
}));

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

// for debug
// app.get('/err', function (req, res, next) {
//   next(new Error('haha'))
// });

// set static, dynamic helpers
_.extend(app.locals, {
    config : config
});


app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    res.locals.currentLocation= req.protocol + '://' + req.hostname + ":" + config.port + req.originalUrl;
    next();
});

app.use(busboy({
    limits : {
        fileSize : 10 * 1024 * 1024 // 10MB
    }
}));

// routes
app.use('/api', cors(), apiRouter);
app.use('/', webRouter);

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
