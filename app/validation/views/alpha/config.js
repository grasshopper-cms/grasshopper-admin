define(['text!validation/views/alpha/template.html'], function (template) {
    'use strict';
    return {
        name : 'alpha',
        modelData : {
            _id : 'alpha',
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