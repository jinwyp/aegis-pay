var nock = require('nock');
var API  = require('../../api/v1/api_config');
var disputeDetail        = nock(API.host).log(console.log);
var disputeDetailPersist = nock(API.host).persist();

disputeDetailPersist
    .get('/dispute/disputeDetail').reply(200,
{
    "sellInfo":{
        "NCV":5090, "NCV02":6500,
        "ADS":0.00, "ADS02":0.00,//测试数据
        "ADV":1.00, "ADV02":2.00,
        "RS":3.30, "RS02":4.44,
        "RV":3.00, "RV02":4.00,
        "TM":5.00, "TM02":6.00,
        "IM":7.00, "IM02":8.00,
        "ASH":0.0, "ASH02":0.0,//测试数据
        "GV":0, "GV02":0,//测试数据
        "YV":56, "YV02":77,
        "FC":55, "FC02":78,
        "CRC":55, "CRC02":88,
        "AFT":1300,
        "HGI":66,
        "PS":3,
        "PSName":"末煤",
        "bondindex":null,
        "bondindex02":null,
        "id":3522,
        "pid":"CP201604060001",
        "status":"VerifyPass",
        "pname":"测试动力煤",
        "ykj":500.00,
        "seller":"自营",
        "deliveryregion":"华南地区",
        "deliveryprovince":"广东",
        "deliveryplace":"广东东莞海昌码头",
        "deliverymode":"港口平仓",
        "deliverytime1":{"year":2016, "month":"APRIL", "chronology":{"id":"ISO", "calendarType":"iso8601"}, "dayOfMonth":6, "dayOfWeek":"WEDNESDAY", "era":"CE", "dayOfYear":97, "leapYear":true, "monthValue":4},
        "deliverytime2":{"year":2016, "month":"MAY", "chronology":{"id":"ISO","calendarType":"iso8601"}, "dayOfMonth":29, "dayOfWeek":"SUNDAY", "era":"CE", "dayOfYear":150, "leapYear":true, "monthValue":5},
        "supplyquantity":100000,
        "soldquantity":100,
        "availquantity":99900,
        "inspectorg":"上海赛孚燃料检测有限公司",
        "createtime":{"year":2016, "month":"APRIL","dayOfMonth":6,"dayOfWeek":"WEDNESDAY","dayOfYear":97,"monthValue":4,"hour":11,"minute":28,"second":2,"nano":0,"chronology":{"id":"ISO","calendarType":"iso8601"}},
        "createdate":{"year":2016,"month":"APRIL","chronology":{"id":"ISO","calendarType":"iso8601"},"dayOfMonth":6,"dayOfWeek":"WEDNESDAY","era":"CE","dayOfYear":97,"leapYear":true,"monthValue":4},
        "lastupdatetime":{"year":2016,"month":"MAY","dayOfMonth":16,"dayOfWeek":"MONDAY","dayOfYear":137,"monthValue":5,"hour":16,"minute":14,"second":16,"nano":0,"chronology":{"id":"ISO","calendarType":"iso8601"}},
        "sellerid":0,
        "remarks":null,
        "otherharbour":null,
        "otherinspectorg":null,
        "jtjlast":null,
        "traderid":92,
        "dealername":"张三",
        "dealerphone":"15500000001",
        "verifytime":{"year":2016,"month":"APRIL","dayOfMonth":6,"dayOfWeek":"WEDNESDAY","dayOfYear":97,"monthValue":4,"hour":11,"minute":28,"second":2,"nano":0,"chronology":{"id":"ISO","calendarType":"iso8601"}},
        "producttype":"Recommend",
        "pricelist":null,
        "regionId":4,
        "provinceId":16,
        "portId":90,
        "viewtimes":3,
        "originplace":"上海市",
        "paymode":1,
        "payperiod":0.0,
        "releaseremarks":"放松放松放松",
        "parentid":3522,
        "editnum":0,
        "version":0,
        "clienttype":0,
        "type":0,
        "linktype":false,
        "linkmanname":null,
        "linkmanphone":null,
        "shopid":0,
        "shoppname":null,
        "chemicalexam1":"/files/upload/7be0326055d9913fef93ed052eb87c05.jpg",
        "chemicalexam2":"/files/upload/7be0326055d9913fef93ed052eb87c05.jpg",
        "chemicalexam3":"",
        "brandname":"测试数据煤炭",
        "tax":2,
        "accountsmethod":0,
        "accountsmethodname":"",
        "coalpic1":"/files/temp/7be0326055d9913fef93ed052eb87c05.jpg",
        "coalpic2":"",
        "coalpic3":"",
        "coalpic4":"",
        "coalpic5":"",
        "coalpic6":"",
        "isPic":false,
        "paymentMethodId":1,
        "paymentMethod":"在线支付",
        "pricingMethodId":1,
        "pricingMethod":"基准价格+煤质调整价格",
        "rewardPunishment":"粉色的粉丝对方的手",
        "goodsLocation":null,
        "storageDetailAddress":null,
        "ncv":5000, "ncv02":6500,
        "rs":3.00, "rs02":4.00,
        "rv":3.00, "rv02":4.00,
        "ads":1.00, "ads02":2.00,
        "adv":1.00, "adv02":2.00,
        "ash":5.0, "ash02":7.0,
        "tm":5.00, "tm02":6.00,
        "im":7.00, "im02":8.00,
        "fc":55, "fc02":78,
        "crc":55, "crc02":88,
        "gv":56, "gv02":78,
        "yv":56, "yv02":77,
        "hgi":66,
        "ps":3,
        "aft":1300,
        "psname":"末煤"
    },
    "order":{
        "id":2019,
        "version":0,
        "orderNO":"订单编号",
        "contractNO":"合同编号",
        //"contractNO":null,
        "transactionNO":"交易号",
        //"transactionNO":null,
        "buyerCompanyName":"买家公司名称",
        "sellerCompanyName":"卖家公司名称",
        "buyerFundAccount":"买家资金账号",
        //"buyerFundAccount":null,
        "sellerFundAccount":"1302010192010291010",
        "sellerLoginName":"卖家登陆名",
        "status":"WaitSignContract",
        "statusName":"待审核",
        "price":500.00,
        sellerLoginPhone:"13029210291",
        "amount":1000,
        "totalMoney":50000.00,
        "dealerName":"Chen",
        "dealerPhone":"13045105222",
        "createtime":"2016-03-05 21:35",
        "signContractTime":"2016-03-06 21:35",
        "paymentTime":"2016-03-07 21:35",
        "statusName" : "未办货权转移",
        "disputeCreateTime" : "2016-03-02",
        "statusName" : "处理状态啊",
        "deliveryGoods" :2,
        "returnGoods" : false,
        "disputeRemarks" : "退款隐隐啦啦啦啦啦",
        "confirmDeliveryTime":{"year":2016,"month":"APRIL","dayOfMonth":6,"dayOfWeek":"WEDNESDAY","dayOfYear":97,"monthValue":4,"hour":11,"minute":28,"second":50,"nano":0,"chronology":{"id":"ISO","calendarType":"iso8601"}},
        "settleAccountTime":{"year":2016,"month":"APRIL","dayOfMonth":6,"dayOfWeek":"WEDNESDAY","dayOfYear":97,"monthValue":4,"hour":11,"minute":28,"second":50,"nano":0,"chronology":{"id":"ISO","calendarType":"iso8601"}}
    }
});
module.exports = disputeDetail;