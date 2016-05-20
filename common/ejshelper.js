module.exports = function (app) {
    app.locals.stringAppend = function (str1, str2, str3) {
        return str1 + str2 + str3;
    }

    app.locals.xxx = function() {

    }
}
