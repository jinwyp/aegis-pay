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
        //console.log("arg1=" + arg1 + "-----------" + "arg2=" + arg2);
        //console.log("arg1===0:" + (arg1 == 0) + "-----------" + "arg2=0:" + (arg2 == 0));
        //console.log("arg1===arg2:" + (arg1 == arg2));
        if (arg1 == 0 && arg2 == 0) {
            return "--";
        } else if (arg1 == arg2) {
            return arg1 + " " + unit;
        } else {
            return arg1 + "-" + arg2 + " " + unit
        }
    }

    app.locals.singleArgAppend = function (arg, unit) {
        if (arg == 0) {
            return "--";
        } else {
            return arg + " " + unit
        }
    }

    app.locals.deliveryplaceAppend = function (deliveryprovince, deliveryplace, otherplace) {
        var content = deliveryprovince;
        if (deliveryplace == '其它') {
            content += otherplace;
        } else {
            content += deliveryplace;
        }
        return content;
    }

    app.locals.sellInfoTitleAppend = function (deliveryprovince, deliveryplace, otherplace, originplace, pname, NCV02) {
        var content = deliveryprovince;
        if (deliveryplace == '其它') {
            content += otherplace;
        } else {
            content += deliveryplace;
        }
        content += originplace;
        if (pname != '焦煤' && NCV02 != 0) {
            content += NCV02;
            content += '大卡';
        }
        content += pname;
        return content;
    }

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
    }


    //格式化数字(两位小数)
    app.locals.formatDecimal = function (num , deg) {
        return (num.toFixed(deg || 2) + '');
    }

    //数字千分符
    app.locals.formatMoney = function (num , deg) {
        return (num.toFixed(deg || 2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    }

    //数字转大写
    app.locals.switchTxt = function (n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
        var unit = "千百拾亿千百拾万千百拾元角分", str = "";
        n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p+1, 2);
        unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);

        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
    }

    /*
     * 格式化时间方法，返回拼接字符串(例：5000-7000 kcal/kg)
     * @param obj    时间对象
     * @param type   1(yyyy-MM-dd),2(yyyy-MM-dd HH:mm:ss)
     *
     * */
    app.locals.dateformat = function(obj, type) {
        if(obj==undefined){
            return '时间格式错误';
        }else{
            if(type==1){
                return obj.year+"-"+obj.monthValue+"-"+obj.dayOfMonth;
            }else if(type==2){
                var second=null;
                if(obj.second<10){
                    second=obj.nano+obj.second;
                }else{
                    second=obj.second;
                }
                return obj.year+"-"+obj.monthValue+"-"+obj.dayOfMonth+" "+obj.hour+":"+obj.minute+":"+second;
            }else{
                return '请传入正确的格式化类型';
            }
        }
    };

    app.locals.targetIsEmpty = function (arg1, arg2) {
        if ((arg1 == undefined && arg2 == undefined)
            || (arg1 == 0 && arg2 == 0)
            || (arg1 == null && arg2 == null)) {
            return true;
        } else {
            return false;
        }
    }

    app.locals.phoneFormat = function(phone){
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$2");
    }
}
