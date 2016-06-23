var request = require('request');
var _ = require('lodash');
var cache = require('../../libs/cache');

var api_config = require('./api_config');

exports.openFundAccount = function(req, res, next){
    var params = _.assign({}, {userId: req.session.user.id}, req.body);
    request.post({url: api_config.openFundAccount, form:params}, function(err, data){
        if(err) return next(err);
        if(!err && data){
            var result = JSON.parse(data.body);
            res.json(result);
        }
    })
}

exports.fetchOpenStatus = function(req, res, next){
    var count = 0;
    var fetchStatusTimer = setInterval(function(){
        request.post({url: api_config.fetchOpenStatus, form:{userId: req.session.user.id}}, function(err, data){
            if(err) return next(err);
            if(!err && data){
                var result = JSON.parse(data.body);
                var status = result.data.success;
                if(status === 1){
                    // 开通成功
                    clearInterval(fetchStatusTimer);
                    cache.set('openFundAccount:fundAccount_' + req.session.user.id, {userAcccount: result.data.userAcccount}, 180);
                    return res.json({'success':true});
                }else if(status === 3){
                    // 开通失败
                    clearInterval(fetchStatusTimer);
                    return res.json({'success':false})
                }
            }
        })
    }, 5000);

}
