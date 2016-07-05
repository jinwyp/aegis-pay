/**
 * Created by wangqi on 16/6/3.
 */
function BusinessError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = "UserLevelServiceRequestError";
    this.name = "BusinessError";
    this.message = message || "Unauthenticated Access Token";

    this.code = code || 409;
    this.field = field || "unknownfield";
    this.status = 409;
}

BusinessError.prototype = Object.create(Error.prototype);
BusinessError.prototype.constructor = BusinessError;

module.exports = BusinessError;