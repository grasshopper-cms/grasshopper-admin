/*global define:false*/
define(['text!plugins/embeddedtype/template.html', 'plugins/embeddedtype/model',
    'text!plugins/embeddedtype/setupTemplate.html'],
    function (embeddedtypePluginTemplate, embeddedtypePluginModel,
              setupTemplate) {
        'use strict';

        return {
            name : 'embeddedtypePlugin',
            ModelType : embeddedtypePluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'embeddedtype',
                required : false,
                validation : false,
                value : ''
            },
            template : embeddedtypePluginTemplate,
            setupTemplate : setupTemplate,
            events : {},
            rivetConfig : 'auto',
            wrapper: false,
            listeners : [],
            mastheadButtons : []
        };
    });