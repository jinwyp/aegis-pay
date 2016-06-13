var router = require('express').Router();

module.exports.init = function (app) {
    app.use('/', router);
};

router.get('/newdemo', function (req, res, next) {

    res.render('newdemo/newdemo',{
        courseName:'CS201',
        foo:'3',
        friends:["ni",'niu','bi'],
        rows:['水电费水电费','魄力','水电电费','sdfsfs'],
        name:''
    });
});
