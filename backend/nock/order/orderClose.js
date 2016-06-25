/*
 * 关闭订单页面..数据模拟
 * */

var API  = require('../../api/v1/api_config');              // 接口路径配置
var nock = require('nock');
var nkOrder = nock(API.host).log(console.log);		        // 执行一次
var nkOrderPersist = nock(API.host).log(console.log).persist();		        // 执行多次


// 查询订单 (111, 代付款)
nkOrderPersist.get('/order/orderInfo')
    //.query({orderId:'111000'})
    .reply(200, {
        order: {
            version: '111',
            id: '111',
            orderNO: '111111111',
            contractNO: 3333333,
            createTime: '2016-11-11',
            payTime: '2016-12-12',
            status: '待付款',
            totalMoney: '666'
        },
        shutdownReasonList: [
            {
                sequence: 555,
                name: '下错单'
            },
            {
                sequence: 666,
                name: '不想要了'
            },
            {
                sequence: 777,
                name: '没原因'
            }
        ]
    });

// 查询订单 (222, 待签合同)
nkOrderPersist.get('/order/orderInfo').query({orderId:'222000'})
    .reply(200, {
        order: {
            version: '222',
            id: '222',
            orderNO: '2222222222222',
            createTime: '2016-11-11',
            status: '待签合同',
            totalMoney: '999999.00'
        },
        shutdownReasonList: [
            {
                sequence: 555,
                name: '下错单'
            },
            {
                sequence: 666,
                name: '不想要了'
            },
            {
                sequence: 777,
                name: '没原因'
            }
        ]
    });




// 查询订单:接口 		http://localhost:3000/api/order/orderCloseView?id=777&type=88
nkOrder.get('/order/orderCloseView').query({id:'222', type:'33'})
    .reply(200, {data: '买家订单111111'});
nkOrder.get('/order/orderInfo_api').query({id:'777', type:'88'})
    .reply(200, {data: '卖家订单222222'});


// 关闭订单:接口 		http://localhost:3000/api/order/orderCloseSubmit
nkOrder.get('/order/orderCloseSubmit').reply(200, {
    success: false,
    error: '提交失败!',
    errorcode: 1
});

module.exports = nkOrder;
