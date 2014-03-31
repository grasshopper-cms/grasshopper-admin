define([], function () {
    'use strict';

    return [
        'alpha', // length, min, max
        'alpha_numeric', // length, min, max
        'integer',	// min, max
        'number', // min, max
        'card', //visa, amex, mastercard
        'cvv', //384 or 3284
        'email', //	foundation@zurb.com
        'url'	, //http://zurb.com
        'domain', //	zurb.com
        'datetime', //	YYYY-MM-DDThh:mm:ssTZD
        'date', //	YYYY-MM-DD
        'time', //	HH:MM:SS
        'dateISO', //not sure yet
        'month_day_year',//	MM/DD/YYYY
        'color' //	#FFF or #FFFFFF
    ];

});