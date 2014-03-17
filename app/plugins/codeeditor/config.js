/*global define:false*/
define(['text!plugins/codeeditor/template.html', 'plugins/codeeditor/model',
    'text!plugins/codeeditor/setupTemplate.html'],
    function (template, codeEditorPluginModel,
              setupTemplate) {
        'use strict';

        return {
            name : 'codeEditorPlugin',
            ModelType : codeEditorPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : {
                    theme : '',
                    language : ''
                },
                label : '',
                type : 'codeeditor',
                required : false,
                validation : false,
                value : ''
            },
            template : template,
            setupTemplate : setupTemplate,
            events : {},
            wrapper: false,
            listeners : []
        };
    });