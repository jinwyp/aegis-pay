

function ValidationError(code, message, field) {
    Error.captureStackTrace(this, this.constructor);

    this.type = "UserLevelOperationalError";
    this.name = "ValidationError";
    this.message = message || "Field Validation Error";

    this.code = code || 400;
    this.field = field || "unknownfield";
    this.status = 409;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;



var validationCode = {
    user : {
        usernameWrong : 1001,
        passwordWrong : 1002,
        payPasswordWrong : 1003,
        emailWrong : 1006,
        mobileWrong : 1007,

        usernameExist : 1011,
        passwordExist : 1012,
        emailExist : 1013,
        mobileExist : 1014,

        usernameNotFound : 1101,
        passwordNotMatch : 1102,

        messageTypeWrong : 1201,
        SMSCodeLengthWrong : 1203,
        SMSCodeNotFound : 1204,
        SMSCodeExpired : 1205
    },

    token : {
        tokenNotFound : 4001,
        userNotFound : 4002,
        tokenDecodeWrong : 4005,
        tokenExpired : 4007,
        tokenLengthWrong : 4008

    },
    
    order : {
        orderIdWrong : 5000
    },

    captcha : {
        typeWrong : 6000,
        textWrong : 6010,
        notMatch : 6020
    },

    sms : {
        typeWrong : 7000,
        textWrong : 7010,
        notMatch : 7020
    }
};


ValidationError.code = validationCode;



module.exports = ValidationError;
