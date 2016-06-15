var config = require('../config');
// main page
exports.home = function (req, res, next) {
	// var signin = config.passport.member + '/login?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;
	// var signout = config.passport.member + '/logout?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;
	// var register = config.passport.member + '/register?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;
	var home = [
        '<ul>',
        '	<h1>注意: 页面入口配置, 请移步 "views > index.ejs" 中配置</h1><hr/>',
        '</ul>'
    ].join('');
	 //res.send(home);
    res.render('index',{
        webs:[
            {url:'/demo',name:'demo'},
            {url:'/newdemo',name:'newdemo'},
            {url:'/header',name:'header'},
            {url:'/subHeader',name:'subHeader'},
            {url:'/footer',name:'footer'},
            {url:'/api/zips',name:'zip压缩'},
            {url:'/api/user',name:'user req.session'}
        ],
        webdoing:[
            {url:'/demo',name:'demo'},
            {url:'/demo',name:'demo'}
        ]
    });

};
