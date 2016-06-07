require(['jquery','pay.upload'],function($,upload){

    var disputeApply={
        "init" : function(){
          this.upload();
          this.countDown();
          this.submit();
        },
        "countDown" : function(){
            $("#returnReason").on("input",function(){
                var Len=$(this).val().length;
                var restNum=200-Len;
                $("#leftTxt").text(restNum)
            });
        },
        "upload" : function(){
            // ---上传操作----->->->->->->->->->->->->->->->->----------
            var $fileList = $('.fileList'),         //附件列表
                $upFile = $('#upFile')          //上传控件
                //imgSrc='/Users/gaoleo/Downloads/Project/aegis-all/aegis-pay/files/static/upload/';
            //上传操作
            $upFile.click(function() {
                var $tag = $(this);
                upload.ajaxFileUpload($tag, '', function(data) {
                    var htmlStr = '';
                    if(data.success) {
                        $.each(data.attach, function(ind, file) {
                            htmlStr += '<p class="fileLab"><span class="fileLab_name">'+ file.filename +'</span><span class="fileLab_name" data-id="'+ file.id +'"></span></p>';
                            //htmlStr += '<img src="'+'" alt="">';
                        });
                        console.log(data)
                        $fileList.append(htmlStr);
                    }
                });
            });
            //删除操作
            $fileList.on('click', '.fileLab_del', function(e) {
                upload.ajaxFileRemove($(this));
            });
        },
        "submit" : function(){

            $("#confirmSubmit").on("click",function(){

                //是否提货&&是否退货&&退款原因

                var deliveryVal=$('input:radio[name="delivery"]:checked').val();
                var returnVal=$('input:radio[name="return"]:checked').val();
                var returnReason=$("#returnReason").val();

                if(deliveryVal==null){
                    $("#errorMsg").text("请选择是否提货");
                    return false;
                }else{
                    $("#errorMsg").text("")
                }
                if(returnVal==null){
                    $("#errorMsg").text("请选择是否退货");
                    return false;
                }else{
                    $("#errorMsg").text("")
                };
                if(returnReason==""){
                    $("#errorMsg").text("请输入退款原因及说明");
                    return false;
                }else{
                    $("#errorMsg").text("");
                };

            });
        }
    }
    disputeApply.init();
});
