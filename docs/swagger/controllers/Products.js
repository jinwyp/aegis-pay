'use strict';

var url = require('url');


var Products = require('./ProductsService');


module.exports.productsGET = function productsGET (req, res, next) {
  Products.productsGET(req.swagger.params, res, next);
};
