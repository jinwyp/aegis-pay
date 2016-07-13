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
            // 页面加载计算总和
              function totalAmout(){
                  var $deliveryAmount=$("#deliveryAmount"),
                      totalAmount=0,
                      checkAmountLen=$("input[name='checkAmount']").length;       // 提货吨数数量

                  for(var i=0;i<checkAmountLen;i++){
                      totalAmount=totalAmount+Number($("input[name='checkAmount']").eq(i).val());
                  }
                  $deliveryAmount.val(totalAmount);
              }

              if($("input[name='checkAmount']").eq(1).val()!=""){     //判断是否第一次进入
                  totalAmout();
              }

          $("input[name='checkAmount']").on("blur",function(){
              totalAmout();
          });

          $("#qualityList .fileupload").on("click",function(){
              var qualityListLen=$(document).find(".files").eq(0).children(".file").length;
              if(qualityListLen>14){
                  $(".errorMes").text("上传质量确认单最多上传15个文件");
                  return false;
              }else{
                  $(".errorMes").text("")
              }

          });
          $("#quantityList .fileupload").on("click",function(){
              var quantityListLen=$(document).find(".files").eq(1).children(".file").length;
              if(quantityListLen>14){
                  $(".errorMes").text("上传数量确认单最多上传15个文件");
                  return false;
              }else{
                  $(".errorMes").text("")
              }
          });

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

             if($(this).attr("name")!="PSName"){
                 var numOnly=/^\d+(\.\d{0,2})?$/;
                 var thisVal=$(this).val();

                 if(numOnly.test(thisVal) || thisVal ==""){
                     tVal=thisVal;
                 }else{
                     $(this).val(tVal);
                 }
             }

         });
         $(".qualityInfo input").on("blur",function(){
            tVal="";
         });
      },
       "checkInput" : function(){
           var digits = function (val) {
               return /^\d+$/.test(val);
           };
           var range = function (val, r) {
               return ( val > r[0] && val < r[1] );
           };
           var float = function (val) {
               return (/^\d*(\.\d{0,2})?$/).test(val);
           };
           //一位小数
           var float1 = function (val) {
               return (/^\d*(\.\d{0,1})?$/).test(val);
           };
           var digits = function (val) {
               return /^\d+$/.test(val);
           };
           var range = function (val, r) {
               val = parseFloat(val);
               return ( val > r[0] && val < r[1] );
           };
           var compare = function (v1, v2) {
               v1 = parseFloat(v1);
               v2 = parseFloat(v2);
               return v1 <= v2;
           };
           var chineseCheck = function (val) {
               return (new RegExp("^[\\u4e00-\\u9fa5]+$")).test(val);
           };
           // 错误信息提示
           function errorMsg(msg){
               $(".errorMes").text(msg);
           }
           var inputNCV=$("input[name='NCV']"),
               inputADV=$("input[name='ADV']"),
               inputRS=$("input[name='RS']"),
               inputTM=$("input[name='TM']"),
               inputRV=$("input[name='RV']"),
               inputADS=$("input[name='ADS']"),
               inputIM=$("input[name='IM']"),
               inputASH=$("input[name='ASH']"),
               inputGV=$("input[name='GV']"),
               inputYV=$("input[name='YV']"),
               inputAFT=$("input[name='AFT']"),
               inputFC=$("input[name='FC']"),
               inputCRC=$("input[name='CRC']"),
               inputPSName=$("input[name='PSName']"),
               inputHGI=$("input[name='HGI']");

           tableChenkComplete=false;
           for(var i=0;i<$(".checkList").length;i++){

               if(inputNCV.length>0 && inputNCV.eq(i).val()!=""){
                   if(!digits(inputNCV.eq(i).val()) || !range(inputNCV.eq(i).val(),[0,7501])){
                       errorMsg("低位热值为0~7500之间的整数");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }
               if(inputADV.length>0 && inputADV.eq(i).val()!=""){
                   if(!range(inputADV.eq(i).val(), [0, 50.000000000001])){
                       errorMsg("空干基挥发分必须为一个介于0-50之间的数值[不包括0,最多保留两位小数]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputRS.length>0 && inputRS.eq(i).val()!=""){
                   if(!float(inputRS.eq(i).val()) || !range(inputRS.eq(i).val(), [0, 10])){
                       errorMsg("收到硫分必须为一个介于0-10之间的数值[不包括0和10,最多保留两位小数]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

                if(inputTM.length>0 && inputTM.eq(i).val()!=""){
                    if(!float(inputTM.eq(i).val()) || !range(inputTM.eq(i).val(), [0, 50.000000000001])){
                        errorMsg("全水必须为一个介于0-50之间的数值[不包括0,最多保留两位小数]");
                        return false;
                    }else{
                        errorMsg("")
                    }
                }

               if(inputRV.length>0 && inputRV.eq(i).val()!=""){
                   if(!float(inputRV.eq(i).val()) || !range(inputRV.eq(i).val(), [0, 50.000000000001])){
                       errorMsg("收到基挥发分必须为一个介于0-50之间的数值[不包括0,最多保留两位小数]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputADS.length>0 && inputADS.eq(i).val()!=""){
                   if(!float(inputADS.eq(i).val()) || !range(inputADS.eq(i).val(), [0, 10.000000000001])){
                       errorMsg("空干基硫分必须为一个介于0-10之间的数值[不包括0,最多保留两位小数]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputIM.length>0 && inputIM.eq(i).val()!=""){
                   if(!float(inputIM.eq(i).val()) || !range(inputIM.eq(i).val(), [0, 50.000000000001])){
                       errorMsg("内水分必须为一个介于0-50之间的数值[不包括0,最多保留两位小数]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputASH.length>0 && inputASH.eq(i).val()!=""){
                   if(!float1(inputASH.eq(i).val()) || !range(inputASH.eq(i).val(), [0, 50.000000000001])){
                       errorMsg("灰分必须为一个介于0-50之间的数值[不包括0,最多保留一位小数]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputGV.length>0 && inputGV.eq(i).val()!=""){
                   if(!digits(inputGV.eq(i).val()) || !range(inputGV.eq(i).val(), [0,99])){
                       errorMsg("G值必须为一个介于0-99之间的整数值");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputYV.length>0 && inputYV.eq(i).val()!=""){
                   if(!digits(inputYV.eq(i).val()) || !range(inputYV.eq(i).val(), [0,99])){
                       errorMsg("Y值必须为一个介于0-99之间的整数值");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputAFT.length>0 && inputAFT.eq(i).val()!=""){
                   if(!digits(inputAFT.eq(i).val()) || !range(inputAFT.eq(i).val(), [899,1600])){
                       errorMsg("灰熔点必须为一个介于900-1600之间的整数值");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputFC.length>0 && inputFC.eq(i).val()!=""){
                   if(!digits(inputFC.eq(i).val()) || !range(inputFC.eq(i).val(), [0,99])){
                       errorMsg("固定碳必须为一个0-99之间的整数值[不包括0]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputCRC.length>0 && inputCRC.eq(i).val()!=""){
                   if(!digits(inputCRC.eq(i).val()) || !range(inputCRC.eq(i).val(), [0,99])){
                       errorMsg("焦渣特征必须为一个0-99之间的整数值[不包括0]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputPSName.length>0 && inputPSName.eq(i).val()!=""){
                   if(!chineseCheck(inputPSName.eq(i).val())){
                       errorMsg("颗粒度必须为中文");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }

               if(inputHGI.length>0 && inputHGI.eq(i).val()!=""){
                   if(!digits(inputHGI.eq(i).val()) || !range(inputHGI.eq(i).val(), [0,99])){
                       errorMsg("哈氏可磨必须为一个0-99之间的整数值[不包括0]");
                       return false;
                   }else{
                       errorMsg("")
                   }
               }
           }
           tableChenkComplete=true;
       },
      "submit": function(){        
         var temp=true;
          var that=this;
         $("#submitBtn").on("click",function(){


            var inputList= [];
            var fileList=[];
            //质量
            var qualityList=[];
            var quantityList=[];
            //数量
             var qualityListLen=$(".files").eq(0).children(".file").length;
             var quantityListLen=$(".files").eq(1).children(".file").length;

            for(var i=0;i<=$(".checkList").length;i++){
               var obj = {};
               $(".checkList").eq(i).find("input").each(function(){
                  obj[$(this).attr("name")] =$(this).val();
               })
               inputList.push(obj)
            }
            $("input[name='file_id']").each(function(){
               fileList.push($(this).val())
            });
            $("#qualityList").find($("input[name='file_id']")).each(function(){
               qualityList.push({file_id: $(this).val(), file_name: $(this).siblings('input[name="file_name"]').val()})
            });

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
                for(var i=0;i<$(".checkList").length;i++){
                    if($("input[name='checkTime']").eq(i).val()==""){
                        $(".errorMes").text("检测时间不能为空");
                        return false;
                    }
                    if($("input[name='checkAmount']").eq(i).val()==""){
                        $(".errorMes").text("提货吨数不能为空");
                        return false;
                    }
                }
            };
             that.checkInput();
             if(tableChenkComplete){

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

            if(qualityListLen>15){
                 $(".errorMes").text("质量确认单最多上传15个");
                 return;
             }else{
                 $(".errorMes").text("");
             }

            if(quantityListLen>15){
                 $(".errorMes").text("数量确认单最多上传15个");
                 return;
             }else{
                 $(".errorMes").text("");
             }

            $.ajax({
                  url:'/api/confirmDelivery/confirmDeliveryIndex',
                  method:'POST',
                  data:{
                     version:$("#version").val(),
                     deliveryAmount:$("#deliveryAmount").val(),
                     indexList:inputList,
                     qualityList:qualityList,
                     quantityList:quantityList,
                     orderId:$("#orderId").val()
                  },
                  success:function(data){
                     if(data.success){
                        location.href='/getBuyOrderDetail?userId='+$("#userId").val()+"&orderId="+$("#orderId").val()
                     }
                  }

               });

             }
         });
      }
   }
   confirmDelivery.datepicker();
   confirmDelivery.modifyData();
   confirmDelivery.submit();
});
