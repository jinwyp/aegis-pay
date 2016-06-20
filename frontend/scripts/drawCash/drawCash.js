/*
	Edit By Edward(zhangguo) 2016-06-17
*/
requirejs(['jquery','bootstrap'],function($,bootstrap){
	// 添加账户
	$(function(){
		// 未绑定银行账户
		(function($){
			var unBindAccount = $('#unBindAccount');
			if( unBindAccount.length<=0 ){ return false; }
			var dealLine = $('#dealLine'),maxTime = 15;
        	var timer = setInterval(function(){
        		if(maxTime<=0){
        			clearInterval(timer);
        			window.location.href= '/';
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
				balancePrice= $('#balancePrice').text(),
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
				}else if( /^\d+$/.test(val) ){
					if( balancePrice && formatPrice(balancePrice)>= val ){
						toggleError(true);
						return true;
					}else{
						toggleError(false);
						return false;
					}
				}else{
					toggleError(false);
					return false;
				}
			}
			function toggleError(flag){
				if( flag ){
					drawCashErr.hide();
				}else{
					drawCashErr.show();
				}
			}
			function formatPrice(str){
				return str.replace(/,/g,'');
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
				var val = $(this).val();
				checkHandler(val);
			});
			confirmBtn.on('click',function(){
				errorMsg.hide();
				var val = confirmTxt.val();
				var flag = checkHandler(val);
				if( !flag ){
					return false;
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