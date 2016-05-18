var express = require('express');
var siteController = require('./api/v1/site');
var compactApi = require('./api/v1/compact');

var router = express.Router();

router.get('/apps', siteController.apps);
router.get('/test-cache', siteController.test_cache);
router.get('/async-merge',siteController.asyncMerge);
router.get('/cogen-merge',siteController.cogenMerge);
router.get('/products',siteController.products);

router.post('/upload-file', compactApi.uploadFile);
router.post('/del-file', compactApi.delFile);
router.post('/sign-compact', compactApi.signCompact);

router.use(function(req, res, next){
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
})

module.exports = router;
