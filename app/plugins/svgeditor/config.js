/*global define:false*/
define(['text!plugins/svgeditor/template.html', 'plugins/svgeditor/model', 'text!plugins/svgeditor/setupTemplate.html'],
    function (svgeditorPluginTemplate, svgeditorPluginModel, setupTemplate) {
        'use strict';

        return {
            name : 'svgeditorPlugin',
            ModelType : svgeditorPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'svgeditor',
                defaultValueType : 'text',
                defaultValue : '',
                dataType : 'string',
                validation : [],
                value : ''
            },
            template : svgeditorPluginTemplate,
            setupTemplate : setupTemplate,
            wrapper: false
        };
    });
