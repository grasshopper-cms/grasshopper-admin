/*global define:false*/
define(['text!plugins/author/template.html', 'plugins/author/model', 'text!plugins/author/setupTemplate.html',
    'plugins/author/formatters'],
    function (authorPluginTemplate, authorPluginModel, setupTemplate, formatters) {
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
            template : authorPluginTemplate,
            setupTemplate : setupTemplate,
            listeners : [
                /*['channels.views', 'contentFieldsChange']*/
            ],
            rivetsConfig : {
                formatters : [formatters]
            }
        };
    });