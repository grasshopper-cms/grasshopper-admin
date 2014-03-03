/*global define:false*/
define(['text!plugins/contentreference/template.html', 'plugins/contentreference/model',
    'text!plugins/contentreference/setupTemplate.html', 'backbone',
    'plugins/contentreference/binders', 'formatters'],
    function (contentReferencePluginTemplate, contentReferencePluginModel,
              setupTemplate, Backbone, contentReferenceBinders, formatters) {
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
                required : false,
                validation : false,
                value : ''
            },
            template : contentReferencePluginTemplate,
            setupTemplate : setupTemplate,
            events : {
                'click #nodeTree' : 'stopAccordionPropagation',
                'blur input' : 'setAvailableContentTypes'
            },
            rivetConfig : {
                formatters : [formatters],
                binders : [contentReferenceBinders]
            },
            wrapper: false,
            listeners : []
        };
    });


