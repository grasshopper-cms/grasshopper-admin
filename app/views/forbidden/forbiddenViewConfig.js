/*global define:false*/
define(['text!views/forbidden/forbiddenView.html'],
    function (template) {
        'use strict';

        return {
            name : 'forbiddenView',
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : template,
            events : {},
            listeners : []
        };
    });