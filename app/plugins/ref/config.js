/*global define:false*/
define(['text!plugins/ref/template.html', 'plugins/ref/model', 'text!plugins/ref/setupTemplate.html'],
    function (refTemplate, refPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'ref',
            ModelType : refPluginModel,
            modelData : {},
            wrapper: false,
            template : refTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            bindings : [],
            mastheadButtons : []
        };
    });