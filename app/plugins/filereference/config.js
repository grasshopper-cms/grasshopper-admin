/*global define:false*/
define(['text!plugins/filereference/template.html', 'plugins/filereference/model',
    'text!plugins/filereference/setupTemplate.html', 'backbone',
    'appBinders', 'formatters'],
    function (fileReferencePluginTemplate, fileReferencePluginModel,
              setupTemplate, Backbone, appBinders, formatters) {
        'use strict';

        return {
            name : 'fileReferencePlugin',
            ModelType : fileReferencePluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : {
                    allowedTypes : [],
                    defaultNode : '0'
                },
                label : '',
                type : 'filereference',
                dataType : 'ref',
                validation : [],
                value : ''
            },
            template : fileReferencePluginTemplate,
            setupTemplate : setupTemplate,
            events : {
                'click #nodeTree' : 'stopAccordionPropagation'
            },
            rivetsConfig : {
                formatters : [formatters],
                binders : [appBinders]
            },
            wrapper: false
        };
    });


