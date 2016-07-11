

define(['avalon'], function(avalon){

    function heredoc(fn) {
        return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
        replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
    }

    var modalTemplate2 = heredoc(function() {

        /*
         <div class="modal-backdrop fade in">
         <div class="modal_1 modal fade" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
         <div class="modal-dialog">
         <div class="modal-content">
             <div class="modal-header">
                <button type="button"  class="close close_modal" data-dismiss="modal" aria-label="Close"></button>
                <h4 class="modal-title" id="modal_title_1">提示</h4>
             </div>
             <div class="modal-body">
             <div>
             <div class="bg_img attention" id="modalImg_1"></div>
             <div class="modalInfo">
             <span id="modalInfo_1" >您确认接受供应商的投标并公示投标吗？</span>
             </div>
         <div class="buttons">
         <input type="button" data-dismiss="modal" class="btn cancel" value="取消" id="md_cancel_1">
         <input type="button" class="btn confirm" value="确认" id="md_ok_1">
         </div>
         </div>
         </div>
         </div>
         </div>
         </div>

         </div>

         */

    });

    avalon.component('ms-modal', {
        template: modalTemplate2,
        defaults: {

            changePageNo : avalon.noop,

            _isShow  : false,
            $buttons : {},

            onInit : function () {
                var vm = this;
                //console.log('init', this.totalPages);
                //this.$watch('totalPages', function () {
                //    setTimeout(function () {
                //        vm._showPaginations()
                //    }, 2)
                //})
            },

            onReady : function () {
                //console.log('ready', this.totalPages);
            },

            onViewChange : function () {
                //console.log('views change', this.totalPages);
            }
        }

    });

    return avalon;
});


