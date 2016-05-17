requirejs.config({
  baseUrl: 'scripts',
  paths: {
    components: '../components',
    libs: '../libs',
    flexslider: '../components/flexslider/jquery.flexslider-min',
    jquery: '../libs/jquery-2.2.3.min',
    lightbox: '../components/lightbox2/dist/js/lightbox.min'
  },
	shim: {
		'flexslider': {
			deps: ['jquery'],
			exports: 'flexslider'
		},
    'lightbox': {
			deps: ['jquery'],
			exports: 'lightbox'
		}
	}
});
require(['common', 'jquery', 'flexslider', 'lightbox'], function(common, $, flexslider, lightbox){
  $('.slides').css('width', ($('.slides .item').width()+10)*$('.slides .item').size() + 'px')
  $('.flexslider').flexslider({
    animation: "slide",
    animationLoop: false,
    itemWidth: 210,
    itemMargin: 5
  });
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true
  })
})
