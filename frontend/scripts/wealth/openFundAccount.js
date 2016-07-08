require(['jquery', 'pay.smscode'], function ($, smscode) {
    var openFundAccount = {
        init: function () {
            if ($('.mainWrapper').hasClass('wait')) {
                $.post('/api/wealth/open-fund-account/fetchOpenStatus', function (result) {
                    if (result.success) {
                        location.href = '/wealth/open-fund-account/success';
                    } else {
                        $('.modal_2').modal();
                        $('.modal_2').on('hide.bs.modal', function () {
                            location.href = '/wealth/open-fund-account';
                        })
                    }
                });
                return;
            }
            this.els = {
                $pass1: $('.openFundAccount input[type="password"]').eq(0),
                $pass2: $('.openFundAccount input[type="password"]').eq(1),
                $sms_code: $('.openFundAccount input[name="sms_code"]'),
                $payPhone: $('.openFundAccount input[name="payPhone"]'),
                $passFormatErr: $('.openFundAccount input[type="password"]').eq(0).parent().find('.tip-error'),
                $passDiffErr: $('.openFundAccount input[type="password"]').eq(1).parent().find('.tip-error'),
                $smscodeErr: $('.openFundAccount input[name="sms_code"]').parent().siblings('.tip-error'),
                $smscodeTip: $('.openFundAccount input[name="sms_code"]').parent().siblings('.tip-msg'),
                $payPhoneErr: $('.openFundAccount input[name="payPhone"]').parent().find('.tip-error'),
                $submit: $('.openFundAccount #nextBtn')
            }

            this.bindEvent();
            smscode.init('payPhone');
        },
        bindEvent: function () {
            var self = this;
            // blur validate 
            // var eventValid = [
            //     [['$pass1', /^((?=.*\d)(?=.*[a-zA-Z])|(?=.*[_\W])(?=.*[a-zA-Z])).{6,20}$/], '$passFormatErr', '支付密码格式不正确！', 'blur'],
            //     [['$pass2', '$pass1'], '$passDiffErr', '两次密码输入不一致！', 'blur'],
            //     // [['$payPhone', /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/], '$payPhoneErr', '请输入有效的手机号！', 'blur'],
            // ];
            // self.eventValidBind(eventValid);
            // blue border
            $('input[name="sms_code"]').on('focus', function (e) {
                $(this).parent().addClass('focus');
            });
            $('input[name="sms_code"]').on('blur', function (e) {
                $(this).parent().removeClass('focus');
            })
            // 下一步
            self.els.$submit.click(function () {
                if ($(this).hasClass('disable')) return;
                var requiredValid = [
                    ['$pass1', '$passFormatErr', '请输入密码！'],
                    [['$pass1', /^((?=.*\d)(?=.*[a-zA-Z])|(?=.*[_\W])(?=.*[a-zA-Z])).{6,20}$/], '$passFormatErr', '支付密码格式不正确！'],
                    ['$pass2', '$passDiffErr', '请再次输入密码！'],
                    [['$pass2', '$pass1'], '$passDiffErr', '两次密码输入不一致！'],
                    [['$payPhone', /^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/], '$payPhoneErr', '请输入有效的手机号！'],
                    [['$sms_code', /\w+/], '$smscodeErr', '请输入验证码！'],
                    [['$sms_code', /\w{6,6}/], '$smscodeErr', '验证码输入有误！']
                ]
                var noValid = self.submitValid(requiredValid);
                !noValid && self.submit();
            })

            $('#send_code').on('click', function (e) {
                if ($(this).hasClass("disable")) {
                    return;
                }
                ;
                var payPhone = $('input[name="payPhone"]').val();
                if (!/^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(payPhone)) {
                    self.els.$payPhoneErr.text('请输入有效的手机号！').show();
                    self.els.$payPhone.focus();
                } else {
                    self.els.$payPhoneErr.hide();
                    $('#imgcodeModal').modal();
                }
            })
        },
        eventValidBind: function (eventValid) {
            var self = this;
            var condition, el, ev;
            eventValid.forEach(function (arrObj, index) {
                (function (arrObj, index) {
                    el = $.isArray(arrObj[0]) ? self.els[arrObj[0][0]] : self.els[arrObj[0]];
                    ev = arrObj[3] || 'blur';
                    el.on('focus', function (e) {
                        console.log((e || window.event).target || (e || window.event).srcElement)
                    })
                    el.on(ev, function (e) {
                        var target = (e || window.event).target || (e || window.event).srcElement;
                        if ($.isArray(arrObj[0])) {
                            if (typeof arrObj[0][1].test == 'function') {
                                condition = !arrObj[0][1].test(self.els[arrObj[0][0]].val());
                            } else {
                                condition = self.els[arrObj[0][0]].val() !== self.els[arrObj[0][1]].val();
                            }
                        } else {
                            condition = !self.els[arrObj[0]].val();
                        }
                        if (condition) {
                            el.focus();
                            self.els[arrObj[1]].text(arrObj[2]).show();
                        } else {
                            self.els[arrObj[1]].hide();
                        }
                    })
                })(arrObj, index)
            })
        },
        submitValid: function (requiredValid) {
            var self = this;
            return requiredValid.some(function (arrObj, index) {
                var condition, el;

                if ($.isArray(arrObj[0])) {
                    if (typeof arrObj[0][1].test == 'function') {
                        condition = !arrObj[0][1].test(self.els[arrObj[0][0]].val());
                    } else {
                        condition = self.els[arrObj[0][0]].val() !== self.els[arrObj[0][1]].val();
                    }
                    el = self.els[arrObj[0][0]];
                } else {
                    condition = !self.els[arrObj[0]].val();
                    el = self.els[arrObj[0]];
                }

                if (condition) {
                    el.focus();
                    self.els[arrObj[1]].text(arrObj[2]).show();
                    return true;
                } else {
                    self.els[arrObj[1]].hide();
                }
            })
        },
        submit: function () {
            var self = this;
            var params = $('.openFundAccount form').serialize();
            self.els.$submit.addClass('disable');
            $.post({
                url: '/api/open-fund-account',
                data: params,
                success: function (data) {
                    if (data.success) {
                        // 跳转到付款成功提示页面
                        location.href = '/wealth/open-fund-account/waiting';
                    } else {
                        if (data.errType == 'sms_code') {
                            self.els.$smscodeErr.text('验证码错误！').show();
                        } else {
                            self.els.$pass1.focus();
                            self.els.$passFormatErr.text('请输入密码').show();
                        }
                        self.els.$submit.removeClass('disable');
                    }
                },
                error:function (err) {
                   // console.dir(err);

                    $("#server-error-msg").text(err.message);
                    $('#modal-server-error').modal(true);

                    self.els.$submit.removeClass('disable');
                }
            });
        }
    }
    openFundAccount.init();
})
