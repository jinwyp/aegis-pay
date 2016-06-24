require(['jquery', 'pay.upload','jQuery.fn.datePicker'],function($, upload){

  upload.init();

   var confirmDelivery={
      "datepicker" : function(){

         $(document).on("focus",".checkTime",function(){
            $(".checkTime").each(function(i, item){
               $(item).pickadate({}).pickadate('picker').set("max", [new Date($.now() + 86400000)]);
            });
         });

      },
      "modifyData" : function(){

         $(".tableWrap a").on("click",function(){

            var tableList=$(this).parents(".checkList").clone("true");
            var wrap=$(this).parents(".tableWrap");
            var wrapLen=wrap.children("table").length;
            var dateNode="<input type='text' class='checkTime' name='checkTime' placeholder='yyyy-mm-dd' />";


            if($(this).hasClass("add")){
               wrap.append(tableList);

               //替换clone date标签
               $(".dateWrap input").last().remove();
               $(".dateWrap").last().append(dateNode);
               $(".checkList").last().find("input").val("");
               $(".batch").last().text(wrapLen+1);
               $(this).hide();

               if(wrapLen<14){
                  $(".del").show();
               }else{
                  $(".add").last().hide();
               }
            }
            if($(this).hasClass("del")){
               $(this).parents("table").remove();

               $(".batch").each(function(i,item){
                  $(item).text(i+1)
               });

               if(wrapLen==2){
                  $(".del").hide();
               }else{
                  $(".del").show();
               }
               $(".add").last().show();
            }
         });
         //只能输入数字限制
         var tVal="";
         $(".qualityInfo input").on("keyup",function(){
            var numOnly=/^\d+(\.\d{0,2})?$/;
            var thisVal=$(this).val();

            if(numOnly.test(thisVal) || thisVal ==""){
               tVal=thisVal;
            }else{
                $(this).val(tVal);
            }
         });
         $(".qualityInfo input").on("blur",function(){
            tVal="";
         });
      },
      "submit": function(){        
         var temp=true;

         $("#submitBtn").on("click",function(){
            var inputList=[];
            var fileList=[];
            //质量
            var qualityList=[];
            var quantityList=[];
            //数量

            for(var i=0;i<=$(".checkList").length;i++){
               $(".checkList").eq(i).find("input").each(function(){
                  inputList.push("indexList"+"["+i+"]"+"."+$(this).attr("name")+":"+$(this).val());
               })
            }
            $("input[name='file_id']").each(function(){
               fileList.push($(this).val())
            });
            $("#qualityList").find($("input[name='file_id']")).each(function(){
               qualityList.push({file_id: $(this).val(), file_name: $(this).siblings('input[name="file_name"]').val()})
            });
            console.log(qualityList)
            $("#quantityList").find($("input[name='file_id']")).each(function(){
               quantityList.push({file_id: $(this).val(), file_name: $(this).siblings('input[name="file_name"]').val()})
            });

            //提货数量
            var deliveryAmount=$("#deliveryAmount");
            if(deliveryAmount.val()==""){
               $(".errorMes").text("提货数量不得为空");
               return false;
            }else{
               $(".errorMes").text("");
            }

            //table校验

            if($(".checkList").length>0){
               var temp=true;
               $(".checkList input").each(function(i,item){
                  if($(this).val()==""){
                     $(".errorMes").text("检测结果不得为空");
                     temp=false;

                     return false;
                  }else{
                     $(".errorMes").text("");
                  }

               });

               if (!temp){
                  return false;
               }

            };

            //上传校验
            if($("#qualityList").find("p.file").length==0){
               $(".errorMes").text("请上传质量确认单");
               return false;
            }else{
               $(".errorMes").text("");
            }

            if($("#quantityList").length){
               if($("#quantityList").find("p.file").length==0){
                  $(".errorMes").text("请上传数量确认单");
                  return false;
               }
            }else{
               $(".errorMes").text("");
            }
               $.ajax({
                  url:'/api/confirmDelivery/confirmDeliveryIndex',
                  method:'POST',
                  data:{
                     id:"250",
                     version:"1",
                     deliveryAmount:$("#deliveryAmount").val(),
                     indexList:inputList,
                     qualityList:qualityList,
                     quantityList:quantityList,
                     orderId:"1000000"
                  },
                  success:function(data){

                  }
               });
         });
      }
   }
   confirmDelivery.datepicker();
   confirmDelivery.modifyData();
   confirmDelivery.submit();
});
