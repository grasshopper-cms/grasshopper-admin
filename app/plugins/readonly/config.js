/*global define:false*/
define(['text!plugins/readonly/template.html', 'plugins/readonly/model', 'text!plugins/readonly/setupTemplate.html'],
    function (readonlyPluginTemplate, readonlyPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'readonlyPlugin',
            ModelType : readonlyPluginModel,
            modelData : {
                minimum : '1',
                maximum : '1',
                options : false,
                label : '',
                type : 'readonly',
                required : false,
                validation : false,
                value : ''
            },
            wrapper: false,
            template : readonlyPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            listeners : [],
            mastheadButtons : []
        };
    });