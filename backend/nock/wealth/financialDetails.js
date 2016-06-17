var nock = require('nock');
var API  = require('../../api/v1/api_config');

var intercept        = nock(API.host);
var interceptPersist = nock(API.host).log(console.log).persist();


var details = [
    {date:'2016-05-12', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-13', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-14', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-15', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-16', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-17', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-18', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-19', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-20', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'}
];


interceptPersist
.post('/financial/order/details').reply(200, details)
.post('/financial/order/detailsxxx', {'path' : /.?/gi}).reply(200, {
    success : true
});

module.exports = interceptPersist;
