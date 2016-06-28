
requirejs(['jquery', 'avalon'], function( $, avalon){

    function heredoc(fn) {
        return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
        replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
    }



    var paginationTemplate = heredoc(function() {

        /*

         <nav class="pagination-financial">
         <ul class="pagination pageno">
         <li> <a aria-label="Previous" ms-click="@_changePage(@currentPages-1, $event, '')"> <span aria-hidden="true" > 上一页 </span> </a> </li>

         <li ms-for='(key, page) in @_pageArrayLeft'> <a ms-class="{active : page.value == @currentPages}" ms-click="@_changePage(page.value, $event)">{{page.value}}</a> </li>
         <li ms-visible='@_ellipsisLeft'> <a >...</a> </li>


         <li ms-for='(key, page) in @_pageArrayMiddle'> <a ms-class="{active : page.value == @currentPages}" ms-click="@_changePage(page.value, $event)">{{page.value}}</a> </li>


         <li ms-visible='@_ellipsisRight'> <a >...</a> </li>
         <li ms-for='(key, page) in @_pageArrayRight'> <a ms-class="{active : page.value == @currentPages}" ms-click="@_changePage(page.value, $event)">{{page.value}}</a> </li>


         <li> <a aria-label="Next" ms-click="@_changePage(@currentPages+1, $event, '')"> <span aria-hidden="true"> 下一页 </span> </a> </li>
         </ul>

         <div class="jump-to-page">
         <span>共 {{@totalPages}}页, 到第</span> <input type="text" placeholder="" ms-duplex="@inputCurrentPages"> <span>页</span>
         <button class="iBtn pagination-button" ms-click="@_changePage(@inputCurrentPages, $event)">确定</button>
         </div>
         </nav>


         */

    });


    avalon.component('ms-pagination', {
        template: paginationTemplate,
        defaults: {
            totalPages : 10,
            currentPages : 1,
            inputCurrentPages : 1,
            changePageNo : function(){},
            changeTotalPages : function(){},

            _pageArrayLeft : [],
            _pageArrayRight : [],
            _pageArrayMiddle : [],

            _ellipsisLeft : false,
            _ellipsisRight : false,

            onInit : function() {
                console.log('init', this.totalPages);
                var vm = this;
                //this.changeTotalPages(vm._showPaginations)
                vm._showPaginations()
            },

            onReady : function(){
                console.log('ready', this.totalPages);
                this.$watch('totalPages', function(a){
                    console.log('ready', this.totalPages);
                })
            },

            onViewChange : function(){
                console.log('views change', this.totalPages);
            },

            _changePage : function(pageNo, event){
                event.preventDefault();
                var vm = this;
                var tempNo = Number(pageNo);

                if (tempNo < 1){
                    tempNo = 1
                }else if (tempNo > this.totalPages){
                    tempNo = this.totalPages
                }

                this.currentPages = tempNo;
                //this.changePageNo(tempNo, vm._showPaginations );
                vm._showPaginations()

            },

            _showPaginations : function (totalPages) {
                var vm = this;
                if (totalPages) {
                    vm.totalPages = totalPages;
                }

                vm._pageArrayLeft = [];
                vm._pageArrayRight = [];
                vm._pageArrayMiddle = [];

                vm._ellipsisLeft = false;
                vm._ellipsisRight = false;

                var paginationShowNumberLimit = 8;
                var paginationLeftShowNumber = 2;
                var paginationRightShowNumber = 2;
                var paginationMiddleShowNumber = 3;

                var currentPageShowLeftNumber = paginationMiddleShowNumber + 1;
                var currentPageShowMiddleNumber = Math.ceil(paginationMiddleShowNumber / 2) ;

                for (var i=1; i<= vm.totalPages; i++){

                    if (vm.totalPages <= paginationShowNumberLimit){
                        vm._pageArrayMiddle.push({value:i});
                    }else{

                        //创建左部分的分页 例如 1,2
                        if ( i <= paginationLeftShowNumber ){ vm._pageArrayLeft.push({value:i}); }

                        //创建右部分的分页 例如 99,100
                        if ( i >= vm.totalPages - (paginationRightShowNumber - 1) ){ vm._pageArrayRight.push({value:i}); }

                        //创建中间部分的分页 例如 49,50,51
                        if (i > paginationLeftShowNumber  && i < vm.totalPages - (paginationRightShowNumber - 1) ) {

                            if (vm.currentPages <= currentPageShowLeftNumber && i <= (currentPageShowLeftNumber + 1) ) {
                                vm._ellipsisRight = true;
                                vm._pageArrayMiddle.push({value:i});
                            }

                            if ( vm.currentPages > currentPageShowLeftNumber && vm.currentPages < vm.totalPages - paginationMiddleShowNumber) {
                                vm._ellipsisLeft = true;
                                vm._ellipsisRight = true;

                                if ( i > vm.currentPages - currentPageShowMiddleNumber && i < vm.currentPages + currentPageShowMiddleNumber){
                                    vm._pageArrayMiddle.push({value:i});
                                }
                            }

                            if ( vm.currentPages >= vm.totalPages - paginationMiddleShowNumber && i >= vm.totalPages - paginationMiddleShowNumber - 1) {
                                vm._ellipsisLeft = true;
                                vm._pageArrayMiddle.push({value:i});
                            }
                        }
                    }
                }
            }
        }


    });


});


