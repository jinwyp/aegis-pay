var request = require('request');
var sms_code = require('../../common/sms_code');
var api_config = require('./api_config');

exports.send_sms = function(req, res, next){
  var sms = sms_code.generate_code('mix', 6);
  var phone = 18611111111;
  sms_code.send_sms(phone, sms).then(function(data){
    return res.json(data);
  });
}

exports.submit = function(req, res, next){
  var reqbody = req.body,
      code = reqbody.sms_code;
  var isValidSms = sms_code.validate_sms(code);
  if(!isValidSms){
    res.json({"success":false, "errType":"sms_code"});
  }
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
}

exports.ccapimg = function(req, res, next){
  var ary = sms_code.generate_code('img');
  res.end(ary[1]);
}
