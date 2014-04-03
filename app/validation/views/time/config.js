/*global define:false*/
define(['text!/validation/views/time/template.html'], function (template) {
    'use strict';

    return {
        name : 'time',
        modelData : {
            type : 'time',
            options : {}
        },
        template : template,
        events : {},
        wrapper: false,
        listeners : []
    };
});