require(['jquery', 'pay.smscode'], function($, smscode){
    var openFundAccount = {
        init: function(){
            if($('.mainWrapper').hasClass('wait')){
                $.post('/api/wealth/open-fund-account/fetchOpenStatus', function(result){
                    if(result.success){
                        location.href = '/wealth/open-fund-account/success';
                    }else{
                        console.log('err')
                    }
                });
                return;
            }
            this.els = {
                $pass1: $('.openFundAccount input[type="password"]').eq(0),
                $pass2: $('.openFundAccount input[type="password"]').eq(1),
                $sms_code:  $('.openFundAccount input[name="sms_code"]'),
                $payPhone: $('.openFundAccount input[name="payPhone"]'),
                $passFormatErr: $('.openFundAccount input[type="password"]').eq(0).parent().find('.tip-error'),
                $passDiffErr: $('.openFundAccount input[type="password"]').eq(1).parent().find('.tip-error'),
                $smscodeErr: $('.openFundAccount input[name="sms_code"]').parent().siblings('.tip-error'),
                $smscodeTip: $('.openFundAccount input[name="sms_code"]').parent().siblings('.tip-msg'),
                $payPhoneErr: $('.openFundAccount input[name="payPhone"]').parent().find('.tip-error'),
                $submit: $('.openFundAccount #nextBtn')
            }

            this.bindEvent();
            smscode.init();
        },
        bindEvent: function(){
            var self = this;
            // validate
            var eventValid = [
                [['$pass1', /^(\w){6,20}$/], '$passFormatErr', '支付密码格式不正确！', 'blur'],
                [['$pass2', '$pass1'], '$passDiffErr', '两次密码输入不一致！', 'blur'],
                [['$payPhone', /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/], '$payPhoneErr', '请输入有效的手机号！', 'blur'],
            ];
            self.eventValidBind(eventValid);

            // 下一步
            self.els.$submit.click(function(){
                if($(this).hasClass('disable')) return;
                var requiredValid = [
                                    ['$pass1', '$passFormatErr', '请输入密码！'],
                                    ['$pass2', '$passDiffErr', '请再次输入密码！'],
                                    [['$pass1','$pass2'], '$passDiffErr', '两次密码输入不一致！'],
                                    [['$payPhone', /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/], '$payPhoneErr', '请输入有效的手机号！'],
                                    [['$sms_code', /\w{6,6}/], '$smscodeErr', '请输入有效的手机验证码！']
                                ]
                var noValid = self.submitValid(requiredValid);
                !noValid && self.submit();
            })
        },
        eventValidBind: function(eventValid){
            var self = this;
            var condition, el, ev;
            eventValid.forEach(function(arrObj, index){
                (function(arrObj, index){
                    el = $.isArray(arrObj[0]) ? self.els[arrObj[0][0]] : self.els[arrObj[0]];
                    ev = arrObj[3] || 'blur';
                    el.on(ev, function(e){
                        if($.isArray(arrObj[0])){
                            if(typeof arrObj[0][1].test == 'function'){
                                condition = !arrObj[0][1].test(self.els[arrObj[0][0]].val());
                            }else{
                                condition = self.els[arrObj[0][0]].val() !== self.els[arrObj[0][1]].val();
                            }
                        }else{
                            condition = !self.els[arrObj[0]].val();
                        }
                        if(condition){
                            el.focus();
                            self.els[arrObj[1]].text(arrObj[2]).show();
                        }else{
                            self.els[arrObj[1]].hide();
                        }
                    })
                })(arrObj, index)
            })
        },
        submitValid: function(requiredValid){
            var self = this;
            return requiredValid.some(function(arrObj, index){
                var condition, el;

                if($.isArray(arrObj[0])){
                    if(typeof arrObj[0][1].test == 'function'){
                        condition = !arrObj[0][1].test(self.els[arrObj[0][0]].val());
                    }else{
                        condition = self.els[arrObj[0][0]].val()!==self.els[arrObj[0][1]].val();
                    }
                    el = self.els[arrObj[0][0]];
                }else{
                    condition = !self.els[arrObj[0]].val();
                    el = self.els[arrObj[0]];
                }

                if(condition){
                    el.focus();
                    self.els[arrObj[1]].text(arrObj[2]).show();
                    return true;
                }else{
                    self.els[arrObj[1]].hide();
                }
            })
        },
        submit: function(){
            var self = this;
            var params = $('.openFundAccount form').serialize();
            self.els.$submit.addClass('disable');
            $.post('/api/open-fund-account', params, function(data){
              if(data.success){
                // 跳转到付款成功提示页面
                location.href = '/wealth/open-fund-account/waiting';
              }else{
                  if(data.errType == 'sms_code'){
                      self.els.$smscodeErr.text('验证码错误！').show();
                  }else{
                      self.els.$pass1.focus();
                      self.els.$passFormatErr.text('请输入密码').show();
                  }
                  self.els.$submit.removeClass('disable');
              }
            })
        }

    }
    openFundAccount.init();
})
