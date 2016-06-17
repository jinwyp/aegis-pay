/*
	Edit By Edward(zhangguo) 2016-06-17
*/
requirejs(['jquery','bootstrap'],function($,bootstrap){
	// 添加账户
	$(function(){
		(function($){
			// hover提示语
			var info = $('#info'),
				toolTips = $('#toolTips');
			info.hover(function(){
				toolTips.show();
			},function(){
				toolTips.hide();
			});
		})($);
		(function($){
			// 点击 验证支付密码
			var confirmBtn = $('#confirmBtn'),
				errTxt = $('#errorTxt'),
				inputPwd = $('#inputPwd'),
				delBankModal = $('#delBankModal'),
				delBankBtn = $('#delBankBtn'),
				timer = null,
				flag = false;
			delBankBtn.on('click',function(){
				inputPwd.val('');
				toggleError(true);
				delBankModal.modal('show');
				return false;
			});
			confirmBtn.on('click',function(){
				var val = inputPwd.val();
				flag = checkHandler(val);
				if(flag){
					delBankModal.modal('hide');
				}
			});
			inputPwd.on('keyup',function(e){
				if(timer){
					clearTimeout(timer);
				}
				var val = $(this).val();
				timer = setTimeout(function(){
					checkHandler(val);
				},400);
			});
			function checkHandler(val){
				if(!val){
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
					errTxt.hide();
				}else{
					errTxt.show();
				}
			}
		})($);
	})
});