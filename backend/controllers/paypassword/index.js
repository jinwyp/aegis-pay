exports.reset = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 支付密码',
        headerTit : '安全设置',
        subHeaderTit: '支付密码',
        userName: req.session.user.nickname
    };
    res.render('paypassword/reset', pageData);
}
