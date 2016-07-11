var _ = require('lodash');



module.exports = function (app) {

    //以下所有方法在ejs模板中的调用(例：multiArgAppend(sellInfo.NCV,sellInfo.NCV02,'kcal/kg'))

    /*
     * 拼接煤炭指标方法，返回拼接字符串(例：5000-7000 kcal/kg)
     * @param arg1   煤炭指标第一个值
     * @param arg2   煤炭指标的第二个值
     * @param unit   煤炭指标的单位
     *
     * */
    app.locals.multiArgAppend = function (arg1, arg2, unit) {
        if ((arg1 === 0 && arg2 === 0)||(arg1===undefined&&arg2===undefined)||(arg1===null&&arg2===unll)) {
            return "--";
        } else if (arg1 === arg2) {
            return arg1 + " " + unit;
        } else {
            return arg1 + "-" + arg2 + " " + unit
        }
    };

    app.locals.singleArgAppend = function (arg, unit) {
        if (arg === 0||arg===undefined||arg===null) {
            return "--";
        } else {
            return arg + " " + unit
        }
    };

    app.locals.deliveryplaceAppend = function (deliveryprovince, deliveryplace, otherplace) {
        var content = deliveryprovince;
        if (deliveryplace === '其它') {
            content += otherplace;
        } else {
            content += deliveryplace;
        }
        return content;
    };

    app.locals.sellInfoTitleAppend = function (deliveryprovince, deliveryplace, otherplace, originplace, pname, NCV02) {
        var content = app.locals.clearEmpty(deliveryprovince);

        if (deliveryplace === '其它') {
            content += app.locals.clearEmpty(otherplace);
        } else {
            content += app.locals.clearEmpty(deliveryplace);
        }

        content += app.locals.clearEmpty(originplace);

        if (pname !== '焦煤' && NCV02 !== 0) {
            content += NCV02;
            content += '大卡';
        }

        content += app.locals.clearEmpty(pname);

        return content;
    };

    app.locals.ellipse = function (str, len) {
        var i = 0, length = str.length, count = 0;
        for (i; i < length; i++) {
            if (str.charCodeAt(i) > 128) {
                count += 2;
            } else {
                count += 1;
            }
            if (count > len) {
                return str.substr(0, i) + '...';
            }
        }
        return str;
    };


    //格式化数字(两位小数)
    app.locals.formatDecimal = function (num, deg) {
        return (num.toFixed(deg || 2) + '');
    };

    //数字千分符
    app.locals.formatMoney = function (num, deg) {
        if(/^(0|[1-9][0-9]*)(.[0-9]{2})+$/.test(num)){
            return (num + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        }else{
            return (num.toFixed(deg || 2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        }
    };

    //截取后四位银行卡号
    app.locals.subFour = function (num) {
        return num.substr((num.length-4));
    };

    //银行卡4位加空格
    app.locals.blankFour = function (num) {
        return num.replace(/(\d{4})/g, '$& ');
    };

    //数字转大写
    app.locals.switchTxt = function (n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
        if(n==0){
            return  "零元整" ;
        }
        var unit = "千百拾亿千百拾万千百拾元角分", str = "";
        n += "00";
        var p    = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p + 1, 2);
        unit = unit.substr(unit.length - n.length);
        for (var i = 0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);

        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
    };

    // 截取id路径
    app.locals.substrId = function (n) {
        if(n.length){
            return n.substr(n.lastIndexOf('/')+1)
        }
    };
    /*
     * 格式化时间方法，返回拼接字符串
     * @param obj    时间对象
     *
     * */
    app.locals.dateformat = function (obj) {
        return obj.replace(/-/g, ".")
    };

    // 时间转日期, 返回 YYYY-MMM-DD
    app.locals.timeToDate = function (timeStr) {
        var dateStr = '';
        if(timeStr){
            dateStr = timeStr.substring(0, 10);
        }
        return dateStr;
    };

    app.locals.getStringVal = function (str) {
        return typeof str === 'undefined' ? '' :
            (str === null || str === 'null' || str === "undefined") ? '--':  str;
    };

    app.locals.clearEmpty = function (str) {
        return typeof str === 'undefined' ? '' : (str === null || str === 'null' || str === "undefined") ? '':  str;
    };

    app.locals.targetIsEmpty = function (arg1, arg2) {
        if ((typeof arg1 === 'undefined' && typeof arg2 === 'undefined')
            || (arg1 == 0 && arg2 == 0)
            || (arg1 === null && arg2 === null)) {
            return true;
        } else {
            return false;
        }
    };

    app.locals.phoneFormat = function (phone) {
        return _.toString(phone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
    };

/**
 * 日期格式化
 * params:
 * {
 * date: 时间戳    //必填参数
 * format：YYYY-MM-DD HM   //格式，非必填，默认 YYYY年MM月DD日
 * }
 * <%= dateFormat（date,  "YYYY-MM-DD HM") %>
 */
    app.locals.dateFormat = function(date,format){
        if(!/^[1-9]\d*$/.test(date)){
            return  date ;
        }
        var date = parseInt(date),
            currentTime =  new Date().getTime(),
            diffTime = currentTime - date;
        var minute = 60*1000,
            hour = 60*minute,
            day = 24*hour,
            format = format || 'YYYY年MM月DD日',
            alwaysDiff = alwaysDiff || false;
        var formatArr = ['YYYY','MM','DD','H','M','S'];
        var date = new Date(date),
            year = date.getFullYear(),
            month = date.getMonth()+1,
            month = (month>9) ? month : '0'+month,
            day = (date.getDate()>9) ? date.getDate() : '0'+ date.getDate(),
            hour = (date.getHours()>9) ? date.getHours() : '0'+ date.getHours(),
            minute = (date.getMinutes()>9) ? date.getMinutes() : '0'+date.getMinutes(),
            second = (date.getSeconds()>9) ? date.getSeconds() : '0'+date.getSeconds(),
            dateArr = [year,month,day,hour,':'+minute,':'+ second];
        for(var i=0; i < formatArr.length; i++){
            format = format.replace(formatArr[i],dateArr[i]);
        }
        return format;
    };

    app.locals.fundAccountFormat = function(account,flag){
        if( flag ){
            return account.replace(/(\d{4})(?=\d)/g,"<span>****</span> ");
        }else{
            return account.replace(/(\d{4})(?=\d)/g,"$1 ");    
        }
        
    }


    app.locals.ngShow = function (flag){
        if (!flag){
            return ' style="display: none;" '
        }
    };



    return app;
};
