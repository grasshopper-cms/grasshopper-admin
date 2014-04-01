/*global define:false*/
define(['text!/validation/views/time/template.html'], function (template) {
    'use strict';

    return {
        name : 'time',
        modelData : {
            _id : 'time',
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