/*global define:false*/
define(['text!views/pluginWrapper/pluginWrapperView.html', 'pluginWrapperViewModel', 'binders', 'formatters'],
    function (pluginWrapperTemplate, pluginWrapperViewModel, binders, formatters) {
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
            rivetsBinders : [binders],
            rivetsFormatters : [formatters]
        };
    });