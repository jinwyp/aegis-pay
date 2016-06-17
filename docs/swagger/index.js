var bp = require('bootprint').load(require('bootprint-openapi'));  // Load bootprint // Load bootprint-swagger

var mergeOptions = {};

bp.merge(mergeOptions) // Customize configuration, override any options
    .build('./source/financial.json', './output')// Specify build source and target
    .generate() // Generate swagger-documentation into "output" directory
    .done(console.log);


