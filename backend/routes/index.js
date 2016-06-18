/**
 * Created by tttt on 6/16/16.
 */

var glob             = require('glob');
var path = require('path');
var logger = require('../libs/logger');

var requireDir = require('../libs/requiredir');


var apiRoutes = requireDir('./api', {type:'array'});
var pageRoutes = requireDir('./page', {type:'array'});

var pageAutoLoaderControllers = glob.sync(path.resolve(__dirname, '../controllers/**/*.js'));

function autoLoaderControllers (app){
    pageAutoLoaderControllers.forEach(function (controller) {
        if(require(controller).init){
            require(controller).init(app);
            logger.info('Auto init controller:'+ controller);
        }
    });
}


module.exports = {
    api : apiRoutes,
    webPage : pageRoutes,
    autoLoaderControllers : autoLoaderControllers
};





