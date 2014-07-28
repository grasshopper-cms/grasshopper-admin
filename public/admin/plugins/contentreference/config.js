/*global define:false*/
define(['text!plugins/contentreference/template.html', 'plugins/contentreference/model',
    'text!plugins/contentreference/setupTemplate.html', 'backbone',
    'appBinders', 'formatters'],
    function (contentReferencePluginTemplate, contentReferencePluginModel,
              setupTemplate, Backbone, appBinders, formatters) {
        'use strict';

        return {
            name : 'contentReferencePlugin',
            ModelType : contentReferencePluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : {
                    allowedTypes : [],
                    defaultNode : '0'
                },
                label : '',
                type : 'contentreference',
                dataType : 'ref',
                validation : [],
                value : ''
            },
            template : contentReferencePluginTemplate,
            setupTemplate : setupTemplate,
            events : {
                'click #nodeTree' : 'stopAccordionPropagation',
                'blur input' : 'setAvailableContentTypes'
            },
            rivetsConfig : {
                formatters : [formatters],
                binders : [appBinders]
            },
            wrapper: false
        };
    });


