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
            var dateNode="<input type='text' class='checkTime' placeholder='yyyy-mm-dd' />";


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
         var temp=false;

         $("#submitBtn").on("click",function(){

            //提货数量
            var deliveryAmount=$("#checkAmount");
            if(deliveryAmount.val()==""){
               $(".errorMes").text("提货数量不得为空");
               temp=false;
               return false;
            }else{
               $(".errorMes").text("");
               temp=true;
            }

            //table校验
            if($(".checkList").length>0){
               $(".checkList input").each(function(i,item){
                  if($(this).val()==""){
                     $(".errorMes").text("检测结果不得为空");
                     temp=false;
                     return false;
                  }else{
                     $(".errorMes").text("");
                     temp=true;
                  }
               });
            }
            if(temp){
               var inputList=[];
               $(".checkList input").each(function(){
                  inputList.push($(this).val());
               });
               $.ajax({
                  url:'/confirmDelivery/test',
                  type:'get',
                  data:{
                     checkAmount:$("#checkAmount").val(),
                     indexList:inputList
                  },
                  success:function(data){
                     alert(data);
                     console.log(inputList)
                  }
               })
            }
         });
      }
   }
   confirmDelivery.datepicker();
   confirmDelivery.modifyData();
   confirmDelivery.submit();
});
