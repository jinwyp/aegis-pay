var co = require('co');
var restler = require('restler-bluebird');

var apiHost = 'http://localhost:8888/mall/order/';			// 域名

//exports.getOrderDetail = function (req, res, next) {
   var res = {
      render: function(view, model) {
         console.log("get view" + view);
         console.dir(model);
      }
   };

   co(function* (tres){
      var content = yield restler.get(apiHost + '2019');
      tres.render("compact/orderDetail", content);
   }(res));
//};

