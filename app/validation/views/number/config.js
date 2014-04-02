/*global define:false*/
define(['text!/validation/views/number/template.html'], function (template) {
    'use strict';

    return {
        name : 'number',
        modelData : {
            _id : 'number',
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