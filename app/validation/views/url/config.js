/*global define:false*/
define(['text!/validation/views/url/template.html'], function (template) {
    'use strict';

    return {
        name : 'url',
        modelData : {
            _id : 'url',
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