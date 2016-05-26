var request = require('request');
var ccap = require('ccap');
var api_config = require('../api/v1/api_config');

/**
 * 发送校验码
 * method: post
 * params: {phone: 18611111111, sms: ''}
 * 30times/day ; 3times/hour ;
 */
exports.send_sms = function(phone, sms){
  return new Promise(function(resolve, reject){
    var params =  {"phone": phone, "message":sms};
    request.post(api_config.sendSMSCode, function(err, data){
      var res = JSON.parse(data.body);
      if(res.success){
        resolve(res);
      }else{
        reject(res);
      }
    })
  })
}

/**
 * 生成校验码
 * params: {type: 'num/mix/img', length: 6}
 */
exports.generate_code = function(type, length){
  var length = length || 6;
  if(type=='num'){
    var i = 0;
    var txt = '';
    for(i; i<length; i++){
      txt += parseInt((Math.random())*10);
    }
    return txt
  }
  var ary = ccap().get(),
      txt = ary[0],
      buf = ary[1];
  if(type=='mix'){
    return txt;
  }
  if(type=='img'){
    return ary;
  }
  return txt;
}

/**
 * 验证校验码
 * params: {sms}
 */
exports.validate_sms = function(sms){

  return true;
}
