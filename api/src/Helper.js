const _ = require('lodash');

module.exports ={
    HTTP: {
        CREATED: 201,
        OK: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        FORBIDDEN: 403,
        CONFLICT: 409,
        SERVER_ERROR: 500,
    },
  
    validateEmail: function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },
    validatePassword: function (password) {
        var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    },
    validatePhone: function (phone) {
        if (phone.indexOf('+33') != -1) phone = phone.replace('+33', '0');
        var re = /^0[1-7]\d{8}$/;
        return re.test(phone);
    },
    validateName: function (name) {
        var re = /^[a-zA-Z\s]{2,}$/;
        return re.test(name);
    },
    validateDate: function (date) {
        var re = /^\d{4}-\d{2}-\d{2}$/;
        return re.test(date);
    },
    sqlescstr: function (str) {
        //mlog(str);
        if (str && str !== undefined) {
            return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
                switch (char) {
                    case "\0":
                        return "\\0";
                    case "\x08":
                        return "\\b";
                    case "\x09":
                        return "\\t";
                    case "\x1a":
                        return "\\z";
                    case "\n":
                        return "\\n";
                    case "\r":
                        return "\\r";
                    case "\"":
                    case "'":
                    case "\\":
                    case "%":
                        return "\\" + char; // prepends a backslash to backslash, percent,
                    // and double/single quotes
                }
            });
        } else return "";
    },
    isFloat: function (n) {
        return Number(n) === n && n % 1 !== 0;
    },
    isInt: function (n) {
        return Number(n) === n && n % 1 === 0;
    },
    isDate: function (date) {
        return !isNaN(Date.parse(date));
    },
    isObject: function (obj) {
        return obj === Object(obj);
    },
    isArray: function (obj) {
        return obj instanceof Array;
    },
    isString: function (obj) {
        return typeof obj === 'string';
    },
    isNumber: function (obj) {
        return typeof obj === 'number';
    },
    isBoolean: function (obj) {
        return typeof obj === 'boolean';
    },
    isNull: function (obj) {
        return obj === null;
    },
    isUndefined: function (obj) {
        return obj === undefined;
    },
    isEmpty: function(values) {
        return values.some((value) => {
            if (Array.isArray(value)) {
                return value.length;
            }
            if (typeof value === 'object' && value !== null) {
                return _.isEmpty(value);
            }
            return ['', undefined, null].includes(value);
            });
    },


}
