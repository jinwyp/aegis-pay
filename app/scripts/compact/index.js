requirejs.config({
  baseUrl: 'scripts',
  components: '../components',
  libs: '../libs',
  paths: {
    flexslider: 'components/flexslider/jquery.flexslider-min',
    jquery: 'libs/jquery-2.2.3.min'
  },
	shim: {
		'jquery': {
			exports: 'jQuery'
		},
		'flexslider': {
			deps: ['jquery'],
			exports: 'flexslider'
		}
	}
});
require(['common', 'jquery', 'flexslider'], function(common, $, flexslider){
  $('.slides').css('width', $('.slides .item').width()*$('.slides .item').size() + 'px')
  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    itemWidth: 210,
    itemMargin: 5
  });
})
