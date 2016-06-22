
var PromiseB   = require('bluebird');
var request    = require("request");
var requestP   = PromiseB.promisify(require("request"));
var api_config = require('./api_config');
var cache      = require('../../libs/cache');
var co         = require('co');
var _          = require('lodash');
var convert = require('../../libs/convert');
var config = require('../../config');
var archiver = require('archiver');
var fs =  require('fs');
var path     = require('path');

var zipFilePath = config.files_root;

exports.user = function (req, res, next) {
    //api代理，去请求java接口
    res.json(req.session.user);
};

exports.test_cache = function (req, res, next) {
    cache.get(api_config.test, function (err, data) {
        if (!err && data) {
            return res.send(data.body);
        } else {
            request({url : api_config.test}, function (err, data) {
                cache.set(api_config.test, data.body, 60);
                return res.send(data.body);
            })
        }
    })
};




exports.asyncMerge = function (req, res, next) {

    // callback
/*
    request({url:api_config.apps}, function(err, data){
        if (err) return next(err);

        return res.send(data.body);
    });
*/

    // Promise
/*
    requestP({url:api_config.apps}).then(function(result){
    	console.log(result);
    	return res.send(result.statusCode);
    }).catch(next);
*/


    var promiseList = [
        requestP({url : api_config.apps}),
        requestP({url : api_config.test}),
        requestP({url : api_config.apps2})
    ];

    PromiseB.all(promiseList).then(function (result) {

        return res.send({
            'app'         : JSON.parse(result[0].body)[0].name,
            'test_cache'  : JSON.parse(result[1].body),
            'app2-length' : result[2].body.length
        });
    }).catch(next);

/*
    async function aa (){
        result = await requestP({url:api_config.apps});
        return res.send(result);
    }

    aa().catch(next);
*/

};

// co + generator
exports.cogenMerge = function (req, res, next) {

    var getProduct   = function (api) {
        return new Promise(function (resolve, reject) {
            request(api, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            })
        })
    };

    var coIndexMerge = [
        getProduct(api_config.apps),
        getProduct(api_config.test),
        getProduct(api_config.apps2)
    ];

/*    co(function*() {

        var result = yield coIndexMerge;
        return res.send({
            'app'         : JSON.parse(result[0].body)[0].name,
            'test_cache'  : JSON.parse(result[1].body),
            'app2-length' : result[2].body.length
        });

    }).catch(next);*/

    Promise.all(coIndexMerge).then(function (result) {

        return res.send({
            'app'         : JSON.parse(result[0].body)[0].name,
            'test_cache'  : JSON.parse(result[1].body),
            'app2-length' : result[2].body.length
        });
    }).catch(next);

};


// reactjs demo 测试用数据
exports.products = function (req, res, next) {
    request(api_config.products, function (err, data) {
        return res.send(data.body);
    })
};

// zip demo
exports.zips = function(req, res, next){
    convert.zipFile({path:[zipFilePath + '/static/images']}).then(function(val){
        res.redirect('http://localhost:3000' + val.replace(zipFilePath+'/static', '/files'));
    }).catch(next);
}
