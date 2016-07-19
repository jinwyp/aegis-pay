require(['jquery','pay.upload'],function($,upload){

    // 错误信息
    function initErrors(flag,errorInfo){
        if(false === flag){
            $("#errorMsg").text(errorInfo);
        }else{
            $("#errorMsg").text(errorInfo);
        }
    };

    var disputeApply={
        "init" : function(){

            this.upload();
            this.countDown();
            this.submit();
        },
        "countDown" : function(){
            $(document).ready(function(){
                var initialLen=200-($("#disputeRemarks").val().length);
                $("#leftTxt").text(initialLen);})
            $("#disputeRemarks").on("keyup",function(){
                var Len=$(this).val().length;
                var restNum=200-Len;
                if(restNum<1){
                    $("#leftTxt").text("0");
                    $(this).val($(this).val().substr(0,200));
                    return false;
                }
                $("#leftTxt").text(restNum);

            });
        },
        "upload" : function(){
            // 文件限制
            var iMaxFilesize = 1048576 * 5; //最大5M

            // 图片格式
            function filterFormat($obj) {
                var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png)$/i;
                if (!rFilter.test($obj.type)) {
                    return false;
                }else{
                    return true;
                }
            };
            
            $("#fileUpload").change(function () {
                var oFile = document.getElementById('fileUpload').files[0];
                if(!filterFormat(oFile)){
                    $(this).val("");
                    initErrors(false,"请选择jpg,png,jpeg,bmp格式的照片上传");
                    return;
                }else if(oFile.size>iMaxFilesize){
                    $(this).val("");
                    initErrors(false,"请上传大小5M以内的图片");
                    return;
                } else{
                    initErrors(true,"");
                    return true;
                }
            });


            var $fileList = $('.fileList');       //附件列表
            //上传操作
            $('.addImg').click(function(){
                if($(".preview").length>=20){
                    $(this).val("");
                    initErrors(false,"最多上传20张照片");
                    return;
                }
                modifyImg=false;
                $("#fileUpload").click();
            });
            //修改图片
            $(document).on("click",".modify",function(){
                modifyImg=true,
                modifyIndex=$(this).parents(".preview").index();
                $("#fileUpload").click();

            });
            $("#fileUpload").click(function(e) {
                e.stopPropagation();
                var $tag = $(this);
                upload.ajaxFileUpload($tag, '', function(data) {
                    var htmlStr = '', modifyStr = '';
                    if(data.success) {
                        $.each(data.attach, function (ind, file) {
                            htmlStr += '<div class="preview" data-id="' + file.id + '" data-name="' + file.filename + '"><img src="' + file.url + '"><div class="modifyFile"><a href="javascript:void(0)" class="modify" data-id="' + file.id + '" data-name="' + file.filename + '">修改</a><a href="javascript:void(0)" class="delete">删除</a></div> </div>';
                            modifyStr = '<div class="preview" data-id="' + file.id + '" data-name="' + file.filename + '"><img src="' + file.url + '"><div class="modifyFile"><a href="javascript:void(0)" class="modify" data-id="' + file.id + '" data-name="' + file.filename + '">修改</a><a href="javascript:void(0)" class="delete">删除</a></div> </div>';
                        });
                        if (!modifyImg) {
                            if ($(".preview").length > 0) {
                                $(".preview").last().after(htmlStr)
                            } else {
                                $(".addImg").before(htmlStr)
                            }

                        } else {
                            if (modifyIndex != 0) {
                                $(".preview").eq(modifyIndex).remove();
                                $(".preview").eq(modifyIndex - 1).after(modifyStr);
                            } else {
                                $(".preview").eq(modifyIndex).remove();
                                if ($(".preview").length > 0) {
                                    $(".preview").last().after(htmlStr)
                                } else {
                                    $(".addImg").before(htmlStr)
                                }
                            }
                        }
                    }
                })
            });
           
            //删除操作
            $(document).on('click', '.preview .delete', function(e) {
                upload.ajaxFileRemove($(this));
                $(this).parents(".preview").remove();
            });
        },
        "submit" : function(){

            $("#confirmSubmit").on("click",function(){

                //是否提货&&是否退货&&退款原因

                var deliveryVal=$('input:radio[name="delivery"]:checked').val();
                var returnVal=$('input:radio[name="return"]:checked').val();
                var disputeRemarks=$("#disputeRemarks").val();

                if(deliveryVal==null){
                    initErrors(false,"请选择是否提货");
                    return false;
                }else{
                    initErrors(true,"");
                }
                if(returnVal==null){
                    initErrors(false,"请选择是否退货");
                    return false;
                }else{
                    initErrors(true,"");
                };
                if(disputeRemarks==""){
                    initErrors(false,"请输入说明");
                    return false;
                }else{
                    initErrors(true,"");
                };


                // 把图片插入数组
                var imgList=[];
                $(".fileList .preview").each(function(i,val){
                    imgList.push({"path":$(this).attr("data-id"),"name":$(this).data("name")});
                });
                $.ajax({
                    url : "/api/disputeApplySubmit",
                    data:{
                        "userId" : $("#userId").val(),
                        "orderId": $("#orderId").val(),
                        "version" : $("#version").val(),
                        "deliveryGoods":$('input:radio[name="delivery"]:checked').val(),
                        "returnGoods":$('input:radio[name="return"]:checked').val(),
                        "disputeRemarks":$("#disputeRemarks").val(),
                        "files":imgList
                    },
                    type:"POST",
                    success:function(data){
                        if(data.success){
                            location.href='/dispute/disputeComplete?orderId='+$("#orderId").val()+"&userId="+$("#userId").val()
                        }

                    }
                })

            });
        }
 }
    disputeApply.init();
});
