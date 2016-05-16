/*!
 * yimei - route.js
 * Module dependencies.
 */

var express = require('express');
var demoController = require('./controllers/demo');         // 引入 控制模块
var siteController = require('./controllers/site');
var staticController = require('./controllers/static');
var signController = require('./controllers/sign');




var router = express.Router();

router.get('/demo', demoController.demo);                   // 添加路由
router.get('/', siteController.home);
router.post('/signout', signController.signout);  
router.post('/signin', signController.signin);
router.get('/compact', siteController.compact);




module.exports = router;
