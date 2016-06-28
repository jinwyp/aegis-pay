/* 现在的"路由"调用方法 ************************ */
var router = require('express').Router();
var logger = require('../libs/logger');
// var rq = require('../libs/request');
var rq = require('request') ;
// require('request-debug')(rq);
// rq.debug=true ;
// rq.debug = true ;
// require('request-debug')(rq);
// require('request-debug')(rq);
exports.init = function (app) {
    app.use('/', router);
};

//
// // 控制器Controller
// var newDemo = exports.newDemo = function (req, res, next) {
//     logger.info("accessing newdemo 信息");
//     logger.error("erro错误测试");
//     res.render('newdemo/newdemo',{
//         courseName:'CS201',
//         foo:'3',
//         friends:["ni",'niu','bi'],
//         rows:['水电费水电费','魄力','水电电费','sdfsfs'],
//         name:'名称'
//     });
// };


// 控制器Controller
var newDemo = exports.newDemo = function (req, res, next) {
    //        uri:'http://127.0.0.1:8888/test/',
    rq({
        type:'get',
        uri:'http://127.0.0.1:8888/test/',
        // qs:{file:'file1'},
        // contentType:'application/json',
        // qs:{
        //
        // },
        form:{
            file:'sfs',
            files:[{name:'23423',path:'23423'},{name:'424',path:'234'}]
        },
            // fiels:[{name:'23423',path:'23423'},{name:'424',path:'234'}],
            // files:JSON.stringify({file:[{name:'23423',path:'23423'},{name:'424',path:'234'}])
            // files:{name:'sdfsd}

    },function(error, response, body){
        // console.log(body);

        res.end(JSON.stringify("body:"+error));
    })
};



router.get('/newdemo', newDemo); // 不要直接使用匿名函数,请在上面先定义函数名称使用





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


