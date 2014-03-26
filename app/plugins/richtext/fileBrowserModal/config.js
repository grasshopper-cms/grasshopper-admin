/*global define:false*/
define(['text!plugins/richtext/fileBrowserModal/template.html', 'plugins/richtext/fileBrowserModal/model',
    'appBinders'],
    function (richTextFileBrowserPluginTemplate, richTextFileBrowserPluginModel,
              appBinders) {

        'use strict';

        return {
            name : 'richTextFileBrowserPlugin',
            ModelType : richTextFileBrowserPluginModel,
            appendTo : '#modal',
            modelData : {},
            template : richTextFileBrowserPluginTemplate,
            events : {
                'click #nodeTree' : 'stopAccordionPropagation',
                'click .selectedContentRadio' : 'confirmModal',
                'click #confirm' : 'confirmModal',
                'click #cancel' : 'cancelModal'
            },
            wrapper: false,
            listeners : [],
            rivetsConfig : {
                binders : [appBinders]
            }
        };
    });