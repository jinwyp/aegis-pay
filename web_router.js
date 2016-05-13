/*!
 * yimei - route.js
 */

/**
 * Module dependencies.
 */

var express = require('express');
var siteController = require('./controllers/site');
// var staticController = require('./controllers/static');
// var signController = require('./controllers/sign');
var compactController = require('./controllers/compact');

var router = express.Router();

router.get('/', siteController.home);

// router.post('/signout', signController.signout);
// router.post('/signin', signController.signin);

router.get('/compact', compactController.compact);
module.exports = router;
