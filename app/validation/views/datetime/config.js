/*global define:false*/
define(['text!/validation/views/datetime/template.html'], function (template) {
    'use strict';

    return {
        name : 'datetime',
        modelData : {
            type : 'datetime',
            options : {}
        },
        template : template,
        events : {},
        wrapper: false,
        listeners : []
    };
});