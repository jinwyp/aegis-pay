define(['jquery', 'validator'],function($, validator){
	return {
        orderId: function(orderId){
            return !!(orderId && /^[0-9]+$/.test(orderId));
        },
        captchaText: function(captchaText){
            return !!(captchaText && (typeof captchaText !== 'string') && validator.isLength(captchaText, { min: 6, max: 10}))
        },
        smsText: function(smsText){
            return !!(smsText && (typeof smsText == 'string') && validator.isLength(smsText, { min: 6, max: 6}));
        },
        payPassword: function(password){
            // return !!(password && (typeof password == 'string') && validator.isLength(password, { min: 6, max: 20}));
            return !!(password && /^(\w){6,16}$/.test(password));
        },
        deliveryAmount: function(deliveryAmount){
            return !!(deliveryAmount && validator.isInt(deliveryAmount, { min: 1, max: 999999999}));
        },
        paymentStartDate: function(date){
            return !!(validator.isDate(date));
        }
    }
});
