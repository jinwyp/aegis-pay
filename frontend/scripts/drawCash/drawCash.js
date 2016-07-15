/*
	Edit By Edward(zhangguo) 2016-06-17
*/

requirejs(['jquery','bootstrap','pay.smscode'],function($,bootstrap,sms_code){
	// 添加账户
	sms_code.init("");
	$(function(){
		// 未绑定银行账户
		(function($){
			var unBindAccount = $('#unBindAccount');
			if( unBindAccount.length<=0 ){ return false; }
			var dealLine = $('#dealLine'),maxTime = 15;
        	var timer = setInterval(function(){
        		if(maxTime<=0){
        			clearInterval(timer);
        			window.location.href= '/wealth/bindingBankAccount';
        		}else{
        			maxTime--;
        			dealLine.html(maxTime+'s');
        		}
        	},1000);
		})($);
		// 提现
		(function($){
			var drawCash = $('#drawCash');
			if( drawCash.length<=0 ){ return false; }
			var drawCashTxt = $('#drawCashTxt'),
				drawCashErr = $('#drawCashErr'),
				drawCashBtn = $('#drawCashBtn'),
				balancePrice= $('#balancePrice').html(),
				errorMsg = $('#errorMsg');
			drawCashTxt.on('blur',function(){
				var val = $(this).val();
				checkHandler(val);
			});
			drawCashBtn.on('click',function(){
				errorMsg.hide();
				var val = drawCashTxt.val();
				var flag = checkHandler(val);
				if( !flag ){
					return false;
				}
			});
			function checkHandler(val){
				if( !val ){
					toggleError(false);
					return false;
				}else if(/[^\d|,|\.]/g.test(val) || !balancePrice){
					toggleError(false);
					return false;
				}else{
					if( priceToNum(balancePrice) >= (priceToNum(val))*1 ){
						var curVal = numToPrice(val);
						if( !(curVal*1) ){
							drawCashTxt.val('0.00');
							toggleError(false);
							return false;
						}else{
							drawCashTxt.val( numToPrice(val) );
						}
						toggleError(true);
						return true;
					}else{
						toggleError(false);
						$("#drawCashErr").text("提现金额不能大于账户余额");
						return false;
					}
				}
			}
			function toggleError(flag){
				if( flag ){
					drawCashErr.hide();
					drawCashErr.text("金额输入有误，请重新输入");
				}else{
					drawCashErr.show();
				}
			}
			function priceToNum(str){
				return (str.replace(/,/g,''))*1;
			}
			function numToPrice(num){
        		return ((num*1).toFixed(2)+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        	}
		})($);

		// 确认信息
		(function($){
			var drawCashConfirm = $('#drawCashConfirm');
			if( drawCashConfirm.length <= 0){ return false; }
			var confirmTxt = $('#confirmTxt'),
				confirmBtn = $('#confirmBtn'),
				confirmErr = $('#confirmErr'),
				errorMsg = $('#errorMsg');
			confirmTxt.on('blur',function(){
				errorMsg.hide();
				var val = $(this).val();
				checkHandler(val);
			});
			confirmBtn.on('click',function(){
				errorMsg.hide();
				var val = confirmTxt.val();
				var flag = checkHandler(val);
				if( !flag ){
					return false;
				}else{
                    confirmBtn.prop("disabled",true);
					var vertifyCode = $('#vertifyCode').val();
					var payPhone = $('#payPhone').val();
					var vertifyCodeError = $('#vertifyCodeError');
					vertifyCodeError.hide();
                    $.ajax({
                        url:'/drawCashStatus',
                        method:'POST',
                        data:{
                            confirmToken:$('#confirmToken').val(),
                            cash:$('#cash').val(),
                            password:$('#confirmTxt').val(),
                            sms_code:vertifyCode,
                            payPhone:payPhone
                        },
                        success:function(response){
                            if(!response.success){
                                confirmBtn.prop("disabled",false);
                                if(response.errType=="sms_code") {
                                    vertifyCodeError.show();
                                    return false;
                                }else{
                                    vertifyCodeError.hide();
                                    if(response.data && response.data.type && response.data.type == 1){
                                        errorMsg.html('密码错误,还有'+response.data.message.times+'次输入机会').show();
                                    }else{
                                        errorMsg.html(response.error).show();
                                    }
                                }
                            }else{
                                $('#successForm').submit();
                            }
                        }
                    }).fail(function(){
                        confirmBtn.prop("disabled",false);
                    })
				}
			});
			function checkHandler(val){
				if( !val ){
					toggleError(false);
					return false;
				}else if( /^[-|——|_|-|\w|\d]{6,20}$/.test(val) ){
					toggleError(true);
					return true;
				}else{
					toggleError(false);
					return false;
				}
			}
			function toggleError(flag){
				if( flag ){
					confirmErr.hide();
				}else{
					confirmErr.show();
				}
			}
		})($)
	})
});
