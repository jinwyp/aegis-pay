/**
 * Created by wangqi on 16/6/3.
 */
function MethodArgumentNotValidError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = "MethodArgumentNotValidError";
    this.name = "MethodArgumentNotValidError";
    this.message = message || "Unauthenticated Access Token";

    this.code = code || 400;
    this.field = field || "unknownfield";
    this.status = 400;
}

MethodArgumentNotValidError.prototype = Object.create(Error.prototype);
MethodArgumentNotValidError.prototype.constructor = MethodArgumentNotValidError;

module.exports = MethodArgumentNotValidError;
