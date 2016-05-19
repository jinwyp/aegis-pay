require(['jquery','jQuery.fn.datePicker'],function($){

   var confirmDelivery={
      "datepicker" : function(){
         //$(".datepicker").pickadate({}).pickadate('picker').set("max", [new Date($.now() + 86400000)]);
         $(".datepicker").each(function(id, item){
            $(item).pickadate({}).pickadate('picker').set("max", [new Date($.now() + 86400000)]);
         })
      }
   }
   confirmDelivery.datepicker()
});
