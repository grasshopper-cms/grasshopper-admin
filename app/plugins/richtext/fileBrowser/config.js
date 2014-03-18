/*global define:false*/
define(['text!plugins/richtext/fileBrowser/template.html', 'plugins/richtext/fileBrowser/model',
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