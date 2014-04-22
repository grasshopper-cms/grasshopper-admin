/*global define:false*/
define(['actionsBarViewModel', 'text!views/actionsBar/template.html'], function (actionsBarViewModel, template) {
    'use strict';

    return {
        name : 'actionsBarView',
        ModelType : actionsBarViewModel,
        appendTo : '#actionsBar',
        wrapper : false,
        template : template,
        modelData : {},
        listeners : [],
        events : {},
        permissions : ['admin', 'editor']
    };
});