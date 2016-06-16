
// @flow

var express = require('express');
var router  = express.Router();

var newApiController = require('../../api/v1/site');



router.get('/newapiuser', newApiController.user);                                                       // 添加路由


module.exports = router;


