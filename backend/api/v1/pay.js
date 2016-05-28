var request = require('request');
var _ = require('lodash');
var cache = require('../../common/cache');
var sms_code = require('../../common/sms_code');
var api_config = require('./api_config');

var getUserInfo = function(req){
  var userInfo = req.session.user || api_config.testUser;
      userInfo = _.assign({}, {'ip': req.ip}, userInfo);
  return userInfo;
}

var userInfo = undefined;

exports.send_sms = function(req, res, next){
  userInfo = userInfo || getUserInfo(req);
  sms_code.send_sms(userInfo).then(function(data){
    return res.json(data);
  });
}

exports.submit = function(req, res, next){
  var reqbody = req.body,
      code = reqbody.sms_code;
  userInfo = userInfo || getUserInfo(req);
  sms_code.validate_sms(userInfo, code).then(function(val){
    request.post(api_config.paySubmit, reqbody, function(err, data){
      if(!err&&data){
        var databody = JSON.parse(data.body);
        if(!databody.success){
          databody.errType = 'payPassword';
        }
        return res.json(databody);
      }else{
        next(err);
      }
    })
  }).catch(function(err){
    return res.json({"success":false, "errType":"sms_code"});
  })

}

// 生成图片验证码
exports.ccapimg = function(req, res, next){
  userInfo = userInfo || getUserInfo(req);
  var ary = sms_code.generate_code('img');
  console.log(ary[0])
  cache.set(userInfo.userId+"_ccapimgtxt_pay", ary[0]);
  res.end(ary[1]);
}
// 校验图片验证码
exports.validImgcode = function(req, res, next){
  userInfo = userInfo || getUserInfo(req);
  var imgcode = req.body.code;
  cache.get(userInfo.userId+"_ccapimgtxt_pay", function(err, data){
    if(!err && data && (data == imgcode)){
      res.json({"success":true});
    }else{
      res.json({"success":false});
    }
  })
}
