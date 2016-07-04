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
				flag = false;
			var hasAccountState = $('#hasAccountState'),
				noAccountState = $('#noAccountState'),
				delResponseErr = $('#delResponseErr');
			delBankBtn.on('click',function(){
				inputPwd.val('');
				toggleError(true);
				delBankModal.modal('show');
				return false;
			});
			confirmBtn.on('click',function(){
				delResponseErr.hide();
				var val = inputPwd.val();
				flag = checkHandler(val);
				if(flag){
					$.ajax({
						url:'/accountDel',
						method:'POST',
						data:{
							password:$('#inputPwd').val(),
							bankName:$('#bankName').val(),
							bankAccount:$('#bankAccount').val()
						},
						success:function(response){
							if(!response.success){
								if(response.data && response.data.type && response.data.type == 1){
									delResponseErr.html('密码错误,还有'+response.data.message.times+'次输入机会').show();
								}else{
									delResponseErr.html(response.error).show();
								}
							}else{
								hasAccountState.hide();
								noAccountState.css('display','inline-block');
								delBankModal.modal('hide');
							}
						}
					})
				}
			});
			inputPwd.on('blur',function(e){
				var val = $(this).val();
				checkHandler(val);
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
