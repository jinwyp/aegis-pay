define(['jquery', 'flexslider', 'lightbox'],function($, flexslider, lightbox){
  return {
      init: function(){
        this.flexslider();
        this.lightbox();
      },
      flexslider: function(){
        $('.slides').css('width', ($('.slides .item').width()+10)*$('.slides .item').size() + 'px')
        $('.flexslider').flexslider({
          animation: "slide",
          animationLoop: false,
          itemWidth: 210,
          itemMargin: 5
        });

      },
      lightbox: function(){
        lightbox.option({
          'resizeDuration': 200,
          'wrapAround': true
        })
      }
  }
})
