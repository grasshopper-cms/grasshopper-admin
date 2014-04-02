/*global define:false*/
define(['text!/validation/views/email/template.html'], function (template) {
    'use strict';

    return {
        name : 'email',
        modelData : {
            _id : 'email',
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