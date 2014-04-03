/*global define:false*/
define(['text!/validation/views/date/template.html'], function (template) {
    'use strict';

    return {
        name : 'date',
        modelData : {
            type : 'date',
            options : {}
        },
        template : template,
        events : {},
        wrapper: false,
        listeners : []
    };
});