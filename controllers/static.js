// static page
// About
exports.about = function (req, res, next) {
  res.render('containers/about/index', {
    pageTitle: '关于我们'
  });
};
