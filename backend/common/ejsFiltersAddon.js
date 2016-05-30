module.exports = function (exports) {
    /*<%=: str | truncate_:len %> 截取字符串*/
    exports.truncate_ = function (str, len) {
        str        = String(str);
        var i      = 0,
            length = str.length,
            count  = 0;
        for (i; i < length; i++) {
            if (str.charCodeAt(i) > 128) {
                count += 2;
            } else {
                count += 1;
            }
            if (count > len) {
                return str.substr(0, i - 1) + '...';
            }
        }
        return str;
    };
}
