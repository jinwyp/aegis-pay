'use strict';

var url = require('url');


var Estimates = require('./EstimatesService');


module.exports.estimatesPriceGET = function estimatesPriceGET (req, res, next) {
  Estimates.estimatesPriceGET(req.swagger.params, res, next);
};

module.exports.estimatesTimeGET = function estimatesTimeGET (req, res, next) {
  Estimates.estimatesTimeGET(req.swagger.params, res, next);
};
