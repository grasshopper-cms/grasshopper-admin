/*global define:false*/
define(['text!plugins/author/template.html', 'plugins/author/model', 'text!plugins/author/setupTemplate.html',
    'plugins/author/formatters'],
    function (template, authorPluginModel, setupTemplate,
              formatters) {
        'use strict';

        return {
            name : 'authorPlugin',
            ModelType : authorPluginModel,
            modelData : {
                min : 1,
                max : 1,
                options : false,
                label : '',
                type : 'author',
                dataType : 'dropdown',
                validation : [],
                value : ''
            },
            wrapper: false,
            template : template,
            setupTemplate : setupTemplate,
            rivetsConfig : {
                formatters : [formatters]
            }
        };
    });