/*global define:false*/
define(['text!/validation/views/date/template.html'], function (template) {
    'use strict';

    return {
        name : 'date',
        modelData : {
            _id : 'date',
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