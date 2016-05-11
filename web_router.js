/*!
 * yimei - route.js
 */

/**
 * Module dependencies.
 */

var express = require('express');
var siteController = require('./controllers/site');
var staticController = require('./controllers/static');
var signController = require('./controllers/sign');

var router = express.Router();

router.get('/home', siteController.home);

router.post('/signout', signController.signout);  
router.post('/signin', signController.signin);  

router.get('/compact', siteController.compact);
module.exports = router;
