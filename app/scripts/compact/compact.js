define(['jquery', 'flexslider', 'lightbox'],function($, flexslider, lightbox){
  return {
      init: function(){
        var self = this;
        if($('input[name="needGenerate"]').val() == "0"){
          $.get('/api/generate_compact?orderId=' + $('input[name="orderId"]').val(), function(data){
            $('.compactContainer').replaceWith(data);
            self.flexslider();
            self.lightbox();
          })
        }else{
          self.flexslider();
          self.lightbox();
        }
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
      },
      lightbox: function(){
        lightbox.option({
          'resizeDuration': 200,
          'wrapAround': true,
          'albumLabel': '(%1/%2)'
        })
        $('#lightbox .lb-close').appendTo('.lb-outerContainer');
      }
  }
})
