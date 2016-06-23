var static = require('node-static');

var bp = require('bootprint').load(require('bootprint-openapi'));  // Load bootprint // Load bootprint-swagger

var mergeOptions = {};

bp.merge(mergeOptions) // Customize configuration, override any options
    .build('./ui/source/javaservice.json', './ui/output')// Specify build source and target
    .generate() // Generate swagger-documentation into "output" directory
    .done(console.log);




//
// Create a node-static server instance to serve the './public' folder
//
var file = new static.Server('./ui');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        file.serve(request, response);
    }).resume();
}).listen(8080);