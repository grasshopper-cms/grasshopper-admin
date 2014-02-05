/*global define:false*/
define(['text!plugins/ref/template.html', 'plugins/ref/model', 'text!plugins/ref/setupTemplate.html'],
    function (refTemplate, refPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'ref',
            ModelType : refPluginModel,
            modelData : {
                minimum : '1',
                maximum : '1',
                options : false,
                label : '',
                type : 'ref',
                required : false,
                validation : false,
                value : ''
            },
            wrapper: false,
            template : refTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            listeners : [],
            mastheadButtons : []
        };
    });