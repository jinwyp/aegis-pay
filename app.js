/*!
 * nodeclub - app.js
 */

/**
 * Module dependencies.
 */
var config = require('./config');

require('colors');
var path                     = require('path');
var Loader                   = require('loader');
var express                  = require('express');
var session                  = require('express-session');
var webRouter                = require('./web_router');
var apiRouter                = require('./api_router');
var auth                     = require('./middlewares/auth');
var errorPageMiddleware      = require("./middlewares/error_page");
var RedisStore               = require('connect-redis')(session);
var _                        = require('lodash');
var csurf                    = require('csurf');
var compress                 = require('compression');
var bodyParser               = require('body-parser');
var busboy                   = require('connect-busboy');
var errorhandler             = require('errorhandler');
var cors                     = require('cors');
var requestLog               = require('./middlewares/request_log');
var renderMiddleware                   = require('./middlewares/render');
var logger                   = require("./common/logger");


// 静态文件目录
var staticDir = path.join(__dirname, 'assets');

// assets
var assets    = {};

if (config.mini_assets) {
  try {
    assets = require('./assets.json');
  } catch (e) {
    console.log('You must execute `make build` before start app when mini_assets is true.');
    throw e;
  }
}

var urlinfo     = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

var app = express();

// configuration in all env
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs-mate'));
app.enable('trust proxy');

// Request logger。请求时间
app.use(requestLog);

if (config.debug) {
  // 渲染时间
  app.use(renderMiddleware.render);
}

// 静态资源
app.use(Loader.less(__dirname));
app.use(express.static(staticDir));

// 每日访问限制

app.use(require('response-time')());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

// mock api request:  DEBUG = nock.* 
if(_.indexOf(_.split(process.env.DEBUG, ','), 'nock.*') >= 0){
  require('./nock/index');
}

app.use(require('method-override')());
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());
app.use(session({
  secret: config.session_secret,
  store: new RedisStore({
    port: config.redis.port,
    host: config.redis.host,
  }),
  resave: true,
  saveUninitialized: true
}));

// custom middleware
app.use(auth.authUser);

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
  config: config,
  Loader: Loader
});

app.use(errorPageMiddleware.errorPage);
app.use(function (req, res, next) {
  res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});

app.use(busboy({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
}));

// routes
app.use('/api', cors(), apiRouter);
app.use('/', webRouter);

// error handler
if (config.debug) {
  app.use(errorhandler());
} else {
  app.use(function (err, req, res, next) {
    console.error('server 500 error:', err);
    return res.status(500).send('500 status');
  });
}

app.listen(config.port, function () {
  logger.log("server listening on port %d", config.port);
  logger.log("success");
});


module.exports = app;
