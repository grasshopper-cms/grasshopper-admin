/*global define:false*/
define(['text!/validation/views/datetime/template.html'], function (template) {
    'use strict';

    return {
        name : 'datetime',
        modelData : {
            _id : 'datetime',
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