/*global define:false*/
define(['actionsBarViewModel', 'text!views/actionsBar/template.html'], function (actionsBarViewModel, template) {
    'use strict';

    return {
        name : 'actionsBarView',
        ModelType : actionsBarViewModel,
        wrapper : false,
        appendTo : '#actionsBar',
        template : template
    };
});