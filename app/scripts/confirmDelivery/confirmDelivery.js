require(['jquery','jQuery.fn.datePicker'],function($){

   var confirmDelivery={
      "datepicker" : function(){
         $(".datepicker").on("click",function(){
            $(".datepicker").each(function(i, item){
               $(item).pickadate({}).pickadate('picker').set("max", [new Date($.now() + 86400000)]);
            });
         });
      },
      "modifyData" : function(){

         $(".tableWrap a").on("click",function(){

            var tableList=$(this).parents(".checkList").clone("true");
            var wrap=$(this).parents(".tableWrap");
            var wrapLen=wrap.children("table").length;
            if($(this).hasClass("add")){
               wrap.append(tableList);
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
      },
      "submit": function(){

      }
   }
   confirmDelivery.datepicker();
   confirmDelivery.modifyData();
});
