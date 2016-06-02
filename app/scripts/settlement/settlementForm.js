/*
* 开具结算单 页面脚本
* */


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap'], function($){

    var apiHost = 'http://localhost:8800';			// API域名



    var $embedBox = $('.embedBox'),                 // 提示框:嵌入
        $doubtInlet = $('.doubtInlet'),             // 提示框:触发按钮
        $significantModal = $('#significantModal'); // 重要提示 模态框

    // 鼠标经过 显/隐 提示框
    $doubtInlet.hover(function() {
        $embedBox.css('display', 'block');
    });
    $embedBox.hover(function() {
            $embedBox.css('display', 'block');
        },
        function() {
            $embedBox.css('display', 'none');
        }
    );

    // 加载时 是否显示模态框
    if(false) {
        var closeHtml = '<span class="icn_cross close" data-dismiss="modal" aria-label="Close"></span>';
        $('.significantModalCon').html(closeHtml + $embedBox.html());
        $significantModal.modal('show');          // 手动打开模态框 toggle show hide
    }


    //---清算货款确认-------------------



    //---sdfasf-------------------


    //---sdfasg-------------------
    //---sdfasg-------------------
    //---sdfasg-------------------
    //---sdfasg-------------------
    //---sdfasg-------------------



    /*
    var $reasonId = $('[name=reasonId]'),           //原因ID
        $remarks = $('[name=remarks]'),             //备注
        $limitNum = $('.limitNum'),                 //剩余字数
        $subBtn = $('.subBtn'),                     //确认
        $btnSubClose = $('#btnSubClose');           //确认提交
    // 计算剩余字数
    $remarks.keyup(function () {
        var num = 500;
        num = num - parseInt(this.value.length);
        $limitNum.html(num);
    });
    */





});
