/*global define:false*/
define(['text!views/pluginWrapper/pluginWrapperView.html', 'pluginWrapperViewModel',
    'appBinders', 'pluginWrapperBinders', 'formatters'],
    function (pluginWrapperTemplate, pluginWrapperViewModel,
              appBinders, pluginWrapperBinders, formatters) {
        'use strict';

        return {
            name : 'pluginWrapperView',
            ModelType : pluginWrapperViewModel,
            modelData : {},
            appendTo : '#stage',
            wrapper : false,
            template : pluginWrapperTemplate,
            events : {
                'click #addField' : 'addField'
            },
            rivetConfig : 'auto',
            listeners : [],
            mastheadButtons : [],
            permissions : ['admin', 'editor'],
            rivetsBinders : [appBinders, pluginWrapperBinders],
            rivetsFormatters : [formatters]
        };
    });