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
          itemWidth: 148,
          itemMargin: 20,
          controlsContainer: $(".custom-controls-container"),
          customDirectionNav: $(".custom-navigation a")
        });
        $('#lightbox .lb-close').appendTo('.lb-outerContainer');
      },
      lightbox: function(){
        lightbox.option({
          'resizeDuration': 200,
          'wrapAround': true
        })
      }
  }
})
