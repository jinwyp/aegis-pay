/**
 * Created by tttt on 6/16/16.
 */

var glob             = require('glob');
var path = require('path');
var logger = require('../../libs/logger');

var pageRoutes = glob.sync(path.join(__dirname, '/*.js'));
var pageControllers = glob.sync(path.resolve(__dirname, '../../controllers/**/*.js'));

module.exports = function(app){

    pageRoutes.forEach(function (routes) {

        if (routes.indexOf('index') === -1){
            app.use(require(routes))
        }
    });

    pageControllers.forEach(function (controller) {
        if(require(controller).init){
            require(controller).init(app);
            logger.info('auto init controller:'+controller);
        }
    });

};




