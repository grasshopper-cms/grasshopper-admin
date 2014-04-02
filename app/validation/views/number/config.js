/*global define:false*/
define(['text!/validation/views/number/template.html'], function (template) {
    'use strict';

    return {
        name : 'number',
        modelData : {
            type : 'number',
            options : {
                min : undefined,
                max : undefined
            }
        },
        template : template,
        events : {},
        wrapper: false,
        listeners : []
    };
});