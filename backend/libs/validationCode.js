/**
 * Created by JinWYP on 6/12/16.
 */




var validationCode = {
    user : {
        usernameWrong : {code:1001, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        passwordWrong : {code:1002, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        payPasswordWrong : {code:1003, message:'Field validation error, User payPassword length should be 6 - 20', field : "payPassword"},
        emailWrong : {code:1006, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        mobileWrong : {code:1007, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},

        usernameExist : {code:1011, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        passwordExist : {code:1012, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        emailExist : {code:1013, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        mobileExist : {code:1014, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},

        usernameNotFound : {code:1101, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        passwordNotMatch : {code:1102, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"}
    },

    token : {
        tokenNotFound : {code:4001, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        userNotFound : {code:4002, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        tokenDecodeWrong : {code:4005, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        tokenExpired : {code:4007, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"},
        tokenLengthWrong : {code:1008, message:'Field validation error, orderId length should be 6 - 100', field : "orderId"}

    },

    order : {
        orderIdWrong : {code:5001, message:'Field validation error, orderId length should be 1 - 100', field : "orderId"},
        deliveryAmountWrong : {code:5101, message:'Field validation error, deliveryAmount should be 1 - 999999999', field : "deliveryAmount"},

        startDate : {code:5201, message:'Field validation error, start date wrong', field : "orderDateFrom"},
        endDate : {code:5202, message:'Field validation error, end date wrong', field : "orderDateTo"},
        categoryType : {code:5204, message:'Field validation error, category type wrong', field : "orderCategory"}
    },

    captcha : {
        typeWrong : {code:6001, message:'Field validation error, captcha type length should be 2 - 50', field : "captchaType"},
        textWrong : {code:6002, message:'Field validation error, captcha text length should be 2 - 10', field : "captchaText"},
        notMatch : {code:6005, message:'Field validation error, captcha text not match', field : "captchaText"},
        expired : {code:6007, message:'Field validation error, captcha expired', field : "captchaText"}
    },

    sms : {
        typeWrong : {code:7001, message:'Field validation error, SMS text length should be 6 - 100', field : "sms_code"},
        textWrong : {code:7002, message:'Field validation error, SMS text length should be 6 - 6', field : "sms_code"},
        notMatch : {code:7005, message:'Field validation error, SMS text not match', field : "sms_code"},
        expired : {code:7007, message:'Field validation error, SMS text expired', field : "sms_code"}
    },

    page : {
        menuTabNumberWrong : {code:9001, message:'Field validation error, menu Tab number should be 1 - 20', field : "firstTab"},
        pageNumberWrong : {code:9005, message:'Field validation error, page number should be 1 - 100', field : "currentPage"}
    }
};


module.exports = validationCode;