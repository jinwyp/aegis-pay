
// @flow

var express        = require('express');
var router = express.Router();

var newPageController         = require('../../controllers/newdemo');



router.get('/newdemo2', newPageController.newDemo);                                                       // 添加路由


module.exports = router;


