/*global define:false*/
define(['text!plugins/radio/template.html', 'plugins/radio/model', 'text!plugins/radio/setupTemplate.html'],
    function (radioPluginTemplate, radioPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'radioPlugin',
            ModelType : radioPluginModel,
            modelData : {
                minimum : '1',
                maximum : '1',
                options : false,
                label : '',
                type : 'radio',
                required : false,
                validation : false,
                value : ''
            },
            template : radioPluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });