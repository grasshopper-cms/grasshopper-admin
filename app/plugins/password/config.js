/*global define:false*/
define(['text!plugins/password/template.html', 'plugins/password/model', 'text!plugins/password/setupTemplate.html'],
    function (passwordPluginTemplate, passwordPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'passwordPlugin',
            ModelType : passwordPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'password',
                required : false,
                validation : false,
                value : ''
            },
            template : passwordPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });