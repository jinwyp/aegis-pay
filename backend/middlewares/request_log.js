var logger = require('../common/logger');

module.exports = function (req, res, next) {
  // Assets do not out log.
  if (exports.ignore.test(req.url)) {
    next();
    return;
  }

  var t = new Date();
  logger.log('\n\nRequest Started', t.toISOString(), req.method, req.url, req.ip);

  res.on('finish', function () {
    var duration = ((new Date()) - t);

    logger.log('Request Completed, Status:', res.statusCode, ('(' + duration + 'ms)').green);
  });

  next();
};

exports.ignore = /^\/(public|agent)/;
