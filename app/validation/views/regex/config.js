/*global define:false*/
define(['text!/validation/views/regex/template.html'], function (template) {
    'use strict';

    return {
        name : 'regex',
        modelData : {
            _id : 'regex',
            options : {
                min : '',
                max : ''
            }
        },
        template : template,
        events : {},
        wrapper: false,
        listeners : []
    };
});