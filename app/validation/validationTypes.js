define([], function () {
    'use strict';

    return [
        'required',
        'alpha', // length, min, max
        'alphaNumeric', // length, min, max
        'number', // min, max
        'email', //	foundation@zurb.com
        'url'	, //http://zurb.com
        'datetime', //	YYYY-MM-DDThh:mm:ssTZD
        'date', //	YYYY-MM-DD
        'regex'
    ];

});