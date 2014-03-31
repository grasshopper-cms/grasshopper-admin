define([], function () {
    'use strict';

    return [
        'required',
        'alpha', // length, min, max
        'alpha_numeric', // length, min, max
        'number', // min, max
        'email', //	foundation@zurb.com
        'url'	, //http://zurb.com
        'datetime', //	YYYY-MM-DDThh:mm:ssTZD
        'date', //	YYYY-MM-DD
        'time', //	HH:MM:SS
        'regex'
    ];

});