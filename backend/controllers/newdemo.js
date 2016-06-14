/* 现在的"路由"调用方法 ************************ */
var router = require('express').Router();
module.exports.init = function (app) {
    app.use('/', router);
};

router.get('/newdemo', function (req, res, next) {
    res.render('newdemo/newdemo',{
        courseName:'CS201',
        foo:'3',
        friends:["ni",'niu','bi'],
        rows:['水电费水电费','魄力','水电电费','sdfsfs'],
        name:'名称'
    });
});


/* 过去的"路由"调用方法 *************************
// 1. 在 'web_router.js' 页面路由文件中配置 路由
var newDemoController  = require('./controllers/demo/newDemo');
router.get('/demo/newDemo', newDemoController.newDemoApi);

// 2.在 'controllers' 中调用
var request = require('request');
var apiHost  = require('../../api/v1/api_config');

// 页面路由
exports.newDemoApi = function (req, res, next) {
    res.render('newdemo/newdemo',{
        courseName:'CS201',
        foo:'3',
        friends:["ni",'niu','bi'],
        rows:['水电费水电费','魄力','水电电费','sdfsfs'],
        name:'名称'
    });
}; */
