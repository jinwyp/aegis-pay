module.exports = function (app) {
    app.locals.stringAppend = function (arg1, arg2, unit) {
        return arg1 + arg2 + str3;
    }

    app.locals.targetIsEmpty = function(arg1, arg2) {
        if((arg1==undefined&&arg2==undefined)
            ||(arg1==0&&arg2==0)
            ||(arg1==null&&arg2==null)){
            return true;
        }else{
            return false;
        }
    }
}
