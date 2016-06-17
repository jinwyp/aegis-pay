require.config({
  paths: {
    compact: 'compact/compact',
    upload: 'compact/upload'
  }
});

require(['compact', 'upload'], function(compact, upload){
  compact.init();
  upload.init();
});
