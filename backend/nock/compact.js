var nock = require('nock');
var API  = require('../api/v1/api_config');
var _    = require('lodash');

var compact        = nock(API.host);
var compactPersist = nock(API.host).persist();

compactPersist.get(function (uri) {
        var ismatch = /compact\?orderId=\d&action=get/.test(uri);
        return ismatch;
    }).reply(200, function (uri) {
    return {
        "success" : true,
        "compact" : {
            "contractno" : _.split(_.split(_.split(uri, '?')[1], '&')[0], '=')[1],
            "createtime" : "2015-12-05"
        }
    }
})
.post('/upload-file', {'path' : /.?/gi}).reply(200, {
    success : true
})
.post('/compact').reply(200, {
    success : true,
    orderId : 1
})
.post('/del-file').reply(200, {
    success : true
});

module.exports = compact;
