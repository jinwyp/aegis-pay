requirejs.config({
  paths: {
    'compact-block': 'compact/blocks/compact',
    'compact-upload': 'compact/blocks/upload'
  }
});

require(['compact-block', 'compact-upload'], function(compact, upload){
  compact.init();
  upload.init();
});
